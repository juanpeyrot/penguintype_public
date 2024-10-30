import styled from "styled-components";
import { RankedGamemodes } from "./Leaderboard";
import { GAMEMODES } from "../../utils/constants";
import { Dispatch, SetStateAction } from "react";

const Ul = styled.ul`
  width: 100%;
  list-style: none;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  gap: 5px;
  background-color: ${props => props.theme.background};
  margin: 1em 0;
  position: relative;
  padding: 0;
`;

const Li = styled.li`
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 33%;
  border-radius: 10px;
  cursor: pointer;
  color: ${props => props.theme.textPrimary};
  padding: 10px;
  position: relative;
  z-index: 1;
  transition: color 0.3s;
  text-transform: capitalize;
`;

const SlidingBackground = styled.div<{ $activeindex: number }>`
  position: absolute;
  top: 0;
  left: 0;
  width: calc(33.333% - 5px);
  height: 100%;
  background-color: ${props => props.theme.logo};
  border-radius: 10px;
  transition: transform 0.3s;
  transform: ${props => `translateX(calc(${props.$activeindex * 100}% + ${props.$activeindex * 5}px))`};
  z-index: 0;
`;

const gamemodes: RankedGamemodes[] = [GAMEMODES.TIME, GAMEMODES.WORDS, GAMEMODES.QUOTE];

interface Props {
  selectedGamemode: RankedGamemodes;
  setSelectedGamemode: Dispatch<SetStateAction<RankedGamemodes>>;
}

export const Switch = ({ selectedGamemode, setSelectedGamemode }: Props) => {
  const activeIndex = gamemodes.indexOf(selectedGamemode);

  return (
    <Ul>
      <SlidingBackground $activeindex={activeIndex} />
      {gamemodes.map(item => (
        <Li
          onClick={() => setSelectedGamemode(item)}
          key={item}
        >
          {item}
        </Li>
      ))}
    </Ul>
  );
};
