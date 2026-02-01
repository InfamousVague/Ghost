import { describe, it, expect } from "vitest";
import { CardBorder, CardGlow } from "../../src/components/card/Card";

describe("Card", () => {
  describe("CardBorder enum", () => {
    it("should have None value", () => {
      expect(CardBorder.None).toBe("none");
    });

    it("should have Solid value", () => {
      expect(CardBorder.Solid).toBe("solid");
    });

    it("should have Gradient value", () => {
      expect(CardBorder.Gradient).toBe("gradient");
    });

    it("should have exactly 3 values", () => {
      expect(Object.keys(CardBorder)).toHaveLength(3);
    });
  });

  describe("CardGlow enum", () => {
    it("should have Silver value", () => {
      expect(CardGlow.Silver).toBe("silver");
    });

    it("should have Blue value", () => {
      expect(CardGlow.Blue).toBe("blue");
    });

    it("should have Purple value", () => {
      expect(CardGlow.Purple).toBe("purple");
    });

    it("should have Green value", () => {
      expect(CardGlow.Green).toBe("green");
    });

    it("should have Amber value", () => {
      expect(CardGlow.Amber).toBe("amber");
    });

    it("should have Pink value", () => {
      expect(CardGlow.Pink).toBe("pink");
    });

    it("should have Coral value", () => {
      expect(CardGlow.Coral).toBe("coral");
    });

    it("should have Cyan value", () => {
      expect(CardGlow.Cyan).toBe("cyan");
    });

    it("should have Aurora multi-color value", () => {
      expect(CardGlow.Aurora).toBe("aurora");
    });

    it("should have Sunset multi-color value", () => {
      expect(CardGlow.Sunset).toBe("sunset");
    });

    it("should have exactly 10 values", () => {
      expect(Object.keys(CardGlow)).toHaveLength(10);
    });

    it("should have all string values", () => {
      Object.values(CardGlow).forEach((value) => {
        expect(typeof value).toBe("string");
      });
    });
  });
});
