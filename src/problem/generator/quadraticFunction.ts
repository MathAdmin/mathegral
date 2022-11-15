import { TypographyUtils } from "@mui/material/styles/createTypography";
import { ProblemGeneratorNg } from "../ProblemGeneratorSpi";
import { exclude } from "../util/predicates";
import { randomInt,randomElement } from "../util/randomizer";

// 25  
const VARIANT = [
  ["abc","SINGLE"], ["abm","SINGLE"],["abu","INFINITY"],["abv","SINGLE"],
  ["acm","SINGLE"], ["acu","SINGLE"],["acv","DOUBLE"],
  ["amn","SINGLE"], ["amu","SINGLE"],["amv","DOUBLE"],
  ["auv","SINGLE"],
  ["bcm","SINGLE"], ["bcu","SINGLE"],["bcv","SINGLE"],
  ["bmn","SINGLE"], ["bmu","SINGLE"],["bmv","DOUBLE"],
  ["buv","SINGLE"],
  ["cmn","SINGLE"], ["cmu","SINGLE"],["cmv","DOUBLE"],
  ["cuv","SINGLE"],
  ["mnu","INFINITY"], ["mnv","SINGLE"],["muv","SINGLE"]]

const INFINITY = "INFINITY";
const DOUBLE = "DOUBLE";



type Problem = {
  a: number;
  b: number;
  c: number;
  m: number;
  n: number;
  u: number;
  v: number;
  given: string;
  sol: string;
};


const quadraticFunction: ProblemGeneratorNg<Problem> = {
  key: "quadratic-function",
  image: "parabola.svg",
  generate: () => {
    var a = randomInt(-9, 10, exclude(0));
    var m = randomInt(-9, 7);
    var n = randomInt(m, 10);
    var b = -a * (m + n);
    var c = a * m * n;
    var u = (m + n) / 2;
    var v = (4 * a * c - b * b) / (4 * a);  
    var  variant = randomElement(VARIANT);
    var given = variant[0]; 
    var sol = variant[1];
    
    return { a, b, c, m, n, u, v, given, sol };
  },
  format: (problem,translate) => {
    const { a, b, c, m, n, u, v, given, sol } = problem;
    return {
      description:`${given[0]}=${eval(given[0])} \\text{ , } ${given[1]}=${eval(given[1])} \\text{ , } ${given[2]}=${eval(given[2])}`,
      solution:
        sol==="SINGLE"
          ? `a=${a} \\text{ , } b=${b} \\text{ , } c=${c} \\text{ , } m=${m} \\text{ , } n=${n} \\text{ , } u=${u} \\text{ , } v=${v}`
          : sol==="DOUBLE"
            ? `\\begin{aligned}
              a=${a} \\text{ , } b=${b} \\text{ , } c=${c} \\text{ , } m=${m} \\text{ , } n=${n} \\text{ , } u=${u} \\text{ , } v=${v}
              \\\\
              \\text{${translate(`generator.quadratic-function.problem.${problem.sol}`)}}
              \\end{aligned}`           
            : `\\text{${translate(`generator.quadratic-function.problem.${problem.sol}`)}}`
          };
  },
};

export default quadraticFunction;
