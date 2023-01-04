import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from "firebase/auth"
const firebaseConfig = {
  apiKey: "AIzaSyDERnZ48i9T0UQy4V44regYX-dw4yh567Y",
  authDomain: "clone-f1b45.firebaseapp.com",
  projectId: "clone-f1b45",
  storageBucket: "clone-f1b45.appspot.com",
  messagingSenderId: "332737882175",
  appId: "1:332737882175:web:f56c29c701d687f08fb08a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const provider = new GoogleAuthProvider();
export default app;