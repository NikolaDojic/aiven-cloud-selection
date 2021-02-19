import React from "react";
import { render, screen } from "@testing-library/react";
import Header from "./index";

test("renders header", () => {
  render(<Header />);
  const logoContainer = screen.getByTestId("logoContainer");
  expect(logoContainer).toBeInTheDocument();
});
