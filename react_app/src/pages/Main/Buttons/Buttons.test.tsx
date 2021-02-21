import React from "react";
import { shallow } from "enzyme";
import Buttons from "./index";
import { findByTestId } from "../../../../test_utils";

const setUp = () => {
  return shallow(<Buttons />);
};

describe("Buttons Component", () => {
  let component = setUp();

  it("Should render FindClosestButton connected component", () => {
    const findClosestButton = component.find("Connect(FindClosestButton)");
    expect(findClosestButton.length).toBe(1);
  });
});
