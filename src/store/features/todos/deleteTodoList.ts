import { db } from "@/firebase/fireStore";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { deleteDoc, doc } from "firebase/firestore";
import { singleTodoListInitialState } from "./todosConstants";

export const deleteTodoList = createAsyncThunk<void, { docId: string }>(
  "todos/deleteTodoList",
  async ({ docId }) => {
    try {
      await deleteDoc(doc(db, "todos", docId));
    } catch (error) {
      throw error;
    }
  }
);

const deleteTodoListSlice = createSlice({
  name: "deleteTodoList",
  initialState: singleTodoListInitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(deleteTodoList.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteTodoList.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(deleteTodoList.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default deleteTodoListSlice;
