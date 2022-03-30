import { ProblemGeneratorNg } from "../ProblemGeneratorSpi";
import { randomInt } from "../util/randomizer";
import { exclude } from "../util/predicates";
import { calculategcd } from "../util/commonDivisor";

type Problem = {
  n1: number;
  n2: number;
};

const commonArithmetic: ProblemGeneratorNg<Problem> = {
  key: "common-arithmetic",
  generate: () => {
    const divisor = randomInt(1, 40);
    const n1 = divisor * randomInt(1, 400 / divisor);
    const n2 = divisor * randomInt(1, 400 / divisor, exclude(n1 / divisor));
    return { n1, n2 };
  },
  format: (problem, translate) => {
    const { n1, n2 } = problem;
    return {
      description: `${n1} \\text{ , } ${n2}`,
      solution: `\\text{${translate(
        "generator.common-arithmetic.operation.GGT"
      )}: } ${calculategcd([n1, n2])} \\text{ , } \\text{${translate(
        "generator.common-arithmetic.operation.KGV"
      )}: } ${(n1 * n2) / calculategcd([n1, n2])}`,
    };
  },
};

export default commonArithmetic;
