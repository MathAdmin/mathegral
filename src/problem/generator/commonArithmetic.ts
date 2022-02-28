import { ProblemGenerator } from "../ProblemGeneratorSpi";
import { randomInt } from "../util/randomizer";
import { calculategcd } from "../util/commonDivisor";

const commonArithmetic: ProblemGenerator = {
    key: "common-arithmetic",
    generate: (translate) => {
        const number1 = randomInt(1,500);
        const number2 = randomInt(1,500);
        return {
        description: `${number1} \\text{ , } ${number2}`,
        solution: `\\text{${translate(
          "generator.common-arithmetic.relation.0" )}} + ${calculategcd([number1, number2])}`,
      };
    },
  };
  
  export default commonArithmetic;