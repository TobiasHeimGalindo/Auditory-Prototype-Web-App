import React from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";
import styles from "./CardComponent.module.scss";
import cart from "../../assets/footage/cart-icon.png";

const CardComponent = ({ videoSrc, title, ingredients, price }) => {
  return (
    <Card className={styles.card}>
      <div className={styles.videoWrapper}>
        <video
          className={styles.video}
          src={videoSrc}
          onMouseOver={(e) => e.target.play()}
          onMouseOut={(e) => e.target.pause()}
          loop
          muted
        />
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
          <img src={cart} alt="cart-icon" />
        </Box>
      </CardContent>
    </Card>
  );
};

export default CardComponent;