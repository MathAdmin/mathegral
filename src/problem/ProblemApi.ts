export interface ProblemGenerator {
  key: string;
  name: string;
  description: string;
  generate: () => Problem;
}

export interface Problem {
  description: string;
  solution: string;
}

