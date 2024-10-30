import { onAuthStateChanged } from "firebase/auth";
import { auth, firestore } from "./firebase";
import { collection, doc, getDoc, updateDoc } from "firebase/firestore";
import { GameResumeStats } from "../store/userStore";

interface UserData {
  gameHistory?: GameResumeStats[];
  displayName?: string;
}

export const updateUser = (userData: UserData) => {

  onAuthStateChanged(auth, async (userAuth) => {
    if (userAuth) {
      const usersCollection = collection(firestore, "users");
      const userDoc = doc(usersCollection, userAuth.uid);

      const userDocSnapshot = await getDoc(userDoc);
      const existingData = userDocSnapshot.data();

      const updatedGameHistory = userData.gameHistory || [];

      if (existingData && existingData.gameHistory) {
        existingData.gameHistory.forEach((item: GameResumeStats) => {
          const existingIndex = updatedGameHistory.findIndex((updatedItem) => updatedItem.id === item.id);
          if (existingIndex !== -1) {
            updatedGameHistory[existingIndex] = item;
          } else {
            updatedGameHistory.push(item);
          }
        });
      }

      await updateDoc(userDoc, { gameHistory: updatedGameHistory });
    }
  });
};
