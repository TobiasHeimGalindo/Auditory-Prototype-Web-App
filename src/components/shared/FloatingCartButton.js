import React from "react";
import styles from "./FloatingCartButton.module.scss";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

const FloatingCartButton = ({ scrollToCart }) => {
  return (
    <div className={styles.floatingCartButton} onClick={scrollToCart}>
      <ShoppingCartIcon fontSize="large" />
    </div>
  );
};

export default FloatingCartButton;
