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
    key: "equation-solving",
    generators: [quadraticEquation],
  },
  {
    key: "series",
    generators: [arithmeticSeries],
  },
  {
    key: "geometry",
    generators: [rightTriangle],
  },
];

export default chapters;
