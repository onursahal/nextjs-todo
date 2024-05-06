import { db } from "@/firebase/fireStore";
import { RootState } from "@/store/store";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { doc, setDoc, updateDoc } from "firebase/firestore";
import { TodoListType } from "./todosTypes";
import { singleTodoListInitialState } from "./todosConstants";

export const putTodoList = createAsyncThunk<
  void,
  { docId: string; title?: string; desc?: string },
  { state: RootState }
>("todos/putTodoList", async ({ docId, title, desc }, { getState }) => {
  try {
    console.log({ title, desc, docId });
    const currentTodoLists = getState().todos.getTodoLists.data;
    const docWillBeUpdated = {
      ...currentTodoLists?.find((item) => item.docId === docId),
      ...(!!title && { title }),
      ...(!!desc && { desc }),
    };

    await setDoc(doc(db, "todos", docId), { ...docWillBeUpdated });
  } catch (error) {
    throw error;
  }
});

const putTodoListSlice = createSlice({
  name: "putTodoList",
  initialState: singleTodoListInitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(putTodoList.pending, (state) => {
        state.status = "loading";
      })
      .addCase(putTodoList.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(putTodoList.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default putTodoListSlice;
