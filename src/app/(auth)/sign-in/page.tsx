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
      <div id="sign-in-title" className="text-2xl">
        Sign-in
        <div className="w-1/2 border border-white mt-1" />
      </div>
      <div>
        <div>Email / Username</div>
        <input
          id="sign-in-email"
          className="w-full text-lg bg-transparent border-white border rounded-sm p-2"
          placeholder="alankay@email.com"
          type="email"
          onChange={(val) => handleUserState(val, "email")}
        />
      </div>
      <div>
        <div>Password</div>
        <input
          id="sign-in-password"
          className="w-full text-lg bg-transparent border-white border rounded-sm p-2"
          placeholder="********"
          type="password"
          onChange={(val) => handleUserState(val, "password")}
        />
      </div>
      <Button intent={"primary"} className="w-full" onClick={signInUser}>
        {loading ? <Loader /> : "Log in"}
      </Button>
      <div className="flex place-items-center justify-center self-center">
        <div className="w-10 border border-white h-0 mr-4" /> Or Continue With
        <div className="w-10 border border-white h-0 ml-4" />
      </div>
      <div className="flex justify-center space-x-5">
        <Button>
          <FaGoogle size={32} />
        </Button>
        <Button>
          <FaFacebook size={32} />
        </Button>
        <Button>
          <FaTwitter size={32} />
        </Button>
      </div>
      <div className="">
        Don't have an account yet?{" "}
        <Link href="/sign-up" className="font-bold">
          Sign Up now
        </Link>
      </div>
    </>
  );
};

export default SignIn;
