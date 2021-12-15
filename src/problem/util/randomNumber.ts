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
