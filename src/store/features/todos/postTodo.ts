import { db } from "@/firebase/fireStore";
import { RootState } from "@/store/store";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { singleTodoListInitialState } from "./todosConstants";

export const postTodo = createAsyncThunk<
  void,
  { docId: string; todo: string | null | undefined },
  { state: RootState }
>("todos/postTodo", async ({ docId, todo }) => {
  try {
    await updateDoc(doc(db, "todos", docId), {
      todos: arrayUnion({
        id: crypto.randomUUID(),
        createdAt: new Date().valueOf(),
        todo,
        done: false,
      }),
    });
  } catch (error) {
    throw error;
  }
});

const postTodoSlice = createSlice({
  name: "postTodo",
  initialState: singleTodoListInitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // postTodo
      .addCase(postTodo.pending, (state) => {
        state.status = "loading";
      })
      .addCase(postTodo.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(postTodo.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default postTodoSlice;
