import { ProblemGenerator } from "../ProblemGeneratorSpi";
import { randomInts } from "../util/randomizer";
import { exclude } from "../util/predicates";
import { fracTex } from "../util/texGenerator";
import { Fraction } from "../util/commonDivisor";

type EquationTerm = {
    a: number;
    b: number;
    c: number;
    d: number;
    e: number;
    };


type Params = {
    terms: EquationTerm[];
    solutions: Fraction[];
    problem: string | undefined;
    };


const INFINITY1 = "INFINITY1";


////////////////////////////////////////////////////
//   LEVEL 1 (10%)
//
//   b1 x + c1 y = e1
//   b2 x + c2 y = e2
//
///////////////////////////////////////////////////

const level1 = (): Params => {


    const [x, y] = randomInts(2, -9, 10, exclude(0));
    const [b1, b2, c1, c2] = randomInts(4, -6, 7, exclude(0));
    const e1 = b1 * x + c1 * y;
    const e2 = b2 * x + c2 * y;
        
    const problem =
         b1 * c2 - b2 * c1 === 0
         ? INFINITY1
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

  export const calculateParameter = (level: number): Params => {
    switch (level) {
      case 1:
        return level1();
  /*    
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
    */       
      default:
        return level1();
    }
  };
  
  export const renderEquation = (params: Params) => {
    const textEquation =
    `\\begin{aligned}
    \\begin{cases}`
    + params.terms
    .map((term) => `${term.a}w+${term.b}x+${term.c}y+${term.d}z=${term.e}`)
    .join("\\\\")
    + `\\end{cases}
  \\end{aligned}`;

  
    return textEquation
      .replaceAll("+-", "-")

      .replaceAll("-1w", "-w")
      .replaceAll("1w", "w")
      .replaceAll("0w+", "+")
      .replaceAll("0w-", "-")

      
      .replaceAll("+0x", "")
      .replaceAll("-1x", "-x")
      .replaceAll("}+1", "}")
      .replaceAll("\\+1", "\\")
      .replaceAll("}+", "}")
      .replaceAll("\\+", "\\")   
      .replaceAll("+1x", "+x")

      .replaceAll("+0y", "")
      .replaceAll("-1y", "-y")
      .replaceAll("}+1", "}")
      .replaceAll("\\+1", "\\")
      .replaceAll("}+", "}")
      .replaceAll("\\+", "\\")   
      .replaceAll("+1y", "+y")

      .replaceAll("+0z", "")
      .replaceAll("-1z", "-z")
      .replaceAll("}+1", "}")
      .replaceAll("\\+1", "\\")
      .replaceAll("}+", "}")
      .replaceAll("\\+", "\\")   
      .replaceAll("+1z", "+z")
      ;
  };
  
  
  
  export const renderSolution = (params: Params, translate: (key: string) => string) => {

    const sols = params.problem
        ? `\\text{${translate(`generator.linear-system.problem.${params.problem}`)}}`
        : `\\mathbb{L}=\\{(`
        + [...Array.from(
            new Set(params.solutions.map((sol) => fracTex(sol.a, sol.b)))
            ),].join(";") + `)\\}`;

      return sols;
  };
  
  const linearSystem: ProblemGenerator = {
    key: "linear-system",
    generate: (translate) => {
      
      //let levelDistribution = [[1,10],[2,40],[3,70],[4,90],[5,95],[6,100]];
      //const pos = randomdist(levelDistribution);
      //const level = levelDistribution[pos][0];
      const level = 1;
      const params = calculateParameter(level);
      
      return {
        description: renderEquation(params),
        solution: renderSolution(params, translate),
      };
    },
  };
  
  export default linearSystem;
