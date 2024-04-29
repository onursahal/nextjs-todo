import { configureStore } from "@reduxjs/toolkit";
import todosReducer from "./slices/todos/todoListSlice";
import todoReducer from "./slices/todoSlice";

export const makeStore = () =>
  configureStore({
    reducer: {
      todos: todosReducer,
      todo: todoReducer,
      //  user: userReducer,
    },
  });

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
