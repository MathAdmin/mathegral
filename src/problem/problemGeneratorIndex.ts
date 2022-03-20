import { ProblemGenerator } from "./ProblemGeneratorSpi";
import arithmeticSeries from "./generator/arithmeticSeries";
import geometricSeries from "./generator/geometricSeries";
import quadraticEquation from "./generator/quadraticEquation";
import quadraticEquation2 from "./generator/quadraticEquation2";
import rightTriangle from "./generator/rightTriangle";
import sinTriangle from "./generator/sinTriangle";
import fractionalEquation from "./generator/fractionalEquation";
import squareEquation from "./generator/squareEquation";
import angleName from "./generator/angleName";
import primeFactor from "./generator/primeFactor";
import commonArithmetic from "./generator/commonArithmetic";

interface Chapter {
  key: string;
  generators: ProblemGenerator[];
}

const chapters: Chapter[] = [
  {
    key: "3Klasse",
    generators: [primeFactor,commonArithmetic,angleName, rightTriangle,quadraticEquation,quadraticEquation2,fractionalEquation, squareEquation],
  },
  {
    key: "4Klasse",
    generators: [quadraticEquation2,sinTriangle],
  },
  {
    key: "5Klasse",
    generators: [arithmeticSeries,geometricSeries],
  },
  {
    key: "6Klasse",
    generators: [arithmeticSeries,geometricSeries],
  },
];

export default chapters;
