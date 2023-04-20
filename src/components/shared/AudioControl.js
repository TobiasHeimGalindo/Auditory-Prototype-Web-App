import React, { useState, useRef } from "react";

import {
  Button,
  Tooltip,
  Popper,
  Slider,
  Switch,
  FormControlLabel,
  Typography,
} from "@mui/material";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";
import CloseIcon from "@mui/icons-material/Close";

import Box from "@mui/material/Box";
import { useAudio } from "../../AudioContext";
import softSelection from "../../assets/sounds/Earcon/SoftSelection.mp3"

import styles from "./AudioControl.module.scss";

const AudioControlButton = ({ onClick, children, ...rest }) => (
  <Button onClick={onClick} className={styles.audioControlButton} {...rest}>
    <Typography variant="body1">{children}</Typography>
  </Button>
);

const AudioControl = ({ highlight }) => {
  const audioControlClass = `${styles.audioControl} ${
    highlight ? styles.highlight : ""
  }`;
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
  const [anchorEl, setAnchorEl] = useState(null);
  const audioControlButtonRef = useRef(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "audio-controls-popper" : undefined;

  return (
    <div className={audioControlClass} style={{ cursor: "pointer" }}>
      <Tooltip title="Audio Controls" placement="bottom">
        <span
          edge="end"
          color="inherit"
          aria-describedby={id}
          onClick={handleClick}
          ref={audioControlButtonRef}
        >
          {uiMuted && bgMuted && spatialMuted ? <VolumeOffIcon /> : <VolumeUpIcon />}
        </span>
      </Tooltip>
      <Popper
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        container={audioControlButtonRef.current}
        sx={{
          backgroundColor: "white",
          minWidth: 200,
          minHeight: 150,
          borderRadius: 4,
        }}
      >
        <Box p={2} position="relative">
          <CloseIcon
            edge="end"
            color="inherit"
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: "absolute",
              top: 8,
              right: 8,
              padding: "6px",
              cursor: "pointer",
            }}
          />
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
        <Box p={2} position="relative">
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
        </Box>
      </Popper>
    </div>
  );
};

export default AudioControl;
