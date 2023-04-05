import React from "react";
import styles from './FeaturedFavorites.module.scss';


const FeaturedFavorites = () => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>Featured Favorites</h2>
      </div>
      <div className={styles.left}></div>
      <div className={styles.right}></div>
    </div>
  );
};

export default FeaturedFavorites;
