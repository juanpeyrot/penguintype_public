import { useState } from 'react';
import styled from 'styled-components';
import { SoundsList } from './SoundsList';

import { AiFillSound } from "react-icons/ai";
import { useLocalStorage } from '../../../hooks/useLocalStorage';

const Container = styled.div`
  width: auto;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const SoundMenu = styled.div<{ $isopen: boolean }>`
  position: absolute;
  bottom: 65px;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 5px;
  display: ${props => props.$isopen ? 'block' : 'none'};
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  color: ${props => props.theme.textSecondary};
  gap: 5px;
  cursor: pointer;
`;

const Title = styled.span`
	@media (max-width: 400px){
		display: none;
	}
`;

const SoundSelector = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { keysound } = useLocalStorage();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Container>
      <SoundMenu $isopen={isOpen}>
        <SoundsList setIsOpen={setIsOpen}/>
      </SoundMenu>

      <Wrapper onClick={toggleMenu}>
        <AiFillSound size={20}/>
        <Title>{keysound.name}</Title>
      </Wrapper>
    </Container>
  );
};

export default SoundSelector;
