import { useEffect } from "react";
import { useAuth } from "../utils/auth";
import { useDocumentState } from "../utils/documentContext";

import Navbar from "../components/navbar.component";
import Header from "../components/header.component";
import DashboardPanel from "../components/dashboardpanel.component";

const Dashboard = () => {
  const { user, signout } = useAuth();
  const { setUserDocuments } = useDocumentState();

  useEffect(() => {
    if (user) setUserDocuments(user.documents);
  }, [user]);

  if (!user) {
    return <h1>Loading...</h1>;
  }

  const { displayName, email, photoURL } = user;

  return (
    <>
      <Navbar email={email} photoURL={photoURL} signOut={signout} />
      <Header name={displayName} />
      <DashboardPanel />
    </>
  );
};

export default Dashboard;
