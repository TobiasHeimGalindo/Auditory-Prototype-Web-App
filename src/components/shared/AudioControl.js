import React, { useState, useRef } from "react";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Popover from "@mui/material/Popover";
import Slider from "@mui/material/Slider";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
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
  const id = open ? "audio-controls-popover" : undefined;

  return (
    <>
      <Tooltip title="Audio Controls" arrow>
        <IconButton
          edge="end"
          color="inherit"
          aria-describedby={id}
          onClick={handleClick}
          sx={{ marginRight: 2 }}
          ref={audioControlButtonRef}
        >
          <VolumeUpIcon />
        </IconButton>
      </Tooltip>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        container={audioControlButtonRef.current?.parentNode}
        PaperProps={{
          sx: { minWidth: 200, minHeight: 150 },
        }}
      >
        <Box p={2} position="relative">
          <IconButton
            edge="end"
            color="inherit"
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: "absolute",
              top: 8,
              right: 8,
              padding: "6px",
            }}
          >
            <CloseIcon />
          </IconButton>
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
      </Popover>
    </>
  );
};

export default AudioControl;
