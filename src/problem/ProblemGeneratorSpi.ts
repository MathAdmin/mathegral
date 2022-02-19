export interface ProblemGenerator {
  key: string;
  image?: string;
  generate: (translate: (key: string) => string) => Problem;
}

export interface Problem {
  description: string;
  solution: string;
}

