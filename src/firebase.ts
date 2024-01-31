import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD9Ho_hzgUDOUkt8ndMvJLOLf32XurhTSk",
  authDomain: "nwitter-reloaded-8c3a5.firebaseapp.com",
  projectId: "nwitter-reloaded-8c3a5",
  storageBucket: "nwitter-reloaded-8c3a5.appspot.com",
  messagingSenderId: "1000480424293",
  appId: "1:1000480424293:web:f45ca807f1a7bd81a9a18c"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
