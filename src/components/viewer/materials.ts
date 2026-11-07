import * as THREE from "three";

/**
 * Shared materials for the brain model. Created once per canvas and reused across meshes.
 *
 * The "glass" look is an illustrative style: a physically based, clear-coated surface whose
 * opacity rises toward grazing angles (a Fresnel-like edge), so folds stay readable while the
 * interior shows through. A depth pre-pass (see BrainModel) means only the front-most outer
 * surface is shaded, avoiding sorting artifacts between overlapping transparent folds.
 */

interface GlassOptions {
  color: string;
  /** Optional illustrative vertical tint (mint below → lavender above), independent of regions. */
  gradient?: { low: string; high: string };
  center: number;
  edge: number;
  rim: string;
  rimStrength?: number;
  emissive?: string;
  emissiveIntensity?: number;
  roughness?: number;
}

function glass(name: string, o: GlassOptions): THREE.MeshPhysicalMaterial {
  const m = new THREE.MeshPhysicalMaterial({
    name,
    color: o.color,
    roughness: o.roughness ?? 0.24,
    metalness: 0,
    clearcoat: 1,
    clearcoatRoughness: 0.14,
    specularIntensity: 1,
    ior: 1.45,
    envMapIntensity: 1.45,
    emissive: o.emissive ?? "#000000",
    emissiveIntensity: o.emissiveIntensity ?? 0,
    transparent: true,
    depthWrite: false,
  });
  m.depthFunc = THREE.LessEqualDepth;
  const uniforms = {
    uCenter: { value: o.center },
    uEdge: { value: o.edge },
    uRim: { value: new THREE.Color(o.rim) },
    uRimStrength: { value: o.rimStrength ?? 0.32 },
    uGradient: { value: o.gradient ? 1 : 0 },
    uLow: { value: new THREE.Color(o.gradient?.low ?? o.color) },
    uHigh: { value: new THREE.Color(o.gradient?.high ?? o.color) },
  };
  m.userData.uniforms = uniforms;
  m.onBeforeCompile = (shader) => {
    Object.assign(shader.uniforms, uniforms);
    shader.vertexShader = shader.vertexShader
      .replace("#include <common>", "#include <common>\nvarying float vMaHeight;")
      .replace("#include <project_vertex>", "#include <project_vertex>\nvMaHeight = (modelMatrix * vec4(transformed, 1.0)).y;");
    shader.fragmentShader = shader.fragmentShader
      .replace(
        "#include <common>",
        "#include <common>\nuniform float uCenter;\nuniform float uEdge;\nuniform vec3 uRim;\nuniform float uRimStrength;\nuniform float uGradient;\nuniform vec3 uLow;\nuniform vec3 uHigh;\nvarying float vMaHeight;",
      )
      .replace(
        "#include <color_fragment>",
        "#include <color_fragment>\nif (uGradient > 0.5) diffuseColor.rgb = mix(uLow, uHigh, smoothstep(-0.75, 0.55, vMaHeight));",
      )
      .replace(
        "#include <opaque_fragment>",
        [
          "float maFres = pow(1.0 - clamp(abs(dot(normalize(normal), normalize(vViewPosition))), 0.0, 1.0), 1.8);",
          "outgoingLight += uRim * maFres * uRimStrength;",
          "#include <opaque_fragment>",
          "gl_FragColor.a = mix(uCenter, uEdge, maFres);",
        ].join("\n"),
      );
  };
  m.customProgramCacheKey = () => "mind-atlas-glass-v2";
  return m;
}

export interface BrainMaterials {
  depthPrepass: THREE.MeshBasicMaterial;
  glassIcy: THREE.MeshPhysicalMaterial;
  glassMint: THREE.MeshPhysicalMaterial;
  glassDim: THREE.MeshPhysicalMaterial;
  glassFaded: THREE.MeshPhysicalMaterial;
  glassHighlight: THREE.MeshPhysicalMaterial;
  solid: THREE.MeshStandardMaterial;
  solidMint: THREE.MeshStandardMaterial;
  solidDim: THREE.MeshStandardMaterial;
  solidHighlight: THREE.MeshStandardMaterial;
  deepHippocampus: THREE.MeshStandardMaterial;
  deepAmygdala: THREE.MeshStandardMaterial;
  deepHighlight: THREE.MeshStandardMaterial;
  outline: THREE.LineBasicMaterial;
  all: THREE.Material[];
}

