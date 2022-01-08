import { gcd } from "./commonDivisor";

it("Common Divisor", () => {
  expect(gcd(10, 15)).toEqual(5);
  expect(gcd(32,8)).toEqual(8);
  expect(gcd(10,9)).toEqual(1);
  expect(gcd(10,-15)).toEqual(5);
});
