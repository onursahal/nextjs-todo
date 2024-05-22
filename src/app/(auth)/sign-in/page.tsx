"use client";

import Link from "next/link";
import { FaFacebook, FaGoogle, FaTwitter } from "react-icons/fa";
import { ChangeEvent, FC, useState } from "react";
import { Button, Loader } from "@/components";
import { signIn } from "@/firebase/auth";

const SignIn: FC<{}> = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const signInUser = async () => {
    setLoading(true);
    await signIn(user);
    setLoading(false);
  };

  const handleUserState = (e: ChangeEvent<HTMLInputElement>, type: string) => {
    setUser((prev) => ({
      ...prev,
      [type]: e?.target.value,
    }));
  };

  return (
    <>
      <div id="sign-in-title" className="text-xl text-white">
        Sign in
      </div>
      <div className="space-y-2">
        <div className="text-white text-sm">Email / Username</div>
        <input
          id="sign-in-email"
          className="w-full text-sm text-white placeholder-gray-300 bg-transparent border-white border rounded-md p-2"
          placeholder="alankay@email.com"
          type="email"
          onChange={(val) => handleUserState(val, "email")}
        />
      </div>
      <div className="space-y-2">
        <div className="text-white text-sm">Password</div>
        <input
          id="sign-in-password"
          className="w-full text-sm text-white placeholder-gray-300 bg-transparent border-white border rounded-md p-2"
          placeholder="********"
          type="password"
          onChange={(val) => handleUserState(val, "password")}
        />
      </div>
      <Button intent={"primary"} className="w-full !mt-8" onClick={signInUser}>
        {loading ? <Loader /> : "Log in"}
      </Button>
      <div className="flex place-items-center justify-center self-center text-white text-sm">Or Continue With</div>
      <div className="flex justify-center space-x-2">
        <Button intent="transparent">
          <FaGoogle size={32} />
        </Button>
        <Button intent="transparent">
          <FaFacebook size={32} />
        </Button>
        <Button intent="transparent">
          <FaTwitter size={32} />
        </Button>
      </div>
      <div className="text-white text-sm">
        Don't have an account yet?{" "}
        <Link href="/sign-up" className="font-bold">
          Sign Up now
        </Link>
      </div>
    </>
  );
};

export default SignIn;
