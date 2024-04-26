import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { addDoc, collection, doc, getDocs, setDoc } from "firebase/firestore";
import { db } from "@/firebase/fireStore";
import { CommonResponseType, TodoType } from "../types";
import { RootState } from "../store";

export const fetchTodos = createAsyncThunk<
  TodoType[],
  void,
  { state: RootState }
>("todos/fetchTodos", async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "todos"));
    const data = querySnapshot.docs.map((doc) => doc.data()) as TodoType[];
    return data;
  } catch (error) {
    throw error;
  }
});

const emptyTodos: TodoType = {
  docId: "",
  title: "",
  todos: [],
};

export const postTodos = async ({
  title,
  desc,
}: {
  title: string;
  desc?: string;
}) => {
  try {
    const querySnapshot = await addDoc(collection(db, "todos"), {
      ...emptyTodos,
      title,
      desc,
    });
    try {
      return await setDoc(doc(db, "todos", querySnapshot.id), {
        ...emptyTodos,
        title,
        desc,
        docId: querySnapshot.id,
      });
    } catch (error) {
      throw error;
    }
  } catch (error) {
    throw error;
  }
};

interface TodosStateType extends CommonResponseType {
  data?: TodoType[];
}

const todosInitialState: TodosStateType = {
  data: [],
  status: "idle",
};

const todosSlice = createSlice({
  name: "todos",
  initialState: todosInitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload as TodoType[];
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const selectTodos = (state: RootState) => state.todos.data;

export default todosSlice.reducer;
