import { ProblemGenerator } from "./ProblemGeneratorSpi";
import arithmeticSeries from "./generator/arithmeticSeries";
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
    generators: [rightTriangle,quadraticEquation],
  },
  {
    key: "4Klasse",
    generators: [quadraticEquation2],
  },
  {
    key: "5Klasse",
    generators: [arithmeticSeries],
  },
  {
    key: "6Klasse",
    generators: [arithmeticSeries],
  },
];

export default chapters;
