import React from "react";
import { useCart } from "../CartContext";
import { Box, Typography, Button } from "@mui/material";
import { Add, Remove } from "@mui/icons-material";

import styles from "./Cart.module.scss";

const CartControlButton = ({ onClick, children, ...rest }) => (
  <Button onClick={onClick} className={styles.cartControlButton} {...rest}>
    {children}
  </Button>
);

const Cart = () => {
  const { cart, updateCartItemQuantity, removeCartItem } = useCart();

  const taxRate = 0.1;
  const totalItemCount = cart.reduce((total, item) => total + item.quantity, 0);
  const subtotal = cart.reduce(
    (total, item) => total + parseFloat(item.price.slice(1)) * item.quantity,
    0
  );
  const tax = subtotal * taxRate;
  const total = subtotal + tax;

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
                    onClick={() =>
                      updateCartItemQuantity(item.id, item.quantity + 1)
                    }
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
          onClick={() => console.log("Order placed")}
        >
          Order Now
        </Button>
      </Box>
    </Box>
  );
};

export default Cart;
