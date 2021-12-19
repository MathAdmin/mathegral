import React from "react";
import { useTranslation } from "react-i18next";
import {
  Card,
  CardContent,
  CardActions,
  IconButton,
  CardHeader,
  Box,
  Divider,
  CardMedia,
} from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import TeX from "@matejmazur/react-katex";
import { Problem, ProblemGenerator } from "../ProblemGeneratorSpi";
import MathText from "./MathText";

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
        subheader={
          <MathText markup={t(`generator.${generator.key}.description`)} />
        }
      />
      {generator.image ? (
        <CardMedia
          component="img"
          sx={{ objectFit: "contain" }}
          height="200px"
          image={"/images/" + generator.image}
        />
      ) : null}
      <CardContent>
        <TeX
          settings={{
            trust: (context: any) =>
              ["\\includegraphics"].includes(context.command),
            strict: (errorCode: string) =>
              "newLineInDisplayMode" === errorCode ? "ignore" : "warn",
          }}
          math={problem.description}
          block
        />
        <Divider variant="middle" />
        <Box sx={{ visibility: solutionVisible ? "visible" : "hidden" }}>
          <TeX math={problem.solution} block />
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
