import { ProblemGenerator } from "../ProblemGeneratorSpi";
import { randomInt } from "../util/randomizer";
import { calculategcd } from "../util/commonDivisor";
import { fracTex } from "../util/texGenerator";

interface Params {
    [index: number]: any[];
}


export const calculateParameter = (level:number):Params => {
  var solcounter = 999;
  var polcounter = 999;
  var sol1 = 999 ; var sol2 = 999; var sol3 = 999; var sol4 = 999;
  var pol1 = 999; var pol2 = 999; var pol3 = 999; var pol4 = 999;
  var soltex1 = `` ; var soltex2 = ``; var soltex3 = ``; var soltex4 = ``;
  var poltex1 = ``; var poltex2 = ``; var poltex3 = ``; var poltex4 = ``;
  var a1 = 999; var a2 = 999; var a3 = 999; var a4 = 999;
  var b1 = 999; var b2 = 999; var b3 = 999; var b4 = 999;
  var c1 = 999; var c2 = 999; var c3 = 999; var c4 = 999;
  var d1 = 999; var d2 = 999; var d3 = 999; var d4 = 999;

switch(level){
case 1:
// Erste Stufe
var c1 = randomInt(-9, 10, (value) => value !== 0);
var d1 = randomInt(-9, 10, (value) => value !== 0);
var c2 = randomInt(-9, 10, (value) => value !== 0);
var d2 = randomInt(-9, 10, (value) => ![0, d1].includes(value));
var sol1 = randomInt(-9, 10, (value) => ![-d2/c2, -d1/c1].includes(value));
var factor12 = randomInt(-9, 10, (value) => value !== 0);
var below1 = (c1 * sol1) + d1;
var below2 = (c2 * sol1) + d2;
var b1 = -1*(below1*factor12)/calculategcd([below1,below2]);
var b2 = (below2*factor12)/calculategcd([below1,below2]);  

if (c1*d2===c2*d1){
  if (b1*d2===-1*b2*d1){
    solcounter = 999;
    polcounter = 1;
    sol1 = 999;
    soltex1 = fracTex(sol1,1);
    pol1 = -d1/c1;
    poltex1 = fracTex(-d1,c1); 
  } else {
    solcounter = 0;
    polcounter = 1;
    sol1 = 999;
    soltex1 = fracTex(sol1,1);
    pol1 = -d1/c1;
    poltex1 = fracTex(-d1,c1);
  }
} else {
  solcounter = 1;
  polcounter = 2;
  pol1 = -d1/c1;
  poltex1 = fracTex(-d1,c1);
  pol2 = -d2/c2;
  poltex2 = fracTex(-d2,c2);
}
break;

case 2:
// Zweite Stufe 
break;

case 3:
// Dritte Stufe 
break;

case 4:
// Vierte Stufe
break;

case 5:
// Fünfte Stufe 
}
  
  var counter =[solcounter,polcounter];
  var frac1 = [a1,b1,c1,d1];
  var frac2 = [a2,b2,c2,d2];
  var frac3 = [a3,b3,c3,d3];
  var frac4 = [a4,b4,c4,d4];
  var sol = [sol1,sol2,sol3,sol4];
  var pol = [pol1,pol2,pol3,pol4];
  var soltex = [soltex1,soltex2,soltex3,soltex4];
  var poltex = [poltex1,poltex2,poltex3,poltex4];
  
  let params:Params = [counter,frac1,frac2,frac3,frac4,sol,pol,soltex,poltex];
  return params
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

export const renderSolution = (params: Params,level:number) => {
  const solcounter = params[0][0];
  const polcounter = params[0][1];
  const sol1 = params[5][0];
  const sol2 = params[5][1];
  const sol3 = params[5][2];
  const sol4 = params[5][3];
  const poltex1 = params[8][0];
  const poltex2 = params[8][1];
  const poltex3 = params[8][2];
  const poltex4 = params[8][3];




  
  var solString =`\\begin{aligned} \\mathbb{P}&= \\{`;
  var polListe =``;

  switch (polcounter){
    case 1:
      polListe = `${poltex1}`;
      break;
    case 2:
      polListe = `${poltex1};${poltex2}`;
      break;
    case 3:
      polListe = `${poltex1};${poltex2};${poltex3}`;
      break;
    case 4:
      polListe = `${poltex1};${poltex2};${poltex3};${poltex4}`;
      break;
    case 999:
      polListe =``;
  }

  solString = solString + polListe + `\\} \\\\ \\mathbb{L}&=`;

  var solListe =``;
  switch (solcounter){
    case 0:
      solListe = `\\{\\}`;
      break;
    case 1:
      solListe=`\\{ ${sol1}\\}`;
      break;
    case 2:
      solListe = `\\{${sol1};${sol2}\\}`;
      break;
    case 3:
      solListe = `\\{${sol1};${sol2};${sol3}\\}`;
      break;
    case 4:
      solListe = `\\{${sol1};${sol2};${sol3};${sol4}\\}`;
      break;
    case 999:
      solListe = `\\mathbb{R} - \\{${polListe}\\}`;
  }

  solString = solString + solListe + `\\\\  \\end{aligned}`;   
  return solString
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
