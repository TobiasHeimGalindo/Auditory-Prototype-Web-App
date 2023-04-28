import React, { useState } from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";
import styles from "./ImageCard.module.scss";
import ShoppingBasketRoundedIcon from "@mui/icons-material/ShoppingBasketRounded";

import popularFlame from "../../assets/footage/flame.png";

const ImageCard = ({
  imageSrc,
  title,
  ingredients,
  price,
  popular,
  onClick,
  onMouseEnter,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [hasPlayedAnimation, setHasPlayedAnimation] = useState(false);

  const handleMouseEnter = () => {
    if (!popular) return;

    if (!hasPlayedAnimation) {
      setIsHovered(true);
      setHasPlayedAnimation(true);
    }
    onMouseEnter();
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <Card
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`${styles.card} ${popular && isHovered ? styles.popularCard : ""}`}
    >
      <div className={styles.imageWrapper}>
        <img className={styles.image} src={imageSrc} alt={title} />
      </div>
      <CardContent>
        <Box display="flex" alignItems="center">
          <Typography variant="h5" component="div" align="left">
            {title}
          </Typography>
          {popular && (
            <img
              src={popularFlame}
              alt="Popular dish"
              className={styles.popularFlame}
            />
          )}
        </Box>
        <Typography variant="body2" color="text" align="left">
          {ingredients}
        </Typography>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          marginTop="0.5rem"
        >
          <Typography variant="h6" component="div" align="left">
            {price}
          </Typography>
          <ShoppingBasketRoundedIcon />
        </Box>
      </CardContent>
    </Card>
  );
};

export default ImageCard;
