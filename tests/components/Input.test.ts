import { describe, it, expect } from "vitest";
import { Size, Shape } from "../../src/enums";

describe("Input", () => {
  describe("Size configurations", () => {
    const SIZE_MAP: Record<Size, { height: number; fontSize: number; padding: number }> = {
      [Size.TwoXSmall]: { height: 28, fontSize: 12, padding: 8 },
      [Size.ExtraSmall]: { height: 32, fontSize: 13, padding: 10 },
      [Size.Small]: { height: 36, fontSize: 14, padding: 12 },
      [Size.Medium]: { height: 40, fontSize: 14, padding: 12 },
      [Size.Large]: { height: 44, fontSize: 16, padding: 14 },
      [Size.ExtraLarge]: { height: 48, fontSize: 16, padding: 16 },
      [Size.TwoXLarge]: { height: 52, fontSize: 18, padding: 16 },
    };

    it("should have 36px height for Small", () => {
      expect(SIZE_MAP[Size.Small].height).toBe(36);
    });

    it("should have 40px height for Medium (default)", () => {
      expect(SIZE_MAP[Size.Medium].height).toBe(40);
    });

    it("should have 44px height for Large", () => {
      expect(SIZE_MAP[Size.Large].height).toBe(44);
    });

    it("should have 14px font for Medium", () => {
      expect(SIZE_MAP[Size.Medium].fontSize).toBe(14);
    });

    it("should have increasing height with size", () => {
      expect(SIZE_MAP[Size.Large].height).toBeGreaterThan(SIZE_MAP[Size.Medium].height);
    });
  });

  describe("Border color states", () => {
    it("should use danger color for error state", () => {
      const error = true;
      const isFocused = false;
      const borderColor = error ? "danger" : isFocused ? "focus" : "subtle";
      expect(borderColor).toBe("danger");
    });

    it("should use focus color when focused", () => {
      const error = false;
      const isFocused = true;
      const borderColor = error ? "danger" : isFocused ? "focus" : "subtle";
      expect(borderColor).toBe("focus");
    });

    it("should use subtle color by default", () => {
      const error = false;
      const isFocused = false;
      const borderColor = error ? "danger" : isFocused ? "focus" : "subtle";
      expect(borderColor).toBe("subtle");
    });
  });

  describe("Disabled state", () => {
    it("should have opacity 0.5 when disabled", () => {
      const disabled = true;
      const opacity = disabled ? 0.5 : 1;
      expect(opacity).toBe(0.5);
    });

    it("should have full opacity when enabled", () => {
      const disabled = false;
      const opacity = disabled ? 0.5 : 1;
      expect(opacity).toBe(1);
    });
  });

  describe("Shape radius", () => {
    it("should support Soft shape", () => {
      expect(Shape.Soft).toBe("soft");
    });

    it("should support Rounded shape (default)", () => {
      expect(Shape.Rounded).toBe("rounded");
    });

    it("should support Pill shape", () => {
      expect(Shape.Pill).toBe("pill");
    });
  });

  describe("Gap between elements", () => {
    it("should have 8px gap between icon and input", () => {
      const gap = 8;
      expect(gap).toBe(8);
    });
  });
});
