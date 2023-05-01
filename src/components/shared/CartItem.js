import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { Add, Remove } from "@mui/icons-material";
import increment from "../../assets/sounds/Earcon/increment.mp3";
import decrement from "../../assets/sounds/Earcon/decrement.mp3";
import { useAudio } from "../../Contexts/AudioContext";

import styles from "./CartItem.module.scss";

const CartControlButton = ({ onClick, children, ...rest }) => (
  <Button aria-label="button" onClick={onClick} className={styles.cartControlButton} {...rest}>
    {children}
  </Button>
);

const CartItem = ({ item, updateCartItemQuantity, removeCartItem }) => {
  const { setPlaying, setSrc } = useAudio();
  return (
    <Box key={item.id} className={styles.cartItem}>
      <Box className={styles.itemHead}>
        <Box
          sx={{
            width: "120px",
            height: "120px",
            borderRadius: "25px",
            overflow: "hidden",
          }}
        >
          <img
            src={item.imageSrc}
            alt={item.title}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </Box>
        <Box className={styles.cartTitle}>
          <Typography>{item.title}</Typography>
          <Typography variant="body2">
            {item.ingredients}
          </Typography>
          <Typography> {item.price}</Typography>
        </Box>
        <Box className={styles.controlWrapper}>
          <Box className={styles.cartItemControls}>
            <CartControlButton aria-label="decrease"
              onClick={() => {
                setSrc(decrement);
                setPlaying(true);
                if (item.quantity === 1) {
                  removeCartItem(item.id);
                } else {
                  updateCartItemQuantity(item.id, item.quantity - 1);
                }
              }}
            >
              <Remove />
            </CartControlButton>
            <Typography className={styles.cartItemQuantity}>
              {item.quantity}
            </Typography>
            <CartControlButton aria-label="increase"
              onClick={() => {
                setSrc(increment);
                setPlaying(true);
                updateCartItemQuantity(item.id, item.quantity + 1);
              }}
            >
              <Add />
            </CartControlButton>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default CartItem;
