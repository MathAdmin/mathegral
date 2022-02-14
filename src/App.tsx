import React, { Suspense } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import {
  CssBaseline,
  Container,
  AppBar,
  Typography,
  Toolbar,
  IconButton,
  CircularProgress,
  Tooltip,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import GitHubIcon from "@mui/icons-material/GitHub";
import "katex/dist/katex.min.css";
import ProblemGeneratorList from "./problem/component/ProblemGeneratorList";
import ProblemGeneratorCard from "./problem/component/ProblemGeneratorCard";
import chapters from "./problem/problemGeneratorIndex";
import { ProblemGenerator } from "./problem/ProblemGeneratorSpi";
import { useTranslation } from "react-i18next";

const index = new Set<ProblemGenerator>();
chapters.forEach((chapter) => {
  chapter.generators.forEach((generator) => index.add(generator));
});

function App() {
  return (
    <Router>
      <CssBaseline />
      <Suspense fallback={<CircularProgress />}>
        <Header />
        <Container sx={{ mt: 3 }}>
          <Routes>
            <Route path="/" element={<ProblemGeneratorList />} />
            {Array.from(index).map((generator) => (
              <Route
                key={`problems.${generator.key}`}
                path={`/problems/${generator.key}`}
                element={<ProblemGeneratorCard generator={generator} />}
              />
            ))}
          </Routes>
        </Container>
      </Suspense>
    </Router>
  );
}

const Header = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const homeText = t("action.home");
  const githubText = t("action.github");
  return (
    <AppBar position="static">
      <Toolbar>
        <Tooltip title={homeText}>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label={homeText}
            sx={{ mr: 2 }}
            onClick={() => navigate("/")}
          >
            <HomeIcon />
          </IconButton>
        </Tooltip>
        <Typography variant="h5" sx={{ flexGrow: 1 }}>
          Mathegral
        </Typography>
        <Tooltip title={githubText}>
          <IconButton
            size="large"
            color="inherit"
            aria-label={githubText}
            onClick={() =>
              window.open("https://github.com/MathAdmin/mathegral")
            }
          >
            <GitHubIcon />
          </IconButton>
        </Tooltip>
      </Toolbar>
    </AppBar>
  );
};

export default App;
