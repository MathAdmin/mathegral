import React from "react";
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import SchoolIcon from "@mui/icons-material/School";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import chapters from "../problemGeneratorIndex";
import MathText from "./MathText";

const ProblemGeneratorList = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <>
      {chapters.map((chapter) => (
        <Accordion key={chapter.key}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">
              {t(`chapter.${chapter.key}.name`)}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <List>
              {chapter.generators.map((generator) => (
                <ListItem key={generator.key}>
                  <ListItemButton
                    key={generator.key}
                    onClick={() => navigate(`/problems/${generator.key}`)}
                  >
                    <ListItemIcon>
                      <SchoolIcon />
                    </ListItemIcon>
                    <ListItemText>
                      <MathText markup={t(`generator.${generator.key}.name`)} />
                    </ListItemText>
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </AccordionDetails>
        </Accordion>
      ))}
    </>
  );
};

export default ProblemGeneratorList;
