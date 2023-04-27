import React, { useEffect, useState } from "react";
import styles from "./MenuPage.module.scss";
import Navbar from "../components/shared/Navbar";
import MenuSelection from "../components/MenuSelection";
import Cart from "../components/Cart";
import cooking from "../assets/footage/menu.mp4";
import { useAuditoryBackground } from "../components/shared/useAuditoryBackground";
import auditoryBackground from "../assets/sounds/boiling-sizzling-cutting.mp3";
import { useDialog } from "../Contexts/DialogContext";
import { useOrderStage } from "../Contexts/OrderStageContext";
import FloatingCartButton from "../components/shared/FloatingCartButton";
import { useLocation } from "react-router-dom";
import { scroller } from "react-scroll";
import { useAudio } from "../Contexts/AudioContext";
import transitionSwoosh from "../assets/sounds/transition-swoosh.mp3";
import { Howl } from "howler";

const MenuPage = () => {
  const { isPayment } = useOrderStage();
  const { bgVolume, bgMuted } = useAudio();
  const { setBgSrc } = useAuditoryBackground(isPayment);
  const { dialogOpen } = useDialog();
  const location = useLocation();

  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const transitionSwooshSound = new Howl({
    src: [transitionSwoosh],
    volume: bgMuted ? 0 : bgVolume * 0.2,
    preload: true,
  });

  const isUserAtBottom = () => {
    const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
    // Checks if the user is near the last 500 pixels of the document
    const isAtBottom = scrollTop + clientHeight >= scrollHeight - 500;
    return isAtBottom;
  };

  useEffect(() => {
    if (location.hash) {
      transitionSwooshSound.play();
      scroller.scrollTo(location.hash.slice(1), {
        duration: 500,
        smooth: true,
      });
    } else if (location.state && location.state.hash === "menu") {
      transitionSwooshSound.play();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [location]);

  const scrollToCart = () => {
    if (!isUserAtBottom()) {
      transitionSwooshSound.play();
    }
    scroller.scrollTo("cart", {
      duration: 500,
      smooth: true,
    });
  };

  useEffect(() => {
    setBgSrc(auditoryBackground);
  }, [setBgSrc]);

  const handleResize = () => {
    setIsSmallScreen(window.innerWidth <= 1715);
  };

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className={styles.wrapper}>
      <div className={styles.navbar}>
        <Navbar dialogOpen={dialogOpen} />
      </div>
      <div className={styles.headerContent}>
        <div className={styles.flexWrapper}>
          <div className={styles.headerText}>
            <h2>DISCOVER OUR MENU</h2>
            <p>
              Indulge in an array of traditional and modern Japanese dishes,
              expertly crafted for your enjoyment.
            </p>
          </div>
          <div className={styles.headerVideo}>
            <video
              className={styles.video}
              src={cooking}
              playsInline
              autoPlay
              muted
              loop
            ></video>
          </div>
        </div>
      </div>
      <div className={styles.menuContent}>
        {isSmallScreen && <FloatingCartButton scrollToCart={scrollToCart} />}
        <MenuSelection />
        <section id="cart" className={styles.cartSection}>
          <Cart />
        </section>
      </div>
    </div>
  );
};

export default MenuPage;
