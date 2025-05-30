"use client";

import { useEffect, useRef, useState } from "react";
import { Howl } from "howler";

export function useWaveSound(speed: number) {
  const [isMuted, setIsMuted] = useState(false);
  const soundRef = useRef<Howl | null>(null);
  
  useEffect(() => {
    if (!soundRef.current) {
      soundRef.current = new Howl({
        src: ["/sounds/wave.mp3"],
        loop: true,
        volume: 0.5,
        autoplay: true,
      });
    }
    
    return () => {
      if (soundRef.current) {
        soundRef.current.stop();
      }
    };
  }, []);
  
  useEffect(() => {
    const sound = soundRef.current;
    if (!sound) return;
    
    const rate = 0.5 + (speed - 0.5) * (1.5 / 4.5);
    sound.rate(rate);
    
    const volume = 0.3 + (speed - 0.5) * (0.5 / 4.5);
    sound.volume(isMuted ? 0 : volume);
    
  }, [speed, isMuted]);
  
  const toggleMute = () => {
    const sound = soundRef.current;
    if (!sound) return;
    
    const newMutedState = !isMuted;
    setIsMuted(newMutedState);
    
    if (newMutedState) {
      sound.volume(0);
    } else {
      const volume = 0.3 + (speed - 0.5) * (0.5 / 4.5);
      sound.volume(volume);
    }
  };
  
  return { toggleMute, isMuted };
}