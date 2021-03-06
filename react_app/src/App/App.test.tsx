import App from "./index";
import { shallow } from "enzyme";
import React from "react";
import { findByTestAttr } from "../../test_utils";

const setUp = (initialState = {}) => {
  const wrapper = shallow(<App />);
  return wrapper;
};

describe("App Component", () => {
  let wrapper = setUp();

  it("Should render without errors", () => {
    const component = findByTestAttr(wrapper, "appComponent");
    expect(component.length).toBe(1);
  });

  it("Should render Header", () => {
    const component = wrapper.find("Header");
    expect(component.length).toBe(1);
  });

  it("Should render Footer", () => {
    const component = wrapper.find("Footer");
    expect(component.length).toBe(1);
  });

  it("Should render main", () => {
    const component = wrapper.find("main");
    expect(component.length).toBe(1);
  });
});
