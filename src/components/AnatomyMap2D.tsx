"use client";

import { useState } from "react";
import { getRegion, isRegionId } from "@/content";
import { anatomyViews2D } from "@/content/generated/anatomy2d";
import type { RegionId } from "@/content/types";

const CONTEXT_LABEL: Record<string, string> = {
  motor: "Motor cortex",
  cingulate_insula: "Cingulate / insula",
  other: "Midline cut",
  cerebellum: "Cerebellum",
  brainstem: "Brainstem",
};

const VIEW_TEXT: Record<string, { title: string; desc: string }> = {
  lateral: { title: "Side view (left hemisphere)", desc: "Seen from the left; front of the brain points left." },
  medial: { title: "Inner view (left hemisphere)", desc: "Seen from the midline; front of the brain points right." },
};

/**
 * Labelled 2D anatomy generated from the same atlas data as the 3D model.
 * Deep structures are projected through the surface and drawn as dashed outlines.
 */
export function AnatomyMap2D({
  highlightedIds,
  selectedId,
  onSelect,
}: {
  highlightedIds: RegionId[];
  selectedId: RegionId | null;
  onSelect: (id: RegionId) => void;
}) {
  const [viewId, setViewId] = useState<string>("lateral");
  const view = anatomyViews2D.find((v) => v.id === viewId) ?? anatomyViews2D[0]!;
  const vb = view.viewBox.join(" ");
  const anyHighlight = highlightedIds.length > 0;

  const fillFor = (regionId: string | null, group: string) => {
    if (regionId && highlightedIds.includes(regionId as RegionId)) return "#5cc8c2";
    if (regionId) return anyHighlight ? "#e2ebf0" : "#d3e5ee";
    return group === "cerebellum" || group === "brainstem" ? "#e3ece8" : "#eef2f4";
  };

  return (
    <figure className="flex h-full w-full flex-col items-center justify-center gap-3 p-3" aria-labelledby="map2d-caption">
      <div role="tablist" aria-label="2D view" className="glass-pill flex rounded-full p-1">
        {anatomyViews2D.map((v) => (
          <button
            key={v.id}
            role="tab"
            type="button"
            aria-selected={v.id === viewId}
            onClick={() => setViewId(v.id)}
            className={`min-h-9 rounded-full px-3.5 text-[0.8125rem] font-medium ${v.id === viewId ? "bg-night text-white" : "text-ink hover:bg-white/80"}`}
          >
            {VIEW_TEXT[v.id]?.title.split(" (")[0] ?? v.id}
          </button>
        ))}
      </div>
      <svg viewBox={vb} className="h-auto max-h-[100%] w-full max-w-[640px]" role="group" aria-label={`${VIEW_TEXT[view.id]?.title}. Labelled regions are selectable.`}>
        <defs>
          <filter id="map-soft" x="-5%" y="-5%" width="110%" height="110%">
            <feDropShadow dx="0" dy="6" stdDeviation="8" floodColor="#1d3a4c" floodOpacity="0.12" />
          </filter>
        </defs>
        <g filter="url(#map-soft)">
          {view.outline.map((d, i) => (
            <path key={`o${i}`} d={d} fill="#f4f8fa" />
          ))}
        </g>
        {view.regions.map((r) => {
          const selectable = r.regionId && isRegionId(r.regionId);
          const region = selectable ? getRegion(r.regionId!) : undefined;
          const highlighted = !!r.regionId && highlightedIds.includes(r.regionId as RegionId);
          const common = {
            fill: fillFor(r.regionId, r.group),
            stroke: highlighted ? "#0b6d70" : "#ffffff",
            strokeWidth: highlighted ? 2.4 : 1.4,
            strokeLinejoin: "round" as const,
          };
          if (!region) return <g key={r.group}>{r.paths.map((d, i) => <path key={i} d={d} {...common} />)}</g>;
          return (
            <g
              key={r.group}
              role="button"
              tabIndex={0}
              aria-label={`${region.trait}: ${region.name}${highlighted ? " (highlighted)" : ""}`}
              aria-pressed={selectedId === region.id}
              className="cursor-pointer focus-ring-inset outline-none [&:focus-visible>path]:stroke-[#0b6d70] [&:focus-visible>path]:[stroke-width:3]"
              onClick={() => onSelect(region.id)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onSelect(region.id);
                }
              }}
            >
              {r.paths.map((d, i) => <path key={i} d={d} {...common} />)}
            </g>
          );
        })}
        <g aria-hidden="true" fill="none" stroke="#7e95a3" strokeOpacity="0.35" strokeWidth="1">
          {view.sulci.map((d, i) => <path key={`s${i}`} d={d} />)}
        </g>
        {view.deep.map((d) => {
          const region = isRegionId(d.regionId) ? getRegion(d.regionId) : undefined;
          if (!region) return null;
          const highlighted = highlightedIds.includes(region.id);
          return (
            <g
              key={d.regionId}
              role="button"
              tabIndex={0}
              aria-label={`${region.trait}: ${region.name} (deep structure, shown as an outline projected through the surface)`}
              aria-pressed={selectedId === region.id}
              className="cursor-pointer outline-none [&:focus-visible>path]:[stroke-width:3.5]"
              onClick={() => onSelect(region.id)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onSelect(region.id);
                }
              }}
            >
              {d.paths.map((p, i) => (
                <path key={i} d={p} fill={highlighted ? "rgb(23 168 163 / 0.35)" : "rgb(255 255 255 / 0.35)"} stroke={highlighted ? "#0b6d70" : "#2f6f7a"} strokeWidth={highlighted ? 2.6 : 1.8} strokeDasharray="5 4" />
              ))}
            </g>
          );
        })}
        <g aria-hidden="true" className="pointer-events-none" fontFamily="inherit">
          {view.regions.map((r) => {
            if (!r.label) return null;
            const region = r.regionId && isRegionId(r.regionId) ? getRegion(r.regionId) : undefined;
            const text = region?.shortName ?? CONTEXT_LABEL[r.group];
            // Skip small context labels that would collide with deep-structure callouts.
            if (!text || r.group === "other" || (view.id === "lateral" && r.group === "cingulate_insula")) return null;
            return (
              <text key={`l${r.group}`} x={r.label[0]} y={r.label[1]} textAnchor="middle" dominantBaseline="middle" fontSize={region ? 13 : 10.5} fontWeight={region ? 600 : 500} fill={region ? "#13202b" : "#4a5a67"} paintOrder="stroke" stroke="#ffffff" strokeWidth={3} strokeOpacity={0.8}>
                {text}
              </text>
            );
          })}
          {view.deep.map((d, i) => {
            if (!d.label) return null;
            const region = isRegionId(d.regionId) ? getRegion(d.regionId) : undefined;
            const dy = i === 0 ? 26 : -26;
            const [lx = 0, ly = 0] = d.label;
            return (
              <g key={`dl${d.regionId}`}>
                <line x1={lx} y1={ly} x2={lx + (i === 0 ? 24 : -26)} y2={ly + dy} stroke="#2f6f7a" strokeWidth="1" />
                <text x={lx + (i === 0 ? 26 : -28)} y={ly + dy + (i === 0 ? 8 : -4)} textAnchor={i === 0 ? "start" : "end"} fontSize={11.5} fontWeight={600} fill="#0b4f53" paintOrder="stroke" stroke="#fff" strokeWidth={3}>
                  {region?.shortName} (deep)
                </text>
              </g>
            );
          })}
        </g>
      </svg>
      <figcaption id="map2d-caption" className="max-w-md text-center text-[0.75rem] leading-snug text-muted">
        {VIEW_TEXT[view.id]?.desc} Generated from the same atlas as the 3D model. Dashed outlines show deep structures
        projected through the surface — they are not visible on the outside of a real brain.
      </figcaption>
    </figure>
  );
}
