"use client";

import { todoListMock } from "@/mock/todos.mock";
import TodoListItem from "./TodoListItem";
import { FaRegArrowAltCircleUp } from "react-icons/fa";
import { useState } from "react";

const TodoList = ({ params }: { params: { todoListId: string } }) => {
  const [todoInput, setTodoInput] = useState("");
  const todoListResponse = todoListMock;

  const renderTodoList = () => {
    return todoListResponse.todos.map((item) => (
      <TodoListItem
        todo={item.todo}
        editTodo={() => null}
        deleteTodo={() => null}
      />
    ));
  };

  return (
    <div className="flex flex-col justify-between h-full">
      <div>
        <div className="text-2xl font-bold">{todoListResponse.title}</div>
        <div className="text-lg my-5">{todoListMock.desc}</div>
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
