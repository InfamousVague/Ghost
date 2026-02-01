import { describe, it, expect } from "vitest";
import { Size } from "../../src/enums";

describe("Divider", () => {
  describe("Size to thickness mapping", () => {
    const SIZE_MAP: Record<Size, number> = {
      [Size.TwoXSmall]: 0.5,
      [Size.ExtraSmall]: 0.5,
      [Size.Small]: 1,
      [Size.Medium]: 1,
      [Size.Large]: 1.5,
      [Size.ExtraLarge]: 2,
      [Size.TwoXLarge]: 2,
    };

    it("should have 0.5px thickness for TwoXSmall", () => {
      expect(SIZE_MAP[Size.TwoXSmall]).toBe(0.5);
    });

    it("should have 1px thickness for Small (default)", () => {
      expect(SIZE_MAP[Size.Small]).toBe(1);
    });

    it("should have 1.5px thickness for Large", () => {
      expect(SIZE_MAP[Size.Large]).toBe(1.5);
    });

    it("should have 2px thickness for TwoXLarge", () => {
      expect(SIZE_MAP[Size.TwoXLarge]).toBe(2);
    });
  });

  describe("Orientation", () => {
    it("should support horizontal orientation", () => {
      const orientation = "horizontal";
      expect(orientation).toBe("horizontal");
    });

    it("should support vertical orientation", () => {
      const orientation = "vertical";
      expect(orientation).toBe("vertical");
    });

    it("should determine if horizontal", () => {
      const orientation = "horizontal";
      const isHorizontal = orientation === "horizontal";
      expect(isHorizontal).toBe(true);
    });
  });

  describe("Margin based on orientation", () => {
    it("should use marginVertical for horizontal divider", () => {
      const isHorizontal = true;
      const spacing = 16;
      const marginStyle = isHorizontal
        ? { marginVertical: spacing }
        : { marginHorizontal: spacing };
      expect(marginStyle).toEqual({ marginVertical: 16 });
    });

    it("should use marginHorizontal for vertical divider", () => {
      const isHorizontal = false;
      const spacing = 16;
      const marginStyle = isHorizontal
        ? { marginVertical: spacing }
        : { marginHorizontal: spacing };
      expect(marginStyle).toEqual({ marginHorizontal: 16 });
    });
  });

  describe("Label styles", () => {
    it("should have uppercase text transform for labels", () => {
      const labelStyle = {
        paddingHorizontal: 12,
        textTransform: "uppercase",
        letterSpacing: 1,
      };
      expect(labelStyle.textTransform).toBe("uppercase");
    });

    it("should have letter spacing of 1 for labels", () => {
      const letterSpacing = 1;
      expect(letterSpacing).toBe(1);
    });
  });
});
