import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBcVqF09z8OpH-1C6MXe70hVE3-6nSQ4qE",
  authDomain: "ihm-health.firebaseapp.com",
  projectId: "ihm-health",
  storageBucket: "ihm-health.appspot.com",
  messagingSenderId: "1021400228336",
  appId: "1:1021400228336:web:09d751d7f9e100b2ddfd35",
  measurementId: "G-XPK3BTYFHV",
};

initializeApp(firebaseConfig);
const storage = getStorage();
export default storage;
