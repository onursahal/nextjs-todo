import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
} from "firebase/auth";
import app from "./config";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

const auth = getAuth(app);

export const signIn = async (user: { email: string; password: string }) => {
  await signInWithEmailAndPassword(auth, user.email, user.password)
    .then((userCredential) => {
      const responseUser = userCredential.user;

      console.log(console.log(responseUser));
      return responseUser;
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;

      return { errorCode, errorMessage };
    });
};

export const signUp = async (user: {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
}) => {
  createUserWithEmailAndPassword(auth, user.email, user.password)
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      const message = error.message;
      const code = error.code;

      console.log({ code, message });
    });
};

export const signOut = async (): Promise<boolean> => {
  return firebaseSignOut(auth)
    .then(() => {
      return true;
    })
    .catch((error) => {
      const message = error.message;
      const code = error.code;

      console.log({ code, message });
      return false;
    });
};

export const checkUser = (router: AppRouterInstance) => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/auth.user
      router.push("/todo-board");

      // ...
    } else {
      // User is signed out

      router.push("/sign-in");
      // ...
    }
  });
};
