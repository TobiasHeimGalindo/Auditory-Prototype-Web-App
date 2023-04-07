import React, { useState } from "react";
import styles from "./FeaturedFavorites.module.scss";
import CardComponent from "./shared/CardComponent";
import ReactHowler from "react-howler";
import { useAudio } from "../AudioContext";

import umamiRamen from "../assets/footage/umami-ramen.mp4";
import tokyoSunrise from "../assets/footage/tokyo-sunrise.mp4";

import sizzlingBowl from "../assets/sounds/Auditory Icon/SizzlingBowl.mp3";
import plateDrop from "../assets/sounds/Auditory Icon/PlateDrop.mp3";

const FeaturedFavorites = () => {
  const [umamiRamenHovered, setUmamiRamenHovered] = useState(false);
  const [tokyoSunriseHovered, setTokyoSunriseHovered] = useState(false);

  const { volume, muted } = useAudio();

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
        <div>
          <div className={styles.cardContainer}>
            <CardComponent
              videoSrc={umamiRamen}
              title="Umami Ramen"
              ingredients="Pork belly, chicken broth, ramen noodles, soft-boiled egg"
              price="9.50€"
              onHover={() => setUmamiRamenHovered(true)}
            />
          </div>
        </div>
      </div>
      <div className={styles.right}>
        <div>
          <div className={styles.cardContainer}>
            <CardComponent
              videoSrc={tokyoSunrise}
              title="Tokyo Sunrise"
              ingredients="Salmon, sushi rice, rice vinegar, cucumber, carrot, daikon radish, furikake"
              price="11.50€"
              onHover={() => setTokyoSunriseHovered(true)}
            />
          </div>
        </div>
      </div>
      {umamiRamenHovered && (
        <ReactHowler
          volume={muted ? 0 : volume}
          src={sizzlingBowl}
          playing={true}
          onEnd={() => setUmamiRamenHovered(false)}
        />
      )}
      {tokyoSunriseHovered && (
        <ReactHowler
          src={plateDrop}
          volume={muted ? 0 : volume}
          playing={true}
          onEnd={() => setTokyoSunriseHovered(false)}
        />
      )}
    </div>
  );
};

export default FeaturedFavorites;
