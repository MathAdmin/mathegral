import { geocalculateAn, geocalculateSn } from "./geometricSeries";

it("calculates an", () => {
  expect(geocalculateAn(1, 4, 2)).toEqual(8);
  expect(geocalculateAn(2, 9, 2)).toEqual(1024);
});

it("calculates Sn", () => {
  expect(geocalculateSn(1, 4, 2)).toEqual(15);
  expect(geocalculateSn(2, 9, 2)).toEqual(2046);
});
