import { ProblemGenerator } from "../ProblemGeneratorSpi";
import { randomInt } from "../util/randomizer";

export const renderEquation2 = (s1: number, s2: number) => {
  return `x^2+${-s1 - s2}x+${s1 * s2}=0`
    .replaceAll("+-", "-")
    .replace(/([+-])1x/, "$1x");
};

export const renderFactorization2 = (s1: number, s2: number) => {
  return `(x-${s1})(x-${s2})=0`.replaceAll("+-", "-").replaceAll("--", "+");
};

const quadraticEquation2: ProblemGenerator = {
  key: "quadratic-equation2",
  generate: () => {
    const s1 = randomInt(-9, 10, (value) => value !== 0);
    const s2 = randomInt(-9, 10, (value) => ![0, s1, -s1].includes(value));

    return {
      description: renderEquation2(s1, s2),
      solution: `
        \\begin{aligned}
          ${renderFactorization2(s1, s2).replace("=", "&=")} \\\\
          x&=\\begin{cases} ${s1} \\\\ ${s2} \\end{cases}
        \\end{aligned}
      `,
    };
  },
};

export default quadraticEquation2;
