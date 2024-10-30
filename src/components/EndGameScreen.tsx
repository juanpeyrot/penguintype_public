import { useEffect } from "react";
import { useGameStore } from "../store/gameStore";
import { GAMEMODES } from "../utils/constants";
import { useUserStore } from "../store/userStore";
import { calculateWPM } from "../utils/calculateWpm";
import { GameStatsChart } from "./GameStatsChar";
import styled from "styled-components";
import { calcAccuracy } from "../utils/calcAccuracy";

const Div = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
	gap: 4rem;
	overflow-x: hidden;
`;

const Span = styled.span`
  color: ${(props) => props.theme.logo};
  font-weight: 600;
	cursor: default;
`;

const Title = styled.span`
  color: ${(props) => props.theme.logo};
  font-weight: bold;
  font-size: 2rem;
	cursor: default;
	margin: 0 2em 0 0;
`;

const ChartsContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  aling-items: center;
  justify-content: space-evenly;
	overflow-x: hidden;

	@media (max-width: 800px){
		flex-direction: column;
	}
`;

const Box = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
	overflow-x: hidden;

	@media (max-width: 800px){
		text-align: center;
	}
`;

const Line = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
	flex-wrap: wrap;
	font-size: 2rem;
	overflow-x: hidden;

	@media (max-width: 660px){
		flex-direction: column;
		gap: 2em;
	}
`;

const Button = styled.button`
  padding: 1rem;
	border: 1px solid ${(props) => props.theme.settingsBar};
  border-radius: 6px;
  background-color: ${(props) => props.theme.settingsBar};
	width: fit-content;
  align-self: center;
	font-weight: 700;
	transition: all 0.4s ease;
	margin: 2rem 0;
	overflow-x: hidden;

	&:hover {
    background-color: ${(props) => props.theme.textSuccess};
    transform: scale(1.2);
    box-shadow: 0px 6px 0px #4cc9f0, 0px 10px 20px rgba(0, 0, 0, 0.7);
  }
`;

export const EndGameScreen = () => {
  const { currentGameStats, timeAmount, gamemode, resetCurrentGameStats } =
    useGameStore((state) => state);
  const { user } = useUserStore((state) => state);

  const {
    correctWords,
    seconds,
    incorrectWords,
    missingWords,
    incorrectCharacters,
    finalCorrectCharacters,
    finalIncorrectCharacters,
    finalMissingCharacters,
  } = currentGameStats;

  useEffect(() => {
    return () => resetCurrentGameStats();
  }, []);

  useEffect(() => {
    if (!user) return;

    if (seconds == 0) return;
  }, [seconds]);

  const accuracy = calcAccuracy(finalCorrectCharacters, incorrectCharacters);

  return (
    <Div>
      <ChartsContainer>
        <Box>
          <Title>Chars stats</Title>
          <GameStatsChart
            correct={finalCorrectCharacters}
            incorrect={finalIncorrectCharacters}
            missing={finalMissingCharacters}
          />
        </Box>

        <Box>
          <Title>Words stats</Title>
          <GameStatsChart
            correct={correctWords}
            incorrect={incorrectWords}
            missing={missingWords}
          />
        </Box>
      </ChartsContainer>

      <Line>
        <Span>{calculateWPM(correctWords, seconds)} WPM</Span>
        <Span>{accuracy.toFixed(0)}% acc</Span>

        {gamemode === GAMEMODES.TIME ? (
          <Span>
            {seconds}s / {timeAmount}s
          </Span>
        ) : (
          <Span>{seconds}s</Span>
        )}
      </Line>
      <Button onClick={() => resetCurrentGameStats()}>Play Again!</Button>
    </Div>
  );
};
