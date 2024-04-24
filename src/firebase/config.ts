import { initializeApp } from "firebase/app";


const firebaseConfig = {
   apiKey: "AIzaSyACSoZwts5MC8LLrDq9iEMVESKOah4Wgk4",
   authDomain: "nextjs-todo-14234.firebaseapp.com",
   projectId: "nextjs-todo-14234",
   storageBucket: "nextjs-todo-14234.appspot.com",
   messagingSenderId: "1004229858373",
   appId: "1:1004229858373:web:ac3f9429394daad548ff2c",
 };
 
const app = initializeApp(firebaseConfig)

export default app