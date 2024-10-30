import { GameResumeStats } from "src/store/userStore";
import { GAMEMODES } from "../utils/constants";
import styled from "styled-components";
import { calcAccuracy } from "../utils/calcAccuracy";
import { calculateWPM } from "../utils/calculateWpm";

const Li = styled.li`
  width: auto;
	min-width: 190px;
  height: auto;
  background-color: ${(props) => props.theme.background};
  border: 4px solid ${(props) => props.theme.textSecondary};
  border-radius: 12px;
  padding: .5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: flex-start;
  box-shadow: 0px 8px 0px #3a0ca3, 0px 12px 20px rgba(0, 0, 0, 0.7);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
	cursor: default;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0px 12px 0px #f72585, 0px 16px 25px rgba(0, 0, 0, 0.8);
  }
`;

const Span = styled.span`
  margin-left: 10px;
  font-size: 1.1rem;
  color: ${(props) => props.theme.textPrimary};
`;

const GamemodeSpan = styled.strong`
	margin-left: 10px;
  font-size: 1.1rem;	
`;

const Divider = styled.hr`
  width: 100%;
  border: none;
  border-top: 2px dashed #7209b7;
  margin: 0.5rem 0;
`;

const Strong = styled.strong`
	color: ${(props) => props.theme.logo};
`;

const CorrectSpan = styled.span`
  color: ${(props) => props.theme.textSucess};
`;

const IncorrectSpan = styled.span`
  color: ${(props) => props.theme.textFailure};
`;

const NeutralSpan = styled.span`
  color: ${(props) => props.theme.textSecondary};
`;

interface Props {
  game: GameResumeStats;
}

export const GameCard = ({ game }: Props) => {
  const [date] = game.date?.split(',');

  const {
    correctWords,
    seconds,
    incorrectWords,
    missingWords,
    correctCharacters,
    incorrectCharacters,
    finalCorrectCharacters,
    finalIncorrectCharacters,
    finalMissingCharacters,
    gamemode,
  } = game;

	
  const accuracy = calcAccuracy(finalCorrectCharacters, incorrectCharacters);

  return (
    <Li>
      <Span><Strong>Date:</Strong> {date}</Span>
      <Divider />
      <Span><Strong>Gamemode:</Strong> <GamemodeSpan>{gamemode}</GamemodeSpan></Span>
      <Span><Strong>Words:</Strong> <CorrectSpan>{correctWords}</CorrectSpan>/<IncorrectSpan>{incorrectWords}</IncorrectSpan>/<NeutralSpan>{missingWords}</NeutralSpan></Span>
      <Span><Strong>Seconds:</Strong> {seconds}</Span>
      <Span><Strong>{calculateWPM(correctWords, seconds)} WPM</Strong> (average words per minute)</Span>
      <Span>
        <Strong>Accuracy:</Strong> {game.gamemode == GAMEMODES.FREE ? '100%' : `${accuracy.toFixed(0)}%`}
      </Span>
      <Divider />
      <Span><Strong>Total Chars:</Strong> <CorrectSpan>{correctCharacters}</CorrectSpan>/<IncorrectSpan>{incorrectCharacters}</IncorrectSpan></Span>
      <Span>
        <Strong>Final Chars:</Strong> <CorrectSpan>{finalCorrectCharacters}</CorrectSpan>/<IncorrectSpan>{finalIncorrectCharacters}</IncorrectSpan>/<NeutralSpan>{finalMissingCharacters}</NeutralSpan>
      </Span>
    </Li>
  );
};
