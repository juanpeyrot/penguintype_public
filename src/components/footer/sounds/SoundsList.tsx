import { Dispatch, SetStateAction } from "react";
import { Sound, soundsList } from "../../../utils/constants";
import styled from "styled-components";
import { useLocalStorage } from "../../../hooks/useLocalStorage";

const Item = styled.li`
  display: block;
  background-color: transparent;
  border: none;
  cursor: pointer;
  padding: 1rem;
  margin: 5px 0;
  &:hover {
    background-color: #f0f0f0;
  }
`;

const Ul = styled.ul`
  list-style: none;
	overflow-x: auto;
	width: auto;
`;

interface Props {
  setIsOpen: Dispatch<SetStateAction<boolean>>
}

export const SoundsList = ({ setIsOpen }: Props) => {

  const { setKeysound } = useLocalStorage();

  const handleClick = (sound: Sound) => {
    setKeysound(sound);
    setIsOpen(false);
  };

  return (
   <Ul>
    {
      soundsList.map(sound => (
      <Item
        onClick={() => handleClick(sound)}
        key={crypto.randomUUID()}
      >{sound.name}
      </Item>))
    }
   </Ul>
  )
}
