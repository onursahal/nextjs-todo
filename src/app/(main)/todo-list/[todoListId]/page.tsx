"use client";

import { todoListMock } from "@/mock/todos.mock";
import TodoListItem from "./TodoListItem";
import { FaRegArrowAltCircleUp } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchTodo } from "@/store/slices/todoSlice";
const TodoList = ({ params }: { params: { todoListId: string } }) => {
  const dispatch = useAppDispatch();
  const todoList = useAppSelector((state) => state.todo);

  const [todoInput, setTodoInput] = useState("");

  const renderTodoList = () => {
    return todoList.data?.todos.map((item) => (
      <TodoListItem
        todo={item.todo}
        editTodo={() => null}
        deleteTodo={() => null}
        done={item.done}
      />
    ));
  };

  useEffect(() => {
    dispatch(fetchTodo(params.todoListId));
  }, []);

  return (
    <div className="flex flex-col justify-between h-full">
      <div>
        <div className="text-2xl font-bold">{todoList.data?.title}</div>
        <div className="text-lg my-5">{todoList.data?.desc}</div>
        <div className="w-full border border-white my-5" />
        <div className="flex flex-col gap-4">{renderTodoList()}</div>
      </div>
      <div className="flex relative">
        <input
          className="w-full bg-transparent border border-white rounded-md text-lg px-4 py-2"
          placeholder="Start writing your todo and smash the enter key..."
          onChange={(e) => setTodoInput(e.target.value)}
        />
        <button>
          <FaRegArrowAltCircleUp
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
