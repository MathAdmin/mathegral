import { alpha } from "@mui/material";
import { ProblemGenerator } from "../ProblemGeneratorSpi";
import { randomInt, randomEnum } from "../util/randomizer";

interface Params {
  [index: string]: number;
  s1: number;
  s2: number;
  s3: number;
  w1: number;
  w2: number;
  w3: number;
}

enum Variant {
  SSS,
  SSW,
  SWW,
  WWW
}

export const startParams = (variant:Variant): Params => {
  var s1 = 0;
  switch (variant) {
    case Variant.SSS:
      s1 = 111;
      break;
    case Variant.SSW:
      s1 = 112;
      break;
    case Variant.SWW:
      s1 = 122;
      break;
    case Variant.WWW:
      s1 = 222;
  };
  
  const s2 = 2;
  const s3 = 3;
  const w1 = 4;
  const w2 = 5;
  const w3 = 6;

  return {
    s1,
    s2,
    s3,
    w1,
    w2,
    w3,
  };
};

export const calculateParams = (params: Params): Params => {
  const s1 = 1;
  const s2 = 2;
  const s3 = 3;
  const w1 = 4;
  const w2 = 5;
  const w3 = 6;

  return {
    s1,
    s2,
    s3,
    w1,
    w2,
    w3,
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

    const variant = randomEnum(Variant);
    const params = startParams(variant);
    let remaining = ["s1", "s2", "s3", "w1", "w2", "w3"];
    
    //const [key1] = remaining.splice(0, 1);
    //const [key2] = remaining.splice(0, 1);
    //const [key3] = remaining.splice(0, 1);
    
    return {
      description: renderParams(params, ["w1", "w2","w3"]),
      solution: renderParams(params, ["s1", "s2","s3"]),
    };
  },
};

export default sinTriangle;
