import React, { useState } from "react";
import styles from "./FeaturedFavorites.module.scss";
import CardComponent from "./shared/CardComponent";
import { useAudio } from "../AudioContext";
import { useNavigate } from "react-router-dom";
import { useCart } from "../CartContext";

import umamiRamen from "../assets/footage/umami-ramen.mp4";
import tokyoSunrise from "../assets/footage/tokyo-sunrise.mp4";

import umamiImage from "../assets/footage/umamiImage.PNG";
import tokyoImage from "../assets/footage/tokyoImage.PNG";

import softSizzle from "../assets/sounds/Auditory Icon/soft-sizzle.mp3";
import plateDrop from "../assets/sounds/Auditory Icon/PlateDrop.mp3";

const FeaturedFavorites = () => {
  const [umamiRamenHovered, setUmamiRamenHovered] = useState(false);
  const [tokyoSunriseHovered, setTokyoSunriseHovered] = useState(false);

  const { setPlaying, setSrc } = useAudio();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const handleUmamiRamenHover = () => {
    setPlaying(true);
    setSrc(softSizzle);
    setUmamiRamenHovered(true);
  };

  const handleTokyoSunriseHover = () => {
    setPlaying(true);
    setSrc(plateDrop);
    setTokyoSunriseHovered(true);
  };

  const handleClickUmamiRamen = () => {
    addToCart({
      id: 1,
      category: "Ramen",
      title: "Umami Ramen",
      ingredients: "Pork belly ramen noodles, soft-boiled egg",
      price: "$9.50",
      imageSrc: umamiImage,
    });
    navigate("/menu");
  };

  const handleClickTokyoSunrise = () => {
    addToCart({
      id: 2,
      category: "Rice",
      title: "Tokyo Sunrise",
      ingredients: "Salmon, sushi rice,  cucumber, ",
      price: "$11.50",
      imageSrc: tokyoImage,
    });
    navigate("/menu");
  };

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
              price="$9.50"
              onHover={handleUmamiRamenHover}
              onClick={handleClickUmamiRamen}
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
              price="$11.50"
              onHover={handleTokyoSunriseHover}
              onClick={handleClickTokyoSunrise}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedFavorites;
