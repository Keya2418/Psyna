"use client";

import { useCallback, useEffect, useMemo, useReducer, useRef, useState } from "react";
import { getRegion, lessons } from "@/content";
import type { LessonId, RegionId } from "@/content/types";
import { atlasReducer, getHighlightedRegionIds, initialAtlasState, shouldRevealInternal } from "@/lib/atlasState";
import { usePrefersReducedMotion } from "@/lib/hooks";
import { loadPersisted, savePersisted, type Preferences } from "@/lib/storage";
import { LessonPanel, LessonPicker, RegionPanel, WelcomePanel } from "./Panels";
import { AboutSection, Footer, SourcesSection, TextGuide } from "./Sections";
import { ArrowDisc, Button, Icon, Wordmark } from "./ui";
import { BrainViewer } from "./viewer/BrainViewer";
import { ViewerControls } from "./ViewerControls";

const LESSON_IDS = new Set<string>(lessons.map((l) => l.id));

export function PsynaApp() {
  const [state, dispatch] = useReducer(atlasReducer, initialAtlasState);
  const [motionPref, setMotionPref] = useState<Preferences["motion"]>("system");
  const [viewerMode, setViewerMode] = useState<"3d" | "2d">("3d");
  const [hydrated, setHydrated] = useState(false);
  const systemReduced = usePrefersReducedMotion();
  const reducedMotion = motionPref === "reduced" || (motionPref === "system" && systemReduced);
  const panelRef = useRef<HTMLDivElement>(null);
  const panelScrollRef = useRef<HTMLDivElement>(null);

  const highlightedIds = useMemo(() => getHighlightedRegionIds(state), [state]);

  // New panel content always starts at the top (prevents scroll anchoring from keeping an old offset).
  const panelKey = `${state.panel}|${state.selectedRegionId}|${state.lesson?.id}|${state.lesson?.stepIndex}|${state.lesson?.finished}`;
  useEffect(() => {
    if (panelScrollRef.current) panelScrollRef.current.scrollTop = 0;
  }, [panelKey]);
  const revealInternal = shouldRevealInternal(state);

  // Load persisted progress/preferences after mount (storage failures fall back to defaults).
  useEffect(() => {
    const saved = loadPersisted(LESSON_IDS);
    dispatch({ type: "hydrate", completedLessons: saved.completedLessons, material: saved.preferences.material });
    // eslint-disable-next-line react-hooks/set-state-in-effect -- syncing from browser storage after hydration
    setMotionPref(saved.preferences.motion);
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    savePersisted({
      version: 1,
      completedLessons: state.completedLessons,
      preferences: { material: state.view.material, motion: motionPref },
    });
  }, [hydrated, state.completedLessons, state.view.material, motionPref]);

  const isDesktop = () => typeof window !== "undefined" && window.matchMedia?.("(min-width: 1024px)").matches;
  const revealPanelOnMobile = useCallback(() => {
    if (isDesktop()) return;
    requestAnimationFrame(() => panelRef.current?.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth", block: "start" }));
  }, [reducedMotion]);

  const selectRegion = useCallback((id: RegionId) => dispatch({ type: "selectRegion", regionId: id }), []);
  const startLesson = useCallback(
    (id: LessonId) => {
      dispatch({ type: "startLesson", lessonId: id });
      revealPanelOnMobile();
    },
    [revealPanelOnMobile],
  );
  const showLessons = () => {
    dispatch({ type: "showLessons" });
    revealPanelOnMobile();
  };
  const explore = () => {
    dispatch({ type: "showWelcome" });
    const viewer = document.getElementById("viewer");
    if (!isDesktop()) viewer?.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth", block: "center" });
    // Move keyboard focus to the first selectable brain area (3D marker or 2D map region).
    viewer?.querySelector<HTMLElement>('button.marker, [role="button"][tabindex="0"]')?.focus({ preventScroll: !isDesktop() });
  };

  const selectedRegion = state.selectedRegionId ? getRegion(state.selectedRegionId) : undefined;
  const announcement =
    state.panel === "region" && selectedRegion
      ? `${selectedRegion.name} selected: ${selectedRegion.trait}.`
      : state.panel === "lesson" && state.lesson
        ? state.lesson.finished
          ? "Lesson complete."
          : `Lesson step ${state.lesson.stepIndex + 1}.`
        : "";

  const panel = (() => {
    switch (state.panel) {
      case "region":
        return state.selectedRegionId ? (
          <RegionPanel
            regionId={state.selectedRegionId}
            inLesson={!!state.lesson}
            onClose={() => dispatch({ type: "closeRegion" })}
            onResumeLesson={() => dispatch({ type: "resumeLesson" })}
            onStartLesson={startLesson}
          />
        ) : null;
      case "lesson":
        return state.lesson ? (
          <LessonPanel
            progress={state.lesson}
            onNext={() => dispatch({ type: "nextStep" })}
            onBack={() => dispatch({ type: "previousStep" })}
            onExit={() => dispatch({ type: "exitLesson" })}
            onReplay={() => dispatch({ type: "replayLesson" })}
            onSelectRegion={selectRegion}
          />
        ) : null;
      case "lessons":
        return <LessonPicker completed={state.completedLessons} onStart={startLesson} onClose={() => dispatch({ type: "showWelcome" })} />;
      default:
        return null;
    }
  })();

  return (
    <div className={`min-h-dvh p-2.5 sm:p-4 lg:p-6 ${reducedMotion ? "motion-reduced" : ""}`}>
      <a href="#main-panel" className="sr-only-focusable fixed left-4 top-4 z-50 rounded-full bg-night px-4 py-2 text-white">
        Skip to content
      </a>
      <p className="sr-only" aria-live="polite">{announcement}</p>

      <div className="atlas-surface mx-auto max-w-[1520px] overflow-hidden rounded-[28px] lg:rounded-[var(--radius-surface)]">
        {/* Header */}
        <header className="relative z-20 flex flex-wrap items-center justify-between gap-3 px-4 pt-4 sm:px-6 lg:px-10 lg:pt-7">
          <a href="#explore" className="rounded-xl" aria-label="Psyna, home">
            <Wordmark />
          </a>
          <nav aria-label="Main" className="order-3 w-full sm:order-none sm:w-auto">
            <ul className="glass-pill mx-auto flex w-max items-center gap-0.5 rounded-full p-1 text-[0.875rem] font-medium">
              {[
                ["Explore", "#explore"],
                ["Facts", "#text-guide"],
                ["Sources", "#sources"],
                ["About", "#about"],
              ].map(([label, href], i) => (
                <li key={href}>
                  <a href={href} className={`inline-flex min-h-9 items-center rounded-full px-3.5 sm:px-4 ${i === 0 ? "bg-white text-ink shadow-[0_2px_8px_-4px_rgb(26_48_66/0.35)]" : "text-ink-soft hover:bg-white/70 hover:text-ink"}`} aria-current={i === 0 ? "page" : undefined}>
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <Button variant="primary" onClick={showLessons} className="!py-1 !pl-4 !pr-1 text-[0.875rem]">
            Guided lessons <ArrowDisc />
          </Button>
        </header>

        <main
          id="explore"
          className="relative grid scroll-mt-4 grid-cols-1 gap-4 px-3 pb-5 pt-4 sm:px-6 lg:h-[calc(100dvh-7.5rem)] lg:max-h-[940px] lg:min-h-[660px] lg:grid-cols-[minmax(340px,0.92fr)_minmax(0,1.9fr)] lg:grid-rows-[minmax(0,1fr)_auto] lg:gap-6 lg:px-10 lg:pb-8 lg:pt-6"
        >
          {/* Mobile hero (desktop shows it in the left panel) */}
          {state.panel === "welcome" && (
            <div className="px-1 pt-2 lg:hidden">
              <h1 className="display text-[2.4rem] text-ink sm:text-[3rem]">
                Explore the mind.
                <br />
                <span className="font-normal italic">Understand</span> everyday life.
              </h1>
              <p className="mt-3 text-[1rem] leading-relaxed text-ink-soft">
                Select any part of the brain to discover a psychological trait, explained through published research.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <Button variant="primary" onClick={explore}>Explore the brain <ArrowDisc /></Button>
              </div>
            </div>
          )}

          {/* Left: welcome → region / lesson panel */}
          <div
            id="main-panel"
            ref={panelRef}
            tabIndex={-1}
            className={`order-3 scroll-mt-3 outline-none lg:order-none lg:col-start-1 lg:row-span-2 lg:row-start-1 lg:min-h-0 ${state.panel === "welcome" ? "hidden lg:block" : ""}`}
          >
            {state.panel === "welcome" ? (
              <div className="h-full overflow-y-auto pr-2 pt-6 scroll-soft">
                <WelcomePanel onExplore={explore} />
              </div>
            ) : (
              <div ref={panelScrollRef} className="glass-strong scroll-soft h-full overflow-y-auto rounded-[var(--radius-glass)] p-5 [overflow-anchor:none] sm:p-6">{panel}</div>
            )}
          </div>

          {/* Center: viewer */}
          <section
            id="viewer"
            aria-label="Brain viewer"
            className="order-1 flex flex-col lg:order-none lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:min-h-0"
          >
            <div className="relative h-[54vh] min-h-[320px] max-h-[560px] w-full lg:h-auto lg:max-h-none lg:min-h-0 lg:flex-1">
              <div className="viewer-shadow pointer-events-none absolute bottom-[6%] left-1/2 h-[10%] w-[55%] -translate-x-1/2" aria-hidden="true" />
              <BrainViewer
                mode={viewerMode}
                onRequest2D={() => setViewerMode("2d")}
                highlightedIds={highlightedIds}
                selectedId={state.selectedRegionId}
                revealInternal={revealInternal}
                view={state.view}
                camera={state.camera}
                reducedMotion={reducedMotion}
                onSelectRegion={selectRegion}
              />
            </div>
            <div className="mt-2">
              <ViewerControls
                view={state.view}
                revealInternal={revealInternal}
                mode={viewerMode}
                canUse3D
                reducedMotion={reducedMotion}
                onReset={() => dispatch({ type: "resetView" })}
                onToggleInternal={() => dispatch({ type: "setView", view: { internal: !state.view.internal } })}
                onToggleSeparated={() => dispatch({ type: "setView", view: { separated: !state.view.separated } })}
                onToggleMaterial={() => dispatch({ type: "setView", view: { material: state.view.material === "glass" ? "solid" : "glass" } })}
                onToggleMode={() => setViewerMode((m) => (m === "3d" ? "2d" : "3d"))}
                onToggleMotion={() => setMotionPref(reducedMotion ? "full" : "reduced")}
              />
            </div>
            {selectedRegion && state.panel === "region" && (
              <a href="#main-panel" className="mx-auto mt-3 inline-flex min-h-10 items-center gap-2 rounded-full bg-night px-4 text-[0.875rem] font-medium text-white lg:hidden">
                Read about {selectedRegion.trait.toLowerCase()} <Icon.ArrowRight width={14} height={14} className="rotate-90" />
              </a>
            )}
          </section>

        </main>
      </div>

      <div className="mx-auto mt-4 max-w-[1520px] space-y-4 lg:mt-6 lg:space-y-6">
        <TextGuide />
        <SourcesSection />
        <AboutSection />
        <Footer />
      </div>
    </div>
  );
}
