import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC4b5pEyx_4i92iw6ZAerZn9heao3cusSw",
  authDomain: "coderhouse-react-57765.firebaseapp.com",
  projectId: "coderhouse-react-57765",
  storageBucket: "coderhouse-react-57765.appspot.com",
  messagingSenderId: "291622794999",
  appId: "1:291622794999:web:de5561c220837481bbc5f2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)