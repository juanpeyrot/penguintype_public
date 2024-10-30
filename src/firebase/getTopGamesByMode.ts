import { collection, getDocs, query, where } from "firebase/firestore";
import { firestore } from "./firebase";
import { TUserData } from "./handleAuthStateChange";
import { GameResumeStats } from "src/store/userStore";
import { GAMEMODES } from "src/utils/constants";
import { calculateWPM } from "../utils/calculateWpm";

export interface LeaderboardGame extends GameResumeStats {
	user: string;
}

export const getTopGamesByMode = async (gamemode: GAMEMODES): Promise<LeaderboardGame[]> => {
  try {
    const usersRef = collection(firestore, "users");

    const usersQuery = query(usersRef, where("gameHistory", "!=", []));

    const querySnapshot = await getDocs(usersQuery);

    const userBestGames: Record<string, LeaderboardGame> = {};

    querySnapshot.forEach((doc) => {
      const userData = doc.data() as TUserData;

      const filteredGames = userData.gameHistory.filter(
        (game) => game.gamemode.toLowerCase() === gamemode.toLowerCase()
      );

      if (filteredGames.length > 0) {
        const bestGame = filteredGames.reduce((best, current) => {
          const bestWPM = calculateWPM(best.correctWords, best.seconds);
          const currentWPM = calculateWPM(current.correctWords, current.seconds);
          return currentWPM > bestWPM ? current : best;
        });

        userBestGames[doc.id] = { ...bestGame, user: userData.displayName };
      }
    });

    const sortedGames = Object.values(userBestGames)
      .sort((a, b) => {
        const wpmA = calculateWPM(a.correctWords, a.seconds);
        const wpmB = calculateWPM(b.correctWords, b.seconds);
        return wpmB - wpmA;
      })
      .slice(0, 10);

    return sortedGames;
  } catch (error) {
    console.error("Error fetching data from Firebase:", error);
    return [];
  }
};