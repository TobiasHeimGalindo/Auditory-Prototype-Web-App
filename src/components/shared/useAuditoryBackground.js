import { useEffect, useState, useRef } from "react";
import { throttle } from "lodash";
import { useAudio } from "../../AudioContext";

export const useAuditoryBackground = (additionalMutedCondition = false) => {
  const { bgVolume, bgMuted, setBgSrc, setFinalBgVolume, setHowlerRef } =
    useAudio();
  const [scrollVolume, setScrollVolume] = useState(bgVolume);
  const howlerRef = useRef(null);
  setHowlerRef(howlerRef);
  const handleVisibilityChange = () => {
    if (document.visibilityState === "hidden") {
      if (howlerRef.current) {
        howlerRef.current.pause();
      }
    } else if (document.visibilityState === "visible") {
      if (howlerRef.current) {
        howlerRef.current.play();
      }
    }
  };

  useEffect(() => {
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  });

  useEffect(() => {
    const handleScroll = throttle(() => {
      const scrollPosition = window.pageYOffset;
      const windowHeight = window.innerHeight;
      const maxVolume = bgVolume;
      const minVolume = 0.1;
      const documentHeight = document.documentElement.scrollHeight;

      const volumeRange = maxVolume - minVolume;
      const scrollPercentage = scrollPosition / (documentHeight - windowHeight);
      const scrollVolume =
        maxVolume - Math.min(scrollPercentage, 1) * volumeRange;

      setScrollVolume(scrollVolume);
    }, 100);

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [bgMuted, additionalMutedCondition, bgVolume]);

  const finalMuted = bgMuted || additionalMutedCondition;

  const finalVolume = finalMuted
    ? 0
    : Number.isFinite(bgVolume * scrollVolume)
    ? bgVolume * scrollVolume
    : 0;

  useEffect(() => {
    setFinalBgVolume(finalVolume);
  }, [finalVolume, setFinalBgVolume]);

  return {
    howlerRef,
    setBgSrc,
  };
};
