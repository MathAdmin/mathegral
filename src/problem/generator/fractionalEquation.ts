import { ProblemGenerator } from "../ProblemGeneratorSpi";
import { calculategcd } from "../util/commonDivisor";
import { randomInt } from "../util/randomizer";
import { fracTex } from "../util/texGenerator";

type FractionalTerm = {
  a: number;
  b: number;
  c: number;
  d: number;
};

type Fraction = {
  a: number;
  b: number;
};

type Params = {
  terms: FractionalTerm[];
  solutions: Fraction[] | undefined;
  rightnumber: number;
};

const level1 = (): Params => {
  const c1 = randomInt(-6, 7, (value) => value !== 0);
  const d1 = randomInt(-6, 7, (value) => value !== 0);

  const c2 = randomInt(-6, 7, (value) => value !== 0);
  const d2 = randomInt(-6, 7, (value) => ![0, d1].includes(value));

  const sol1 = randomInt(
    -6,
    7,
    (value) => ![0, -d2 / c2, -d1 / c1].includes(value)
  );
  const below1 = c1 * sol1 + d1;
  const below2 = c2 * sol1 + d2;

  const factor12 = randomInt(-6, 7, (value) => value !== 0);
  const b1 = (-1 * (below1 * factor12)) / calculategcd([below1, below2]);
  const b2 = (below2 * factor12) / calculategcd([below1, below2]);

  const pol1 = -d1 / c1;
  const pol2 = -d2 / c2;

  return {
    terms: [
      { a: 0, b: b1, c: c1, d: d1 },
      { a: 0, b: b2, c: c2, d: d2 },
    ],
    solutions: pol1 === pol2 ? undefined : [{ a: sol1, b: 1 }],
    rightnumber: 0,
  };
};

const level2 = (): Params => {
  const c1 = randomInt(-6, 7, (value) => value !== 0);
  const d1 = randomInt(-6, 7, (value) => value !== 0);
  const c2 = randomInt(-6, 7, (value) => value !== 0);
  const d2 = randomInt(-6, 7, (value) => ![0, d1].includes(value));
  const c3 = randomInt(-6, 7, (value) => value !== 0);
  const d3 = randomInt(-6, 7, (value) => ![0, d1, d2].includes(value));

  const sol1 = randomInt(
    -6,
    7,
    (value) =>
      ![
        0,
        -d1 / c1,
        -d2 / c2,
        -d3 / c3,
        -(d2 - d1) / (c2 - c1),
        -(d3 - d1) / (c3 - c1),
        -(d3 - d2) / (c3 - c2),
      ].includes(value)
  );
  // below1!=below2!=below3
  const below1 = c1 * sol1 + d1;
  const below2 = c2 * sol1 + d2;
  const below3 = c3 * sol1 + d3;

  // Cross product
  const above1 = below1 * (below3 - below2);
  const above2 = below2 * (below1 - below3);
  const above3 = below3 * (below2 - below1);

  // Simplify
  const simplgcd = calculategcd([above1, above2, above3]);
  const b1 = above1 / simplgcd;
  const b2 = above2 / simplgcd;
  const b3 = above3 / simplgcd;

  // Pols
  const pol1 = -d1 / c1;
  const pol2 = -d2 / c2;
  const pol3 = -d3 / c3;
  const polCount = [...Array.from(new Set([pol1, pol2, pol3]))].length;

  // Other solution
  const newsol2 = 
    (b1 * d2 * d3 + b2 * d1 * d3 + b3 * d1 * d2) /
    (sol1 * (b1 * c2 * c3 + b2 * c1 * c3 + b3 * c1 * c2));

  const sol2 =
    polCount === [...Array.from(new Set([pol1, pol2, pol3, newsol2]))].length
      ? sol1
      : newsol2

  return {
    terms: [
      { a: 0, b: b1, c: c1, d: d1 },
      { a: 0, b: b2, c: c2, d: d2 },
      { a: 0, b: b3, c: c3, d: d3 },
    ],
    solutions:
      polCount === 1
        ? undefined
        : sol1 === sol2
        ? [{ a: sol1, b: 1 }]
        : [
            { a: sol1, b: 1 },
            {
              a: b1 * d2 * d3 + b2 * d1 * d3 + b3 * d1 * d2,
              b: sol1 * (b1 * c2 * c3 + b2 * c1 * c3 + b3 * c1 * c2),
            },
          ],
    rightnumber: 0,
  };
};

export const calculateParameter = (level: number): Params => {
  switch (level) {
    case 1:
      return level1();

    default:
      return level2();
  }
};

export const renderEquation = (params: Params) => {
  const textEquation =
    params.terms
      .map((term) => `\\frac{${term.b}}{${term.c}x+${term.d}}`)
      .join("+") + "=" +`${params.rightnumber}`;

  return textEquation
    .replaceAll("+-", "-")
    .replaceAll("{-1x", "{-x")
    .replaceAll("{1x", "{x");
};

export const renderSolution = (params: Params) => {
  // create unique array of pols and join them
  const pols = [
    ...Array.from(
      new Set(params.terms.map((term) => fracTex(-term.d, term.c)))
    ),
  ].join(";");

  const sols = params.solutions
    ? params.solutions.map((sol) => fracTex(sol.a, sol.b)).join(";")
    : `\\mathbb{R} - \\{${pols}\\}`;

  return `
  \\begin{aligned}
      \\mathbb{P}&= \\{${pols}\\}
      \\\\
      \\mathbb{L}&=\\{${sols}\\}
  \\end{aligned}
  `;
};

const fractionalEquation: ProblemGenerator = {
  key: "fractional-equation",
  generate: () => {
    const level = randomInt(1, 3);
    const params = calculateParameter(level);

    return {
      description: renderEquation(params),
      solution: renderSolution(params),
    };
  },
};

export default fractionalEquation;
