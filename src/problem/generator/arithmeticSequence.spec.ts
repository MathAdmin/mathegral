import { calculateAn, calculateSn } from "./arithmeticSequence";

it("calculates an", () => {
  expect(calculateAn(1, 4, 5)).toEqual(16);
  expect(calculateAn(9, 8, 3)).toEqual(30);
});

it("calculates Sn", () => {
  expect(calculateSn(1, 4, 16)).toEqual(34);
  expect(calculateSn(9, 8, 30)).toEqual(156);
});
