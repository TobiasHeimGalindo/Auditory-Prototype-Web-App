import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { Add, Remove } from "@mui/icons-material";
import { useAudio } from "../../Contexts/AudioContext";

import styles from "./CartItem.module.scss";

const CartControlButton = ({ onClick, children, ...rest }) => (
  <Button aria-label="button" onClick={onClick} className={styles.cartControlButton} {...rest}>
    {children}
  </Button>
);

const CartItem = ({ item, updateCartItemQuantity, removeCartItem }) => {
  const { preloadedSounds } = useAudio();
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
                preloadedSounds.decrement.play();
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
                preloadedSounds.increment.play();
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
