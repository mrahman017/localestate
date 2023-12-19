// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDwZCzQ3rijLWwskal-YDCab5rCBPDCp9Y",
  authDomain: "easy-estate-cc288.firebaseapp.com",
  projectId: "easy-estate-cc288",
  storageBucket: "easy-estate-cc288.appspot.com",
  messagingSenderId: "652476930750",
  appId: "1:652476930750:web:ee61563efbb37867d15cef",
  measurementId: "G-F9B8KMNVPE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

