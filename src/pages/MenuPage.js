import React from "react";
import styles from "./MenuPage.module.scss";
import Navbar from "../components/shared/Navbar";
import MenuSelection from "../components/MenuSelection";
import Cart from "../components/Cart";
import cooking from "../assets/footage/menu.mp4";
import ReactHowler from "react-howler";
import { useAuditoryBackground } from "../components/shared/useAuditoryBackground";
import { useCart } from "../CartContext";
import { useAudio } from "../AudioContext";
import auditoryBackground from "../assets/sounds/boiling-sizzling-cutting.mp3"; // TODO: REPLACE WITH UNIQUE MENU AUDIO

const MenuPage = () => {
  const { cartHasItems } = useCart();
  const { muted } = useAudio();
  const { finalVolume, howlerRef } = useAuditoryBackground(cartHasItems);

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
      {!muted ? (
        <ReactHowler
          ref={howlerRef}
          src={auditoryBackground}
          volume={finalVolume}
          loop={true}
        />
      ) : (
        0
      )}
    </div>
  );
};

export default MenuPage;
