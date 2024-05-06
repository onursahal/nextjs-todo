import { combineSlices } from "@reduxjs/toolkit";

import getSingleTodoListSlice from "./getSingleTodoList";
import getTodoListsSlice from "./getTodoLists";
import postTodoSlice from "./postTodo";
import postTodoListSlice from "./postTodoList";
import putTodoSlice from "./putTodo";
import deleteTodoSlice from "./deleteTodo";
import putTodoListSlice from "./putTodoList";
import deleteTodoListSlice from "./deleteTodoList";

const todosSlice = combineSlices(
  getTodoListsSlice,
  postTodoListSlice,
  putTodoListSlice,
  deleteTodoListSlice,
  getSingleTodoListSlice,
  postTodoSlice,
  putTodoSlice,
  deleteTodoSlice
);

export default todosSlice;
