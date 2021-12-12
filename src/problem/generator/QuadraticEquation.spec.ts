import { generateEquation } from "./QuadraticEquation";

it("generates from solution", () => {
  expect(generateEquation(1, 2)).toEqual("x^2-3x+2=0");
  expect(generateEquation(3, -4)).toEqual("x^2+1x-12=0");
  expect(generateEquation(-3, 5)).toEqual("x^2-2x-15=0");
});
