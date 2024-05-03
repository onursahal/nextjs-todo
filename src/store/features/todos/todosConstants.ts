import { TodoListType, TodoStateType } from "./todosTypes";

export const emptyTodos: TodoListType = {
  docId: "",
  todos: [],
  title: "",
  desc: "",
  createdAt: new Date().valueOf(),
};

export const todoListsInitialState: TodoStateType<TodoListType[]> = {
  status: "idle",
};
export const singleTodoListInitialState: TodoStateType<TodoListType> = {
  status: "idle",
};
