import React, { useEffect, useRef, useState } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { AudioProvider, useAudio } from "./AudioContext";
import { themeOptions } from "../src/styles/theme.ts";
import LandingPage from "./pages/LandingPage";
import MenuPage from "./pages/MenuPage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { CartProvider } from "./CartContext";
import { SnackbarProvider, useSnackbar } from "./SnackbarContext";
import { Snackbar, Box, Typography } from "@mui/material";
import { DialogProvider } from "./DialogContext";

import notification from "./assets/sounds/Earcon/notification.mp3";
import AudioDialog from "./components/AudioDialog";

const AppSnackbar = () => {
  const {
    snackbarOpen,
    setSnackbarOpen,
    snackbarContent,
    snackbarTimeout,
    shouldRenderSnackbar,
    setShouldRenderSnackbar,
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

  return (
    <Snackbar
      open={shouldRenderSnackbar}
      ref={snackbarRef}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      onClose={() => {
        setSnackbarOpen(false);
        setShouldRenderSnackbar(false);
      }}
      autoHideDuration={4000}
    >
      <Box>
        <Typography variant="body1">{snackbarContent.message}</Typography>
        <Typography variant="body2">{snackbarContent.details}</Typography>
      </Box>
    </Snackbar>
  );
};

const theme = createTheme(themeOptions);

const Root = () => {
  const [overlayVisible, setOverlayVisible] = useState(false);

  return (
    <ThemeProvider theme={theme}>
      <DialogProvider>
        <AudioProvider>
          <AudioDialog />
          <CartProvider>
            <SnackbarProvider>
              <Router>
                <Routes>
                  <Route path="/" element={<LandingPage />} />
                  <Route path="/menu" element={<MenuPage />} />
                </Routes>
              </Router>
              <AppSnackbar />
            </SnackbarProvider>
          </CartProvider>
        </AudioProvider>
      </DialogProvider>
    </ThemeProvider>
  );
};

export default Root;
