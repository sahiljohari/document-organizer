import React from "react";
import { useAuth } from "../utils/auth";
import { UserContextProvider } from "../utils/userContext";

import Navbar from "../components/navbar.component";
import Header from "../components/header.component";
import DashboardPanel from "../components/dashboardpanel.component";

const Dashboard = () => {
  const { user, signout } = useAuth();

  if (!user) {
    return <h1>Loading...</h1>;
  }

  const { displayName, email, photoURL } = user;

  return (
    <UserContextProvider>
      <Navbar email={email} photoURL={photoURL} signOut={signout} />
      <Header name={displayName} />
      <DashboardPanel />
    </UserContextProvider>
  );
};

export default Dashboard;
