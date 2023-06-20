import { initializeApp } from "firebase/app";
import { getAuth, indexedDBLocalPersistence } from "firebase/auth";
import { firebaseConfig } from "./firebaseConfig";

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

auth.setPersistence(indexedDBLocalPersistence);
