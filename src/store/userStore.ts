import { create } from "zustand";
import { oceanic, Theme } from "../themes/themes";
import { NoSound, Sound } from "../utils/constants";
import { User } from "firebase/auth";
import { GameStats } from "./gameStore";
import { updateUser } from "../firebase/updateUser";
import { Gamemode } from "../types/types";
import { updateDisplayName } from "../firebase/updateDisplayName";
 
export interface GameResumeStats extends GameStats {
  id: string;
  gamemode: Gamemode;
  date: string;
}

type UserStore = {
  themeSelected: Theme;
  soundSelected: Sound;
  user: User | null;
  avatar: string | null;
  gameHistory: GameResumeStats[];
  displayName: string | null;

  setThemeSelected: (theme: Theme) => void;
  setSoundSelected: (sound: Sound) => void;
  setUser: (user: User | null) => void;
  setAvatar: (avatar: string | null) => void;
  resetUserProfile: () => void;
  setGameHistory: (games: GameResumeStats[]) => void;
  addGame: (game: GameResumeStats) => void;
  setDisplayName: (name: string) => void;
}

export const useUserStore = create<UserStore>((set) => ({

  themeSelected: oceanic,
  soundSelected: NoSound,
  user: null,
  avatar: null,
  gameHistory: [],
  displayName: null,

  setThemeSelected: (theme: Theme) =>
    set(state => ({ ...state, themeSelected: theme })),

  setSoundSelected: (sound: Sound) =>
    set(state => ({ ...state, soundSelected: sound })),

  setUser: (user: User | null) => 
    set(state => ({ ...state, user: user })),

  setAvatar: (avatar: string | null) =>
    set(state => ({ ...state, avatar })),

  resetUserProfile: () =>
    set(state => ({ ...state, user: null, avatar: null, gameHistory: [] })),

  setGameHistory: (games: GameResumeStats[]) =>
    set(state => {
      updateUser({ gameHistory: games });

      return ({ ...state, gameHistory: games.flat(Infinity) })
    }),
  
  addGame: (game: GameResumeStats) =>
    set(state => {
      const newValue = [...(state.gameHistory.slice(-4)), game];

      updateUser({ gameHistory: newValue.flat(Infinity) });

      return ({ ...state, gameHistory: newValue.flat(Infinity) });
  }),

  setDisplayName: (name: string) =>
    set(state => { 
      if (!state.user) return state;

      updateDisplayName(state.user, name);
      return ({ ...state, displayName: name })
    }
  ),

}));