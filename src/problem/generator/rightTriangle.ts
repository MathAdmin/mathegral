import { ProblemGenerator } from "../ProblemGeneratorSpi";
import { randomElement, randomInt } from "../util/randomizer";

const primitiveTriples: [number, number, number][] = [
  [3, 4, 5],
  [5, 12, 13],
  [8, 15, 17],
  [7, 24, 25],
  /*[12, 35, 37],
  [9, 40, 41],
  [11, 60, 61],
  [28, 45, 53],
  [20, 21, 29],
  [16, 63, 65],
  [33, 56, 65],
  [48, 55, 73],
  [13, 84, 85],
  [36, 77, 85],
  [39, 80, 89],
  [65, 72, 97],*/
];

interface Params {
  [index: string]: number;
  a: number;
  b: number;
  c: number;
  p: number;
  q: number;
  h: number;
}

export const calculateParams = (triple: [number, number, number]): Params => {
  const [pi, hi, ai] = triple;
  const maxside = 100;
  const maxfactor = Math.ceil(maxside/(pi*pi));
  const factor = randomInt(1,maxfactor);
  const [p, h, a] = [pi * pi * factor, hi * pi * factor , ai * pi * factor];
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

const renderParams = (params: Params, keys: string[]): string => {
  const values = sliceIntoChunks(keys, 2)
    .map((chunk) => chunk.map((key) => `${key}&=${params[key]}`).join(" & "))
    .join(" \\\\ ");
  return `
\\begin{align*}
${values}
\\end{align*}
`;
};

const rightTriangle: ProblemGenerator = {
  key: "right-triangle",
  image: "right-triangle.svg",
  generate: () => {
    const params = calculateParams(randomElement(primitiveTriples));
    let remaining = ["a", "b", "c", "p", "q", "h"];
    const [key1] = remaining.splice(randomInt(0, 6), 1);
    const [key2] = remaining.splice(randomInt(0, 5), 1);
    return {
      description: renderParams(params, [key1, key2]),
      solution: renderParams(params, remaining),
    };
  },
};

export default rightTriangle;
