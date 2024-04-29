import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { CommonResponseType, TodoType } from "../../types";
import { RootState } from "../../store";
import {
  getSingleTodoList,
  getTodoLists,
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
  reducers: {},
  extraReducers: (builder) => {
    builder
      // getTodoLists
      .addCase(getTodoLists.pending, (state) => {
        state.getTodoListStatus = "loading";
      })
      .addCase(getTodoLists.fulfilled, (state, action) => {
        state.getTodoListStatus = "succeeded";
        state.data = action.payload;
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
      });
  },
});

export const selectTodos = (state: RootState) => state.todos.data;

export default todosSlice.reducer;
