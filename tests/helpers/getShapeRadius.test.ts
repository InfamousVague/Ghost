import { describe, it, expect } from "vitest";
import { getShapeRadius } from "../../src/helpers/getShapeRadius";
import { Shape } from "../../src/enums/Shape";
import { Radii } from "../../src/tokens/Radii";

describe("getShapeRadius", () => {
  it("should return soft radius for Soft shape", () => {
    expect(getShapeRadius(Shape.Soft)).toBe(Radii.soft);
  });

  it("should return rounded radius for Rounded shape", () => {
    expect(getShapeRadius(Shape.Rounded)).toBe(Radii.rounded);
  });

  it("should return pill radius for Pill shape", () => {
    expect(getShapeRadius(Shape.Pill)).toBe(Radii.pill);
  });

  it("should return circle radius for Circle shape", () => {
    expect(getShapeRadius(Shape.Circle)).toBe(Radii.circle);
  });

  it("should return string values", () => {
    Object.values(Shape).forEach((shape) => {
      expect(typeof getShapeRadius(shape)).toBe("string");
    });
  });
});
