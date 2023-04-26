import React, { useState, useEffect } from "react";
import { useCart } from "../Contexts/CartContext";
import { Box, Typography, Button } from "@mui/material";
import { Add, Remove } from "@mui/icons-material";
import { useAudio } from "../Contexts/AudioContext";
import { useOrderStage } from "../Contexts/OrderStageContext";

import increment from "../assets/sounds/Earcon/increment.mp3";
import decrement from "../assets/sounds/Earcon/decrement.mp3";
import softSelection from "../assets/sounds/Earcon/SoftSelection.mp3";

import styles from "./Cart.module.scss";
import OrderConfirmModal from "./shared/OrderConfirmModal";

const CartControlButton = ({ onClick, children, ...rest }) => (
  <Button onClick={onClick} className={styles.cartControlButton} {...rest}>
    {children}
  </Button>
);

const Cart = () => {
  const [orderConfirm, confirmOrder] = useState(false);
  const [stage, setStage] = useState("");
  const { cart, updateCartItemQuantity, removeCartItem } = useCart();
  const { setPlaying, setSrc } = useAudio();
  const { setIsPayment } = useOrderStage();

  const taxRate = 0.1;
  const totalItemCount = cart.reduce((total, item) => total + item.quantity, 0);
  const subtotal = cart.reduce(
    (total, item) => total + parseFloat(item.price.slice(1)) * item.quantity,
    0
  );
  const tax = subtotal * taxRate;
  const total = subtotal + tax;

  const handleOrder = () => {
    setStage("payment");
    confirmOrder(true);
  };

  useEffect(() => {
    if (stage === "payment" || stage === "loading") {
      setIsPayment(true);
    } else {
      setIsPayment(false);
    }
  }, [stage, setIsPayment]);

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
                  <CartControlButton
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
          onClick={() => {
            setSrc(softSelection);
            setPlaying(true);
            handleOrder();
          }}
          disabled={cart.length === 0}
        >
          Order Now
        </Button>
      </Box>
      <OrderConfirmModal
        open={orderConfirm}
        handleClose={() => {
          confirmOrder(false);
          setSrc(decrement);
          setPlaying(true);
        }}
        stage={stage}
        setStage={setStage}
      />
    </Box>
  );
};

export default Cart;
