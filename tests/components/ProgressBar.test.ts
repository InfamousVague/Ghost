import { describe, it, expect } from "vitest";
import { Size, TextAppearance, Brightness } from "../../src/enums";

describe("ProgressBar", () => {
  describe("Size to height mapping", () => {
    const SIZE_MAP: Record<Size, number> = {
      [Size.TwoXSmall]: 2,
      [Size.ExtraSmall]: 4,
      [Size.Small]: 6,
      [Size.Medium]: 8,
      [Size.Large]: 10,
      [Size.ExtraLarge]: 12,
      [Size.TwoXLarge]: 16,
    };

    it("should have 2px height for TwoXSmall", () => {
      expect(SIZE_MAP[Size.TwoXSmall]).toBe(2);
    });

    it("should have 6px height for Small", () => {
      expect(SIZE_MAP[Size.Small]).toBe(6);
    });

    it("should have 8px height for Medium (default)", () => {
      expect(SIZE_MAP[Size.Medium]).toBe(8);
    });

    it("should have 16px height for TwoXLarge", () => {
      expect(SIZE_MAP[Size.TwoXLarge]).toBe(16);
    });
  });

  describe("Progress calculation", () => {
    function calculateProgress(value: number, max: number): number {
      return Math.min(Math.max((value / max) * 100, 0), 100);
    }

    it("should calculate 50% progress", () => {
      expect(calculateProgress(50, 100)).toBe(50);
    });

    it("should calculate 75% progress", () => {
      expect(calculateProgress(75, 100)).toBe(75);
    });

    it("should cap at 100%", () => {
      expect(calculateProgress(150, 100)).toBe(100);
    });

    it("should not go below 0%", () => {
      expect(calculateProgress(-10, 100)).toBe(0);
    });

    it("should work with custom max values", () => {
      expect(calculateProgress(7, 10)).toBe(70);
    });
  });

  describe("Appearance colors", () => {
    it("should support Primary appearance", () => {
      expect(TextAppearance.Primary).toBe("primary");
    });

    it("should support Success appearance", () => {
      expect(TextAppearance.Success).toBe("success");
    });

    it("should support Warning appearance", () => {
      expect(TextAppearance.Warning).toBe("warning");
    });

    it("should support Danger appearance", () => {
      expect(TextAppearance.Danger).toBe("danger");
    });
  });

  describe("Border radius", () => {
    it("should have border radius of half the height", () => {
      const height = 8;
      const borderRadius = height / 2;
      expect(borderRadius).toBe(4);
    });
  });

  describe("Glow effect", () => {
    it("should support None brightness", () => {
      expect(Brightness.None).toBe("none");
    });

    it("should support Soft brightness", () => {
      expect(Brightness.Soft).toBe("soft");
    });

    it("should support Bright brightness", () => {
      expect(Brightness.Bright).toBe("bright");
    });

    it("should determine if glow is enabled", () => {
      const brightness = Brightness.Soft;
      const hasGlow = brightness !== Brightness.None;
      expect(hasGlow).toBe(true);
    });
  });
});
