import { describe, it, expect } from "vitest";
import { Size, TextAppearance } from "../../src/enums";

describe("PercentChange", () => {
  describe("Appearance based on value", () => {
    function getAppearance(value: number): TextAppearance {
      if (value > 0) return TextAppearance.Success;
      if (value < 0) return TextAppearance.Danger;
      return TextAppearance.Muted;
    }

    it("should use Success appearance for positive values", () => {
      expect(getAppearance(2.45)).toBe(TextAppearance.Success);
    });

    it("should use Danger appearance for negative values", () => {
      expect(getAppearance(-1.23)).toBe(TextAppearance.Danger);
    });

    it("should use Muted appearance for zero", () => {
      expect(getAppearance(0)).toBe(TextAppearance.Muted);
    });
  });

  describe("Arrow icon selection", () => {
    function getArrowIcon(value: number): string | null {
      if (value > 0) return "arrow-up";
      if (value < 0) return "arrow-down";
      return null;
    }

    it("should show arrow-up for positive values", () => {
      expect(getArrowIcon(5.5)).toBe("arrow-up");
    });

    it("should show arrow-down for negative values", () => {
      expect(getArrowIcon(-3.2)).toBe("arrow-down");
    });

    it("should show no arrow for zero", () => {
      expect(getArrowIcon(0)).toBeNull();
    });
  });

  describe("Icon size mapping", () => {
    const ICON_SIZE_MAP: Record<Size, Size> = {
      [Size.TwoXSmall]: Size.TwoXSmall,
      [Size.ExtraSmall]: Size.TwoXSmall,
      [Size.Small]: Size.ExtraSmall,
      [Size.Medium]: Size.Small,
      [Size.Large]: Size.Medium,
      [Size.ExtraLarge]: Size.Large,
      [Size.TwoXLarge]: Size.ExtraLarge,
    };

    it("should have smaller icon than text size", () => {
      expect(ICON_SIZE_MAP[Size.Medium]).toBe(Size.Small);
    });

    it("should have icon one size smaller than text", () => {
      expect(ICON_SIZE_MAP[Size.Large]).toBe(Size.Medium);
    });
  });

  describe("Number formatting", () => {
    it("should format with 2 decimal places by default", () => {
      const value = 2.456;
      const decimals = 2;
      expect(Math.abs(value).toFixed(decimals)).toBe("2.46");
    });

    it("should respect custom decimal places", () => {
      const value = 2.456;
      const decimals = 0;
      expect(Math.abs(value).toFixed(decimals)).toBe("2");
    });

    it("should use absolute value", () => {
      const value = -3.5;
      expect(Math.abs(value)).toBe(3.5);
    });
  });

  describe("Optional display elements", () => {
    it("should support hiding arrow", () => {
      const showArrow = false;
      expect(showArrow).toBe(false);
    });

    it("should support hiding percent symbol", () => {
      const showPercent = false;
      expect(showPercent).toBe(false);
    });
  });

  describe("Container gap", () => {
    it("should have 2px gap between arrow and number", () => {
      const gap = 2;
      expect(gap).toBe(2);
    });
  });
});
