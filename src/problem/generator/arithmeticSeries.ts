import { ProblemGeneratorNg } from "../ProblemGeneratorSpi";
import { exclude } from "../util/predicates";
import { randomEnum, randomInt } from "../util/randomizer";

type Params = {
  a1: number;
  d: number;
  n: number;
  an: number;
  Sn: number;
};

enum Variant {
  a1_d_n,
  a1_d_an,
  a1_d_Sn,
  a1_n_an,
  a1_n_Sn,
  a1_an_Sn,
  d_n_an,
  d_n_Sn,
  d_an_Sn,
  n_an_Sn,
}

type Problem = {
  params: Params;
  variant: Variant;
};

const formatDescription = (problem: Problem) => {
  const { params, variant } = problem;
  const hidden = "\\text{?}";
  switch (variant) {
    case Variant.a1_d_n:
      return `
\\begin{align*}
  a_1&=${params.a1} & d&=${params.d}
\\end{align*}
\\\\
\\begin{align*}
  a_{${params.n}}&=${hidden} & S_{${params.n}}&=${hidden}
\\end{align*}
`;
    case Variant.a1_d_an:
      return `
\\begin{align*}
  a_1&=${params.a1} & d&=${params.d} & a_n&=${params.an}
\\end{align*}
\\\\
\\begin{align*}
  n&=${hidden}      & S_n&=${hidden}
\\end{align*}
`;
    case Variant.a1_d_Sn:
      return `
\\begin{align*}
  a_1&=${params.a1} & d&=${params.d} & S_n&=${params.Sn}
\\end{align*}
\\\\
\\begin{align*}
  n&=${hidden}      & a_n&=${hidden}
\\end{align*}
`;
    case Variant.a1_n_an:
      return `
\\begin{align*}
  a_1&=${params.a1} & a_{${params.n}}&=${params.an}
\\end{align*}
\\\\
\\begin{align*}
  d&=${hidden}      & S_{${params.n}}&=${hidden}
\\end{align*}
`;
    case Variant.a1_n_Sn:
      return `
\\begin{align*}
  a_1&=${params.a1} & S_{${params.n}}&=${params.Sn}
\\end{align*}
\\\\
\\begin{align*}
  d&=${hidden}      & a_{${params.n}}&=${hidden}
\\end{align*}
`;
    case Variant.a1_an_Sn:
      return `
\\begin{align*}
  a_1&=${params.a1} & a_n&=${params.an} & S_n&=${params.Sn}
\\end{align*}
\\\\
\\begin{align*}
  d&=${hidden}      & n&=${hidden}
\\end{align*}
`;
    case Variant.d_n_an:
      return `
\\begin{align*}
  d&=${params.d} & a_{${params.n}}&=${params.an}
\\end{align*}
\\\\
\\begin{align*}
  a_1&=${hidden} & S_{${params.n}}&=${hidden}
\\end{align*}
`;
    case Variant.d_n_Sn:
      return `
\\begin{align*}
  d&=${params.d} & S_{${params.n}}&=${params.Sn}
\\end{align*}
\\\\
\\begin{align*}
  a_1&=${hidden} & a_{${params.n}}&=${hidden}
\\end{align*}
`;
    case Variant.d_an_Sn:
      return `
\\begin{align*}
  d&=${params.d} & a_n&=${params.an} &  S_n&=${params.Sn}
\\end{align*}
\\\\
\\begin{align*}
  a_1&=${hidden} & n&=${hidden}
\\end{align*}
`;
    case Variant.n_an_Sn:
      return `
\\begin{align*}
  a_{${params.n}}&=${params.an} & S_{${params.n}}&=${params.Sn}
\\end{align*}
\\\\
\\begin{align*}
  a_1&=${hidden}                & d&=${hidden}
\\end{align*}
`;
  }
};

const formatSolution = (problem: Problem) => {
  const { params, variant } = problem;
  switch (variant) {
    case Variant.a1_d_n:
      return `
\\begin{align*}
  a_{${params.n}}&=${params.an} & S_{${params.n}}&=${params.Sn}
\\end{align*}
`;
    case Variant.a1_d_an:
      return `
\\begin{align*}
  n&=${params.n} & S_n&=${params.Sn}
\\end{align*}
`;
    case Variant.a1_d_Sn:
      return `
\\begin{align*}
  n&=${params.n} & a_n&=${params.an}
\\end{align*}
`;
    case Variant.a1_n_an:
      return `
\\begin{align*}
  d&=${params.d} & S_{${params.n}}&=${params.Sn}
\\end{align*}
`;
    case Variant.a1_n_Sn:
      return `
\\begin{align*}
  d&=${params.d} & a_{${params.n}}&=${params.an}
\\end{align*}
`;
    case Variant.a1_an_Sn:
      return `
\\begin{align*}
  d&=${params.d} & n&=${params.n}
\\end{align*}
`;
    case Variant.d_n_an:
      return `
\\begin{align*}
  a_1&=${params.a1} & S_{${params.n}}&=${params.Sn}
\\end{align*}
`;
    case Variant.d_n_Sn:
      return `
\\begin{align*}
  a_1&=${params.a1} & a_{${params.n}}&=${params.an}
\\end{align*}
`;
    case Variant.d_an_Sn:
      return `
\\begin{align*}
  a_1&=${params.a1} & n&=${params.n}
\\end{align*}
`;
    case Variant.n_an_Sn:
      return `
\\begin{align*}
  a_1&=${params.a1} & d&=${params.d}
\\end{align*}
`;
  }
};

export const calculateAn = (a1: number, n: number, d: number): number => {
  return a1 + (n - 1) * d;
};

export const calculateSn = (a1: number, n: number, an: number): number => {
  return (n * (a1 + an)) / 2;
};

const arithmeticSeries: ProblemGeneratorNg<Problem> = {
  key: "arithmetic-series",
  generate: () => {
    const a1 = randomInt(-9, 10);
    const d = randomInt(-9, 30, exclude(0));
    const n = randomInt(15, 100);
    const an = calculateAn(a1, n, d);
    const Sn = calculateSn(a1, n, an);

    return {
      params: {
        a1,
        d,
        n,
        an,
        Sn,
      },
      variant: randomEnum(Variant),
    };
  },
  format: (problem) => {
    return {
      description: formatDescription(problem),
      solution: formatSolution(problem),
    };
  },
};

export default arithmeticSeries;
