import React from "react";
import { render, screen } from "@testing-library/react";
import { shallow } from "enzyme";
import App from "./index";
import { testStore, findByTestAttr } from "../../test_utils";
import { Provider } from "react-redux";

const setUp = (initialState = {}) => {
  const store = testStore(initialState);
  const wrapper = shallow(<App store={store} />)
    .childAt(0)
    .dive();
  return wrapper;
};

describe("App component", () => {
  let wrapper = setUp();
  beforeEach(() => {
    wrapper = setUp();
  });

  it("renders without error", () => {
    const appComponent = findByTestAttr(wrapper, "appComponent");
    expect(appComponent.length).toBe(1);
  });
});
