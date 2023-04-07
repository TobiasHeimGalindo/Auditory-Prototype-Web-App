import { createContext, useContext, useState } from 'react';

const AudioContext = createContext();

export const useAudio = () => {
  return useContext(AudioContext);
};

export const AudioProvider = ({ children }) => {
  const [volume, setVolume] = useState(0.5);
  const [muted, setMuted] = useState(true);

  const value = {
    volume,
    setVolume,
    muted,
    setMuted
  };

  return (
    <AudioContext.Provider value={value}>{children}</AudioContext.Provider>
  );
};
