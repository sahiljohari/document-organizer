import { useState, useEffect, useContext, createContext } from "react";
import { useToasts } from "react-toast-notifications";
import { useRouter } from "next/router";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import config from "../configs/firebaseConfig";

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
googleAuthProvider.setCustomParameters({ prompt: "select_account" });

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
  const { addToast } = useToasts();
  const router = useRouter();

  const signin = async (email, password) => {
    const response = await firebase
      .auth()
      .signInWithEmailAndPassword(email, password);
    return response.user;
  };

  const signinWithGoogle = async () => {
    const { user } = await firebase.auth().signInWithPopup(googleAuthProvider);
    return user;
  };

  const signup = async (email, password) => {
    const response = await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password);
    return response.user;
  };

  const signout = async () => {
    await firebase.auth().signOut();
  };

  const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;

    const userRef = firebase.firestore().doc(`users/${userAuth.uid}`);
    const snapShot = await userRef.get();

    if (!snapShot.exists) {
      const { displayName, email, photoURL } = userAuth;
      const createdAt = new Date();
      const documents = { count: 0, list: [] };

      try {
        await userRef.set({
          displayName,
          email,
          photoURL,
          createdAt,
          documents,
          ...additionalData,
        });
      } catch (error) {
        console.error("Error creating user", error.message);

        addToast("Something went wrong. Please try again...", {
          appearance: "error",
        });
      }
    }

    return userRef;
  };

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(async (user) => {
      if (user) {
        const userRef = await createUserProfileDocument(user);
        userRef.onSnapshot((snapShot) => {
          setUser({
            id: snapShot.id,
            ...snapShot.data(),
          });
        });
      } else {
        setUser(null);
        if (router.pathname === "/dashboard") {
          router.push("/");
        }
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
    createUserProfileDocument,
  };
}

export { firebase };
