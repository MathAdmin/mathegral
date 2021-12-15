import { ProblemGenerator } from "../ProblemGeneratorSpi";
import { randomInt } from "../util/randomNumber";

const renderParams = (
  a1: number,
  d: number,
  n: number,
  an: number,
  Sn: number
): string => {
  const hidden = "\\text{?}";
  return `
    \\begin{aligned}
      a_1&=${a1 || hidden} \\\\
      d&=${d || hidden} \\\\
      n&=${n || hidden} \\\\
      a_n&=${an || hidden} \\\\
      S_n&=${Sn || hidden}
    \\end{aligned}
  `;
};

export const calculateAn = (a1: number, n: number, d: number): number => {
  return a1 + (n - 1) * d;
};

export const calculateSn = (a1: number, n: number, an: number): number => {
  return (n * (a1 + an)) / 2;
};

const arithmeticSequence: ProblemGenerator = {
  key: "arithmetic-sequence",
  generate: () => {
    const a1 = randomInt(1, 10);
    const d = randomInt(1, 10);
    const n = randomInt(5, 10);
    const an = calculateAn(a1, d, n);
    const Sn = calculateSn(a1, n, an);

    const h1 = randomInt(0, 5);
    const h2 = (h1 + randomInt(1, 5)) % 5;
    const hide = (index: number, value: number) => {
      return index === h1 || index === h2 ? 0 : value;
    };

    return {
      description: renderParams(
        hide(0, a1),
        hide(1, d),
        hide(2, n),
        hide(3, an),
        hide(4, Sn)
      ),
      solution: renderParams(a1, d, n, an, Sn),
    };
  },
};

export default arithmeticSequence;
