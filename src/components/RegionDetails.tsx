"use client";

import { brainClaimIdsForRegion, claimIdsForRegion, getLesson } from "@/content";
import type { BrainRegion, LessonId } from "@/content/types";
import { ClaimItem, numberCitations, SourceList } from "./Claims";

interface Props {
  region: BrainRegion;
  onStartLesson?: (id: LessonId) => void;
  /** Heading level for the trait name (panel = h2, text guide = h3). */
  headingLevel?: 2 | 3;
  idPrefix: string;
  /** Show the brief brain-connection note (hidden in the psychology-only text guide). */
  showBrainLink?: boolean;
}

/** The psychological trait linked to a brain area. Pure HTML — works without WebGL. */
export function RegionDetails({ region, onStartLesson, headingLevel = 2, idPrefix, showBrainLink = true }: Props) {
  const H = headingLevel === 2 ? "h2" : "h3";
  const S = headingLevel === 2 ? "h3" : "h4";
  const { list, numbering } = numberCitations(claimIdsForRegion(region, { includeBrain: showBrainLink }));

  return (
    <article aria-labelledby={`${idPrefix}-title`} className="space-y-6">
      <header className="space-y-3">
        <p className="eyebrow">{region.name} · Psychological trait</p>
        <H id={`${idPrefix}-title`} className="display text-[2.25rem] text-ink sm:text-[2.5rem]">
          {region.trait}
        </H>
        <p className="text-[1.0625rem] font-light italic leading-snug text-ink-soft">{region.tagline}</p>
        <p className="text-[1.0625rem] leading-relaxed text-ink">{region.intro}</p>
      </header>

      <section aria-labelledby={`${idPrefix}-facts`} className="space-y-4">
        <S id={`${idPrefix}-facts`} className="eyebrow">What research shows</S>
        <ul className="space-y-5">
          {region.facts.map((f) => (
            <li key={f.heading} className="space-y-2">
              <p className="text-[1rem] font-semibold tracking-[-0.01em] text-ink">{f.heading}</p>
              <ul className="space-y-3">
                {f.claimIds.map((id) => (
                  <ClaimItem key={id} claimId={id} numbering={numbering} idPrefix={idPrefix} />
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby={`${idPrefix}-ex`} className="rounded-2xl border border-white/80 bg-gradient-to-br from-mint/50 to-aqua/50 p-4">
        <S id={`${idPrefix}-ex`} className="eyebrow mb-1.5">In everyday life</S>
        <p className="text-[0.9375rem] leading-relaxed text-ink">{region.example}</p>
      </section>

      <section aria-labelledby={`${idPrefix}-kim`} className="space-y-2">
        <S id={`${idPrefix}-kim`} className="eyebrow">Keep in mind</S>
        <ul className="list-disc space-y-1.5 pl-5 text-[0.9375rem] leading-relaxed text-ink-soft marker:text-muted">
          {region.keepInMind.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ul>
      </section>

      {showBrainLink && (
        <section aria-labelledby={`${idPrefix}-brain`} className="space-y-3 rounded-2xl border border-white/80 bg-white/60 p-4">
          <S id={`${idPrefix}-brain`} className="eyebrow">The brain connection</S>
          <p className="text-[0.9375rem] leading-relaxed text-ink">{region.brainLink.text}</p>
          <ul className="space-y-3">
            {brainClaimIdsForRegion(region).map((id) => (
              <ClaimItem key={id} claimId={id} numbering={numbering} idPrefix={idPrefix} />
            ))}
          </ul>
        </section>
      )}

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
