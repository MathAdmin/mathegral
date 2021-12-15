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
import { Problem, ProblemGenerator } from "../ProblemGeneratorSpi";
import "katex/dist/katex.min.css";
import RefreshIcon from "@mui/icons-material/Refresh";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
// @ts-ignore
import { BlockMath } from "react-katex";
import { useTranslation } from "react-i18next";

interface ProblemGeneratorCardProps {
  generator: ProblemGenerator;
}

const ProblemGeneratorCard = (props: ProblemGeneratorCardProps) => {
  const { t } = useTranslation();
  const generator = props.generator;

  const [problem, setProblem] = React.useState<Problem>(() =>
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
      <CardHeader
        title={t(`generator.${generator.key}.name`)}
        subheader={t(`generator.${generator.key}.description`)}
      />
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
