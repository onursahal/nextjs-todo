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
  getTodoListStatus: "idle" | "loading" | "succeeded" | "failed";
  postTodoListStatus: "idle" | "loading" | "succeeded" | "failed";
  error?: string;
}
