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

interface Params2 {
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
  var s2 = 0;
  var s3 = 0;
  var w1 = 0;
  var w2 = 0;
  var w3 = 0;

  switch (variant) {
    case Variant.SSS:
      // 1<Si<5 -> Sa+Sb <10
      s1 = parseFloat((1+Math.random()*4).toPrecision(3));
      s2 = parseFloat((1+Math.random()*4).toPrecision(3));
      s3 = parseFloat((1+Math.random()*4).toPrecision(3));
      if ((s1+s2>s3) && (s1+s3>s2) && (s2+s3>s1)) {
        w1 = Math.floor((Math.acos((s2*s2+s3*s3-s1*s1)/(2*s2*s3)))*1000)/1000;
        w2 = Math.floor(Math.acos((s1*s1+s3*s3-s2*s2)/(2*s1*s3))*1000)/1000;
        w3 = Math.floor(Math.acos((s2*s2+s1*s1-s3*s3)/(2*s2*s1))*1000)/1000;
      }
      break;
    case Variant.SSW:
      s1 = 112;
      break;
    case Variant.SWW:
      s1 = 122;
      break;
    case Variant.WWW:
      w1 = parseFloat((Math.random()*Math.PI).toPrecision(3));
      w2 = parseFloat((Math.random()*(Math.PI-w1)).toPrecision(3));
      w3 = parseFloat((Math.PI-w1-w2).toPrecision(3));
  };
  


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

const renderParamsDescription = (params: Params, keys: string[]): string => {
  const values = sliceIntoChunks(keys, 3)
    .map((chunk) => chunk.map((key) => `${key}&=${params[key]}`).join(" & "))
    .join(" \\\\ ");
    return `
    \\begin{align*}
    ${values}
    \\end{align*}
    `;
};

const renderParamsSolution = (params: Params, keys: string[]): string => {
  const values = sliceIntoChunks(keys, 3)
    .map((chunk) => chunk.map((key) => `${key}&=${params[key]}`).join(" & "))
    .join(" \\\\ ");
  if (params.w1+params.w2+params.w3=== 0){
    return `\\mathbb{L}=\\{\\}`
    } else if (params.s1+params.s2+params.s3=== 0){
      return `s1\\in \\mathbb{R} \\\\ s2\\in \\mathbb{R} \\\\ s3\\in \\mathbb{R} `
      } else {
    return `
    \\begin{align*}
    ${values}
    \\end{align*}
    `;
  }
};

const sinTriangle: ProblemGenerator = {
  key: "sin-triangle",
  image: "sin-triangle.svg",
  generate: () => {

    var variant = randomEnum(Variant);
    variant=3;
    const params = startParams(variant);
    let remaining = ["s1", "s2", "s3", "w1", "w2", "w3"];
       
    switch (variant){
      case Variant.SSS:
      return {
        description: renderParamsDescription(params, ["s1", "s2","s3"]),
        solution: renderParamsSolution(params, ["w1", "w2","w3"]),
      };
      default:
      return {
        description: renderParamsDescription(params, ["w1", "w2","w3"]),
        solution: renderParamsSolution(params, ["s1", "s2","s3"]),
        }; 
    }
  },
};

export default sinTriangle;
