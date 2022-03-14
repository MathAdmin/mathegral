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

////////////////////////////////////////
//   LEVEL 1
//
//      b1           b2
//   ---------- + ----------- = 0
//   c1 x + d1     c2 x + d2
////////////////////////////////////////

const level1 = (): Params => {
  const c1 = randomInt(-6, 7, (value) => value !== 0);
  const d1 = randomInt(-6, 7, (value) => value !== 0);

  const c2 = randomInt(-6, 7, (value) => value !== 0);
  const d2 = randomInt(-6, 7, (value) => ![0, d1].includes(value));

  const sol1 = randomInt(-6,    7,
    (value) => ![0, -d2 / c2, -d1 / c1].includes(value));
  const below1 = c1 * sol1 + d1;
  const below2 = c2 * sol1 + d2;

  const factor12 = randomInt(-6, 7, (value) => value !== 0);
  const b1 = (-1 * (below1 * factor12)) / calculategcd([below1, below2]);
  const b2 = (below2 * factor12) / calculategcd([below1, below2]);

  const pol1 = -d1 / c1;
  const pol2 = -d2 / c2;
  const polCount = [...Array.from(new Set([pol1, pol2]))].length;

  return {
    terms: [
      { a: 0, b: b1, c: c1, d: d1 },
      { a: 0, b: b2, c: c2, d: d2 },
    ],
    solutions: polCount === 1
      ? undefined
      : [{ a: sol1, b: 1 }],
    rightnumber: 0,
  };
};

////////////////////////////////////////
//   LEVEL 2
//
//      b1           b2              b3
//   ---------- + ----------- + ----------- = 0
//   c1 x + d1     c2 x + d2     c3 x + d3
////////////////////////////////////////

