"use client";

import TodoListItem from "./TodoListItem";
import { CiCircleChevUp } from "react-icons/ci";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { TodoType } from "@/store/features/todos/todosTypes";
import { postTodo } from "@/store/features/todos/postTodo";
import { getSingleTodoList } from "@/store/features/todos/getSingleTodoList";
import { putTodo } from "@/store/features/todos/putTodo";

const TodoList = ({ params }: { params: { todoListId: string } }) => {
  const dispatch = useAppDispatch();
  const getSingleTodoListData = useAppSelector(
    (state) => state.todos.getSingleTodoList.data
  );
  const postTodoStatus = useAppSelector((state) => state.todos.postTodo.status);
  const putTodoStatus = useAppSelector((state) => state.todos.putTodo.status);

  const [todoInput, setTodoInput] = useState("");

  const renderTodoList = () => {
    return getSingleTodoListData?.todos?.map((item) => (
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

  const handleInputSubmitOnClick = () => {
    dispatch(postTodo({ docId: params.todoListId, todo: todoInput }));
  };

  useEffect(() => {
    dispatch(getSingleTodoList(params.todoListId));
  }, []);

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.keyCode === 13) {
        handleInputSubmitOnClick();
      }
    };

    document.addEventListener("keypress", handleKeyPress);

    return () => {
      document.removeEventListener("keypress", handleKeyPress);
    };
  }, [todoInput]);

  useEffect(() => {
    if (postTodoStatus === "succeeded") {
      dispatch(getSingleTodoList(params.todoListId));
      setTodoInput("");
    }
  }, [postTodoStatus]);

  useEffect(() => {
    if (putTodoStatus === "succeeded") {
      dispatch(getSingleTodoList(params.todoListId));
    }
  }, [putTodoStatus]);

  return (
    <div className="flex flex-col justify-between h-full">
      <div>
        <div className="text-2xl font-bold">{getSingleTodoListData?.title}</div>
        <div className="text-lg my-5">{getSingleTodoListData?.desc}</div>
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
        <button onClick={handleInputSubmitOnClick}>
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
