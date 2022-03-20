import { exclude } from "./predicates";
import { randomInt } from "./randomizer";

it("generates random int", () => {
  for (var i = 0; i < 1000; ++i) {
    const value = randomInt(0, 10);
    expect(value).toBeGreaterThanOrEqual(0);
    expect(value).toBeLessThan(10);
  }
});

it("generates random int with excludes", () => {
  for (var i = 0; i < 1000; ++i) {
    const value = randomInt(0, 10, exclude(1, 2, 3));
    expect(value).toBeGreaterThanOrEqual(0);
    expect(value).toBeLessThan(10);
    expect(value).not.toEqual(1);
    expect(value).not.toEqual(2);
    expect(value).not.toEqual(3);
  }
});
