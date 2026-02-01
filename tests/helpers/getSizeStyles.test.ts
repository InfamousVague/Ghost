import { describe, it, expect } from "vitest";
import { getSizeStyles } from "../../src/helpers/getSizeStyles";
import { Size } from "../../src/enums/Size";
import { Spacing, Typography } from "../../src/tokens";

describe("getSizeStyles", () => {
  describe("TwoXSmall", () => {
    it("should return correct styles", () => {
      const result = getSizeStyles(Size.TwoXSmall);
      expect(result.paddingVertical).toBe(Spacing.xxs);
      expect(result.paddingHorizontal).toBe(Spacing.xs);
      expect(result.fontSize).toBe(Typography.fontSize.xxs);
    });
  });

  describe("ExtraSmall", () => {
    it("should return correct styles", () => {
      const result = getSizeStyles(Size.ExtraSmall);
      expect(result.paddingVertical).toBe(Spacing.xxs);
      expect(result.paddingHorizontal).toBe(Spacing.sm);
      expect(result.fontSize).toBe(Typography.fontSize.xs);
    });
  });

  describe("Small", () => {
    it("should return correct styles", () => {
      const result = getSizeStyles(Size.Small);
      expect(result.paddingVertical).toBe(Spacing.xs);
      expect(result.paddingHorizontal).toBe(Spacing.sm);
      expect(result.fontSize).toBe(Typography.fontSize.sm);
    });
  });

  describe("Medium", () => {
    it("should return correct styles", () => {
      const result = getSizeStyles(Size.Medium);
      expect(result.paddingVertical).toBe(Spacing.xs);
      expect(result.paddingHorizontal).toBe(Spacing.md);
      expect(result.fontSize).toBe(Typography.fontSize.md);
    });
  });

  describe("Large", () => {
    it("should return correct styles", () => {
      const result = getSizeStyles(Size.Large);
      expect(result.paddingVertical).toBe(Spacing.sm);
      expect(result.paddingHorizontal).toBe(Spacing.lg);
      expect(result.fontSize).toBe(Typography.fontSize.lg);
    });
  });

  describe("ExtraLarge", () => {
    it("should return correct styles", () => {
      const result = getSizeStyles(Size.ExtraLarge);
      expect(result.paddingVertical).toBe(Spacing.md);
      expect(result.paddingHorizontal).toBe(Spacing.xl);
      expect(result.fontSize).toBe(Typography.fontSize.xl);
    });
  });

  describe("TwoXLarge", () => {
    it("should return correct styles", () => {
      const result = getSizeStyles(Size.TwoXLarge);
      expect(result.paddingVertical).toBe(Spacing.lg);
      expect(result.paddingHorizontal).toBe(Spacing.xxl);
      expect(result.fontSize).toBe(Typography.fontSize.xxl);
    });
  });

  it("should return all required properties for all sizes", () => {
    Object.values(Size).forEach((size) => {
      const result = getSizeStyles(size);
      expect(result).toHaveProperty("paddingVertical");
      expect(result).toHaveProperty("paddingHorizontal");
      expect(result).toHaveProperty("fontSize");
    });
  });
});
