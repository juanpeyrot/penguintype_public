import { GAMEMODES, GAME_FINISH_BY } from "../utils/constants";

export type SettingsBarElement = {
  name: string,
  logo: string,
  punctuationAndNumbers: boolean,
  timeOrLength: TimeOrLength | null;
}

type TimeOrLength = {
  type: TimeOrLengthValues;
  values: string[];
}

export type TimeOrLengthValues = GAME_FINISH_BY;

export type Gamemode = GAMEMODES;