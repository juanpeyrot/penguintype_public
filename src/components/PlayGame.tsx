import { Dispatch, SetStateAction, useEffect } from "react";
import styled from "styled-components";
import { useGameStore } from "../store/gameStore";
import { wordsGenerator } from "../utils/textGenerators/wordsGenerator";
import { GAMEMODES } from "../utils/constants";
import { quoteGenerator } from "../utils/textGenerators/quoteGenerator";
import { FreeModeTextBox } from "./textboxes/freemode/FreeModeTextBox";
import { DefaultTextBox } from "./textboxes/defaultmode/DefaultTextBox";

import "../styles/loader.css";

const Container = styled.section`
  width: 90%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  text-align: center;
  flex-grow: 1;
`;

const TextContainer = styled.article`
  width: inherit;
  height: auto;
  color: ${(props) => props.theme.textSecondary};
  transition: filter 0.5s ease;
`;

interface Props {
  paragraph: string;
  paragraphTextTyped: string;
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
}

export const PlayGame = ({
  paragraph,
  paragraphTextTyped,
  loading,
  setLoading,
}: Props) => {
  const {
    punctuationEnabled,
    numbersEnabled,
    wordsQuantity,
    quoteLength,
    timeAmount,
    gamemode,
    setText,
    setTextTyped,
  } = useGameStore((state) => state);

  const updateText = async () => {
    setLoading(true);

    let newText = "";

    if (gamemode === GAMEMODES.WORDS || gamemode === GAMEMODES.TIME) {
      newText = await wordsGenerator({
        punctuationEnabled,
        numbersEnabled,
        wordsQuantity,
      });
    } else if (gamemode === GAMEMODES.QUOTE) {
      newText = await quoteGenerator(quoteLength);
    }

    setText(newText);
    setLoading(false);
  };

  useEffect(() => {
    setText("");
    setTextTyped("");
    updateText();
  }, [
    punctuationEnabled,
    numbersEnabled,
    wordsQuantity,
    quoteLength,
    timeAmount,
    gamemode,
  ]);

  return (
    <Container>
      {loading ? (
        <div className="loader"></div>
      ) : (
        <TextContainer>
          {gamemode === GAMEMODES.FREE ? (
            <FreeModeTextBox paragraphTextTyped={paragraphTextTyped} />
          ) : (
            <DefaultTextBox
              paragraph={paragraph}
              paragraphTextTyped={paragraphTextTyped}
            />
          )}
        </TextContainer>
      )}
    </Container>
  );
};
