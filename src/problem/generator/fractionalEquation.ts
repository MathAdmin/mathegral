import { ProblemGenerator } from "../ProblemGeneratorSpi";
import { calculategcd } from "../util/commonDivisor";
import { randomInt } from "../util/randomizer";
import { fracTex } from "../util/texGenerator";

type FractionalTerm = {
  a: number;
  b: number;
  c: number;
  d: number;
  e: number;
  f: number;
};

type Fraction = {
  a: number;
  b: number;
};

type Binome ={
  a: number;
  b:number;
};

type Params = {
  terms: FractionalTerm[];
  solutions: Fraction[] | undefined;
  pols: Fraction[];
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
      { a: 0, b: b1, c: c1, d: d1, e:0, f:0 },
      { a: 0, b: b2, c: c2, d: d2, e:0, f:0 },
    ],
    solutions: polCount === 1
      ? undefined
      : [{ a: sol1, b: 1 }],
    
    pols: polCount === 1
      ? [{ a: -d1, b: c1 }]
      : [{ a: -d1, b: c1 },{ a: -d2, b: c2 }],
    
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
  const c1 = randomInt(-4, 5, (value) => value !== 0);
  const d1 = randomInt(-5, 6, (value) => value !== 0);
  const c2 = randomInt(-4, 5, (value) => value !== 0);
  const d2 = randomInt(-5, 6, (value) => ![0, d1].includes(value));
  const c3 = randomInt(-4, 5, (value) => value !== 0);
  const d3 = randomInt(-5, 6, (value) => ![0, d1, d2].includes(value));

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
    b1 * c2 * c3 + b2 * c1 * c3 + b3 * c1 * c2 === 0
      ? b1 * c2 * d3 + b1 * c3 * d2 + b2 * c1 * d3 + b2 * c3 * d1
        + b3 * c1 * d2 + b3 *c2 * d1 === 0
        ? undefined
        : sol1
      : (b1 * d2 * d3 + b2 * d1 * d3 + b3 * d1 * d2) /
    (sol1 * (b1 * c2 * c3 + b2 * c1 * c3 + b3 * c1 * c2));

  const solCount = [...Array.from(new Set([pol1, pol2, pol3, sol1, sol2]))].length - polCount
      
  return {
    terms: [
      { a: 0, b: b1, c: c1, d: d1, e:0, f:0 },
      { a: 0, b: b2, c: c2, d: d2, e:0, f:0 },
      { a: 0, b: b3, c: c3, d: d3, e:0, f:0 },
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
    pols: polCount === 1
      ? [{ a: -d1, b: c1 }]
      : polCount === 2
        ? pol1 === pol2
          ? [{ a: -d1, b: c1 },{ a: -d3, b: c3 }]
          : [{ a: -d1, b: c1 },{ a: -d2, b: c2 }]
        : [{ a: -d1, b: c1 },{ a: -d2, b: c2 },{ a: -d3, b: c3 }],
    
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
      { a: 0, b: b1, c: c1, d: d1, e:0, f:0 },
      { a: 0, b: b2, c: c2, d: d2, e:0, f:0 },
    ],
    solutions:
      sol2 === undefined
          ? undefined
          : countSol === 1
            ? [{ a: sol1, b: 1 }]
            : [{ a: sol1, b: 1 },
              {a: rn * d1 * d2  - b1 * d2 - b2 * d1, b: rn * c1 * c2 * sol1}],
    pols: polCount === 1
      ? [{ a: -d1, b: c1 }]
      : [{ a: -d1, b: c1 },{ a: -d2, b: c2 }],
    
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

  const number1 = randomInt(2,20);
  const number2 = randomInt(2,20,(value) => ![number1].includes(value));
  const number3 = randomInt(2,20,(value) => ![number1,number2].includes(value));
  const number4 = randomInt(2,20,(value) => ![number1,number2,number3].includes(value));

  const above1 = number1 * number2;
  const below1 = number1 * number3;  
  const above2 = - number4 * number2;
  const below2 = number4 * number3;  

  var binome = calculateBinome(above1,sol1,0);
  const a1 = binome.a;
  const b1 = binome.b;

  binome = calculateBinome(below1,sol1,0);
  const c1 = binome.a;
  const d1 = binome.b;

  binome = calculateBinome(above2,sol1,0);
  const a2 = binome.a;
  const b2 = binome.b;

  binome = calculateBinome(below2,sol1,0);
  const c2 = binome.a;
  const d2 = binome.b;


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
      { a: a1, b: b1, c: c1, d: d1, e:0, f:0 },
      { a: a2, b: b2, c: c2, d: d2, e:0, f:0 },
    ],
    solutions:
      sol2 === undefined
          ? undefined
          : countSol === 1
            ? [{ a: sol1, b: 1 }]
            : [{ a: sol1, b: 1 },
              {a: (b1 * d2 + b2 * d1), b: (sol1 * (a1 * c2 + a2 * c1))}],    
    pols: polCount === 1
      ? [{ a: -d1, b: c1 }]
      : [{ a: -d1, b: c1 },{ a: -d2, b: c2 }],
    
    rightnumber: 0,
  };
};


