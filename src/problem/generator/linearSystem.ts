import { ProblemGeneratorNg } from "../ProblemGeneratorSpi";
import { randomInts } from "../util/randomizer";
import { randomInt } from "../util/randomizer";
import { exclude } from "../util/predicates";
import { fracTex } from "../util/texGenerator";
import { Fraction } from "../util/commonDivisor";
import weighted from "weighted";

type EquationTerm = {
    a: number;
    b: number;
    c: number;
    d: number;
    e: number;
    };


type Problem = {
    terms: EquationTerm[];
    solutions: Fraction[];
    problem: string | undefined;
    };


const INFINITY = "INFINITY";
const NONE = "NONE";




////////////////////////////////////////////////////
//   LEVEL 1 (10%)
//
//   b1 x + c1 y = e1
//   b2 x + c2 y = e2
//
///////////////////////////////////////////////////

const level1 = (): Problem => {


    const [x, y] = randomInts(2, -9, 10, exclude(0));
    const [b1, b2, c1, c2] = randomInts(4, -15, 16, exclude(0));
    const e1 = b1 * x + c1 * y;
    const e2 = b2 * x + c2 * y;
        
    const problem =
         b1 * c2 - b2 * c1 === 0
         ? INFINITY
         : undefined;


    return {
        terms: [{ a: 0, b: b1, c: c1, d: 0, e: e1},
                { a: 0, b: b2, c: c2, d: 0, e: e2}],
        solutions: 
            [{ a: x, b: 1 },{ a: y, b: 1 }],
        problem:
            problem,
    };
  };

////////////////////////////////////////////////////
//   LEVEL 1b (4%)  L = {}
//
//   b1 x + c1 y = e1
//   b2 x + c2 y = e2
//
///////////////////////////////////////////////////

const level1b = (): Problem => {

  const [b1, c1, factor] = randomInts(3, -9, 10, exclude(0));
  const [e1, sum] = randomInts(2, -9, 10, exclude(0));
  const b2 = b1 * factor;
  const c2 = c1 * factor;
  const e2 = e1 * factor + sum; 

  return {
      terms: [{ a: 0, b: b1, c: c1, d: 0, e: e1},
              { a: 0, b: b2, c: c2, d: 0, e: e2}],
      solutions: 
          [{ a: 0, b: 1 },{ a: 0, b: 1 }],
      problem:
          NONE,
  };
};




////////////////////////////////////////////////////
//   LEVEL 2 (60%)
//
//   b1 x + c1 y + d1 z = e1
//   b2 x + c2 y + d2 z = e2
//   b3 x + c3 y + d3 z = e3
//
///////////////////////////////////////////////////

const level2 = (): Problem => {

  // Lösungen
  const [x, y, z] = randomInts(3, -9, 10, exclude(0));
  
  //Parameter
  const [b1, b2, b3, c1, c2, c3, d1, d2, d3] = 
  randomInts(9, -15, 16, exclude(0));

  const e1 = b1 * x + c1 * y + d1 * z;
  const e2 = b2 * x + c2 * y + d2 * z;
  const e3 = b3 * x + c3 * y + d3 * z;
 
  const determinant = (b1 * c2  * d3) + (b3 * c1  * d2) + (b2 * c3  * d1)
  - (b3 * c2  * d1) - (b1 * c3  * d2) - (b2 * c1  * d3);
  

  const problem =
       determinant === 0
       ? INFINITY
       : undefined;


  return {
      terms: [{ a: 0, b: b1, c: c1, d: d1, e: e1},
              { a: 0, b: b2, c: c2, d: d2, e: e2},
              { a: 0, b: b3, c: c3, d: d3, e: e3}
          ],
      solutions: 
          [{ a: x, b: 1 },{ a: y, b: 1 },{ a: z, b: 1 }],
      problem:
          problem,
  };
};

////////////////////////////////////////////////////
//   LEVEL 2b (4%)       L ={}
//
//   b1 x + c1 y + d1 z = e1
//   b2 x + c2 y + d2 z = e2
//   b3 x + c3 y + d3 z = e3
//
///////////////////////////////////////////////////

