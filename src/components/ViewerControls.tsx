"use client";

import { useEffect, useId, useRef, useState } from "react";
import type { ViewOptions } from "@/lib/atlasState";
import { Icon } from "./ui";

interface Props {
  view: ViewOptions;
  revealInternal: boolean;
  mode: "3d" | "2d";
  canUse3D: boolean;
  reducedMotion: boolean;
  onReset: () => void;
  onToggleInternal: () => void;
  onToggleSeparated: () => void;
  onToggleMaterial: () => void;
  onToggleMode: () => void;
  onToggleMotion: () => void;
}

function ToolButton({
  pressed,
  onClick,
  label,
  title,
  children,
  disabled,
}: {
  pressed?: boolean;
  onClick: () => void;
  label: string;
  /** Full accessible name when the visible label is abbreviated. */
  title?: string;
  children: React.ReactNode;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={pressed}
      aria-label={title}
      title={title}
      disabled={disabled}
      className={`inline-flex min-h-11 min-w-11 items-center justify-center gap-1.5 whitespace-nowrap rounded-full px-2.5 sm:min-h-10 sm:px-3 text-[0.8125rem] font-medium transition-colors disabled:opacity-40 ${
        pressed ? "bg-night text-white" : "text-ink hover:bg-white/80"
      }`}
    >
      {children}
      <span className={title ? "hidden sm:inline" : undefined}>{label}</span>
    </button>
  );
}

export function ViewerControls(p: Props) {
  const [infoOpen, setInfoOpen] = useState(false);
  const infoId = useId();
  const infoRef = useRef<HTMLDivElement>(null);
  const infoBtn = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!infoOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setInfoOpen(false);
        infoBtn.current?.focus();
      }
    };
    const onDown = (e: PointerEvent) => {
      if (!infoRef.current?.contains(e.target as Node) && !infoBtn.current?.contains(e.target as Node)) setInfoOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onDown);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onDown);
    };
  }, [infoOpen]);

  const is3D = p.mode === "3d";
  return (
    <div className="relative flex flex-col items-center gap-2">
      <p className="text-center text-[0.8125rem] text-muted">
        {is3D ? "Drag to rotate · Scroll or pinch to zoom · Select a region" : "Labelled 2D view · Select a region"}
      </p>
      <div role="toolbar" aria-label="Viewer controls" className="glass-pill flex max-w-full flex-wrap items-center justify-center gap-0.5 rounded-[24px] p-1">
        {is3D && (
          <>
            <ToolButton onClick={p.onReset} label="Reset" title="Reset view"><Icon.Reset width={16} height={16} /></ToolButton>
            <ToolButton onClick={p.onToggleInternal} pressed={p.view.internal} label="Internal" title="Show internal structures"><Icon.Layers width={16} height={16} /></ToolButton>
            <ToolButton onClick={p.onToggleSeparated} pressed={p.view.separated} label="Separate" title="Separate hemispheres"><Icon.Split width={16} height={16} /></ToolButton>
            <ToolButton onClick={p.onToggleMaterial} pressed={p.view.material === "solid"} label="Solid" title="Solid material view">
              {p.view.material === "solid" ? <Icon.Solid width={16} height={16} /> : <Icon.Glass width={16} height={16} />}
            </ToolButton>
          </>
        )}
        <ToolButton onClick={p.onToggleMode} label={is3D ? "2D" : "3D"} title={is3D ? "Show labelled 2D view" : "Show 3D view"} disabled={!is3D && !p.canUse3D}>
          {is3D ? <Icon.Map width={16} height={16} /> : <Icon.Cube width={16} height={16} />}
        </ToolButton>
        <button
          ref={infoBtn}
          type="button"
          aria-expanded={infoOpen}
          aria-controls={infoId}
          onClick={() => setInfoOpen((v) => !v)}
          className="grid size-11 place-items-center rounded-full text-ink hover:bg-white/80 sm:size-10"
          aria-label="About this view"
        >
          <Icon.Info width={18} height={18} />
        </button>
      </div>

      {infoOpen && (
        <div
          ref={infoRef}
          id={infoId}
          role="dialog"
          aria-label="About this view"
          className="glass-strong absolute bottom-full z-30 mb-3 w-[min(92vw,380px)] rounded-[20px] p-4 text-left text-[0.8125rem] leading-relaxed text-ink-soft"
        >
          <p className="mb-1.5 font-semibold text-ink">How to read this model</p>
          <ul className="list-disc space-y-1 pl-4">
            <li>Colours, glass, and transparency are illustrative styling choices. They do not show tissue appearance or brain activity.</li>
            <li>Teal highlights mark regions discussed in the text — not measured activity or signal timing.</li>
            <li>The model is an average of many adult brains. Real boundaries and functions vary between people.</li>
            <li>Deep structures (hippocampus, amygdala) sit inside the brain. Hollow markers and a faded outer surface show they are not on the exterior.</li>
            <li>Only six educational region groups are selectable; this is a simplified selection.</li>
          </ul>
          <button type="button" onClick={p.onToggleMotion} className="mt-3 rounded-full border border-ink/15 px-3 py-1.5 font-medium text-ink hover:bg-white" aria-pressed={p.reducedMotion}>
            {p.reducedMotion ? "Reduced motion: on" : "Reduced motion: off"}
          </button>
        </div>
      )}
      <p className="sr-only" aria-live="polite">
        {p.revealInternal ? "Outer surface faded to show internal structures." : ""}
      </p>
    </div>
  );
}
