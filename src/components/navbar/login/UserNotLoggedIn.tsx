import { Dispatch, SetStateAction } from "react"
import { FaUser } from "react-icons/fa";
import styled from "styled-components";

const LoginButton = styled.button`
  margin-right: 10px;
  color: ${props => props.theme.logo};
`;

interface Props {
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
}

export const UserNotLoggedIn = ({ setIsModalOpen }: Props) => {
  return (
    <div>
      <LoginButton onClick={() => setIsModalOpen(true)}>
        <FaUser size={20}/>
      </LoginButton>
    </div>
  )
}
