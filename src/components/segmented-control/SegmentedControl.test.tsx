import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { SegmentedControl } from "./SegmentedControl";
import { Size } from "../../enums";

const defaultOptions = [
  { value: "list" as const, label: "List", icon: "list" as const },
  { value: "grid" as const, label: "Grid", icon: "grid" as const },
];

describe("SegmentedControl", () => {
  it("renders all options", () => {
    const { getByText } = render(
      <SegmentedControl
        options={defaultOptions}
        value="list"
        onChange={() => {}}
      />
    );

    expect(getByText("List")).toBeTruthy();
    expect(getByText("Grid")).toBeTruthy();
  });

  it("calls onChange when a segment is pressed", () => {
    const onChange = jest.fn();
    const { getByText } = render(
      <SegmentedControl
        options={defaultOptions}
        value="list"
        onChange={onChange}
      />
    );

    fireEvent.press(getByText("Grid"));
    expect(onChange).toHaveBeenCalledWith("grid");
  });

  it("does not call onChange when disabled", () => {
    const onChange = jest.fn();
    const { getByText } = render(
      <SegmentedControl
        options={defaultOptions}
        value="list"
        onChange={onChange}
        disabled
      />
    );

    fireEvent.press(getByText("Grid"));
    expect(onChange).not.toHaveBeenCalled();
  });

  it("renders with different sizes", () => {
    const sizes = [Size.Small, Size.Medium, Size.Large];

    sizes.forEach((size) => {
      const { getByText } = render(
        <SegmentedControl
          options={defaultOptions}
          value="list"
          onChange={() => {}}
          size={size}
        />
      );

      expect(getByText("List")).toBeTruthy();
    });
  });

  it("renders without icons", () => {
    const optionsWithoutIcons = [
      { value: "day" as const, label: "Day" },
      { value: "week" as const, label: "Week" },
    ];

    const { getByText } = render(
      <SegmentedControl
        options={optionsWithoutIcons}
        value="day"
        onChange={() => {}}
      />
    );

    expect(getByText("Day")).toBeTruthy();
    expect(getByText("Week")).toBeTruthy();
  });

  it("renders loading state", () => {
    const { queryByText } = render(
      <SegmentedControl
        options={defaultOptions}
        value="list"
        onChange={() => {}}
        loading
      />
    );

    // Labels should not be visible in loading state
    expect(queryByText("List")).toBeNull();
    expect(queryByText("Grid")).toBeNull();
  });

  it("supports three or more options", () => {
    const threeOptions = [
      { value: "a" as const, label: "Option A" },
      { value: "b" as const, label: "Option B" },
      { value: "c" as const, label: "Option C" },
    ];

    const { getByText } = render(
      <SegmentedControl
        options={threeOptions}
        value="b"
        onChange={() => {}}
      />
    );

    expect(getByText("Option A")).toBeTruthy();
    expect(getByText("Option B")).toBeTruthy();
    expect(getByText("Option C")).toBeTruthy();
  });
});
