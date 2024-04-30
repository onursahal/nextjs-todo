import { db } from "@/firebase/fireStore";
import { RootState } from "@/store/store";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Timestamp, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { singleTodoListInitialState } from "./todosConstants";

export const postTodo = createAsyncThunk<
  string,
  { docId: string; todo: string },
  { state: RootState }
>("todos/postTodo", async ({ docId, todo }) => {
  try {
    await updateDoc(doc(db, "todos", docId), {
      todos: arrayUnion({
        id: crypto.randomUUID(),
        createdAt: Timestamp.now(),
        todo,
        done: false,
      }),
    });
    return "todo added to document which is given id";
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
