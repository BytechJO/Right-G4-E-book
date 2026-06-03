// audio context 
import { createContext, useContext, useRef, useState } from "react";

const AudioContext = createContext(null);

export const AudioProvider = ({ children }) => {
  const currentAudioRef = useRef(null);
  const currentIntervalRef = useRef(null);
  const [activePageId, setActivePageId] = useState(null);

  const stopCurrent = () => {
    if (currentIntervalRef.current) {
      clearInterval(currentIntervalRef.current);
      currentIntervalRef.current = null;
    }
    if (currentAudioRef.current) {
      currentAudioRef.current.pause();
      currentAudioRef.current = null;
    }
    setActivePageId(null);
  };

  const registerAudio = (audioEl, intervalId, pageId) => {
    stopCurrent();
    currentAudioRef.current = audioEl;
    currentIntervalRef.current = intervalId;
    setActivePageId(pageId);
  };

  return (
    <AudioContext.Provider value={{ registerAudio, stopCurrent, activePageId }}>
      {children}
    </AudioContext.Provider>
  );
};

export const useAudio = () => useContext(AudioContext);