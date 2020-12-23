import Router from "next/router";
import { useState } from "react";
import { useAuth } from "../utils/auth";

const SignIn = () => {
  const [isAuthorizing, setIsAuthorizing] = useState(false);
  const auth = useAuth();

  const handleAuth = async () => {
    setIsAuthorizing(true);

    try {
      const user = await auth.signinWithGoogle();

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
