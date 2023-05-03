import React, { useEffect } from "react";
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
import { useAuditoryBackground } from "../components/shared/useAuditoryBackground";
import { useAudio } from "../Contexts/AudioContext";
import { useDialog } from "../Contexts/DialogContext";
import transitionSwoosh from "../assets/sounds/transition-swoosh.mp3";
import { Howl } from "howler";

import auditoryBackground from "../assets/sounds/boiling-sizzling-cutting.mp3";

function LandingPage() {
  const { setBgSrc } = useAuditoryBackground();
  const { dialogOpen } = useDialog();
  const { bgVolume, bgMuted } = useAudio();
  const location = useLocation();

  const transitionSwooshSound = new Howl({
    src: [transitionSwoosh],
    volume: bgMuted ? 0 : bgVolume * 0.2,
    preload: true,
  });

  const calculateScrollDuration = (start, end) => {
    const distance = Math.abs(end - start);
    const duration = (distance / 1000) * 500; // speed of scrolling

    return duration;
  };

  useEffect(() => {
    if (location.hash) {
      const targetId = location.hash.slice(1);
      const startScrollPosition = window.scrollY;
      const targetElement = document.getElementById(targetId);
      const targetScrollPosition = targetElement ? targetElement.offsetTop : 0;
      const duration = calculateScrollDuration(
        startScrollPosition,
        targetScrollPosition
      );
      console.log("starting location.hash", duration);

      // Only play the transition swoosh sound if the duration is greater than or equal to 150ms (this avoids swoosh sound for short scrolls)
      if (duration >= 150) {
        console.log("im playing");
        transitionSwooshSound.play();
      }

      scroller.scrollTo(targetId, {
        duration: duration,
        smooth: true,
      });
    }
  }, [location]);

  useEffect(() => {
    setBgSrc(auditoryBackground);
  }, [setBgSrc]);
  return (
    <div className="LandingPage">
      <section className={styles.navbar}>
        <Navbar dialogOpen={dialogOpen} />
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
    </div>
  );
}

export default LandingPage;
