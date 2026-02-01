import { describe, it, expect, beforeEach } from "vitest";
import {
  setGlowMultiplier,
  getGlowMultiplier,
  setCurrentTheme,
  getCurrentTheme,
} from "../../src/tokens/runtime";
import { Theme } from "../../src/enums/Theme";

describe("runtime tokens", () => {
  beforeEach(() => {
    setGlowMultiplier(1);
    setCurrentTheme(Theme.Dark);
  });

  describe("glowMultiplier", () => {
    it("should default to 1", () => {
      setGlowMultiplier(1);
      expect(getGlowMultiplier()).toBe(1);
    });

    it("should set and get glow multiplier", () => {
      setGlowMultiplier(2.5);
      expect(getGlowMultiplier()).toBe(2.5);
    });

    it("should accept 0", () => {
      setGlowMultiplier(0);
      expect(getGlowMultiplier()).toBe(0);
    });

    it("should accept decimal values", () => {
      setGlowMultiplier(0.75);
      expect(getGlowMultiplier()).toBe(0.75);
    });
  });

  describe("currentTheme", () => {
    it("should default to Dark", () => {
      setCurrentTheme(Theme.Dark);
      expect(getCurrentTheme()).toBe(Theme.Dark);
    });

    it("should set and get Light theme", () => {
      setCurrentTheme(Theme.Light);
      expect(getCurrentTheme()).toBe(Theme.Light);
    });

    it("should set and get Dark theme", () => {
      setCurrentTheme(Theme.Dark);
      expect(getCurrentTheme()).toBe(Theme.Dark);
    });
  });
});
