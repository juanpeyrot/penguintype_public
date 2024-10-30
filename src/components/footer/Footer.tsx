import styled from "styled-components";
import SoundSelector from "./sounds/SoundSelector";
import ThemeSelector from "./themes/ThemeSelector";

const AppFooter = styled.footer`
  width: 100%;
  height: 4rem;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  background-color: ${props => props.theme.background};
  position: relative;
`;

const Hr = styled.hr``;

export const Footer = () => {

  return (
    <>
      <Hr/>
      <AppFooter>
        <SoundSelector/>
        <ThemeSelector/>
      </AppFooter>
    </>
  )
}