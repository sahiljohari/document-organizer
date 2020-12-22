import firebase from "firebase/app";
import "firebase/auth";
import "firebase/analytics";
import initFirebase from "../configs/firebaseConfig";
import Router from "next/router";
import { useState } from "react";

initFirebase();

const provider = new firebase.auth.GoogleAuthProvider();

const SignIn = () => {
  const [isAuthorizing, setIsAuthorizing] = useState(false);

  const handleAuth = async () => {
    setIsAuthorizing(true);

    try {
      const results = await firebase.auth().signInWithPopup(provider);
      const { user } = results;

      if (!user) {
        throw new Error("Login failed...");
      }

      Router.push("/");
    } catch (err) {
      console.error(err);
    }

    setIsAuthorizing(false);
  };

  return (
    <button disabled={isAuthorizing} onClick={handleAuth}>
      Sign In with Google
    </button>
  );
};

export default SignIn;
