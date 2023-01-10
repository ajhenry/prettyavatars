// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: xxxx-xxxx-xxxx-xxxx,
  authDomain: xxxx-xxxx-xxxx-xxxx,
  projectId: xxxx-xxxx-xxxx-xxxx,
  storageBucket: xxxx-xxxx-xxxx-xxxx,
  messagingSenderId: xxxx-xxxx-xxxx-xxxx,
  appId: xxxx-xxxx-xxxx-xxxx
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();