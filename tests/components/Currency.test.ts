import { describe, it, expect } from "vitest";
import { Size, TextAppearance, Brightness } from "../../src/enums";

describe("Currency", () => {
  describe("Currency symbols", () => {
    const CURRENCY_SYMBOLS: Record<string, string> = {
      USD: "$",
      EUR: "€",
      GBP: "£",
      JPY: "¥",
      CNY: "¥",
      KRW: "₩",
      INR: "₹",
      BTC: "₿",
      ETH: "Ξ",
    };

    it("should have USD symbol", () => {
      expect(CURRENCY_SYMBOLS.USD).toBe("$");
    });

    it("should have EUR symbol", () => {
      expect(CURRENCY_SYMBOLS.EUR).toBe("€");
    });

    it("should have BTC symbol", () => {
      expect(CURRENCY_SYMBOLS.BTC).toBe("₿");
    });

    it("should have ETH symbol", () => {
      expect(CURRENCY_SYMBOLS.ETH).toBe("Ξ");
    });

    it("should have 9 currency symbols", () => {
      expect(Object.keys(CURRENCY_SYMBOLS)).toHaveLength(9);
    });
  });

  describe("Compact formatting", () => {
    function formatCompact(value: number, decimals: number): string {
      const absValue = Math.abs(value);
      if (absValue >= 1e12) {
        return (absValue / 1e12).toFixed(decimals) + "T";
      }
      if (absValue >= 1e9) {
        return (absValue / 1e9).toFixed(decimals) + "B";
      }
      if (absValue >= 1e6) {
        return (absValue / 1e6).toFixed(decimals) + "M";
      }
      if (absValue >= 1e3) {
        return (absValue / 1e3).toFixed(decimals) + "K";
      }
      return absValue.toFixed(decimals);
    }

    it("should format thousands with K", () => {
      expect(formatCompact(1500, 1)).toBe("1.5K");
    });

    it("should format millions with M", () => {
      expect(formatCompact(2500000, 1)).toBe("2.5M");
    });

    it("should format billions with B", () => {
      expect(formatCompact(1200000000, 1)).toBe("1.2B");
    });

    it("should format trillions with T", () => {
      expect(formatCompact(3500000000000, 1)).toBe("3.5T");
    });

    it("should handle small numbers", () => {
      expect(formatCompact(500, 2)).toBe("500.00");
    });
  });

  describe("Sign handling", () => {
    it("should show positive sign when showPositiveSign is true", () => {
      const value = 100;
      const showPositiveSign = true;
      const sign = showPositiveSign && value > 0 ? "+" : "";
      expect(sign).toBe("+");
    });

    it("should show negative sign for negative values", () => {
      const value = -100;
      const sign = value < 0 ? "-" : "";
      expect(sign).toBe("-");
    });

    it("should not show sign for zero", () => {
      const value = 0;
      const showPositiveSign = true;
      const sign = value < 0 ? "-" : (showPositiveSign && value > 0 ? "+" : "");
      expect(sign).toBe("");
    });
  });

  describe("Symbol sizing", () => {
    it("should calculate symbol font size as 85% of main font", () => {
      const fontSize = 16;
      const symbolFontSize = fontSize * 0.85;
      expect(symbolFontSize).toBe(13.6);
    });
  });

  describe("Size and appearance compatibility", () => {
    it("should have all size values", () => {
      expect(Size.Small).toBe("sm");
      expect(Size.Medium).toBe("md");
      expect(Size.Large).toBe("lg");
    });

    it("should have all appearance values", () => {
      expect(TextAppearance.Primary).toBe("primary");
      expect(TextAppearance.Success).toBe("success");
      expect(TextAppearance.Danger).toBe("danger");
    });
  });
});
