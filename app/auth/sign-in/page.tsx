"use client";

import { FaFacebook, FaGoogle, FaTwitter } from "react-icons/fa";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { ChangeEvent, useState } from "react";

const SignIn = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const auth = getAuth({
  apiKey: "AIzaSyACSoZwts5MC8LLrDq9iEMVESKOah4Wgk4",
  authDomain: "nextjs-todo-14234.firebaseapp.com",
  projectId: "nextjs-todo-14234",
  storageBucket: "nextjs-todo-14234.appspot.com",
  messagingSenderId: "1004229858373",
  appId: "1:1004229858373:web:ac3f9429394daad548ff2c",
});

  const signIn = () => {
    signInWithEmailAndPassword(auth, user.email, user.password)
      .then((userCredential) => {
        const responseUser = userCredential.user;
        console.log(console.log(responseUser));
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  };
  const handleUserState = (e: ChangeEvent<HTMLInputElement>, type: string) => {
    setUser((prev) => ({
      ...prev,
      [type]: e?.target.value,
    }));
  };

  return (
    <div className="h-screen w-screen flex place-items-center justify-center ">
      <div className="w-80  border-white border rounded-md flex-row space-y-7 p-4">
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
        <button
          className="w-full bg-white text-black rounded-sm p-2"
          onClick={() => signIn()}
        >
          Log in
        </button>
        <button className="flex place-items-center justify-center">
          <div className="w-10 border border-white h-0 mr-4" /> Or Continue With
          <div className="w-10 border border-white h-0 ml-4" />
        </button>
        <div className="flex justify-center space-x-5">
          <button>
            <FaGoogle size={32} />
          </button>
          <button>
            <FaFacebook size={32} />
          </button>
          <button>
            <FaTwitter size={32} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
