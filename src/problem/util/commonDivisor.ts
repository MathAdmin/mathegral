import { randomInt } from "../util/randomizer";
import { exclude } from "../util/predicates";

export const gcd = (a: number, b: number): number => {
  var apos = Math.abs(a);
  var bpos = Math.abs(b);
  while (bpos) {
    var temppos = bpos;
    bpos = apos % bpos;
    apos = temppos;
  }
  return apos;
};

export const multigcd = (arr: any[]): any[] => {
  if (arr.length === 1) {
    return arr;
  } else {
    var number1 = arr.pop();
    var number2 = arr.pop();
    arr.push(gcd(number1, number2));
    return multigcd(arr);
  }
};

export type Binome = {
  a: number;
  b: number;
};

export type Fraction = {
  a: number;
  b: number;
};

export const calculateBinome = (
  sum: number,
  sol: number,
  nosol: number
): Binome => {
  const floor = Math.floor(sum / sol);
  const a =
    floor === sum / sol || floor === 0 || floor === nosol
      ? floor + randomInt(-3, 4, exclude(0, -floor, floor))
      : floor;
  const b = sum - a * sol;
  return {
    a: a,
    b: b,
  };
};

export const calculategcd = (arr: any[]): number => {
  return multigcd(arr)[0];
};

export const rootDivisor = (p: number): Binome => {
  var a = 1;
  var b = p;
  var div = 1;
  while (a < b) {
    div = div + 1;
    if (p % div === 0) {
      a = div;
      b = p / div;
    }
  }

  return { a: a, b: b };
};
