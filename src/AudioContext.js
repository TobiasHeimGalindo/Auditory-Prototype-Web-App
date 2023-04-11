import React, { useState, createContext, useContext } from 'react';
import ReactHowler from 'react-howler';

const AudioContext = createContext();

export const useAudio = () => {
  return useContext(AudioContext);
};

export const AudioProvider = ({ children }) => {
  const [volume, setVolume] = useState(0.5);
  const [muted, setMuted] = useState(true);
  const [playing, setPlaying] = useState(false);
  const [src, setSrc] = useState(null);

  const value = {
    volume,
    setVolume,
    muted,
    setMuted,
    playing,
    setPlaying,
    src,
    setSrc
  };

  return (
    <AudioContext.Provider value={value}>
      {children}
      {src && (
        <ReactHowler
          src={src}
          volume={muted ? 0 : volume}
          playing={playing}
          onEnd={() => setPlaying(false)}
        />
      )}
    </AudioContext.Provider>
  );
};
