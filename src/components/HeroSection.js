import React, { useRef, useState, useEffect } from "react";
import "./HeroSection.scss";

import bowl from "../assets/footage/cropped.png";
import ReactHowler from "react-howler";
import ambientSound1 from "../assets/sounds/ambient-sound1.mp3";

const HeroSection = () => {
  const [playing, setPlaying] = useState(false);
  const howlerRef = useRef(null);
  const volume = 0.2;

  const handleLoad = () => {
    howlerRef.current.howler.volume(0);
    howlerRef.current.howler.fade(0, volume, 5000);
    setPlaying(true);
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const newVolume = volume - (volume * scrollTop) / maxScroll;

      if (howlerRef.current) {
        howlerRef.current.howler.volume(newVolume);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [volume]);

  

  return (
    <div className="wrapper">
      <div className="container">
        <div className="heroContent">
          <div className="heroText">
            <h1>EXPERIENCE THE FLAVORS OF JAPAN</h1>
            <p>Embark on a journey of authentic ramen mastery</p>
          </div>
          <div className="collection">
            <div className="bruh">
              <img src={bowl} alt="Ramen Bowl" />
            </div>
            <div className="ellipse"></div>
            <div className="ellipseTwin"></div>
          </div>
        </div>
      </div>
      <ReactHowler
        src={ambientSound1}
        playing={playing}
        loop={true}
        ref={howlerRef}
        onLoad={handleLoad}
      />
    </div>
  );
};

export default HeroSection;
