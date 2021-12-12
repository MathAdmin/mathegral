import QuadraticEquation from "./generator/QuadraticEquation";
import { ProblemCategory, ProblemGenerator } from "./ProblemApi";

const index: ProblemGenerator<ProblemCategory>[] = [new QuadraticEquation()];

export default index;
