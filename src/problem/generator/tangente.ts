import { ProblemGeneratorNg } from "../ProblemGeneratorSpi";
import { exclude } from "../util/predicates";
import { randomInt } from "../util/randomizer";
import { fracTex, sqrtTex } from "../util/texGenerator";
import weighted from "weighted";

// 13 verschiedene Varianten
const VARIANT = [
  ["abci", "SINGLE", "jmq"],
  ["abcij", "DOUBLE", "mq"],
  ["bcmq", "SINGLE", "a"],
  ["acmq", "DOUBLE", "b"],
  ["abmq", "SINGLE", "c"],
  ["Nnmq", "DOUBLE", "a"],
  ["aNmq", "DOUBLE", "n"],
  ["uvmq", "SINGLE", "a"],
  ["avmq", "SINGLE", "u"],
  ["aumq", "SINGLE", "v"],
  ["abcBC", "SINGLE", "A"],
  ["abcAC", "DOUBLE", "B"],
  ["abcAB", "SINGLE", "C"],
];

type Problem = {
  a: number;
  b: number;
  c: number;
  N: number;
  n: number;
  u: number;
  v: number;
  m: number;
  q: number;
  A: number;
  B: number;
  C: number;
  i: number;
  j: number;
  k: number;
  given: string;
  sol: string;
  param: string;
};

export const formatEquation = (
  problem: Problem,
  translate: (key: string) => string
): string => {
  const { a, b, c, N, n, u, v, m, q, A, B, C, i, j, k, given } = problem;
  var textDescription: string;

  switch (given) {
    case "abci":
      textDescription = `\\begin{aligned}
      \\text{${translate("generator.tangente.variant.variant11")}} f(x)
      \\text{${translate("generator.tangente.variant.variant12")}} P.
      \\\\
      f(x)=${a}x^2+${b}x+${c}
      \\\\
      P(${i}|...)
      \\end{aligned}`;
      break;

    case "abcij":
      textDescription = `\\begin{aligned}
      \\text{${translate("generator.tangente.variant.variant21")}} f(x)
      \\text{${translate("generator.tangente.variant.variant22")}} Q.
      \\\\
      f(x)=${a}x^2+${b}x+${c}
      \\\\
      Q(${i}|${j})
      \\end{aligned}`;
      break;

    case "bcmq":
      textDescription = `\\begin{aligned}
      \\text{${translate("generator.tangente.variant.variant31")}} f(x)
      \\text{${translate("generator.tangente.variant.variant32")}} g(x)
      \\text{${translate("generator.tangente.variant.variant33")}}
      \\\\
      f(x)=ax^2+${b}x+${c}
      \\\\
      g(x)=${m}x+${q}
      \\end{aligned}`;
      break;

    case "acmq":
      textDescription = `\\begin{aligned}
        \\text{${translate("generator.tangente.variant.variant31")}} f(x)
        \\text{${translate("generator.tangente.variant.variant32")}} g(x)
        \\text{${translate("generator.tangente.variant.variant33")}}
        \\\\
        f(x)=${a}x^2+bx+${c}
        \\\\
        g(x)=${m}x+${q}
        \\end{aligned}`;
      break;

    case "abmq":
      textDescription = `\\begin{aligned}
        \\text{${translate("generator.tangente.variant.variant31")}} f(x)
        \\text{${translate("generator.tangente.variant.variant32")}} g(x)
        \\text{${translate("generator.tangente.variant.variant33")}}
        \\\\
        f(x)=${a}x^2+${b}x+c
        \\\\
        g(x)=${m}x+${q}
        \\end{aligned}`;
      break;

    case "Nnmq":
      textDescription = `\\begin{aligned}
        \\text{${translate("generator.tangente.variant.variant31")}} f(x)
        \\text{${translate("generator.tangente.variant.variant32")}} g(x)
        \\text{${translate("generator.tangente.variant.variant33")}}
        \\\\
        f(x)=a(x-${N})(x-${n})
        \\\\
        g(x)=${m}x+${fracTex(m * n * N - m * (N + n) * (N + n), N + n)}
        \\end{aligned}`;
      break;

    case "aNmq":
      textDescription = `\\begin{aligned}
        \\text{${translate("generator.tangente.variant.variant31")}} f(x)
        \\text{${translate("generator.tangente.variant.variant32")}} g(x)
        \\text{${translate("generator.tangente.variant.variant33")}}
        \\\\
        f(x)=${fracTex(-(m * N + q), k * k)}(x-${N})(x-n)
        \\\\
        g(x)=${m}x+${q}
        \\end{aligned}`;
      break;

    case "uvmq":
      textDescription = `\\begin{aligned}
        \\text{${translate("generator.tangente.variant.variant31")}} f(x)
        \\text{${translate("generator.tangente.variant.variant32")}} g(x)
        \\text{${translate("generator.tangente.variant.variant33")}}
        \\\\
        f(x)=a(x-${u})^2+${v}
        \\\\
        g(x)=${m}x+${q}
        \\end{aligned}`;
      break;

    case "avmq":
      textDescription = `\\begin{aligned}
        \\text{${translate("generator.tangente.variant.variant31")}} f(x)
        \\text{${translate("generator.tangente.variant.variant32")}} g(x)
        \\text{${translate("generator.tangente.variant.variant33")}}
        \\\\
        f(x)=${a}(x-u)^2+${v}
        \\\\
        g(x)=${m}x+${q}
        \\end{aligned}`;
      break;

    case "aumq":
      textDescription = `\\begin{aligned}
        \\text{${translate("generator.tangente.variant.variant31")}} f(x)
        \\text{${translate("generator.tangente.variant.variant32")}} g(x)
        \\text{${translate("generator.tangente.variant.variant33")}}
        \\\\
        f(x)=${a}(x-${u})^2+v
        \\\\
        g(x)=${m}x+${q}
        \\end{aligned}`;
      break;

    case "abcBC":
      textDescription = `\\begin{aligned}
        \\text{${translate("generator.tangente.variant.variant31")}} f(x)
        \\text{${translate("generator.tangente.variant.variant32")}} g(x)
        \\text{${translate("generator.tangente.variant.variant33")}}
        \\\\
        f(x)=${a}x^2+${b}x+${c}
        \\\\
        g(x)=ax^2+${B}x+${C}
        \\end{aligned}`;
      break;

    case "abcAC":
      textDescription = `\\begin{aligned}
        \\text{${translate("generator.tangente.variant.variant31")}} f(x)
        \\text{${translate("generator.tangente.variant.variant32")}} g(x)
        \\text{${translate("generator.tangente.variant.variant33")}}
        \\\\
        f(x)=${a}x^2+${b}x+${c}
        \\\\
        g(x)=${A}x^2+bx+${C}
        \\end{aligned}`;
      break;

    case "abcAB":
      textDescription = `\\begin{aligned}
        \\text{${translate("generator.tangente.variant.variant31")}} f(x)
        \\text{${translate("generator.tangente.variant.variant32")}} g(x)
        \\text{${translate("generator.tangente.variant.variant33")}}
        \\\\
        f(x)=${a}x^2+${b}x+${c}
        \\\\
        g(x)=${A}x^2+${B}x+c
        \\end{aligned}`;
      break;

    default:
      textDescription = `\\begin{aligned}
      \\text{${translate("generator.tangente.description.variant1")}}
      \\\\
      f(x)=${a}x^2+${b}x+${c}
      \\\\
      \\P(${i},...)
      \\end{aligned}`;
  }

  return textDescription
    .replaceAll("+-", "-")
    .replaceAll("--", "+")
    .replaceAll("{0x^2+", "{")
    .replaceAll("{0x^2-", "{-")
    .replaceAll("=1x^2", "=x^2")
    .replaceAll("-1x", "-x")
    .replaceAll("+1x", "+x")
    .replaceAll("{1x", "{x")
    .replaceAll("{0x+", "{")
    .replaceAll("{0x-", "{-")
    .replaceAll("+0x", "")
    .replaceAll("-0x", "")
    .replaceAll("=0x+", "=")
    .replaceAll("=0x-", "=-")
    .replaceAll("=1x", "=x")
    .replaceAll("=-1x", "=-x")
    .replaceAll("=-1(", "=-(")
    .replaceAll("=1(", "=(")
    .replaceAll("+0}", "}");
};

