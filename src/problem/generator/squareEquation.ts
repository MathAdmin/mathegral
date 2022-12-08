import { ProblemGeneratorNg } from "../ProblemGeneratorSpi";
import { calculategcd } from "../util/commonDivisor";
import { randomInt } from "../util/randomizer";
import weighted from "weighted";
import { exclude } from "../util/predicates";
import { fracTex } from "../util/texGenerator";
import { calculateBinome } from "../util/commonDivisor";
import { Binome } from "../util/commonDivisor";
import { Fraction } from "../util/commonDivisor";
import { rootDivisor } from "../util/commonDivisor";

type SquareTerm = {
  a: number;
  b: number;
  c: number;
  d: number;
};

type Problem = {
  terms: SquareTerm[];
  solutions: Fraction[] | undefined;
  pseudos: Fraction[] | undefined;
  rightTerm: Binome;
};

////////////////////////////////////////////////////
//   LEVEL 1 (10%)
//
//   a1 sqrt(c1 x + d1) = ra x + rb
//
///////////////////////////////////////////////////

const level1 = (): Problem => {
  const number1 = randomInt(1, 15);
  const square1 = number1 * number1;
  const a1 = randomInt(-1, 2, exclude(0));
  const rn = a1 * number1;
  const sol1 = randomInt(-9, 10, exclude(0));

  var binome = calculateBinome(square1, sol1, 0);
  const c1 = binome.a;
  const d1 = binome.b;

  binome = calculateBinome(rn, sol1, 0);
  const ra = binome.a;
  const rb = binome.b;

  // other Solution
  const sol2 = ra === 0 ? undefined : (rb * rb - d1) / (sol1 * ra * ra);

  return {
    terms: [{ a: a1, b: 0, c: c1, d: d1 }],
    solutions:
      sol2 === undefined
        ? [{ a: sol1, b: 1 }]
        : a1 * Math.sqrt(c1 * sol2 + d1) === ra * sol2 + rb
        ? [
            { a: sol1, b: 1 },
            { a: rb * rb - d1, b: sol1 * ra * ra },
          ]
        : [{ a: sol1, b: 1 }],
    pseudos:
      sol2 === undefined
        ? undefined
        : a1 * Math.sqrt(c1 * sol2 + d1) === ra * sol2 + rb
        ? undefined
        : [{ a: rb * rb - d1, b: sol1 * ra * ra }],
    rightTerm: { a: ra, b: rb },
  };
};

////////////////////////////////////////
//   LEVEL 2 (30%)
//
//   sqrt(c1 x + d1) +- sqrt(c2 x + d2) = rb
//
////////////////////////////////////////

const level2 = (): Problem => {
  const number1 = randomInt(1, 12);
  const square1 = number1 * number1;
  const number2 = randomInt(1, 12, exclude(number1));
  const square2 = number2 * number2;
  const a1 = 1;
  const a2 = randomInt(-1, 2, exclude(0));
  const rb = a1 * number1 + a2 * number2;
  const sol1 = randomInt(-9, 10, exclude(0));

  var binome = calculateBinome(square1, sol1, 0);
  const c1 = binome.a;
  const d1 = binome.b;

  binome = calculateBinome(square2, sol1, 0);
  const c2 = binome.a;
  const d2 = binome.b;

  // other Solution
  const sol2 =
    c1 === c2
      ? undefined
      : ((d1 - d2 - rb * rb) * (d1 - d2 - rb * rb) - 4 * rb * rb * d2) /
        (sol1 * (c1 - c2) * (c1 - c2));

  return {
    terms: [
      { a: a1, b: 0, c: c1, d: d1 },
      { a: a2, b: 0, c: c2, d: d2 },
    ],
    solutions:
      sol2 === undefined
        ? [{ a: sol1, b: 1 }]
        : Math.sqrt(c1 * sol2 + d1) + a2 * Math.sqrt(c2 * sol2 + d2) === rb
        ? [
            { a: sol1, b: 1 },
            {
              a: (d1 - d2 - rb * rb) * (d1 - d2 - rb * rb) - 4 * rb * rb * d2,
              b: sol1 * (c1 - c2) * (c1 - c2),
            },
          ]
        : [{ a: sol1, b: 1 }],
    pseudos:
      sol2 === undefined
        ? undefined
        : Math.sqrt(c1 * sol2 + d1) + a2 * Math.sqrt(c2 * sol2 + d2) === rb
        ? undefined
        : [
            {
              a: (d1 - d2 - rb * rb) * (d1 - d2 - rb * rb) - 4 * rb * rb * d2,
              b: sol1 * (c1 - c2) * (c1 - c2),
            },
          ],
    rightTerm: { a: 0, b: rb },
  };
};
////////////////////////////////////////
//   LEVEL 3 (30%)
//
//    a1 * sqrt(c1 x + d1) - a1 sqrt(c2 x + d2) = ra x
//
////////////////////////////////////////

