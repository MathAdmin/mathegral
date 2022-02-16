import { calculateAn, calculateSn } from "./geometricSeries";

it("calculates an", () => {
  expect(calculateAn(1, 4, 2)).toEqual(8);
  expect(calculateAn(2, 10, 2)).toEqual(1024);
});

it("calculates Sn", () => {
  expect(calculateSn(1, 4, 2)).toEqual(15);
  expect(calculateSn(2, 10, 2)).toEqual(2046);
});
