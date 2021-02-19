import Navbar from "../components/navbar.component";
import Header from "../components/header.component";
import ItemList from "../components/itemlist.component";
import { useAuth } from "../utils/auth";

const Dashboard = () => {
  const { user, signout } = useAuth();
  let pageContent = null;

  if (user) {
    const {
      displayName,
      email,
      photoURL,
      documents: { count, list },
    } = user;
    pageContent = (
      <>
        <Navbar email={email} photoURL={photoURL} signOut={signout} />
        <Header name={displayName} documentsUploaded={count} badDocuments={1} />
        {count > 0 ? (
          <ItemList items={list} />
        ) : (
          <p className="text-center my-20 text-2xl font-bold opacity-30">
            It's been sooooo quiet here...
          </p>
        )}
      </>
    );
  } else {
    pageContent = <h1>Loading...</h1>;
  }

  return pageContent;
};

export default Dashboard;
