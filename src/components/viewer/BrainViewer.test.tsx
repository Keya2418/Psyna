import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { initialAtlasState } from "@/lib/atlasState";
import { BrainViewer } from "./BrainViewer";

vi.mock("next/dynamic", () => ({ default: () => () => <div data-testid="canvas" /> }));

const baseProps = {
  mode: "3d" as const,
  onRequest2D: () => {},
  highlightedIds: [],
  selectedId: null,
  revealInternal: false,
  view: initialAtlasState.view,
  camera: initialAtlasState.camera,
  reducedMotion: true,
};

describe("BrainViewer fallback", () => {
  it("shows a labelled, selectable 2D anatomy view when WebGL is unavailable", async () => {
    // jsdom has no WebGL; make that explicit.
    vi.spyOn(HTMLCanvasElement.prototype, "getContext").mockReturnValue(null);
    const onSelect = vi.fn();
    const user = userEvent.setup();
    render(<BrainViewer {...baseProps} onSelectRegion={onSelect} />);

    expect(await screen.findByText(/3D graphics aren.t available/)).toBeInTheDocument();
    const temporal = screen.getByRole("button", { name: /^Empathy: Temporal cortex/ });
    await user.click(temporal);
    expect(onSelect).toHaveBeenCalledWith("temporal-cortex");

    // Deep structures are labelled as such, and are keyboard-operable.
    const hippo = screen.getByRole("button", { name: /Hippocampus \(deep structure/ });
    hippo.focus();
    await user.keyboard("{Enter}");
    expect(onSelect).toHaveBeenCalledWith("hippocampus");

    // Both views are available.
    await user.click(screen.getByRole("tab", { name: "Inner view" }));
    expect(screen.getByRole("tab", { name: "Inner view" })).toHaveAttribute("aria-selected", "true");
  });

  it("uses the 3D canvas when WebGL is available", async () => {
    vi.spyOn(HTMLCanvasElement.prototype, "getContext").mockReturnValue({ getExtension: () => null } as never);
    render(<BrainViewer {...baseProps} onSelectRegion={() => {}} />);
    await waitFor(() => expect(screen.getByTestId("canvas")).toBeInTheDocument());
  });

  it("can be switched to 2D on request", () => {
    vi.spyOn(HTMLCanvasElement.prototype, "getContext").mockReturnValue({ getExtension: () => null } as never);
    render(<BrainViewer {...baseProps} mode="2d" onSelectRegion={() => {}} />);
    expect(screen.getByRole("tab", { name: "Side view" })).toBeInTheDocument();
  });
});
