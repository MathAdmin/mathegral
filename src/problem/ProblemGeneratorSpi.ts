export type Generator = ProblemGenerator | ProblemGeneratorNg<any>;

export const isNg = (
  generator: Generator
): generator is ProblemGeneratorNg<any> => {
  return (generator as ProblemGeneratorNg<any>).format !== undefined;
};

/**
 * @deprecated To be replaced by ProblemGeneratorNg
 */
export interface ProblemGenerator {
  key: string;
  image?: string;
  generate: (translate: (key: string) => string) => FormattedProblem;
}

export interface ProblemGeneratorNg<Problem> {
  key: string;
  image?: string;
  generate: () => Problem;
  format: (problem: Problem, translate: (key: string) => string) => FormattedProblem;
}

export type FormattedProblem = {
  description: string;
  solution: string;
};
