import React, { useState, useEffect, useRef } from "react";
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
import { Howl } from "howler";

//Earcons
import notification from "./assets/sounds/Earcon/notification.mp3";
import closing from "./assets/sounds/Earcon/closing.mp3";
import decrement from "./assets/sounds/Earcon/decrement.mp3";
import highSelect from "./assets/sounds/Earcon/highSelect.mp3";
import increment from "./assets/sounds/Earcon/increment.mp3";
import mute from "./assets/sounds/Earcon/mute.mp3";
import selectTimbre from "./assets/sounds/Earcon/select-timbre.mp3";
import selectItem from "./assets/sounds/Earcon/selectItem.mp3";
import softSelection from "./assets/sounds/Earcon/SoftSelection.mp3";

// Auditory Icon
import orderProcess from "./assets/sounds/Auditory Icon/cash-drawer-and-receipt.mp3";
import drinks from "./assets/sounds/Auditory Icon/drinks.mp3";
import plateDrop from "./assets/sounds/Auditory Icon/PlateDrop.mp3";
import popularFire from "./assets/sounds/Auditory Icon/popularFire.mp3";
import sizzlingBowl from "./assets/sounds/Auditory Icon/SizzlingBowl.mp3";
import softSizzle from "./assets/sounds/Auditory Icon/soft-sizzle.mp3";
import teaSpoon from "./assets/sounds/Auditory Icon/teaSpoon.mp3";

//misc
import orderConfirm from "./assets/sounds/order-confirm.mp3";

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
  const [preloadedSounds, setPreloadedSounds] = useState({});

  useEffect(() => {
    const sounds = {
      closing: new Howl({ src: [closing], preload: true }),
      decrement: new Howl({ src: [decrement], preload: true }),
      highSelect: new Howl({ src: [highSelect], preload: true }),
      increment: new Howl({ src: [increment], preload: true }),
      mute: new Howl({ src: [mute], preload: true }),
      selectTimbre: new Howl({ src: [selectTimbre], preload: true }),
      selectItem: new Howl({ src: [selectItem], preload: true }),
      softSelection: new Howl({ src: [softSelection], preload: true }),
      orderProcess: new Howl({ src: [orderProcess], preload: true }),
      drinks: new Howl({ src: [drinks], preload: true }),
      plateDrop: new Howl({ src: [plateDrop], preload: true }),
      popularFire: new Howl({ src: [popularFire], preload: true }),
      sizzlingBowl: new Howl({ src: [sizzlingBowl], preload: true }),
      softSizzle: new Howl({ src: [softSizzle], preload: true }),
      teaSpoon: new Howl({ src: [teaSpoon], preload: true }),
      orderConfirm: new Howl({ src: [orderConfirm], preload: true }),
    };

    setPreloadedSounds(sounds);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <DialogProvider>
        <AudioProvider preloadedSounds={preloadedSounds}>
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
