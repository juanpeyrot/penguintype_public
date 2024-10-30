import { useLocalStorage } from '../../../hooks/useLocalStorage';
import { useGameStore } from '../../../store/gameStore';
import { Howl } from 'howler';
import { useEffect, useMemo } from 'react';

export const SoundPlayer = () => {
  const { textTyped } = useGameStore(state => state);
  const { keysound } = useLocalStorage();

  const sound = useMemo(() => {
    if (!keysound.url) return null;
    return new Howl({
      src: [keysound.url],
      html5: true,
      volume: 0.5,
    });
  }, [keysound]);

  const playSound = () => {
    if (sound){
      sound.play();
    }
  };

  useEffect(() => {
    if (sound) {
      playSound();
    }
  }, [textTyped]);
  
  return null;
};
