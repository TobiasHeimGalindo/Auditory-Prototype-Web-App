import React from "react";
import styles from "./MenuPage.module.scss";
import Navbar from "../components/shared/Navbar";
import MenuSelection from "../components/MenuSelection";

import cooking from "../assets/footage/menu.mp4";

const MenuPage = () => {
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
      </div>
    </div>
  );
};

export default MenuPage;
