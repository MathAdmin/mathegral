export interface ProblemGenerator {
  key: string;
  generate: () => Problem;
}

export interface Problem {
  description: string;
  solution: string;
}

