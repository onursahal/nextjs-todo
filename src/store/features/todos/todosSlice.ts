import { combineSlices } from "@reduxjs/toolkit";

import getSingleTodoListSlice from "./getSingleTodoList";
import getTodoListsSlice from "./getTodoLists";
import postTodoSlice from "./postTodo";
import postTodoListSlice from "./postTodoList";
import putTodoSlice from "./putTodo";
import deleteTodoSlice from "./deleteTodo";

const todosSlice = combineSlices(
  getSingleTodoListSlice,
  getTodoListsSlice,
  postTodoSlice,
  postTodoListSlice,
  putTodoSlice,
  deleteTodoSlice
);

export default todosSlice;
