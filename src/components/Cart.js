import React, { useState } from "react";
import { useCart } from "../CartContext";
import { Box, Typography, Button, Snackbar } from "@mui/material";
import { Add, Remove } from "@mui/icons-material";
import { useAudio } from "../AudioContext";

import increment from "../assets/sounds/Earcon/increment.mp3";
import decrement from "../assets/sounds/Earcon/decrement.mp3";
import orderBell from "../assets/sounds/order-confirm.mp3";
import notification from "../assets/sounds/Earcon/notification.mp3";

import styles from "./Cart.module.scss";
import OrderConfirmModal from "./shared/OrderConfirmModal";

const CartControlButton = ({ onClick, children, ...rest }) => (
  <Button onClick={onClick} className={styles.cartControlButton} {...rest}>
    {children}
  </Button>
);

const Cart = () => {
  const [orderConfirm, confirmOrder] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [randomDeliveryTime, setRandomDeliveryTime] = useState(0);
  const { cart, updateCartItemQuantity, removeCartItem, emptyCart } = useCart();
  const { setPlaying, setSrc, playSpatialAudio } = useAudio();

  const taxRate = 0.1;
  const totalItemCount = cart.reduce((total, item) => total + item.quantity, 0);
  const subtotal = cart.reduce(
    (total, item) => total + parseFloat(item.price.slice(1)) * item.quantity,
    0
  );
  const tax = subtotal * taxRate;
  const total = subtotal + tax;

  const handleOrder = () => {
    confirmOrder(true);
    emptyCart();
    setSrc(orderBell);
    setPlaying(true);
  };
  //note for thesis: normalizzing the position for spatial audio is important to maintain a distinct left and right difference
  const normalizePosition = (position, maxPosition) => {
    return (position / maxPosition) * 2 - 1;
  };

  const handleSnackbarNotification = () => {
    setTimeout(() => {
      const deliveryTime = Math.floor(Math.random() * 21) + 20;
      setRandomDeliveryTime(deliveryTime);
      setSnackbarOpen(true);
      const snackbarElement = document.querySelector(".MuiSnackbar-root");
      const rect = snackbarElement.getBoundingClientRect();
      const posX = rect.x + rect.width / 2;
      const posY = rect.y + rect.height / 2;
      const normalizedPosX = normalizePosition(posX, window.innerWidth);
      const normalizedPosY = normalizePosition(posY, window.innerHeight);
      playSpatialAudio(notification, [normalizedPosX, normalizedPosY, 0]);
    }, 2000);
  }; //TODO: guruantee that the snackbar pops up on  landdingpage too, maybe put it on root
  return (
    <Box className={styles.cartContainer}>
      <Typography variant="h5" gutterBottom>
        Cart
      </Typography>
      <Box className={styles.cartContent}>
        {cart.map((item) => (
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
                <Typography variant="body2" fontWeight="Light">
                  {item.ingredients}
                </Typography>
                <Typography> {item.price}</Typography>
              </Box>
              <Box className={styles.controlWrapper}>
                <Box className={styles.cartItemControls}>
                  <CartControlButton
                    onClick={() => {
                      setPlaying(true);
                      setSrc(decrement);
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
                  <CartControlButton
                    onClick={() => {
                      setPlaying(true);
                      setSrc(increment);
                      updateCartItemQuantity(item.id, item.quantity + 1);
                    }}
                  >
                    <Add />
                  </CartControlButton>
                </Box>
              </Box>
            </Box>
          </Box>
        ))}
      </Box>
      <Box
        sx={{ height: "1px", backgroundColor: "rgba(0, 0, 0, 0.1)", my: 2 }}
      />
      <Box>
        <Typography variant="body1">
          Items: {totalItemCount} | Subtotal: ${subtotal.toFixed(2)}
        </Typography>
        <Typography variant="body1">Tax: ${tax.toFixed(2)}</Typography>
        <Typography variant="body1" fontWeight="bold">
          Total: ${total.toFixed(2)}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{ marginTop: 2 }}
          onClick={handleOrder}
          disabled={cart.length === 0}
        >
          Order Now
        </Button>
      </Box>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={snackbarOpen}
        onClose={() => setSnackbarOpen(false)}
        autoHideDuration={5000}
        className={styles.snackbar}
      >
        <Box>
          <Typography variant="body1">Your order has been confirmed</Typography>
          <Typography variant="body2">
            Estimated Delivery time: {randomDeliveryTime} minutes
          </Typography>
        </Box>
      </Snackbar>

      <OrderConfirmModal
        open={orderConfirm}
        handleClose={() => {
          confirmOrder(false);
          handleSnackbarNotification();
        }}
      />
    </Box>
  );
};

export default Cart;
