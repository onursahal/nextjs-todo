"use client";

import { ChangeEvent, useState } from "react";
import { Button, Loader } from "@/components";
import { signUp } from "@/firebase/auth";

const SignUp = () => {
  const [user, setUser] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);

  const handleUserState = (
    event: ChangeEvent<HTMLInputElement>,
    type: string
  ) => {
    setUser((prev) => ({
      ...prev,
      [type]: event.target.value,
    }));
  };

  const signUpUser = async () => {
    setLoading(true);
    await signUp(user);
    setLoading(false);
  };

  return (
    <>
      <div id="sign-in-title" className="text-xl text-white">
        Create an account
      </div>
      <div className="space-y-2">
        <div className="text-white text-sm">Full Name</div>
        <input
          id="sign-up-full-name"
          className="w-full text-sm text-white placeholder-gray-300 bg-transparent border-white border rounded-md p-2"
          placeholder="Enter your full name"
          onChange={(val) => handleUserState(val, "fullName")}
        />
      </div>
      <div className="space-y-2">
        <div className="text-white text-sm">Email</div>
        <input
          id="sign-up-email"
          className="w-full text-sm text-white placeholder-gray-300 bg-transparent border-white border rounded-md p-2"
          placeholder="Enter your email"
          type="email"
          onChange={(val) => handleUserState(val, "email")}
        />
      </div>
      <div className="space-y-2">
        <div className="text-white text-sm">Password</div>
        <input
          id="sign-up-password"
          className="w-full text-sm text-white placeholder-gray-300 bg-transparent border-white border rounded-md p-2"
          placeholder="Create a password"
          type="password"
          onChange={(val) => handleUserState(val, "password")}
        />
      </div>
      <div className="space-y-2">
        <div className="text-white text-sm">Confirm Password</div>
        <input
          id="sign-up-confirm-password"
          className="w-full text-sm text-white placeholder-gray-300 bg-transparent border-white border rounded-md p-2"
          placeholder="Confirm your password"
          type="password"
          onChange={(val) => handleUserState(val, "confirmPassword")}
        />
      </div>
      <Button
        intent="primary"
        className="w-full !mt-8 text-sm"
        onClick={signUpUser}
      >
        {loading ? <Loader /> : "Sign Up"}
      </Button>
    </>
  );
};

export default SignUp;
