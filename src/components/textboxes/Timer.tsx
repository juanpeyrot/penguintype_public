import { Dispatch, SetStateAction, useEffect } from "react";
import { useGameStore } from "../../store/gameStore";
import { Gamemode } from "../../types/types";
import styled from "styled-components";
import { GAME_STATS } from "../../utils/constants";
import { useUserStore } from "../../store/userStore";
import { TimerIcon } from "lucide-react";
import { LogoColor } from "./components";

export const TimerContainer = styled.div`
	font-size: 1.2rem;
  text-align: right;
  line-height: 1.4;
  user-select: none;
  color: ${props => props.theme.textPrimary};
	display: flex;
	flex-direction: row;
	align-items: center;
`;

interface Props {
  gamemode: Gamemode;
  hasTimerStarted: boolean;
  setHasTimerStarted: Dispatch<SetStateAction<boolean>>;
}

export const Timer = ({ gamemode, hasTimerStarted, setHasTimerStarted } : Props) => {

  const timeAmount = useGameStore(state => state.timeAmount);

  const addGame = useUserStore(state => state.addGame);

  const { setIsGameOver, setCurrentGameStats, currentGameStats } = useGameStore(state => ({
    setIsGameOver: state.setIsGameOver,
    setCurrentGameStats: state.setCurrentGameStats,
    currentGameStats: state.currentGameStats,
  }));

  const { seconds } = currentGameStats;

  useEffect(() => {
    if (!hasTimerStarted) return;

    let counter = 0;
    const timer = setInterval(() => {
      counter++;
      setCurrentGameStats(counter, GAME_STATS.SECONDS);
    }, 1000);

    return () => clearInterval(timer);
  },[hasTimerStarted, timeAmount])

  useEffect(() => {
    setCurrentGameStats(0, GAME_STATS.SECONDS);
  },[timeAmount, gamemode])
  

  useEffect(() => {
    if (seconds < timeAmount) return;

    const timeout = setTimeout(() => {
      addGame({
        ...currentGameStats,
        id: crypto.randomUUID(),
        gamemode: gamemode,
        date: new Date().toLocaleString(),
      });
      setIsGameOver(true);
      setHasTimerStarted(false);
    },500)

    return () => clearTimeout(timeout);
  },[seconds]);

  return (
    <TimerContainer>
      {`${seconds > timeAmount 
        ? timeAmount
        : seconds 
      } / ${timeAmount}`}{" "}
			<LogoColor>
				<TimerIcon height="1.2rem"/>
			</LogoColor>
    </TimerContainer>
  )
}
