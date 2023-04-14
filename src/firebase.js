// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// //import { getAnalytics } from "firebase/analytics";
// import { getAuth } from "firebase/auth";
// import { getStorage } from "firebase/storage";
// import { getFirestore } from "firebase/firestore";
// import { getDatabase } from "firebase/database";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyDDvG0-b9bETo00bjdJC1RWe5AdXOsoDrU",
//   authDomain: "instagram-b1477.firebaseapp.com",
//   projectId: "instagram-b1477",
//   storageBucket: "instagram-b1477.appspot.com",
//   messagingSenderId: "622461824882",
//   appId: "1:622461824882:web:b0240d3a6c4623e03037eb",
//   measurementId: "G-YE2EG0XWZ5"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);

// const auth = getAuth();
// const storage = getStorage();
// const db = getFirestore(app)

// export {app,auth,storage,db}

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

// const firebaseConfig = {
//   apiKey: process.env.REACT_APP_FIREBASE_KEY,
//   authDomain: "chat-ab746.firebaseapp.com",
//   projectId: "chat-ab746",
//   storageBucket: "chat-ab746.appspot.com",
//   messagingSenderId: "901216368405",
//   appId: "1:901216368405:web:8ec942ee51611df5c49b1c",
// };
const firebaseConfig = {
  apiKey: "AIzaSyDDvG0-b9bETo00bjdJC1RWe5AdXOsoDrU",
  authDomain: "instagram-b1477.firebaseapp.com",
  projectId: "instagram-b1477",
  storageBucket: "instagram-b1477.appspot.com",
  messagingSenderId: "622461824882",
  appId: "1:622461824882:web:b0240d3a6c4623e03037eb",
  measurementId: "G-YE2EG0XWZ5"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore()
