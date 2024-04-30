import { Timestamp } from "firebase/firestore";
import { TodoType, TodoStateType } from "./todosTypes";

export const emptyTodos: TodoType = {
  docId: "",
  todos: [],
  title: "",
  desc: "",
  createdAt: Timestamp.now(),
};

export const todoListsInitialState: TodoStateType<TodoType[]> = {
  status: "idle",
};
export const singleTodoListInitialState: TodoStateType<TodoType> = {
  status: "idle",
};
