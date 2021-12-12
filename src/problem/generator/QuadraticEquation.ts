import { EquationSolving, ProblemGenerator } from "../ProblemApi";

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
  return ("x^2+" + (-s1 - s2) + "x+" + s1 * s2 + "=0").replaceAll("+-", "-");
};

class QuadraticEquation implements ProblemGenerator<EquationSolving> {
  key = "quadratic-equation";
  name = "Quadratic Equation";
  description = "Solve for x.";
  generate(): EquationSolving {
    const s1 = randomSolution([0]);
    const s2 = randomSolution([0, s1, -s1]);

    return new EquationSolving(
      generateEquation(s1, s2),
      `x=\\left\\{\\begin{matrix} ${s1}& \\\\ ${s2}& \\end{matrix}\\right.`
    );
  }
}

export default QuadraticEquation;
