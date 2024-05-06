"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import TodoBoardCard from "./TodoBoardCard";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { getTodoLists } from "@/store/features/todos/getTodoLists";
import { postTodoList } from "@/store/features/todos/postTodoList";
import TodoBoardModal from "./TodoBoardCreateModal/TodoBoardModal";
import { putTodoList } from "@/store/features/todos/putTodoList";
import TodoDeleteModal from "./TodoDeleteModal/TodoDeleteModal";
import { deleteTodoList } from "@/store/features/todos/deleteTodoList";

const TodoBoard = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const postTodoListStatus = useAppSelector(
    (state) => state.todos.postTodoList.status
  );
  const { status: putTodoListStatus, error: putTodoListError } = useAppSelector(
    (state) => state.todos.putTodoList
  );

  const { status: deleteTodoListStatus } = useAppSelector(
    (state) => state.todos.deleteTodoList
  );

  const { data: getTodoListsData, status: getTodoListsStatus } = useAppSelector(
    (state) => state.todos.getTodoLists
  );

  const [currentModal, setCurrentModal] = useState<
    "edit" | "create" | "delete" | ""
  >("");
  const [newTodos, setNewTodos] = useState({ title: "", desc: "" });
  const [selectedTodoList, setSelectedTodoList] = useState<{
    title: string;
    desc?: string;
    docId: string;
  }>({
    title: "",
    desc: "",
    docId: "",
  });
  const modalPropsByType = {
    create: {
      onCancel: () => setCurrentModal(""),
      onAction: () =>
        dispatch(postTodoList({ title: newTodos.title, desc: newTodos.desc })),
      actionLoading: postTodoListStatus === "loading",
      titleOnChange: (val: string) =>
        setNewTodos((prev) => ({ ...prev, title: val })),
      descOnChange: (val: string) =>
        setNewTodos((prev) => ({ ...prev, desc: val })),
      modalTitle: "Create a todo list",
      show: currentModal === "create",
      actionButtonText: "Create",
    },
    edit: {
      onCancel: () => setCurrentModal(""),
      onAction: () => dispatch(putTodoList({ ...selectedTodoList })),

      actionLoading: putTodoListStatus === "loading",
      titleOnChange: (val: string) =>
        setNewTodos((prev) => ({ ...prev, title: val })),
      descOnChange: (val: string) =>
        setNewTodos((prev) => ({ ...prev, desc: val })),
      modalTitle: "Update a todo list",
      show: currentModal === "edit",
      actionButtonText: "Update",
      titleDefaultVal: getTodoListsData?.find(
        (item) => item.docId === selectedTodoList.docId
      )?.title,
      descDefaultVal: getTodoListsData?.find(
        (item) => item.docId === selectedTodoList.docId
      )?.desc,
    },
  };

  const renderTodoBoardCards = () => {
    return getTodoListsData?.map?.((item) => {
      return (
        <TodoBoardCard
          key={item.docId}
          cardTitle={item.title}
          cardDesc={item?.desc}
          onClick={() => router.push(`/todo-list/${item.docId}`)}
          editOnClick={() => {
            setSelectedTodoList({
              title: item.title,
              desc: item?.desc,
              docId: item.docId,
            });
            setCurrentModal("edit");
          }}
          deleteOnClick={() => {
            setSelectedTodoList({
              title: item.title,
              docId: item.docId,
            });
            setCurrentModal("delete");
          }}
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
      setCurrentModal("");
    }
  }, [postTodoListStatus]);

  useEffect(() => {
    if (putTodoListStatus === "succeeded") {
      dispatch(getTodoLists());
      setCurrentModal("");
    }
  }, [putTodoListStatus]);

  useEffect(() => {
    if (deleteTodoListStatus === "succeeded") {
      dispatch(getTodoLists());
      setCurrentModal("");
    }
  }, [deleteTodoListStatus]);

  if (getTodoListsStatus !== "succeeded") {
    return <div>loading... </div>;
  }

  return (
    <>
      <div className="text-2xl font-bold">TodoBoard</div>
      <div className="w-full border border-white my-5" />
      <div className="flex gap-4 flex-wrap">
        {renderTodoBoardCards()}
        <TodoBoardCard createButton onClick={() => setCurrentModal("create")} />
      </div>
      {(currentModal === "edit" || currentModal === "create") && (
        <TodoBoardModal {...modalPropsByType[currentModal]} />
      )}
      {currentModal === "delete" && (
        <TodoDeleteModal
          todoListTitle={selectedTodoList.title}
          show={currentModal === "delete"}
          deleteOnClick={() =>
            dispatch(deleteTodoList({ docId: selectedTodoList.docId }))
          }
          loading={deleteTodoListStatus === "loading"}
          cancelOnClick={() => setCurrentModal("")}
        />
      )}
    </>
  );
};

export default TodoBoard;
