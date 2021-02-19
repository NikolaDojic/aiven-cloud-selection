import React from "react";
import { render, screen } from "@testing-library/react";
import Footer from "./index";

test("renders header", () => {
  render(<Footer />);
  const contribEl = screen.getByTestId("iconContrib");
  expect(contribEl).toBeInTheDocument();
});
