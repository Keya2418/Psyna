"use client";

import { Environment, Lightformer, OrbitControls, useGLTF, useProgress } from "@react-three/drei";
import { Canvas, useFrame, useThree, type ThreeEvent } from "@react-three/fiber";
import gsap from "gsap";
import { Component, Suspense, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import * as THREE from "three";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import { getRegion } from "@/content";
import { assetMappings, CAMERA_LIMITS, contextMeshes, DEFAULT_CAMERA, HEMISPHERE_SEPARATION, MODEL_URL } from "@/content/assetMapping";
import type { RegionId, Vec3 } from "@/content/types";
import type { CameraRequest, ViewOptions } from "@/lib/atlasState";
import { boundarySegments, createBrainMaterials, type BrainMaterials } from "./materials";

export type ViewerStatus = "loading" | "ready" | "error";

export interface BrainCanvasProps {
  highlightedIds: RegionId[];
  selectedId: RegionId | null;
  revealInternal: boolean;
  view: ViewOptions;
  camera: CameraRequest;
  reducedMotion: boolean;
  onSelectRegion: (id: RegionId) => void;
  onStatus: (s: ViewerStatus, detail?: string) => void;
  /** Retry count; a retry clears the cached model so it is fetched again. */
  attempt?: number;
}

const ORBIT_TARGET = new THREE.Vector3(0, -0.1, 0);
const CLICK_DRAG_THRESHOLD_PX = 6;

/** meshName → regionId, built from the central mapping. */
const MESH_TO_REGION = new Map<string, RegionId>(assetMappings.flatMap((m) => m.meshNames.map((n) => [n, m.regionId] as const)));

interface MarkerDef {
  key: string;
  regionId: RegionId;
  side: "left" | "right";
  position: Vec3;
  normal: Vec3;
  deep: boolean;
}
const MARKERS: MarkerDef[] = assetMappings.flatMap((m) =>
  m.markers.map((mk) => ({
    key: `${m.regionId}-${mk.side}`,
    regionId: m.regionId,
    side: mk.side,
    position: mk.position,
    normal: mk.normal,
    deep: getRegion(m.regionId)?.depth === "deep",
  })),
);

/** Narrow (portrait) viewports need the camera further away to keep the brain's width in view. */
export function aspectDistanceFactor(aspect: number): number {
  return aspect < 1.15 ? Math.pow(1.15 / Math.max(aspect, 0.45), 0.8) : 1;
}

function cameraPose(target: CameraRequest["target"]): { dir: THREE.Vector3; dist: number } {
  if (target === "default") return { dir: new THREE.Vector3(...DEFAULT_CAMERA.direction).normalize(), dist: DEFAULT_CAMERA.distance };
  const ms = target.regionIds.map((id) => assetMappings.find((m) => m.regionId === id)).filter(Boolean) as typeof assetMappings;
  if (!ms.length) return cameraPose("default");
  const dir = new THREE.Vector3();
  ms.forEach((m) => dir.add(new THREE.Vector3(...m.camera.direction).normalize()));
  if (dir.length() < 0.35) return cameraPose("default");
  dir.normalize();
  const dist = Math.max(...ms.map((m) => m.camera.distance)) + (ms.length > 1 ? 0.45 : 0);
  return { dir, dist: THREE.MathUtils.clamp(dist, CAMERA_LIMITS.minDistance, CAMERA_LIMITS.maxDistance) };
}

// ───────────────────────── Error boundary inside the R3F tree ─────────────────────────
class SceneErrorBoundary extends Component<{ onError: (msg: string) => void; children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch(error: unknown) {
    this.props.onError(error instanceof Error ? error.message : String(error));
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}

// ───────────────────────── Model ─────────────────────────
type GLTFNodes = Record<string, THREE.Object3D>;

function BrainModel({
  highlightedIds,
  revealInternal,
  view,
  reducedMotion,
  separationRef,
  onSelectRegion,
  onReady,
}: Pick<BrainCanvasProps, "highlightedIds" | "revealInternal" | "view" | "reducedMotion" | "onSelectRegion"> & {
  separationRef: React.MutableRefObject<number>;
  onReady: () => void;
}) {
  const { nodes } = useGLTF(MODEL_URL) as unknown as { nodes: GLTFNodes };
  const invalidate = useThree((s) => s.invalidate);
  const mats = useMemo<BrainMaterials>(() => createBrainMaterials(), []);
  const leftRef = useRef<THREE.Group>(null);
  const rightRef = useRef<THREE.Group>(null);

  useEffect(() => () => mats.all.forEach((m) => m.dispose()), [mats]);

  // Validate mapping against the actual asset (content still works if something is missing).
  useEffect(() => {
    const expected = [...assetMappings.flatMap((m) => m.meshNames), ...contextMeshes.map((c) => c.meshName)];
    const missing = expected.filter((n) => !(nodes[n] as THREE.Mesh | undefined)?.isMesh);
    if (missing.length && process.env.NODE_ENV !== "production") console.warn("[Mind Atlas] meshes missing from model:", missing);
    onReady();
    invalidate();
    // eslint-disable-next-line react-hooks/exhaustive-deps -- run once when the model is available
  }, [nodes]);

  const meshes = useMemo(() => {
    return Object.values(nodes)
      .filter((o): o is THREE.Mesh => (o as THREE.Mesh).isMesh)
      .map((mesh) => {
        const name = mesh.name;
        const regionId = MESH_TO_REGION.get(name) ?? null;
        const deep = regionId ? getRegion(regionId)?.depth === "deep" : false;
        const side: "left" | "right" | "mid" = name.startsWith("L_") ? "left" : name.startsWith("R_") ? "right" : "mid";
        const scale = mesh.scale.x || 1;
        const outline = regionId && !deep ? boundarySegments(mesh.geometry, 0.004 / scale) : null;
        const tone = /cerebellum|brainstem/.test(name) ? "mint" : "icy";
        return { name, mesh, regionId, deep, side, outline, tone };
      });
  }, [nodes]);

  useEffect(() => () => meshes.forEach((m) => m.outline?.dispose()), [meshes]);

  // Hemisphere separation (restrained tween; instant under reduced motion).
  useEffect(() => {
    const target = view.separated ? HEMISPHERE_SEPARATION : 0;
    const state = { v: separationRef.current };
    const apply = () => {
      separationRef.current = state.v;
      if (leftRef.current) leftRef.current.position.x = -state.v;
      if (rightRef.current) rightRef.current.position.x = state.v;
      invalidate();
    };
    if (reducedMotion) {
      state.v = target;
      apply();
      return;
    }
    const tween = gsap.to(state, { v: target, duration: 0.7, ease: "power2.inOut", onUpdate: apply });
    return () => {
      tween.kill();
    };
  }, [view.separated, reducedMotion, invalidate, separationRef]);

  const anyHighlight = highlightedIds.length > 0;
  const glassMode = view.material === "glass";
  const translucentExterior = glassMode || revealInternal;

  const exteriorMaterial = (regionId: RegionId | null, tone: string): THREE.Material => {
    const highlighted = !!regionId && highlightedIds.includes(regionId);
    if (translucentExterior) {
      if (highlighted) return mats.glassHighlight;
      if (revealInternal) return mats.glassFaded;
      if (anyHighlight) return mats.glassDim;
      return tone === "mint" ? mats.glassMint : mats.glassIcy;
    }
    if (highlighted) return mats.solidHighlight;
    if (anyHighlight) return mats.solidDim;
    return tone === "mint" ? mats.solidMint : mats.solid;
  };

  const handleClick = (regionId: RegionId | null) => (e: ThreeEvent<MouseEvent>) => {
    // Distinguish a click from a drag: ignore if the pointer moved more than a few pixels.
    if (e.delta > CLICK_DRAG_THRESHOLD_PX) return;
    e.stopPropagation();
    if (translucentExterior) {
      const deepHit = e.intersections.find((i) => i.object.userData.deepRegion);
      if (deepHit && revealInternal) {
        onSelectRegion(deepHit.object.userData.deepRegion as RegionId);
        return;
      }
    }
    if (regionId) onSelectRegion(regionId);
  };

  const renderMesh = (m: (typeof meshes)[number]) => {
    const { mesh } = m;
    const common = { position: mesh.position, quaternion: mesh.quaternion, scale: mesh.scale };
    if (m.deep) {
      const highlighted = !!m.regionId && highlightedIds.includes(m.regionId);
      const material = highlighted ? mats.deepHighlight : m.name.includes("hippocampus") ? mats.deepHippocampus : mats.deepAmygdala;
      return (
        <mesh
          key={m.name}
          name={m.name}
          geometry={mesh.geometry}
          material={material}
          visible={translucentExterior}
          userData={{ deepRegion: m.regionId }}
          onClick={handleClick(m.regionId)}
          {...common}
        />
      );
    }
    const highlighted = !!m.regionId && highlightedIds.includes(m.regionId);
    return (
      <group key={m.name} {...common}>
        {translucentExterior && <mesh geometry={mesh.geometry} material={mats.depthPrepass} renderOrder={1} />}
        <mesh
          name={m.name}
          geometry={mesh.geometry}
          material={exteriorMaterial(m.regionId, m.tone)}
          renderOrder={translucentExterior ? 2 : 0}
          onClick={m.regionId ? handleClick(m.regionId) : undefined}
        />
        {highlighted && m.outline && <lineSegments geometry={m.outline} material={mats.outline} renderOrder={3} />}
      </group>
    );
  };

  return (
    <group>
      <group ref={leftRef}>{meshes.filter((m) => m.side === "left").map(renderMesh)}</group>
      <group ref={rightRef}>{meshes.filter((m) => m.side === "right").map(renderMesh)}</group>
      <group>{meshes.filter((m) => m.side === "mid").map(renderMesh)}</group>
    </group>
  );
}

// ───────────────────────── Markers (DOM buttons projected each frame) ─────────────────────────
function MarkerProjector({
  elements,
  separationRef,
  showDeep,
  separated,
}: {
  elements: React.MutableRefObject<Map<string, HTMLButtonElement>>;
  separationRef: React.MutableRefObject<number>;
  showDeep: boolean;
  separated: boolean;
}) {
  const invalidate = useThree((s) => s.invalidate);
  const tmp = useMemo(() => ({ p: new THREE.Vector3(), n: new THREE.Vector3(), d: new THREE.Vector3() }), []);
  useEffect(() => invalidate(), [showDeep, separated, invalidate]);

  useFrame(({ camera, size }) => {
    const camLen = camera.position.length() || 1;
    for (const m of MARKERS) {
      const el = elements.current.get(m.key);
      if (!el) continue;
      const sign = m.side === "left" ? -1 : 1;
      tmp.p.set(m.position[0] + sign * separationRef.current, m.position[1], m.position[2]);
      tmp.d.copy(camera.position).sub(tmp.p).normalize();
      let visible: boolean;
      if (m.deep) {
        const lateral = camera.position.x / camLen;
        visible = showDeep && (separated || Math.abs(lateral) < 0.3 || Math.sign(lateral) === sign);
      } else {
        visible = tmp.n.set(...m.normal).dot(tmp.d) > 0.02;
      }
      tmp.p.project(camera);
      if (tmp.p.z > 1) visible = false;
      const x = (tmp.p.x * 0.5 + 0.5) * size.width;
      const y = (-tmp.p.y * 0.5 + 0.5) * size.height;
      el.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0)`;
      el.style.visibility = visible ? "visible" : "hidden";
    }
  });
  return null;
}

// ───────────────────────── Camera ─────────────────────────
function CameraRig({ request, reducedMotion, separated }: { request: CameraRequest; reducedMotion: boolean; separated: boolean }) {
  const camera = useThree((s) => s.camera);
  const controls = useThree((s) => s.controls) as OrbitControlsImpl | null;
  const invalidate = useThree((s) => s.invalidate);
  const aspect = useThree((s) => s.size.width / Math.max(1, s.size.height));
  const tween = useRef<gsap.core.Tween | null>(null);
  const fitted = useRef(false);

  // Initial framing for the viewport's aspect ratio (once).
  useEffect(() => {
    if (!controls || fitted.current) return;
    fitted.current = true;
    const k = aspectDistanceFactor(aspect);
    if (k !== 1) {
      const d = camera.position.clone().sub(controls.target);
      camera.position.copy(controls.target).addScaledVector(d, k);
      controls.update();
      invalidate();
    }
  }, [controls, aspect, camera, invalidate]);
  const lastKey = useRef(request.key);

  // Any user interaction interrupts an animated camera move.
  useEffect(() => {
    if (!controls) return;
    const stop = () => {
      tween.current?.kill();
      tween.current = null;
    };
    controls.addEventListener("start", stop);
    return () => controls.removeEventListener("start", stop);
  }, [controls]);

  useEffect(() => {
    if (!controls || request.key === lastKey.current) return;
    lastKey.current = request.key;
    tween.current?.kill(); // cancel any previous transition
    const center = controls.target;
    const fromDir = camera.position.clone().sub(center);
    const fromDist = fromDir.length();
    fromDir.normalize();
    const pose = cameraPose(request.target);
    const dir = pose.dir;
    const dist = Math.min(CAMERA_LIMITS.maxDistance * 1.4, (pose.dist + (separated ? 0.75 : 0)) * aspectDistanceFactor(aspect));
    const q = new THREE.Quaternion().setFromUnitVectors(fromDir, dir);
    const qi = new THREE.Quaternion();
    const d = new THREE.Vector3();
    const apply = (t: number) => {
      qi.identity().slerp(q, t);
      d.copy(fromDir).applyQuaternion(qi);
      camera.position.copy(center).addScaledVector(d, THREE.MathUtils.lerp(fromDist, dist, t));
      camera.lookAt(center);
      controls.update();
      invalidate();
    };
    if (reducedMotion) {
      apply(1);
      return;
    }
    const s = { t: 0 };
    tween.current = gsap.to(s, { t: 1, duration: 1.05, ease: "power2.inOut", onUpdate: () => apply(s.t) });
    // eslint-disable-next-line react-hooks/exhaustive-deps -- only a new request (key) starts a move
  }, [request, controls, camera, reducedMotion, invalidate]);

  useEffect(() => () => void tween.current?.kill(), []);
  return null;
}

function Lighting() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[2.5, 4, -2]} intensity={1.15} color="#efeaff" />
      <directionalLight position={[-3, 1.5, 2]} intensity={0.55} color="#d3f4ff" />
      <Environment resolution={128} frames={1}>
        <Lightformer form="rect" intensity={1.5} color="#ddd3ff" position={[0, 5, 0]} rotation-x={Math.PI / 2} scale={[10, 10, 1]} />
        <Lightformer form="rect" intensity={1.3} color="#c2f2e6" position={[-5, 0.5, 0]} rotation-y={Math.PI / 2} scale={[8, 5, 1]} />
        <Lightformer form="rect" intensity={1.1} color="#d4e9ff" position={[5, 1, 0]} rotation-y={-Math.PI / 2} scale={[8, 5, 1]} />
        <Lightformer form="ring" intensity={1.6} position={[0, 1.5, -6]} scale={3} />
        <Lightformer form="rect" intensity={0.6} color="#e9f7ff" position={[0, -4, 0]} rotation-x={-Math.PI / 2} scale={[10, 10, 1]} />
      </Environment>
    </>
  );
}

function ModelProgress() {
  const { progress, active } = useProgress();
  return (
    <div className="absolute inset-0 grid place-items-center" role="status" aria-live="polite">
      <div className="glass-pill flex items-center gap-3 rounded-full px-4 py-2.5 text-[0.875rem] text-ink-soft">
        <span className="size-2.5 animate-pulse rounded-full bg-teal" aria-hidden="true" />
        Loading brain model…
        {active && progress > 0 && progress < 100 && <span className="tabular-nums text-muted">{Math.round(progress)}%</span>}
      </div>
    </div>
  );
}

// ───────────────────────── Canvas ─────────────────────────
export default function BrainCanvas(props: BrainCanvasProps) {
  const { highlightedIds, selectedId, revealInternal, view, camera, reducedMotion, onSelectRegion, onStatus, attempt = 0 } = props;
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  // Clear a previously failed load before rendering the model again (runs once per mount).
  useState(() => {
    if (attempt > 0) useGLTF.clear(MODEL_URL);
    return null;
  });
  const reportStatus = (s: ViewerStatus, detail?: string) => {
    if (s === "ready") setReady(true);
    if (s === "error") setFailed(true);
    onStatus(s, detail);
  };
  const markerEls = useRef(new Map<string, HTMLButtonElement>());
  const separationRef = useRef(0);
  const initial = useMemo(() => {
    const p = new THREE.Vector3(...DEFAULT_CAMERA.direction).normalize().multiplyScalar(DEFAULT_CAMERA.distance).add(ORBIT_TARGET);
    return [p.x, p.y, p.z] as [number, number, number];
  }, []);
  const showDeep = view.material === "glass" || revealInternal;
  const anyHighlight = highlightedIds.length > 0;

  return (
    <div className="absolute inset-0">
      <Canvas
        frameloop="demand"
        dpr={[1, 1.75]}
        camera={{ fov: 32, near: 0.1, far: 40, position: initial }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        onCreated={({ gl }) => {
          gl.toneMapping = THREE.NeutralToneMapping;
          gl.setClearColor(0x000000, 0);
          gl.domElement.addEventListener("webglcontextlost", (e) => {
            e.preventDefault();
            reportStatus("error", "The graphics context was lost.");
          });
        }}
        aria-hidden="true"
        className="!touch-none"
      >
        <Lighting />
        <SceneErrorBoundary onError={(msg) => reportStatus("error", msg)}>
          <Suspense fallback={null}>
            <BrainModel
              highlightedIds={highlightedIds}
              revealInternal={revealInternal}
              view={view}
              reducedMotion={reducedMotion}
              separationRef={separationRef}
              onSelectRegion={onSelectRegion}
              onReady={() => reportStatus("ready")}
            />
            <MarkerProjector elements={markerEls} separationRef={separationRef} showDeep={showDeep} separated={view.separated} />
          </Suspense>
        </SceneErrorBoundary>
        <OrbitControls
          makeDefault
          target={ORBIT_TARGET}
          enablePan={false}
          enableDamping={!reducedMotion}
          dampingFactor={0.09}
          rotateSpeed={0.7}
          zoomSpeed={0.8}
          minDistance={CAMERA_LIMITS.minDistance}
          maxDistance={CAMERA_LIMITS.maxDistance * 1.4}
          minPolarAngle={0.15}
          maxPolarAngle={Math.PI - 0.15}
        />
        <CameraRig request={camera} reducedMotion={reducedMotion} separated={view.separated} />
      </Canvas>

      {!ready && !failed && <ModelProgress />}

      {/* Marker overlay: real buttons, positioned by MarkerProjector without React re-renders. */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-label="Region markers" role="group">
        {MARKERS.map((m) => {
          const region = getRegion(m.regionId);
          if (!region) return null;
          const selected = selectedId === m.regionId;
          const dim = anyHighlight && !highlightedIds.includes(m.regionId);
          const sideLabel = m.side === "left" ? "left" : "right";
          return (
            <button
              key={m.key}
              ref={(el) => {
                if (el) markerEls.current.set(m.key, el);
                else markerEls.current.delete(m.key);
              }}
              type="button"
              className="marker"
              style={{ visibility: "hidden" }}
              data-deep={m.deep}
              data-selected={selected}
              data-dim={dim}
              aria-pressed={selected}
              aria-label={`${region.name}, ${sideLabel} hemisphere${m.deep ? ", deep structure" : ""}`}
              onClick={() => onSelectRegion(m.regionId)}
            >
              <span className="marker-dot" aria-hidden="true" />
              <span className="marker-label glass-pill" aria-hidden="true">
                {region.shortName}
                {m.deep && <span className="font-normal text-muted"> · deep</span>}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

useGLTF.preload(MODEL_URL);
