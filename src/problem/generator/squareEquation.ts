import { ProblemGenerator } from "../ProblemGeneratorSpi";
import { calculategcd } from "../util/commonDivisor";
import { randomInt } from "../util/randomizer";
import { randomdist } from "../util/randomDistribution";
import { fracTex } from "../util/texGenerator";
import { calculateBinome } from "../util/commonDivisor";

type SquareTerm = {
    a: number;
    b: number;
    c: number;
    d: number;
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

const level1 = (): Params => {


    const number1 = randomInt(1, 15);
    const square1 = number1 * number1;
    const a1 = randomInt(-1,2,(value) => value !== 0);
    const rn = a1 * number1;
    const sol1 = randomInt(-9, 10, (value) => value !== 0);

    var binome = calculateBinome(square1,sol1,0);
    const c1 = binome.a;
    const d1 = binome.b;

    binome = calculateBinome(rn,sol1,0);
    const ra = binome.a;
    const rb = binome.b;

    // other Solution
    const sol2 =
        ra === 0
        ? undefined
        : (rb * rb - d1) / (sol1 * ra * ra);

    return {
        terms: [{ a: a1, b: 0, c: c1, d: d1}],
        solutions: 
            sol2 === undefined
                ? [{ a: sol1, b: 1 }]
                : a1 * Math.sqrt(c1 * sol2 + d1) === ra * sol2 + rb 
                    ? [{ a: sol1, b: 1 }, { a: (rb * rb - d1) , b: sol1 * ra * ra}]
                    : [{ a: sol1, b: 1 }],
        pseudos:
            sol2 === undefined
                ? undefined
                : a1 * Math.sqrt(c1 * sol2 + d1) === ra * sol2 + rb
                    ? undefined
                    :  [{ a: (rb * rb - d1) , b: sol1 * ra * ra}],
        rightTerm: {a: ra, b: rb},
    };
  };


    
////////////////////////////////////////
//   LEVEL 2 (10%)
//
//   sqrt(c1 x + d1) +- sqrt(c2 x + d2) = rb
//
////////////////////////////////////////

const level2 = (): Params => {


    const number1 = randomInt(1, 12);
    const square1 = number1 * number1;
    const number2 = randomInt(1, 12, (value) => value !== number1);
    const square2 = number2 * number2;
    const a1 = 1; 
    const a2 = randomInt(-1,2,(value) => value !== 0);
    const rb = a1 * number1 + a2 * number2;
    const sol1 = randomInt(-9, 10, (value) => value !== 0);

    var binome = calculateBinome(square1,sol1,0);
    const c1 = binome.a;
    const d1 = binome.b;

    binome = calculateBinome(square2,sol1,0);
    const c2 = binome.a;
    const d2 = binome.b;

    // other Solution
    const sol2 =
        c1 === c2
        ? undefined
        : ((d1 - d2 - rb * rb) * (d1 - d2 - rb * rb) - 4 * rb * rb * d2)/
        (sol1 * (c1- c2) * (c1 - c2));

    return {
        terms: [
            { a: a1, b: 0, c: c1, d: d1},
            { a: a2, b: 0, c: c2, d: d2},],
        solutions: 
            sol2 === undefined
                ? [{ a: sol1, b: 1 }]
                : Math.sqrt(c1 * sol2 + d1) + a2 * Math.sqrt(c2 * sol2 + d2) === rb 
                    ? [{ a: sol1, b: 1 },
                    { a: (d1 - d2 - rb * rb) * (d1 - d2 - rb * rb) - 4 * rb * rb * d2, 
                    b: sol1 * (c1- c2) * (c1 - c2)}]
                    : [{ a: sol1, b: 1 }],
        pseudos: 
        sol2 === undefined
            ? undefined
            : Math.sqrt(c1 * sol2 + d1) + a2 * Math.sqrt(c2 * sol2 + d2) === rb
                ? undefined
                : [{ a: (d1 - d2 - rb * rb) * (d1 - d2 - rb * rb) - 4 * rb * rb * d2, 
                    b: sol1 * (c1- c2) * (c1 - c2)}],
      rightTerm: 
        {a: 0, b: rb},
    };
  };
  

  export const calculateParameter = (level: number): Params => {
        switch (level) {
          case 1:
            return level1();
          
          case 2:
            return level2();
      /*      
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
            return level2();
        }
      };
      
      export const renderEquation = (params: Params) => {
        const textEquation =
          params.terms
            .map((term) => `${term.a}\\sqrt{${term.b}x^2+${term.c}x+${term.d}}`)
            .join("+") + `= ${params.rightTerm.a}x+${params.rightTerm.b}`;
      
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
          .replaceAll("= -1x", "= -x");
      };
      
      
      
      export const renderSolution = (params: Params) => {
              
        const sols = params.solutions
          ? `\\{`+ params.solutions.map((sol) => 
            fracTex(sol.a, sol.b)).join(";") + `\\}`
          : `\\mathbb{R} -\\}`;
        
          const pseudos = params.pseudos
          ? `\\{`+ params.pseudos.map((pseudo) => 
            fracTex(pseudo.a, pseudo.b)).join(";") + `\\}`
          : `\\{\\}`;
      
        return `
        \\begin{aligned}
            \\mathbb{L}&=${sols}
            \\\\
            \\mathbb{S}&=${pseudos}
        \\end{aligned}
        `;
      };
      
      const squareEquation: ProblemGenerator = {
        key: "square-equation",
        generate: () => {
          
          //let levelDistribution = [
          //  [1,10],[2,20],[3,40],[4,50],[5,70],[6,85],[7,95],[8,100]];
          //const pos = randomdist(levelDistribution);
          //const level = levelDistribution[pos][0];
          const level = 2;
          const params = calculateParameter(level);
      
          return {
            description: renderEquation(params),
            solution: renderSolution(params),
          };
        },
      };
      
      export default squareEquation;
