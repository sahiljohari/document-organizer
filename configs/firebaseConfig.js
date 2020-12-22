import firebase from "firebase/app";
import "firebase/auth";
import "firebase/analytics";

const config = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_PUBLIC_API_KEY,
  authDomain: "document-tracker-323d3.firebaseapp.com",
  projectId: "document-tracker-323d3",
  storageBucket: "document-tracker-323d3.appspot.com",
  messagingSenderId: "123949569144",
  appId: "1:123949569144:web:9abfa159371a05f58e898d",
  measurementId: "G-785YF4G76C",
};

export default function initFirebase() {
  if (!firebase.apps.length) {
    firebase.initializeApp(config);
  }
}
