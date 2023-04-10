import React, { useEffect, useState, useCallback, useRef } from "react";
import styles from "./Landingpage.module.scss";
import Navbar from "../components/shared/Navbar";
import { useLocation } from "react-router-dom";
import { scroller } from "react-scroll";
import HeroSection from "../components/HeroSection";
import AboutUs from "../components/AboutUs";
import FeaturedFavorites from "../components/FeaturedFavorites";
import OurMenu from "../components/OurMenu";
import Location from "../components/Location";
import Footer from "../components/shared/Footer";
import ReactHowler from "react-howler";
import { throttle } from "lodash";
import { useAudio } from "../AudioContext";

import auditoryBackground from "../assets/sounds/boiling-sizzling-cutting.mp3";

//Max volumes for each Section
const sectionVolumes = {
  home: 0.3,
  about: 0.3,
  favorites: 0.2,
  menu: 0.1,
  location: 0.05,
};

function LandingPage() {
  const [scrollVolume, setScrollVolume] = useState(0.3);
  const { volume, muted } = useAudio();

  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      scroller.scrollTo(location.hash.slice(1), {
        duration: 500,
        smooth: true,
      });
    }
  }, [location]);

  const howlerRef = useRef(null);
  //mute auditoryBackground when User tabs out.
  const handleVisibilityChange = () => {
    if (document.visibilityState === "hidden") {
      if (howlerRef.current) {
        howlerRef.current.pause();
      }
    } else if (document.visibilityState === "visible") {
      if (howlerRef.current) {
        howlerRef.current.play();
      }
    }
  };

  useEffect(() => {
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  // This function calculates the volume based on the user's scroll position.
  const getSectionVolume = useCallback((scrollPosition) => {
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
  }, []);

  useEffect(() => {
    const handleScroll = throttle(() => {
      const scrollPosition = window.pageYOffset + window.innerHeight / 2;
      const volume = getSectionVolume(scrollPosition);
      setScrollVolume(volume);
    }, 100);

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [getSectionVolume]);

  const finalVolume = muted
    ? 0
    : Number.isFinite(volume * scrollVolume)
    ? volume * scrollVolume
    : 0;

  console.log("finalVolume", finalVolume);

  return (
    <div className="App">
      <section className={styles.navbar}>
        <Navbar />
      </section>
      <section id="home-section" className={styles.home} data-section="home">
        <div className={styles.bgColor}></div>
        <HeroSection />
      </section>
      <section id="about-section" className={styles.about} data-section="about">
        <AboutUs />
      </section>
      <section
        id="favorites-section"
        className={styles.favorites}
        data-section="favorites"
      >
        <FeaturedFavorites />
      </section>
      <section id="menu-section" data-section="menu">
        <OurMenu />
      </section>
      <section
        id="location-section"
        className={styles.location}
        data-section="location"
      >
        <Location />
      </section>
      <footer className={styles.footer}>
        <Footer />
      </footer>
      <ReactHowler
        ref={howlerRef}
        src={auditoryBackground}
        volume={finalVolume}
        loop={true}
        preload={true}
      />
    </div>
  );
}

export default LandingPage;
