import styled from "styled-components";
import { Logo } from "./Logo";
import { auth, githubProvider, googleProvider } from "../../firebase/firebase";
import { signInWithPopup } from "firebase/auth";
import { useEffect, useState } from "react";
import { useUserStore } from "../../store/userStore";
import { createPortal } from "react-dom";
import { CustomModal } from "../modals/CustomModal";
import { handleAuthStateChange } from "../../firebase/handleAuthStateChange";

import { FaCrown } from "react-icons/fa";
import { UserLoggedIn } from "./login/UserLoggedIn";
import { UserNotLoggedIn } from "./login/UserNotLoggedIn";
import { Leaderboard } from "../leaderboard/Leaderboard";

const StyledNavbarContainer = styled.header`
  height: 100px;
  width: 100%;
  background-color: ${(props) => props.theme.background};
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const NavbarBody = styled.div`
  width: 80%;
  height: 100%;
  background-color: transparent;
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: center;
`;

const NavbarContent = styled.div`
  width: 100%;
  height: 60%;
  background-color: transparent;
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: center;
  gap: 20px;
`;

const Div = styled.div<{ $position: string }>`
  display: flex;
  flex: 1;
  height: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: ${props => props.$position};
`;

const LeaderboardButton = styled.button`
  color: ${props => props.theme.logo};
`;

export const AuthButton = styled.button`
  display: block;
  width: 100%;
  background-color: ${(props) => props.theme.settingsBar};
  color: ${(props) => props.theme.textPrimary};
  padding: 0.75rem;
  margin: 1rem 0;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;

  &:hover {
    background-color: ${(props) => props.theme.background};
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px #80bdff;
  }
`;

const Span = styled.span`
	color: ${(props) => props.theme.logo};
	font-weight: 700;
	font-size: 3em;
	cursor: default;
`;


export const Navbar = () => {

  const { setUser, user, setAvatar, resetUserProfile, setGameHistory, setDisplayName } = useUserStore(state => state);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLeaderboardOpen, setIsLeaderboardOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = handleAuthStateChange({ setUser, setAvatar, resetUserProfile, setGameHistory, setDisplayName });

    return () => {
			unsubscribe;
		}
  }, [user]);

  const signInWithProvider = async (provider: any) => {
    try {
      await signInWithPopup(auth, provider); 
    } catch (error) {
      console.error("Error trying to login:", error);
    }
    setIsModalOpen(false);
  };

  return (
    <>
    <StyledNavbarContainer>
      <NavbarBody>
        <NavbarContent>

        <Logo />
        
        <Div $position='start'>
          <LeaderboardButton
						id="leaderboard"
						aria-label="leaderboard"
            onClick={() => setIsLeaderboardOpen(true)}>
            <FaCrown size={30}/>
          </LeaderboardButton>
        </Div>
        
        <Div $position='space-evenly'>
          {user 
          ? <UserLoggedIn />  
          : <UserNotLoggedIn setIsModalOpen={setIsModalOpen} />
          }
        </Div>

        </NavbarContent>
      
      </NavbarBody>
    </StyledNavbarContainer>

    {(isModalOpen && document.querySelector('#app-wrapper')) && createPortal(
      <CustomModal
      setIsModalOpen={setIsModalOpen}
			width="40%"
      >
        <div style={{ margin: '2rem', textAlign: 'center' }}>
					<Span>
						Join the igloo!
					</Span>
          <AuthButton onClick={() => signInWithProvider(githubProvider)}>
            Login with GitHub
          </AuthButton>
          <AuthButton onClick={() => signInWithProvider(googleProvider)}>
            Login with Google
          </AuthButton>
        </div>
      </CustomModal> ,document.querySelector('#app-wrapper') as Element)}

      {(isLeaderboardOpen && document.querySelector('#app-wrapper')) && createPortal(
      <CustomModal
      useCurrentTheme={true}
      setIsModalOpen={setIsLeaderboardOpen}
			canBeClosed={true}
			height={user ? "90%" : undefined}
      >
        <Leaderboard/>
      </CustomModal> ,document.querySelector('#app-wrapper') as Element)}
      
    </>
  );
};
