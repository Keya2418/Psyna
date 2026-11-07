"use client";

import { useId, useState } from "react";
import { searchRegions } from "@/content";
import type { RegionId } from "@/content/types";
import { Icon } from "./ui";

/** Searchable, keyboard-accessible region list synchronised with the 3D selection. */
export function RegionList({
  selectedId,
  highlightedIds,
  onSelect,
  layout = "grid",
}: {
  selectedId: RegionId | null;
  highlightedIds: RegionId[];
  onSelect: (id: RegionId) => void;
  layout?: "grid" | "row";
}) {
  const [query, setQuery] = useState("");
  const inputId = useId();
  const statusId = useId();
  const results = searchRegions(query);

  return (
    <section aria-labelledby={`${inputId}-h`} className="space-y-3">
      <div>
        <h2 id={`${inputId}-h`} className="text-[1.0625rem] font-semibold tracking-[-0.01em] text-ink">Brain regions</h2>
        <p className="text-[0.75rem] text-muted">What each area helps with</p>
      </div>
      <div className="relative">
        <label htmlFor={inputId} className="sr-only">Search regions</label>
        <Icon.Search className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" />
        <input
          id={inputId}
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search, e.g. memory, focus, fear"
          aria-describedby={statusId}
          autoComplete="off"
          className="h-11 w-full rounded-full border border-white/90 bg-white/70 pl-10 pr-4 text-[0.9375rem] text-ink placeholder:text-muted/80 focus-visible:bg-white"
        />
      </div>
      <p id={statusId} className="sr-only" aria-live="polite">
        {results.length} {results.length === 1 ? "region" : "regions"} found
      </p>
      {results.length === 0 ? (
        <p className="px-1 text-[0.875rem] text-muted">No matching regions. Try “memory”, “vision”, or “emotion”.</p>
      ) : (
        <ul
          className={
            layout === "row"
              ? "scroll-soft -mx-1 flex snap-x gap-2.5 overflow-x-auto px-1 pb-1"
              : "grid grid-cols-2 gap-2.5"
          }
        >
          {results.map((r) => {
            const selected = r.id === selectedId;
            const highlighted = highlightedIds.includes(r.id);
            return (
              <li key={r.id} className={layout === "row" ? "w-[40%] min-w-[140px] shrink-0 snap-start" : ""}>
                <button
                  type="button"
                  aria-pressed={selected}
                  onClick={() => onSelect(r.id)}
                  className={`flex h-full min-h-[64px] w-full flex-col items-start justify-between gap-0.5 rounded-[18px] border px-3.5 py-2.5 text-left transition-colors ${
                    selected
                      ? "border-teal bg-teal-soft text-ink shadow-[inset_0_0_0_1px_var(--color-teal)]"
                      : highlighted
                        ? "border-teal/50 bg-white/80"
                        : "border-white/90 bg-white/55 hover:bg-white/85"
                  }`}
                >
                  <span className="flex w-full items-center justify-between gap-2 text-[0.6875rem] font-semibold uppercase tracking-[0.07em] text-muted">
                    {r.mindTag}
                    {(selected || highlighted) && (
                      <span className="size-2.5 shrink-0 rounded-full bg-teal ring-2 ring-teal-soft" aria-hidden="true" title={selected ? "Selected" : "Highlighted"} />
                    )}
                  </span>
                  <span className="text-[0.9375rem] font-medium leading-tight text-ink">
                    {r.name}
                    {highlighted && !selected && <span className="sr-only"> (highlighted in the current lesson step)</span>}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}
