import { calculateParams } from "./rightTriangle";

it("calculates params", () => {
  expect(calculateParams([3, 4, 5])).toEqual({
    a: 15,
    b: 20,
    c: 25,
    p: 9,
    q: 16,
    h: 12,
  });
});
