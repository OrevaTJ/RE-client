// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-re.firebaseapp.com",
  projectId: "mern-re",
  storageBucket: "mern-re.appspot.com",
  messagingSenderId: "550581068002",
  appId: "1:550581068002:web:ffc2c02211d9b0f128febb"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);