export type Generator = ProblemGenerator | ProblemGeneratorNg<any>;

export const isNg = (
  generator: Generator
): generator is ProblemGeneratorNg<any> => {
  return (generator as ProblemGeneratorNg<any>).render !== undefined;
};

export interface ProblemGenerator {
  key: string;
  image?: string;
  generate: (translate: (key: string) => string) => Problem;
}

export interface ProblemGeneratorNg<T> {
  key: string;
  image?: string;
  generate: () => T;
  render: (input: RenderInput<T>) => Problem;
}

export interface RenderInput<T> {
  translate: (key: string) => string;
  seed: T;
}

export type Problem = {
  description: string;
  solution: string;
};
