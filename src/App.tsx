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
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import GitHubIcon from "@mui/icons-material/GitHub";
import "katex/dist/katex.min.css";
import ProblemGeneratorList from "./problem/component/ProblemGeneratorList";
import ProblemGeneratorCard from "./problem/component/ProblemGeneratorCard";
import chapters from "./problem/problemGeneratorIndex";
import { ProblemGenerator } from "./problem/ProblemGeneratorSpi";

const index = new Set<ProblemGenerator>();
chapters.forEach((chapter) => {
  chapter.generators.forEach((generator) => index.add(generator));
});

function App() {
  return (
    <Router>
      <CssBaseline />
      <Header />
      <Container sx={{ mt: 3 }}>
        <Suspense fallback={<CircularProgress />}>
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
        </Suspense>
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
