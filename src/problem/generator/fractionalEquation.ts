import { ProblemGenerator } from "../ProblemGeneratorSpi";
import { randomInt } from "../util/randomizer";
import { calculategcd } from "../util/commonDivisor";
import { fracTex } from "../util/texGenerator";

type FractionalTerm = {
  a: number;
  b: number;
  c: number;
  d: number;
}

type SolPol = {
  x: number;
  xtex: string;
}

type Params = {
  terms: FractionalTerm[];
  solutions: SolPol[];
  pols: SolPol[];
  solcount: number;
  polcount: number;
}


export const calculateParameter = (level:number):Params => {

var solcounter = 0; var sol1 = 999; var soltex1 =``;
var polcounter = 0; var pol1 = 999; var poltex1 =``;
var pol2 = 999; var poltex2 =``;
var b1 =999; var c1 = 999; var d1 = 999;
var b2 =999; var c2 = 999; var d2 = 999;

switch(level){
case 1:
// Level 1  (New Levels will come!)
c1 = randomInt(-9, 10, (value) => value !== 0);
d1 = randomInt(-9, 10, (value) => value !== 0);
c2 = randomInt(-9, 10, (value) => value !== 0);
d2 = randomInt(-9, 10, (value) => ![0, d1].includes(value));
sol1 = randomInt(-9, 10, (value) => ![-d2/c2, -d1/c1].includes(value));
var factor12 = randomInt(-9, 10, (value) => value !== 0);
var below1 = (c1 * sol1) + d1;
var below2 = (c2 * sol1) + d2;
b1 = -1*(below1*factor12)/calculategcd([below1,below2]);
b2 = (below2*factor12)/calculategcd([below1,below2]);  
pol1 = -d1/c1;
poltex1 = fracTex(-d1,c1);
pol2 = -d2/c2;
poltex2 = fracTex(-d2,c2);

if (c1*d2===c2*d1){
  sol1 = 999;
  soltex1 = `999`;
  if (b1*d2===-1*b2*d1){
    solcounter = 999;
    polcounter = 1;
  } else {
    solcounter = 0;
    polcounter = 1;
  }
} else {
  solcounter = 1;
  polcounter = 2;
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

  let params: Params = { 
    terms: [{a:999, b: b1, c: c1, d: d1 },
      {a:999, b: b2, c: c2, d: d2 }],
    solutions: [{x: sol1, xtex: soltex1}],
    pols: [{x: pol1, xtex: poltex1},{x: pol2, xtex: poltex2}],
    solcount: solcounter,
    polcount: polcounter
  };

  return params
};

export const renderEquation = (params: Params,level:number) => {
  const b1 = params.terms[0].b;
  const c1 = params.terms[0].c;
  const d1 = params.terms[0].d;
  const b2 = params.terms[1].b;
  const c2 = params.terms[1].c;
  const d2 = params.terms[1].d;
  
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

  const solcounter = params.solcount;
  const polcounter = params.polcount;
  const sol1 = params.solutions[0].x;

  const poltex1 = params.pols[0].xtex;
  const poltex2 = params.pols[1].xtex;

  
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
      polListe = `${poltex1};${poltex2};999`;
      break;
    case 4:
      polListe = `${poltex1};${poltex2};999;999`;
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
      solListe = `\\{${sol1};999\\}`;
      break;
    case 3:
      solListe = `\\{${sol1};999;999\\}`;
      break;
    case 4:
      solListe = `\\{${sol1};999;999;999\\}`;
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
    //var level = randomInt(1,6);
    var level = 1;
    var params = calculateParameter(level);
    
    return {
      description: renderEquation(params,level),
      solution: renderSolution(params,level),
      };
  },
};

export default fractionalEquation;
