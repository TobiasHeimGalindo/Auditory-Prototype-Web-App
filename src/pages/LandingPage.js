import React, { useEffect, useState, useRef } from "react";
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

  useEffect(() => {
    const handleScroll = throttle(() => {
      const scrollPosition = window.pageYOffset;
      const windowHeight = window.innerHeight;
      const maxVolume = 0.3;
      const minVolume = 0.1;
      const documentHeight = document.documentElement.scrollHeight;

      const volumeRange = maxVolume - minVolume;
      const scrollVolume =
        maxVolume -
        (scrollPosition / (documentHeight - windowHeight)) * volumeRange;

      setScrollVolume(scrollVolume);
    }, 100);

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const finalVolume = muted
    ? 0
    : Number.isFinite(volume * scrollVolume)
    ? volume * scrollVolume
    : 0;

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
      <section id="menu-section" className={styles.menu} data-section="menu">
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
