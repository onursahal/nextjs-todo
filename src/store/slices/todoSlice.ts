import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CommonResponseType, TodoType } from "../types";
import { RootState } from "../store";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase/fireStore";

export const fetchTodo = createAsyncThunk<
  TodoType,
  string,
  { state: RootState }
>("todo/fetchTodo", async (docId: string) => {
  try {
    const querySnapshot = await getDoc(doc(db, "todos", docId));
    const data = querySnapshot.data() as TodoType;
    return data;
  } catch (error) {
    throw error;
  }
});

interface TodoStateType extends CommonResponseType {
  data: TodoType | null;
}

const todoInitialState: TodoStateType = {
  data: null,
  status: "idle",
};

const todoSlice = createSlice({
  name: "todo",
  initialState: todoInitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodo.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTodo.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload as TodoType;
      })
      .addCase(fetchTodo.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const selectTodo = (state: RootState) => state.todo;

export default todoSlice.reducer;
