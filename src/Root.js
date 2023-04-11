import React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { AudioProvider } from "./AudioContext";
import { themeOptions } from "../src/styles/theme.ts";
import LandingPage from "./pages/LandingPage";
import MenuPage from "./pages/MenuPage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const theme = createTheme(themeOptions);

const Root = () => {
  return (
    <ThemeProvider theme={theme}>
      <AudioProvider>
        <Router>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/menu" element={<MenuPage />} />
          </Routes>
        </Router>
      </AudioProvider>
    </ThemeProvider>
  );
};

export default Root;