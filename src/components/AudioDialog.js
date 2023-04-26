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
  FormControlLabel,
  Checkbox,
  List,
  ListItem,
  ListItemText,
  Divider,
  ButtonGroup,
} from "@mui/material";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import softSelection from "../assets/sounds/Earcon/SoftSelection.mp3";

import styles from "./AudioDialog.module.scss";

import { useDialog } from "../Contexts/DialogContext";
import { useAudio } from "../Contexts/AudioContext";

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
        setUIVolume(0.6);
        setSpatialVolume(0.5);
        setBGVolume(0.7);
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

        <Box margin={2} display="flex" justifyContent="center">
          <ButtonGroup
            variant="outlined"
            sx={{ marginBottom: 2 }}
            aria-label="sound profile button group"
          >
            <Button
              sx={{ width: "175px" }}
              onClick={() => setSoundProfile("Atmosphere")}
            >
              Atmosphere
            </Button>
            <Button
              sx={{ width: "175px" }}
              onClick={() => setSoundProfile("Default")}
            >
              Default
            </Button>
            <Button
              sx={{ width: "175px" }}
              onClick={() => setSoundProfile("Subtle")}
            >
              Subtle
            </Button>
          </ButtonGroup>
        </Box>

        <Divider />

        <List>
          <ListItem>
            <ListItemText
              primary={
                <Box display="flex" alignItems="center">
                  <Typography variant="subtitle1" gutterBottom>
                    UI Volume
                  </Typography>
                </Box>
              }
              secondary="Button clicks, selections, etc."
            />
            <Box display="flex" alignItems="center">
              <Box width={150}>
                <Slider
                  value={Math.round(uiVolume * 100)}
                  min={0}
                  max={100}
                  defaultValue={50}
                  onChange={(_, newValue) =>
                    setUIVolume(Math.round(newValue) / 100)
                  }
                  valueLabelDisplay="auto"
                  aria-labelledby="ui-volume-slider"
                  step={1}
                  disabled={uiMuted}
                />
              </Box>

              <FormControlLabel
                control={
                  <Checkbox
                    checked={uiMuted}
                    onChange={(event) => setUIMuted(event.target.checked)}
                  />
                }
                label="Muted"
                sx={{ ml: 2 }}
              />
            </Box>
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemText
              primary={
                <Box display="flex" alignItems="center">
                  <Typography variant="subtitle1" gutterBottom>
                    Spatial Audio Volume
                  </Typography>
                </Box>
              }
              secondary="Notifications & alerts"
            />
            <Box display="flex" alignItems="center">
              <Box width={150}>
                <Slider
                  value={Math.round(spatialVolume * 100)}
                  min={0}
                  max={100}
                  defaultValue={50}
                  onChange={(_, newValue) =>
                    setSpatialVolume(Math.round(newValue) / 100)
                  }
                  valueLabelDisplay="auto"
                  aria-labelledby="spatial-volume-slider"
                  step={1}
                  disabled={spatialMuted}
                />
              </Box>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={spatialMuted}
                    onChange={(event) => setSpatialMuted(event.target.checked)}
                  />
                }
                label="Muted"
                sx={{ ml: 2 }}
              />
            </Box>
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemText
              primary={
                <Box display="flex" alignItems="center">
                  <Typography variant="subtitle1" gutterBottom>
                    Background Volume
                  </Typography>
                </Box>
              }
              secondary="Ambient Sounds"
            />
            <Box display="flex" alignItems="center">
              <Box width={150}>
                <Slider
                  value={Math.round(bgVolume * 100)}
                  min={0}
                  max={100}
                  defaultValue={50}
                  onChange={(_, newValue) =>
                    setBGVolume(Math.round(newValue) / 100)
                  }
                  valueLabelDisplay="auto"
                  aria-labelledby="bg-volume-slider"
                  step={1}
                  disabled={bgMuted}
                />
              </Box>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={bgMuted}
                    onChange={(event) => setBGMuted(event.target.checked)}
                  />
                }
                label="Muted"
                sx={{ ml: 2 }}
              />
            </Box>
          </ListItem>
        </List>
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
