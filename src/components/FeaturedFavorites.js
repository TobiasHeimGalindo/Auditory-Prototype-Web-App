import React, { useState } from "react";
import styles from "./FeaturedFavorites.module.scss";
import CardComponent from "./shared/CardComponent";
import { useAudio } from "../Contexts/AudioContext";
import { useNavigate } from "react-router-dom";
import { useCart } from "../Contexts/CartContext";
import { useSnackbar } from "../Contexts/SnackbarContext";

import umamiRamen from "../assets/footage/umami-ramen.mp4";
import tokyoSunrise from "../assets/footage/tokyo-sunrise.mp4";

import umamiImage from "../assets/footage/umamiImage.PNG";
import tokyoImage from "../assets/footage/tokyoImage.PNG";

const FeaturedFavorites = () => {
  const [umamiRamenHovered, setUmamiRamenHovered] = useState(false);
  const [tokyoSunriseHovered, setTokyoSunriseHovered] = useState(false);
  const { setSnackbarOpen, setSnackbarContent, setSnackbarDuration } =
    useSnackbar();

  const { preloadedSounds } = useAudio();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const handleUmamiRamenHover = () => {
    preloadedSounds.softSizzle.play();
    setUmamiRamenHovered(true);
  };

  const handleTokyoSunriseHover = () => {
    preloadedSounds.plateDrop.play();
    setTokyoSunriseHovered(true);
  };
  const selectItemSound = () => {
    preloadedSounds.selectItem.play();
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
    selectItemSound();
    setSnackbarContent({
      message: "Umami Ramen added to cart",
      details: "",
      button: {
        label: "View Cart",
        onClick: () => navigate("/menu#cart"),
      },
    });
    setSnackbarDuration(2500);
    setSnackbarOpen(true);
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
    selectItemSound();
    setSnackbarContent({
      message: "Tokyo Sunrise added to cart",
      details: "",
      button: {
        label: "View Cart",
        onClick: () => navigate("/menu#cart"),
      },
    });
    setSnackbarDuration(2500);
    setSnackbarOpen(true);
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
          <div className={styles.cardContainer} onClick={handleClickUmamiRamen}>
            <CardComponent
              videoSrc={umamiRamen}
              title="Umami Ramen"
              ingredients="Pork belly, chicken broth, ramen noodles, soft-boiled egg"
              price="$9.50"
              onHover={handleUmamiRamenHover}
            />
          </div>
        </div>
      </div>
      <div className={styles.right}>
        <div>
          <div
            className={styles.cardContainer}
            onClick={handleClickTokyoSunrise}
          >
            <CardComponent
              videoSrc={tokyoSunrise}
              title="Tokyo Sunrise"
              ingredients="Salmon, sushi rice, rice vinegar, cucumber, carrot, daikon radish, furikake"
              price="$11.50"
              onHover={handleTokyoSunriseHover}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedFavorites;
