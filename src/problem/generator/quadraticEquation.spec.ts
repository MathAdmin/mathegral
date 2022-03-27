import { equationTree, factorizationTree } from "./quadraticEquation";

it("renders equation from solution", () => {
  expect(equationTree({ s1: 1, s2: 2 }).toString()).toEqual(
    "x ^ 2 - 3 x + 2 == 0"
  );
  expect(equationTree({ s1: 3, s2: -4 }).toString()).toEqual(
    "x ^ 2 + x - 12 == 0"
  );
  expect(equationTree({ s1: -3, s2: 5 }).toString()).toEqual(
    "x ^ 2 - 2 x - 15 == 0"
  );
  expect(equationTree({ s1: 5, s2: -4 }).toString()).toEqual(
    "x ^ 2 - x - 20 == 0"
  );
});

it("renders factorization from solution", () => {
  expect(factorizationTree({ s1: 1, s2: 2 }).toString()).toEqual(
    "(x - 1) (x - 2) == 0"
  );
  expect(factorizationTree({ s1: 3, s2: -4 }).toString()).toEqual(
    "(x - 3) (x + 4) == 0"
  );
  expect(factorizationTree({ s1: -3, s2: 5 }).toString()).toEqual(
    "(x + 3) (x - 5) == 0"
  );
  expect(factorizationTree({ s1: 5, s2: -4 }).toString()).toEqual(
    "(x - 5) (x + 4) == 0"
  );
});
