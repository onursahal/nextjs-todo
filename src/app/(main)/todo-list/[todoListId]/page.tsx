"use client";

import TodoListItem from "./TodoListItem";
import { CiCircleChevUp } from "react-icons/ci";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { TodoType } from "@/store/types";
import {
  getSingleTodoList,
  postTodo,
  putTodo,
} from "@/store/slices/todos/todoListThunks";

const TodoList = ({ params }: { params: { todoListId: string } }) => {
  const dispatch = useAppDispatch();
  const todoList = useAppSelector((state) => state.todos);
  const todoListData = todoList.data as TodoType;

  const [todoInput, setTodoInput] = useState("");

  const renderTodoList = () => {
    return todoListData?.todos?.map((item) => (
      <TodoListItem
        todo={item.todo}
        editTodo={() => null}
        deleteTodo={() => null}
        doneTodo={() =>
          dispatch(
            putTodo({ docId: params.todoListId, done: !item.done, id: item.id })
          )
        }
        done={item.done}
      />
    ));
  };

  const handleOnClick = () => {
    dispatch(postTodo({ docId: params.todoListId, todo: todoInput }));
  };

  useEffect(() => {
    dispatch(getSingleTodoList(params.todoListId));
  }, []);

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.keyCode === 13) {
        handleOnClick();
      }
    };

    document.addEventListener("keypress", handleKeyPress);

    return () => {
      // Todo: Check why this method not working correctly.
      //   dispatch(setInitialState());
      document.removeEventListener("keypress", handleKeyPress);
    };
  }, [todoInput]);

  useEffect(() => {
    if (todoList.postTodoListStatus === "succeeded") {
      dispatch(getSingleTodoList(params.todoListId));
      setTodoInput("");
    }
  }, [todoList.postTodoListStatus]);

  return (
    <div className="flex flex-col justify-between h-full">
      <div>
        <div className="text-2xl font-bold">{todoListData?.title}</div>
        <div className="text-lg my-5">{todoListData?.desc}</div>
        <div className="w-full border border-white my-5" />
        <div className="flex flex-col gap-4 h-[86%] overflow-y-auto">
          {renderTodoList()}
        </div>
      </div>
      <div className="flex relative">
        <input
          className="w-full bg-transparent border border-white rounded-md text-lg px-4 py-2"
          placeholder="Start writing your todo and smash the enter key..."
          value={todoInput}
          onChange={(e) => setTodoInput(e.target.value)}
        />
        <button onClick={handleOnClick}>
          <CiCircleChevUp
            size={24}
            className={`absolute right-3 top-3 ${
              todoInput ? "text-white" : "text-gray-500"
            }`}
          />
        </button>
      </div>
    </div>
  );
};

export default TodoList;
