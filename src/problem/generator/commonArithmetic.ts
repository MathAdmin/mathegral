import { ProblemGenerator } from "../ProblemGeneratorSpi";
import { randomInt } from "../util/randomizer";
import { calculategcd } from "../util/commonDivisor";

const commonArithmetic: ProblemGenerator = {
    key: "common-arithmetic",
    generate: (translate) => {
        const teiler = randomInt(1,40);
        const number1 = teiler*randomInt(1,400/teiler);
        const number2 = teiler*randomInt(1,400/teiler);
        return {
        description: `${number1} \\text{ , } ${number2}`,
        solution: `\\text{${translate(
          "generator.common-arithmetic.operation.GGT" )}: } ${calculategcd([number1, number2])} \\text{ , } \\text{${translate(
            "generator.common-arithmetic.operation.KGV" )}: } ${number1*number2/calculategcd([number1, number2])}`,
      };
    },
  };
  
  export default commonArithmetic;