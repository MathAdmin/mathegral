import React from "react";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { useNavigate } from "react-router";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import index from "./problemGeneratorIndex";

const ProblemGeneratorList = () => {
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
            <ListItemText>{generator.name}</ListItemText>
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
};

export default ProblemGeneratorList;
