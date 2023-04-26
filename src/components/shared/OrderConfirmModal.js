import React, { useEffect } from "react";
import {
  Modal,
  Box,
  Typography,
  Stack,
  CircularProgress,
  Button,
  TextField,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import deliveryBike from "../../assets/footage/delivery-bike.png";
import orderBell from "../../assets/sounds/order-confirm.mp3";
import { useAudio } from "../../Contexts/AudioContext";
import { useSnackbar } from "../../Contexts/SnackbarContext";

import styles from "./OrderConfirmModal.module.scss";

const OrderConfirmModal = ({ open, handleClose, stage, setStage }) => {
  const { setPlaying, setSrc } = useAudio();
  const { setSnackbarOpen, setSnackbarContent, setSnackbarTimeout } =
    useSnackbar();

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
      setSnackbarTimeout(5000); // mock a notification delay on a confirmed Order
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
    setStage("loading");
    setTimeout(() => {
      setStage("confirmation");
    }, 1000);
  };

  const renderContent = () => {
    if (stage === "payment") {
      return (
        <>
          <Typography variant="h5" gutterBottom>
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
          >
            Pay Now
          </Button>
        </>
      );
    } else if (stage === "loading") {
      return (
        <Box className={styles.loadingContainer}>
          <CircularProgress size={100} />
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
          </Box>
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
