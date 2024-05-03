import { CommonResponseType } from "@/store/types";
import firebase from "firebase/compat/app";

export type TodoListType = {
  docId: string;
  title: string;
  desc?: string;
  createdAt: number;
  todos: TodoType[];
};

export type TodoType = {
  id: string;
  createdAt: number;
  todo: string;
  done: boolean;
};

export interface TodoStateType<
  T extends TodoListType | TodoListType[] = TodoListType
> extends CommonResponseType {
  data?: T;
}
