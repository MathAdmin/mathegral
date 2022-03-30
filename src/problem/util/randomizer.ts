export const randomInt = (
  minInclusive: number,
  maxExclusive: number,
  accept?: (value: number) => boolean
): number => {
  const min = Math.ceil(minInclusive);
  const max = Math.floor(maxExclusive);
  const value = Math.floor(Math.random() * (max - min) + min);
  if (accept && !accept(value)) {
    return randomInt(min, max, accept);
  }
  return value;
};

export const randomInts = (
  times: number,
  minInclusive: number,
  maxExclusive: number,
  accept?: (value: number) => boolean
): number[] => {
  const result = [];
  for (var i = 0; i < times; i++) {
    result.push(randomInt(minInclusive, maxExclusive, accept));
  }
  return result;
};

export function randomEnum<T>(
  anEnum: T,
  accept?: (value: T[keyof T]) => boolean
): T[keyof T] {
  const enumValues = Object.keys(anEnum)
    .map((n) => Number.parseInt(n))
    .filter((n) => !Number.isNaN(n)) as unknown as T[keyof T][];
  const randomIndex = Math.floor(Math.random() * enumValues.length);
  const randomEnumValue = enumValues[randomIndex];
  if (accept && !accept(randomEnumValue)) {
    return randomEnum(anEnum, accept);
  }
  return randomEnumValue;
}

export function randomElement<T>(array: T[]): T {
  return array[randomInt(0, array.length)];
}

export function randomElements<T>(array: T[], n: number): T[] {
  return shuffle(array).splice(0, n);
}

export function shuffle<T>(array: T[]): T[] {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}
