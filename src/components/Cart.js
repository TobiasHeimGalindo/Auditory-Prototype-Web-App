import React, { useState, useEffect } from "react";
import { useCart } from "../Contexts/CartContext";
import { Box, Typography, Button } from "@mui/material";
import { useAudio } from "../Contexts/AudioContext";
import { useOrderStage } from "../Contexts/PaymentStageContext";

import styles from "./Cart.module.scss";
import OrderConfirmModal from "./shared/OrderConfirmModal";
import CartItem from "./shared/CartItem";

const Cart = () => {
  const [orderConfirm, confirmOrder] = useState(false);
  const [stage, setStage] = useState("");
  const { cart, updateCartItemQuantity, removeCartItem } = useCart();
  const { preloadedSounds } = useAudio();
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
          <CartItem
            key={item.id}
            item={item}
            updateCartItemQuantity={updateCartItemQuantity}
            removeCartItem={removeCartItem}
          />
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
            preloadedSounds.softSelection.play();
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
          preloadedSounds.closing.play();
          setStage("");
          setIsPayment(false);
        }}
        stage={stage}
        setStage={setStage}
      />
    </Box>
  );
};

export default Cart;
