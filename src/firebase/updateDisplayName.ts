import { User } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { firestore } from "./firebase";


export const updateDisplayName = (user: User, displayName: string) => {
  if (user) {
    const userDocRef = doc(firestore, "users", user.uid);
    setDoc(userDocRef, { displayName: displayName }, { merge: true })
      .catch(error => console.error("Error updating displayName in Firestore:", error));
  }
}