const level2b = (): Problem => {

  const [b1, c1, d1, e1, b2, c2, d2, e2] = randomInts(8, -9, 10, exclude(0));
  const [factor1, factor2] = randomInts(2, -2, 3, exclude(0));
  const sum = randomInt(-3, 4, exclude(0));
  const b3 = b1 * factor1 + b2 * factor2;
  const c3 = c1 * factor1 + c2 * factor2;
  const d3 = d1 * factor1 + d2 * factor2;
  const e3 = e1 * factor1 + e2 * factor2 + sum; 
  
  const linie1 = { a: 0, b: b1, c: c1, d: d1, e: e1};
  const linie2 = { a: 0, b: b2, c: c2, d: d2, e: e2};
  const linie3 = { a: 0, b: b3, c: c3, d: d3, e: e3};

  const permutation = randomInt(1,4);

  return {
      terms: 
          permutation === 1
          ? [linie1,linie2,linie3]
          : permutation === 2
            ? [linie2,linie3,linie1]
            : [linie3,linie1,linie2],
      solutions: 
          [{ a: 0, b: 0 }],
      problem:
          NONE,
  };
};



////////////////////////////////////////////////////
//   LEVEL 3 (10%)
//
//   a1 w + b1 x + c1 y + d1 z = e1
//   a2 w + b2 x + c2 y + d2 z = e2
//   a3 w + b3 x + c3 y + d3 z = e3
//   a4 w + b4 x + c4 y + d4 z = e4
//
///////////////////////////////////////////////////

const level3 = (): Problem => {

  // Lösungen
  const [w, x, y, z] = randomInts(4, -9, 10, exclude(0));
  
  //Parameter
  const [a1, a2, a3, a4, b1, b2, b3, b4, c1, c2, c3, c4, d1, d2, d3, d4] = 
  randomInts(16, -6, 7, exclude(0));

  const e1 = a1 * w + b1 * x + c1 * y + d1 * z;
  const e2 = a2 * w + b2 * x + c2 * y + d2 * z;
  const e3 = a3 * w + b3 * x + c3 * y + d3 * z;
  const e4 = a4 * w + b4 * x + c4 * y + d4 * z;
  
  // linear combination
  const nb1 = b1 - b4 * (a1/a4);
  const nb2 = b2 - b4 * (a2/a4);
  const nb3 = b3 - b4 * (a3/a4);
  const nc1 = c1 - c4 * (a1/a4);
  const nc2 = c2 - c4 * (a2/a4);
  const nc3 = c3 - c4 * (a3/a4);
  const nd1 = d1 - d4 * (a1/a4);
  const nd2 = d2 - d4 * (a2/a4);
  const nd3 = d3 - d4 * (a3/a4);



  const determinant = (nb1 * nc2  * nd3) + (nb3 * nc1  * nd2) + (nb2 * nc3  * nd1)
  - (nb3 * nc2  * nd1) - (nb1 * nc3  * nd2) - (nb2 * nc1  * nd3);

  

  const problem =
       determinant === 0
       ? INFINITY
       : undefined;


  return {
      terms: [{ a: a1, b: b1, c: c1, d: d1, e: e1},
              { a: a2, b: b2, c: c2, d: d2, e: e2},
              { a: a3, b: b3, c: c3, d: d3, e: e3},
              { a: a4, b: b4, c: c4, d: d4, e: e4}
          ],
      solutions: 
          [{ a: w, b: 1 },{ a: x, b: 1 },{ a: y, b: 1 },{ a: z, b: 1 }],
      problem:
          problem,
  };
};

////////////////////////////////////////////////////
//   LEVEL 3b (2%)       L ={}
//
//   a1 w + b1 x + c1 y + d1 z = e1
//   a2 w + b2 x + c2 y + d2 z = e2
//   a3 w + b3 x + c3 y + d3 z = e3
//   a4 w + b4 x + c4 y + d4 z = e4
//
///////////////////////////////////////////////////

