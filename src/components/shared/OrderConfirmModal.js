import React from "react";
import { Modal, Box, Typography, Stack } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import deliveryBike from "../../assets/footage/delivery-bike.png";

import styles from "./OrderConfirmModal.module.scss";

const OrderConfirmModal = ({ open, handleClose }) => {
  const randomDeliveryTime = Math.floor(Math.random() * 21) + 20;

  return (
    <Modal open={open} onClose={() => {}}>
      <Box className={styles.modalContent}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="h5" gutterBottom>
            Order Confirmation
          </Typography>
          <CloseIcon
            edge="end"
            color="inherit"
            aria-label="close"
            onClick={handleClose}
            sx={{
              cursor: "pointer",
            }}
          />
        </Stack>
        <Box textAlign="center">
          <Typography>
            Thank you for your order! We'll start preparing it right away.
          </Typography>
          <Typography variant="body2">
            Estimated delivery time: {randomDeliveryTime} minutes.
          </Typography>
        </Box>
        <img
          className={styles.deliveryBike}
          src={deliveryBike}
          alt="delivery bike"
        />
      </Box>
    </Modal>
  );
};

export default OrderConfirmModal;
