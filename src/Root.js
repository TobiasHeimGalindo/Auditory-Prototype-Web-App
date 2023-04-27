import React, { useEffect, useRef } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { AudioProvider, useAudio } from "./Contexts/AudioContext";
import { themeOptions } from "../src/styles/theme.ts";
import LandingPage from "./pages/LandingPage";
import MenuPage from "./pages/MenuPage";
import { HashRouter, Route, Routes } from "react-router-dom";
import { CartProvider } from "./Contexts/CartContext";
import { SnackbarProvider, useSnackbar } from "./Contexts/SnackbarContext";
import { Snackbar, Box, Typography, Button } from "@mui/material";
import { DialogProvider } from "./Contexts/DialogContext";
import { OrderStageProvider } from "./Contexts/OrderStageContext";

import notification from "./assets/sounds/Earcon/notification.mp3";
import AudioDialog from "./components/AudioDialog";
import styles from "./Root.module.scss";

const SnackbarButton = ({ onClick, children, ...rest }) => (
  <Button onClick={onClick} className={styles.snackbarButton} {...rest}>
    <Typography variant="body1">{children}</Typography>
  </Button>
);

const AppSnackbar = () => {
  const {
    snackbarOpen,
    setSnackbarOpen,
    snackbarContent,
    snackbarTimeout,
    setSnackbarTimeout,
    shouldRenderSnackbar,
    setShouldRenderSnackbar,
    snackbarDuration,
  } = useSnackbar();
  const { playSpatialAudio } = useAudio();
  const snackbarRef = useRef(null);

  useEffect(() => {
    if (snackbarOpen) {
      const normalizePosition = (position, maxPosition) => {
        return (position / maxPosition) * 2 - 1;
      };
      const timer = setTimeout(() => {
        setShouldRenderSnackbar(true);
        const snackbarElement = snackbarRef.current;
        const rect = snackbarElement.getBoundingClientRect();
        const posX = rect.x + rect.width / 2;
        const posY = rect.y + rect.height / 2;
        const normalizedPosX = normalizePosition(posX, window.innerWidth);
        const normalizedPosY = normalizePosition(posY, window.innerHeight);
        playSpatialAudio(notification, [normalizedPosX, normalizedPosY, 0]);
      }, snackbarTimeout);
      return () => clearTimeout(timer);
    }
  }, [snackbarOpen]);

  useEffect(() => {
    if (!shouldRenderSnackbar) {
      setSnackbarTimeout(0);
    }
  }, [shouldRenderSnackbar]);

  return (
    <Snackbar
      open={shouldRenderSnackbar}
      ref={snackbarRef}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      onClose={() => {
        setSnackbarOpen(false);
        setShouldRenderSnackbar(false);
      }}
      autoHideDuration={snackbarDuration}
      className={styles.snackbar}
    >
      <Box>
        <Box paddingBottom={1}>
          <Typography variant="body1">{snackbarContent.message}</Typography>
          <Typography variant="body2">{snackbarContent.details}</Typography>
        </Box>
        {snackbarContent.button && (
          <SnackbarButton
            onClick={snackbarContent.button.onClick}
            color="primary"
            variant="contained"
            size="small"
          >
            {snackbarContent.button.label}
          </SnackbarButton>
        )}
      </Box>
    </Snackbar>
  );
};

const theme = createTheme(themeOptions);

const Root = () => {
  return (
    <ThemeProvider theme={theme}>
      <DialogProvider>
        <AudioProvider>
          <AudioDialog />
          <CartProvider>
            <SnackbarProvider>
              <OrderStageProvider>
                <HashRouter>
                  <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/menu" element={<MenuPage />} />
                  </Routes>
                </HashRouter>
                <AppSnackbar />
              </OrderStageProvider>
            </SnackbarProvider>
          </CartProvider>
        </AudioProvider>
      </DialogProvider>
    </ThemeProvider>
  );
};

export default Root;
