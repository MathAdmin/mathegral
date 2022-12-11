import { calculategcd } from "../util/commonDivisor";

export const fracTex = (above: number, below: number): string => {
  const gcd = calculategcd([above, below]);
  if (above === 0) {
    below = 1;
  } else {
    const sign = (above * below) / Math.abs(above * below);
    above = (sign * Math.abs(above)) / gcd;
    below = Math.abs(below) / gcd;
  }

  if (below === 1) {
    return `${above}`;
  } else {
    return `\\frac{${above}}{${below}}`;
  }
};

export const sqrtTex = (positiv: number): string => {
  var i = 2;
  var bevor = 1;
  var after = positiv;
  var normalform = ``;

  while (i < Math.sqrt(after) + 1) {
    if (after % (i * i) === 0) {
      bevor = bevor * i;
      after = after / (i * i);
    } else {
      i = i + 1;
    }
  }
  after === 1
    ? (normalform = `${bevor}`)
    : (normalform = `${bevor}\\sqrt{${after}}`);
  return normalform;
};