const level2 = (): Params => {
  const c1 = randomInt(-6, 7, (value) => value !== 0);
  const d1 = randomInt(-6, 7, (value) => value !== 0);
  const c2 = randomInt(-6, 7, (value) => value !== 0);
  const d2 = randomInt(-6, 7, (value) => ![0, d1].includes(value));
  const c3 = randomInt(-6, 7, (value) => value !== 0);
  const d3 = randomInt(-6, 7, (value) => ![0, d1, d2].includes(value));

  const sol1 = randomInt(-6, 7,
    (value) => ![0,-d1 / c1,-d2 / c2,-d3 / c3,
        -(d2 - d1) / (c2 - c1),-(d3 - d1) / (c3 - c1),-(d3 - d2) / (c3 - c2),
      ].includes(value));

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
  const sol2 = 
    (b1 * d2 * d3 + b2 * d1 * d3 + b3 * d1 * d2) /
    (sol1 * (b1 * c2 * c3 + b2 * c1 * c3 + b3 * c1 * c2));

  const solCount = [...Array.from(new Set([pol1, pol2, pol3, sol1, sol2]))].length - polCount
      
  return {
    terms: [
      { a: 0, b: b1, c: c1, d: d1 },
      { a: 0, b: b2, c: c2, d: d2 },
      { a: 0, b: b3, c: c3, d: d3 },
    ],
    solutions:
      polCount === 1
        ? undefined
        : solCount === 1
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

////////////////////////////////////////
//   LEVEL 3
//
//      b1           b2
//   ---------- + ----------- = rn
//   c1 x + d1     c2 x + d2
////////////////////////////////////////

const level3 = (): Params => {
  const c1 = randomInt(-6, 7, (value) => value !== 0);
  const d1 = randomInt(-6, 7, (value) => value !== 0);

  const c2 = randomInt(-6, 7, (value) => value !== 0);
  const d2 = randomInt(-6, 7, (value) => ![0, d1].includes(value));

  const sol1 = randomInt(-6, 7,(value) => ![0, -d2 / c2, -d1 / c1].includes(value));
  const below1 = c1 * sol1 + d1;
  const below2 = c2 * sol1 + d2;

  const factor1 = randomInt(-6, 7, (value) => value !== 0);
  const factor2 = randomInt(-6, 7, (value) => value !== 0);
  
  const b1 = (below1 * factor1);
  const b2 = (below2 * factor2);

  const pol1 = -d1 / c1;
  const pol2 = -d2 / c2;
  const polCount = [...Array.from(new Set([pol1, pol2]))].length;

  const rn =(b1/(c1*sol1+d1)+b2/(c2*sol1+d2));

  // Other solution
  const sol2 = 
    rn === 0
      ? b1 * c2 + b2* c1 === 0
        ? undefined
        : sol1
      : (rn * d1 * d2  - b1 * d2 - b2 * d1 ) /(rn * c1 * c2 * sol1)

  const countSol = [...Array.from(new Set([pol1, pol2, sol1, sol2]))].length - polCount;
    
  return {
    terms: [
      { a: 0, b: b1, c: c1, d: d1 },
      { a: 0, b: b2, c: c2, d: d2 },
    ],
    solutions:
      sol2 === undefined
          ? undefined
          : countSol === 1
            ? [{ a: sol1, b: 1 }]
            : [{ a: sol1, b: 1 },
              {a: rn * d1 * d2  - b1 * d2 - b2 * d1, b: rn * c1 * c2 * sol1}],
    rightnumber: rn,
  };
};

////////////////////////////////////////
//   LEVEL 4
//
//   a1 x + b1     a2 x + b2
//   ---------- + ----------- = 0
//   c1 x + d1     c2 x + d2
////////////////////////////////////////

const level4 = (): Params => {

  const sol1 = randomInt(-10, 9, (value) => value !== 0);
  let primeFactor = [2, 3, 5, 7, 11, 13];
   const [prime1] = primeFactor.splice(randomInt(0,primeFactor.length),1);
   const [prime2] = primeFactor.splice(randomInt(0,primeFactor.length),1);
   const [prime3] = primeFactor.splice(randomInt(0,primeFactor.length),1);
   const [prime4] = primeFactor.splice(randomInt(0,primeFactor.length),1);

  const numerator1 = prime1 * prime2;
  const denominator1 = prime1 * prime3;  
  const numerator2 = prime4 * prime2;
  const denominator2 = prime4 * prime3;  

  var floor = Math.floor(numerator1/sol1);
  const a1 = 
    floor === numerator1/sol1 || floor === 0
      ? floor + randomInt(-4, 3, (value) => ![0, -floor].includes(value))
      : floor
  const b1 = numerator1 - a1 * sol1;

  floor = Math.floor(denominator1/sol1);
  const c1 = 
    floor === denominator1/sol1 || floor === 0
      ? floor + randomInt(-4, 3, (value) => ![0, -floor].includes(value))
      : floor
  const d1 = denominator1 - c1 * sol1;

  floor = Math.floor(numerator2/sol1);
  const a2 = 
    floor === numerator2/sol1 || floor === 0
      ? - floor + randomInt(-4, 3, (value) => ![0, floor].includes(value))
      : - floor
  const b2 = - numerator2 - a2 * sol1;
  
  floor = Math.floor(denominator2/sol1);
  const c2 = 
    floor === denominator2/sol1 || floor === 0
      ? floor + randomInt(-4, 3, (value) => ![0, -floor].includes(value))
      : floor
  const d2 = denominator2 - c2 * sol1;

  const pol1 = -d1/c1;
  const pol2 = -d2/c2;

  const polCount = [...Array.from(new Set([pol1, pol2]))].length;

  // Other solution
  const sol2 = 
    a1 * c2 + a2 * c1 === 0
      ? a1 * d2 + a2 * d1 + b1 *c2 + b2 *c1 === 0
        ? undefined
        : sol1
      : (b1 * d2 + b2 * d1) / (sol1 * (a1 * c2 + a2 * c1))

  const countSol = [...Array.from(new Set([pol1, pol2, sol1, sol2]))].length - polCount;
 

  return {
    terms: [
      { a: a1, b: b1, c: c1, d: d1 },
      { a: a2, b: b2, c: c2, d: d2 },
    ],
    solutions:
      sol2 === undefined
          ? undefined
          : countSol === 1
            ? [{ a: sol1, b: 1 }]
            : [{ a: sol1, b: 1 },
              {a: (b1 * d2 + b2 * d1), b: (sol1 * (a1 * c2 + a2 * c1))}],
    rightnumber: 0,
  };
};



export const calculateParameter = (level: number): Params => {
  switch (level) {
    case 1:
      return level1();
    
    case 2:
      return level2();
      
    case 3:
        return level3();

    default:
      return level4();
  }
};

export const renderEquation = (params: Params) => {
  const textEquation =
    params.terms
      .map((term) => `\\frac{${term.a}x+${term.b}}{${term.c}x+${term.d}}`)
    //  .map((term) => `\\frac{${term.b}}{${term.c}x+${term.d}}`)
      .join("+") + `= ${params.rightnumber}`;

  return textEquation
    .replaceAll("+-", "-")
    .replaceAll("{-1x", "{-x")
    .replaceAll("{1x", "{x")
    .replaceAll("{0x+", "{")
    .replaceAll("{0x-", "{-");
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
    const level = randomInt(1, 5);
    //const level = 4;
    const params = calculateParameter(level);

    return {
      description: renderEquation(params),
      solution: renderSolution(params),
    };
  },
};

export default fractionalEquation;
