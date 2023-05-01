import React, { useEffect } from "react";
import {
  Modal,
  Box,
  Typography,
  Stack,
  LinearProgress,
  Button,
  TextField,
  Divider,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import deliveryBike from "../../assets/footage/delivery-bike.png";
import orderBell from "../../assets/sounds/order-confirm.mp3";
import cashDrawer from "../../assets/sounds/Auditory Icon/cash-drawer-and-receipt.mp3";
import { useAudio } from "../../Contexts/AudioContext";
import { useSnackbar } from "../../Contexts/SnackbarContext";
import { useCart } from "../../Contexts/CartContext";
import reciept from "../../assets/footage/restaurant.png";
import CartItem from "./CartItem";

import styles from "./OrderConfirmModal.module.scss";

const OrderConfirmModal = ({ open, handleClose, stage, setStage }) => {
  const { setPlaying, setSrc } = useAudio();
  const {
    setSnackbarOpen,
    setSnackbarContent,
    setSnackbarTimeout,
    setSnackbarDuration,
  } = useSnackbar();
  const {
    cart,
    updateCartItemQuantity,
    removeCartItem,
    emptyCart,
    cartHasItems,
  } = useCart();

  useEffect(() => {
    if (stage === "confirmation") {
      setSrc(orderBell);
      setPlaying(true);

      const deliveryTime = Math.floor(Math.random() * 21) + 20;
      setSnackbarContent({
        message: "Your order has been confirmed",
        details: `Estimated Delivery time: ${deliveryTime} minutes`,
      });

      setSnackbarOpen(true);
      setSnackbarDuration(4000);
      setSnackbarTimeout(4000); // mock a notification delay on a confirmed Order
    }
  }, [
    stage,
    setPlaying,
    setSrc,
    setSnackbarContent,
    setSnackbarOpen,
    setSnackbarTimeout,
  ]);

  const handlePayNowClick = () => {
    setSrc(cashDrawer);
    setPlaying(true);
    setStage("loading");
    setTimeout(() => {
      setStage("confirmation");
      emptyCart();
    }, 1500);
  };

  const renderContent = () => {
    if (stage === "payment") {
      return (
        <>
          {cartHasItems ? <Divider /> : null}

          <Typography variant="h5" gutterBottom paddingTop={2}>
            Payment
          </Typography>
          <Box>
            <TextField
              label="Street"
              fullWidth
              margin="dense"
              variant="outlined"
            />
            <TextField
              label="Cardholder Name"
              fullWidth
              margin="dense"
              variant="outlined"
            />
            <TextField
              label="Card Number"
              fullWidth
              margin="dense"
              variant="outlined"
            />
            <Stack direction="row" spacing={2}>
              <Box className={styles.textFieldWrapper}>
                <TextField
                  label="Expiry Date"
                  fullWidth
                  margin="dense"
                  variant="outlined"
                />
              </Box>
              <Box className={styles.textFieldWrapper}>
                <TextField
                  label="CVV"
                  fullWidth
                  margin="dense"
                  variant="outlined"
                />
              </Box>
            </Stack>
          </Box>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handlePayNowClick}
            disabled={!cartHasItems}
          >
            Pay Now
          </Button>
        </>
      );
    } else if (stage === "loading") {
      return (
        <Box className={styles.loadingContainer}>
          <Box>
            <img className={styles.recieptImage} src={reciept} alt="reciept" />
          </Box>
          <Box>
            <Typography variant="h6" gutterBottom>
              Processing Payment
            </Typography>
            <LinearProgress
              aria-label="progress bar"
              className={styles.linearProgress}
            />
          </Box>
        </Box>
      );
    } else {
      return (
        <Box className={styles.confirmationContainer}>
          <Typography>
            Thank you for your order! We'll start preparing it right away.
          </Typography>
          <img
            className={styles.deliveryBike}
            src={deliveryBike}
            alt="delivery bike"
          />
        </Box>
      );
    }
  };

  return (
    <Modal open={open} onClose={() => {}}>
      <Box className={styles.modalContent}>
        <Box position="relative">
          <Box textAlign="center" paddingBottom={2}>
            <Typography variant="h5" gutterBottom>
              {stage === "confirmation" ? "Order Confirmation" : ""}
            </Typography>
            <Typography variant="h5" gutterBottom textAlign="left">
              {stage === "payment" && cartHasItems ? "Order Summary" : ""}
            </Typography>
          </Box>
          {stage === "payment" &&
            cart.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                updateCartItemQuantity={updateCartItemQuantity}
                removeCartItem={removeCartItem}
              />
            ))}
          {stage !== "loading" && (
            <Box position="absolute" top={0} right={0}>
              <CloseIcon
                edge="end"
                color="inherit"
                aria-label="close"
                onClick={handleClose}
                sx={{
                  cursor: "pointer",
                }}
              />
            </Box>
          )}
        </Box>
        <Box>{renderContent()}</Box>
      </Box>
    </Modal>
  );
};

export default OrderConfirmModal;
