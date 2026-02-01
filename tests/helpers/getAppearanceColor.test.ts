import { describe, it, expect, beforeEach } from "vitest";
import { getAppearanceColor } from "../../src/helpers/getAppearanceColor";
import { Appearance } from "../../src/enums/Appearance";
import { setCurrentTheme, setGlowMultiplier } from "../../src/tokens/runtime";
import { Theme } from "../../src/enums/Theme";
import { Colors } from "../../src/tokens/Colors";

describe("getAppearanceColor", () => {
  beforeEach(() => {
    setCurrentTheme(Theme.Dark);
    setGlowMultiplier(1);
  });

  describe("Primary appearance", () => {
    it("should return correct background color", () => {
      const result = getAppearanceColor(Appearance.Primary);
      expect(result.background).toBe(Colors.accent.primary);
    });

    it("should return correct text color", () => {
      const result = getAppearanceColor(Appearance.Primary);
      expect(result.text).toBe(Colors.text.primary);
    });

    it("should return correct border color", () => {
      const result = getAppearanceColor(Appearance.Primary);
      expect(result.border).toBe(Colors.accent.primary);
    });

    it("should return shadow with properties", () => {
      const result = getAppearanceColor(Appearance.Primary);
      expect(result.shadow).toHaveProperty("shadowColor");
      expect(result.shadow).toHaveProperty("shadowOffset");
      expect(result.shadow).toHaveProperty("shadowOpacity");
      expect(result.shadow).toHaveProperty("shadowRadius");
      expect(result.shadow).toHaveProperty("elevation");
    });

    it("should return non-zero shadow opacity", () => {
      const result = getAppearanceColor(Appearance.Primary);
      expect(result.shadow.shadowOpacity).toBeGreaterThan(0);
    });
  });

  describe("Secondary appearance", () => {
    it("should return correct background color", () => {
      const result = getAppearanceColor(Appearance.Secondary);
      expect(result.background).toBe(Colors.accent.secondary);
    });
  });

  describe("Success appearance", () => {
    it("should return correct background color", () => {
      const result = getAppearanceColor(Appearance.Success);
      expect(result.background).toBe(Colors.status.success);
    });
  });

  describe("Warning appearance", () => {
    it("should return correct background color", () => {
      const result = getAppearanceColor(Appearance.Warning);
      expect(result.background).toBe(Colors.status.warning);
    });
  });

  describe("Danger appearance", () => {
    it("should return correct background color", () => {
      const result = getAppearanceColor(Appearance.Danger);
      expect(result.background).toBe(Colors.status.danger);
    });
  });

  describe("Info appearance", () => {
    it("should return correct background color", () => {
      const result = getAppearanceColor(Appearance.Info);
      expect(result.background).toBe(Colors.status.info);
    });
  });

  describe("Ghost appearance", () => {
    it("should return transparent background", () => {
      const result = getAppearanceColor(Appearance.Ghost);
      expect(result.background).toBe("transparent");
    });

    it("should return zero shadow opacity", () => {
      const result = getAppearanceColor(Appearance.Ghost);
      expect(result.shadow.shadowOpacity).toBe(0);
    });

    it("should return light text in dark theme", () => {
      setCurrentTheme(Theme.Dark);
      const result = getAppearanceColor(Appearance.Ghost);
      expect(result.text).toBe(Colors.text.primary);
    });

    it("should return dark text in light theme", () => {
      setCurrentTheme(Theme.Light);
      const result = getAppearanceColor(Appearance.Ghost);
      expect(result.text).toBe("#000000");
    });
  });

  describe("brightness multiplier", () => {
    it("should return zero shadow opacity when brightness is 0", () => {
      const result = getAppearanceColor(Appearance.Primary, 0);
      expect(result.shadow.shadowOpacity).toBe(0);
    });

    it("should return shadow with higher brightness", () => {
      const result = getAppearanceColor(Appearance.Primary, 2);
      expect(result.shadow.shadowOpacity).toBeGreaterThan(0);
    });
  });

  describe("return structure", () => {
    it("should return all required properties", () => {
      const result = getAppearanceColor(Appearance.Primary);
      expect(result).toHaveProperty("background");
      expect(result).toHaveProperty("backgroundHover");
      expect(result).toHaveProperty("backgroundActive");
      expect(result).toHaveProperty("text");
      expect(result).toHaveProperty("border");
      expect(result).toHaveProperty("shadow");
    });

    it("should return shadow as an object with all required properties", () => {
      const result = getAppearanceColor(Appearance.Primary);
      expect(typeof result.shadow).toBe("object");
      expect(result.shadow).toHaveProperty("shadowColor");
      expect(result.shadow).toHaveProperty("shadowOffset");
      expect(result.shadow.shadowOffset).toHaveProperty("width");
      expect(result.shadow.shadowOffset).toHaveProperty("height");
      expect(result.shadow).toHaveProperty("shadowOpacity");
      expect(result.shadow).toHaveProperty("shadowRadius");
      expect(result.shadow).toHaveProperty("elevation");
    });
  });
});
