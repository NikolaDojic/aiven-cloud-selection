import React from "react";
import { shallow } from "enzyme";
import Header from "./index";
import { findByTestId } from "../../../test_utils";

const setUp = () => {
  return shallow(<Header />);
};

describe("Header Component", () => {
  let component = setUp();

  it("Should render logo container inside header", () => {
    const logoContainer = findByTestId(component, "logoContainer");
    expect(logoContainer.length).toBe(1);
  });

  it("Should render logo img without errors", () => {
    const logo = component.find("[data-testid='logoContainer'] > img");
    expect(logo.length).toBe(1);
  });
});
