import { SettingsBarElement } from "../types/types";

export const enum GAMEMODES {
  TIME = 'time',
  WORDS = 'words',
  QUOTE = 'quote',
  FREE = 'free',
};

export const enum GAME_FINISH_BY {
  TIME = 'time',
  LENGTH = 'length'
};

export const settingsBarElems: SettingsBarElement[] = [
  {
    name: GAMEMODES.TIME,
    logo: '',
    punctuationAndNumbers: true,
    timeOrLength: {
      type: GAME_FINISH_BY.TIME,
      values: ['15', '30', '60', '120'],
    },
  },
  {
    name: GAMEMODES.WORDS,
    logo: '',
    punctuationAndNumbers: true,
    timeOrLength: {
      type: GAME_FINISH_BY.LENGTH,
      values: ['10', '25', '50', '100'],
    }
  },
  {
    name: GAMEMODES.QUOTE,
    logo: '',
    punctuationAndNumbers: false,
    timeOrLength: {
      type: GAME_FINISH_BY.LENGTH,
      values: ['15', '30', '50'],
    }
  },
  {
    name: GAMEMODES.FREE,
    logo: '',
    punctuationAndNumbers: false,
    timeOrLength: null
  },
];

export const invalidKeys = ['Tab', 'Control', 'Unidentified', 'Alt', 'Meta', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Enter', 'Escape', 'AudioVolumeUp', 'AudioVolumeDown', 'AudioVolumeMute', 'Delete', 'CapsLock'];

export const enum GAME_STATS {
  CORRECT_WORDS = 'correctWords',
  INCORRECT_WORDS = 'incorrectWords', 
  MISSING_WORDS = 'missingWords', 
  CORRECT_CHARACTERS = 'correctCharacters', 
  INCORRECT_CHARACTERS = 'incorrectCharacters',
  FINAL_CORRECT_CHARACTERS = 'finalCorrectCharacters',
  FINAL_INCORRECT_CHARACTERS = 'finalIncorrectCharacters',
  FINAL_MISSING_CHARACTERS = 'finalMissingCharacters',
  SECONDS = 'seconds',
};

export const enum KEYBOARD {
  BACKSPACE = 'Backspace',
  SPACE = ' ',
  SHIFT = 'Shift',
  CURSOR = '|',
};

const enum SOUNDS {
  NO_SOUND = 'no sound',
  CHERRY_RED = 'cherry red',
  CHERRY_BLUE = 'cherry blue',
  OPTICAL = 'optical',
  TYPEWRITER = 'typewriter',
};

export type Sound = {
  name: SOUNDS;
  icon: string;
  url?: string;
};

export const SoundCherryRed: Sound = {
  name: SOUNDS.CHERRY_RED,
  icon: '',
  url: 'sounds/cherryRed.wav',
};

export const SoundCherryBlue: Sound = {
  name: SOUNDS.CHERRY_BLUE,
  icon: '',
  url: 'sounds/cherryBlue.wav',
};

export const SoundOptical: Sound = {
  name: SOUNDS.OPTICAL,
  icon: '',
  url: 'sounds/optical.wav'
};

export const SoundTypewriter: Sound = {
  name: SOUNDS.TYPEWRITER,
  icon: '',
  url: 'sounds/typewriter.wav'
};

export const NoSound: Sound = {
  name: SOUNDS.NO_SOUND,
  icon: '',
}

export const soundsList: Sound[] = [
  NoSound,
  SoundCherryRed,
  SoundCherryBlue,
  SoundOptical,
  SoundTypewriter,
];