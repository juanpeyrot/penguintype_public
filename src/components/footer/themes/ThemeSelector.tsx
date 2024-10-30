import { useState } from "react";
import styled from "styled-components";
import { Theme } from "../../../themes/themes";
import { themeList } from "../../../themes/themeList";
import { useLocalStorage } from "../../../hooks/useLocalStorage";

import { FaPalette } from "react-icons/fa";
import { CustomModal } from "../../modals/CustomModal";

const ThemeOption = styled.button<{ $selected: boolean }>`
  display: block;
  background-color: ${(props) =>
    props.$selected ? props.theme.settingsBar : "transparent"};
  color: ${(props) => (props.$selected ? props.theme.textPrimary : "")};
  border: none;
  cursor: pointer;
  padding: 5px;
  margin: 5px 0;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  color: ${(props) => props.theme.textSecondary};
  gap: 5px;
  cursor: pointer;
`;

const Div = styled.div`
	height: 100%;
	width: auto;
	display: flex;
	flex-direction: column;
	align-items: center;
	overflow-x: auto; 
`;

const Title = styled.span`
	@media (max-width: 400px){
		display: none;
	}
`;

const ThemeSelector = () => {
  const { theme, setTheme } = useLocalStorage();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleThemeChange = (theme: Theme) => {
    setTheme(theme);
    setIsModalOpen(false);
  };

  return (
    <>
      <Wrapper onClick={toggleModal}>
        <FaPalette size={20} />
        <Title>{theme.name}</Title>
      </Wrapper>

      {isModalOpen && (
        <CustomModal setIsModalOpen={setIsModalOpen} width={"auto"}>
          <Div>
            {themeList.map((t) => (
              <ThemeOption
                key={t.name}
                onClick={() => handleThemeChange(t)}
                $selected={theme.name === t.name}
              >
                {t.name}
              </ThemeOption>
            ))}
          </Div>
        </CustomModal>
      )}
    </>
  );
};

export default ThemeSelector;
