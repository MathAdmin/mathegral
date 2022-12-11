import { equationTree, factorizationTree } from "./quadraticEquation2";

it("renders equation & factorization", () => {
  const params = { a: 9, b: 1, c: 4, d: 3, factor: 2 };
  expect(equationTree(params).toString()).toEqual("72 x ^ 2 - 62 x + 6 == 0");
  expect(factorizationTree(params).toString()).toEqual(
    "2 (9 x - 1) (4 x - 3) == 0"
  );
});

it("renders equation & factorization", () => {
  const params = { a: 1, b: 3, c: 2, d: -1, factor: 3 };
  expect(equationTree(params).toString()).toEqual("6 x ^ 2 - 15 x - 9 == 0");
  expect(factorizationTree(params).toString()).toEqual(
    "3 (x - 3) (2 x + 1) == 0"
  );
});

it("renders equation & factorization", () => {
  const params = { a: 8, b: 1, c: 5, d: -9, factor: 1 };
  expect(equationTree(params).toString()).toEqual("40 x ^ 2 + 67 x - 9 == 0");
  expect(factorizationTree(params).toString()).toEqual(
    "(8 x - 1) (5 x + 9) == 0"
  );
});
