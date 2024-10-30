import { useEffect, useMemo, useState } from "react";
import { CorrectSpan, Cursor, IncorrectSpan, NeutralSpan } from "../components";
import { KEYBOARD } from "../../../utils/constants";

interface Props {
  paragraph: string;
  paragraphTextTyped: string;
}

export const DefaultTextBox = ({ paragraph, paragraphTextTyped }: Props) => {
  
  const [render, setRender] = useState<JSX.Element[]>([]);

  const cursorPosition = useMemo(() => {
    return paragraphTextTyped.length;
  }, [paragraphTextTyped]);

  useEffect(() => {
    setLetterColors(paragraph, paragraphTextTyped);
  }, [paragraphTextTyped, paragraph]);

  const setLetterColors = (text: string, textTyped: string) => {
    const result: JSX.Element[] = [];
    const textWithCursor = Array.from(text);

    let correctCharacters = 0;

    textWithCursor.forEach((letter, i) => {
      if (cursorPosition === i) {
        result.push(
          <Cursor key={"cursor"}>|</Cursor>
        );
      }
      if (textTyped[i] === letter) {
        if (letter !== KEYBOARD.SPACE) correctCharacters++;
        result.push(
          <CorrectSpan key={crypto.randomUUID()}>{letter}</CorrectSpan>
        );
      } else if (i >= textTyped.length) {
        result.push(
          <NeutralSpan key={crypto.randomUUID()}>{letter}</NeutralSpan>
        );
      } else {
        result.push(
          <IncorrectSpan key={crypto.randomUUID()}>{letter}</IncorrectSpan>
        );
      }
      
    });

    setRender(result);
  };

  return (
    <>
      {render}
    </>
  );
};
