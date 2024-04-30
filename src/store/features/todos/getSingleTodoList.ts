import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { TodoType } from "./todosTypes";
import { RootState } from "@/store/store";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase/fireStore";
import { singleTodoListInitialState } from "./todosConstants";

export const getSingleTodoList = createAsyncThunk<
  TodoType,
  string,
  { state: RootState }
>("todos/getSingleTodoList", async (docId: string) => {
  try {
    const querySnapshot = await getDoc(doc(db, "todos", docId));
    const data = querySnapshot.data() as TodoType;
    return data;
  } catch (error) {
    throw error;
  }
});

const getSingleTodoListSlice = createSlice({
  name: "getSingleTodoList",
  initialState: singleTodoListInitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // getSingleTodoList
      .addCase(getSingleTodoList.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getSingleTodoList.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(getSingleTodoList.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default getSingleTodoListSlice;
