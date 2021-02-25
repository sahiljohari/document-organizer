import { useAuth } from "../utils/auth";
import { DocumentContextProvider } from "../utils/documentContext";

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
    <DocumentContextProvider>
      <Navbar email={email} photoURL={photoURL} signOut={signout} />
      <Header name={displayName} />
      <DashboardPanel />
    </DocumentContextProvider>
  );
};

export default Dashboard;
