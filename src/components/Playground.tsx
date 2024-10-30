import { ChangeEvent, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useGameStore } from "../store/gameStore";
import { GAMEMODES, GAME_STATS, KEYBOARD, invalidKeys } from "../utils/constants";
import { GameWrapper } from "./GameWrapper";
import { useParagraph } from "../hooks/useParagraph";

const Container = styled.section`
  position: relative;
  width: 85%;
  height: auto;
  background-color: ${(props) => props.theme.background};
  overflow: hidden;
`;

const Input = styled.input`
  position: absolute;
	height: 100dvh;
	width: 80dvw;
  bottom: 0;
  left: 0;
  opacity: 0;
  pointer-events: none;
`;

export const Playground = () => {
  const [hasTimerStarted, setHasTimerStarted] = useState(false);
  const [incorrectCharacters, setIncorrectCharacters] = useState(0);
  const [correctCharacters, setCorrectCharacters] = useState(0);

  const {
    setInputRef,
    gamemode,
    setCurrentGameStats,
    text,
    textTyped,
    setTextTyped,
    punctuationEnabled,
    numbersEnabled,
    timeAmount,
    quoteLength,
    wordsQuantity,
  } = useGameStore((state) => state);

  const inputRef = useRef<HTMLInputElement>(null);

  const { paragraph, paragraphTextTyped } = useParagraph(text, textTyped, gamemode);

  useEffect(() => {
    setInputRef(inputRef);
    inputRef?.current?.focus();
  }, [inputRef]);

  useEffect(() => {
    setIncorrectCharacters(0);
    setCorrectCharacters(0);
  }, [gamemode, punctuationEnabled, numbersEnabled, timeAmount, quoteLength, wordsQuantity, text]);

  useEffect(() => {
    const incorrectCharsValue = incorrectCharacters;
    const correctCharsValue = correctCharacters;
    return () => {
      setCurrentGameStats(incorrectCharsValue, GAME_STATS.INCORRECT_CHARACTERS);
      setCurrentGameStats(correctCharsValue, GAME_STATS.CORRECT_CHARACTERS);
    };
  }, [textTyped]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    const lastChar = newValue.slice(-1);

    if (invalidKeys.includes(lastChar)) return;

    if (newValue.length < textTyped.length) {
      setTextTyped(newValue);
      return;
    }

    switch (lastChar) {
      case KEYBOARD.SPACE:
        if (gamemode !== GAMEMODES.FREE && text.charAt(textTyped.length) !== KEYBOARD.SPACE)
          return;
        setTextTyped(newValue);
        break;

      default:
        if (text.charAt(textTyped.length) === KEYBOARD.SPACE) return;
        if (textTyped.length === text.length && gamemode !== GAMEMODES.FREE) return;

        const actualWord = newValue.split(" ").slice(-1);
        if (actualWord[0].length >= 20) return;

        updateIncorrectCharacters(text, newValue);
        setTextTyped(newValue);

        setHasTimerStarted(true);
    }
  };

  const updateIncorrectCharacters = (text: string, textTyped: string) => {
    if (gamemode === GAMEMODES.FREE) {
      setIncorrectCharacters(0);
      setCorrectCharacters((prev) => prev + 1);
    } else {
      if (text[textTyped.length - 1] !== textTyped[textTyped.length - 1]) {
        setIncorrectCharacters((prev) => prev + 1);
      } else {
        setCorrectCharacters((prev) => prev + 1);
      }
    }
  };

  const preventScroll = (event: React.TouchEvent) => {
    event.preventDefault();
    inputRef.current?.focus();
  };

  return (
    <Container
      onClick={() => inputRef.current?.focus()}
      onTouchStart={preventScroll}
    >
      <Input
        ref={inputRef}
        onChange={handleChange}
        value={textTyped}
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="none"
        spellCheck={false}
      />

      <GameWrapper
        hasTimerStarted={hasTimerStarted}
        setHasTimerStarted={setHasTimerStarted}
        gamemode={gamemode}
        paragraph={paragraph ?? ""}
        paragraphTextTyped={paragraphTextTyped}
      />
    </Container>
  );
};
