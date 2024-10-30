import { useEffect, useState } from "react";
import { RankedGamemodes } from "./Leaderboard";
import styled from "styled-components";
import {
  getTopGamesByMode,
  LeaderboardGame,
} from "../../firebase/getTopGamesByMode";
import { calculateWPM } from "../../utils/calculateWpm";

const TableContainer = styled.div`
  width: 100%;
  max-height: 400px;
  overflow-y: auto;
  background-color: transparent;
  margin: 1em 0;
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 1.1em;
  color: ${(props) => props.theme.textPrimary};
`;

const StyledTh = styled.th`
  padding: 10px 15px;
  background-color: ${(props) => props.theme.secondary};
  text-align: left;
  font-weight: bold;
  border-bottom: 2px solid ${(props) => props.theme.borderColor};
`;

const StyledTd = styled.td`
  padding: 10px 15px;
  border-bottom: 1px solid ${(props) => props.theme.borderColor};
  text-align: left;
`;

const StyledRank = styled.span<{ $rank: number }>`
  font-weight: bold;
  color: ${(props) => {
    if (props.$rank === 1) return "#FFD700";
    if (props.$rank === 2) return "#C0C0C0";
    if (props.$rank === 3) return "#CD7F32";
    return props.theme.textPrimary;
  }};
  font-size: ${(props) => (props.$rank <= 3 ? "1.5em" : "1em")};
`;

const LoadingDiv = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

interface Props {
  gamemode: RankedGamemodes;
}

export const Content = ({ gamemode }: Props) => {
  const [games, setGames] = useState<LeaderboardGame[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchGames = async () => {
      setGames([]);
      setLoading(true);
      await getTopGamesByMode(gamemode).then((res) => {
        setGames(res);
        setLoading(false);
      });
    };

    fetchGames();
  }, [gamemode]);

  return loading ? (
    <LoadingDiv>
      <div className="loader"></div>
    </LoadingDiv>
  ) : (
    <TableContainer>
      <StyledTable>
        <thead>
          <tr>
            <StyledTh>Rank</StyledTh>
            <StyledTh>User</StyledTh>
            <StyledTh>WPM</StyledTh>
          </tr>
        </thead>
        <tbody>
          {games.map((item, i) => (
            <tr key={item.id}>
              <StyledTd>
                <StyledRank $rank={i + 1}>{i + 1}</StyledRank>
              </StyledTd>
              <StyledTd>{item.user}</StyledTd>
              <StyledTd>{calculateWPM(item.correctWords, item.seconds)}</StyledTd>
            </tr>
          ))}
        </tbody>
      </StyledTable>
    </TableContainer>
  );
};