import React from "react";
import styles from "./FeaturedFavorites.module.scss";
import CardComponent from "./shared/CardComponent";

import umamiRamen from "../assets/footage/umami-ramen.mp4";
import tokyoSunrise from "../assets/footage/tokyo-sunrise.mp4";

const FeaturedFavorites = () => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>Featured Favorites</h2>
        <p>
          Healthy, high-quality ingredients crafted to perfection by our chef.
          Try our most loved dishes and indulge in delicious flavors today
        </p>
      </div>
      <div className={styles.left}>
        <CardComponent
          videoSrc={umamiRamen}
          title="Umami Ramen"
          ingredients="Pork belly, chicken broth, ramen noodles, soft-boiled egg"
          price="9.50€"
        />
      </div>
      <div className={styles.right}>
        <CardComponent
          videoSrc={tokyoSunrise}
          title="Tokyo Sunrise"
          ingredients="Salmon, sushi rice, rice vinegar, cucumber, carrot, daikon radish, furikake"
          price="11.50€"
        />
      </div>
    </div>
  );
};

export default FeaturedFavorites;
