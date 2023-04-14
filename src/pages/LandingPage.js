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
import ReactHowler from "react-howler";
import { useAuditoryBackground } from "../components/shared/useAuditoryBackground";

import auditoryBackground from "../assets/sounds/boiling-sizzling-cutting.mp3";

function LandingPage() {
  const { finalVolume, howlerRef } = useAuditoryBackground();

  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      scroller.scrollTo(location.hash.slice(1), {
        duration: 500,
        smooth: true,
      });
    }
  }, [location]);

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
