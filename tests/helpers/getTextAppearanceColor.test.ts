import { describe, it, expect } from "vitest";
import { getTextAppearanceColor } from "../../src/helpers/getTextAppearanceColor";
import { TextAppearance } from "../../src/enums/TextAppearance";
import { Colors } from "../../src/tokens/Colors";

describe("getTextAppearanceColor", () => {
  it("should return primary text color", () => {
    expect(getTextAppearanceColor(TextAppearance.Primary)).toBe(
      Colors.text.primary
    );
  });

  it("should return secondary text color", () => {
    expect(getTextAppearanceColor(TextAppearance.Secondary)).toBe(
      Colors.text.secondary
    );
  });

  it("should return muted text color", () => {
    expect(getTextAppearanceColor(TextAppearance.Muted)).toBe(Colors.text.muted);
  });

  it("should return link text color", () => {
    expect(getTextAppearanceColor(TextAppearance.Link)).toBe(Colors.text.link);
  });

  it("should return inverse text color", () => {
    expect(getTextAppearanceColor(TextAppearance.Inverse)).toBe(
      Colors.text.inverse
    );
  });

  it("should return success status color", () => {
    expect(getTextAppearanceColor(TextAppearance.Success)).toBe(
      Colors.status.success
    );
  });

  it("should return warning status color", () => {
    expect(getTextAppearanceColor(TextAppearance.Warning)).toBe(
      Colors.status.warning
    );
  });

  it("should return danger status color", () => {
    expect(getTextAppearanceColor(TextAppearance.Danger)).toBe(
      Colors.status.danger
    );
  });

  it("should return info status color", () => {
    expect(getTextAppearanceColor(TextAppearance.Info)).toBe(Colors.status.info);
  });

  it("should return string values for all appearances", () => {
    Object.values(TextAppearance).forEach((appearance) => {
      expect(typeof getTextAppearanceColor(appearance)).toBe("string");
    });
  });
});
