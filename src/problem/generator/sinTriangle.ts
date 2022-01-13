import { alpha } from "@mui/material";
import { ProblemGenerator } from "../ProblemGeneratorSpi";
import { randomInt, randomEnum } from "../util/randomizer";

interface Params {
  [index: string]: number;
  a: number;
  b: number;
  c: number;
  walpha: number;
  wbeta: number;
  wgamma: number;
}

export const calculateParams = (triple: [number, number, number]): Params => {
  const a = 1;
  const b = 2;
  const c = 3;
  const walpha = 4;
  const wbeta = 5;
  const wgamma = 6;

  return {
    a,
    b,
    c,
    walpha,
    wbeta,
    wgamma,
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
  const values = sliceIntoChunks(keys, 3)
    .map((chunk) => chunk.map((key) => `${key}&=${params[key]}`).join(" & "))
    .join(" \\\\ ");
  return `
\\begin{align*}
${values}
\\end{align*}
`;
};

const sinTriangle: ProblemGenerator = {
  key: "sin-triangle",
  image: "sin-triangle.svg",
  generate: () => {
    const params = calculateParams([0,0,0]);
    let remaining = ["a", "b", "c", "walpha", "wbeta", "wgamma"];
    const [key1] = remaining.splice(randomInt(0, 6), 1);
    const [key2] = remaining.splice(randomInt(0, 5), 1);
    const [key3] = remaining.splice(randomInt(0, 4), 1);
    return {
      description: renderParams(params, [key1, key2,key3]),
      solution: renderParams(params, remaining),
    };
  },
};

export default sinTriangle;
