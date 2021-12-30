export interface ProblemGenerator {
  key: string;
  image?: string;
  generate: () => Problem;
}

export interface Problem {
  description: string;
  solution: string;
}

