import React, { useState, useRef } from 'react';
import ReactHowler from 'react-howler';
//Experimenting
const FadeInPlayer = ({ src, loop }) => {
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [volume, setVolume] = useState(0.1);
  const howlerRef = useRef(null);

  const togglePlay = () => {
    if (!playing) {
      // Fade in
      howlerRef.current.howler.volume(0);
      howlerRef.current.howler.fade(0, volume, 5000); // Adjust fade-in duration (in ms) as needed
    }
    setPlaying(!playing);
  };

  const toggleMute = () => {
    setMuted(!muted);
  };

  const handleVolumeChange = (e) => {
    setVolume(e.target.value);
  };

  return (
    <div>
      <ReactHowler ref={howlerRef} src={src} playing={playing} mute={muted} volume={volume} loop={loop} />
      <button onClick={togglePlay}>{playing ? 'Pause' : 'Play'}</button>
      <button onClick={toggleMute}>{muted ? 'Unmute' : 'Mute'}</button>
      <div>
        <label htmlFor="volume">Volume: </label>
        <input
          id="volume"
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={volume}
          onChange={handleVolumeChange}
        />
      </div>
    </div>
  );
};

export default FadeInPlayer;




