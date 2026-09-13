import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { SceneSlide } from "./StorybookPlayer";
import { AudioService } from "@/services/audio-service";

vi.mock("@/services/audio-service", () => ({
  AudioService: {
    stop: vi.fn(),
    speak: vi.fn(),
  },
}));

const scene = {
  id: "s1",
  image: "/story/s1.jpg",
  imageAlt: "Scene",
  text: "Hello, my name is Vale.",
  es: "Hola, mi nombre es Vale.",
  glossary: {},
  speaker: "vale" as const,
};

function renderScene(props?: Partial<Parameters<typeof SceneSlide>[0]>) {
  const onRateChange = vi.fn();
  const view = render(
    <SceneSlide
      scene={scene}
      episodeGlossary={new Map()}
      voice="girl"
      es={false}
      flip={false}
      rate={0.5}
      onRateChange={onRateChange}
      onLearnWord={() => {}}
      {...props}
    />,
  );
  return { ...view, onRateChange };
}

describe("SceneSlide", () => {
  it("repeats the scene at normal speed and reveals speed options", () => {
    const { onRateChange } = renderScene();
    const repeat = screen.getByRole("button", { name: /Repeat at normal speed/i });

    fireEvent.click(repeat);

    expect(onRateChange).toHaveBeenCalledWith(1);
    expect(AudioService.speak).toHaveBeenCalledWith(
      scene.text,
      expect.objectContaining({ rate: 1 }),
    );
    expect(screen.getByRole("button", { name: "0.5x" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "0.75x" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "1x" })).toBeInTheDocument();
  });

  it("keeps Listen using the currently selected rate", () => {
    const { onRateChange } = renderScene({ rate: 0.75 });
    const listen = screen.getByRole("button", { name: /Listen/i });

    fireEvent.click(listen);

    expect(AudioService.speak).toHaveBeenCalledWith(
      scene.text,
      expect.objectContaining({ rate: 0.75 }),
    );
    expect(onRateChange).not.toHaveBeenCalled();
  });

  it("selecting a speed replays at that speed", async () => {
    renderScene();
    fireEvent.click(screen.getByRole("button", { name: /Repeat at normal speed/i }));
    const slow = screen.getByRole("button", { name: "0.5x" });
    fireEvent.click(slow);
    await waitFor(() =>
      expect(AudioService.speak).toHaveBeenCalledWith(
        scene.text,
        expect.objectContaining({ rate: 0.5 }),
      ),
    );
  });
});
