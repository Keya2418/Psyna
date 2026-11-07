import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { getLesson, regions } from "@/content";
import type { BrainViewerProps } from "./viewer/BrainViewer";

// The real viewer needs WebGL; replace it with a stub that exposes what it was asked to show.
vi.mock("./viewer/BrainViewer", () => ({
  BrainViewer: (p: BrainViewerProps) => (
    <div data-testid="viewer" data-highlighted={p.highlightedIds.join(",")} data-reveal={String(p.revealInternal)} data-camera={JSON.stringify(p.camera.target)} />
  ),
}));

import { MindAtlasApp } from "./MindAtlasApp";

const desktopList = () => screen.getAllByRole("region", { name: "Brain regions" }).at(-1)!;
/** The main explore panel (the text guide further down repeats content by design). */
const panel = () => within(document.getElementById("main-panel")!);
const lessonButton = (title: string) => panel().getByRole("button", { name: new RegExp(title.replace("?", "\\?")) });

beforeEach(() => window.localStorage.clear());
afterEach(() => vi.restoreAllMocks());

describe("MindAtlasApp", () => {
  it("selecting a region in the list opens its educational panel and highlights it", async () => {
    const user = userEvent.setup();
    render(<MindAtlasApp />);
    await user.click(within(desktopList()).getByRole("button", { name: /Amygdala/ }));

    expect(screen.getByRole("heading", { level: 2, name: "Amygdala" })).toBeInTheDocument();
    expect(panel().getByText(/it is not a “fear center”/)).toBeInTheDocument();
    // Psychology comes first; each concept is backed by a cited claim.
    expect(panel().getByRole("heading", { name: "The psychology" })).toBeInTheDocument();
    expect(panel().getByText("Threats grab attention")).toBeInTheDocument();
    expect(panel().getByText(/People found pictures of snakes or spiders/)).toBeInTheDocument();
    expect(panel().getByRole("heading", { name: "What this explanation simplifies" })).toBeInTheDocument();
    expect(screen.getByTestId("viewer")).toHaveAttribute("data-highlighted", "amygdala");
    expect(screen.getByTestId("viewer")).toHaveAttribute("data-reveal", "true");

    // Deeper detail is behind an explicit control.
    const toggle = panel().getByRole("button", { name: /^Show deeper detail/ });
    expect(toggle).toHaveAttribute("aria-expanded", "false");
    await user.click(toggle);
    expect(panel().getByRole("button", { name: /^Hide deeper detail/ })).toHaveAttribute("aria-expanded", "true");
    expect(panel().getByText(/A person known as SM/)).toBeVisible();

    // Close restores the welcome state.
    await user.click(screen.getByRole("button", { name: "Close Amygdala details" }));
    expect(screen.queryByRole("heading", { level: 2, name: "Amygdala" })).not.toBeInTheDocument();
    expect(screen.getByTestId("viewer")).toHaveAttribute("data-highlighted", "");
  });

  it("search filters the region list", async () => {
    const user = userEvent.setup();
    render(<MindAtlasApp />);
    const list = desktopList();
    await user.type(within(list).getByRole("searchbox", { name: "Search regions" }), "vision");
    expect(within(list).getByRole("button", { name: /Occipital cortex/ })).toBeInTheDocument();
    expect(within(list).queryByRole("button", { name: /Amygdala/ })).not.toBeInTheDocument();
  });

  it("lesson navigation updates content and highlighted regions; exit restores exploring", async () => {
    const user = userEvent.setup();
    const lesson = getLesson("memory")!;
    render(<MindAtlasApp />);
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
    const { unmount } = render(<MindAtlasApp />);
    await user.click(screen.getByRole("button", { name: /^Guided lessons/ }));
    await user.click(lessonButton(lesson.title));
    for (let i = 0; i < lesson.steps.length; i++) await user.click(panel().getByRole("button", { name: /^(Next|Finish)/ }));
    expect(screen.getByRole("heading", { name: "Lesson complete" })).toBeInTheDocument();
    unmount();

    render(<MindAtlasApp />);
    await user.click(screen.getByRole("button", { name: /^Guided lessons/ }));
    const card = lessonButton(lesson.title);
    expect(within(card).getByText("Completed")).toBeInTheDocument();
  });

  it("still works when browser storage is unavailable", async () => {
    vi.spyOn(window, "localStorage", "get").mockImplementation(() => {
      throw new DOMException("blocked", "SecurityError");
    });
    const user = userEvent.setup();
    render(<MindAtlasApp />);
    await user.click(within(desktopList()).getByRole("button", { name: /Hippocampus/ }));
    expect(screen.getByRole("heading", { level: 2, name: "Hippocampus" })).toBeInTheDocument();
  });

  it("includes the educational notice and a complete text guide independent of the canvas", () => {
    render(<MindAtlasApp />);
    expect(screen.getByText("Educational purpose only")).toBeInTheDocument();
    const guide = screen.getByRole("region", { name: "Everything, as readable text" });
    for (const r of regions) expect(within(guide).getAllByText(r.name).length).toBeGreaterThan(0);
  });
});
