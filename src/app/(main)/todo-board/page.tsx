"use client";

import { signOut } from "@/firebase/auth";
import { useRouter } from "next/navigation";
import TodoBoardCard from "./TodoBoardCard";
import { todoListsMock } from "@/mock/todos.mock";

const TodoBoard = () => {
  const router = useRouter();
  const response = todoListsMock;

  const signOutUser = async () => {
    const isSignedOut = await signOut();
    return isSignedOut ? router.push("/") : null;
  };

  const renderTodoBoardCards = () => {
    return response.map((item) => {
      return (
        <TodoBoardCard
          cardTitle={item.title}
          cardDesc={item?.desc}
          onClick={() => router.push(`/todo-list/${item.id}`)}
        />
      );
    });
  };
  return (
    <>
      <div className="text-2xl font-bold">TodoBoard</div>
      <div className="w-full border border-white my-5" />
      <div className="flex gap-4 flex-wrap">{renderTodoBoardCards()}</div>
      {/* <button onClick={signOutUser}>Sign Out</button> */}
    </>
  );
};

export default TodoBoard;
