import { configureStore } from "@reduxjs/toolkit";
import todosReducer from "./slices/todos/todoListSlice";

export const makeStore = () =>
  configureStore({
    reducer: {
      todos: todosReducer,
      //  user: userReducer,
    },
  });

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