export const formatSolution = (problem: Problem): string => {
  const { a, b, c, N, n, u, v, m, q, A, B, C, i, j, k, given } = problem;
  var textSolution: string;

  switch (given) {
    case "abci":
      textSolution = `g(x)=${2 * a * i + b}x+${c - a * i * i}`;
      break;

    case "abcij":
      textSolution = `\\begin{aligned}
      \\text{a) } g(x)=${b + 2 * a * i + 2 * k * a}x+${
        j - (b + 2 * a * i + 2 * k * a) * i
      } 
      \\\\
      \\text{b) } g(x)=${b + 2 * a * i - 2 * k * a}x+${
        j - (b + 2 * a * i - 2 * k * a) * i
      } 
      \\end{aligned}`;
      break;

    case "bcmq":
      textSolution = `a=${fracTex((b - m) * (b - m), 4 * (c - q))}`;
      break;

    case "acmq":
      a * (c - q) < 0
        ? (textSolution = `\\mathbb{L}=\\{\\}`)
        : (textSolution = `\\begin{aligned}
          \\text{a) } b=${normalFormPlus(m, 4 * a * (c - q))} 
          \\\\
          \\text{b) } b=${normalFormMinus(m, 4 * a * (c - q))} 
          \\end{aligned}`);
      break;

    case "abmq":
      textSolution = `c=${fracTex(4 * a * q + (b - m) * (b - m), 4 * a)}`;
      break;

    case "Nnmq":
      textSolution = `\\begin{aligned}
      \\text{a) } a=${fracTex(m, n + N)} 
      \\\\
      \\text{b) } a=${fracTex(m * (n + N), (n - N) * (n - N))} 
      \\end{aligned}`;
      break;

    case "aNmq":
      textSolution = `\\begin{aligned}
      \\text{a) } n=${fracTex(
        N * (N * m + q) + 2 * k * (N * m + q) + m * k * k,
        N * m + q
      )} 
      \\\\
      \\text{b) } n=${fracTex(
        N * (N * m + q) - 2 * k * (N * m + q) + m * k * k,
        N * m + q
      )} 
      \\end{aligned}`;
      break;

    case "uvmq":
      textSolution = `a=${fracTex(m * m, 4 * (v - (m * u + q)))}`;
      break;

    case "avmq":
      textSolution = `u=${fracTex(4 * a * v - 4 * a * q - m * m, 4 * a * m)}`;
      break;

    case "aumq":
      textSolution = `v=${fracTex(4 * a * u * m + m * m + 4 * a * q, 4 * a)}`;
      break;

    case "abcBC":
      textSolution = `a=${fracTex(
        4 * a * (C - c) + (B - b) * (B - b),
        4 * (C - c)
      )}`;
      break;

    case "abcAC":
      textSolution = `\\begin{aligned}
      \\text{a) } b=${normalFormPlus(b, 4 * (A - a) * (C - c))} 
      \\\\
      \\text{b) } b=${normalFormMinus(b, 4 * (A - a) * (C - c))} 
      \\end{aligned}`;
      break;

    case "abcAB":
      textSolution = `c=${fracTex(
        4 * (A - a) * c + (B - b) * (B - b),
        4 * (A - a)
      )}`;
      break;

    default:
      textSolution = `\\begin{aligned}
          a=${a} \\text{ , } b=${b} \\text{ , } c=${c} \\text{ , }
          \\\\
          m=${m} \\text{ , } n=${n} \\text{ , } u=${u} \\text{ , } v=${v}
          \\end{aligned}`;
  }

  return textSolution
    .replaceAll("+-", "-")
    .replaceAll("--", "+")
    .replaceAll("{0x^2+", "{")
    .replaceAll("{0x^2-", "{-")
    .replaceAll("=1x^2", "=x^2")
    .replaceAll("-1x", "-x")
    .replaceAll("+1x", "+x")
    .replaceAll("{1x", "{x")
    .replaceAll("{0x+", "{")
    .replaceAll("{0x-", "{-")
    .replaceAll("+0x", "")
    .replaceAll("-0x", "")
    .replaceAll("=0x+", "=")
    .replaceAll("=0x-", "=-")
    .replaceAll("=1x", "=x")
    .replaceAll("=-1x", "=-x")
    .replaceAll("=-1(", "=-(")
    .replaceAll("=1(", "=(")
    .replaceAll("+0}", "}");
};

