import React, { useState, createContext, useContext } from "react";
import ReactHowler from "react-howler";

const AudioContext = createContext();

export const useAudio = () => {
  return useContext(AudioContext);
};

export const AudioProvider = ({ children }) => {
  const [uiVolume, setUIVolume] = useState(0.5);
  const [uiMuted, setUIMuted] = useState(false);
  const [bgVolume, setBGVolume] = useState(0.5);
  const [finalBgVolume, setFinalBgVolume] = useState(0);
  const [bgMuted, setBGMuted] = useState(true);
  const [playing, setPlaying] = useState(false);
  const [src, setSrc] = useState(null);
  const [bgSrc, setBgSrc] = useState(null);
  const [howlerRef, setHowlerRef] = useState(null);

  const value = {
    uiVolume,
    setUIVolume,
    uiMuted,
    setUIMuted,
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
        />
      )}
      {bgSrc && (
        <ReactHowler
          ref={howlerRef}
          src={bgSrc}
          volume={bgMuted ? 0 : finalBgVolume}
          playing={true}
          loop={true}
        />
      )}
    </AudioContext.Provider>
  );
};
