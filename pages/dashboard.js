import { useAuthState } from "react-firebase-hooks/auth";
import firebase from "firebase/app";
import Router from "next/router";
import Navbar from "../components/navbar.component";
import Header from "../components/header.component";

const auth = firebase.auth();

const logout = () => {
  auth.signOut();
  Router.push("/");
};

const Dashboard = () => {
  const [user] = useAuthState(auth);
  const { displayName, email, photoURL, uid } = user;

  // List of documents with props: uid
  return (
    <>
      <Navbar email={email} photoURL={photoURL} signOut={logout} />
      <Header name={displayName} />
    </>
  );
};

export default Dashboard;