const level3 = (): Problem => {
  const number1 = 2 * randomInt(0, 5) + 1;
  const square1 = number1 * number1;
  const number2 = 2 * randomInt(0, 5, exclude((number1 - 1) / 2)) + 1;
  const square2 = number2 * number2;

  //d1 = d2 = 1[4]
  const d1 =
    1 + 4 * randomInt(-6, 7, exclude((square1 - 1) / 4, (square2 - 1) / 4));
  const d2 = d1;

  // sol1 in [-4 , -2, -1, 1, 2, 4]
  const sol1 = randomInt(-4, 5, exclude(-3, 0, 3));

  const c1 = (square1 - d1) / sol1;
  const c2 = (square2 - d2) / sol1;

  const factor = calculategcd([number1 - number2, sol1]);
  const ra = (number1 - number2) / factor;
  const a1 = sol1 / factor;
  const a2 = -1 * a1;

  // other Solution
  const sol2 =
    number1 === number2
      ? undefined
      : (Math.pow(c1 - c2, 2) * Math.pow(a1, 4) -
          4 * d1 * Math.pow(ra * a1, 2)) /
        (sol1 * Math.pow(ra, 4));

  return {
    terms: [
      { a: a1, b: 0, c: c1, d: d1 },
      { a: a2, b: 0, c: c2, d: d2 },
    ],
    solutions:
      sol2 === undefined
        ? d1 > 0
          ? [
              { a: 0, b: 1 },
              { a: sol1, b: 1 },
            ]
          : [{ a: sol1, b: 1 }]
        : a1 * Math.sqrt(c1 * sol2 + d1) + a2 * Math.sqrt(c2 * sol2 + d2) ===
          ra * sol2
        ? d1 > 0
          ? [
              { a: 0, b: 1 },
              { a: sol1, b: 1 },
              {
                a:
                  Math.pow(c1 - c2, 2) * Math.pow(a1, 4) -
                  4 * d1 * Math.pow(ra * a1, 2),
                b: sol1 * Math.pow(ra, 4),
              },
            ]
          : [
              { a: sol1, b: 1 },
              {
                a:
                  Math.pow(c1 - c2, 2) * Math.pow(a1, 4) -
                  4 * d1 * Math.pow(ra * a1, 2),
                b: sol1 * Math.pow(ra, 4),
              },
            ]
        : d1 > 0
        ? [
            { a: 0, b: 1 },
            { a: sol1, b: 1 },
          ]
        : [{ a: sol1, b: 1 }],
    pseudos:
      sol2 === undefined
        ? undefined
        : a1 * Math.sqrt(c1 * sol2 + d1) + a2 * Math.sqrt(c2 * sol2 + d2) ===
          ra * sol2
        ? d1 > 0
          ? undefined
          : [{ a: 0, b: 1 }]
        : d1 > 0
        ? [
            {
              a:
                Math.pow(c1 - c2, 2) * Math.pow(a1, 4) -
                4 * d1 * Math.pow(ra * a1, 2),
              b: sol1 * Math.pow(ra, 4),
            },
          ]
        : [
            { a: 0, b: 1 },
            {
              a:
                Math.pow(c1 - c2, 2) * Math.pow(a1, 4) -
                4 * d1 * Math.pow(ra * a1, 2),
              b: sol1 * Math.pow(ra, 4),
            },
          ],
    rightTerm: { a: ra, b: 0 },
  };
};

/////////////////////////////////////////////////////////////////////////
//   LEVEL 4 (20%)
//
//     sqrt(c1 x + d1) - sqrt(c2 x + d2) + a3 sqrt(c3 x + d3) = 0
//
/////////////////////////////////////////////////////////////////////////

