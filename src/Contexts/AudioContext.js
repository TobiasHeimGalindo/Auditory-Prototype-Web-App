import React, { useState, createContext, useContext } from "react";
import ReactHowler from "react-howler";
import { Howl } from "howler";

const AudioContext = createContext();

export const useAudio = () => {
  return useContext(AudioContext);
};

export const AudioProvider = ({ children }) => {
  const [uiVolume, setUIVolume] = useState(0.5);
  const [uiMuted, setUIMuted] = useState(false);
  const [spatialVolume, setSpatialVolume] = useState(0.5);
  const [spatialMuted, setSpatialMuted] = useState(false);
  const [bgVolume, setBGVolume] = useState(0.5);
  const [finalBgVolume, setFinalBgVolume] = useState(0);
  const [bgMuted, setBGMuted] = useState(true);
  const [playing, setPlaying] = useState(false);
  const [src, setSrc] = useState(null);
  const [spatialSrc, setSpatialSrc] = useState(null);
  const [bgSrc, setBgSrc] = useState(null);
  const [howlerRef, setHowlerRef] = useState(null);

  const playSpatialAudio = (src, position) => {
    setSpatialSrc(src);
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
    src,
    setSrc,
    bgSrc,
    setBgSrc,
    howlerRef,
    setHowlerRef,
    setFinalBgVolume,
    spatialSrc,
    setSpatialSrc,
    playSpatialAudio,
  };

  return (
    <AudioContext.Provider value={value}>
      {children}
      {src && (
        <ReactHowler
          src={src}
          volume={uiMuted ? 0 : uiVolume}
          playing={playing}
          onEnd={() => setPlaying(false)}
          preload={true}
        />
      )}
      {bgSrc && (
        <ReactHowler
          ref={howlerRef}
          src={bgSrc}
          volume={bgMuted ? 0 : finalBgVolume}
          playing={true}
          loop={true}
          preload={true}
        />
      )}
    </AudioContext.Provider>
  );
};