////////////////////////////////////////
//   LEVEL 5
//
//   a1 x + b1     a2 x + b2
//   ---------- + ----------- = rn
//   c1 x + d1     c2 x + d2
////////////////////////////////////////

const level5 = (): Params => {

  const factor = randomInt(1,6);
  const below = randomInt(2,20);
  const above = below * randomInt(1, 6);
  
  // Zähler zerlegen
  var above1 = randomInt(-1,2,(value) => value !== 0) 
    * randomInt(above /4, (3 * above) / 4, (value) => value !== 0);
  
  const above2 = randomInt(-1,2,(value) => value !== 0) 
    * above - above1;
  
  //Bruch1 erweitern
  above1 = above1 * factor;
  const below1 = below * factor;
  
  const below2 = below;

  //Ergebnis berechnen
  const rn = above1 / below1 + above2 / below2;

  // Lösung1 bestimmen
  const sol1 = randomInt(-9, 10, (value) => value !== 0);

  // N ---> aX+b
  var binome = calculateBinome(above1,sol1,0);
  const a1 = binome.a;
  const b1 = binome.b;

  binome = calculateBinome(below1,sol1,0);
  const c1 = binome.a;
  const d1 = binome.b;

  binome = calculateBinome(above2,sol1,0);
  const a2 = binome.a;
  const b2 = binome.b;

  binome = calculateBinome(below2,sol1,c1 / factor);
  const c2 = binome.a;
  const d2 = binome.b;

  const pol1 = -d1/c1;
  const pol2 = -d2/c2;

  const polCount = [...Array.from(new Set([pol1, pol2]))].length;

  // Other solution
  const sol2 = 
    a1 * c2 + a2 * c1 - rn *c1 * c2 === 0
      ? a1 * d2 + a2 * d1 + b1 *c2 + b2 *c1 -rn * c1 * d2 - rn * c2 * d1 === 0
        ? undefined
        : sol1
      : (b1 * d2 + b2 * d1 - rn * d1 * d2) / (sol1 * (a1 * c2 + a2 * c1 - rn * c1 * c2))

  const countSol = [...Array.from(new Set([pol1, pol2, sol1, sol2]))].length - polCount;
 

  return {
    terms: [
      { a: a1, b: b1, c: c1, d: d1, e:0, f:0 },
      { a: a2, b: b2, c: c2, d: d2, e:0, f:0 },
    ],
    solutions:
      sol2 === undefined
          ? undefined
          : countSol === 1
            ? [{ a: sol1, b: 1 }]
            : [{ a: sol1, b: 1 },
              {a: (b1 * d2 + b2 * d1 - rn * d1 * d2), 
                b: (sol1 * (a1 * c2 + a2 * c1 - rn * c1 * c2))}],
    
    pols: polCount === 1
      ? [{ a: -d1, b: c1 }]
      : [{ a: -d1, b: c1 },{ a: -d2, b: c2 }],
    
    rightnumber: rn,
  };
};

/////////////////////////////////////////////////////////////
//   LEVEL 6
//
//   a1 x + b1     a2 x + b2             a3 x + b3
//   ---------- + ----------- + ------------------------ = 0
//   c1 x + d1     c2 x + d2      (c1 x + d1)(c2 x + d2)
//////////////////////////////////////////////////////////////

