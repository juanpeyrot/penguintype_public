import { useEffect, useMemo } from "react";
import { GAME_STATS } from "../../../utils/constants";
import { useGameStore } from "../../../store/gameStore";
import { compareTexts } from "../../../utils/compareTexts";
import { LogoColor, WordsCounterContainer } from "../components";
import { useUserStore } from "../../../store/userStore";
import { CaseLower } from "lucide-react";

export const DefaultWordsCounter = () => {

  const { setCurrentGameStats, setIsGameOver, gamemode, 
    punctuationEnabled, numbersEnabled, timeAmount, 
    quoteLength, wordsQuantity, resetCurrentGameStats,
    text, textTyped, currentGameStats } = useGameStore(state => state);
  
    const { addGame } = useUserStore(state => state);

  const correctWordsTyped = useMemo(() => {
    const typed = textTyped.split(' ');
    const total = text.split(' ');

    let correctWords = 0;
    typed.forEach((word,i) => {
      if (word === total[i] && textTyped.length > 0 && text.length > 0)
        correctWords++;
    });

    return correctWords;
  },[textTyped, text]);

  const incorrectWordsTyped = useMemo(() => {
    const typed = textTyped.split(' ');
    const total = text.split(' ');

    let incorrectWords = 0;
    typed.forEach((word,i) => {
      if (word !== total[i] && textTyped.length > 0 && text.length > 0)
        incorrectWords++;
    });

    return incorrectWords;
  },[textTyped, text])

  const missingWords = useMemo(() => {
    const textTypedToArrayLength = textTyped.split(' ').length;
    const textToArrayLength = text.split(' ').length;

    return textTyped.length === 0 
    ? text.split(' ').slice(textTypedToArrayLength-1, textToArrayLength).length
    : text.split(' ').slice(textTypedToArrayLength, textToArrayLength).length;
  },[textTyped, text]);

  const totalWords = useMemo(() => {
    return text.split(' ').length;
  },[text]);
  
  useEffect(() => {
    const { finalCorrectCharacters, finalIncorrectCharacters, 
      finalMissingCharacters } = compareTexts(text, textTyped);
  
    setCurrentGameStats(finalCorrectCharacters, GAME_STATS.FINAL_CORRECT_CHARACTERS);
    setCurrentGameStats(finalIncorrectCharacters, GAME_STATS.FINAL_INCORRECT_CHARACTERS);
    setCurrentGameStats(finalMissingCharacters, GAME_STATS.FINAL_MISSING_CHARACTERS);

  },[textTyped, text]);

  useEffect(() => {
    setCurrentGameStats(correctWordsTyped, GAME_STATS.CORRECT_WORDS);
  },[correctWordsTyped]);

  useEffect(() => {
    setCurrentGameStats(incorrectWordsTyped, GAME_STATS.INCORRECT_WORDS);
  },[incorrectWordsTyped]);

  useEffect(() => {
    setCurrentGameStats(missingWords, GAME_STATS.MISSING_WORDS);
  },[missingWords]);

  useEffect(() => {
    resetCurrentGameStats();
  },[gamemode, punctuationEnabled, numbersEnabled, timeAmount, quoteLength, wordsQuantity, text]);

  useEffect(() => {
    if (missingWords !== 0) return;

    const textTypedToArray = textTyped.split(' ');
    const textToArray = text.split(' ');

    const lastWord = textToArray.slice(-1)[0];
    const lastTypedWord = textTypedToArray.slice(-1)[0];
    
    if (lastWord.length === lastTypedWord.length 
    && textToArray.length === textTypedToArray.length 
    && textTyped.length > 0 
    && text.length > 0){
      addGame({
      ...currentGameStats,
      id: crypto.randomUUID(),
      gamemode: gamemode,
      date: new Date().toLocaleString(),
      });
      setIsGameOver(true);
    }
    
  }, [missingWords, textTyped, text]);

  return (
    <WordsCounterContainer>
      {correctWordsTyped} /{totalWords}{" "}
			<LogoColor>
				<CaseLower />
			</LogoColor>
    </WordsCounterContainer>
  )
}
