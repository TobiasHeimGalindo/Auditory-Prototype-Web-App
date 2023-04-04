import React from "react";
import "./App.css";
import HeroSection from "./components/HeroSection";
import AboutUs from "./components/AboutUs";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { themeOptions } from "../src/styles/theme.ts";

const theme = createTheme(themeOptions);

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <section className="hero-section">
          <div className="bg-color"></div>
          {/* for the overlap effect */}
          <HeroSection />
        </section>
        <section className="about-us-section">
          <AboutUs />
        </section>
        <section className="featured-favorites-section">
          Featured Favorites Section
        </section>
        <section className="menu-section">Menu Section</section>
        <section className="location-section">Location Section</section>
        <footer className="footer">Footer</footer>
      </div>
    </ThemeProvider>
  );
}

export default App;
