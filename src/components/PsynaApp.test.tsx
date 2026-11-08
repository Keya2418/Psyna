import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { getLesson, regions } from "@/content";
import type { BrainViewerProps } from "./viewer/BrainViewer";

// The real viewer needs WebGL; replace it with a stub that exposes what it was asked to show.
vi.mock("./viewer/BrainViewer", () => ({
  BrainViewer: (p: BrainViewerProps) => (
    <div data-testid="viewer" data-highlighted={p.highlightedIds.join(",")} data-reveal={String(p.revealInternal)} data-camera={JSON.stringify(p.camera.target)}>
      {regions.map((r) => (
        <button key={r.id} type="button" onClick={() => p.onSelectRegion(r.id)}>{`${r.trait}: ${r.name}`}</button>
      ))}
    </div>
  ),
}));

import { PsynaApp } from "./PsynaApp";

const viewer = () => within(screen.getByTestId("viewer"));
/** The main explore panel (the text guide further down repeats content by design). */
const panel = () => within(document.getElementById("main-panel")!);
const lessonButton = (title: string) => panel().getByRole("button", { name: new RegExp(title.replace("?", "\\?")) });

beforeEach(() => window.localStorage.clear());
afterEach(() => vi.restoreAllMocks());

describe("PsynaApp", () => {
  it("selecting a brain area explains a psychological trait and highlights the area", async () => {
    const user = userEvent.setup();
    render(<PsynaApp />);
    await user.click(viewer().getByRole("button", { name: /Amygdala/ }));

    expect(screen.getByRole("heading", { level: 2, name: "Emotional sensitivity" })).toBeInTheDocument();
    expect(panel().getByText(/Psychologists call this dimension neuroticism/)).toBeInTheDocument();
    // Research findings come first; each is backed by a cited claim.
    expect(panel().getByRole("heading", { name: "What research shows" })).toBeInTheDocument();
    expect(panel().getByText("Threats grab attention")).toBeInTheDocument();
    expect(panel().getAllByRole("link", { name: /Source 1:/ }).length).toBeGreaterThan(0);
    expect(panel().getByRole("heading", { name: "Keep in mind" })).toBeInTheDocument();
    // The brain link is brief and carries the general caveat about traits and anatomy.
    expect(panel().getByRole("heading", { name: "The brain connection" })).toBeInTheDocument();
    expect(panel().getByText(/Personality is hard to find in brain anatomy/)).toBeInTheDocument();
    expect(screen.getByTestId("viewer")).toHaveAttribute("data-highlighted", "amygdala");
    expect(screen.getByTestId("viewer")).toHaveAttribute("data-reveal", "true");

    // Close restores the welcome state.
    await user.click(screen.getByRole("button", { name: "Close Amygdala details" }));
    expect(screen.queryByRole("heading", { level: 2, name: "Emotional sensitivity" })).not.toBeInTheDocument();
    expect(screen.getByTestId("viewer")).toHaveAttribute("data-highlighted", "");
  });

  it("has no right-hand region list or myth cards, and no lesson button in the welcome panel", () => {
    render(<PsynaApp />);
    expect(screen.queryByRole("region", { name: "Brain regions" })).not.toBeInTheDocument();
    expect(screen.queryByRole("region", { name: "Good to know" })).not.toBeInTheDocument();
    expect(panel().queryByRole("button", { name: /guided lesson/i })).not.toBeInTheDocument();
    expect(screen.queryByText(/Memory · Attention · Emotion/)).not.toBeInTheDocument();
    // Lessons stay available from the header.
    expect(screen.getByRole("button", { name: /^Guided lessons/ })).toBeInTheDocument();
  });

  it("lesson navigation updates content and highlighted regions; exit restores exploring", async () => {
    const user = userEvent.setup();
    const lesson = getLesson("memory")!;
    render(<PsynaApp />);
    await user.click(screen.getByRole("button", { name: /^Guided lessons/ }));
    await user.click(lessonButton(lesson.title));

    expect(screen.getByRole("heading", { level: 2, name: lesson.steps[0]!.heading })).toBeInTheDocument();
    expect(screen.getByTestId("viewer")).toHaveAttribute("data-highlighted", lesson.steps[0]!.regionIds.join(","));

    await user.click(panel().getByRole("button", { name: /^Next/ }));
    expect(screen.getByRole("heading", { level: 2, name: lesson.steps[1]!.heading })).toBeInTheDocument();
    expect(screen.getByTestId("viewer")).toHaveAttribute("data-highlighted", lesson.steps[1]!.regionIds.join(","));
    expect(screen.getByText(`Step 2 of ${lesson.steps.length}`)).toBeInTheDocument();
    // Each step shows a source supporting its main claim.
    expect(panel().getAllByRole("link", { name: /Source 1:/ }).length).toBeGreaterThan(0);

    await user.click(panel().getByRole("button", { name: /^Back/ }));
    expect(screen.getByRole("heading", { level: 2, name: lesson.steps[0]!.heading })).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /Exit lesson/ }));
    expect(screen.queryByRole("progressbar")).not.toBeInTheDocument();
    expect(screen.getByTestId("viewer")).toHaveAttribute("data-highlighted", "");
    expect(screen.getByTestId("viewer")).toHaveAttribute("data-camera", '"default"');
  });

  it("completing a lesson is remembered across reloads", async () => {
    const user = userEvent.setup();
    const lesson = getLesson("emotion")!;
    const { unmount } = render(<PsynaApp />);
    await user.click(screen.getByRole("button", { name: /^Guided lessons/ }));
    await user.click(lessonButton(lesson.title));
    for (let i = 0; i < lesson.steps.length; i++) await user.click(panel().getByRole("button", { name: /^(Next|Finish)/ }));
    expect(screen.getByRole("heading", { name: "Lesson complete" })).toBeInTheDocument();
    unmount();

    render(<PsynaApp />);
    await user.click(screen.getByRole("button", { name: /^Guided lessons/ }));
    const card = lessonButton(lesson.title);
    expect(within(card).getByText("Completed")).toBeInTheDocument();
  });

  it("still works when browser storage is unavailable", async () => {
    vi.spyOn(window, "localStorage", "get").mockImplementation(() => {
      throw new DOMException("blocked", "SecurityError");
    });
    const user = userEvent.setup();
    render(<PsynaApp />);
    await user.click(viewer().getByRole("button", { name: /Hippocampus/ }));
    expect(screen.getByRole("heading", { level: 2, name: "Nostalgia" })).toBeInTheDocument();
  });

  it("includes the educational notice and readable psychology facts independent of the canvas", () => {
    render(<PsynaApp />);
    expect(screen.getByText("Educational purpose only")).toBeInTheDocument();
    const guide = screen.getByRole("region", { name: "Every trait, as readable text" });
    for (const r of regions) expect(within(guide).getAllByText(r.trait).length).toBeGreaterThan(0);
    // Psychology only: no brain-connection sections in the readable text.
    expect(within(guide).queryByRole("heading", { name: "The brain connection" })).not.toBeInTheDocument();
  });
});
