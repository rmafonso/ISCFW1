import firebase from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBWwS_qZTNdiK6WJ4dMDpTJrTWm9IPmA68",
  authDomain: "data-base-5d66a.firebaseapp.com",
  databaseURL: "https://data-base-5d66a-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "data-base-5d66a",
  storageBucket: "data-base-5d66a.appspot.com",
  messagingSenderId: "222565124188",
  appId: "1:222565124188:web:8d8723602f00cd5a1cfe99",
  measurementId: "G-PB57QZFSDF"
};


//const analytics = getAnalytics(app);

//const db = firebase.firestore()

export const app = initializeApp(firebaseConfig);
export const database = getFirestore();

