import { ProblemGenerator } from "../ProblemGeneratorSpi";
import { randomInt } from "../util/randomizer";
import { calculategcd } from "../util/commonDivisor";


interface Params {
  [index: number]: [number,number,number,number];
/*  sol: [number,number,number,number];
  frac1: [number,number,number,number];
  frac2: [number,number,number,number];
  frac3: [number,number,number,number];
  frac4: [number,number,number,number];
  pol: [number,number,number,number];*/
}


export const renderEquation = (params: Params) => {

  const b1 = params[1][1];
  const c1 = params[1][2];
  const d1 = params[1][3];
  const b2 = params[2][1];
  const c2 = params[2][2];
  const d2 = params[2][3];

  return `\\frac{${b1}}{${c1}x+${d1}}+\\frac{${b2}}{${c2}x+${d2}}=0`
  .replaceAll("+-", "-")
  .replaceAll("{1x", "{x");
};

export const renderSolution = (params: Params,level:number) => {
  const sol1 = params[0][0];
  const sol2 = params[0][1];

  switch(level) {

    case 1:
      return `
      \\begin{aligned}
      x&= ${sol1} \\\\
      \\end{aligned}   
      `

    case 2:
    return `
    \\begin{aligned}
    x&=\\begin{cases} ${sol1} \\\\ ${sol2} \\end{cases}
    \\end{aligned}   
    `
    default:
      return `
      \\begin{aligned}
      x&=\\begin{cases} ${sol1} \\\\ ${sol2} \\end{cases}
      \\end{aligned}   
      `
  }
};

const fractionalEquation: ProblemGenerator = {
  key: "fractional-equation",
  generate: () => {
    var level = randomInt(1,6);
    level = 1;
    // Erste Stufe

    const sol1 = randomInt(-9,10);
        
    var c1 = randomInt(-9, 10, (value) => value !== 0);
    var d1 = randomInt(-9, 10, (value) => value !== 0);
    var c2 = randomInt(-9, 10, (value) => value !== 0);
    var d2 = randomInt(-9, 10, (value) => ![0, d1].includes(value));

    var factor12 = randomInt(-9, 10, (value) => value !== 0);
    var below1 = (c1 * sol1) + d1;
    var below2 = (c2 * sol1) + d2;
    var b1 = -1*(below1*factor12)/calculategcd([below1,below2]);
    var b2 = (below2*factor12)/calculategcd([below1,below2]);

    var sol = [sol1,0,0,0];
    var frac1 = [0,b1,c1,d1];
    var frac2 = [0,b2,c2,d2];
    var frac3 = [0,0,0,0];
    var frac4 = [0,0,0,0];
    var pol = [0,0,0,0];

    let params:Params = [[sol1,0,0,0],[0,b1,c1,d1],[0,b2,c2,d2],[0,0,0,0],[0,0,0,0],[0,0,0,0]];

    return {
      description: renderEquation(params),
      solution: renderSolution(params,level),
      };
  },
};

export default fractionalEquation;
