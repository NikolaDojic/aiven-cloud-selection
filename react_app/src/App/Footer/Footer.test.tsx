import React from "react";
import { shallow } from "enzyme";
import { findByTestId } from "../../../test_utils";
import Footer from "./index";

test("renders contribution in footer", () => {
  let component = shallow(<Footer />);
  const contribEl = findByTestId(component, "iconContrib");
  expect(contribEl.length).toBe(1);
});
