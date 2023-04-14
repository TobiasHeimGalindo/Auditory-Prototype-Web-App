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
  const { volume, setVolume, muted, setMuted } = useAudio();
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
    <div style={{cursor: "pointer"}}>
      <Tooltip title="Audio Controls" placement="bottom">
        <span
          edge="end"
          color="inherit"
          aria-describedby={id}
          onClick={handleClick}
          ref={audioControlButtonRef}
        >
          {muted ? <VolumeOffIcon /> : <VolumeUpIcon />}
        </span>
      </Tooltip>
      <Popper
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        container={audioControlButtonRef.current}
        sx={{ backgroundColor: "white", minWidth: 200, minHeight: 150, borderRadius: 4 }}
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
            Volume
          </Typography>
          <Slider
            value={volume}
            min={0}
            max={1}
            defaultValue={0.5}
            onChange={(_, newValue) => setVolume(newValue)}
            valueLabelDisplay="auto"
            aria-labelledby="volume-slider"
            step={0.01}
          />
          <FormControlLabel
            control={
              <Switch
                checked={muted}
                onChange={(event) => setMuted(event.target.checked)}
              />
            }
            label="Mute"
          />
        </Box>
      </Popper>
    </div>
  );
};

export default AudioControl;
