import React, { useState } from "react";
import styles from "./HeroSection.module.scss";
import ReactHowler from "react-howler";
import bowl from "../assets/footage/cropped.png";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { useAudio } from '../AudioContext';


import softSelection from "../assets/sounds/Earcon/SoftSelection.mp3";

const HeroSection = () => {
  const [playSoftSelection, setPlaySoftSelection] = useState(false);
  const { volume, muted } = useAudio();

  const handleMenuClick = () => {
    setPlaySoftSelection(true);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.heroContent}>
          <div className={styles.heroText}>
            <h1>EXPERIENCE THE FLAVORS OF JAPAN</h1>
            <p>
              Embark on a journey of authentic <br /> ramen mastery
            </p>
            <Stack direction="row" spacing={2} sx={{ paddingTop: "31px" }}>
              <Button variant="outlined">Contact</Button>
              <Button variant="contained" onClick={handleMenuClick}>
                Menu
              </Button>
            </Stack>
          </div>
          <div className={styles.collection}>
            <img src={bowl} alt="Ramen Bowl" />
            <div className={styles.ellipse}></div>
            <div className={styles.ellipseTwin}></div>
          </div>
        </div>
      </div>
      <ReactHowler
        src={softSelection}
        volume={muted ? 0 : volume}
        playing={playSoftSelection}
        onEnd={() => setPlaySoftSelection(false)}
      />
    </div>
  );
};

export default HeroSection;
