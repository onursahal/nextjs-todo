"use client";

import { ChangeEvent, useState } from "react";
import { Loader } from "@/components";
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
      <div id="sign-in-title" className="text-2xl">
        Sign-in
        <div className="w-1/2 border border-white mt-1" />
      </div>
      <div>
        <div>Full Name</div>
        <input
          id="sign-up-full-name"
          className="w-full text-lg bg-transparent border-white border rounded-sm p-2"
          placeholder="Enter your full name"
          onChange={(val) => handleUserState(val, "fullName")}
        />
      </div>
      <div>
        <div>Email</div>
        <input
          id="sign-up-email"
          className="w-full text-lg bg-transparent border-white border rounded-sm p-2"
          placeholder="Enter your email"
          type="email"
          onChange={(val) => handleUserState(val, "email")}
        />
      </div>
      <div>
        <div>Password</div>
        <input
          id="sign-up-password"
          className="w-full text-lg bg-transparent border-white border rounded-sm p-2"
          placeholder="Create a password"
          type="password"
          onChange={(val) => handleUserState(val, "password")}
        />
      </div>
      <div>
        <div>Confirm Password</div>
        <input
          id="sign-up-confirm-password"
          className="w-full text-lg bg-transparent border-white border rounded-sm p-2"
          placeholder="Confirm your password"
          type="password"
          onChange={(val) => handleUserState(val, "confirmPassword")}
        />
      </div>
      <button
        className="w-full bg-white text-black rounded-sm p-2"
        onClick={signUpUser}
      >
        {loading ? <Loader /> : "Sign Up"}
      </button>
    </>
  );
};

export default SignUp;
