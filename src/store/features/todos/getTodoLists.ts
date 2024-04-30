import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { TodoType } from "./todosTypes";
import { RootState } from "@/store/store";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase/fireStore";
import { todoListsInitialState } from "./todosConstants";

export const getTodoLists = createAsyncThunk<
  TodoType[],
  void,
  { state: RootState }
>("todos/getTodoLists", async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "todos"));
    const data = querySnapshot.docs.map((doc) => doc.data()) as TodoType[];
    return data;
  } catch (error) {
    throw error;
  }
});

const getTodoListsSlice = createSlice({
  name: "getTodoLists",
  initialState: todoListsInitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // getTodoLists
      .addCase(getTodoLists.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getTodoLists.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload.sort(
          (a, b) => b.createdAt?.toMillis() - a.createdAt?.toMillis()
        );
      })
      .addCase(getTodoLists.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default getTodoListsSlice;
