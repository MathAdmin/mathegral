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

export function randomEnum<T>(anEnum: T): T[keyof T] {
  const enumValues = Object.keys(anEnum)
    .map((n) => Number.parseInt(n))
    .filter((n) => !Number.isNaN(n)) as unknown as T[keyof T][];
  const randomIndex = Math.floor(Math.random() * enumValues.length);
  const randomEnumValue = enumValues[randomIndex];
  return randomEnumValue;
}

export function randomElement<T>(array: T[]): T {
  return array[randomInt(0, array.length)];
}
