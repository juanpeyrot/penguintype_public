import styled from "styled-components";

export const CorrectSpan = styled.span`
  color: ${props => props.theme.textSuccess};
  font-size: 30px;
`;

export const IncorrectSpan = styled.span`
  color: ${props => props.theme.textFailure};
  font-size: 30px;
`;

export const NeutralSpan = styled.span`
  color: ${props => props.theme.textSecondary};
  font-size: 30px;
`;

export const Cursor = styled.span`
  animation: blinkCursor 0.5s infinite;
  font-size: 30px;
  margin-right: -5px;
  margin-left: 5px;
  margin-right: 5px;

  @keyframes blinkCursor {
    0% {
      visibility: hidden;
    }
    50% {
      visibility: hidden;
    }
    100% {
      visibility: visible;
    }
`;

export const WordsCounterContainer = styled.div`
  color: ${(props) => props.theme.textPrimary};
  font-size: 1.2rem;
  text-align: right;
  line-height: 1.4;
  user-select: none;
	display: flex;
	flex-direction: row;
	align-items: center;
`;

export const LogoColor = styled.span`
	color: ${(props) => props.theme.logo};
`;
