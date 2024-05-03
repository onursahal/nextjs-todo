import { RootState } from "@/store/store";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { emptyTodos, singleTodoListInitialState } from "./todosConstants";
import { db } from "@/firebase/fireStore";

export const postTodoList = createAsyncThunk<
  void,
  { title: string; desc: string },
  { state: RootState }
>("todos/postTodoList", async ({ title, desc }) => {
  try {
    const querySnapshot = await addDoc(collection(db, "todos"), {
      ...emptyTodos,
      title,
      desc,
      createdAt: new Date().valueOf(),
    });
    try {
      await updateDoc(doc(db, "todos", querySnapshot.id), {
        docId: querySnapshot.id,
      });
    } catch (error) {
      throw error;
    }
  } catch (error) {
    throw error;
  }
});

const postTodoListSlice = createSlice({
  name: "postTodoList",
  initialState: singleTodoListInitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // postTodoList
      .addCase(postTodoList.pending, (state) => {
        state.status = "loading";
      })
      .addCase(postTodoList.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(postTodoList.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default postTodoListSlice;
