"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import TodoBoardCard from "./TodoBoardCard";
import TodoBoardCreateModal from "./TodoBoardCreateModal";

import { TodoListType } from "@/store/features/todos/todosTypes";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { getTodoLists } from "@/store/features/todos/getTodoLists";
import { postTodoList } from "@/store/features/todos/postTodoList";

const TodoBoard = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const postTodoListStatus = useAppSelector((state) => state.todos).postTodoList
    .status;
  const { data: getTodoListsData, status: getTodoListsStatus } = useAppSelector(
    (state) => state.todos.getTodoLists
  );

  const [openModal, setOpenModal] = useState(false);
  const [newTodos, setNewTodos] = useState({ title: "", desc: "" });

  const renderTodoBoardCards = () => {
    return getTodoListsData?.map?.((item) => {
      return (
        <TodoBoardCard
          key={item.docId}
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
    if (postTodoListStatus === "succeeded") {
      dispatch(getTodoLists());
      setOpenModal(false);
    }
  }, [postTodoListStatus]);

  if (getTodoListsStatus !== "succeeded") {
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
        createLoading={postTodoListStatus === "loading"}
        title={(val) => setNewTodos((prev) => ({ ...prev, title: val }))}
        desc={(val) => setNewTodos((prev) => ({ ...prev, desc: val }))}
        show={openModal}
      />
    </>
  );
};

export default TodoBoard;
