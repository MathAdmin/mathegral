export const gcd = (
  a: number,
  b: number
): number => {
  var apos = Math.abs(a);
  var bpos = Math.abs(b);
  while (bpos) {
      var temppos=bpos;
      bpos=apos%bpos;
      apos=temppos;
  }
  return apos;
};
