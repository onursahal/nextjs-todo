import { db } from "@/firebase/fireStore";
import { RootState } from "@/store/store";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { doc, updateDoc } from "firebase/firestore";
import { singleTodoListInitialState } from "./todosConstants";

export const deleteTodo = createAsyncThunk<
  void,
  { docId: string; id: string },
  { state: RootState }
>("todos/deleteTodo", async ({ docId, id }, { getState }) => {
  try {
    const currentTodoList = getState().todos.getSingleTodoList.data?.todos;
    const newTodos = currentTodoList?.filter((item) => item.id !== id);

    await updateDoc(doc(db, "todos", docId), { todos: newTodos });
  } catch (error) {
    throw error;
  }
});

const deleteTodoSlice = createSlice({
  name: "deleteTodo",
  initialState: singleTodoListInitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(deleteTodo.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteTodo.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(deleteTodo.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default deleteTodoSlice;
