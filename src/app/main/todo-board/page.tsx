"use client";

import { signOut } from "@/firebase/auth";
import { useRouter } from "next/navigation";

const TodoBoard = () => {
  const router = useRouter();

  const signOutUser = async () => {
    const isSignedOut = await signOut();
    return isSignedOut ? router.push("/") : null;
  };
  return (
    <div>
      <div>TodoBoard</div>
      <button onClick={signOutUser}>Sign Out</button>
    </div>
  );
};

export default TodoBoard;
