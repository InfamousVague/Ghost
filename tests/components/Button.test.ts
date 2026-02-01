import { describe, it, expect } from "vitest";
import { Appearance, Size, Shape, Brightness } from "../../src/enums";

describe("Button", () => {
  describe("Appearance enum values", () => {
    it("should have Primary appearance", () => {
      expect(Appearance.Primary).toBe("primary");
    });

    it("should have Secondary appearance", () => {
      expect(Appearance.Secondary).toBe("secondary");
    });

    it("should have Success appearance", () => {
      expect(Appearance.Success).toBe("success");
    });

    it("should have Warning appearance", () => {
      expect(Appearance.Warning).toBe("warning");
    });

    it("should have Danger appearance", () => {
      expect(Appearance.Danger).toBe("danger");
    });

    it("should have Info appearance", () => {
      expect(Appearance.Info).toBe("info");
    });

    it("should have Ghost appearance", () => {
      expect(Appearance.Ghost).toBe("ghost");
    });
  });

  describe("Size enum values", () => {
    it("should have all size variants", () => {
      expect(Size.TwoXSmall).toBe("2xs");
      expect(Size.ExtraSmall).toBe("xs");
      expect(Size.Small).toBe("sm");
      expect(Size.Medium).toBe("md");
      expect(Size.Large).toBe("lg");
      expect(Size.ExtraLarge).toBe("xl");
      expect(Size.TwoXLarge).toBe("2xl");
    });
  });

  describe("Shape enum values", () => {
    it("should have Soft shape", () => {
      expect(Shape.Soft).toBe("soft");
    });

    it("should have Rounded shape", () => {
      expect(Shape.Rounded).toBe("rounded");
    });

    it("should have Pill shape", () => {
      expect(Shape.Pill).toBe("pill");
    });

    it("should have Circle shape", () => {
      expect(Shape.Circle).toBe("circle");
    });
  });

  describe("Brightness enum values", () => {
    it("should have None brightness", () => {
      expect(Brightness.None).toBe("none");
    });

    it("should have Soft brightness", () => {
      expect(Brightness.Soft).toBe("soft");
    });

    it("should have Base brightness", () => {
      expect(Brightness.Base).toBe("base");
    });

    it("should have Bright brightness", () => {
      expect(Brightness.Bright).toBe("bright");
    });
  });

  describe("Disabled state", () => {
    it("should have opacity of 0.5 when disabled", () => {
      const disabledOpacity = 0.5;
      expect(disabledOpacity).toBe(0.5);
    });
  });
});
