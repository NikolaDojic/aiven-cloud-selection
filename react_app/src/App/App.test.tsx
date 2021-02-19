import React from "react";
import { render, screen } from "@testing-library/react";
import { shallow } from "enzyme";
import App from "./index";
import { testStore } from "../../test_utils";

const setUp = (initialState = {}) => {
  const store = testStore(initialState);
  const wrapper = shallow(
    <Provider store={store}>
      <App store={store} />
    </Provider>
  )
    .childAt(0)
    .dive();
  console.log(wrapper);
  return wrapper;
};

describe("App component", () => {
  let wrapper;
  beforeEach(() => {
    const initialState = {
      posts: [
        {
          title: "Example title 1",
          body: "Some text"
        },
        {
          title: "Example title 2",
          body: "Some text"
        },
        {
          title: "Example title 3",
          body: "Some text"
        }
      ]
    };
    wrapper = setUp(initialState);
  });

  test("renders header", () => {
    let wrapper = setUp();
    render(wrapper);
    const headerElement = screen.getByTestId("header");
    expect(headerElement).toBeInTheDocument();
  });

  test("renders footer", () => {
    render(<App />);
    const footerElement = screen.getByTestId("footer");
    expect(footerElement).toBeInTheDocument();
  });

  test("renders footer", () => {
    render(<App />);
    const mainElement = screen.getByTestId("appMain");
    expect(mainElement).toBeInTheDocument();
  });
});
