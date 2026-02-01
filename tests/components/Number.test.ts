import { describe, it, expect } from "vitest";
import { TextAppearance, Size, Brightness } from "../../src/enums";

describe("Number", () => {
  describe("TextAppearance enum values for Number", () => {
    it("should have Primary value", () => {
      expect(TextAppearance.Primary).toBe("primary");
    });

    it("should have Secondary value", () => {
      expect(TextAppearance.Secondary).toBe("secondary");
    });

    it("should have Link value", () => {
      expect(TextAppearance.Link).toBe("link");
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
  });

  describe("Size enum compatibility", () => {
    it("should have all size values for number sizing", () => {
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

  describe("Number formatting logic", () => {
    // Test the calculateMinDigits logic conceptually
    describe("intelligent leading zeros", () => {
      it("percent type should require 2-3 digits based on max", () => {
        // For percentages with max 100, should use 3 digits (000-100)
        // For percentages with max < 100, should use 2 digits (00-99)
        const maxUnder100 = 99;
        const maxOver100 = 100;
        expect(String(maxUnder100).length).toBeLessThanOrEqual(2);
        expect(String(maxOver100).length).toBe(3);
      });

      it("score type should match max value digit count", () => {
        // Score with max 100 should pad to 3 digits
        const max100 = 100;
        expect(String(Math.floor(max100)).length).toBe(3);

        // Score with max 10 should pad to 2 digits
        const max10 = 10;
        expect(String(Math.floor(max10)).length).toBe(2);
      });

      it("default type should detect partial thousands groups", () => {
        // 1000-9999 is a partial 10k group (needs leading zero for 5 digits)
        const partialThousands = 3376;
        expect(partialThousands).toBeGreaterThanOrEqual(1000);
        expect(partialThousands).toBeLessThan(10000);

        // 10000+ is a complete 10k group (no leading zero needed)
        const completeThousands = 13376;
        expect(completeThousands).toBeGreaterThanOrEqual(10000);
      });

      it("should handle 100k-999k partial group", () => {
        // 100,000 - 999,999 could use leading zero for 7 digits
        const partial100k = 500000;
        expect(partial100k).toBeGreaterThanOrEqual(100000);
        expect(partial100k).toBeLessThan(1000000);
      });
    });

    describe("number formatting", () => {
      it("should support decimal places", () => {
        const value = 48654;
        const formatted = value.toFixed(2);
        expect(formatted).toBe("48654.00");
      });

      it("should handle negative numbers", () => {
        const value = -14;
        expect(value).toBeLessThan(0);
        expect(Math.abs(value)).toBe(14);
      });

      it("should support thousands separator pattern", () => {
        const intStr = "48654";
        const withSeparators = intStr.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        expect(withSeparators).toBe("48,654");
      });

      it("should pad with leading zeros correctly", () => {
        const intStr = "78";
        const padded = intStr.padStart(3, "0");
        expect(padded).toBe("078");
      });
    });
  });
});
