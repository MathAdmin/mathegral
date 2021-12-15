import { ProblemGenerator } from "../ProblemGeneratorSpi";
import { randomInt } from "../util/randomNumber";

export const renderEquation = (s1: number, s2: number) => {
  return `x^2+${-s1 - s2}x+${s1 * s2}=0`
    .replaceAll("+-", "-")
    .replace(/([+-])1x/, "$1x");
};

export const renderFactorization = (s1: number, s2: number) => {
  return `(x-${s1})(x-${s2})=0`.replaceAll("+-", "-").replaceAll("--", "+");
};

const quadraticEquation: ProblemGenerator = {
  key: "quadratic-equation",
  generate: () => {
    const s1 = randomInt(-9, 10, (value) => value !== 0);
    const s2 = randomInt(-9, 10, (value) => ![0, s1, -s1].includes(value));

    return {
      description: renderEquation(s1, s2),
      solution: `
        \\begin{aligned}
          ${renderFactorization(s1, s2).replace("=", "&=")} \\\\
          x&=\\begin{cases} ${s1} \\\\ ${s2} \\end{cases}
        \\end{aligned}
      `,
    };
  },
};

export default quadraticEquation;
