import { ProblemGenerator } from "../ProblemGeneratorSpi";
import { randomInt } from "../util/randomizer";

let relations = [
  [0,1,2,1, 3,7,4,5, 3,5,4,7, 0,7,0,7, 0,6,0,6],
  [0,0,1,2, 7,3,5,4, 5,3,7,4, 7,0,7,0, 0,0,0,0],
  [0,0,0,1, 4,5,3,7, 4,7,3,5, 0,7,0,7, 0,6,0,6],
  [0,0,0,0, 5,4,7,3, 7,4,5,3, 7,0,7,0, 0,0,0,0],

  [0,0,0,0, 0,1,2,1, 0,7,0,7, 3,5,4,7, 0,6,0,6],
  [0,0,0,0, 0,0,1,2, 7,0,7,0, 5,3,7,4, 0,0,0,0],
  [0,0,0,0, 0,0,0,1, 0,7,0,7, 4,7,3,5, 0,6,0,6],
  [0,0,0,0, 0,0,0,0, 7,0,7,0, 7,4,5,3, 0,0,0,0],
  
  [0,0,0,0, 0,0,0,0, 0,1,2,1, 3,7,4,5, 0,6,0,6],
  [0,0,0,0, 0,0,0,0, 0,0,1,2, 7,3,5,4, 0,0,0,0],
  [0,0,0,0, 0,0,0,0, 0,0,0,1, 4,5,3,7, 0,6,0,6],
  [0,0,0,0, 0,0,0,0, 0,0,0,0, 5,4,7,3, 0,0,0,0],
  
  [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,1,2,1, 0,6,0,6],
  [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,1,2, 0,0,0,0],
  [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,1, 0,6,0,6],
  [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0],
  
  [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0, 0,1,2,1],
  [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,1,2],
  [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,1],
  [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0],
];

let greekangle = [
  "\\alpha_1","\\alpha_2","\\alpha_3","\\alpha_4",
  "\\beta_1","\\beta_2","\\beta_3","\\beta_4",
  "\\gamma_1","\\gamma_2","\\gamma_3","\\gamma_4",
  "\\delta_1","\\delta_2","\\delta_3","\\delta_4",
  "\\varepsilon_1","\\varepsilon_2","\\varepsilon_3","\\varepsilon_4"]

  let pair = [
    "0: Keine Bezeichnung / Pas de nom / No name",
    "1: Nebenwinkel (Supplementwinkel) / Supplémentaires adjacents / Supplementary adjacent",
    "2: Scheitelwinkel / Opposés par le sommet / Vertically opposed",
    "3: Stufenwinkel / Correspondants / Corresponding",
    "4: Wechselwinkel / Alternés / Alternate",
    "5: Entgegengesetzt liegende Winkel (Supplementwinkel) / Opposés / Opposed",
    "6: Komplementwinkel / Complémentaires / Complementary",
    "7: Supplementwinkel / Supplémentaires / Supplementary" 
    ]


const angleName: ProblemGenerator = {
  key: "angle-name",
  image: "angle_name.svg",
  generate: () => {
    const x = randomInt(0, 18);
    const y = randomInt(x+1, 19);
    return {
      description: `${greekangle[x]} \\text{ , } ${greekangle[y]}`,
      solution: `\\text{${pair[relations[x][y]]}}`,
    };
  },
};

export default angleName;