export const normalFormPlus = (a: number, b: number): string => {
  var summe: string;
  Math.sqrt(b) % 1 === 0
    ? (summe = `${a + Math.sqrt(b)}`)
    : (summe = `${a}+${sqrtTex(b)}`);
  return summe;
};

export const normalFormMinus = (a: number, b: number): string => {
  var summe: string;
  Math.sqrt(b) % 1 === 0
    ? (summe = `${a - Math.sqrt(b)}`)
    : (summe = `${a}-${sqrtTex(b)}`);
  return summe;
};

const tangente: ProblemGeneratorNg<Problem> = {
  key: "tangente",
  image: "tangente.svg",
  generate: () => {
    var a = randomInt(-5, 6, exclude(0));
    var N = randomInt(-6, 3, exclude(0));
    var u = randomInt(N + 1, 7, exclude(0, N / 2));
    var n = 2 * u - N;
    var b = -a * (N + n);
    var c = a * N * n;
    var v = (4 * a * c - b * b) / (4 * a);
    var A = randomInt(a + 1, 7, exclude(0));
    var B = randomInt(-5, 7, exclude(0, b));
    var C = randomInt(c + 1, c + 10, exclude(0));
    var m = randomInt(-5, 6, exclude(0));
    var q = 0;
    a > 0
      ? (q = randomInt(c - 9, c, exclude(0, c, v - m * u)))
      : (q = randomInt(c + 1, c + 10, exclude(0, c, v - m * u, -m * N)));
    var i = randomInt(-9, 10, exclude(0));
    var k = randomInt(1, 4);
    var j = a * i * i + b * i + c - k * k * a;
    //var variant = randomElement(VARIANT);
    var variant =
      VARIANT[
        weighted(
          [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
          [30, 30, 8, 8, 8, 2, 2, 2, 2, 2, 2, 2, 2]
        )
      ];
    var given = variant[0];
    var sol = variant[1];
    var param = variant[2];

    return { a, b, c, N, n, u, v, m, q, A, B, C, i, j, k, given, sol, param };
  },

  format: (problem, translate) => {
    return {
      description: formatEquation(problem, translate),
      solution: formatSolution(problem),
    };
  },
};

export default tangente;
