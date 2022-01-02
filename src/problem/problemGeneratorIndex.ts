import { ProblemGenerator } from "./ProblemGeneratorSpi";
import arithmeticSeries from "./generator/arithmeticSeries";
import quadraticEquation from "./generator/quadraticEquation";
import rightTriangle from "./generator/rightTriangle";

interface Chapter {
  key: string;
  generators: ProblemGenerator[];
}

const chapters: Chapter[] = [
  {
    key: "3Klasse",
    generators: [rightTriangle],
  },
  {
    key: "4Klasse",
    generators: [quadraticEquation],
  },
  {
    key: "5Klasse",
    generators: [arithmeticSeries],
  },
 
];

export default chapters;
