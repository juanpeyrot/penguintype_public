import { useEffect, useState } from 'react';
import { Theme } from "../themes/themes";
import { useUserStore } from '../store/userStore';
import { Sound } from '../utils/constants';

export const useLocalStorage = () => {
  const initialTheme = getThemeFromLocalStorage();
  const initialSound = getKeysoundFromLocalStorage();

  const { themeSelected, setThemeSelected, 
    soundSelected, setSoundSelected } = useUserStore(state => state);

  const [theme, setTheme] = useState<Theme>(initialTheme || themeSelected);
  const [keysound, setKeysound] = useState<Sound>(initialSound || soundSelected);

  useEffect(() => {
    const storedTheme = getThemeFromLocalStorage();
  
    if (storedTheme && JSON.stringify(storedTheme) !== JSON.stringify(theme)) {
      setTheme(storedTheme);
    }
  }, [themeSelected]);

  useEffect(() => {
    const storedSound = getKeysoundFromLocalStorage();
  
    if (storedSound && JSON.stringify(storedSound) !== JSON.stringify(keysound)) {
      setKeysound(storedSound);
    }
  }, [soundSelected]);

  const updateTheme = (newTheme: Theme) => {
    setThemeToLocalStorage(newTheme);
    setTheme(newTheme);
    setThemeSelected(newTheme);
  };

  const updateKeysound = (newSound: Sound) => {
    setKeysoundToLocalStorage(newSound);
    setKeysound(newSound);
    setSoundSelected(newSound);
  }

  return {
    theme,
    setTheme: updateTheme,
    keysound,
    setKeysound: updateKeysound,
  };
};

function setThemeToLocalStorage(theme: Theme) {
  localStorage.setItem('selectedTheme', JSON.stringify(theme));
}

function getThemeFromLocalStorage(): Theme | null {
  const storedTheme = localStorage.getItem('selectedTheme');
  return storedTheme ? JSON.parse(storedTheme) : null;
}

function setKeysoundToLocalStorage(sound: Sound) {
  localStorage.setItem('selectedKeysound', JSON.stringify(sound));
}

function getKeysoundFromLocalStorage(): Sound | null {
  const storedKeysound = localStorage.getItem('selectedKeysound');
  return storedKeysound ? JSON.parse(storedKeysound) : null;
}