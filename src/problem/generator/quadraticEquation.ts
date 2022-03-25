import { ProblemGenerator } from "../ProblemGeneratorSpi";
import { randomInt } from "../util/randomizer";
import { exclude } from "../util/predicates";
import { parse } from "../util/expressionParser";

export const equationTree = (s1: number, s2: number) => {
  return parse(`x^2+${-s1 - s2}x+${s1 * s2}==0`);
};

export const factorizationTree = (s1: number, s2: number) => {
  return parse(`(x-${s1})(x-${s2})==0`);
};

const quadraticEquation: ProblemGenerator = {
  key: "quadratic-equation",
  generate: () => {
    const s1 = randomInt(-9, 10, exclude(0));
    const s2 = randomInt(-9, 10, exclude(0, s1, -s1));

    return {
      description: equationTree(s1, s2).toTex(),
      solution: `
        \\begin{aligned}
          ${factorizationTree(s1, s2).toTex().replace("=", "&=")} \\\\
          x&=\\begin{cases} ${s1} \\\\ ${s2} \\end{cases}
        \\end{aligned}
      `,
    };
  },
};

export default quadraticEquation;
