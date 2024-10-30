import { Gamemode } from "../types/types";
import { GAMEMODES } from "../utils/constants";
import { DefaultWordsCounter } from "./textboxes/defaultmode/DefaultWordsCounter";
import { FreeModeWordsCounter } from "./textboxes/freemode/FreeModeWordsCounter";

interface Props {
  gamemode: Gamemode;
}

export const WordCounterSelector = ({ gamemode }: Props) => {
  
  return (
      gamemode === GAMEMODES.FREE
      ? <FreeModeWordsCounter />
        
      : <DefaultWordsCounter />
    )
}
