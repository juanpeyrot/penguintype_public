import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useGameStore } from "../../store/gameStore";
import { GAME_STATS } from "../../utils/constants";
import { TimerIcon } from "lucide-react";
import { TimerContainer } from "./Timer";
import { LogoColor } from "./components";

interface Props {
  hasTimerStarted: boolean;
  setHasTimerStarted: Dispatch<SetStateAction<boolean>>;
}

export const AutoTimer = ({ hasTimerStarted, setHasTimerStarted }: Props) => {

  const {setCurrentGameStats} = useGameStore(state => state);

  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    let counter = 0;
    if (!hasTimerStarted){ 
      return setSeconds(0);
    }

    const intervalId = setInterval(() => {
      counter += 1;
      setSeconds(counter)
      counter <= 0 
        ? setCurrentGameStats(1, GAME_STATS.SECONDS) 
        : setCurrentGameStats(counter, GAME_STATS.SECONDS);
    }, 1000);

    return () => {
      clearInterval(intervalId);
      setHasTimerStarted(false);
    }
  }, [hasTimerStarted]);

  return <TimerContainer>
		{seconds}{" "}
		<LogoColor>
			<TimerIcon height="1.2rem"/>
		</LogoColor>
		</TimerContainer>
}
