import { useState } from "react";
import Router from "next/router";

const Navbar = ({ email, photoURL, signOut }) => {
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleSignOut = () => {
    signOut();
    Router.push("/");
  };

  return (
    <nav className="bg-gray-800">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          <h2 className="text-white text-xl">Document Organizer</h2>
          <div className="ml-3 relative">
            <button
              className="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
              id="user-menu"
              aria-haspopup="true"
              onClick={() => setShowUserMenu(!showUserMenu)}
            >
              <img
                className="h-8 w-8 rounded-full"
                src={photoURL || "assets/images/user.png"}
                alt={`Photo of ${email}`}
              />
            </button>

            <div
              className={`${
                showUserMenu ? "block" : "hidden"
              } divide-y divide-gray-100 origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5`}
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="user-menu"
              onMouseOver={() => setShowUserMenu(true)}
              onMouseOut={() => setShowUserMenu(false)}
            >
              <div className="text-sm text-left px-4 py-2 text-gray-700">
                Signed in as {email}
              </div>
              <a
                className="block cursor-pointer px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                role="menuitem"
                onClick={handleSignOut}
              >
                Sign out
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
