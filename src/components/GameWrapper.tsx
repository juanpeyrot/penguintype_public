import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { GAMEMODES } from "../utils/constants";
import { PlayGame } from "./PlayGame";
import { Timer } from "./textboxes/Timer";
import { Gamemode } from "../types/types";
import { AutoTimer } from "./textboxes/AutoTimer";
import { WordCounterSelector } from "./WordCounterSelector";
import { useGameStore } from "../store/gameStore";
import styled from "styled-components";
import { FreeModeCommands } from "./textboxes/freemode/FreeModeCommands";

const GameWrapperContainer = styled.section`
  width: 100%;
  height: auto;
  padding-bottom: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
`;

const GameInfo = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
	margin-bottom: 2rem;
`;

const Wrapper = styled.section`
  width: 90%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;

  @media (max-width: 500px) {
    justify-content: space-between;
  }
`;

interface Props {
  hasTimerStarted: boolean;
  setHasTimerStarted: Dispatch<SetStateAction<boolean>>;
  gamemode: Gamemode;
  paragraph: string;
  paragraphTextTyped: string;
}

export const GameWrapper = ({
  hasTimerStarted,
  setHasTimerStarted,
  gamemode,
  paragraph,
  paragraphTextTyped,
}: Props) => {
  const [loading, setLoading] = useState(false);

  const {
    timeAmount,
    quoteLength,
    wordsQuantity,
    punctuationEnabled,
    numbersEnabled,
    textTyped,
  } = useGameStore((state) => state);

  useEffect(() => {
    setHasTimerStarted(false);
  }, [
    timeAmount,
    quoteLength,
    wordsQuantity,
    punctuationEnabled,
    numbersEnabled,
    gamemode,
  ]);

  return (
    <GameWrapperContainer>
      {!loading && (
        <GameInfo>
          <Wrapper>
            <WordCounterSelector gamemode={gamemode} />
            {gamemode === GAMEMODES.FREE && (
              <FreeModeCommands textTyped={textTyped} />
            )}
            {gamemode === GAMEMODES.TIME ? (
              <Timer
                gamemode={gamemode}
                hasTimerStarted={hasTimerStarted}
                setHasTimerStarted={setHasTimerStarted}
              />
            ) : (
              <AutoTimer
                hasTimerStarted={hasTimerStarted}
                setHasTimerStarted={setHasTimerStarted}
              />
            )}
          </Wrapper>
        </GameInfo>
      )}

      <PlayGame
        paragraph={paragraph}
        paragraphTextTyped={paragraphTextTyped}
        setLoading={setLoading}
        loading={loading}
      />
    </GameWrapperContainer>
  );
};
