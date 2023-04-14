import React, { useState } from "react";
import { useCart } from "../CartContext";
import { Box, Typography, Button } from "@mui/material";
import { Add, Remove } from "@mui/icons-material";
import { useAudio } from "../AudioContext";
import ReactHowler from "react-howler";

import increment from "../assets/sounds/Earcon/increment.mp3";
import decrement from "../assets/sounds/Earcon/decrement.mp3";
import orderBell from "../assets/sounds/order-confirm.mp3";

import styles from "./Cart.module.scss";
import OrderConfirmModal from "./shared/OrderConfirmModal";

const CartControlButton = ({ onClick, children, ...rest }) => (
  <Button onClick={onClick} className={styles.cartControlButton} {...rest}>
    {children}
  </Button>
);

const Cart = () => {
  const [orderConfirm, confirmOrder] = useState(false);
  const { cart, updateCartItemQuantity, removeCartItem, emptyCart } = useCart();
  const { setPlaying, setSrc, volume, muted } = useAudio();

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
  };

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
      <ReactHowler
        key={1}
        src={orderBell}
        volume={muted ? 0 : volume}
        playing={orderConfirm}
      ></ReactHowler>
      <OrderConfirmModal
        open={orderConfirm}
        handleClose={() => confirmOrder(false)}
      />
    </Box>
  );
};

export default Cart;
