import React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/system";
import Stack from "@mui/material/Stack";
import styles from "./OurMenu.module.scss";
import { useNavigate } from "react-router-dom";

const DineInButton = styled(Button)({
  flexGrow: 1,
  backgroundColor: "white",
  boxShadow: "0px 8px 15px rgba(0, 0, 0, 0.15)",
  "&:hover": {
    backgroundColor: "#f0f0f0",
  },
});

const OurMenu = () => {
  const navigate = useNavigate();

  const handleMenuClick = () => {
    navigate("/menu");
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h2>Our Menu</h2>
        <p>
          Discover the flavors of Japan with our menu. Dine-in or enjoy delivery
          from the comfort of your own home. Experience high-quality, authentic
          Japanese cuisine wherever you are
        </p>
        <div className={styles.buttons}>
          <Stack
            direction="row"
            spacing={2}
            sx={{
              display: "flex",
              justifyContent: "center",
              paddingTop: "27px",
            }}
          >
            <Button
              variant="contained"
              sx={{ flexGrow: 1 }}
              color="primary"
              onClick={handleMenuClick}
            >
              Delivery Menu
            </Button>
            <DineInButton
              variant="contained"
              color="primary"
              onClick={handleMenuClick}
            >
              Dine-In Menu
            </DineInButton>
          </Stack>
        </div>
      </div>
    </div>
  );
};

export default OurMenu;
