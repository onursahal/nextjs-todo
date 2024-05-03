import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "@/store/store";
import { TodoListType, TodoType } from "./todosTypes";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase/fireStore";
import { singleTodoListInitialState } from "./todosConstants";

export const putTodo = createAsyncThunk<
  void,
  { docId: string; todo?: string; done?: boolean; id: string },
  { state: RootState }
>("todos/putTodo", async ({ docId, todo, done, id }, { getState }) => {
  try {
    const currentTodoList = getState().todos.getSingleTodoList
      .data as TodoListType;

    const newTodos: TodoType[] = currentTodoList?.todos.reduce(
      (acc: TodoType[], item) => {
        const arr = acc;
        if (item.id === id) {
          const newObj = {
            ...item,
            ...(!!todo && { todo }),
            ...(done !== undefined && { done }),
          };
          arr.push(newObj);
        } else {
          arr.push(item);
        }

        return arr;
      },
      []
    );
    console.log("newTodos", newTodos);

    await updateDoc(doc(db, "todos", docId), {
      todos: newTodos,
    });
  } catch (error) {
    throw error;
  }
});

const putTodoSlice = createSlice({
  name: "putTodo",
  initialState: singleTodoListInitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // putTodo
      .addCase(putTodo.pending, (state) => {
        state.status = "loading";
      })
      .addCase(putTodo.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(putTodo.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default putTodoSlice;
