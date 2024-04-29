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
  putTodo,
} from "@/store/slices/todos/todoListThunks";
import { setInitialState } from "@/store/slices/todos/todoListSlice";

const TodoBoard = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const todoLists = useAppSelector((state) => state.todos);
  const todoListsData = todoLists?.data as TodoType[] | undefined;

  const [openModal, setOpenModal] = useState(false);
  const [newTodos, setNewTodos] = useState({ title: "", desc: "" });

  const renderTodoBoardCards = () => {
    return todoListsData?.map?.((item) => {
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

    // Todo: Check why this method not working correctly.
    // return () => {
    //   dispatch(setInitialState());
    // };
  }, []);

  useEffect(() => {
    if (todoLists.postTodoListStatus === "succeeded") {
      dispatch(getTodoLists());
      setOpenModal(false);
    }
  }, [todoLists.postTodoListStatus]);

  if (todoLists.getTodoListStatus !== "succeeded") {
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
        onCancel={() => {
          setOpenModal(false);
        }}
        onCreate={() =>
          dispatch(postTodoList({ title: newTodos.title, desc: newTodos.desc }))
        }
        createLoading={todoLists.postTodoListStatus === "loading"}
        title={(val) => setNewTodos((prev) => ({ ...prev, title: val }))}
        desc={(val) => setNewTodos((prev) => ({ ...prev, desc: val }))}
        show={openModal}
      />
    </>
  );
};

export default TodoBoard;
