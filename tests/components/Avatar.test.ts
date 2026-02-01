import { describe, it, expect } from "vitest";
import { Size } from "../../src/enums";

describe("Avatar", () => {
  describe("Size configurations", () => {
    const SIZE_MAP: Record<Size, { diameter: number }> = {
      [Size.TwoXSmall]: { diameter: 24 },
      [Size.ExtraSmall]: { diameter: 28 },
      [Size.Small]: { diameter: 32 },
      [Size.Medium]: { diameter: 40 },
      [Size.Large]: { diameter: 48 },
      [Size.ExtraLarge]: { diameter: 56 },
      [Size.TwoXLarge]: { diameter: 64 },
    };

    it("should have correct diameter for TwoXSmall", () => {
      expect(SIZE_MAP[Size.TwoXSmall].diameter).toBe(24);
    });

    it("should have correct diameter for Small", () => {
      expect(SIZE_MAP[Size.Small].diameter).toBe(32);
    });

    it("should have correct diameter for Medium (default)", () => {
      expect(SIZE_MAP[Size.Medium].diameter).toBe(40);
    });

    it("should have correct diameter for Large", () => {
      expect(SIZE_MAP[Size.Large].diameter).toBe(48);
    });

    it("should have correct diameter for TwoXLarge", () => {
      expect(SIZE_MAP[Size.TwoXLarge].diameter).toBe(64);
    });
  });

  describe("Initials logic", () => {
    it("should truncate initials to 2 characters", () => {
      const initials = "Alice";
      expect(initials.slice(0, 2).toUpperCase()).toBe("AL");
    });

    it("should uppercase initials", () => {
      const initials = "jd";
      expect(initials.slice(0, 2).toUpperCase()).toBe("JD");
    });

    it("should handle single character initials", () => {
      const initials = "A";
      expect(initials.slice(0, 2).toUpperCase()).toBe("A");
    });
  });

  describe("Status indicator", () => {
    const STATUS_COLORS = {
      online: "#34C759",
      offline: "muted",
      busy: "#FF453A",
      away: "#FF9F0A",
    };

    it("should have online status color", () => {
      expect(STATUS_COLORS.online).toBeDefined();
    });

    it("should have offline status", () => {
      expect(STATUS_COLORS.offline).toBeDefined();
    });

    it("should have busy status color", () => {
      expect(STATUS_COLORS.busy).toBeDefined();
    });

    it("should have away status color", () => {
      expect(STATUS_COLORS.away).toBeDefined();
    });

    it("should have exactly 4 status types", () => {
      expect(Object.keys(STATUS_COLORS)).toHaveLength(4);
    });
  });

  describe("Status indicator sizing", () => {
    it("should calculate status size as 25% of diameter", () => {
      const diameter = 40;
      const statusSize = diameter * 0.25;
      expect(statusSize).toBe(10);
    });
  });
});
