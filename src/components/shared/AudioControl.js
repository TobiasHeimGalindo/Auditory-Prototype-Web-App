import React, { useState, useRef } from "react";
import Tooltip from "@mui/material/Tooltip";
import Popper from "@mui/material/Popper";
import Slider from "@mui/material/Slider";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useAudio } from "../../AudioContext";

const AudioControl = () => {
  const {
    uiVolume,
    setUIVolume,
    uiMuted,
    setUIMuted,
    bgVolume,
    setBGVolume,
    bgMuted,
    setBGMuted,
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
    <div style={{ cursor: "pointer" }}>
      <Tooltip title="Audio Controls" placement="bottom">
        <span
          edge="end"
          color="inherit"
          aria-describedby={id}
          onClick={handleClick}
          ref={audioControlButtonRef}
        >
          {uiMuted && bgMuted ? <VolumeOffIcon /> : <VolumeUpIcon />}
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
            Background Volume
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
      </Popper>
    </div>
  );
};

export default AudioControl;
