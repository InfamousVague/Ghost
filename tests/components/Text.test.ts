import { describe, it, expect } from "vitest";
import { TextAppearance, Size, Brightness } from "../../src/enums";

describe("Text", () => {
  describe("TextAppearance enum values", () => {
    it("should have Primary value", () => {
      expect(TextAppearance.Primary).toBe("primary");
    });

    it("should have Secondary value", () => {
      expect(TextAppearance.Secondary).toBe("secondary");
    });

    it("should have Muted value", () => {
      expect(TextAppearance.Muted).toBe("muted");
    });

    it("should have Link value", () => {
      expect(TextAppearance.Link).toBe("link");
    });

    it("should have Inverse value", () => {
      expect(TextAppearance.Inverse).toBe("inverse");
    });

    it("should have Success value", () => {
      expect(TextAppearance.Success).toBe("success");
    });

    it("should have Warning value", () => {
      expect(TextAppearance.Warning).toBe("warning");
    });

    it("should have Danger value", () => {
      expect(TextAppearance.Danger).toBe("danger");
    });

    it("should have Info value", () => {
      expect(TextAppearance.Info).toBe("info");
    });

    it("should have exactly 9 values", () => {
      expect(Object.keys(TextAppearance)).toHaveLength(9);
    });
  });

  describe("Size enum compatibility", () => {
    it("should have all size values for text sizing", () => {
      expect(Size.TwoXSmall).toBe("2xs");
      expect(Size.ExtraSmall).toBe("xs");
      expect(Size.Small).toBe("sm");
      expect(Size.Medium).toBe("md");
      expect(Size.Large).toBe("lg");
      expect(Size.ExtraLarge).toBe("xl");
      expect(Size.TwoXLarge).toBe("2xl");
    });
  });

  describe("Brightness enum compatibility", () => {
    it("should have all brightness values for glow effects", () => {
      expect(Brightness.None).toBe("none");
      expect(Brightness.Soft).toBe("soft");
      expect(Brightness.Base).toBe("base");
      expect(Brightness.Bright).toBe("bright");
    });
  });
});