const level3b = (): Problem => {

  const [a1, b1, c1, d1, e1, a2, b2, c2, d2, e2, a3, b3, c3, d3, e3] 
    = randomInts(15, -9, 10, exclude(0));
  const [factor1, factor2, factor3] = randomInts(3, -2, 3, exclude(0));
  const sum = randomInt(-3, 4, exclude(0));

  const a4 = a1 * factor1 + a2 * factor2 + a3 * factor3;
  const b4 = b1 * factor1 + b2 * factor2 + b3 * factor3;
  const c4 = c1 * factor1 + c2 * factor2 + c3 * factor3;
  const d4 = d1 * factor1 + d2 * factor2 + d3 * factor3;
  const e4 = e1 * factor1 + e2 * factor2 + e3 * factor3 + sum; 
  
  const linie1 = { a: a1, b: b1, c: c1, d: d1, e: e1};
  const linie2 = { a: a2, b: b2, c: c2, d: d2, e: e2};
  const linie3 = { a: a3, b: b3, c: c3, d: d3, e: e3};
  const linie4 = { a: a4, b: b4, c: c4, d: d4, e: e4};

  const permutation = randomInt(1,5);

  return {
      terms: 
          permutation === 1
          ? [linie1, linie2, linie3, linie4]
          : permutation === 2
            ? [linie2, linie3, linie4, linie1]
            : permutation === 3 
              ? [linie3, linie4, linie1, linie2]
              : [linie4, linie1, linie2, linie3],
      solutions: 
          [{ a: 0, b: 0 }],
      problem:
          NONE,
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
        return level1b();
        
      case 5:
        return level2b();
        
      case 6:
        return level3b();
      
      default:
        return level1();
    }
  };
  
  export const formatEquation = (problem: Problem) => {
    const textEquation =
    `\\begin{aligned}
    \\begin{cases}`
    + problem.terms
    .map((term) => `${term.a}w+${term.b}x+${term.c}y+${term.d}z=${term.e}`)
    .join("\\\\")
    + `\\end{cases}
  \\end{aligned}`;

  
    return textEquation
      .replaceAll("+-", "-")
     
      .replaceAll("-1w", "-w")
      .replaceAll("}1w", "}w")
      .replaceAll("}0w", "}")
      .replaceAll("\\0w", "\\")
      .replaceAll("\\1w", "\\w")

      .replaceAll("\\+", "\\")
      .replaceAll("}+", "}")
    
      .replaceAll("-1x", "-x")
      .replaceAll("\\0x", "\\")
      .replaceAll("}0x", "}")
      .replaceAll("}1x", "}x")
      .replaceAll("\\1x", "\\x")
      .replaceAll("+1x", "+x")
      .replaceAll("+0x", "")

      .replaceAll("\\+", "\\")
      .replaceAll("}+", "}")
    
      .replaceAll("-1y", "-y")
      .replaceAll("\\0y", "\\")
      .replaceAll("}0y", "}")
      .replaceAll("}1y", "}y")
      .replaceAll("\\1y", "\\y")
      .replaceAll("+1y", "+y")
      .replaceAll("+0y", "")
      
      .replaceAll("\\+", "\\")
      .replaceAll("}+", "}")
    
      .replaceAll("-1z", "-z")
      .replaceAll("\\0z", "\\")
      .replaceAll("}0z", "}")
      .replaceAll("}1z", "}z")
      .replaceAll("\\1z", "\\z")
      .replaceAll("+1z", "+z")
      .replaceAll("+0z", "")

      .replaceAll("\\=0", "\\0=0")
      .replaceAll("}=0", "}0=0")

  
      ;
  };
  
  
  
  export const formatSolution = (problem: Problem, translate: (key: string) => string) => {

    const sols = problem.problem
        ? `\\text{${translate(`generator.linear-system.problem.${problem.problem}`)}}`
        : `\\mathbb{L}=\\{(`
        + [...Array.from(
            (problem.solutions.map((sol) => fracTex(sol.a, sol.b)))
            ),].join(";") + `)\\}`;

      return sols;
  };
  
  const linearSystem: ProblemGeneratorNg<Problem> = {
    key: "linear-system",
    generate: () => {
      const level = weighted([1, 2, 3, 4, 5, 6], [20, 60, 10, 4, 4, 2]);
      return generateProblem(level);
    },
    format: (problem, translate) => {
      return {
        description: formatEquation(problem),
        solution: formatSolution(problem, translate),
      };
    },
  };
  
  export default linearSystem;
