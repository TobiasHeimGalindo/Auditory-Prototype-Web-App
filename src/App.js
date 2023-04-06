import React, { useEffect, useState } from "react";
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
import ReactHowler from "react-howler";
import { throttle } from "lodash";

import auditoryBackground from "./assets/sounds/kitchen-loop.mp3";

const theme = createTheme(themeOptions);

function App() {
  const [volume, setVolume] = useState(0);
  const sectionVolumes = {
    home: 0.2,
    about: 0.2,
    favorites: 0.1,
    menu: 0.05,
    location: 0.05,
  };
  // This function calculates the volume based on the user's scroll position.
  const getSectionVolume = (scrollPosition) => {
    // Select all sections that we want to control the volume for.
    const sections = document.querySelectorAll(
      ".home-section, .about-section, .favorites-section, .menu-section, .location-section"
    );

    // Iterate through each section.
    for (const section of sections) {
      // Calculate the top and bottom Y-coordinates of the section.
      const sectionTop = section.offsetTop;
      const sectionBottom = sectionTop + section.offsetHeight;

      // Check if the scroll position is within the current section.
      if (scrollPosition >= sectionTop && scrollPosition <= sectionBottom) {
        // Get the section name from the data-section attribute.
        const sectionName = section.dataset.section;
        // Get the base volume for the current section from the sectionVolumes object.
        const sectionBaseVolume = sectionVolumes[sectionName];

        // Calculate the relative scroll position within the section (a value between 0 and 1).
        const relativeScrollPosition =
          (scrollPosition - sectionTop) / section.offsetHeight;

        // Get the next section element and its section name.
        const nextSection = section.nextElementSibling;
        const nextSectionName = nextSection && nextSection.dataset.section;
        // Get the base volume for the next section or set it to 0 if there's no next section.
        const nextSectionVolume = nextSectionName
          ? sectionVolumes[nextSectionName]
          : 0;

        // Calculate the volume difference between the current and next sections.
        const volumeDifference = nextSectionVolume - sectionBaseVolume;

        // Calculate the current volume based on the relative scroll position within the section.
        // This will create a smooth transition between the base volumes of the current and next sections.
        const currentVolume =
          sectionBaseVolume + volumeDifference * relativeScrollPosition;

        return currentVolume;
      }
    }

    // If the scroll position is not within any of the sections, set the volume to 0.
    return 0;
  };

  useEffect(() => {
    // Throttle the handleScroll frequency to fix distorted/bad audio quality.
    const handleScroll = throttle(() => {
      const scrollPosition = window.pageYOffset + window.innerHeight / 2;
      const volume = getSectionVolume(scrollPosition);
      setVolume(volume);
    }, 100); // Limit the number of times the scroll handler is called to once every 100 ms.

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <section className="Navbar">
          <Navbar />
        </section>
        <section className="home-section" data-section="home">
          <div className="bg-color"></div>
          <HeroSection />
        </section>
        <section className="about-section" data-section="about">
          <AboutUs />
        </section>
        <section className="favorites-section" data-section="favorites">
          <FeaturedFavorites />
        </section>
        <section className="menu-section" data-section="menu">
          <OurMenu />
        </section>
        <section className="location-section" data-section="location">
          <Location />
        </section>
        <footer className="footer">
          <Footer />
        </footer>
        <ReactHowler
          src={auditoryBackground}
          volume={volume}
          loop={true}
          preload={true}
        />
      </div>
    </ThemeProvider>
  );
}

export default App;
