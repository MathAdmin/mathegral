import React from "react";
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import {
  Card,
  CardContent,
  CardActions,
  IconButton,
  CardHeader,
  Box,
  CardMedia,
  Collapse,
  Tooltip,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
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
  const navigate = useNavigate();
  const { t } = useTranslation();
  const generator = props.generator;

  const [problem, setProblem] = React.useState<Problem>(() =>
    generator.generate(t)
  );
  const [solutionVisible, setSolutionVisible] = React.useState(false);

  const refresh = () => {
    setSolutionVisible(false);
    setProblem(generator.generate(t));
  };

  const toggleSolution = () => {
    setSolutionVisible(!solutionVisible);
  };

  const title = t(`generator.${generator.key}.name`);
  const closeText = t("action.close");
  const regenerateText = t("action.regenerate");
  const toggleSolutionText = t("action.toggle-solution");

  return (
    <Card>
      <CardHeader
        title={title}
        subheader={
          <MathText markup={t(`generator.${generator.key}.description`)} />
        }
        action={
          <Tooltip title={closeText}>
            <IconButton aria-label={closeText} onClick={() => navigate("/")}>
              <CloseIcon />
            </IconButton>
          </Tooltip>
        }
      />
      {generator.image ? (
        <CardMedia
          component="img"
          sx={{ objectFit: "contain" }}
          height="200px"
          image={"/images/" + generator.image}
          alt={title}
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
      </CardContent>
      <CardActions>
        <Tooltip title={regenerateText}>
          <IconButton aria-label={regenerateText} onClick={refresh}>
            <RefreshIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title={toggleSolutionText}>
          <IconButton aria-label={toggleSolutionText} onClick={toggleSolution}>
            {solutionVisible ? <VisibilityOffIcon /> : <VisibilityIcon />}
          </IconButton>
        </Tooltip>
      </CardActions>
      <Collapse in={solutionVisible} timeout="auto" unmountOnExit>
        <CardContent>
          <Box sx={{ visibility: solutionVisible ? "visible" : "hidden" }}>
            <TeX math={problem.solution} block />
          </Box>
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default ProblemGeneratorCard;
