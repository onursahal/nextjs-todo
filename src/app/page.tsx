"use client";

import { checkUser } from "@/firebase/auth";
import { useRouter } from "next/navigation";
import { useLayoutEffect } from "react";

const Home = () => {
  const router = useRouter();
  useLayoutEffect(() => {
    checkUser(router);
  }, []);

  // return redirect("/auth/sign-in");
};

export default Home;
