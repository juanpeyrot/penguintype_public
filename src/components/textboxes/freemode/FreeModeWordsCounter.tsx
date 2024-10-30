import { useEffect, useMemo } from "react";
import { LogoColor, WordsCounterContainer } from "../components";
import { useGameStore } from "../../../store/gameStore";
import { GAME_STATS } from "../../../utils/constants";
import { CaseLower } from "lucide-react";

export const FreeModeWordsCounter = () => {

  const { setCurrentGameStats, textTyped } = useGameStore(state => state);

  const wordsCounter = useMemo(() => {
    const validWords = textTyped.split(' ').reduce((acc, word) => {
      if (word !== ' ' && word !== '') return acc + 1;
      return acc;
    },0); 

    return validWords;
  },[textTyped]);

  const correctCharacters = useMemo(() => {
    return textTyped.split(' ').reduce((acc, word) => {
      if (word !== ' ' && word !== '') return acc + word.length;
      return acc;
    },0); 
  },[textTyped]);

  useEffect(() => {
    setCurrentGameStats(wordsCounter, GAME_STATS.CORRECT_WORDS);
    setCurrentGameStats(0, GAME_STATS.INCORRECT_WORDS);
    setCurrentGameStats(0, GAME_STATS.MISSING_WORDS);
    setCurrentGameStats(correctCharacters, GAME_STATS.CORRECT_CHARACTERS);
    setCurrentGameStats(0, GAME_STATS.INCORRECT_CHARACTERS);
    setCurrentGameStats(correctCharacters, GAME_STATS.FINAL_CORRECT_CHARACTERS);
    setCurrentGameStats(0, GAME_STATS.FINAL_INCORRECT_CHARACTERS);
    setCurrentGameStats(0, GAME_STATS.FINAL_MISSING_CHARACTERS);
  },[textTyped]);

  return (
    <WordsCounterContainer>
      {wordsCounter}{" "}
			<LogoColor>
				<CaseLower />
			</LogoColor>
    </WordsCounterContainer>
  )
}
