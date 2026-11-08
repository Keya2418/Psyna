"use client";

import { useEffect, useRef } from "react";
import { contentStats, getLesson, getRegion, lessons } from "@/content";
import type { LessonId, RegionId } from "@/content/types";
import type { LessonProgress } from "@/lib/atlasState";
import { ClaimItem, numberCitations, SourceList } from "./Claims";
import { RegionDetails } from "./RegionDetails";
import { ArrowDisc, Button, Icon } from "./ui";

/** Moves focus to a panel heading when the panel content changes (not on first render). */
function useFocusOnChange<T extends HTMLElement>(key: string) {
  const ref = useRef<T>(null);
  const first = useRef(true);
  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    ref.current?.focus({ preventScroll: true });
  }, [key]);
  return ref;
}

export function WelcomePanel({ onExplore }: { onExplore: () => void }) {
  return (
    <div className="panel-enter flex h-full flex-col">
      <p className="eyebrow mb-4">An interactive psychology exhibit</p>
      <h1 className="display text-[2.75rem] text-ink sm:text-[3.25rem] 2xl:text-[4rem] [@media(min-height:1000px)]:xl:text-[4rem]">
        Explore the mind.
        <br />
        <span className="font-normal italic tracking-[-0.03em]">Understand</span> everyday life.
      </h1>
      <p className="mt-5 max-w-md text-[1.0625rem] leading-relaxed text-ink-soft">
        Select any part of the brain to discover a psychological trait, from self-control to empathy to nostalgia,
        explained through published research.
      </p>
      <div className="mt-7 flex flex-wrap items-center gap-3">
        <Button variant="primary" onClick={onExplore}>
          Explore the brain
          <ArrowDisc />
        </Button>
      </div>

      <dl className="mt-8 grid max-w-md grid-cols-3 gap-4 border-b border-white/80 pb-5">
        {[
          [contentStats.traits, "Traits"],
          [contentStats.lessons, "Guided lessons"],
          [contentStats.citations, "Cited sources"],
        ].map(([n, label]) => (
          <div key={label as string}>
            <dt className="sr-only">{label}</dt>
            <dd className="display text-[2rem] font-light text-ink">{n}</dd>
            <dd aria-hidden="true" className="text-[0.8125rem] text-muted">{label}</dd>
          </div>
        ))}
      </dl>
      <p className="mt-5 max-w-md text-[0.875rem] text-muted">Explained through psychology research, with a source for every claim.</p>
    </div>
  );
}