const level4 = (): Problem => {
  const number1 = randomInt(1, 5);
  const square1 = number1 * number1;
  const number2 = randomInt(1, 5, exclude(number1));
  const square2 = number2 * number2;
  //const a1 = randomInt(-2, 3,exclude(0));
  const a1 = 1;
  //const a2 = randomInt(-2, 3,exclude(0));
  const a2 = -1;
  const sol1 = randomInt(-6, 7, exclude(0));

  var binome = calculateBinome(square1, sol1, 0);
  const c1 = binome.a;
  const d1 = binome.b;

  binome = calculateBinome(square2, sol1, 0);
  const c2 = binome.a;
  const d2 = binome.b;

  binome = rootDivisor(Math.abs(a1 * number1 + a2 * number2));
  const a3 = a1 * number1 + a2 * number2 > 0 ? -1 * binome.a : binome.a;
  const number3 = binome.b;
  const square3 = number3 * number3;
  binome = calculateBinome(square3, sol1, 0);
  const c3 = binome.a;
  const d3 = binome.b;

  // other Solution
  const above =
    Math.pow(a1 * a1 * d1 + a2 * a2 * d2 - a3 * a3 * d3, 2) -
    4 * a1 * a1 * a2 * a2 * d1 * d2;

  const below =
    Math.pow(a1 * a1 * c1 + a2 * a2 * c2 - a3 * a3 * c3, 2) -
    4 * a1 * a1 * a2 * a2 * c1 * c2;

  const sol2 = below === 0 ? undefined : above / (sol1 * below);

  return {
    terms: [
      { a: a1, b: 0, c: c1, d: d1 },
      { a: a2, b: 0, c: c2, d: d2 },
      { a: a3, b: 0, c: c3, d: d3 },
    ],
    solutions:
      sol2 === undefined
        ? [{ a: sol1, b: 1 }]
        : a1 * Math.sqrt(c1 * sol2 + d1) +
            a2 * Math.sqrt(c2 * sol2 + d2) +
            a3 * Math.sqrt(c3 * sol2 + d3) ===
          0
        ? [
            { a: sol1, b: 1 },
            { a: above, b: sol1 * below },
          ]
        : [{ a: sol1, b: 1 }],
    pseudos:
      sol2 === undefined
        ? undefined
        : a1 * Math.sqrt(c1 * sol2 + d1) +
            a2 * Math.sqrt(c2 * sol2 + d2) +
            a3 * Math.sqrt(c3 * sol2 + d3) ===
          0
        ? undefined
        : [{ a: above, b: sol1 * below }],
    rightTerm: { a: 0, b: 0 },
  };
};

/////////////////////////////////////////////////////////////////////////
//   LEVEL 5 (5%)
//
//     sqrt(c1 x + d1) + sqrt(c2 x + d2) - sqrt(c1 x + d3)  - sqrt(c2 x + d4) = 0
//
/////////////////////////////////////////////////////////////////////////

const level5 = (): Problem => {
  const a1 = 1;
  const a2 = 1;
  const a3 = -1;
  const a4 = -1;
  const c1 = randomInt(-9, 10, exclude(0));
  const c2 = randomInt(-9, 10, exclude(0, c1));
  const d1 = randomInt(-9, 10, exclude(0));
  const d2 = randomInt(-9, 10, exclude(0, d1));
  const k = randomInt(-9, 10, exclude(0, d2 - d1));
  const c3 = c1;
  const c4 = c2;
  const d3 = d1 + k;
  const d4 = d2 - k;

  const above = d2 - d1 - k;
  const below = c1 - c2;
  const sol = above / below;
  const number1 = c1 * sol + d1;
  const number2 = c2 * sol + d2;
  const number3 = c3 * sol + d3;
  const number4 = c4 * sol + d4;

  const sol1 =
    Math.min(number1, number2, number3, number4) > 0 ? sol : undefined;

  return {
    terms: [
      { a: a1, b: 0, c: c1, d: d1 },
      { a: a2, b: 0, c: c2, d: d2 },
      { a: a3, b: 0, c: c3, d: d3 },
      { a: a4, b: 0, c: c4, d: d4 },
    ],
    solutions: sol1 === sol ? [{ a: above, b: below }] : undefined,
    pseudos: sol1 === undefined ? [{ a: above, b: below }] : undefined,
    rightTerm: { a: 0, b: 0 },
  };
};

/////////////////////////////////////////////////////////////////////////
//   LEVEL 6 (5%)
//
//     sqrt(c1 x + d1) + sqrt(c2 x + d2) - sqrt(c3 x + d1)  - sqrt(c4 x + d2) = 0
//
/////////////////////////////////////////////////////////////////////////

