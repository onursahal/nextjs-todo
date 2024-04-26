"use client";

import { signOut } from "@/firebase/auth";
import { useRouter } from "next/navigation";
import TodoBoardCard from "./TodoBoardCard";

import { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { fetchTodos } from "@/store/slices/todosSlice";
import TodoBoardCreateModal from "./TodoBoardCreateModal";

const TodoBoard = () => {
  const router = useRouter();

  const dispatch = useAppDispatch();
  const todos = useAppSelector((state) => state.todos);
  const [openModal, setOpenModal] = useState(false);

  const renderTodoBoardCards = () => {
    return todos.data?.map((item) => {
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
    dispatch(fetchTodos());
  }, []);

  // const signOutUser = async () => {
  //   const isSignedOut = await signOut();
  //   return isSignedOut ? router.push("/") : null;
  // };
  if (todos.status !== "succeeded") {
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
        onCreate={() => null}
        show={openModal}
      />
      {/* <button onClick={signOutUser}>Sign Out</button> */}
    </>
  );
};

export default TodoBoard;
