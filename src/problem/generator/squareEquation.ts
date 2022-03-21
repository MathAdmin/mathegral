import { ProblemGenerator } from "../ProblemGeneratorSpi";
import { calculategcd } from "../util/commonDivisor";
import { randomInt } from "../util/randomizer";
import { randomdist } from "../util/randomDistribution";
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
    const a1 = randomInt(-1,2,exclude(0));
    const rn = a1 * number1;
    const sol1 = randomInt(-9, 10, exclude(0));

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
//   LEVEL 2 (50%)
//
//   sqrt(c1 x + d1) +- sqrt(c2 x + d2) = rb
//
////////////////////////////////////////

const level2 = (): Params => {


    const number1 = randomInt(1, 12);
    const square1 = number1 * number1;
    const number2 = randomInt(1, 12, exclude(number1));
    const square2 = number2 * number2;
    const a1 = 1; 
    const a2 = randomInt(-1,2,exclude(0));
    const rb = a1 * number1 + a2 * number2;
    const sol1 = randomInt(-9, 10, exclude(0));

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
////////////////////////////////////////
//   LEVEL 3 (20%)
//
//    a1 * sqrt(c1 x + d1) - a1 sqrt(c2 x + d2) = ra x
//
////////////////////////////////////////

const level3 = (): Params => {


  const number1 = 2 * randomInt(0, 5) + 1;
  const square1 = number1 * number1;
  const number2 = 2 * randomInt(0, 5, exclude((number1 - 1 ) / 2 )) + 1;
  const square2 = number2 * number2;

  //d1 = d2 = 1[4]
  const d1 = 1 + 4 * randomInt(-6,7, exclude((square1-1)/4 ,(square2-1)/4));
  const d2 = d1;

  // sol1 in [-4 , -2, -1, 1, 2, 4]
  const sol1 = randomInt(-4, 5, exclude(-3, 0, 3));
  
  const c1 = (square1 - d1) / sol1;
  const c2 = (square2 - d2) / sol1;
  
  const factor = calculategcd([number1 - number2, sol1]);
  const ra = (number1 -number2) / factor;
  const a1 = sol1 / factor;
  const a2 = -1 * a1;

 // other Solution
  const sol2 =
    number1 === number2
      ? undefined
      : (Math.pow(c1 - c2, 2) * Math.pow(a1, 4) - 4 * d1 * Math.pow(ra * a1,2)) 
        / (sol1 * Math.pow(ra, 4));


  return {
      terms: [
          { a: a1, b: 0, c: c1, d: d1},
          { a: a2, b: 0, c: c2, d: d2},],
      solutions: 
          sol2 === undefined
              ? d1 > 0 
                ?[{ a: 0, b: 1 },{ a: sol1, b: 1 }]
                : [{ a: sol1, b: 1 }]
              : (a1 * Math.sqrt(c1 * sol2 + d1) + a2 * Math.sqrt(c2 * sol2 + d2)) === ra * sol2 
                  ? d1 > 0 
                    ? [{ a: 0, b: 1 },{ a: sol1, b: 1 },
                      { a: Math.pow(c1 - c2, 2) * Math.pow(a1, 4) - 4 * d1 * Math.pow(ra * a1,2), 
                      b: sol1 * Math.pow(ra, 4)}]
                    : [{ a: sol1, b: 1 },
                      { a: Math.pow(c1 - c2, 2) * Math.pow(a1, 4) - 4 * d1 * Math.pow(ra * a1,2), 
                      b: sol1 * Math.pow(ra, 4)}]
                  : d1 > 0
                    ? [{ a: 0, b: 1 },{ a: sol1, b: 1 }]
                    :[{ a: sol1, b: 1 }],
      pseudos: 
      sol2 === undefined
          ? undefined
          : a1 * Math.sqrt(c1 * sol2 + d1) + a2 * Math.sqrt(c2 * sol2 + d2) === ra * sol2
              ? d1 > 0
                ? undefined
                : [{ a: 0, b: 1 }]
              : d1 > 0 
                ? [{ a: Math.pow(c1 - c2, 2) * Math.pow(a1, 4) - 4 * d1 * Math.pow(ra * a1,2), 
                  b: sol1 * Math.pow(ra, 4)}]
                :[{ a: 0, b: 1 },{ a: Math.pow(c1 - c2, 2) * Math.pow(a1, 4) - 4 * d1 * Math.pow(ra * a1,2), 
                  b: sol1 * Math.pow(ra, 4)}],
    rightTerm: 
      {a: ra, b: 0},
  };
};

/////////////////////////////////////////////////////////////////////////
//   LEVEL 4 (20%)
//
//     sqrt(c1 x + d1) - sqrt(c2 x + d2) + a3 sqrt(c3 x + d3) = 0
//
/////////////////////////////////////////////////////////////////////////

const level4 = (): Params => {


  const number1 = randomInt(1, 5);
  const square1 = number1 * number1;
  const number2 = randomInt(1, 5, exclude(number1));
  const square2 = number2 * number2;
  //const a1 = randomInt(-2, 3,exclude(0));
  const a1 = 1;
  //const a2 = randomInt(-2, 3,exclude(0));
  const a2 = -1;
  const sol1 = randomInt(-6, 7, exclude(0));
  
  var binome = calculateBinome(square1,sol1,0);
  const c1 = binome.a;
  const d1 = binome.b;

  binome = calculateBinome(square2,sol1,0);
  const c2 = binome.a;
  const d2 = binome.b;
  
  binome = rootDivisor(Math.abs(a1 * number1 + a2 * number2));
  const a3 = 
  a1 * number1 + a2 * number2 > 0
    ? -1 * binome.a
    : binome.a;
  const number3 = binome.b;
  const square3 = number3 * number3;
  binome = calculateBinome(square3,sol1,0);
  const c3 = binome.a;
  const d3 = binome.b;
  

 // other Solution
  const above = Math.pow(a1 * a1 * d1 + a2 * a2 * d2 - a3 * a3 * d3 , 2) 
                - 4 * a1 * a1 * a2 * a2 * d1 * d2;
  
  const below = Math.pow(a1 * a1 * c1 + a2 * a2 * c2 - a3 * a3 * c3, 2)
                - 4 * a1 * a1 * a2 * a2 * c1 * c2;
  
  const sol2 =
     below === 0
      ? undefined
      : above / (sol1 * below);


  return {
      terms: [
          { a: a1, b: 0, c: c1, d: d1},
          { a: a2, b: 0, c: c2, d: d2},
          { a: a3, b: 0, c: c3, d: d3},],
      solutions: 
          sol2 === undefined
              ? [{ a: sol1, b: 1 }]
              : a1 * Math.sqrt(c1 *sol2 +d1) 
              + a2 * Math.sqrt(c2 *sol2 +d2)
              + a3 * Math.sqrt(c3 *sol2 +d3) === 0
                ? [{ a: sol1, b: 1 },{ a: above, b: sol1 * below }]
                : [{ a: sol1, b: 1 }],
      pseudos: 
          sol2 === undefined
            ? undefined
            : a1 * Math.sqrt(c1 *sol2 +d1) 
            + a2 * Math.sqrt(c2 *sol2 +d2)
            + a3 * Math.sqrt(c3 *sol2 +d3) === 0
            ? undefined
            : [{ a: above, b: sol1 * below }] ,
    rightTerm: 
      {a: 0, b: 0},
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
      /*    
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
          .replaceAll("= -1x", "= -x")
          .replaceAll("+0", "");
      };
      
      
      
      export const renderSolution = (params: Params) => {

        const pseudos = params.pseudos
        ? `\\{`+ [...Array.from(
          new Set(params.pseudos.map((pseudo) => fracTex(pseudo.a, pseudo.b)))
          ),].join(";") + `\\}`
        : `\\{\\}`;

        const sols = params.solutions 
          ?`\\{`+ [...Array.from(
            new Set(params.solutions.map((sol) => fracTex(sol.a, sol.b)))
            ),].join(";") + `\\}`
          : `\\mathbb{R} - \\{${pseudos}\\}`;   

      
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
          
          let levelDistribution = [[1,10],[2,60],[3,80],[4,100]];
          const pos = randomdist(levelDistribution);
          const level = levelDistribution[pos][0];
          //const level = 4;
          const params = calculateParameter(level);
      
          return {
            description: renderEquation(params),
            solution: renderSolution(params),
          };
        },
      };
      
      export default squareEquation;
