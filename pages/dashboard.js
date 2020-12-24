import Navbar from "../components/navbar.component";
import Header from "../components/header.component";
import ItemList from "../components/itemlist.component";
import { useAuth } from "../utils/auth";

const Dashboard = () => {
  const { user, signout } = useAuth();
  let pageContent = null;

  if (user) {
    const { displayName, email, photoURL } = user;
    pageContent = (
      <>
        <Navbar email={email} photoURL={photoURL} signOut={signout} />
        <Header name={displayName} />
        {/* <ItemList items={documentList} /> */}
      </>
    );
  } else {
    pageContent = <h1>Loading...</h1>;
  }

  return pageContent;
};

export default Dashboard;
