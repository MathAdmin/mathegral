import { parse } from "./expressionParser";

it("replaces +- with -", () => {
  expect(parse("1+-2").toString()).toEqual("1 - 2");
  expect(parse("1+-x").toString()).toEqual("1 - x");
  expect(parse("x+-1").toString()).toEqual("x - 1");
  expect(parse("1+-x^2").toString()).toEqual("1 - x ^ 2");
  expect(parse("1+-2x").toString()).toEqual("1 - 2 x");
  expect(parse("1+-2/x").toString()).toEqual("1 - 2 / x");
});

it("replaces -- with +", () => {
  expect(parse("1--2").toString()).toEqual("1 + 2");
  expect(parse("1--x").toString()).toEqual("1 + x");
  expect(parse("x--1").toString()).toEqual("x + 1");
  expect(parse("1--x^2").toString()).toEqual("1 + x ^ 2");
  expect(parse("1--2x").toString()).toEqual("1 + 2 x");
  expect(parse("1--2/x").toString()).toEqual("1 + 2 / x");
});

it("eliminates factor 1", () => {
  expect(parse("1 x").toString()).toEqual("x");
  expect(parse("1*x").toString()).toEqual("x");
  expect(parse("x*1").toString()).toEqual("x");
  expect(parse("1 x^2").toString()).toEqual("x ^ 2");
  expect(parse("1*x^2").toString()).toEqual("x ^ 2");
  expect(parse("x^2*1").toString()).toEqual("x ^ 2");
});

it("eliminates 0", () => {
  expect(parse("3+0 x").toString()).toEqual("3");
  expect(parse("3-0*x").toString()).toEqual("3");
  expect(parse("3+x*0").toString()).toEqual("3");
  expect(parse("3-0 x^2").toString()).toEqual("3");
  expect(parse("3+0*x^2").toString()).toEqual("3");
  expect(parse("3-x^2*0").toString()).toEqual("3");

  expect(parse("3+0/x").toString()).toEqual("3");
  expect(parse("3-0/x^2").toString()).toEqual("3");
});
