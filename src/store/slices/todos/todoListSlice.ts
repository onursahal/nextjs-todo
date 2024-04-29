import { createAction, createSlice } from "@reduxjs/toolkit";
import { CommonResponseType, TodoType } from "../../types";
import { RootState } from "../../store";
import {
  getSingleTodoList,
  getTodoLists,
  postTodo,
  postTodoList,
} from "./todoListThunks";

interface TodosStateType extends CommonResponseType {
  data?: TodoType[] | TodoType;
}

const todosInitialState: TodosStateType = {
  getTodoListStatus: "idle",
  postTodoListStatus: "idle",
};

const todosSlice = createSlice({
  name: "todos",
  initialState: todosInitialState,
  reducers: {
    setInitialState: () => todosInitialState,
  },
  extraReducers: (builder) => {
    builder
      // getTodoLists
      .addCase(getTodoLists.pending, (state) => {
        state.getTodoListStatus = "loading";
      })
      .addCase(getTodoLists.fulfilled, (state, action) => {
        state.getTodoListStatus = "succeeded";
        state.data = action.payload.sort(
          (a, b) => b.createdAt?.toMillis() - a.createdAt?.toMillis()
        );
      })
      .addCase(getTodoLists.rejected, (state, action) => {
        state.getTodoListStatus = "failed";
        state.error = action.error.message;
      })
      // postTodoList
      .addCase(postTodoList.pending, (state) => {
        state.postTodoListStatus = "loading";
      })
      .addCase(postTodoList.fulfilled, (state) => {
        state.postTodoListStatus = "succeeded";
      })
      .addCase(postTodoList.rejected, (state, action) => {
        state.postTodoListStatus = "failed";
        state.error = action.error.message;
      })
      // getSingleTodoList
      .addCase(getSingleTodoList.pending, (state) => {
        state.getTodoListStatus = "loading";
      })
      .addCase(getSingleTodoList.fulfilled, (state, action) => {
        state.getTodoListStatus = "succeeded";
        state.data = action.payload;
      })
      .addCase(getSingleTodoList.rejected, (state, action) => {
        state.getTodoListStatus = "failed";
        state.error = action.error.message;
      })
      // postTodo
      .addCase(postTodo.pending, (state) => {
        state.postTodoListStatus = "loading";
      })
      .addCase(postTodo.fulfilled, (state) => {
        state.postTodoListStatus = "succeeded";
      })
      .addCase(postTodo.rejected, (state, action) => {
        state.postTodoListStatus = "failed";
        state.error = action.error.message;
      });
  },
});

export const { setInitialState } = todosSlice.actions;
export const selectTodos = (state: RootState) => state.todos.data;

export default todosSlice.reducer;
