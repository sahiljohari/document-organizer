import React, { useState, useEffect, useContext, createContext } from "react";
import firebase from "firebase/app";
import "firebase/auth";
import config from "../configs/firebaseConfig";

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
const authContext = createContext();

export function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => {
  return useContext(authContext);
};

function useProvideAuth() {
  const [user, setUser] = useState(null);

  const signin = async (email, password) => {
    const response = await firebase
      .auth()
      .signInWithEmailAndPassword(email, password);
    setUser(response.user);
    return response.user;
  };

  const signinWithGoogle = async () => {
    const { user } = await firebase.auth().signInWithPopup(googleAuthProvider);
    setUser(user);
    return user;
  };

  const signup = async (email, password) => {
    const response = await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password);
    setUser(response.user);
    return response.user;
  };

  const signout = async () => {
    await firebase.auth().signOut();
    setUser(null);
  };

  const sendPasswordResetEmail = async (email) => {
    await firebase.auth().sendPasswordResetEmail(email);
    return true;
  };

  const confirmPasswordReset = async (password, code) => {
    const resetCode = code || getFromQueryString("oobCode");

    await firebase.auth().confirmPasswordReset(resetCode, password);
    return true;
  };

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return {
    user: user,
    signin,
    signinWithGoogle,
    signup,
    signout,
    sendPasswordResetEmail,
    confirmPasswordReset,
  };
}
