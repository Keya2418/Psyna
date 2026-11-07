"use client";

import dynamic from "next/dynamic";
import { Component, useCallback, useState, type ReactNode } from "react";
import type { RegionId } from "@/content/types";
import type { CameraRequest, ViewOptions } from "@/lib/atlasState";
import { useWebGLSupport } from "@/lib/hooks";
import { AnatomyMap2D } from "../AnatomyMap2D";
import { Button } from "../ui";
import type { ViewerStatus } from "./BrainCanvas";

const BrainCanvas = dynamic(() => import("./BrainCanvas"), {
  ssr: false,
  loading: () => <LoadingOverlay label="Loading 3D viewer…" />,
});

export interface BrainViewerProps {
  mode: "3d" | "2d";
  onRequest2D: () => void;
  highlightedIds: RegionId[];
  selectedId: RegionId | null;
  revealInternal: boolean;
  view: ViewOptions;
  camera: CameraRequest;
  reducedMotion: boolean;
  onSelectRegion: (id: RegionId) => void;
  onWebGLUnavailable?: () => void;
}

export function LoadingOverlay({ label, progress }: { label: string; progress?: number }) {
  return (
    <div className="absolute inset-0 grid place-items-center" role="status" aria-live="polite">
      <div className="glass-pill flex items-center gap-3 rounded-full px-4 py-2.5 text-[0.875rem] text-ink-soft">
        <span className="size-2.5 animate-pulse rounded-full bg-teal" aria-hidden="true" />
        {label}
        {progress !== undefined && progress > 0 && progress < 100 && <span className="tabular-nums text-muted">{Math.round(progress)}%</span>}
      </div>
    </div>
  );
}

/** Catches failures loading the viewer code chunk itself. */
class ChunkBoundary extends Component<{ onError: (m: string) => void; children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch(e: unknown) {
    this.props.onError(e instanceof Error ? e.message : String(e));
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}

export function BrainViewer(props: BrainViewerProps) {
  const webgl = useWebGLSupport();
  const [attempt, setAttempt] = useState(0);
  const [status, setStatus] = useState<ViewerStatus>("loading");
  const [errorDetail, setErrorDetail] = useState<string | undefined>();

  const onStatus = useCallback((s: ViewerStatus, detail?: string) => {
    setStatus(s);
    if (detail) setErrorDetail(detail);
  }, []);

  const retry = () => {
    setErrorDetail(undefined);
    setStatus("loading");
    setAttempt((a) => a + 1);
  };

  const show2D = props.mode === "2d" || webgl === "unsupported";

  if (show2D) {
    return (
      <div className="absolute inset-0 flex flex-col">
        {webgl === "unsupported" && (
          <p role="note" className="mx-auto mt-2 max-w-md rounded-full bg-white/75 px-4 py-1.5 text-center text-[0.8125rem] text-ink-soft">
            3D graphics aren&apos;t available in this browser, so a labelled 2D view is shown instead.
          </p>
        )}
        <div className="min-h-0 flex-1">
          <AnatomyMap2D highlightedIds={props.highlightedIds} selectedId={props.selectedId} onSelect={props.onSelectRegion} />
        </div>
      </div>
    );
  }

  if (webgl === "checking") return <LoadingOverlay label="Preparing viewer…" />;

  return (
    <div className="absolute inset-0" data-viewer-status={status}>
      <ChunkBoundary key={`chunk-${attempt}`} onError={(m) => onStatus("error", m)}>
        <BrainCanvas
          key={attempt}
          attempt={attempt}
          highlightedIds={props.highlightedIds}
          selectedId={props.selectedId}
          revealInternal={props.revealInternal}
          view={props.view}
          camera={props.camera}
          reducedMotion={props.reducedMotion}
          onSelectRegion={props.onSelectRegion}
          onStatus={onStatus}
        />
      </ChunkBoundary>
      {status === "error" && (
        <div className="absolute inset-0 grid place-items-center p-4">
          <div role="alert" className="glass-strong max-w-sm space-y-3 rounded-[22px] p-5 text-center">
            <p className="text-[1rem] font-semibold text-ink">The 3D model couldn&apos;t be loaded</p>
            <p className="text-[0.875rem] leading-relaxed text-ink-soft">
              All explanations, lessons, and sources still work. You can try again or use the labelled 2D view.
            </p>
            {errorDetail && <p className="text-[0.75rem] text-muted">Details: {errorDetail}</p>}
            <div className="flex justify-center gap-2">
              <Button variant="dark" onClick={retry}>Try again</Button>
              <Button variant="pill" onClick={props.onRequest2D}>Use 2D view</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
