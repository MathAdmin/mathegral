import React from "react";
import {
  Card,
  CardContent,
  CardActions,
  IconButton,
  CardHeader,
  Box,
  Divider,
} from "@mui/material";
import { Problem, ProblemGenerator } from "../problem/ProblemApi";
import "katex/dist/katex.min.css";
import RefreshIcon from "@mui/icons-material/Refresh";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
// @ts-ignore
import { BlockMath } from "react-katex";

interface ProblemGeneratorCardProps {
  generator: ProblemGenerator;
}

const ProblemGeneratorCard = (props: ProblemGeneratorCardProps) => {
  const generator = props.generator;

  const [problem, setProblem] = React.useState<Problem>(generator.generate());
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
        <BlockMath math={problem.description} />
        <Divider variant="middle" />
        <Box sx={{ visibility: solutionVisible ? "visible" : "hidden" }}>
          <BlockMath math={problem.solution} />
        </Box>
      </CardContent>
      <CardActions>
        <IconButton aria-label="refresh" onClick={refresh}>
          <RefreshIcon />
        </IconButton>
        <IconButton aria-label="toggle solution" onClick={toggleSolution}>
          {solutionVisible ? <VisibilityOffIcon /> : <VisibilityIcon />}
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default ProblemGeneratorCard;
