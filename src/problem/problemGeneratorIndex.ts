import { ProblemGenerator } from "./ProblemGeneratorSpi";
import arithmeticSeries from "./generator/arithmeticSeries";
import geometricSeries from "./generator/geometricSeries";
import quadraticEquation from "./generator/quadraticEquation";
import quadraticEquation2 from "./generator/quadraticEquation2";
import rightTriangle from "./generator/rightTriangle";

interface Chapter {
  key: string;
  generators: ProblemGenerator[];
}

const chapters: Chapter[] = [
  {
    key: "3Klasse",
    generators: [rightTriangle,quadraticEquation,quadraticEquation2],
  },
  {
    key: "4Klasse",
    generators: [quadraticEquation2],
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
