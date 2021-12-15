import { generateEquation, generateFactorization } from "./quadraticEquation";

it("generates quadratic equation from solution", () => {
  expect(generateEquation(1, 2)).toEqual("x^2-3x+2=0");
  expect(generateEquation(3, -4)).toEqual("x^2+x-12=0");
  expect(generateEquation(-3, 5)).toEqual("x^2-2x-15=0");
  expect(generateEquation(5, -4)).toEqual("x^2-x-20=0");
});

it("generates factorization from solution", () => {
  expect(generateFactorization(1, 2)).toEqual("(x-1)(x-2)=0");
  expect(generateFactorization(3, -4)).toEqual("(x-3)(x+4)=0");
  expect(generateFactorization(-3, 5)).toEqual("(x+3)(x-5)=0");
  expect(generateFactorization(5, -4)).toEqual("(x-5)(x+4)=0");
});
