import firebase from "firebase/compat/app";

export type TodoType = {
  docId: string;
  title: string;
  desc?: string;
  createdAt: firebase.firestore.Timestamp;
  todos: {
    id: string;
    createdAt: firebase.firestore.Timestamp;
    todo: string;
    done: boolean;
  }[];
};