// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCNM52RJur1_WAJm9ITfoxQ6PrSyS3RR3s",
  authDomain: "employees-c75eb.firebaseapp.com",
  projectId: "employees-c75eb",
  storageBucket: "employees-c75eb.appspot.com",
  messagingSenderId: "774416468576",
  appId: "1:774416468576:web:f6c97ad9bcb9553f019105"
};

// Initialize Firebase
const appFirebase = initializeApp(firebaseConfig);

export default appFirebase;