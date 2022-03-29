import { ProblemGeneratorNg } from "../ProblemGeneratorSpi";
import weighted from "weighted";

const MIN_PRODUCT = 200;
const MAX_PRODUCT = 1500;

const PRIMES = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37];
const WEIGHTS = [30, 30, 10, 7, 6, 5, 2, 2, 2, 2, 2, 2];

type PrimeFactors = number[];

const formatSolution = (factors: PrimeFactors) => {
  var formattedFactors: string[] = [];
  factors
    .reduce(
      (counts, factor) => counts.set(factor, (counts.get(factor) || 0) + 1),
      new Map()
    )
    .forEach((exponent, factor) =>
      formattedFactors.push(
        exponent > 1 ? `${factor}^${exponent}` : `${factor}`
      )
    );
  return formattedFactors.join("\\cdot");
};

const primeFactor: ProblemGeneratorNg<PrimeFactors> = {
  key: "prime-factor",
  generate: () => {
    const factors: PrimeFactors = [];
    var product = 1;
    while (product < MIN_PRODUCT) {
      const prime = weighted(PRIMES, WEIGHTS);
      if (product * prime < MAX_PRODUCT) {
        factors.push(prime);
        product = product * prime;
      }
    }
    return factors.sort((a, b) => a - b);
  },
  format: (factors) => {
    return {
      description: `${factors.reduce((a, b) => a * b)}`,
      solution: `${formatSolution(factors)}`,
    };
  },
};

export default primeFactor;
