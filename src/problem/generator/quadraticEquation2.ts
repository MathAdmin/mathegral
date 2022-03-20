import { ProblemGenerator } from "../ProblemGeneratorSpi";
import { gcd } from "../util/commonDivisor";
import { exclude } from "../util/predicates";
import { randomInt } from "../util/randomizer";

export const renderEquation2 = (a: number, b: number, c:number, d:number, factor:number) => {
  if (factor *a *c===1){
    return `x^2+${(- a * d - b * c)* factor}x+${b * d * factor}=0`
    .replaceAll("+-", "-")
    .replaceAll("+1x", "+x")
    .replaceAll("-1x", "-x")
    .replaceAll("+0x", "")
    .replaceAll("-0x", "");
  } else {
    return `${factor *a *c}x^2+${(- a * d - b * c)* factor}x+${b * d * factor}=0`
    .replaceAll("+-", "-")
    .replaceAll("+1x", "+x")
    .replaceAll("-1x", "-x")
    .replaceAll("+0x", "")
    .replaceAll("-0x", "");
  }
};

export const renderSolution2 =(a: number, b: number,c: number, d: number, factor: number) => {
    switch (a) {
      case 1:
        switch(c){
          case 1:
            return `${b} \\\\ ${d}`;
          default:
            return `${b} \\\\ ${d}/${c}`;
        }     
      default:
        switch (c){
          case 1:
            return `${b}/${a} \\\\ ${d}`;
          default:
            return `${b}/${a} \\\\ ${d}/${c}`;
        }     
      
    }
};


export const renderFactorization2 = (a: number, b: number,c: number, d: number, factor: number) => {
 if (factor===1) {
    return `(${a}x-${b})(${c}x-${d})=0`
    .replaceAll("+-", "-")
    .replaceAll("(1x", "(x")
    .replaceAll("--", "+");
  } else {
    return `${factor}(${a}x-${b})(${c}x-${d})=0`
    .replaceAll("+-", "-")
    .replaceAll("(1x", "(x")
    .replaceAll("--", "+");
  };
};

const quadraticEquation2: ProblemGenerator = {
  key: "quadratic-equation2",
  generate: () => {
    var a = randomInt(1, 10, exclude(0));
    var b = randomInt(-9, 10, exclude(0));
    var c = randomInt(1, 10, exclude(0));
    var d = randomInt(-9, 10, exclude(0));
    const gcd1 = gcd(a,b);
    const gcd2 = gcd(c,d);
    var factor= gcd1 * gcd2;
    a = a / gcd1;
    b = b / gcd1;
    c = c / gcd2;
    d = d / gcd2;
    
 
    return {
      description: renderEquation2(a, b, c, d, factor),
      solution: `
        \\begin{aligned}
          ${renderFactorization2(a,b,c,d,factor).replace("=", "&=")} \\\\
          x&=\\begin{cases} ${renderSolution2(a,b,c,d,factor).replace("=","&=")} \\end{cases}
        \\end{aligned}
      `,
    };
  },
};

export default quadraticEquation2;
