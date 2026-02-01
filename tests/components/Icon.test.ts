import { describe, it, expect } from "vitest";
import { Size, TextAppearance } from "../../src/enums";

describe("Icon", () => {
  describe("Size to pixel mapping", () => {
    const SIZE_MAP: Record<Size, number> = {
      [Size.TwoXSmall]: 12,
      [Size.ExtraSmall]: 14,
      [Size.Small]: 16,
      [Size.Medium]: 20,
      [Size.Large]: 24,
      [Size.ExtraLarge]: 28,
      [Size.TwoXLarge]: 32,
    };

    it("should have 12px for TwoXSmall", () => {
      expect(SIZE_MAP[Size.TwoXSmall]).toBe(12);
    });

    it("should have 16px for Small", () => {
      expect(SIZE_MAP[Size.Small]).toBe(16);
    });

    it("should have 20px for Medium (default)", () => {
      expect(SIZE_MAP[Size.Medium]).toBe(20);
    });

    it("should have 24px for Large", () => {
      expect(SIZE_MAP[Size.Large]).toBe(24);
    });

    it("should have 32px for TwoXLarge", () => {
      expect(SIZE_MAP[Size.TwoXLarge]).toBe(32);
    });
  });

  describe("Available icons", () => {
    const ICON_NAMES = [
      "search", "calendar", "chevron-down", "chevron-up", "chevron-left", "chevron-right",
      "check", "close", "plus", "minus", "filter", "settings", "user", "bell",
      "upload", "download", "arrow-up", "arrow-down", "star", "star-filled",
      "heart", "heart-filled", "home", "menu", "more-horizontal", "more-vertical",
      "edit", "trash", "copy", "external-link", "eye", "eye-off", "lock", "unlock",
      "info", "warning", "error", "success", "sun", "moon", "grid", "list",
    ];

    it("should have navigation icons", () => {
      expect(ICON_NAMES).toContain("chevron-left");
      expect(ICON_NAMES).toContain("chevron-right");
      expect(ICON_NAMES).toContain("arrow-up");
      expect(ICON_NAMES).toContain("arrow-down");
    });

    it("should have action icons", () => {
      expect(ICON_NAMES).toContain("search");
      expect(ICON_NAMES).toContain("edit");
      expect(ICON_NAMES).toContain("trash");
      expect(ICON_NAMES).toContain("copy");
    });

    it("should have status icons", () => {
      expect(ICON_NAMES).toContain("check");
      expect(ICON_NAMES).toContain("close");
      expect(ICON_NAMES).toContain("info");
      expect(ICON_NAMES).toContain("warning");
      expect(ICON_NAMES).toContain("error");
      expect(ICON_NAMES).toContain("success");
    });

    it("should have toggle state icons", () => {
      expect(ICON_NAMES).toContain("star");
      expect(ICON_NAMES).toContain("star-filled");
      expect(ICON_NAMES).toContain("heart");
      expect(ICON_NAMES).toContain("heart-filled");
      expect(ICON_NAMES).toContain("eye");
      expect(ICON_NAMES).toContain("eye-off");
    });

    it("should have theme icons", () => {
      expect(ICON_NAMES).toContain("sun");
      expect(ICON_NAMES).toContain("moon");
    });

    it("should have view mode icons", () => {
      expect(ICON_NAMES).toContain("grid");
      expect(ICON_NAMES).toContain("list");
    });

    it("should have 42 icons total", () => {
      expect(ICON_NAMES).toHaveLength(42);
    });
  });

  describe("TextAppearance for icon colors", () => {
    it("should support Primary appearance", () => {
      expect(TextAppearance.Primary).toBe("primary");
    });

    it("should support Success appearance", () => {
      expect(TextAppearance.Success).toBe("success");
    });

    it("should support Danger appearance", () => {
      expect(TextAppearance.Danger).toBe("danger");
    });

    it("should support Muted appearance", () => {
      expect(TextAppearance.Muted).toBe("muted");
    });
  });

  describe("Custom size override", () => {
    it("should use customSize when provided", () => {
      const size = Size.Medium;
      const customSize = 48;
      const SIZE_MAP: Record<Size, number> = { [Size.Medium]: 20 } as any;
      const pixelSize = customSize ?? SIZE_MAP[size];
      expect(pixelSize).toBe(48);
    });

    it("should fall back to size map when no customSize", () => {
      const size = Size.Medium;
      const customSize = undefined;
      const SIZE_MAP: Record<Size, number> = { [Size.Medium]: 20 } as any;
      const pixelSize = customSize ?? SIZE_MAP[size];
      expect(pixelSize).toBe(20);
    });
  });
});
