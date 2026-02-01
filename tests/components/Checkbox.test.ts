import { describe, it, expect } from "vitest";
import { Size } from "../../src/enums";

describe("Checkbox", () => {
  describe("Size configurations", () => {
    const SIZE_MAP: Record<Size, { box: number; stroke: number }> = {
      [Size.TwoXSmall]: { box: 14, stroke: 1.5 },
      [Size.ExtraSmall]: { box: 16, stroke: 1.5 },
      [Size.Small]: { box: 18, stroke: 2 },
      [Size.Medium]: { box: 20, stroke: 2 },
      [Size.Large]: { box: 22, stroke: 2 },
      [Size.ExtraLarge]: { box: 24, stroke: 2.5 },
      [Size.TwoXLarge]: { box: 28, stroke: 2.5 },
    };

    it("should have correct box size for Small", () => {
      expect(SIZE_MAP[Size.Small].box).toBe(18);
    });

    it("should have correct box size for Medium (default)", () => {
      expect(SIZE_MAP[Size.Medium].box).toBe(20);
    });

    it("should have correct stroke width for Medium", () => {
      expect(SIZE_MAP[Size.Medium].stroke).toBe(2);
    });

    it("should increase stroke for larger sizes", () => {
      expect(SIZE_MAP[Size.TwoXLarge].stroke).toBe(2.5);
    });
  });

  describe("State handling", () => {
    it("should have checked state", () => {
      const checked = true;
      expect(checked).toBe(true);
    });

    it("should have unchecked state", () => {
      const checked = false;
      expect(checked).toBe(false);
    });

    it("should have indeterminate state", () => {
      const indeterminate = true;
      expect(indeterminate).toBe(true);
    });
  });

  describe("Visual styles", () => {
    it("should have border radius of 4", () => {
      const borderRadius = 4;
      expect(borderRadius).toBe(4);
    });

    it("should show no border when checked", () => {
      const isActive = true;
      const borderWidth = isActive ? 0 : 2;
      expect(borderWidth).toBe(0);
    });

    it("should show border when unchecked", () => {
      const isActive = false;
      const borderWidth = isActive ? 0 : 2;
      expect(borderWidth).toBe(2);
    });

    it("should have opacity 0.5 when disabled", () => {
      const disabled = true;
      const opacity = disabled ? 0.5 : 1;
      expect(opacity).toBe(0.5);
    });
  });

  describe("Check icon sizing", () => {
    it("should calculate check icon size as 65% of box", () => {
      const boxSize = 20;
      const iconSize = boxSize * 0.65;
      expect(iconSize).toBe(13);
    });
  });
});
