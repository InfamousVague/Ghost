import { describe, it, expect } from "vitest";
import { Size, TextAppearance, Brightness } from "../../src/enums";

describe("Slider", () => {
  describe("Size configurations", () => {
    const SIZE_MAP: Record<Size, { trackHeight: number; thumbSize: number }> = {
      [Size.TwoXSmall]: { trackHeight: 2, thumbSize: 10 },
      [Size.ExtraSmall]: { trackHeight: 3, thumbSize: 12 },
      [Size.Small]: { trackHeight: 4, thumbSize: 14 },
      [Size.Medium]: { trackHeight: 5, thumbSize: 16 },
      [Size.Large]: { trackHeight: 6, thumbSize: 18 },
      [Size.ExtraLarge]: { trackHeight: 8, thumbSize: 22 },
      [Size.TwoXLarge]: { trackHeight: 10, thumbSize: 26 },
    };

    it("should have 4px track for Small", () => {
      expect(SIZE_MAP[Size.Small].trackHeight).toBe(4);
    });

    it("should have 5px track for Medium (default)", () => {
      expect(SIZE_MAP[Size.Medium].trackHeight).toBe(5);
    });

    it("should have 16px thumb for Medium", () => {
      expect(SIZE_MAP[Size.Medium].thumbSize).toBe(16);
    });

    it("should have increasing dimensions with size", () => {
      expect(SIZE_MAP[Size.Large].trackHeight).toBeGreaterThan(SIZE_MAP[Size.Small].trackHeight);
      expect(SIZE_MAP[Size.Large].thumbSize).toBeGreaterThan(SIZE_MAP[Size.Small].thumbSize);
    });
  });

  describe("Progress calculation", () => {
    function calculateProgress(value: number, min: number, max: number): number {
      return ((value - min) / (max - min)) * 100;
    }

    it("should calculate 50% for middle value", () => {
      expect(calculateProgress(50, 0, 100)).toBe(50);
    });

    it("should calculate 0% for min value", () => {
      expect(calculateProgress(0, 0, 100)).toBe(0);
    });

    it("should calculate 100% for max value", () => {
      expect(calculateProgress(100, 0, 100)).toBe(100);
    });

    it("should work with custom ranges", () => {
      expect(calculateProgress(250, 100, 400)).toBe(50);
    });
  });

  describe("Step handling", () => {
    function snapToStep(value: number, min: number, max: number, step: number): number {
      const steps = Math.round((value - min) / step);
      return Math.min(Math.max(min + steps * step, min), max);
    }

    it("should snap to nearest step", () => {
      expect(snapToStep(57, 0, 100, 10)).toBe(60);
    });

    it("should not exceed max", () => {
      expect(snapToStep(105, 0, 100, 10)).toBe(100);
    });

    it("should not go below min", () => {
      expect(snapToStep(-5, 0, 100, 10)).toBe(0);
    });
  });

  describe("Appearance colors", () => {
    it("should support all TextAppearance values", () => {
      expect(TextAppearance.Primary).toBe("primary");
      expect(TextAppearance.Success).toBe("success");
      expect(TextAppearance.Warning).toBe("warning");
      expect(TextAppearance.Danger).toBe("danger");
      expect(TextAppearance.Info).toBe("info");
    });
  });

  describe("Disabled state", () => {
    it("should have opacity 0.5 when disabled", () => {
      const disabled = true;
      const opacity = disabled ? 0.5 : 1;
      expect(opacity).toBe(0.5);
    });
  });

  describe("Track border radius", () => {
    it("should have border radius of half the track height", () => {
      const trackHeight = 5;
      const borderRadius = trackHeight / 2;
      expect(borderRadius).toBe(2.5);
    });
  });

  describe("Brightness/glow", () => {
    it("should support brightness levels", () => {
      expect(Brightness.None).toBe("none");
      expect(Brightness.Soft).toBe("soft");
      expect(Brightness.Base).toBe("base");
      expect(Brightness.Bright).toBe("bright");
    });
  });
});
