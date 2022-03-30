import { ProblemGeneratorNg } from "../ProblemGeneratorSpi";
import { randomElement, randomElements, randomInt } from "../util/randomizer";

type PrimitiveTriple = [number, number, number];

const PRIMITIVE_TRIPLES: PrimitiveTriple[] = [
  [3, 4, 5],
  [5, 12, 13],
  [8, 15, 17],
  [7, 24, 25],
  [20, 21, 29],
];

const VALUES = ["a", "b", "c", "p", "q", "h"];

type RightTriangle = {
  [index: string]: number;
  a: number;
  b: number;
  c: number;
  p: number;
  q: number;
  h: number;
};

type Problem = {
  rightTriangle: RightTriangle;
  given: string[];
};

export const generateRightTriangle = (
  triple: PrimitiveTriple,
  pythFactor: number
): RightTriangle => {
  const [pi, hi, ai] = triple;
  const [p, h, a] = [
    pi * pi * pythFactor,
    hi * pi * pythFactor,
    ai * pi * pythFactor,
  ];
  const b = (a * h) / p;
  const q = (h * h) / p;
  const c = (p * p + h * h) / p;

  return {
    a,
    b,
    c,
    p,
    q,
    h,
  };
};

const sliceIntoChunks = (arr: any[], chunkSize: number) => {
  const res = [];
  for (let i = 0; i < arr.length; i += chunkSize) {
    const chunk = arr.slice(i, i + chunkSize);
    res.push(chunk);
  }
  return res;
};

const formatValues = (rightTriangle: RightTriangle, keys: string[]): string => {
  const values = sliceIntoChunks(keys, 2)
    .map((chunk) =>
      chunk.map((key) => `${key}&=${rightTriangle[key]}`).join(" & ")
    )
    .join(" \\\\ ");
  return `
\\begin{align*}
${values}
\\end{align*}
`;
};

const rightTriangle: ProblemGeneratorNg<Problem> = {
  key: "right-triangle",
  image: "right-triangle.svg",
  generate: () => {
    const triple = randomElement(PRIMITIVE_TRIPLES);
    const h = triple[1];
    const maxPythFactor = Math.ceil(600 / (h * h));
    const pythFactor = randomInt(1, maxPythFactor);
    return {
      rightTriangle: generateRightTriangle(triple, pythFactor),
      given: randomElements(VALUES, 2),
    };
  },
  format: (problem) => {
    return {
      description: formatValues(problem.rightTriangle, problem.given),
      solution: formatValues(
        problem.rightTriangle,
        VALUES.filter((k) => !problem.given.includes(k))
      ),
    };
  },
};

export default rightTriangle;
