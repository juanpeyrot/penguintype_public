import styled from "styled-components"
import { GiPenguin } from "react-icons/gi";
import { useNavigate } from "react-router-dom";

const StyledLogo = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  color: ${props => props.theme.logo};
  cursor: pointer;
`;

const StyledSpan = styled.span`
  font-weight: 600;
  font-size: 30px;
  color: ${props => props.theme.textPrimary};
  user-select: none;

	@media (max-width: 600px) {
    font-size: 25px;
  }

	@media (max-width: 450px) {
    display: none;
  }
`

export const Logo = () => {

  const navigate = useNavigate();

  return (
    <StyledLogo onClick={() => navigate('/')}>
      <GiPenguin size={50}/>
      <StyledSpan>penguintype</StyledSpan>
    </StyledLogo>
  )
}