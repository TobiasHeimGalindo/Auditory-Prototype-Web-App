import React from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";
import styles from "./CardComponent.module.scss";
import ShoppingBasketRoundedIcon from "@mui/icons-material/ShoppingBasketRounded";

const CardComponent = ({ videoSrc, title, ingredients, price, onHover }) => {
  const handleMouseEnter = (e) => {
    const videoElement = e.currentTarget.querySelector("video");
    if (videoElement) {
      videoElement.play();
    }
    if (onHover) {
      onHover();
    }
  };

  const handleMouseLeave = (e) => {
    const videoElement = e.currentTarget.querySelector("video");
    if (videoElement) {
      videoElement.pause();
    }
  };

  return (
    <Card
      className={styles.card}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className={styles.videoWrapper}>
        <video className={styles.video} src={videoSrc} loop muted />
      </div>
      <CardContent>
        <Typography variant="h5" component="div" align="left">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary" align="left">
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

export default CardComponent;
