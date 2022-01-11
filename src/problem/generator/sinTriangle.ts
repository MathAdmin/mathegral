import { ProblemGenerator } from "../ProblemGeneratorSpi";
import { randomInt } from "../util/randomizer";
//import { randomElement, randomInt } from "../util/randomizer";

interface Params {
  [index: string]: number;
  a: number;
  b: number;
  c: number;
  alpha: number;
  beta: number;
  gamma: number;
}

const sliceIntoChunks = (arr: any[], chunkSize: number) => {
  const res = [];
  for (let i = 0; i < arr.length; i += chunkSize) {
    const chunk = arr.slice(i, i + chunkSize);
    res.push(chunk);
  }
  return res;
};

const renderDescription= (params: Params, keys: string[]): string => {
  const values = sliceIntoChunks(keys, 3)
  .map((chunk) => chunk.map((key) => `${key.replaceAll("alpha", "\\alpha").replaceAll("beta", "\\beta").replaceAll("gamma", "\\gamma")}&=${params[key]}`).join(" & "))
  .join(" \\\\ ");
  return `
  \\begin{align*}
  ${values}
  \\end{align*}
  `;
};

const renderSolution = (params: Params, keys: string[]): string => {
  if (params.a===0){
    return `a \\in \\mathbb{R} , b \\in \\mathbb{R}c \\in \\mathbb{R}` ;
  } else if (params.alpha===0){
      return `\\mathbb{L}={}` ;
  } else {
    const values = sliceIntoChunks(keys, 3)
      .map((chunk) => chunk.map((key) => `${key.replaceAll("alpha", "\\alpha").replaceAll("beta", "\\beta").replaceAll("gamma", "\\gamma")}&=${params[key]}`).join(" & "))
      .join(" \\\\ ");
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
    var a = randomInt(1, 1000)/100;
    var b = randomInt(1, 1000)/100;
    var c = randomInt(1+Math.abs(b-a)*100, Math.abs(b+a)*100)/100;
    var alpha = Math.round(Math.acos((a*a-c*c-b*b)/(2*c*b))*1000)/1000;
    var beta = Math.round(Math.acos((b*b-a*a-c*c)/(2*a*c))*1000)/1000;
    var gamma = Math.round(Math.acos((c*c-a*a-b*b)/(2*a*b))*1000)/1000;
    
        
    let remaining = ["a", "b", "c", "alpha", "beta", "gamma"];
    /*const [key1] = remaining.splice(randomInt(0, 6), 1);
    const [key2] = remaining.splice(randomInt(0, 5), 1);
    const [key3] = remaining.splice(randomInt(0, 4), 1);*/

    const [key1] = remaining.splice(0, 1);
    const [key2] = remaining.splice(0, 1);
    const [key3] = remaining.splice(0, 1);

    //const caselength = key1.length*key2.length*key3.length;
    const caselength = 1;

    // Case SSS
    if (caselength===1){
      const randomseite = randomInt(0,2);
      switch (randomseite) {
        case 0:
          a = (b+c)*(1+Math.random());
          alpha = 0;
          beta = 0;
          gamma = 0;
          break;
        case 1:
          b = (a+c)*(1+Math.random());
          alpha = 0;
          beta = 0;
          gamma = 0;
          break;
        case 2:
          c = (a+b)*(1+Math.random());
          alpha = 0;
          beta = 0;
          gamma = 0;
          break;
      }
    // Case WWW
    } else if (caselength===100){
      a = 0;
      b = 0;
      c = 0;
    } 
    
    const params = {
      a,
      b,
      c,
      alpha,
      beta,
      gamma
    };

    return {
      description: renderDescription(params, [key1, key2,key3]),
      solution: renderSolution(params, remaining),
    };
  },
};


export default sinTriangle;
