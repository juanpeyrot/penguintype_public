import { RefObject } from 'react';
import { create } from 'zustand';
import { GAMEMODES, GAME_STATS } from '../utils/constants';
import { Gamemode } from '../types/types';

interface GameStore {
  inputRef: InputRef;
  punctuationEnabled: boolean;
  numbersEnabled: boolean;
  wordsQuantity: WordsQuantity;
  quoteLength: QuoteLength;
  timeAmount: TimeAmount;
  gamemode: Gamemode;
  isGameOver: boolean;
  currentGameStats: GameStats;
  text: string;
  textTyped: string;

  setInputRef: (ref: InputRef) => void;
  togglePunctuationEnabled: () => void;
  toggleNumbersEnabled: () => void;
  setWordsQuantity: (value: WordsQuantity) => void;
  setQuoteLength: (value: QuoteLength) => void;
  setTimeAmount: (value: TimeAmount) => void;
  setGamemode: (value: Gamemode) => void;
  setIsGameOver: (value: boolean) => void;
  setCurrentGameStats: (value: number, identifier: GameStatsIdentifier) => void;
  resetCurrentGameStats: () => void;
  setText: (value: string) => void;
  setTextTyped: (value: string) => void;
}

type InputRef = RefObject<HTMLDivElement> | null;

export type WordsQuantity = 10 | 25 | 50 | 100;

export type QuoteLength = 15 | 30 | 50;

export type TimeAmount = 15 | 30 | 60 | 120;

export type GameStats = {
  correctWords: number;
  incorrectWords: number;
  missingWords: number;
  correctCharacters: number;
  incorrectCharacters: number;
  finalCorrectCharacters: number;
  finalIncorrectCharacters: number;
  finalMissingCharacters: number;
  seconds: number;
};

type GameStatsIdentifier = GAME_STATS.CORRECT_WORDS 
| GAME_STATS.INCORRECT_WORDS 
| GAME_STATS.MISSING_WORDS 
| GAME_STATS.CORRECT_CHARACTERS 
| GAME_STATS.INCORRECT_CHARACTERS
| GAME_STATS.FINAL_CORRECT_CHARACTERS
| GAME_STATS.FINAL_INCORRECT_CHARACTERS
| GAME_STATS.FINAL_MISSING_CHARACTERS
| GAME_STATS.SECONDS;

const currentGameStatsInitialValue: GameStats = {
  correctWords: 0,
  incorrectWords: 0,
  missingWords: 0,
  correctCharacters: 0,
  incorrectCharacters: 0,
  finalCorrectCharacters: 0,
  finalIncorrectCharacters: 0,
  finalMissingCharacters: 0,
  seconds: 0,
};

export const useGameStore = create<GameStore>((set) => ({
  inputRef: null,
  punctuationEnabled: false,
  numbersEnabled: false,
  wordsQuantity: 10,
  quoteLength: 15,
  timeAmount: 15,
  gamemode: GAMEMODES.WORDS,
  isGameOver: false,
  currentGameStats: currentGameStatsInitialValue,
  text: '',
  textTyped: '',

  setInputRef: (ref: InputRef) =>
    set((state) => {
      return ({ ...state, inputRef: ref });
    }),

  togglePunctuationEnabled: () =>
    set((state) => ({ ...state, punctuationEnabled: !state.punctuationEnabled })),

  toggleNumbersEnabled: () =>
    set((state) => ({ ...state, numbersEnabled: !state.numbersEnabled })),

  setWordsQuantity: (value: WordsQuantity) =>
    set((state) => ({ ...state, wordsQuantity: value })),

  setQuoteLength: (value: QuoteLength) =>
    set((state) => ({ ...state, quoteLength: value })),

  setTimeAmount: (value: TimeAmount) =>
    set((state) => ({ ...state, timeAmount: value })),

  setGamemode: (value: Gamemode) =>
    set((state) => ({ ...state, gamemode: value })),

  setIsGameOver: (value: boolean) =>
    set((state) => ({ ...state, isGameOver: value })),

  setCurrentGameStats: (value: number, identifier: GameStatsIdentifier) =>
    set((state) => ({ ...state, currentGameStats: {
      ...state.currentGameStats,
      [identifier]: value,
    },
  })),

  resetCurrentGameStats: () =>
    set((state) => ({
      ...state,
      currentGameStats: currentGameStatsInitialValue,
			isGameOver: false,
			textTyped: '',
    }
  )),

  setText: (value: string) =>
    set((state) => ({ ...state, text: value })),

  setTextTyped: (value: string) =>
    set((state) => ({ ...state, textTyped: value })),

}));