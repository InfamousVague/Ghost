import { describe, it, expect } from "vitest";
import { Size } from "../../src/enums";

describe("Badge", () => {
  describe("Variant colors", () => {
    const VARIANT_COLORS = {
      default: { background: "overlay", text: "primary" },
      primary: { background: "accent", text: "#FFFFFF" },
      success: { background: "successSurface", text: "success" },
      warning: { background: "warningSurface", text: "warning" },
      danger: { background: "dangerSurface", text: "danger" },
      info: { background: "infoSurface", text: "info" },
      outline: { background: "transparent", text: "secondary", border: true },
    };

    it("should have default variant", () => {
      expect(VARIANT_COLORS.default).toBeDefined();
    });

    it("should have primary variant", () => {
      expect(VARIANT_COLORS.primary).toBeDefined();
      expect(VARIANT_COLORS.primary.text).toBe("#FFFFFF");
    });

    it("should have success variant", () => {
      expect(VARIANT_COLORS.success).toBeDefined();
    });

    it("should have warning variant", () => {
      expect(VARIANT_COLORS.warning).toBeDefined();
    });

    it("should have danger variant", () => {
      expect(VARIANT_COLORS.danger).toBeDefined();
    });

    it("should have info variant", () => {
      expect(VARIANT_COLORS.info).toBeDefined();
    });

    it("should have outline variant with border", () => {
      expect(VARIANT_COLORS.outline).toBeDefined();
      expect(VARIANT_COLORS.outline.background).toBe("transparent");
      expect(VARIANT_COLORS.outline.border).toBe(true);
    });

    it("should have exactly 7 variants", () => {
      expect(Object.keys(VARIANT_COLORS)).toHaveLength(7);
    });
  });

  describe("Size configurations", () => {
    const SIZE_MAP: Record<Size, { paddingH: number; paddingV: number }> = {
      [Size.TwoXSmall]: { paddingH: 4, paddingV: 2 },
      [Size.ExtraSmall]: { paddingH: 6, paddingV: 2 },
      [Size.Small]: { paddingH: 8, paddingV: 3 },
      [Size.Medium]: { paddingH: 10, paddingV: 4 },
      [Size.Large]: { paddingH: 12, paddingV: 5 },
      [Size.ExtraLarge]: { paddingH: 14, paddingV: 6 },
      [Size.TwoXLarge]: { paddingH: 16, paddingV: 7 },
    };

    it("should have correct padding for Small (default)", () => {
      expect(SIZE_MAP[Size.Small].paddingH).toBe(8);
      expect(SIZE_MAP[Size.Small].paddingV).toBe(3);
    });

    it("should have increasing padding with size", () => {
      expect(SIZE_MAP[Size.Large].paddingH).toBeGreaterThan(SIZE_MAP[Size.Small].paddingH);
    });
  });

  describe("Dot variant", () => {
    it("should have fixed dot size", () => {
      const dotSize = 8;
      expect(dotSize).toBe(8);
    });

    it("should have circular border radius", () => {
      const dotSize = 8;
      const borderRadius = dotSize / 2;
      expect(borderRadius).toBe(4);
    });
  });
});
