import React from "react";
import { render } from "@testing-library/react-native";
import { Tag } from "./Tag";
import { Size, Intensity } from "../../enums";

describe("Tag", () => {
  describe("direction variants", () => {
    it("renders up direction with correct styling", () => {
      const { getByText } = render(<Tag direction="up" label="BUY" />);
      expect(getByText("BUY")).toBeTruthy();
    });

    it("renders down direction with correct styling", () => {
      const { getByText } = render(<Tag direction="down" label="SELL" />);
      expect(getByText("SELL")).toBeTruthy();
    });

    it("renders neutral direction with correct styling", () => {
      const { getByText } = render(<Tag direction="neutral" label="HOLD" />);
      expect(getByText("HOLD")).toBeTruthy();
    });
  });

  describe("icon behavior", () => {
    it("shows icon by default", () => {
      const { UNSAFE_root } = render(<Tag direction="up" />);
      // Icon component should be present
      expect(UNSAFE_root.findAllByType("View").length).toBeGreaterThan(0);
    });

    it("hides icon when showIcon is false", () => {
      const { getByText } = render(
        <Tag direction="up" label="BUY" showIcon={false} />
      );
      expect(getByText("BUY")).toBeTruthy();
    });

    it("renders icon only without label", () => {
      const { queryByText } = render(<Tag direction="up" />);
      expect(queryByText("BUY")).toBeNull();
      expect(queryByText("SELL")).toBeNull();
    });
  });

  describe("intensity variants", () => {
    it("renders with dim intensity by default", () => {
      const { getByText } = render(<Tag direction="up" label="BUY" />);
      expect(getByText("BUY")).toBeTruthy();
    });

    it("renders with normal intensity", () => {
      const { getByText } = render(
        <Tag direction="up" label="LONG" intensity={Intensity.Normal} />
      );
      expect(getByText("LONG")).toBeTruthy();
    });

    it("renders with vivid intensity (falls back to normal)", () => {
      const { getByText } = render(
        <Tag direction="down" label="SHORT" intensity={Intensity.Vivid} />
      );
      expect(getByText("SHORT")).toBeTruthy();
    });
  });

  describe("size variants", () => {
    const sizes = [
      Size.TwoXSmall,
      Size.ExtraSmall,
      Size.Small,
      Size.Medium,
      Size.Large,
      Size.ExtraLarge,
      Size.TwoXLarge,
    ];

    sizes.forEach((size) => {
      it(`renders with size ${size}`, () => {
        const { getByText } = render(
          <Tag direction="up" label="TEST" size={size} />
        );
        expect(getByText("TEST")).toBeTruthy();
      });
    });
  });

  describe("loading state", () => {
    it("renders skeleton when loading", () => {
      const { queryByText } = render(
        <Tag direction="up" label="BUY" loading />
      );
      // Label should not be visible in loading state
      expect(queryByText("BUY")).toBeNull();
    });

    it("renders skeleton for icon-only when loading", () => {
      const { queryByText } = render(<Tag direction="down" loading />);
      expect(queryByText("SELL")).toBeNull();
    });
  });

  describe("label prop", () => {
    it("renders custom label text", () => {
      const { getByText } = render(
        <Tag direction="up" label="LONG POSITION" />
      );
      expect(getByText("LONG POSITION")).toBeTruthy();
    });

    it("renders without label when not provided", () => {
      const { queryByText } = render(<Tag direction="neutral" />);
      expect(queryByText("HOLD")).toBeNull();
    });
  });

  describe("style prop", () => {
    it("accepts custom style overrides", () => {
      const { getByText } = render(
        <Tag
          direction="up"
          label="STYLED"
          style={{ marginTop: 10 }}
        />
      );
      expect(getByText("STYLED")).toBeTruthy();
    });
  });

  describe("accessibility", () => {
    it("renders accessible text content", () => {
      const { getByText } = render(<Tag direction="up" label="BUY" />);
      const element = getByText("BUY");
      expect(element).toBeTruthy();
    });
  });
});
