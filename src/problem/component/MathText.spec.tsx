import { render } from "@testing-library/react";
import MathText from "./MathText";

it("renders markup with single inline math expression", () => {
  const { container } = render(<MathText markup="Solve for [[x]]." />);
  expect(container.getElementsByClassName("katex").length).toEqual(1);
});

it("renders markup with multiple inline math expressions", () => {
  const { container } = render(<MathText markup="Solve for [[x]] and [[y]]." />);
  expect(container.getElementsByClassName("katex").length).toEqual(2);
});
