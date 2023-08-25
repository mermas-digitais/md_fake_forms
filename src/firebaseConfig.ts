import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import * as firestore from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBvitbFzx7hl7WGy-zpu1A0ERxYed6uRko",
  authDomain: "md-fake-forms.firebaseapp.com",
  projectId: "md-fake-forms",
  storageBucket: "md-fake-forms.appspot.com",
  messagingSenderId: "178536236675",
  appId: "1:178536236675:web:0b1f8b0ad987f9569dbdb6",
};

// Initialize Firebase
console.log("Firebase initialized");
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export { firestore };
