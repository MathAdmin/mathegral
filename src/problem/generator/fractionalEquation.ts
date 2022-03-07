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
var solcounter = 0; var polcounter = 0;

var sol1 = 999; var sol2 = 999; var sol3 = 999; var sol4 = 999;
var soltex1 =``; var soltex2 =``; var soltex3 =``; var soltex4 =``;

var pol1 = 999; var pol2 = 999; var pol3 = 999; var pol4 = 999;
var poltex1 =``; var poltex2 =``; var poltex3 =``; var poltex4 =``;

var a1 = 999; var b1 = 999; var c1 = 999; var d1 = 999;
var a2 = 999; var b2 = 999; var c2 = 999; var d2 = 999;
var a3 = 999; var b3 = 999; var c3 = 999; var d3 = 999;
var a4 = 999; var b4 = 999; var c4 = 999; var d4 = 999;


switch(level){
case 1:
// Level 1  (New Levels will come!)
c1 = randomInt(-9, 10, (value) => value !== 0);
d1 = randomInt(-9, 10, (value) => value !== 0);
c2 = randomInt(-9, 10, (value) => value !== 0);
d2 = randomInt(-9, 10, (value) => ![0, d1].includes(value));

sol1 = randomInt(-9, 10, (value) => ![0,-d2/c2, -d1/c1].includes(value));
var factor12 = randomInt(-9, 10, (value) => value !== 0);
var below1 = (c1 * sol1) + d1;
var below2 = (c2 * sol1) + d2;
b1 = -1*(below1*factor12)/calculategcd([below1,below2]);
b2 = (below2*factor12)/calculategcd([below1,below2]);  
pol1 = -d1/c1;
soltex1 = fracTex(sol1,1);
poltex1 = fracTex(-d1,c1);
pol2 = -d2/c2;
poltex2 = fracTex(-d2,c2);

if (pol1===pol2){
  solcounter = 999;
  polcounter = 1;
} else {
  solcounter = 1;
  polcounter = 2;
}
break;

case 2:
// Zweite Stufe 
c1 = randomInt(-9, 10, (value) => value !== 0);
d1 = randomInt(-9, 10, (value) => value !== 0);
c2 = randomInt(-9, 10, (value) => value !== 0);
d2 = randomInt(-9, 10, (value) => ![0, d1].includes(value));
c3 = randomInt(-9, 10, (value) => value !== 0);
d3 = randomInt(-9, 10, (value) => ![0, d1,d2].includes(value));
sol1 = randomInt(-9, 10, (value) => ![0,-d1/c1, -d2/c2, -d3/c3,-(d2-d1)/(c2-c1),-(d3-d1)/(c3-c1),-(d3-d2)/(c3-c2)].includes(value));
//below1!=below2!=below3

var below1 = (c1 * sol1) + d1;
var below2 = (c2 * sol1) + d2;
var below3 = (c3 * sol1) + d3;

//Cross product
var above1 = below1*(below3-below2);
var above2 = below2*(below1-below3);
var above3 = below3*(below2-below1);

// Simplify
var simplgcd = calculategcd([above1,above2,above3]);
b1 = above1/simplgcd;
b2 = above2/simplgcd;
b3 = above3/simplgcd;

// Other solution
soltex1 = fracTex(sol1,1);
sol2 = (b1*d2*d3+b2*d1*d3+b3*d1*d2)/(sol1*(b1*c2*c3+b2*c1*c3+b3*c1*c2));
soltex2 = fracTex(b1*d2*d3+b2*d1*d3+b3*d1*d2,sol1*(b1*c2*c3+b2*c1*c3+b3*c1*c2));

// Singularity
pol1 = -d1/c1;
poltex1 = fracTex(-d1,c1);
pol2 = -d2/c2;
poltex2 = fracTex(-d2,c2);
pol3 = -d3/c3;
poltex3 = fracTex(-d3,c3);

// Determinate solcounter(#solutions) and polcounter(#singularities)
if (pol1===pol2){
  if (pol2===pol3){
    solcounter = 999;
    polcounter = 1;  
  } else {
    pol2 = pol3;
    poltex2 = poltex3;
    solcounter = 1;
    polcounter = 2;
  }
} else {
  if (pol2===pol3){
    solcounter = 1;
    polcounter = 2;  
  } else {
    if (pol1===pol3){
      solcounter = 1;
      polcounter = 2;
    } else {
      if (sol1===sol2){
        solcounter = 1;
        polcounter = 3;  
      } else {
        solcounter = 2;
        polcounter = 3;
      }
    }
  }
}

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
    terms: [{a:a1, b: b1, c: c1, d: d1 },
      {a:a2, b: b2, c: c2, d: d2 },
      {a:a3, b: b3, c: c3, d: d3 },
      {a:a4, b: b4, c: c4, d: d4 }],
    solutions: [{x: sol1, xtex: soltex1},{x: sol2, xtex: soltex2},{x: sol3, xtex: soltex3},{x: sol4, xtex: soltex4}],
    pols: [{x: pol1, xtex: poltex1},{x: pol2, xtex: poltex2},{x: pol3, xtex: poltex3},{x: pol4, xtex: poltex4}],
    solcount: solcounter,
    polcount: polcounter
  };

  return params
};

export const renderEquation = (params: Params,level:number) => {
  const a1 = params.terms[0].a;
  const b1 = params.terms[0].b;
  const c1 = params.terms[0].c;
  const d1 = params.terms[0].d;
  
  const a2 = params.terms[1].a;
  const b2 = params.terms[1].b;
  const c2 = params.terms[1].c;
  const d2 = params.terms[1].d;

  const a3 = params.terms[2].a;
  const b3 = params.terms[2].b;
  const c3 = params.terms[2].c;
  const d3 = params.terms[2].d;

  const a4 = params.terms[3].a;
  const b4 = params.terms[3].b;
  const c4 = params.terms[3].c;
  const d4 = params.terms[3].d;


  
  var textEquation=``;
  switch (level){
    case 1:
      textEquation = `\\frac{${b1}}{${c1}x+${d1}}+\\frac{${b2}}{${c2}x+${d2}}=0`;
    break;
    case 2:
      textEquation = `\\frac{${b1}}{${c1}x+${d1}}+\\frac{${b2}}{${c2}x+${d2}}+\\frac{${b3}}{${c3}x+${d3}}=0`;
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
  
  const soltex1 = params.solutions[0].xtex;
  const soltex2 = params.solutions[1].xtex;
  const soltex3 = params.solutions[2].xtex;
  const soltex4 = params.solutions[3].xtex;

  const poltex1 = params.pols[0].xtex;
  const poltex2 = params.pols[1].xtex;
  const poltex3 = params.pols[2].xtex;
  const poltex4 = params.pols[3].xtex;
  

  
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
      solListe=`\\{ ${soltex1}\\}`;
      break;
    case 2:
      solListe = `\\{${soltex1};${soltex2}\\}`;
      break;
    case 3:
      solListe = `\\{${soltex1};${soltex2};${soltex3}\\}`;
      break;
    case 4:
      solListe = `\\{${soltex1};${soltex2};${soltex3};${soltex4}\\}`;
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
    var level = randomInt(1,3);
    var params = calculateParameter(level);
    
    return {
      description: renderEquation(params,level),
      solution: renderSolution(params,level),
      };
  },
};

export default fractionalEquation;
