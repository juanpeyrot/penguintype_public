import { User, onAuthStateChanged } from 'firebase/auth';
import { collection, doc, getDoc, setDoc } from "firebase/firestore";
import { auth, firestore } from './firebase';
import { generateAvatar } from '../utils/generateAvatar';
import { GameResumeStats } from '../store/userStore';

interface Props {
  setUser: (user: User | null) => void;
  setAvatar: (avatar: string | null) => void;
  resetUserProfile: () => void;
  setGameHistory: (game: GameResumeStats[]) => void;
  setDisplayName: (name: string) => void;
}

export type TUserData = {
	avatarUrl: string;
	displayName: string;
	gameHistory: GameResumeStats[];
}

export const handleAuthStateChange = async ({setUser, setAvatar, resetUserProfile, setGameHistory, setDisplayName}: Props) => {

  const unsubscribe = onAuthStateChanged(auth, async (userAuth) => {
    if (userAuth) {
      setUser(userAuth);

      const usersCollection = collection(firestore, "users");
      const userDoc = doc(usersCollection, userAuth.uid);

      try {
        const userSnapshot = await getDoc(userDoc);
        if (userSnapshot.exists()) {
          const userData = userSnapshot.data() as TUserData;
          setAvatar(userData.avatarUrl);
          setGameHistory(userData.gameHistory.slice(-5));
          setDisplayName(userData.displayName);
        } else {
          const avatarUrl = await generateAvatar(userAuth.displayName);
          setAvatar(avatarUrl);

          const userData = {
            displayName: userAuth.displayName,
            avatarUrl,
            gameHistory: [],
          };
          await setDoc(userDoc, userData);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    } else {
      resetUserProfile();
    }
  });

  return unsubscribe;
};
