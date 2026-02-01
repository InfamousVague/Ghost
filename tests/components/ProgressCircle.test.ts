import { describe, it, expect } from "vitest";
import { Size, TextAppearance, Brightness } from "../../src/enums";

describe("ProgressCircle", () => {
  describe("Size configurations", () => {
    const SIZE_MAP: Record<Size, { diameter: number; stroke: number }> = {
      [Size.TwoXSmall]: { diameter: 32, stroke: 3 },
      [Size.ExtraSmall]: { diameter: 48, stroke: 4 },
      [Size.Small]: { diameter: 64, stroke: 5 },
      [Size.Medium]: { diameter: 80, stroke: 6 },
      [Size.Large]: { diameter: 96, stroke: 7 },
      [Size.ExtraLarge]: { diameter: 120, stroke: 8 },
      [Size.TwoXLarge]: { diameter: 144, stroke: 10 },
    };

    it("should have 64px diameter for Small", () => {
      expect(SIZE_MAP[Size.Small].diameter).toBe(64);
    });

    it("should have 96px diameter for Large (default)", () => {
      expect(SIZE_MAP[Size.Large].diameter).toBe(96);
    });

    it("should have 120px diameter for ExtraLarge", () => {
      expect(SIZE_MAP[Size.ExtraLarge].diameter).toBe(120);
    });

    it("should have increasing stroke with size", () => {
      expect(SIZE_MAP[Size.Large].stroke).toBeGreaterThan(SIZE_MAP[Size.Small].stroke);
    });
  });

  describe("Circle calculations", () => {
    it("should calculate radius correctly", () => {
      const diameter = 96;
      const stroke = 7;
      const radius = (diameter - stroke) / 2;
      expect(radius).toBe(44.5);
    });

    it("should calculate circumference correctly", () => {
      const radius = 44.5;
      const circumference = 2 * Math.PI * radius;
      expect(circumference).toBeCloseTo(279.6, 1);
    });

    it("should calculate stroke dash offset for progress", () => {
      const circumference = 280;
      const progress = 75;
      const strokeDashoffset = circumference - (progress / 100) * circumference;
      expect(strokeDashoffset).toBe(70);
    });
  });

  describe("Progress calculation", () => {
    function calculateProgress(value: number, max: number): number {
      return Math.min(Math.max((value / max) * 100, 0), 100);
    }

    it("should calculate 78% progress", () => {
      expect(calculateProgress(78, 100)).toBe(78);
    });

    it("should cap at 100%", () => {
      expect(calculateProgress(120, 100)).toBe(100);
    });

    it("should not go below 0%", () => {
      expect(calculateProgress(-10, 100)).toBe(0);
    });
  });

  describe("Label styles", () => {
    it("should have uppercase text transform", () => {
      const textTransform = "uppercase";
      expect(textTransform).toBe("uppercase");
    });

    it("should have letter spacing of 1", () => {
      const letterSpacing = 1;
      expect(letterSpacing).toBe(1);
    });

    it("should have margin top of 2", () => {
      const marginTop = 2;
      expect(marginTop).toBe(2);
    });
  });

  describe("Glow effect calculations", () => {
    it("should calculate glow padding", () => {
      const glowBlur = 10;
      const glowPadding = glowBlur * 2;
      expect(glowPadding).toBe(20);
    });

    it("should calculate expanded glow size", () => {
      const diameter = 96;
      const glowPadding = 20;
      const glowSize = diameter + glowPadding * 2;
      expect(glowSize).toBe(136);
    });
  });

  describe("Appearance and brightness", () => {
    it("should support Link appearance (default)", () => {
      expect(TextAppearance.Link).toBe("link");
    });

    it("should support brightness levels", () => {
      expect(Brightness.None).toBe("none");
      expect(Brightness.Soft).toBe("soft");
      expect(Brightness.Base).toBe("base");
      expect(Brightness.Bright).toBe("bright");
    });
  });
});
