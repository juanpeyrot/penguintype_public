import { useEffect, useState } from "react";
import { Gamemode, SettingsBarElement } from "../../types/types";
import { settingsBarElems } from "../../utils/constants";
import { useGameStore } from "../../store/gameStore";
import { PunctuationAndNumbers } from "./PunctuationAndNumbers";
import { TimeAndLength } from "./TimeAndLength";
import { Li } from "./components";
import styled from "styled-components";
import { MobileSettingsBar } from "./mobile/MobileSettingsBar";

const StyledBar = styled.nav`
  width: 100%;
  height: 40px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 50px;
  margin-bottom: 50px;
`;

const Ul = styled.ul<{ $leftactive?: boolean; $rightactive?: boolean }>`
  width: 300px;
  height: 100%;
  list-style: none;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 5px;
  background-color: ${(props) => props.theme.settingsBar};

  border-top-left-radius: ${(props) => (props.$leftactive ? "0" : "20px")};
  border-bottom-left-radius: ${(props) => (props.$leftactive ? "0" : "20px")};
  border-top-right-radius: ${(props) => (props.$rightactive ? "0" : "20px")};
  border-bottom-right-radius: ${(props) => (props.$rightactive ? "0" : "20px")};
`;

const Div = styled.div`
  width: 400px;
  height: 100%;
  list-style: none;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  background-color: ${(props) => props.theme.settingsBar};
  border-radius: 20px;
`;

export const SettingsBar = () => {
  const [selected, setSelected] = useState<SettingsBarElement | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  const {
    togglePunctuationEnabled,
    toggleNumbersEnabled,
    gamemode,
    setGamemode,
  } = useGameStore((state) => state);

  useEffect(() => {
    const find = settingsBarElems.find((x) => x.name === gamemode);
    setSelected(find ? { ...find } : null);
  }, [gamemode]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 820);
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return isMobile ? (
    <MobileSettingsBar />
  ) : (
    <StyledBar>
      <PunctuationAndNumbers
        selected={selected}
        toggleNumbersEnabled={toggleNumbersEnabled}
        togglePunctuationEnabled={togglePunctuationEnabled}
      />
      <Ul
        $leftactive={selected?.punctuationAndNumbers ? true : false}
        $rightactive={selected?.timeOrLength ? true : false}
      >
        <Div>
          {settingsBarElems.map((elem) => (
            <Li
              key={elem.name}
              $selected={gamemode === elem.name}
              onClick={() => setGamemode(elem.name as Gamemode)}
            >
              {elem.name}
            </Li>
          ))}
        </Div>
      </Ul>
      <TimeAndLength selected={selected} />
    </StyledBar>
  );
};
