import { ProblemGenerator } from "../ProblemGeneratorSpi";
import { randomInt, randomEnum } from "../util/randomizer";

const Permutation: [string, string, string, string, string, string][] = [
  ["a", "b", "c", "\\alpha", "\\beta", "\\gamma"],
  ["b", "c", "a", "\\beta", "\\gamma", "\\alpha"],
  ["c", "a", "b", "\\gamma", "\\alpha", "\\beta"],
];

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
  s31: number;
  s32: number;
  w11: number;
  w12: number;
  w21: number;
  w22: number;
  w31: number;
  w32: number;
  multi: number;
}

enum Variant {
  SSS,
  SSW,
  SWW,
  WWW,
}

export const startParams = (variant: Variant): Params => {
  var s1 = 0;
  var s2 = 0;
  var s3 = 0;
  var w1 = 0;
  var w2 = 0;
  var w3 = 0;

  switch (variant) {
    case Variant.SSS:
      // 1<Si<5 -> Sa+Sb <10
      s1 = parseFloat((1 + Math.random() * 4).toPrecision(3));
      s2 = parseFloat((1 + Math.random() * 4).toPrecision(3));
      s3 = parseFloat((1 + Math.random() * 4).toPrecision(3));
      if (s1 + s2 > s3 && s1 + s3 > s2 && s2 + s3 > s1) {
        w1 =
          Math.floor(
            Math.acos((s2 * s2 + s3 * s3 - s1 * s1) / (2 * s2 * s3)) * 1000
          ) / 1000;
        w2 =
          Math.floor(
            Math.acos((s1 * s1 + s3 * s3 - s2 * s2) / (2 * s1 * s3)) * 1000
          ) / 1000;
        w3 =
          Math.floor(
            Math.acos((s2 * s2 + s1 * s1 - s3 * s3) / (2 * s2 * s1)) * 1000
          ) / 1000;
      }
      break;
    case Variant.SSW:
      s1 = parseFloat((1 + Math.random() * 4).toPrecision(3));
      s2 = parseFloat((1 + Math.random() * 4).toPrecision(3));
      break;

    case Variant.SWW:
      s1 = parseFloat((1 + Math.random() * 4).toPrecision(3));
      w1 = parseFloat((Math.random() * Math.PI).toPrecision(3));
      w2 = parseFloat((Math.random() * (Math.PI - w1)).toPrecision(3));
      w3 = parseFloat((Math.PI - w1 - w2).toPrecision(3));
      s2 = parseFloat(((Math.sin(w2) * s1) / Math.sin(w1)).toPrecision(3));
      s3 = parseFloat(((Math.sin(w3) * s1) / Math.sin(w1)).toPrecision(3));

      break;

    case Variant.WWW:
      w1 = parseFloat((Math.random() * Math.PI).toPrecision(3));
      w2 = parseFloat((Math.random() * (Math.PI - w1)).toPrecision(3));
      w3 = parseFloat((Math.PI - w1 - w2).toPrecision(3));
  }

  return {
    s1,
    s2,
    s3,
    w1,
    w2,
    w3,
  };
};

