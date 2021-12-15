import { ProblemGenerator } from "../ProblemGeneratorSpi";

const randomInt = (min: number, max: number) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
};

const randomSolution = (exclude: number[]) => {
  const excluded = new Set(exclude);
  let solution;
  while (!solution || excluded.has(solution)) {
    solution = randomInt(-9, 10);
  }
  return solution;
};

export const generateEquation = (s1: number, s2: number) => {
  return (`x^2+${-s1-s2}x+${s1*s2}=0`).replaceAll("+-", "-").replace(/([+-])1x/, "$1x");
};

export const generateFactorization = (s1: number, s2: number) => {
  return (`(x-${s1})(x-${s2})=0`).replaceAll("+-", "-").replaceAll("--", "+");
};

const quadraticEquation: ProblemGenerator = {
  key: "quadratic-equation",
  generate: () => {
    const s1 = randomSolution([0]);
    const s2 = randomSolution([0, s1, -s1]);

    return {
      description: generateEquation(s1, s2),
      solution: `
        \\begin{aligned}
          ${generateFactorization(s1, s2).replace('=', '&=')} \\\\
          x&=\\begin{cases} ${s1} \\\\ ${s2} \\end{cases}
        \\end{aligned}
      `,
    };
  },
};

export default quadraticEquation;
