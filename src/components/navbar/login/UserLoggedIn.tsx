import { Avatar } from "../Avatar";
import { auth } from '../../../firebase/firebase';
import { useUserStore } from "../../../store/userStore";
import { ImExit } from "react-icons/im";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const Div = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  justify-content: space-between;
  flex-grow: .01;
	margin-right: 1rem;
`;

const LogoutButton = styled.button`
  color: ${props => props.theme.logo};
`;

export const UserLoggedIn = () => {

  const { setUser } = useUserStore(state => state);

  const navigate = useNavigate();

  const signOut = async () => {
    try {
      await auth.signOut();
      setUser(null);
    } catch (error) {
      console.error("Error trying to logout:", error);
    }
  };

  return (
    <Container>
      <Div onClick={() => navigate('/profile')}>
        <Avatar />
      </Div>
      <LogoutButton onClick={signOut} id="logout" aria-label="logout">
        <ImExit size={20}/>
      </LogoutButton>
    </Container>
  )
}
