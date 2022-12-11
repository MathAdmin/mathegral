import { ProblemGeneratorNg } from "../ProblemGeneratorSpi";
import { randomInt } from "../util/randomizer";
import { exclude } from "../util/predicates";
import { parse } from "../util/expressionParser";

type Problem = {
  s1: number;
  s2: number;
};

export const equationTree = (problem: Problem) => {
  return parse(
    `x^2+${-problem.s1 - problem.s2}x+${problem.s1 * problem.s2}==0`
  );
};

export const factorizationTree = (problem: Problem) => {
  return parse(`(x-${problem.s1})(x-${problem.s2})==0`);
};

const quadraticEquation: ProblemGeneratorNg<Problem> = {
  key: "quadratic-equation",
  generate: () => {
    const s1 = randomInt(-9, 10, exclude(0));
    const s2 = randomInt(-9, 10, exclude(0, s1, -s1));
    return { s1, s2 };
  },
  format: (problem) => {
    return {
      description: equationTree(problem).toTex(),
      solution: `
        \\begin{aligned}
          ${factorizationTree(problem).toTex().replace("=", "&=")} \\\\
          x&=\\begin{cases} ${problem.s1} \\\\ ${problem.s2} \\end{cases}
        \\end{aligned}
      `,
    };
  },
};

export default quadraticEquation;
