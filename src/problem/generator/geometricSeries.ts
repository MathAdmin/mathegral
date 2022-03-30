import { ProblemGeneratorNg } from "../ProblemGeneratorSpi";
import { exclude } from "../util/predicates";
import { randomEnum, randomInt } from "../util/randomizer";

type Params = {
  a1: number;
  q: number;
  n: number;
  an: number;
  Sn: number;
};

enum Variant {
  a1_q_n,
  a1_q_an,
  a1_q_Sn,
  a1_n_an,
  a1_n_Sn,
  a1_an_Sn,
  q_n_an,
  q_n_Sn,
  q_an_Sn,
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
    case Variant.a1_q_n:
      return `
\\begin{align*}
  a_1&=${params.a1} & q&=${params.q}
\\end{align*}
\\\\
\\begin{align*}
  a_{${params.n}}&=${hidden} & S_{${params.n}}&=${hidden}
\\end{align*}
`;
    case Variant.a1_q_an:
      return `
\\begin{align*}
  a_1&=${params.a1} & q&=${params.q} & a_n&=${params.an}
\\end{align*}
\\\\
\\begin{align*}
  n&=${hidden}      & S_n&=${hidden}
\\end{align*}
`;
    case Variant.a1_q_Sn:
      return `
\\begin{align*}
  a_1&=${params.a1} & q&=${params.q} & S_n&=${params.Sn}
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
  q&=${hidden}      & S_{${params.n}}&=${hidden}
\\end{align*}
`;
    case Variant.a1_n_Sn:
      return `
\\begin{align*}
  a_1&=${params.a1} & S_{${params.n}}&=${params.Sn}
\\end{align*}
\\\\
\\begin{align*}
  q&=${hidden}      & a_{${params.n}}&=${hidden}
\\end{align*}
`;
    case Variant.a1_an_Sn:
      return `
\\begin{align*}
  a_1&=${params.a1} & a_n&=${params.an} & S_n&=${params.Sn}
\\end{align*}
\\\\
\\begin{align*}
  q&=${hidden}      & n&=${hidden}
\\end{align*}
`;
    case Variant.q_n_an:
      return `
\\begin{align*}
  q&=${params.q} & a_{${params.n}}&=${params.an}
\\end{align*}
\\\\
\\begin{align*}
  a_1&=${hidden} & S_{${params.n}}&=${hidden}
\\end{align*}
`;
    case Variant.q_n_Sn:
      return `
\\begin{align*}
  q&=${params.q} & S_{${params.n}}&=${params.Sn}
\\end{align*}
\\\\
\\begin{align*}
  a_1&=${hidden} & a_{${params.n}}&=${hidden}
\\end{align*}
`;
    case Variant.q_an_Sn:
      return `
\\begin{align*}
  q&=${params.q} & a_n&=${params.an} &  S_n&=${params.Sn}
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
  a_1&=${hidden}                & q&=${hidden}
\\end{align*}
`;
  }
};

const formatSolution = (problem: Problem) => {
  const { params, variant } = problem;
  switch (variant) {
    case Variant.a1_q_n:
      return `
\\begin{align*}
  a_{${params.n}}&=${params.an} & S_{${params.n}}&=${params.Sn}
\\end{align*}
`;
    case Variant.a1_q_an:
      return `
\\begin{align*}
  n&=${params.n} & S_n&=${params.Sn}
\\end{align*}
`;
    case Variant.a1_q_Sn:
      return `
\\begin{align*}
  n&=${params.n} & a_n&=${params.an}
\\end{align*}
`;
    case Variant.a1_n_an:
      return `
\\begin{align*}
  q&=${params.q} & S_{${params.n}}&=${params.Sn}
\\end{align*}
`;
    case Variant.a1_n_Sn:
      return `
\\begin{align*}
  q&=${params.q} & a_{${params.n}}&=${params.an}
\\end{align*}
`;
    case Variant.a1_an_Sn:
      return `
\\begin{align*}
  q&=${params.q} & n&=${params.n}
\\end{align*}
`;
    case Variant.q_n_an:
      return `
\\begin{align*}
  a_1&=${params.a1} & S_{${params.n}}&=${params.Sn}
\\end{align*}
`;
    case Variant.q_n_Sn:
      return `
\\begin{align*}
  a_1&=${params.a1} & a_{${params.n}}&=${params.an}
\\end{align*}
`;
    case Variant.q_an_Sn:
      return `
\\begin{align*}
  a_1&=${params.a1} & n&=${params.n}
\\end{align*}
`;
    case Variant.n_an_Sn:
      return `
\\begin{align*}
  a_1&=${params.a1} & q&=${params.q}
\\end{align*}
`;
  }
};

export const calculateAn = (a1: number, n: number, q: number): number => {
  return a1 * Math.pow(q, n - 1);
};

export const calculateSn = (a1: number, n: number, q: number): number => {
  return (a1 * (Math.pow(q, n) - 1)) / (q - 1);
};

const geometricSeries: ProblemGeneratorNg<Problem> = {
  key: "geometric-series",
  generate: () => {
    const a1 = randomInt(-9, 10, exclude(0));
    const q = randomInt(-5, 7, exclude(0, 1, -1));
    const n = randomInt(5, 25);
    const an = calculateAn(a1, n, q);
    const Sn = calculateSn(a1, n, q);

    return {
      params: {
        a1,
        q,
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

export default geometricSeries;
