import React from "react";
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import index from "../problemGeneratorIndex";
import MathText from "./MathText";

const ProblemGeneratorList = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <List>
      {index.map((generator) => (
        <ListItem key={generator.key}>
          <ListItemButton
            key={generator.key}
            onClick={() => navigate(`/problems/${generator.key}`)}
          >
            <ListItemIcon>
              <ArrowForwardIcon />
            </ListItemIcon>
            <ListItemText>
              <MathText markup={t(`generator.${generator.key}.name`)} />
            </ListItemText>
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
};

export default ProblemGeneratorList;
