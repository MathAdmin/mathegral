import { ProblemGeneratorNg } from "../ProblemGeneratorSpi";
import { exclude } from "../util/predicates";
import { randomInt, randomElement } from "../util/randomizer";
import { fracTex } from "../util/texGenerator";

// 25 verschiedene Varianten
const VARIANT = [
  ["abc", "SINGLE"],
  ["abm", "SINGLE"],
  ["abu", "INFINITY"],
  ["abv", "SINGLE"],
  ["acm", "SINGLE"],
  ["acu", "SINGLE"],
  ["acv", "DOUBLE"],
  ["amn", "SINGLE"],
  ["amu", "SINGLE"],
  ["amv", "DOUBLE"],
  ["auv", "SINGLE"],
  ["bcm", "SINGLE"],
  ["bcu", "SINGLE"],
  ["bcv", "SINGLE"],
  ["bmn", "SINGLE"],
  ["bmu", "SINGLE"],
  ["bmv", "DOUBLE"],
  ["buv", "SINGLE"],
  ["cmn", "SINGLE"],
  ["cmu", "SINGLE"],
  ["cmv", "DOUBLE"],
  ["cuv", "SINGLE"],
  ["mnu", "INFINITY"],
  ["mnv", "SINGLE"],
  ["muv", "SINGLE"],
];

type Problem = {
  a: number;
  b: number;
  c: number;
  m: number;
  n: number;
  u: number;
  v: number;
  given: string;
  sol: string;
};

export const formatSolution = (
  problem: Problem,
  translate: (key: string) => string
): string => {
  const a = problem.a;
  const b = problem.b;
  const c = problem.c;
  const m = problem.m;
  const n = problem.n;
  const u = problem.u;
  const v = problem.v;
  const given = problem.given;

  switch (given) {
    case "acv":
      return `\\begin{aligned}
      \\text{a) } a=${a} \\text{ , } b=${b} \\text{ , } c=${c} \\text{ , }
      \\\\
      m=${m} \\text{ , } n=${n} \\text{ , } u=${u} \\text{ , } v=${v}
      \\\\
      \\text{b) } a=${a} \\text{ , } b=${-1 * b} \\text{ , } c=${c} \\text{ , }
      \\\\
      m=${-1 * n} \\text{ , } n=${-1 * m} \\text{ , } u=${
        -1 * u
      } \\text{ , } v=${v}
      \\end{aligned}`;

    case "amv":
      return `\\begin{aligned}
      \\text{a) } a=${a} \\text{ , } b=${b} \\text{ , } c=${c} \\text{ , }
    \\\\
    m=${m} \\text{ , } n=${n} \\text{ , } u=${u} \\text{ , } v=${v}
    \\\\
    \\text{b) } a=${a} \\text{ , } b=${2 * a * (u - 2 * m)} \\text{ , } c=${
        a * m * (3 * m - 2 * u)
      } \\text{ , }
    \\\\
    m=${m} \\text{ , } n=${3 * m - 2 * u} \\text{ , } u=${
        2 * m - u
      } \\text{ , } v=${v}
    \\end{aligned}`;

    case "bmv":
      return `\\begin{aligned}
      \\text{a) } a=${a} \\text{ , } b=${b} \\text{ , } c=${c} \\text{ , }
  \\\\
  m=${m} \\text{ , } n=${n} \\text{ , } u=${u} \\text{ , } v=${v}
  \\\\
  \\text{b) } a=${fracTex(c - v, m * m)} \\text{ , } b=${b} \\text{ , } c=${
        v - c - b * m
      } \\text{ , }
  \\\\
  m=${m} \\text{ , } n=${fracTex(b * m * m - m * (v - c), v - c)} 
      \\text{ , } u=${fracTex(b * m * m, 2 * (v - c))} \\text{ , } v=${v}
  \\end{aligned}`;

    case "cmv":
      return `\\begin{aligned}
      \\text{a) } a=${a} \\text{ , } b=${b} \\text{ , } c=${c} \\text{ , }
      \\\\
      m=${m} \\text{ , } n=${n} \\text{ , } u=${u} \\text{ , } v=${v}
      \\\\
      \\text{b) } a=${fracTex(2 * c - 4 * v - a * m * m, m * m)} \\text{ , }
      b=${fracTex(4 * (v - c) - b * m, m)} \\text{ , } c=${c} \\text{ , }
      \\\\
      m=${m} \\text{ , } n=${fracTex(a * m * m * n, 2 * c - 4 * v - a * m * m)}
      \\text{ , } u=${fracTex(
        a * m * m * n + m * (2 * c - 4 * v - a * m * m),
        2 * (2 * c - 4 * v - a * m * m)
      )}
      \\text{ , } v=${v}
  \\end{aligned}`;

    case "abu":
      return `\\text{${translate(
        `generator.quadratic-function.problem.${problem.sol}`
      )}}`;

    case "mnu":
      return `\\text{${translate(
        `generator.quadratic-function.problem.${problem.sol}`
      )}}`;

    default:
      return `\\begin{aligned}
          a=${a} \\text{ , } b=${b} \\text{ , } c=${c} \\text{ , }
          \\\\
          m=${m} \\text{ , } n=${n} \\text{ , } u=${u} \\text{ , } v=${v}
          \\end{aligned}`;
  }
};

const quadraticFunction: ProblemGeneratorNg<Problem> = {
  key: "quadratic-function",
  image: "parabola.svg",
  generate: () => {
    var a = randomInt(-9, 10, exclude(0));
    var m = randomInt(-9, 5, exclude(0));
    var u = randomInt(m + 1, 8, exclude(0, m / 2));
    var n = 2 * u - m;
    var b = -a * (m + n);
    var c = a * m * n;
    var v = (4 * a * c - b * b) / (4 * a);

    var variant = randomElement(VARIANT);
    var given = variant[0];
    var sol = variant[1];

    return { a, b, c, m, n, u, v, given, sol };
  },
  format: (problem, translate) => {
    const { given } = problem;
    return {
      description: `${given[0]}=${eval(given[0])} \\text{ , } ${
        given[1]
      }=${eval(given[1])} \\text{ , } ${given[2]}=${eval(given[2])}`,
      solution: formatSolution(problem, translate),
    };
  },
};

export default quadraticFunction;
