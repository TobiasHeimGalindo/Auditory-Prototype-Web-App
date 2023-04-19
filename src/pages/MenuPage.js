import React, { useEffect } from "react";
import styles from "./MenuPage.module.scss";
import Navbar from "../components/shared/Navbar";
import MenuSelection from "../components/MenuSelection";
import Cart from "../components/Cart";
import cooking from "../assets/footage/menu.mp4";
import { useAuditoryBackground } from "../components/shared/useAuditoryBackground";
import { useCart } from "../CartContext";
import auditoryBackground from "../assets/sounds/boiling-sizzling-cutting.mp3";
import { useDialog } from "../DialogContext";


const MenuPage = () => {
  const { cartHasItems } = useCart();
  const { setBgSrc } = useAuditoryBackground(cartHasItems);

  const { dialogOpen } = useDialog();

  useEffect(() => {
    setBgSrc(auditoryBackground);
  }, [setBgSrc]);

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
        <MenuSelection />
        <Cart />
      </div>
    </div>
  );
};

export default MenuPage;
