import { ReactNode } from "react";
import { useGameStore } from "../store/gameStore";
import styled from "styled-components";

const Wrapper = styled.section`
	width: 100dvw;
	min-height: 100dvh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

interface AppWrapperProps {
  children: ReactNode;
}

export const AppWrapper = ({ children }: AppWrapperProps) => {
  const { inputRef } = useGameStore(state => ({ inputRef: state.inputRef }));

  const handleClick = () => {
    inputRef?.current?.focus();
  }

  return (
    <Wrapper onClick={handleClick} id="app-wrapper">
      {children}
    </Wrapper>
  )
}