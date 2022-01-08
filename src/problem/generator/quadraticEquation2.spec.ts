import { renderEquation, renderFactorization } from "./quadraticEquation";

it("renders equation from solution", () => {
  expect(renderEquation(1, 2)).toEqual("x^2-3x+2=0");
  expect(renderEquation(3, -4)).toEqual("x^2+x-12=0");
  expect(renderEquation(-3, 5)).toEqual("x^2-2x-15=0");
  expect(renderEquation(5, -4)).toEqual("x^2-x-20=0");
});

it("renders factorization from solution", () => {
  expect(renderFactorization(1, 2)).toEqual("(x-1)(x-2)=0");
  expect(renderFactorization(3, -4)).toEqual("(x-3)(x+4)=0");
  expect(renderFactorization(-3, 5)).toEqual("(x+3)(x-5)=0");
  expect(renderFactorization(5, -4)).toEqual("(x-5)(x+4)=0");
});