export const calculateParams = (
  s1: number,
  s2: number,
  knownAngle: number
): Params2 => {
  var s31 = 0;
  var s32 = 0;
  var w11 = 0;
  var w21 = 0;
  var w31 = 0;
  var w12 = 0;
  var w22 = 0;
  var w32 = 0;
  var multi = 1;
  var determinant = 0;

  const newAngle = parseFloat((Math.random() * Math.PI).toPrecision(3));
  switch (knownAngle) {
    case 1:
      w11 = newAngle;
      determinant = s1 * s1 - s2 * s2 * Math.sin(w11) * Math.sin(w11);
      if (determinant < 0) {
        multi = 0;
      } else if (determinant === 0) {
        s31 = parseFloat((s2 * Math.cos(w11)).toPrecision(3));
        w21 =
          Math.floor(
            Math.acos((s1 * s1 + s31 * s31 - s2 * s2) / (2 * s1 * s31)) * 1000
          ) / 1000;
        w31 =
          Math.floor(
            Math.acos((s2 * s2 + s1 * s1 - s31 * s31) / (2 * s2 * s1)) * 1000
          ) / 1000;
        multi = 1;
      } else {
        s31 = parseFloat(
          (s2 * Math.cos(w11) + Math.sqrt(determinant)).toPrecision(3)
        );
        if (s31 < 0) {
          s31 = 0;
          multi = 0;
        } else {
          w21 =
            Math.floor(
              Math.acos((s1 * s1 + s31 * s31 - s2 * s2) / (2 * s1 * s31)) * 1000
            ) / 1000;
          w31 =
            Math.floor(
              Math.acos((s2 * s2 + s1 * s1 - s31 * s31) / (2 * s2 * s1)) * 1000
            ) / 1000;
          s32 = parseFloat(
            (s2 * Math.cos(w11) - Math.sqrt(determinant)).toPrecision(3)
          );
          if (s32 < 0) {
            s32 = 0;
            multi = 1;
          } else {
            w22 =
              Math.floor(
                Math.acos((s1 * s1 + s32 * s32 - s2 * s2) / (2 * s1 * s32)) *
                  1000
              ) / 1000;
            w32 =
              Math.floor(
                Math.acos((s2 * s2 + s1 * s1 - s32 * s32) / (2 * s2 * s1)) *
                  1000
              ) / 1000;
            multi = 2;
          }
        }
      }

      break;
    case 2:
      w21 = newAngle;
      determinant = s2 * s2 - s1 * s1 * Math.sin(w21) * Math.sin(w21);
      if (determinant < 0) {
        multi = 0;
      } else if (determinant === 0) {
        s31 = parseFloat((s1 * Math.cos(w21)).toPrecision(3));
        w11 =
          Math.floor(
            Math.acos((s2 * s2 + s31 * s31 - s1 * s1) / (2 * s2 * s31)) * 1000
          ) / 1000;
        w31 =
          Math.floor(
            Math.acos((s2 * s2 + s1 * s1 - s31 * s31) / (2 * s2 * s1)) * 1000
          ) / 1000;
        multi = 1;
      } else {
        s31 = parseFloat(
          (s1 * Math.cos(w21) + Math.sqrt(determinant)).toPrecision(3)
        );
        if (s31 < 0) {
          s31 = 0;
          multi = 0;
        } else {
          w11 =
            Math.floor(
              Math.acos((s2 * s2 + s31 * s31 - s1 * s1) / (2 * s2 * s31)) * 1000
            ) / 1000;
          w31 =
            Math.floor(
              Math.acos((s2 * s2 + s1 * s1 - s31 * s31) / (2 * s2 * s1)) * 1000
            ) / 1000;
          s32 = parseFloat(
            (s1 * Math.cos(w21) - Math.sqrt(determinant)).toPrecision(3)
          );
          if (s32 < 0) {
            s32 = 0;
            multi = 1;
          } else {
            w12 =
              Math.floor(
                Math.acos((s2 * s2 + s32 * s32 - s1 * s1) / (2 * s2 * s32)) *
                  1000
              ) / 1000;
            w32 =
              Math.floor(
                Math.acos((s2 * s2 + s1 * s1 - s32 * s32) / (2 * s2 * s1)) *
                  1000
              ) / 1000;
            multi = 2;
          }
        }
      }

      break;

    case 3:
      w31 = newAngle;
      s31 = parseFloat(
        Math.sqrt(s1 * s1 + s2 * s2 - 2 * s1 * s2 * Math.cos(w31)).toPrecision(
          3
        )
      );
      w11 =
        Math.floor(
          Math.acos((s2 * s2 + s31 * s31 - s1 * s1) / (2 * s2 * s31)) * 1000
        ) / 1000;
      w21 =
        Math.floor(
          Math.acos((s1 * s1 + s31 * s31 - s2 * s2) / (2 * s1 * s31)) * 1000
        ) / 1000;
      break;
    default:
      w31 = newAngle;
      s31 = parseFloat(
        Math.sqrt(s1 * s1 + s2 * s2 - 2 * s1 * s2 * Math.cos(w31)).toPrecision(
          3
        )
      );
      w11 =
        Math.floor(
          Math.acos((s2 * s2 + s31 * s31 - s1 * s1) / (2 * s2 * s31)) * 1000
        ) / 1000;
      w21 =
        Math.floor(
          Math.acos((s1 * s1 + s31 * s31 - s2 * s2) / (2 * s1 * s31)) * 1000
        ) / 1000;
  }

  return {
    s1,
    s2,
    s31,
    s32,
    w11,
    w12,
    w21,
    w22,
    w31,
    w32,
    multi,
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

const renderParamsDescription = (
  permIndex: number,
  params: Params,
  keys: string[]
): string => {
  const values = sliceIntoChunks(keys, 3)
    .map((chunk) => chunk.map((key) => `${key}&=${params[key]}`).join(" & "))
    .join(" \\\\ ")
    .replaceAll("s1", Permutation[permIndex][0])
    .replaceAll("s2", Permutation[permIndex][1])
    .replaceAll("s3", Permutation[permIndex][2])
    .replaceAll("w1", Permutation[permIndex][3])
    .replaceAll("w2", Permutation[permIndex][4])
    .replaceAll("w3", Permutation[permIndex][5]);
  return `
    \\begin{align*}
    ${values}
    \\end{align*}
    `;
};

const renderParamsSolution = (
  permIndex: number,
  params: Params,
  keys: string[]
): string => {
  const values = sliceIntoChunks(keys, 3)
    .map((chunk) =>
      chunk.map((key) => `${key} &\\approx ${params[key]}`).join(" & ")
    )
    .join(" \\\\ ")
    .replaceAll("s1", Permutation[permIndex][0])
    .replaceAll("s2", Permutation[permIndex][1])
    .replaceAll("s3", Permutation[permIndex][2])
    .replaceAll("w1", Permutation[permIndex][3])
    .replaceAll("w2", Permutation[permIndex][4])
    .replaceAll("w3", Permutation[permIndex][5]);
  if (params.w1 * params.w2 * params.w3 === 0) {
    return `\\mathbb{L}=\\{\\}`;
  } else if (params.s1 + params.s2 + params.s3 === 0) {
    return `${Permutation[permIndex][0]} \\in \\mathbb{R} \\nobreakspace , \\nobreakspace ${Permutation[permIndex][1]}\\in \\mathbb{R} \\nobreakspace , \\nobreakspace ${Permutation[permIndex][2]}\\in \\mathbb{R} `;
  } else {
    return `
    \\begin{align*}
    ${values}
    \\end{align*}
    `;
  }
};

const renderParamsSolution2 = (
  permIndex: number,
  params: Params,
  params2: Params2,
  keys: string[]
): string => {
  const values = sliceIntoChunks(keys, 3)
    .map((chunk) =>
      chunk.map((key) => `${key} &\\approx${params[key]}`).join(" & ")
    )
    .join(" \\\\ ")
    .replaceAll("s1", Permutation[permIndex][0])
    .replaceAll("s2", Permutation[permIndex][1])
    .replaceAll("s3", Permutation[permIndex][2])
    .replaceAll("w1", Permutation[permIndex][3])
    .replaceAll("w2", Permutation[permIndex][4])
    .replaceAll("w3", Permutation[permIndex][5]);
  params.s3 = params2.s32;
  params.w1 = params2.w12;
  params.w3 = params2.w32;

  const values2 = sliceIntoChunks(keys, 3)
    .map((chunk) =>
      chunk.map((key) => `${key} &\\approx ${params[key]}`).join(" & ")
    )
    .join(" \\\\ ")
    .replaceAll("s1", Permutation[permIndex][0])
    .replaceAll("s2", Permutation[permIndex][1])
    .replaceAll("s3", Permutation[permIndex][2])
    .replaceAll("w1", Permutation[permIndex][3])
    .replaceAll("w2", Permutation[permIndex][4])
    .replaceAll("w3", Permutation[permIndex][5]);
  return `
  \\begin{align*}
  ${values} \\\\
  ${values2}
  \\end{align*}
  `;
};

const sinTriangle: ProblemGenerator = {
  key: "sin-triangle",
  image: "sin-triangle.svg",
  generate: () => {
    const permIndex = randomInt(0, 3);
    var variant = randomEnum(Variant);
    const params = startParams(variant);

    switch (variant) {
      case Variant.SSS:
        return {
          description: renderParamsDescription(permIndex, params, [
            "s1",
            "s2",
            "s3",
          ]),
          solution: renderParamsSolution(permIndex, params, ["w1", "w2", "w3"]),
        };

      case Variant.SSW:
        var knownAngle = randomInt(1, 4);
        const params2 = calculateParams(params.s1, params.s2, knownAngle);
        if (knownAngle === 1) {
          switch (params2.multi) {
            case 0:
              params.w1 = params2.w11;
              return {
                description: renderParamsDescription(permIndex, params, [
                  "s1",
                  "s2",
                  "w1",
                ]),
                solution: renderParamsSolution(permIndex, params, [
                  "s3",
                  "w2",
                  "w3",
                ]),
              };

            case 1:
              params.w1 = params2.w11;
              params.s3 = params2.s31;
              params.w2 = params2.w21;
              params.w3 = params2.w31;
              return {
                description: renderParamsDescription(permIndex, params, [
                  "s1",
                  "s2",
                  "w1",
                ]),
                solution: renderParamsSolution(permIndex, params, [
                  "s3",
                  "w2",
                  "w3",
                ]),
              };

            case 2:
              params.w1 = params2.w11;
              params.s3 = params2.s31;
              params.w2 = params2.w21;
              params.w3 = params2.w31;
              return {
                description: renderParamsDescription(permIndex, params, [
                  "s1",
                  "s2",
                  "w1",
                ]),
                solution: renderParamsSolution2(permIndex, params, params2, [
                  "s3",
                  "w2",
                  "w3",
                ]),
              };

            default:
              return {
                description: renderParamsDescription(permIndex, params, [
                  "s1",
                  "s2",
                  "w1",
                ]),
                solution: renderParamsSolution(permIndex, params, [
                  "s3",
                  "w2",
                  "w3",
                ]),
              };
          }
        } else if (knownAngle === 2) {
          switch (params2.multi) {
            case 0:
              params.w2 = params2.w21;
              return {
                description: renderParamsDescription(permIndex, params, [
                  "s1",
                  "s2",
                  "w2",
                ]),
                solution: renderParamsSolution(permIndex, params, [
                  "s3",
                  "w1",
                  "w3",
                ]),
              };

            case 1:
              params.w2 = params2.w21;
              params.s3 = params2.s31;
              params.w1 = params2.w11;
              params.w3 = params2.w31;
              return {
                description: renderParamsDescription(permIndex, params, [
                  "s1",
                  "s2",
                  "w2",
                ]),
                solution: renderParamsSolution(permIndex, params, [
                  "s3",
                  "w1",
                  "w3",
                ]),
              };

            case 2:
              params.w2 = params2.w21;
              params.s3 = params2.s31;
              params.w1 = params2.w11;
              params.w3 = params2.w31;
              return {
                description: renderParamsDescription(permIndex, params, [
                  "s1",
                  "s2",
                  "w2",
                ]),
                solution: renderParamsSolution2(permIndex, params, params2, [
                  "s3",
                  "w1",
                  "w3",
                ]),
              };

            default:
              return {
                description: renderParamsDescription(permIndex, params, [
                  "s1",
                  "s2",
                  "w2",
                ]),
                solution: renderParamsSolution(permIndex, params, [
                  "s3",
                  "w1",
                  "w3",
                ]),
              };
          }
        } else {
          params.w3 = params2.w31;
          params.s3 = params2.s31;
          params.w1 = params2.w11;
          params.w2 = params2.w21;
          return {
            description: renderParamsDescription(permIndex, params, [
              "s1",
              "s2",
              "w3",
            ]),
            solution: renderParamsSolution(permIndex, params, [
              "s3",
              "w1",
              "w2",
            ]),
          };
        }

      case Variant.SWW:
        const missingAngle = randomInt(1, 4);
        if (missingAngle === 1) {
          return {
            description: renderParamsDescription(permIndex, params, [
              "s1",
              "w2",
              "w3",
            ]),
            solution: renderParamsSolution(permIndex, params, [
              "w1",
              "s2",
              "s3",
            ]),
          };
        } else if (missingAngle === 2) {
          return {
            description: renderParamsDescription(permIndex, params, [
              "s1",
              "w1",
              "w3",
            ]),
            solution: renderParamsSolution(permIndex, params, [
              "w2",
              "s2",
              "s3",
            ]),
          };
        } else {
          return {
            description: renderParamsDescription(permIndex, params, [
              "s1",
              "w1",
              "w2",
            ]),
            solution: renderParamsSolution(permIndex, params, [
              "w3",
              "s2",
              "s3",
            ]),
          };
        }

      case Variant.WWW:
        return {
          description: renderParamsDescription(permIndex, params, [
            "w1",
            "w2",
            "w3",
          ]),
          solution: renderParamsSolution(permIndex, params, ["s1", "s2", "s3"]),
        };

      default:
        return {
          description: renderParamsDescription(permIndex, params, [
            "w1",
            "w2",
            "w3",
          ]),
          solution: renderParamsSolution(permIndex, params, ["s1", "s2", "s3"]),
        };
    }
  },
};

export default sinTriangle;
