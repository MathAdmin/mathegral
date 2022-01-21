import { ProblemGenerator } from "../ProblemGeneratorSpi";
import { randomInt } from "../util/randomizer";
import { calculategcd } from "../util/commonDivisor";
import { SortByAlpha } from "@mui/icons-material";


interface Params {
    [index: number]: any[];
}


export const calculateParameter = (level:number):Params => {
  
  // Erste Stufe
  var solcounter = 999;
  var polcounter = 999;
  var sol1 = 999;
  var pol1 = 999;
  var pol2 =999;
  
  var c1 = randomInt(-9, 10, (value) => value !== 0);
  var d1 = randomInt(-9, 10, (value) => value !== 0);
  var c2 = randomInt(-9, 10, (value) => value !== 0);
  var d2 = randomInt(-9, 10, (value) => ![0, d1].includes(value));
  c1=1;d1=1;c2=2;d2=2;
  var sol1 = randomInt(-9, 10, (value) => ![-d2/c2, -d1/c1].includes(value));

  var factor12 = randomInt(-9, 10, (value) => value !== 0);
  var below1 = (c1 * sol1) + d1;
  var below2 = (c2 * sol1) + d2;

  var b1 = -1*(below1*factor12)/calculategcd([below1,below2]);
  var b2 = (below2*factor12)/calculategcd([below1,below2]);  

  if (c1*d2===c2*d1){
    if (b1*d2===-1*b2*d1){
      solcounter = -1;
      polcounter = 1;
      sol1 = 999;
      pol1 = -d1/c1;
    } else {
      solcounter = 0;
      polcounter = 1;
      sol1 = 999;
      pol1 = -d1/c1;
    }
  } else {
    solcounter = 1;
    polcounter = 2;
    pol1 = -d1/c1;
    pol1 = -d2/c2;

  }

  var counter =[solcounter,polcounter];
  var frac1 = [0,b1,c1,d1];
  var frac2 = [0,b2,c2,d2];
  var frac3 = [0,0,0,0];
  var frac4 = [0,0,0,0];
  var sol = [sol1,0,0,0];
  var pol = [pol1,pol2,0,0];
  
  let params:Params = [counter,frac1,frac2,frac3,frac4,sol,pol];

  return params
};

export const noSolution = ():string => {
  return  `
        \\begin{aligned}
        \\mathbb{L}&=\\{\\} \\\\
        \\end{aligned}   
        `
};

export const oneSolution = (params: Params,level:number):string => {
  const sol1 = params[5][0];
  return  `
  \\begin{aligned}
  x&=${sol1} \\\\
  \\end{aligned}   
  `
};

export const twoSolution = (params: Params,level:number):string => {
  const sol1 = params[5][0];
  const sol2 = params[5][1];
  return  `
  \\begin{aligned}
  x&=\\begin{cases} ${sol1} \\\\ ${sol2} \\end{cases}
  \\end{aligned}   
  `
};

export const threeSolution = (params: Params,level:number):string => {
  const sol1 = params[5][0];
  const sol2 = params[5][1];
  const sol3 = params[5][2];
  return  `
  \\begin{aligned}
  x&=\\begin{cases} ${sol1} \\\\ ${sol2} \\\\ ${sol3} \\end{cases}
  \\end{aligned}   
  `
};

export const fourSolution = (params: Params,level:number):string => {
  const sol1 = params[5][0];
  const sol2 = params[5][1];
  const sol3 = params[5][2];
  const sol4 = params[5][3];

  return  `
  \\begin{aligned}
  x&=\\begin{cases} ${sol1} \\\\ ${sol2} \\\\ ${sol3}  \\\\ ${sol4} \\end{cases}
  \\end{aligned}   
  `
};

export const infiniteSolution = (params: Params,level:number):string => {
  const pol1 = params[6][0];
  const pol2 = params[6][1];
  const pol3 = params[6][2];
  const pol4 = params[6][3];


  var polcounter = params[0][1];
  var polListe = ``;
  switch (polcounter){
    case 1:
    polListe = `${pol1}`;
    break;
    case 2:
    polListe = `${pol2},${pol2}`;
    break;
    case 3:
    polListe = `${pol1},${pol2},${pol3}`;
    break;
    case 4:
    polListe = `${pol1},${pol2},${pol3},${pol4}`;
  }

  return  `
        \\begin{aligned}
        \\mathbb{L}&=\\mathbb{R} - \\{${polListe}\\} \\\\
        \\end{aligned}   
        `
};




