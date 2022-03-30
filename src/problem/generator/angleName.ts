import { ProblemGeneratorNg } from "../ProblemGeneratorSpi";
import { randomEnum } from "../util/randomizer";

// prettier-ignore
export enum Pair {
  NONE          = "NONE",
  LINEAR_PAIR   = "LINEAR_PAIR",   // Nebenwinkel (Supplementwinkel)
  VERTICAL      = "VERTICAL",      // Scheitelwinkel
  CORRESPONDING = "CORRESPONDING", // Stufenwinkel
  ALTERNATE     = "ALTERNATE",     // Wechselwinkel
  CONSECUTIVE   = "CONSECUTIVE",   // Entgegengesetzt liegende Winkel (Supplementwinkel)
  COMPLEMENTARY = "COMPLEMENTARY", // Komplementwinkel
  SUPPLEMENTARY = "SUPPLEMENTARY", // Supplementwinkel
}

// prettier-ignore
export enum Angle {
  alpha1,   alpha2,   alpha3,   alpha4,
  beta1,    beta2,    beta3,    beta4,
  gamma1,   gamma2,   gamma3,   gamma4,
  delta1,   delta2,   delta3,   delta4,
  epsilon1, epsilon2, epsilon3, epsilon4,
}

// prettier-ignore
const relations = [
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

export const relation = (angle1: Angle, angle2: Angle) => {
  if (angle1 > angle2) {
    return Object.values(Pair)[relations[angle2][angle1]];
  }
  return Object.values(Pair)[relations[angle1][angle2]];
};

// prettier-ignore
const greekangle = [
  "\\alpha_1",      "\\alpha_2",      "\\alpha_3",      "\\alpha_4",
  "\\beta_1",       "\\beta_2",       "\\beta_3",       "\\beta_4",
  "\\gamma_1",      "\\gamma_2",      "\\gamma_3",      "\\gamma_4",
  "\\delta_1",      "\\delta_2",      "\\delta_3",      "\\delta_4",
  "\\varepsilon_1", "\\varepsilon_2", "\\varepsilon_3", "\\varepsilon_4",
];

type Problem = {
  angle1: Angle;
  angle2: Angle;
};

const angleName: ProblemGeneratorNg<Problem> = {
  key: "angle-name",
  image: "angle_name.svg",
  generate: () => {
    const angle1 = randomEnum(Angle);
    const angle2 = randomEnum(Angle, (value) => value !== angle1);
    return {
      angle1: angle1 > angle2 ? angle2 : angle1,
      angle2: angle1 > angle2 ? angle1 : angle2,
    };
  },
  format: (problem, translate) => {
    const { angle1, angle2 } = problem;
    return {
      description: `${greekangle[angle1]} \\text{ , } ${greekangle[angle2]}`,
      solution: `\\text{${translate(
        "generator.angle-name.pair." + relation(angle1, angle2)
      )}}`,
    };
  },
};

export default angleName;
