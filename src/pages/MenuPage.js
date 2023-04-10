import React from "react";
import styles from "./MenuPage.module.scss";
import Navbar from "../components/shared/Navbar";

const MenuPage = () => {
  return (
    <div className={styles.container}>
      <Navbar />
      <div className={styles.journey}>
        <h2>Our Journey</h2>
        <p>
          Founded by a passionate chef, our restaurant is a dream to share the
          flavors of Japan. Join us on our journey and experience the artistry
          of Japanese cuisine
        </p>
      </div>
      <div className={styles.rectangle}></div>
    </div>
  );
};

export default MenuPage;
