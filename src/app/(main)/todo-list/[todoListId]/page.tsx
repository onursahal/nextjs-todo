"use client";

import { todoListMock } from "@/mock/todos.mock";
import TodoListItem from "./TodoListItem";

const TodoList = ({ params }: { params: { todoListId: string } }) => {
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
    <>
      <div className="text-2xl font-bold">{todoListResponse.title}</div>
      <div className="text-lg my-5">{todoListMock.desc}</div>
      <div className="w-full border border-white my-5" />
      <div className="flex flex-col gap-4">{renderTodoList()}</div>
    </>
  );
};

export default TodoList;
