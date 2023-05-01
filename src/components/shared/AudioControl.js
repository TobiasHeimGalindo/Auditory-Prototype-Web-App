import React, { useState, useRef, useEffect } from "react";

import {
  Button,
  Tooltip,
  Popper,
  Slider,
  FormControlLabel,
  Typography,
  Checkbox,
  List,
  ListItem,
  ListItemText,
  ButtonGroup,
} from "@mui/material";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";
import CloseIcon from "@mui/icons-material/Close";

import Box from "@mui/material/Box";
import { useAudio } from "../../Contexts/AudioContext";
import softSelection from "../../assets/sounds/Earcon/SoftSelection.mp3";
import closing from "../../assets/sounds/Earcon/closing.mp3";
import mute from "../../assets/sounds/Earcon/mute.mp3";
import selectTimbre from "../../assets/sounds/Earcon/select-timbre.mp3";

import styles from "./AudioControl.module.scss";

const AudioControl = ({ highlight }) => {
  const audioControlClass = `${styles.audioControl} ${
    highlight ? styles.highlight : ""
  }`;
  const setSoundProfile = (profile) => {
    setSrc(softSelection);
    setPlaying(true);
    switch (profile) {
      case "Atmosphere":
        setUIVolume(0.9);
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
    if (!open) {
      setSrc(selectTimbre);
      setPlaying(true);
    }
    setAnchorEl(event.currentTarget);
  };

  const handleMute = (event) => {
    const isMuting = event.target.checked;
    if (isMuting) {
      setSrc(mute);
      setPlaying(true);
    }
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
          role="button"
          edge="end"
          color="inherit"
          aria-describedby={id}
          onClick={handleClick}
          ref={audioControlButtonRef}
        >
          {uiMuted && bgMuted && spatialMuted ? (
            <VolumeOffIcon />
          ) : (
            <VolumeUpIcon />
          )}
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
          boxShadow:
            "rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px",
        }}
      >
        <Box p={2} position="relative">
          <CloseIcon
            edge="end"
            color="inherit"
            aria-label="close"
            onClick={() => {
              handleClose();
              setSrc(closing);
              setPlaying(true);
            }}
            sx={{
              position: "absolute",
              top: 8,
              right: 8,
              padding: "6px",
              cursor: "pointer",
              zIndex: 1,
            }}
          />

          <List>
            <ListItem divider>
              {" "}
              <Box padding={4}>
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
            </ListItem>
            <ListItem divider>
              <ListItemText
                primary={
                  <Box display="flex" alignItems="center">
                    <Typography
                      variant="subtitle1"
                      gutterBottom
                      id="ui-volume-label"
                    >
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
                    aria-labelledby="ui-volume-label"
                    step={1}
                    disabled={uiMuted}
                  />
                </Box>

                <FormControlLabel
                  control={
                    <Checkbox
                      checked={uiMuted}
                      onChange={(event) => setUIMuted(event.target.checked)}
                      onClick={(event) => handleMute(event)}
                    />
                  }
                  label="Muted"
                  sx={{ ml: 2 }}
                />
              </Box>
            </ListItem>
            <ListItem divider>
              <ListItemText
                primary={
                  <Box display="flex" alignItems="center">
                    <Typography
                      variant="subtitle1"
                      gutterBottom
                      id="spatial-volume-label"
                    >
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
                    aria-labelledby="spatial-volume-label"
                    step={1}
                    disabled={spatialMuted}
                  />
                </Box>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={spatialMuted}
                      onChange={(event) =>
                        setSpatialMuted(event.target.checked)
                      }
                      onClick={(event) => handleMute(event)}
                    />
                  }
                  label="Muted"
                  sx={{ ml: 2 }}
                />
              </Box>
            </ListItem>
            <ListItem divider>
              <ListItemText
                primary={
                  <Box display="flex" alignItems="center">
                    <Typography
                      variant="subtitle1"
                      gutterBottom
                      id="bg-volume-label"
                    >
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
                    aria-labelledby="bg-volume-label"
                    step={1}
                    disabled={bgMuted}
                  />
                </Box>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={bgMuted}
                      onChange={(event) => setBGMuted(event.target.checked)}
                      onClick={(event) => handleMute(event)}
                    />
                  }
                  label="Muted"
                  sx={{ ml: 2 }}
                />
              </Box>
            </ListItem>
          </List>
        </Box>
      </Popper>
    </div>
  );
};

export default AudioControl;
