import { describe, expect, it } from "vitest";
import { getLesson } from "@/content";
import {
  atlasReducer,
  getCurrentStep,
  getHighlightedRegionIds,
  initialAtlasState,
  shouldRevealInternal,
  type AtlasAction,
  type AtlasState,
} from "./atlasState";

const run = (actions: AtlasAction[], from: AtlasState = initialAtlasState) => actions.reduce(atlasReducer, from);

describe("region selection", () => {
  it("opens the matching region and highlights it", () => {
    const s = run([{ type: "selectRegion", regionId: "hippocampus" }]);
    expect(s.panel).toBe("region");
    expect(s.selectedRegionId).toBe("hippocampus");
    expect(getHighlightedRegionIds(s)).toEqual(["hippocampus"]);
    expect(s.camera.target).toEqual({ regionIds: ["hippocampus"] });
    expect(shouldRevealInternal(s)).toBe(true); // deep structure reveals the interior
  });

  it("ignores unknown region ids", () => {
    const s = run([{ type: "selectRegion", regionId: "nope" as never }]);
    expect(s).toBe(initialAtlasState);
  });

  it("closing restores the welcome state with nothing highlighted", () => {
    const s = run([{ type: "selectRegion", regionId: "parietal-cortex" }, { type: "closeRegion" }]);
    expect(s.panel).toBe("welcome");
    expect(s.selectedRegionId).toBeNull();
    expect(getHighlightedRegionIds(s)).toEqual([]);
    expect(shouldRevealInternal(s)).toBe(false);
  });

  it("every selection issues a new camera request, cancelling the previous one", () => {
    const a = run([{ type: "selectRegion", regionId: "amygdala" }]);
    const b = atlasReducer(a, { type: "selectRegion", regionId: "occipital-cortex" });
    expect(b.camera.key).toBeGreaterThan(a.camera.key);
    expect(b.camera.target).toEqual({ regionIds: ["occipital-cortex"] });
  });
});

describe("guided lessons", () => {
  const memory = getLesson("memory")!;

  it("navigation updates the step and the highlighted region ids", () => {
    let s = run([{ type: "startLesson", lessonId: "memory" }]);
    expect(s.panel).toBe("lesson");
    expect(getCurrentStep(s)?.id).toBe(memory.steps[0]!.id);
    expect(getHighlightedRegionIds(s)).toEqual(memory.steps[0]!.regionIds);

    s = atlasReducer(s, { type: "nextStep" });
    expect(getCurrentStep(s)?.id).toBe(memory.steps[1]!.id);
    expect(getHighlightedRegionIds(s)).toEqual(memory.steps[1]!.regionIds);
    expect(s.camera.target).toEqual({ regionIds: memory.steps[1]!.regionIds });

    s = atlasReducer(s, { type: "previousStep" });
    expect(getCurrentStep(s)?.id).toBe(memory.steps[0]!.id);
    s = atlasReducer(s, { type: "previousStep" });
    expect(s.lesson?.stepIndex).toBe(0); // cannot go before the first step
  });

  it("finishing marks the lesson complete and replay restarts it", () => {
    let s = run([{ type: "startLesson", lessonId: "attention" }]);
    const n = getLesson("attention")!.steps.length;
    for (let i = 0; i < n; i++) s = atlasReducer(s, { type: "nextStep" });
    expect(s.lesson?.finished).toBe(true);
    expect(s.completedLessons).toContain("attention");
    expect(getHighlightedRegionIds(s)).toEqual([]);
    s = atlasReducer(s, { type: "replayLesson" });
    expect(s.lesson).toEqual({ id: "attention", stepIndex: 0, finished: false });
  });

  it("exiting restores the exploration state from before the lesson", () => {
    let s = run([
      { type: "setView", view: { internal: true } },
      { type: "startLesson", lessonId: "emotion" },
      { type: "setView", view: { internal: false, separated: true } },
      { type: "nextStep" },
      { type: "exitLesson" },
    ]);
    expect(s.lesson).toBeNull();
    expect(s.panel).toBe("welcome");
    expect(s.selectedRegionId).toBeNull();
    expect(s.view).toMatchObject({ internal: true, separated: false });
    expect(s.camera.target).toBe("default");
    expect(getHighlightedRegionIds(s)).toEqual([]);
    s = atlasReducer(s, { type: "exitLesson" });
    expect(s.panel).toBe("welcome");
  });

  it("viewing a region during a lesson can return to the same step", () => {
    let s = run([{ type: "startLesson", lessonId: "memory" }, { type: "nextStep" }, { type: "selectRegion", regionId: "amygdala" }]);
    expect(s.panel).toBe("region");
    expect(getHighlightedRegionIds(s)).toEqual(["amygdala"]);
    s = atlasReducer(s, { type: "resumeLesson" });
    expect(s.panel).toBe("lesson");
    expect(getHighlightedRegionIds(s)).toEqual(memory.steps[1]!.regionIds);
  });

  it("hydrate drops unknown lesson ids", () => {
    const s = run([{ type: "hydrate", completedLessons: ["memory", "bogus"], material: "solid" }]);
    expect(s.completedLessons).toEqual(["memory"]);
    expect(s.view.material).toBe("solid");
  });
});
