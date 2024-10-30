import styled from "styled-components";

export const Li = styled.li<{ $selected?: boolean }>`
  list-style: none;
  padding: 4px;
  color: ${props => props.$selected ? props.theme.textSelected : props.theme.textPrimary};
  cursor: pointer;
  user-select: none;
  font-weight: 500;
`;

export const Separator = styled.div`
  width: 4px;
  height: 20px;
  background-color: ${props => props.theme.textSelected};
  margin: 0 2px;
  border-radius: 5px;

	@media (max-width: 820px){
		display: none;
	}
`;

export const RightExtension = styled.ul<{ $visible?: boolean }>`
  width: 250px;
  opacity: ${props => (props.$visible ? '1' : '0')};
  pointer-events: ${props => (props.$visible ? 'auto' : 'none')};
  height: inherit;
  background-color: ${props => props.theme.settingsBar};
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
  padding: 5px;
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;

	@media (max-width: 820px){
		width: auto;
		background-color: transparent;
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-evenly;
	}

	@media (max-width: 360px) {
		flex-direction: column;	
	}
`;

export const LeftExtension = styled.ul<{ $visible?: boolean }>`
	width: 250px;
  opacity: ${props => (props.$visible ? '1' : '0')};
  pointer-events: ${props => (props.$visible ? 'auto' : 'none')};
  height: inherit;
  background-color: ${props => props.theme.settingsBar};
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
  padding: 5px;
  border-top-left-radius: 20px;
  border-bottom-left-radius: 20px;

	@media (max-width: 820px){
		width: auto;
		background-color: transparent;
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-evenly;
	}

	@media (max-width: 360px) {
		flex-direction: column;	
	}
`;
