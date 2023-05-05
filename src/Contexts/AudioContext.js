import React, { useState, createContext, useContext, useEffect } from "react";
import { Howl } from "howler";

const AudioContext = createContext();

export const useAudio = () => {
  return useContext(AudioContext);
};

export const AudioProvider = ({ children, preloadedSounds }) => {
  const [uiVolume, setUIVolume] = useState(0.5);
  const [uiMuted, setUIMuted] = useState(false);
  const [spatialVolume, setSpatialVolume] = useState(0.5);
  const [spatialMuted, setSpatialMuted] = useState(false);
  const [bgVolume, setBGVolume] = useState(0.5);
  const [finalBgVolume, setFinalBgVolume] = useState(0);
  const [bgMuted, setBGMuted] = useState(true);
  const [playing, setPlaying] = useState(false);
  const [bgSrc, setBgSrc] = useState(null);
  const [bgHowler, setBgHowler] = useState(null);

  useEffect(() => {
    if (bgSrc) {
      if (bgHowler) {
        bgHowler.unload();
      }
      const newBgHowler = new Howl({
        src: [bgSrc],
        volume: bgMuted ? 0 : finalBgVolume,
        loop: true,
        preload: true,
      });
      newBgHowler.play();
      setBgHowler(newBgHowler);
    }
  }, [bgSrc]);

  useEffect(() => {
    if (bgHowler) {
      bgHowler.volume(bgMuted ? 0 : finalBgVolume);
    }
  }, [bgHowler, bgMuted, finalBgVolume]);

  useEffect(() => {
    Object.keys(preloadedSounds).forEach((soundKey) => {
      preloadedSounds[soundKey].volume(uiVolume);
      preloadedSounds[soundKey].mute(uiMuted);
    });
  }, [uiVolume, uiMuted, preloadedSounds]);

  const playSpatialAudio = (src, position) => {
    const notificationSound = new Howl({
      src: [src],
      preload: true,
      volume: spatialMuted ? 0 : spatialVolume,
      pannerAttr: {
        panningModel: "HRTF",
        distanceModel: "inverse",
        refDistance: 1,
        maxDistance: 10000,
        rolloffFactor: 1,
        coneInnerAngle: 360,
        coneOuterAngle: 0,
        coneOuterGain: 0,
      },
    });

    notificationSound.pos(position[0], position[1], position[2]);

    notificationSound.play();
  };

  const value = {
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
    playing,
    setPlaying,
    bgSrc,
    setBgSrc,
    setFinalBgVolume,
    playSpatialAudio,
    preloadedSounds,
  };

  return (
    <AudioContext.Provider value={value}>
      {children}
    </AudioContext.Provider>
  );
};
