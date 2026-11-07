"use client";

import { useId, useState } from "react";
import { claimIdsForRegion, getAssetMapping, getClaim, getLesson } from "@/content";
import type { BrainRegion, LessonId, RegionId } from "@/content/types";
import { ClaimItem, numberCitations, SourceList } from "./Claims";
import { Icon } from "./ui";

interface Props {
  region: BrainRegion;
  onSelectRegion?: (id: RegionId) => void;
  onStartLesson?: (id: LessonId) => void;
  /** Heading level for the region name (panel = h2, text guide = h3). */
  headingLevel?: 2 | 3;
  idPrefix: string;
  /** Start with deeper detail expanded (used in the text guide). */
  defaultExpanded?: boolean;
}

/** Full educational content for a region. Pure HTML — works without WebGL. */
export function RegionDetails({ region, onSelectRegion, onStartLesson, headingLevel = 2, idPrefix, defaultExpanded = false }: Props) {
  const [expanded, setExpanded] = useState(defaultExpanded);
  const deeperId = useId();
  const H = headingLevel === 2 ? "h2" : "h3";
  const S = headingLevel === 2 ? "h3" : "h4";
  const { list, numbering } = numberCitations(claimIdsForRegion(region));
  const mapping = getAssetMapping(region.id);
  const psychologyIds = new Set(region.psychology.flatMap((p) => p.claimIds));
  const brainClaimIds = [...new Set([...region.functionClaimIds, ...region.deeperClaimIds])].filter((id) => !psychologyIds.has(id));

  return (
    <article aria-labelledby={`${idPrefix}-title`} className="space-y-6">
      <header className="space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="eyebrow">{region.mindTag}</span>
          <span className="text-[0.75rem] text-muted">· {region.depth === "deep" ? "Deep structure" : "Cortical region group"}</span>
        </div>
        <H id={`${idPrefix}-title`} className="display text-[2.25rem] text-ink sm:text-[2.5rem]">
          {region.name}
        </H>
        <p className="text-[1.0625rem] leading-relaxed text-ink">{region.intro}</p>
        <p className="text-[0.8125rem] leading-snug text-muted">{region.groupingNote}</p>
      </header>

      <section aria-labelledby={`${idPrefix}-psy`} className="space-y-4">
        <S id={`${idPrefix}-psy`} className="eyebrow">The psychology</S>
        <ul className="space-y-5">
          {region.psychology.map((p) => (
            <li key={p.concept} className="space-y-2">
              <p className="text-[1rem] font-semibold tracking-[-0.01em] text-ink">{p.concept}</p>
              <ul className="space-y-3">
                {p.claimIds.map((id) => (
                  <ClaimItem key={id} claimId={id} numbering={numbering} idPrefix={idPrefix} />
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby={`${idPrefix}-ex`} className="rounded-2xl border border-white/80 bg-gradient-to-br from-mint/50 to-aqua/50 p-4">
        <S id={`${idPrefix}-ex`} className="eyebrow mb-1.5">Everyday example</S>
        <p className="text-[0.9375rem] leading-relaxed text-ink">{region.example}</p>
      </section>

      <section aria-labelledby={`${idPrefix}-loc`} className="space-y-2">
        <S id={`${idPrefix}-loc`} className="eyebrow">Where it is in the brain</S>
        <p className="text-[0.9375rem] font-medium text-ink">{region.location.text}</p>
        <ul className="space-y-3">
          {region.location.claimIds.map((id) => (
            <ClaimItem key={id} claimId={id} numbering={numbering} idPrefix={idPrefix} />
          ))}
        </ul>
      </section>

      <section aria-labelledby={`${idPrefix}-ww`} className="space-y-2">
        <S id={`${idPrefix}-ww`} className="eyebrow">Works with other areas</S>
        <ul className="divide-y divide-ink/10 overflow-hidden rounded-2xl border border-white/80 bg-white/55">
          {region.worksWith.map((w) => (
            <li key={w.label} className="flex items-start justify-between gap-3 px-4 py-3">
              <div className="min-w-0">
                <p className="text-[0.9375rem] font-medium text-ink">{w.label}</p>
                <p className="text-[0.875rem] leading-snug text-muted">
                  {w.text}{" "}
                  {(w.claimIds ?? []).flatMap((cid) => getClaim(cid)?.citationIds ?? []).filter((v, i, a) => a.indexOf(v) === i).map((cid) => {
                    const n = numbering.get(cid);
                    return n ? (
                      <a key={cid} href={`#${idPrefix}-src-${cid}`} className="align-super text-[0.6875rem] font-semibold text-teal-strong" aria-label={`Source ${n}`}>[{n}]</a>
                    ) : null;
                  })}
                </p>
              </div>
              {w.regionId && onSelectRegion && w.regionId !== region.id && (
                <button
                  type="button"
                  onClick={() => onSelectRegion(w.regionId!)}
                  className="shrink-0 rounded-full px-3 py-1.5 text-[0.8125rem] font-medium text-teal-strong hover:bg-teal-soft"
                >
                  View<span className="sr-only"> {w.label}</span>
                </button>
              )}
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby={`${idPrefix}-simp`} className="space-y-2">
        <S id={`${idPrefix}-simp`} className="eyebrow">What this explanation simplifies</S>
        <ul className="list-disc space-y-1.5 pl-5 text-[0.9375rem] leading-relaxed text-ink-soft marker:text-muted">
          {region.simplifies.map((s) => (
            <li key={s}>{s}</li>
          ))}
          {mapping && mapping.isolation !== "segmented" && <li>{mapping.isolationNote}</li>}
        </ul>
      </section>

      <div>
        <button
          type="button"
          aria-expanded={expanded}
          aria-controls={deeperId}
          onClick={() => setExpanded((v) => !v)}
          className="flex w-full items-center justify-between rounded-2xl border border-white/80 bg-white/60 px-4 py-3 text-left text-[0.9375rem] font-medium text-ink hover:bg-white/85"
        >
          <span>
            {expanded ? "Hide deeper detail" : "Show deeper detail"}
            <span className="block text-[0.8125rem] font-normal text-muted">The brain science behind it</span>
          </span>
          <Icon.Chevron className={`transition-transform ${expanded ? "rotate-180" : ""}`} />
        </button>
        <div id={deeperId} hidden={!expanded} className="pt-4">
          <ul className="space-y-4">
            {brainClaimIds.map((id) => (
              <ClaimItem key={id} claimId={id} numbering={numbering} idPrefix={idPrefix} />
            ))}
          </ul>
        </div>
      </div>

      {onStartLesson && region.relatedLessonIds.length > 0 && (
        <section aria-labelledby={`${idPrefix}-rl`} className="space-y-2">
          <S id={`${idPrefix}-rl`} className="eyebrow">Related lessons</S>
          <ul className="flex flex-wrap gap-2">
            {region.relatedLessonIds.map((lid) => {
              const l = getLesson(lid);
              return l ? (
                <li key={lid}>
                  <button type="button" onClick={() => onStartLesson(lid)} className="glass-pill inline-flex min-h-10 items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[0.8125rem] font-medium text-ink hover:bg-white">
                    <span className="size-1.5 rounded-full bg-amber" aria-hidden="true" />
                    {l.topic}: {l.title}
                  </button>
                </li>
              ) : null;
            })}
          </ul>
        </section>
      )}

      <SourceList citations={list} idPrefix={idPrefix} />
    </article>
  );
}
