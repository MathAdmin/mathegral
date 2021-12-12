import React from "react";
import {
  Card,
  CardContent,
  CardActions,
  IconButton,
  CardHeader,
  Box,
} from "@mui/material";
import {
  EquationSolving,
  ProblemGenerator,
  ProblemCategory,
  ProblemCategoryVisitor,
} from "../problem/ProblemApi";
import "katex/dist/katex.min.css";
import RefreshIcon from "@mui/icons-material/Refresh";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
// @ts-ignore
import { BlockMath } from "react-katex";

interface ProblemGeneratorCardProps {
  generator: ProblemGenerator<ProblemCategory>;
}

interface EquationSolvingProps {
  problem: EquationSolving;
}

const ProblemGeneratorCard = (props: ProblemGeneratorCardProps) => {
  const generator = props.generator;

  const [problem, setProblem] = React.useState<ProblemCategory>(
    generator.generate()
  );
  const [solutionVisible, setSolutionVisible] = React.useState(false);

  const refresh = () => {
    setSolutionVisible(false);
    setProblem(generator.generate());
  };

  const toggleSolution = () => {
    setSolutionVisible(!solutionVisible);
  };

  return (
    <Card>
      <CardHeader title={generator.name} subheader={generator.description} />
      <CardContent>
        {problem.accept(problemRenderer)}
        <Box sx={{ visibility: solutionVisible ? "visible" : "hidden" }}>
          {problem.accept(solutionRenderer)}
        </Box>
      </CardContent>
      <CardActions>
        <IconButton onClick={refresh}>
          <RefreshIcon />
        </IconButton>
        <IconButton onClick={toggleSolution}>
          {solutionVisible ? <VisibilityOffIcon /> : <VisibilityIcon />}
        </IconButton>
      </CardActions>
    </Card>
  );
};

const problemRenderer: ProblemCategoryVisitor = {
  visitEquationSolving: (problem: EquationSolving) => {
    return <EquationSolvingProblem problem={problem} />;
  },
};

const solutionRenderer: ProblemCategoryVisitor = {
  visitEquationSolving: (problem: EquationSolving) => {
    return <EquationSolvingSolution problem={problem} />;
  },
};

const EquationSolvingProblem = (props: EquationSolvingProps) => {
  return <BlockMath math={props.problem.equation} />;
};

const EquationSolvingSolution = (props: EquationSolvingProps) => {
  return <BlockMath math={props.problem.solution} />;
};

export default ProblemGeneratorCard;
