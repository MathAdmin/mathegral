import React from "react";
import {
  CssBaseline,
  Container,
  AppBar,
  Typography,
  Toolbar,
  IconButton,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import GitHubIcon from "@mui/icons-material/GitHub";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import ProblemGeneratorList from "./problem/ProblemGeneratorList";
import ProblemGeneratorCard from "./problem/ProblemGeneratorCard";
import index from "./problem/problemGeneratorIndex";

function App() {
  return (
    <Router>
      <CssBaseline />
      <Header />
      <Container sx={{ mt: 3 }}>
        <Routes>
          <Route path="/" element={<ProblemGeneratorList />} />
          {index.map((generator) => (
            <Route
              key={`problems.${generator.key}`}
              path={`/problems/${generator.key}`}
              element={<ProblemGeneratorCard generator={generator} />}
            />
          ))}
        </Routes>
      </Container>
    </Router>
  );
}

const Header = () => {
  const navigate = useNavigate();
  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="home"
          sx={{ mr: 2 }}
          onClick={() => navigate("/")}
        >
          <HomeIcon />
        </IconButton>
        <Typography variant="h5" sx={{ flexGrow: 1 }}>
          Matherhorn
        </Typography>
        <IconButton
          size="large"
          color="inherit"
          aria-label="goto GitHub"
          onClick={() => window.open("https://github.com/alimfeld/matherhorn")}
        >
          <GitHubIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default App;
