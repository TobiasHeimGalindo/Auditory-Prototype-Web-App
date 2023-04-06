import React from "react";
import "./App.css";
import HeroSection from "./components/HeroSection";
import AboutUs from "./components/AboutUs";
import FeaturedFavorites from "./components/FeaturedFavorites";
import OurMenu from "./components/OurMenu";
import Location from "./components/Location";
import Footer from "./components/shared/Footer";
import Navbar from "./components/shared/Navbar";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { themeOptions } from "../src/styles/theme.ts";

const theme = createTheme(themeOptions);

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <section className="Navbar">
          <Navbar />
        </section>
        <section className="home-section">
          <div className="bg-color"></div> {/* for the overlap effect */}
          <HeroSection />
        </section>
        <section className="about-section">
          <AboutUs />
        </section>
        <section className="favorites-section">
          <FeaturedFavorites />
        </section>
        <section className="menu-section">
          <OurMenu />
        </section>
        <section className="location-section">
          <Location />
        </section>
        <footer className="footer">
          <Footer />
        </footer>
      </div>
    </ThemeProvider>
  );
}

export default App;
