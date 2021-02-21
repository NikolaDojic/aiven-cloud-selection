import App from "./index";
import { shallow } from "enzyme";
import React from "react";
import { findByTestId } from "../../../test_utils";

const setUp = (initialState = {}) => {
  const wrapper = shallow(<App />);
  return wrapper;
};

describe("Main Component", () => {
  let wrapper = setUp();

  it("Should connected Platforms components", () => {
    const component = wrapper.find("Connect(PlatformList)");
    expect(component.length).toBe(1);
  });
  it("Should connected Clouds components", () => {
    const component = wrapper.find("Connect(CloudList)");
    expect(component.length).toBe(1);
  });
  it("Should connected Regions components", () => {
    const component = wrapper.find("Connect(RegionList)");
    expect(component.length).toBe(1);
  });
  it("Should connected Buttons components", () => {
    const component = wrapper.find("Buttons");
    expect(component.length).toBe(1);
  });
});
