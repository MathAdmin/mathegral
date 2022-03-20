export function exclude<T>(...values: T[]): (value: T) => boolean {
  return (value: T) => !values.includes(value);
}
