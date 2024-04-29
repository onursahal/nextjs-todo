"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import TodoBoardCard from "./TodoBoardCard";
import TodoBoardCreateModal from "./TodoBoardCreateModal";

import { TodoType } from "@/store/types";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import {
  postTodoList,
  getTodoLists,
} from "@/store/slices/todos/todoListThunks";

const TodoBoard = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const todos = useAppSelector((state) => state.todos);

  const [openModal, setOpenModal] = useState(false);
  const [newTodos, setNewTodos] = useState({ title: "", desc: "" });

  const renderTodoBoardCards = () => {
    return (todos.data as TodoType[])?.map((item) => {
      return (
        <TodoBoardCard
          cardTitle={item.title}
          cardDesc={item?.desc}
          onClick={() => router.push(`/todo-list/${item.docId}`)}
        />
      );
    });
  };

  useEffect(() => {
    dispatch(getTodoLists());
  }, []);

  useEffect(() => {
    if (todos.postTodoListStatus === "succeeded") {
      dispatch(getTodoLists());
      setOpenModal(false);
    }
  }, [todos.postTodoListStatus]);

  if (todos.getTodoListStatus !== "succeeded") {
    return <div>loading... </div>;
  }

  return (
    <>
      <div className="text-2xl font-bold">TodoBoard</div>
      <div className="w-full border border-white my-5" />
      <div className="flex gap-4 flex-wrap">
        {renderTodoBoardCards()}
        <TodoBoardCard createButton onClick={() => setOpenModal(true)} />
      </div>
      <TodoBoardCreateModal
        onCancel={() => setOpenModal(false)}
        onCreate={() =>
          dispatch(postTodoList({ title: newTodos.title, desc: newTodos.desc }))
        }
        createLoading={todos.postTodoListStatus === "loading"}
        title={(val) => setNewTodos((prev) => ({ ...prev, title: val }))}
        desc={(val) => setNewTodos((prev) => ({ ...prev, desc: val }))}
        show={openModal}
      />
    </>
  );
};

export default TodoBoard;
