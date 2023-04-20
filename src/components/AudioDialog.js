import React, { useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Box,
  Typography,
  Slider,
  Switch,
  FormControlLabel,
} from "@mui/material";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import softSelection from "../assets/sounds/Earcon/SoftSelection.mp3"

import styles from "./AudioDialog.module.scss";

import { useDialog } from "../DialogContext";
import { useAudio } from "../AudioContext";

const AudioControlButton = ({ onClick, children, ...rest }) => (
  <Button onClick={onClick} {...rest}>
    <Typography variant="body1">{children}</Typography>
  </Button>
);
const AudioDialog = () => {
  const { dialogOpen, setDialogOpen } = useDialog();
  const {
    uiVolume,
    setUIVolume,
    uiMuted,
    setUIMuted,
    spatialVolume,
    setSpatialVolume,
    spatialMuted,
    setSpatialMuted,
    bgVolume,
    setBGVolume,
    bgMuted,
    setBGMuted,
    setSrc,
    setPlaying,
  } = useAudio();

  const setSoundProfile = (profile) => {
    setBGMuted(false);
    setSrc(softSelection);
    setPlaying(true);
    
    switch (profile) {
      case "Atmosphere":
        setUIVolume(0.5);
        setSpatialVolume(0.4);
        setBGVolume(0.6);
        break;
      case "Default":
        setUIVolume(0.5);
        setSpatialVolume(0.5);
        setBGVolume(0.5);
        break;
      case "Subtle":
        setUIVolume(0.4);
        setSpatialVolume(0.2);
        setBGVolume(0.3);
        break;
      default:
        break;
    }
  };

  const handleModalClose = () => {
    setDialogOpen(false);
    localStorage.setItem("visitedBefore", "true");
  };

  useEffect(() => {
    const visitedBefore = localStorage.getItem("visitedBefore");

    if (!visitedBefore) {
      setDialogOpen(true);
    }
  }, [setDialogOpen]);

  return (
    <Dialog
      open={dialogOpen}
      onClose={handleModalClose}
      aria-labelledby="audio-control-modal-title"
      aria-describedby="audio-control-modal-description"
      className={styles.dialog}
    >
      <DialogTitle id="audio-control-modal-title">
        Welcome to My Auditory Website :)
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="audio-control-modal-description">
          I've designed this site with a unique audio experience that you can
          personalize to your liking. You can choose from three predefined sound
          profiles: Atmosphere, Default, and Subtle. Each profile adjusts the
          UI, spatial audio, and background volume levels to create a different
          ambiance.
          <br />
          <br />
          Additionally, you can modify or mute each auditive element
          individually to create your perfect audio mix. To access the Audio
          Control panel and adjust the settings at any time, simply click on the
          speaker icon (
          <span className={styles.volumeIcon}>
            <VolumeUpIcon />
          </span>
          ) located in the navbar.
        </DialogContentText>

        <Box mt={2} display="flex" justifyContent="space-between">
          <AudioControlButton
            variant="outlined"
            onClick={() => setSoundProfile("Atmosphere")}
          >
            Atmosphere
          </AudioControlButton>
          <AudioControlButton
            variant="outlined"
            onClick={() => setSoundProfile("Default")}
          >
            Default
          </AudioControlButton>
          <AudioControlButton
            variant="outlined"
            onClick={() => setSoundProfile("Subtle")}
          >
            Subtle
          </AudioControlButton>
        </Box>
        <Box
          mt={2}
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
        >
          <Typography variant="subtitle1" gutterBottom>
            UI Volume
          </Typography>
          <Typography variant="body2" gutterBottom>
            Button clicks, selections, etc.
          </Typography>
          <Slider
            value={uiVolume}
            min={0}
            max={1}
            defaultValue={0.5}
            onChange={(_, newValue) => setUIVolume(newValue)}
            valueLabelDisplay="auto"
            aria-labelledby="ui-volume-slider"
            step={0.01}
          />
          <FormControlLabel
            control={
              <Switch
                checked={uiMuted}
                onChange={(event) => setUIMuted(event.target.checked)}
              />
            }
            label="Mute UI"
          />
          <Typography variant="subtitle1" gutterBottom>
            Spatial Audio Volume
          </Typography>
          <Typography variant="body2" gutterBottom>
            Notifications & alerts
          </Typography>
          <Slider
            value={spatialVolume}
            min={0}
            max={1}
            defaultValue={0.5}
            onChange={(_, newValue) => setSpatialVolume(newValue)}
            valueLabelDisplay="auto"
            aria-labelledby="spatial-volume-slider"
            step={0.01}
          />
          <FormControlLabel
            control={
              <Switch
                checked={spatialMuted}
                onChange={(event) => setSpatialMuted(event.target.checked)}
              />
            }
            label="Mute Spatial Audio"
          />
          <Typography variant="subtitle1" gutterBottom>
            Background Volume
          </Typography>
          <Typography variant="body2" gutterBottom>
            Ambient Sounds
          </Typography>
          <Slider
            value={bgVolume}
            min={0}
            max={1}
            defaultValue={0.5}
            onChange={(_, newValue) => setBGVolume(newValue)}
            valueLabelDisplay="auto"
            aria-labelledby="bg-volume-slider"
            step={0.01}
          />
          <FormControlLabel
            control={
              <Switch
                checked={bgMuted}
                onChange={(event) => setBGMuted(event.target.checked)}
              />
            }
            label="Mute Background"
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleModalClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AudioDialog;