export const renderEquation = (params: Params,level:number) => {

  const b1 = params[1][1];
  const c1 = params[1][2];
  const d1 = params[1][3];
  const b2 = params[2][1];
  const c2 = params[2][2];
  const d2 = params[2][3];
  const b3 = params[3][1];
  const c3 = params[3][2];
  const d3 = params[3][3];
  const b4 = params[4][1];
  const c4 = params[4][2];
  const d4 = params[4][3];

  var textEquation=``;
  switch (level){
    case 1:
      textEquation = `\\frac{${b1}}{${c1}x+${d1}}+\\frac{${b2}}{${c2}x+${d2}}=0`;
    break;
    case 2:
      textEquation = `\\frac{${b1}}{${c1}x+${d1}}+\\frac{${b2}}{${c2}x+${d2}}=0`;
    break;
    case 3:
      textEquation = `\\frac{${b1}}{${c1}x+${d1}}+\\frac{${b2}}{${c2}x+${d2}}=0`;
    break;
    case 4:
      textEquation = `\\frac{${b1}}{${c1}x+${d1}}+\\frac{${b2}}{${c2}x+${d2}}=0`;
    break;
    case 5:
      textEquation = `\\frac{${b1}}{${c1}x+${d1}}+\\frac{${b2}}{${c2}x+${d2}}=0`;
  }


  return textEquation
  .replaceAll("+-", "-")
  .replaceAll("{-1x", "{-x")
  .replaceAll("{1x", "{x");
};


export const renderSolutionalt = (params: Params,level:number) => {
  
  const solcounter = params[0][0];
  const polcounter = params[0][1];

  const frac1 = params[1];
  const frac2 = params[2];
  const frac3 = params[3];
  const frac4 = params[4];

  const sol1 = params[5][0];
  const sol2 = params[5][1];
  const sol3 = params[5][2];
  const sol4 = params[5][3];

  const pol1 = params[6][0];
  const pol2 = params[6][1];
  const pol3 = params[6][2];
  const pol4 = params[6][3];



  switch(level) {

    case 1:
      const b1 = frac1[1];
      const c1 = frac1[2];
      const d1 = frac1[3];
      const b2 = frac2[1];
      const c2 = frac2[2];
      const d2 = frac2[3];

    if (c1*d2===c2*d1){
      if (b1*d2===-1*b2*d1){
        return `
        \\begin{aligned}
        \\mathbb{L}&=\\mathbb{R} - \\{${-d1/c1}\\} \\\\
        \\end{aligned}   
        `
      } else {
        return `
        \\begin{aligned}
        \\mathbb{L}&=\\{\\} \\\\
        \\end{aligned}   
        `
      }


    } else{
      return `
      \\begin{aligned}
      \\mathbb{L}&=\\{${sol1}\\} \\\\
      \\end{aligned}   
      `
    }



    case 2:
    return `
    \\begin{aligned}
    x&=\\begin{cases} ${sol1} \\\\ ${sol2} \\end{cases}
    \\end{aligned}   
    `
    default:
      return `
      \\begin{aligned}
      x&=\\begin{cases} ${sol1} \\\\ ${sol2} \\end{cases}
      \\end{aligned}   
      `
  }
};


export const renderSolution = (params: Params,level:number) => {
  
  const solcounter = params[0][0];
  const polcounter = params[0][1];

  switch(solcounter) {
    case 0:
      return noSolution()
    case 1:
      return oneSolution(params,level)  
    case 2:
      return twoSolution(params,level) 
    case 3:
      return threeSolution(params,level)
    case 4:
      return fourSolution(params,level)
    default:
      return infiniteSolution(params,level)
  }
};




const fractionalEquation: ProblemGenerator = {
  key: "fractional-equation",
  generate: () => {
    var level = randomInt(1,6);
    level = 1;
    var params = calculateParameter(level);
    
    return {
      description: renderEquation(params,level),
      solution: renderSolution(params,level),
      };
  },
};

export default fractionalEquation;
