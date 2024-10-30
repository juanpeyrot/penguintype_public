import { Dispatch, ReactNode, SetStateAction } from "react";
import styled from "styled-components";

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100dvw;
  height: 100dvh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
	z-index: 8888;
`;

const ModalContent = styled.div<{ $usecurrenttheme?: boolean, $width?: string, $height?: string }>`
  background-color: ${props => props.$usecurrenttheme ? props.theme.background : '#fff'};
  padding: 20px;
  border-radius: 5px;
	border: 3px solid ${(props) => props.theme.textPrimary};
  z-index: 9999;
	width: ${(props) => props.$width ?? "70%"};
	height: ${(props) => props.$height ?? "auto"};
	max-height: 90%;
	position: relative;
	overflow-y: auto;

	@media (max-width: 820px){
		padding: 6px;
	}

	@media (max-width: 850px){
		width: 90%;
	}
`;

export const CloseButton = styled.button`
  background: transparent;
  border: none;
  color: ${(props) => props.theme.logo};
  font-size: 1.5rem;
  cursor: pointer;
  position: absolute;
  top: 1rem;
  right: 1rem;
`;

interface Props {
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
  useCurrentTheme?: boolean;
  canBeClosed?: boolean;
  children: ReactNode;
	width?: string;
	height?: string;
}

export const CustomModal = ({ setIsModalOpen, useCurrentTheme, canBeClosed = true, width, height, children }: Props) => {

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!canBeClosed) return;

    if (e.target === e.currentTarget) {
      setIsModalOpen(false);
    }
  };

  return (
    <ModalOverlay onClick={handleOverlayClick}>
      <ModalContent
       $usecurrenttheme={useCurrentTheme ? true : false}
			 $width={width}
			 $height={height}>
				{canBeClosed && <CloseButton onClick={() => setIsModalOpen(false)}>X</CloseButton>}
        {children}
      </ModalContent>
    </ModalOverlay>
  )
}
