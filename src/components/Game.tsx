import styled from "styled-components";
import { Playground } from "./Playground";
import { SettingsBar } from "./settingsbar/SettingsBar";
import { useGameStore } from "../store/gameStore";
import { EndGameScreen } from "./EndGameScreen";

const Section = styled.section`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Game = () => {
  const isGameOver = useGameStore(state => state.isGameOver);

  return (
    isGameOver
    ? <EndGameScreen/>
    : 
    <Section>
      <SettingsBar/>
      <Section>
        <Playground/>
      </Section>
    </Section>
  )
}