const level6 = (): Params => {

  const above1 = randomInt(-9, 10, (value) => value !== 0);
  const below1 = randomInt(-9, 10, (value) => ![0, 1, -1].includes(value));
  const above2 = randomInt(-9, 10, (value) => value !== 0);
  const below2 = randomInt(-9, 10, (value) => ![0, 1, -1, below1].includes(value));

  const above3 = - (above1 * below2 + above2 * below1); 

  // Lösung1 bestimmen
  const sol1 = randomInt(-9, 10, (value) => value !== 0);

  // N ---> aX+b
  var binome = calculateBinome(above1,sol1,0);
  const a1 = binome.a;
  const b1 = binome.b;

  binome = calculateBinome(below1,sol1,0);
  const c1 = binome.a;
  const d1 = binome.b;

  binome = calculateBinome(above2,sol1,0);
  const a2 = binome.a;
  const b2 = binome.b;

  binome = calculateBinome(below2,sol1,0);
  const c2 = binome.a;
  const d2 = binome.b;

  binome = calculateBinome(above3,sol1,0);
  const a3 = binome.a;
  const b3 = binome.b;

  const pol1 = -d1/c1;
  const pol2 = -d2/c2;
  
  const polCount = [...Array.from(new Set([pol1, pol2]))].length;

  // Other solution
  const sol2 = 
    a1 * c2 + a2 * c1 === 0
      ? a1 * d2 + a2 * d1 + b1 *c2 + b2 * c1 + a3 === 0
        ? undefined
        : sol1
      : (b1 * d2 + b2 * d1 + b3) / (sol1 * (a1 * c2 + a2 * c1))

  const countSol = [...Array.from(new Set([pol1, pol2, sol1, sol2]))].length - polCount;
 

  return {
    terms: [
      { a: a1, b: b1, c: c1, d: d1, e: 0, f: 0 },
      { a: a2, b: b2, c: c2, d: d2, e: 0, f: 0 },
      { a: a3, b: b3, c: c1 * d2 + c2 * d1, d: d1 * d2, e: 0, f: c1 * c2 },
    ],
    solutions:
      sol2 === undefined
          ? undefined
          : countSol === 1
            ? [{ a: sol1, b: 1 }]
            : [{ a: sol1, b: 1 },
              {a: (b1 * d2 + b2 * d1 + b3), 
                b: (sol1 * (a1 * c2 + a2 * c1))}],
    pols: polCount === 1
      ? [{ a: -d1, b: c1 }]
      : [{ a: -d1, b: c1 },{ a: -d2, b: c2 }],
    rightnumber: 0,
  };
};

export const calculateBinome = (sum: number,sol:number,nosol:number): Binome => {
  const floor = Math.floor(sum/sol);
  const a = 
    floor === sum/sol || floor === 0 || floor === nosol
      ?  floor + randomInt(-3, 4, (value) => ![0, -floor, floor].includes(value))
      :  floor
  const b = sum - a * sol;
  return {
    a: a,
    b: b,
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

    case 4:
      return level4();
    
    case 5:
      return level5();
  
    case 6:
      return level6(); 
    
    default:
      return level6();
  }
};

export const renderEquation = (params: Params) => {
  const textEquation =
    params.terms
      .map((term) => `\\frac{${term.e}x^2+${term.a}x+${term.b}}{${term.f}x^2+${term.c}x+${term.d}}`)
    //  .map((term) => `\\frac{${term.b}}{${term.c}x+${term.d}}`)
      .join("+") + `= ${params.rightnumber}`;

  return textEquation
    .replaceAll("+-", "-")
    .replaceAll("{0x^2+", "{")
    .replaceAll("{0x^2-", "{-")
    .replaceAll("-1x", "-x")
    .replaceAll("+1x", "+x")
    .replaceAll("{1x", "{x")
    .replaceAll("{0x+", "{")
    .replaceAll("{0x-", "{-")
    .replaceAll("+0x", "")
    .replaceAll("-0x", "");
};



export const renderSolution = (params: Params) => {
  // create unique array of pols and join them
  const pols = [
    ...Array.from(
      new Set(params.pols.map((pol) => fracTex(pol.a, pol.b)))
    ),
  ].join(";");

  const sols = params.solutions
    ? `\\{`+ params.solutions.map((sol) => fracTex(sol.a, sol.b)).join(";") + `\\}`
    : `\\mathbb{R} - \\{${pols}\\}`;

  return `
  \\begin{aligned}
      \\mathbb{P}&= \\{${pols}\\}
      \\\\
      \\mathbb{L}&=${sols}
  \\end{aligned}
  `;
};

const fractionalEquation: ProblemGenerator = {
  key: "fractional-equation",
  generate: () => {
    const level = randomInt(1, 7);
    //const level = 1;
    const params = calculateParameter(level);

    return {
      description: renderEquation(params),
      solution: renderSolution(params),
    };
  },
};

export default fractionalEquation;
