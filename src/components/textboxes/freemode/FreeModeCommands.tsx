import { useEffect, useState } from "react";
import { useGameStore } from "../../../store/gameStore";
import styled from "styled-components";
import { useUserStore } from "../../../store/userStore";

interface Props {
  textTyped: string;
}

const Instructions = styled.span`
  padding: 0.2em 1em;
  margin-bottom: 10px;
  color: ${(props) => props.theme.textPrimary};
  background-color: ${(props) => props.theme.backgroundColor};
  border: 1px solid ${(props) => props.theme.textSecondary};
  border-radius: 0.5em;
  text-align: center;
	cursor: pointer;

	@media (max-width: 700px){
		margin: 0 1em;
	}
`;

export const FreeModeCommands = ({ textTyped }: Props) => {
  const [shiftHolding, setShiftHolding] = useState(false);

  const { setIsGameOver, currentGameStats, gamemode } = useGameStore(
    (state) => state
  );

  const { addGame } = useUserStore((state) => state);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Shift") setShiftHolding(true);

      if (event.key === "Enter" && shiftHolding && textTyped.length > 0) {
        setIsGameOver(true);
        addGame({
          ...currentGameStats,
          id: crypto.randomUUID(),
          gamemode: gamemode,
          date: new Date().toLocaleString(),
        });
      }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      if (event.key === "Shift") setShiftHolding(false);
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [shiftHolding]);

  const onTouch = () => {
    if (textTyped.length == 0) return;
    setIsGameOver(true);
    addGame({
      ...currentGameStats,
      id: crypto.randomUUID(),
      gamemode: gamemode,
      date: new Date().toLocaleString(),
    });
  };

  return <Instructions onClick={onTouch}>
		shift + enter to finish (or touch this)
		</Instructions>;
};
