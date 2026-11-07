import { getLesson, getRegion, isLessonId } from "@/content";
import type { LessonId, LessonStep, RegionId } from "@/content/types";

export interface ViewOptions {
  /** Fade the outer surface so deep structures are easier to see. */
  internal: boolean;
  /** Move hemispheres apart to reveal medial surfaces. */
  separated: boolean;
  material: "glass" | "solid";
}

export type Panel = "welcome" | "region" | "lesson" | "lessons";

export interface LessonProgress {
  id: LessonId;
  stepIndex: number;
  finished: boolean;
}

export interface CameraRequest {
  /** Incremented on every request so repeated requests still trigger a move. */
  key: number;
  target: "default" | { regionIds: RegionId[] };
}

export interface AtlasState {
  panel: Panel;
  selectedRegionId: RegionId | null;
  lesson: LessonProgress | null;
  view: ViewOptions;
  viewBeforeLesson: ViewOptions | null;
  completedLessons: LessonId[];
  camera: CameraRequest;
}

export type AtlasAction =
  | { type: "selectRegion"; regionId: RegionId }
  | { type: "closeRegion" }
  | { type: "showLessons" }
  | { type: "showWelcome" }
  | { type: "startLesson"; lessonId: LessonId }
  | { type: "resumeLesson" }
  | { type: "nextStep" }
  | { type: "previousStep" }
  | { type: "replayLesson" }
  | { type: "exitLesson" }
  | { type: "setView"; view: Partial<ViewOptions> }
  | { type: "resetView" }
  | { type: "hydrate"; completedLessons: string[]; material?: ViewOptions["material"] };

export const DEFAULT_VIEW: ViewOptions = { internal: false, separated: false, material: "glass" };

export const initialAtlasState: AtlasState = {
  panel: "welcome",
  selectedRegionId: null,
  lesson: null,
  view: DEFAULT_VIEW,
  viewBeforeLesson: null,
  completedLessons: [],
  camera: { key: 0, target: "default" },
};

const moveCamera = (state: AtlasState, target: CameraRequest["target"]): CameraRequest => ({
  key: state.camera.key + 1,
  target,
});

export function getCurrentStep(state: AtlasState): LessonStep | null {
  if (!state.lesson) return null;
  const lesson = getLesson(state.lesson.id);
  return lesson?.steps[state.lesson.stepIndex] ?? null;
}

/** Regions highlighted in the viewer — derived, never stored separately. */
export function getHighlightedRegionIds(state: AtlasState): RegionId[] {
  if (state.panel === "region" && state.selectedRegionId) return [state.selectedRegionId];
  if (state.panel === "lesson" && state.lesson && !state.lesson.finished) return getCurrentStep(state)?.regionIds ?? [];
  return [];
}

/** Whether deep structures should be revealed (outer surface faded). */
export function shouldRevealInternal(state: AtlasState): boolean {
  if (state.view.internal) return true;
  const highlighted = getHighlightedRegionIds(state);
  if (highlighted.some((id) => getRegion(id)?.depth === "deep")) return true;
  return state.panel === "lesson" && !!getCurrentStep(state)?.revealInternal;
}

/** Camera target matching what is currently highlighted. */
function cameraTargetFor(state: AtlasState): CameraRequest["target"] {
  const ids = getHighlightedRegionIds(state);
  return ids.length ? { regionIds: ids } : "default";
}

function stepCamera(state: AtlasState, lessonId: LessonId, stepIndex: number): CameraRequest {
  const step = getLesson(lessonId)?.steps[stepIndex];
  return step ? moveCamera(state, { regionIds: step.regionIds }) : state.camera;
}

export function atlasReducer(state: AtlasState, action: AtlasAction): AtlasState {
  switch (action.type) {
    case "selectRegion": {
      if (!getRegion(action.regionId)) return state;
      return {
        ...state,
        panel: "region",
        selectedRegionId: action.regionId,
        camera: moveCamera(state, { regionIds: [action.regionId] }),
      };
    }
    case "closeRegion": {
      if (state.lesson) {
        return {
          ...state,
          panel: "lesson",
          selectedRegionId: null,
          camera: stepCamera(state, state.lesson.id, state.lesson.stepIndex),
        };
      }
      return { ...state, panel: "welcome", selectedRegionId: null };
    }
    case "showLessons":
      return { ...state, panel: "lessons", selectedRegionId: null };
    case "showWelcome":
      return { ...state, panel: "welcome", selectedRegionId: null };
    case "startLesson": {
      if (!getLesson(action.lessonId)) return state;
      return {
        ...state,
        panel: "lesson",
        selectedRegionId: null,
        lesson: { id: action.lessonId, stepIndex: 0, finished: false },
        viewBeforeLesson: state.lesson ? state.viewBeforeLesson : state.view,
        camera: stepCamera(state, action.lessonId, 0),
      };
    }
    case "resumeLesson": {
      if (!state.lesson) return state;
      return {
        ...state,
        panel: "lesson",
        selectedRegionId: null,
        camera: stepCamera(state, state.lesson.id, state.lesson.stepIndex),
      };
    }
    case "nextStep": {
      const lp = state.lesson;
      if (!lp || lp.finished) return state;
      const lesson = getLesson(lp.id);
      if (!lesson) return state;
      if (lp.stepIndex < lesson.steps.length - 1) {
        const stepIndex = lp.stepIndex + 1;
        return { ...state, panel: "lesson", lesson: { ...lp, stepIndex }, camera: stepCamera(state, lp.id, stepIndex) };
      }
      const completedLessons = state.completedLessons.includes(lp.id)
        ? state.completedLessons
        : [...state.completedLessons, lp.id];
      return { ...state, panel: "lesson", lesson: { ...lp, finished: true }, completedLessons, camera: moveCamera(state, "default") };
    }
    case "previousStep": {
      const lp = state.lesson;
      if (!lp) return state;
      if (lp.finished) {
        return { ...state, panel: "lesson", lesson: { ...lp, finished: false }, camera: stepCamera(state, lp.id, lp.stepIndex) };
      }
      if (lp.stepIndex === 0) return state;
      const stepIndex = lp.stepIndex - 1;
      return { ...state, panel: "lesson", lesson: { ...lp, stepIndex }, camera: stepCamera(state, lp.id, stepIndex) };
    }
    case "replayLesson": {
      const lp = state.lesson;
      if (!lp) return state;
      return { ...state, panel: "lesson", lesson: { ...lp, stepIndex: 0, finished: false }, camera: stepCamera(state, lp.id, 0) };
    }
    case "exitLesson": {
      if (!state.lesson) return state;
      return {
        ...state,
        panel: "welcome",
        selectedRegionId: null,
        lesson: null,
        // Restore the exploration view the user had before the lesson (keeping their material preference).
        view: { ...(state.viewBeforeLesson ?? DEFAULT_VIEW), material: state.view.material },
        viewBeforeLesson: null,
        camera: moveCamera(state, "default"),
      };
    }
    case "setView": {
      const view = { ...state.view, ...action.view };
      // Separating or rejoining the hemispheres reframes the camera so the whole brain stays in view.
      const camera = view.separated !== state.view.separated ? moveCamera(state, cameraTargetFor(state)) : state.camera;
      return { ...state, view, camera };
    }
    case "resetView":
      return { ...state, view: { ...state.view, separated: false }, camera: moveCamera(state, "default") };
    case "hydrate": {
      const completedLessons = action.completedLessons.filter(isLessonId);
      return {
        ...state,
        completedLessons,
        view: action.material ? { ...state.view, material: action.material } : state.view,
      };
    }
    default:
      return state;
  }
}