const level6 = (): Problem => {
  const a1 = 1;
  const a2 = 1;
  const a3 = -1;
  const a4 = -1;
  const c1 = randomInt(-9, 10, exclude(0));
  const c2 = randomInt(-9, 10, exclude(0, c1));
  const d1 = randomInt(-9, 10, exclude(0));
  const d2 = randomInt(-9, 10, exclude(0, d1));
  const k = randomInt(-9, 10, exclude(0, c2 - c1, -c1, c2));
  const d3 = d1;
  const d4 = d2;
  const c3 = c1 + k;
  const c4 = c2 - k;

  const above = d2 - d1;
  const below = k + c1 - c2;
  const sol = above / below;
  const number1 = c1 * sol + d1;
  const number2 = c2 * sol + d2;
  const number3 = c3 * sol + d3;
  const number4 = c4 * sol + d4;

  const sol1 = Math.min(d1, d2) > 0 ? 0 : undefined;

  const sol2 =
    Math.min(number1, number2, number3, number4) > 0 ? sol : undefined;

  return {
    terms: [
      { a: a1, b: 0, c: c1, d: d1 },
      { a: a2, b: 0, c: c2, d: d2 },
      { a: a3, b: 0, c: c3, d: d3 },
      { a: a4, b: 0, c: c4, d: d4 },
    ],
    solutions:
      sol1 === undefined
        ? sol2 === undefined
          ? undefined
          : [{ a: above, b: below }]
        : sol2 === undefined
        ? [{ a: 0, b: 1 }]
        : [
            { a: 0, b: 1 },
            { a: above, b: below },
          ],
    pseudos:
      sol1 === undefined
        ? sol2 === undefined
          ? [
              { a: 0, b: 1 },
              { a: above, b: below },
            ]
          : [{ a: 0, b: 1 }]
        : sol2 === undefined
        ? [{ a: above, b: below }]
        : undefined,
    rightTerm: { a: 0, b: 0 },
  };
};

export const generateProblem = (level: number): Problem => {
  switch (level) {
    case 1:
      return level1();

    case 2:
      return level2();

    case 3:
      return level3();

    case 4:
      return level4();

    case 5:
      return level5();

    case 6:
      return level6();

    default:
      return level1();
  }
};

export const formatEquation = (problem: Problem) => {
  const textEquation =
    problem.terms
      .map((term) => `${term.a}\\sqrt{${term.b}x^2+${term.c}x+${term.d}}`)
      .join("+") + `= ${problem.rightTerm.a}x+${problem.rightTerm.b}`;

  return textEquation
    .replaceAll("+-", "-")
    .replaceAll("{0x^2+", "{")
    .replaceAll("{0x^2-", "{-")
    .replaceAll("-1x", "-x")
    .replaceAll("+1x", "+x")
    .replaceAll("{1x", "{x")
    .replaceAll("{-1x", "{-x")
    .replaceAll("{0x+", "{")
    .replaceAll("{0x-", "{-")
    .replaceAll("+0x", "")
    .replaceAll("-0x", "")
    .replaceAll("+0}", "}")
    .replaceAll("1\\", "\\")
    .replaceAll("= 0x+", "= ")
    .replaceAll("= 0x", "= ")
    .replaceAll("= 1x", "= x")
    .replaceAll("= -1x", "= -x")
    .replaceAll("+0", "");
};

export const formatSolution = (problem: Problem) => {
  const pseudos = problem.pseudos
    ? `\\{` +
      [
        ...Array.from(
          new Set(problem.pseudos.map((pseudo) => fracTex(pseudo.a, pseudo.b)))
        ),
      ].join(";") +
      `\\}`
    : `\\{\\}`;

  const sols = problem.solutions
    ? `\\{` +
      [
        ...Array.from(
          new Set(problem.solutions.map((sol) => fracTex(sol.a, sol.b)))
        ),
      ].join(";") +
      `\\}`
    : `\\{\\}`;

  return `
        \\begin{aligned}
            \\mathbb{L}&=${sols}
            \\\\
            \\mathbb{S}&=${pseudos}
        \\end{aligned}
        `;
};

const squareEquation: ProblemGeneratorNg<Problem> = {
  key: "square-equation",
  generate: () => {
    const level = weighted([1, 2, 3, 4, 5, 6], [10, 30, 30, 20, 5, 5]);
    return generateProblem(level);
  },
  format: (problem) => {
    return {
      description: formatEquation(problem),
      solution: formatSolution(problem),
    };
  },
};

export default squareEquation;
