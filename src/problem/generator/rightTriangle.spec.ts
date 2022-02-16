import { calculateParams } from "./rightTriangle";

it("calculates params", () => {
  expect(calculateParams([3, 4, 5], 1)).toEqual({
    a: 15,
    b: 20,
    c: 25,
    p: 9,
    q: 16,
    h: 12,
  });
  expect(calculateParams([5, 12, 13], 2)).toEqual({
    a: 130,
    b: 312,
    c: 338,
    p: 50,
    q: 288,
    h: 120,
  });

});
