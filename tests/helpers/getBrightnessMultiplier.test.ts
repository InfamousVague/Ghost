import { describe, it, expect } from "vitest";
import { getBrightnessMultiplier } from "../../src/helpers/getBrightnessMultiplier";
import { Brightness } from "../../src/enums/Brightness";

describe("getBrightnessMultiplier", () => {
  it("should return 0 for None brightness", () => {
    expect(getBrightnessMultiplier(Brightness.None)).toBe(0);
  });

  it("should return 0.5 for Soft brightness", () => {
    expect(getBrightnessMultiplier(Brightness.Soft)).toBe(0.5);
  });

  it("should return 1.0 for Base brightness", () => {
    expect(getBrightnessMultiplier(Brightness.Base)).toBe(1.0);
  });

  it("should return 1.5 for Bright brightness", () => {
    expect(getBrightnessMultiplier(Brightness.Bright)).toBe(1.5);
  });

  it("should return number values for all brightness levels", () => {
    Object.values(Brightness).forEach((brightness) => {
      expect(typeof getBrightnessMultiplier(brightness)).toBe("number");
    });
  });

  it("should return increasing values from None to Bright", () => {
    const none = getBrightnessMultiplier(Brightness.None);
    const soft = getBrightnessMultiplier(Brightness.Soft);
    const base = getBrightnessMultiplier(Brightness.Base);
    const bright = getBrightnessMultiplier(Brightness.Bright);

    expect(none).toBeLessThan(soft);
    expect(soft).toBeLessThan(base);
    expect(base).toBeLessThan(bright);
  });
});
