import { useEffect, useMemo, useState } from "react";
import { Cursor, NeutralSpan } from "../components";
import styled from "styled-components";

interface Props{
  paragraphTextTyped: string;
}

const Container = styled.div`
  display: 'flex'; 
  flexDirection: 'column'; 
  justifyContent: 'center'; 
  alignItems: 'center';
`;

export const FreeModeTextBox = ({ paragraphTextTyped }: Props) => {

  const [render, setRender] = useState<JSX.Element[]>([]);

  const cursorPosition = useMemo(() => {
    if (paragraphTextTyped.length === 0) return 0;
    
    return paragraphTextTyped.length;
  },[paragraphTextTyped])

  useEffect(() => {
    setLetters();
  },[paragraphTextTyped]);

  const setLetters = () => {
    const arr = Array.from(paragraphTextTyped);
    let result: JSX.Element[] = [];
    arr.forEach(letter => 
      result.push(<NeutralSpan key={crypto.randomUUID()}>{letter}</NeutralSpan>))
    
    result.splice(cursorPosition, 0, <Cursor key={crypto.randomUUID()}>|</Cursor>);
    setRender([...result]);
  }

  return (
  <Container>
      <div>
        {[...render]}
      </div>
  </Container>)
}