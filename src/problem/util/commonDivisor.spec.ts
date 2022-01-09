import { gcd, multigcd,calculategcd } from "./commonDivisor";

it("Common Divisor", () => {
  expect(gcd(10, 15)).toEqual(5);
  expect(gcd(32,8)).toEqual(8);
  expect(gcd(10,9)).toEqual(1);
  expect(gcd(10,-15)).toEqual(5);
});

it("Calculate Common Divisor for more than 2 Numbers", () => {
  expect(calculategcd([15,10,25])).toEqual(5);
  expect(calculategcd([32,8,4])).toEqual(4);
  expect(calculategcd([10,9,8,7])).toEqual(1);
  expect(calculategcd([10,-15])).toEqual(5);
});
