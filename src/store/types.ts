import firebase from "firebase/compat/app";

export type TodoType = {
  docId: string;
  title: string;
  desc?: string;
  todos: {
    id: string;
    createdAt: firebase.firestore.Timestamp;
    todo: string;
    done: boolean;
  }[];
};

export interface CommonResponseType {
  status: "idle" | "loading" | "succeeded" | "failed";
  error?: string;
}
