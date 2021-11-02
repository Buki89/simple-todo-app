import { getAuth } from "@firebase/auth";
import { getDatabase } from "@firebase/database";
import { initializeApp } from "firebase/app";

export const firebaseConfig = {
  apiKey: "AIzaSyAv-B8p9YcRMK87ZO5MsiGY9kKHZUcxdTQ",
  authDomain: "simple-todo-app-6ff3b.firebaseapp.com",
  databaseURL:
    "https://simple-todo-app-6ff3b-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "simple-todo-app-6ff3b",
  storageBucket: "simple-todo-app-6ff3b.appspot.com",
  messagingSenderId: "495743332742",
  appId: "1:495743332742:web:ba07e1b173ae1344313c07",
  measurementId: "G-80T2MKMECR",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const db = getDatabase(app);

export { db, auth };
