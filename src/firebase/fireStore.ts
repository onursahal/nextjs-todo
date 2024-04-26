import { getFirestore, collection, getDocs } from "firebase/firestore";
import app from "./config";

export const db = getFirestore(app);

export const getData = async () => {
  const querySnapshot = await getDocs(collection(db, "todoLists"));

  querySnapshot.forEach((doc) => {
    console.log(doc.data());
  });
};
