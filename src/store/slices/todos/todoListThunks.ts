import { db } from "@/firebase/fireStore";
import { RootState } from "@/store/store";
import { TodoType } from "@/store/types";
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
} from "firebase/firestore";

const emptyTodos: TodoType = {
  docId: "",
  todos: [],
  title: "",
  desc: "",
};

export const postTodoList = createAsyncThunk<
  string,
  { title: string; desc: string },
  { state: RootState }
>("todos/postTodos", async ({ title, desc }) => {
  try {
    const querySnapshot = await addDoc(collection(db, "todos"), {
      ...emptyTodos,
      title,
      desc,
    });
    try {
      setDoc(doc(db, "todos", querySnapshot.id), {
        ...emptyTodos,
        title,
        desc,
        docId: querySnapshot.id,
      });
      return "set doc operation successfull";
    } catch (error) {
      throw error;
    }
  } catch (error) {
    throw error;
  }
});

export const getTodoLists = createAsyncThunk<
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

export const getSingleTodoList = createAsyncThunk<
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
