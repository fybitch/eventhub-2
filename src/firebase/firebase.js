
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDdPWaune2ftqk24RFIZX2IJEMKWJTrI8Y",
  authDomain: "event-hub-63f46.firebaseapp.com",
  projectId: "event-hub-63f46",
  storageBucket: "event-hub-63f46.appspot.com",
  messagingSenderId: "213261807113",
  appId: "1:213261807113:web:a42033d1e3149873cc52d8",
  measurementId: "G-K7DGTQ5T32"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);

export { app, auth, firestore, storage };