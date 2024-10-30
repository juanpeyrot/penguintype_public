import { useState } from "react";
import { GAMEMODES } from "../../utils/constants";
import { Switch } from "./Switch";

import styled from "styled-components";
import "react-tooltip/dist/react-tooltip.css";
import { TooltipComponent } from "./tooltip/TooltipComponent";
import { Content } from "./Content";
import { useUserStore } from "../../store/userStore";

const Section = styled.section`
  height: 100%;
  width: 100%;
  background-color: ${(props) => props.theme.background};
`;

const Title = styled.h2`
  color: ${(props) => props.theme.textPrimary};
  font-weight: bold;
  font-size: 2em;

  @media (max-width: 400px) {
    font-size: 1em;
  }
`;

const Article = styled.article`
  width: 100%;
  display: flex;
  flex-direction: row;
  gap: 1em;
  justify-content: start;
  align-items: center;

  @media (max-width: 400px) {
    justify-content: center;
  }
`;

const WarningDiv = styled.div`
  margin-top: 2rem;
  padding: 1rem 2rem;
  background-color: #ffcccc;
  color: #990000;
  border: 2px dashed #ff6666;
  border-radius: 10px;
  font-weight: bold;
  text-align: center;
  box-shadow: 0 0 10px rgba(255, 102, 102, 0.5);
  font-size: 1.2rem;
	cursor: default;

  @media (max-width: 400px) {
    font-size: 1rem;
    padding: 0.8rem;
  }
`;

const Hr = styled.hr``;

export type RankedGamemodes =
  | GAMEMODES.TIME
  | GAMEMODES.WORDS
  | GAMEMODES.QUOTE;

export const Leaderboard = () => {
  const [selectedGamemode, setSelectedGamemode] = useState<RankedGamemodes>(
    GAMEMODES.TIME
  );
  const { user } = useUserStore();

  return (
    <Section>
      <Article>
        <Title>Leaderboard</Title>
        <TooltipComponent />
      </Article>

      {user ? (
        <>
          <Switch
            selectedGamemode={selectedGamemode}
            setSelectedGamemode={setSelectedGamemode}
          />

          <Hr />

          <Content gamemode={selectedGamemode} />
        </>
      ) : (
        <WarningDiv>Looks like you're not a penguin yet, join us to see the best scores!</WarningDiv>
      )}
    </Section>
  );
};
