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

      Router.push("/dashboard");
    } catch (err) {
      console.error(err);
    }

    setIsAuthorizing(false);
  };

  return (
    <button
      disabled={isAuthorizing}
      onClick={handleAuth}
      className="flex items-center justify-center rounded-md border border-gray-300 px-3 py-2 hover:bg-black hover:text-white"
    >
      Get Started
    </button>
  );
};

export default SignIn;
