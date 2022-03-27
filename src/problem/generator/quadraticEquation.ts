import { ProblemGeneratorNg } from "../ProblemGeneratorSpi";
import { randomInt } from "../util/randomizer";
import { exclude } from "../util/predicates";
import { parse } from "../util/expressionParser";

type Seed = {
  s1: number;
  s2: number;
};

export const equationTree = (seed: Seed) => {
  return parse(`x^2+${-seed.s1 - seed.s2}x+${seed.s1 * seed.s2}==0`);
};

export const factorizationTree = (seed: Seed) => {
  return parse(`(x-${seed.s1})(x-${seed.s2})==0`);
};

const quadraticEquation: ProblemGeneratorNg<Seed> = {
  key: "quadratic-equation",
  generate: () => {
    const s1 = randomInt(-9, 10, exclude(0));
    const s2 = randomInt(-9, 10, exclude(0, s1, -s1));
    return { s1, s2 };
  },
  render: (input) => {
    return {
      description: equationTree(input.seed).toTex(),
      solution: `
        \\begin{aligned}
          ${factorizationTree(input.seed).toTex().replace("=", "&=")} \\\\
          x&=\\begin{cases} ${input.seed.s1} \\\\ ${input.seed.s2} \\end{cases}
        \\end{aligned}
      `,
    };
  },
};

export default quadraticEquation;
