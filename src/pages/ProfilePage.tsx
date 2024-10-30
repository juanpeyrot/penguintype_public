import styled from "styled-components";
import { GameCard } from "../components/GameCard";
import { useUserStore } from "../store/userStore";
import { useNavigate } from "react-router-dom";

const Section = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Ul = styled.ul`
  margin: 2rem 0;
  width: 100%%;
  padding: 1rem;
  list-style: none;
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-grow: 1;
  flex-wrap: wrap;
  gap: 1em;
`;

const NickWrapper = styled.article`
	margin-top: 2rem;
  display: flex;
  flex-direction: column;
	text-align: center;
  justify-content: space-evenly;
  align-items: center;
  background-color: ${(props) => props.theme.background};
  padding: 2rem;
  border: 4px solid ${(props) => props.theme.textSecondary};
  border-radius: 12px;
  box-shadow: 0px 0px 10px 2px ${(props) => props.theme.textSecondary};

	@media (max-width: 600px) {
    width: 90%;
  }
`;

const NicknameTitle = styled.span`
  font-size: 4rem;
  text-transform: uppercase;
  color: ${(props) => props.theme.textPrimary};
  text-shadow: 2px 2px 0px ${(props) => props.theme.textSecondary},
    4px 4px 0px ${(props) => props.theme.textSecondary};
`;

const Button = styled.button`
  background-color: #4361ee;
  border: 3px solid ${(props) => props.theme.textPrimary};
  border-radius: 8px;
  color: #fff;
  font-size: 1.5rem;
  padding: 0.75rem 2rem;
  cursor: pointer;
  text-transform: uppercase;
  transition: all 0.2s ease-in-out;
  box-shadow: 0px 4px 0px #3a0ca3, 0px 8px 15px rgba(0, 0, 0, 0.6);

  &:hover {
    background-color: #00f5d4;
    color: #000;
    transform: translateY(-2px);
    box-shadow: 0px 6px 0px #4cc9f0, 0px 10px 20px rgba(0, 0, 0, 0.7);
  }

  & a {
    text-decoration: none;
    color: inherit;
  }
`;

const LastGamesSpan = styled.span`
  font-size: 2rem;
  text-transform: uppercase;
  color: ${(props) => props.theme.logo};
  font-weight: bold;
  letter-spacing: 2px;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
  transition: all 0.4s ease;
  cursor: pointer;

  &:hover {
    text-shadow: 2px 2px 6px rgba(0, 0, 0, 0.3);
    transform: scale(1.2);
  }
`;

const Divider = styled.div`
  width: 100%;
  height: 4rem;
  background-color: transparent;
  border-top: 2px solid ${(props) => props.theme.textSecondary};
  border-bottom: 2px solid ${(props) => props.theme.textSecondary};
  margin-top: 4rem;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ProfilePage = () => {
  const { user, gameHistory } = useUserStore((state) => state);
	const navigate = useNavigate();

	const onStartTyping = () => {
		navigate("/");
	}

  return (
    <Section>
      <NickWrapper>
        <NicknameTitle>{user?.displayName}</NicknameTitle>
        <Button onClick={onStartTyping}>
          Start typing!
        </Button>
      </NickWrapper>

      <Divider>
        <LastGamesSpan>Last 5 games</LastGamesSpan>
      </Divider>

      <Ul>
        {gameHistory.map((game) => (
          <GameCard key={game.id} game={game} />
        ))}
      </Ul>
    </Section>
  );
};