export function createBrainMaterials(): BrainMaterials {
  const depthPrepass = new THREE.MeshBasicMaterial({ name: "depth-prepass", colorWrite: false, depthWrite: true, transparent: true });
  // Illustrative tint: aqua-mint at the base blending into lavender at the crown.
  const gradient = { low: "#8fd3c4", high: "#a493dd" };
  const glassIcy = glass("glass-icy", { color: "#b1a6e0", gradient, center: 0.4, edge: 0.95, rim: "#e6defd", rimStrength: 0.28, roughness: 0.2, emissive: "#9b8bd6", emissiveIntensity: 0.1 });
  const glassMint = glassIcy;
  const glassDim = glass("glass-dim", { color: "#d2cdea", gradient: { low: "#c6e6dd", high: "#cbc2ea" }, center: 0.24, edge: 0.82, rim: "#efeafe", rimStrength: 0.25, emissive: "#cbc3ea", emissiveIntensity: 0.25 });
  const glassFaded = glass("glass-faded", { color: "#dcd8ef", gradient: { low: "#d0ece4", high: "#d9d2f0" }, center: 0.07, edge: 0.4, rim: "#f3f0ff", rimStrength: 0.25, emissive: "#ddd8f1", emissiveIntensity: 0.4 });
  const glassHighlight = glass("glass-highlight", {
    color: "#47c7bf",
    center: 0.5,
    edge: 0.94,
    rim: "#e3fffb",
    rimStrength: 0.4,
    emissive: "#0e8f89",
    emissiveIntensity: 0.22,
    roughness: 0.3,
  });
  const solid = new THREE.MeshStandardMaterial({ name: "solid", color: "#cbc6e2", roughness: 0.58, metalness: 0 });
  const solidMint = new THREE.MeshStandardMaterial({ name: "solid-mint", color: "#c9ddd5", roughness: 0.6, metalness: 0 });
  const solidDim = new THREE.MeshStandardMaterial({ name: "solid-dim", color: "#d6dee3", roughness: 0.65, metalness: 0 });
  const solidHighlight = new THREE.MeshStandardMaterial({ name: "solid-highlight", color: "#1fa59e", roughness: 0.45, metalness: 0, emissive: "#0b5f61", emissiveIntensity: 0.15 });
  const deepHippocampus = new THREE.MeshStandardMaterial({ name: "deep-hippocampus", color: "#8fd3c6", roughness: 0.35, metalness: 0 });
  const deepAmygdala = new THREE.MeshStandardMaterial({ name: "deep-amygdala", color: "#9cc6e4", roughness: 0.35, metalness: 0 });
  const deepHighlight = new THREE.MeshStandardMaterial({ name: "deep-highlight", color: "#12a59d", roughness: 0.3, metalness: 0, emissive: "#0b6d70", emissiveIntensity: 0.35 });
  const outline = new THREE.LineBasicMaterial({ name: "outline", color: "#0b6d70", transparent: true, opacity: 0.95, depthWrite: false });
  const all = [depthPrepass, glassIcy, glassDim, glassFaded, glassHighlight, solid, solidMint, solidDim, solidHighlight, deepHippocampus, deepAmygdala, deepHighlight, outline];
  return { depthPrepass, glassIcy, glassMint, glassDim, glassFaded, glassHighlight, solid, solidMint, solidDim, solidHighlight, deepHippocampus, deepAmygdala, deepHighlight, outline, all };
}

/**
 * Edges used by exactly one triangle: the boundary of an open surface patch, i.e. the
 * outline of a region on the cortical surface. Offset slightly along the normal so the
 * line is not hidden by the surface itself.
 */
export function boundarySegments(geometry: THREE.BufferGeometry, offsetLocal: number): THREE.BufferGeometry | null {
  const index = geometry.index;
  const pos = geometry.getAttribute("position");
  const nor = geometry.getAttribute("normal");
  if (!index || !pos) return null;
  const n = pos.count;
  const counts = new Map<number, number>();
  const idx = index.array;
  for (let i = 0; i < idx.length; i += 3) {
    for (let e = 0; e < 3; e++) {
      const a = idx[i + e]!;
      const b = idx[i + ((e + 1) % 3)]!;
      const key = a < b ? a * n + b : b * n + a;
      counts.set(key, (counts.get(key) ?? 0) + 1);
    }
  }
  const out: number[] = [];
  const push = (v: number) => {
    const nx = nor ? nor.getX(v) : 0;
    const ny = nor ? nor.getY(v) : 0;
    const nz = nor ? nor.getZ(v) : 0;
    out.push(pos.getX(v) + nx * offsetLocal, pos.getY(v) + ny * offsetLocal, pos.getZ(v) + nz * offsetLocal);
  };
  for (const [key, c] of counts) {
    if (c !== 1) continue;
    const a = Math.floor(key / n);
    const b = key - a * n;
    push(a);
    push(b);
  }
  if (!out.length) return null;
  const g = new THREE.BufferGeometry();
  g.setAttribute("position", new THREE.Float32BufferAttribute(out, 3));
  return g;
}
