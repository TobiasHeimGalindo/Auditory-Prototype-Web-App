import React, { useState, useEffect, useRef } from "react";
import styles from "./MenuPage.module.scss";
import Navbar from "../components/shared/Navbar";
import MenuSelection from "../components/MenuSelection";
import Cart from "../components/Cart";
import cooking from "../assets/footage/menu.mp4";
import ReactHowler from "react-howler";
import { throttle } from "lodash";
import { useAudio } from "../AudioContext";
import { useCart } from "../CartContext";
import auditoryBackground from "../assets/sounds/boiling-sizzling-cutting.mp3"; // TODO: REPLACE WITH UNIQUE MENU AUDIO

const MenuPage = () => {
  const [scrollVolume, setScrollVolume] = useState(0.3);
  const { volume, muted } = useAudio();
  const { cartHasItems } = useCart();
  const howlerRef = useRef(null);

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

  const finalVolume =
    muted || cartHasItems
      ? 0
      : Number.isFinite(volume * scrollVolume)
      ? volume * scrollVolume
      : 0;
  console.log("finalVolume", finalVolume);

  return (
    <div className={styles.wrapper}>
      <div className={styles.navbar}>
        <Navbar />
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
        <MenuSelection />
        <Cart />
      </div>
      <ReactHowler
        ref={howlerRef}
        src={auditoryBackground}
        volume={finalVolume}
        loop={true}
        preload={true}
      />
    </div>
  );
};

export default MenuPage;
