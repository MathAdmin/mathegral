import { ProblemGenerator } from "../ProblemGeneratorSpi";
import { randomElement, randomInt } from "../util/randomizer";


interface Params {
  [index: string]: number;
  a: number;
  b: number;
  c: number;
  wa: number;
  wb: number;
  wc: number;
}

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
    const a = randomInt(1, 1000)/100;
    const b = randomInt(1, 1000)/100;
    const c = randomInt(1+Math.abs(b-a)*100, Math.abs(b+a)*100)/100;
    const wa = Math.round(Math.acos((a*a-c*c-b*b)/(2*c*b))*1000)/1000;
    const wb = Math.round(Math.acos((b*b-a*a-c*c)/(2*a*c))*1000)/1000;
    const wc = Math.round(Math.acos((c*c-a*a-b*b)/(2*a*b))*1000)/1000;
    

    const params = {
      a,
      b,
      c,
      wa,
      wb,
      wc
    };
    
    let remaining = ["a", "b", "c", "[\alpha]", "wb", "wc"];
    /*const [key1] = remaining.splice(randomInt(0, 6), 1);
    const [key2] = remaining.splice(randomInt(0, 5), 1);
    const [key3] = remaining.splice(randomInt(0, 4), 1);*/

    const [key1] = remaining.splice(0, 1);
    const [key2] = remaining.splice(0, 1);
    const [key3] = remaining.splice(0, 1);



    return {
      description: renderParams(params, [key1, key2,key3]),
      solution: renderParams(params, remaining),
    };
  },
};


export default sinTriangle;
