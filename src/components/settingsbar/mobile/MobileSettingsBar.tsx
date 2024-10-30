import { useState, useEffect } from "react";
import styled from "styled-components";
import { Gamemode, SettingsBarElement } from "../../../types/types";
import { settingsBarElems } from "../../../utils/constants";
import { useGameStore } from "../../../store/gameStore";
import { PunctuationAndNumbers } from "../PunctuationAndNumbers";
import { TimeAndLength } from "../TimeAndLength";
import { Li } from "../components";
import { CustomModal } from "../../modals/CustomModal";

const Button = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  background-color: ${(props) => props.theme.settingsBar};
  color: ${(props) => props.theme.textPrimary};
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
  margin: 2rem 0;

  &:hover {
    background-color: ${(props) => props.theme.textSecondary};
  }
`;

const Div = styled.div`
  width: 100%;
  height: 100%;
  list-style: none;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  background-color: ${(props) => props.theme.settingsBar};
  border-radius: 20px;

	@media (max-width: 360px) {
		flex-direction: column;	
	}
`;

const MobileContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
	background-color: ${(props) => props.theme.settingsBar};

  @media (max-width: 820px) {
    width: auto;
    background-color: ${(props) => props.theme.settingsBar};
  }
`;

const Span = styled.span`
	color: ${(props) => props.theme.background};
	font-size: 1.5rem;
	font-weight: 800;
	padding: 1rem;
	margin: 1rem 0;
	border-radius: 7px;
`;

const Hr = styled.hr`
	border: 1px solid ${(props) => props.theme.background};
	width: 90%;
`;

export const MobileSettingsBar = () => {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [selected, setSelected] = useState<SettingsBarElement | null>(null);

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

  const onClick = () => {
    setSettingsOpen(!settingsOpen);
  };

  return (
    <>
      <Button onClick={onClick}>Settings</Button>
      {settingsOpen && (
        <CustomModal setIsModalOpen={setSettingsOpen} canBeClosed={true}>
          <MobileContainer>
						<Span>Gamemode</Span>
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
						<Hr/>
						<Span>Extra</Span>
						<PunctuationAndNumbers
              selected={selected}
              toggleNumbersEnabled={toggleNumbersEnabled}
              togglePunctuationEnabled={togglePunctuationEnabled}
            />
						<Hr/>
            <TimeAndLength selected={selected} />
          </MobileContainer>
        </CustomModal>
      )}
    </>
  );
};