export function LessonPicker({ completed, onStart, onClose }: { completed: LessonId[]; onStart: (id: LessonId) => void; onClose: () => void }) {
  const headingRef = useFocusOnChange<HTMLHeadingElement>("lessons");
  return (
    <div className="panel-enter space-y-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="eyebrow mb-2">Guided lessons</p>
          <h2 ref={headingRef} tabIndex={-1} className="display text-[2.25rem] text-ink outline-none">Choose a question</h2>
        </div>
        <button type="button" onClick={onClose} className="grid size-11 place-items-center rounded-full hover:bg-white/70" aria-label="Close lesson list">
          <Icon.Close />
        </button>
      </div>
      <p className="text-[0.9375rem] leading-relaxed text-ink-soft">
        Each lesson has six short steps. The brain highlights the regions discussed, and every step links to a source.
      </p>
      <ul className="space-y-3">
        {lessons.map((l) => {
          const done = completed.includes(l.id);
          return (
            <li key={l.id}>
              <button
                type="button"
                onClick={() => onStart(l.id)}
                className="group flex w-full items-center gap-4 rounded-[20px] border border-white/80 bg-white/60 p-4 text-left transition-colors hover:bg-white/90"
              >
                <span className="min-w-0 flex-1">
                  <span className="eyebrow block !text-amber-strong">
                    {l.topic} · {l.steps.length} steps · ~{l.estimatedMinutes} min
                    {done && (
                      <span className="ml-2 inline-flex items-center gap-1 rounded-full bg-amber-soft px-2 py-0.5 align-middle normal-case [font-variant-caps:normal] tracking-normal">
                        <Icon.Check width={12} height={12} /> Completed
                      </span>
                    )}
                  </span>
                  <span className="mt-1 block text-[1.0625rem] font-medium text-ink">{l.title}</span>
                  <span className="mt-0.5 block text-[0.875rem] leading-snug text-muted">{l.summary}</span>
                </span>
                <span className="grid size-10 shrink-0 place-items-center rounded-full bg-night text-white transition-transform group-hover:translate-x-0.5">
                  <Icon.ArrowRight width={16} height={16} />
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export function LessonPanel({
  progress,
  onNext,
  onBack,
  onExit,
  onReplay,
  onSelectRegion,
}: {
  progress: LessonProgress;
  onNext: () => void;
  onBack: () => void;
  onExit: () => void;
  onReplay: () => void;
  onSelectRegion: (id: RegionId) => void;
}) {
  const lesson = getLesson(progress.id);
  const headingRef = useFocusOnChange<HTMLHeadingElement>(`${progress.id}-${progress.stepIndex}-${progress.finished}`);
  if (!lesson) return null;
  const step = lesson.steps[progress.stepIndex];
  const total = lesson.steps.length;
  const idPrefix = `lesson-${step?.id ?? lesson.id}`;
  const { list, numbering } = numberCitations(step?.claimIds ?? []);

  return (
    <div className="panel-enter space-y-5">
      <div className="flex items-start justify-between gap-3">
        <p className="eyebrow pt-1 text-amber-strong">Guided lesson · {lesson.topic}</p>
        <Button variant="pill" onClick={onExit} className="!min-h-9 shrink-0 whitespace-nowrap !px-3 !py-1 text-[0.8125rem]">
          <Icon.Close width={14} height={14} /> Exit lesson
        </Button>
      </div>
      <p className="text-[1rem] font-medium leading-snug text-ink">{lesson.title}</p>

      {/* Progress */}
      <div>
        <div className="flex gap-1.5" role="progressbar" aria-label="Lesson progress" aria-valuemin={0} aria-valuemax={total} aria-valuenow={progress.finished ? total : progress.stepIndex + 1} aria-valuetext={progress.finished ? "Lesson complete" : `Step ${progress.stepIndex + 1} of ${total}`}>
          {lesson.steps.map((s, i) => (
            <span key={s.id} className={`h-1.5 flex-1 rounded-full transition-colors ${progress.finished || i <= progress.stepIndex ? "bg-amber" : "bg-ink/10"}`} />
          ))}
        </div>
        <p className="mt-2 text-[0.8125rem] text-muted" aria-live="polite">
          {progress.finished ? "Lesson complete" : `Step ${progress.stepIndex + 1} of ${total}`}
        </p>
      </div>

      {progress.finished ? (
        <div className="space-y-4">
          <h2 ref={headingRef} tabIndex={-1} className="display text-[2.25rem] text-ink outline-none">Lesson complete</h2>
          <p className="text-[0.9375rem] leading-relaxed text-ink-soft">
            You explored findings from psychology research and the brain areas linked to them. Remember that the highlighted
            areas are a simplified selection, and the steps describe overlapping processes, not a fixed sequence.
          </p>
          <div className="flex flex-wrap gap-2">
            <Button variant="pill" onClick={onBack}><Icon.ArrowLeft width={16} height={16} /> Back</Button>
            <Button variant="pill" onClick={onReplay}><Icon.Replay width={16} height={16} /> Replay</Button>
            <Button variant="dark" onClick={onExit}>Return to exploring</Button>
          </div>
        </div>
      ) : step ? (
        <div className="space-y-5">
          <h2 ref={headingRef} tabIndex={-1} className="display text-[2rem] leading-[1.08] text-ink outline-none sm:text-[2.25rem]">
            {step.heading}
          </h2>
          <p className="text-[1.0625rem] leading-relaxed text-ink">{step.body}</p>
          {step.example && (
            <div className="rounded-2xl border border-white/80 bg-gradient-to-br from-mint/50 to-aqua/50 p-4">
              <p className="eyebrow mb-1">In everyday life</p>
              <p className="text-[0.9375rem] leading-relaxed text-ink">{step.example}</p>
            </div>
          )}

          {step.brainLink && (
            <div className="rounded-2xl border border-white/80 bg-white/60 p-4">
              <p className="eyebrow mb-1">Brain link</p>
              <p className="text-[0.9375rem] leading-relaxed text-ink-soft">{step.brainLink}</p>
            </div>
          )}

          <div>
            <p className="eyebrow mb-2">Brain areas involved</p>
            <ul className="flex flex-wrap gap-2">
              {step.regionIds.map((rid) => {
                const r = getRegion(rid);
                return r ? (
                  <li key={rid}>
                    <button type="button" onClick={() => onSelectRegion(rid)} className="inline-flex min-h-9 items-center gap-1.5 rounded-full border border-teal/40 bg-teal-soft/70 px-3 py-1 text-[0.8125rem] font-medium text-teal-strong hover:bg-teal-soft">
                      <span className="size-2 rounded-full bg-teal" aria-hidden="true" />
                      {r.name}
                      <span className="sr-only">, open details</span>
                    </button>
                  </li>
                ) : null;
              })}
            </ul>
            <p className="mt-2 text-[0.75rem] leading-snug text-muted">
              A simplified selection: other brain areas also take part. Highlights are illustrative, not measured activity.
            </p>
          </div>

          <div>
            <p className="eyebrow mb-2">The evidence</p>
            <ul className="space-y-4">
              {step.claimIds.map((cid) => (
                <ClaimItem key={cid} claimId={cid} numbering={numbering} idPrefix={idPrefix} />
              ))}
            </ul>
          </div>

          <div className="sticky bottom-[-1.25rem] z-10 -mx-5 flex items-center justify-between gap-2 border-t border-white bg-white/95 px-5 pb-4 pt-3 backdrop-blur sm:bottom-[-1.5rem] sm:-mx-6 sm:px-6">
            <Button variant="pill" onClick={onBack} disabled={progress.stepIndex === 0}>
              <Icon.ArrowLeft width={16} height={16} /> Back
            </Button>
            <div className="flex gap-2">
              <Button variant="ghost" onClick={onReplay} aria-label="Replay lesson from the first step">
                <Icon.Replay width={16} height={16} /> <span className="hidden sm:inline">Replay</span>
              </Button>
              <Button variant="dark" onClick={onNext}>
                {progress.stepIndex === total - 1 ? "Finish" : "Next"} <Icon.ArrowRight width={16} height={16} />
              </Button>
            </div>
          </div>

          <p className="text-[0.75rem] leading-snug text-muted">{lesson.sequenceNote}</p>
          <SourceList citations={list} idPrefix={idPrefix} />
        </div>
      ) : null}
    </div>
  );
}

export function RegionPanel({
  regionId,
  inLesson,
  onClose,
  onResumeLesson,
  onStartLesson,
}: {
  regionId: RegionId;
  inLesson: boolean;
  onClose: () => void;
  onResumeLesson: () => void;
  onStartLesson: (id: LessonId) => void;
}) {
  const region = getRegion(regionId);
  const headingWrap = useFocusOnChange<HTMLDivElement>(regionId);
  if (!region) return null;
  return (
    <div className="panel-enter space-y-4">
      <div className="flex items-center justify-between gap-2">
        {inLesson ? (
          <Button variant="pill" onClick={onResumeLesson} className="!min-h-9 !py-1 text-[0.8125rem]">
            <Icon.ArrowLeft width={14} height={14} /> Back to lesson
          </Button>
        ) : (
          <span className="text-[0.8125rem] font-medium text-teal-strong">Selected brain area</span>
        )}
        <button type="button" onClick={onClose} className="grid size-11 place-items-center rounded-full hover:bg-white/70" aria-label={`Close ${region.name} details`}>
          <Icon.Close />
        </button>
      </div>
      <div ref={headingWrap} tabIndex={-1} className="outline-none" aria-label={`${region.trait} (${region.name}) details`}>
        <RegionDetails region={region} idPrefix={`panel-${region.id}`} onStartLesson={onStartLesson} />
      </div>
    </div>
  );
}
