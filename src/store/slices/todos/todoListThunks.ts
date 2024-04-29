import { db } from "@/firebase/fireStore";
import { RootState } from "@/store/store";
import { TodoType } from "@/store/types";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { Timestamp, arrayUnion, updateDoc } from "firebase/firestore";
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
  createdAt: Timestamp.now(),
};

export const postTodoList = createAsyncThunk<
  string,
  { title: string; desc: string },
  { state: RootState }
>("todos/postTodoList", async ({ title, desc }) => {
  try {
    const querySnapshot = await addDoc(collection(db, "todos"), {
      ...emptyTodos,
      title,
      desc,
      createdAt: Timestamp.now(),
    });
    try {
      await updateDoc(doc(db, "todos", querySnapshot.id), {
        docId: querySnapshot.id,
      });
      return "todo list added to collection.";
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
>("todos/getTodoLists", async () => {
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
>("todos/getSingleTodoList", async (docId: string) => {
  try {
    const querySnapshot = await getDoc(doc(db, "todos", docId));
    const data = querySnapshot.data() as TodoType;
    return data;
  } catch (error) {
    throw error;
  }
});

export const postTodo = createAsyncThunk<
  string,
  { docId: string; todo: string },
  { state: RootState }
>("todos/postTodo", async ({ docId, todo }) => {
  try {
    await updateDoc(doc(db, "todos", docId), {
      todos: arrayUnion({
        id: "123",
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
