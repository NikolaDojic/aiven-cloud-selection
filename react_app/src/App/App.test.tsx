import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./index";

test("renders header", () => {
  render(<App />);
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
