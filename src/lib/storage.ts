/**
 * Local persistence for completed lessons and basic preferences.
 * Every access is guarded: storage may be unavailable (private mode, blocked cookies),
 * throw on access, be full, or contain malformed data. Failures fall back to defaults.
 */

export interface Preferences {
  material: "glass" | "solid";
  /** User override for motion; "system" follows prefers-reduced-motion. */
  motion: "system" | "reduced" | "full";
}

export interface PersistedState {
  version: 1;
  completedLessons: string[];
  preferences: Preferences;
}

export const STORAGE_KEY = "mind-atlas:v1";

export const DEFAULT_PREFERENCES: Preferences = { material: "glass", motion: "system" };

export const defaultPersistedState = (): PersistedState => ({
  version: 1,
  completedLessons: [],
  preferences: { ...DEFAULT_PREFERENCES },
});

function getStorage(): Storage | null {
  try {
    if (typeof window === "undefined") return null;
    const s = window.localStorage;
    return s ?? null;
  } catch {
    return null;
  }
}

/** Parse and sanitise unknown JSON into a valid PersistedState. */
export function sanitizePersisted(raw: unknown, validLessonIds?: ReadonlySet<string>): PersistedState {
  const base = defaultPersistedState();
  if (!raw || typeof raw !== "object") return base;
  const r = raw as Record<string, unknown>;

  const completed = Array.isArray(r.completedLessons)
    ? r.completedLessons.filter(
        (x): x is string => typeof x === "string" && (!validLessonIds || validLessonIds.has(x)),
      )
    : [];

  const p = (r.preferences && typeof r.preferences === "object" ? r.preferences : {}) as Record<string, unknown>;
  const material = p.material === "solid" || p.material === "glass" ? p.material : base.preferences.material;
  const motion =
    p.motion === "reduced" || p.motion === "full" || p.motion === "system" ? p.motion : base.preferences.motion;

  return { version: 1, completedLessons: [...new Set(completed)], preferences: { material, motion } };
}

export function loadPersisted(validLessonIds?: ReadonlySet<string>): PersistedState {
  const storage = getStorage();
  if (!storage) return defaultPersistedState();
  try {
    const text = storage.getItem(STORAGE_KEY);
    if (!text) return defaultPersistedState();
    return sanitizePersisted(JSON.parse(text), validLessonIds);
  } catch {
    return defaultPersistedState();
  }
}

/** Returns false if the state could not be saved. Never throws. */
export function savePersisted(state: PersistedState): boolean {
  const storage = getStorage();
  if (!storage) return false;
  try {
    storage.setItem(STORAGE_KEY, JSON.stringify(state));
    return true;
  } catch {
    return false;
  }
}
