import { afterEach, describe, expect, it, vi } from "vitest";
import { defaultPersistedState, loadPersisted, sanitizePersisted, savePersisted, STORAGE_KEY } from "./storage";

const lessons = new Set(["memory", "attention", "emotion"]);

afterEach(() => {
  vi.restoreAllMocks();
  window.localStorage.clear();
});

describe("storage", () => {
  it("round-trips valid state", () => {
    const state = { version: 1 as const, completedLessons: ["memory"], preferences: { material: "solid" as const, motion: "reduced" as const } };
    expect(savePersisted(state)).toBe(true);
    expect(loadPersisted(lessons)).toEqual(state);
  });

  it("falls back to defaults when localStorage access throws", () => {
    vi.spyOn(window, "localStorage", "get").mockImplementation(() => {
      throw new DOMException("denied", "SecurityError");
    });
    expect(loadPersisted(lessons)).toEqual(defaultPersistedState());
    expect(savePersisted(defaultPersistedState())).toBe(false);
  });

  it("survives a failing setItem (e.g. quota exceeded)", () => {
    vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
      throw new DOMException("full", "QuotaExceededError");
    });
    expect(() => savePersisted(defaultPersistedState())).not.toThrow();
    expect(savePersisted(defaultPersistedState())).toBe(false);
  });

  it("ignores malformed JSON", () => {
    window.localStorage.setItem(STORAGE_KEY, "{not json");
    expect(loadPersisted(lessons)).toEqual(defaultPersistedState());
  });

  it("sanitises unexpected shapes and values", () => {
    expect(sanitizePersisted(null)).toEqual(defaultPersistedState());
    expect(sanitizePersisted([])).toEqual(defaultPersistedState());
    const s = sanitizePersisted(
      { completedLessons: ["memory", 42, "bogus", "memory"], preferences: { material: "chrome", motion: "full" } },
      lessons,
    );
    expect(s.completedLessons).toEqual(["memory"]);
    expect(s.preferences).toEqual({ material: "glass", motion: "full" });
  });
});
