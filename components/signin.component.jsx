import Router from "next/router";
import { useState } from "react";
import { useAuth } from "../utils/auth";
import { useForm } from "react-hook-form";
import FormInput from "./common/forminput.component";

const SignIn = () => {
  const [isAuthorizing, setIsAuthorizing] = useState(false);
  const { handleSubmit, register } = useForm();
  const { signin, signinWithGoogle } = useAuth();

  const handleAuth = async () => {
    setIsAuthorizing(true);

    try {
      const user = await signinWithGoogle();

      if (!user) {
        throw new Error("Login failed...");
      }

      Router.push("/dashboard");
    } catch (err) {
      console.error(err);
    }

    setIsAuthorizing(false);
  };

  const handleAuthWithCreds = async (creds) => {
    setIsAuthorizing(true);
    const { email, password } = creds;
    try {
      const user = await signin(email, password);
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
    <div className="mt-8 mx-2 w-full">
      <h2 className="mb-4 text-lg">Let's get you in!</h2>
      <form
        onSubmit={handleSubmit(handleAuthWithCreds)}
        className="flex flex-col mt-2 w-full"
      >
        <FormInput
          classNames="mb-3 focus:border-light-blue-500 focus:ring-1 focus:ring-light-blue-500 focus:outline-none w-full text-sm text-black placeholder-gray-500 border border-gray-200 rounded-md py-2 pl-2"
          label="Email"
          name="email"
          type="email"
          placeholder="johndoe@site.com"
          ref={register({ required: true })}
        />

        <FormInput
          classNames="mb-3 focus:border-light-blue-500 focus:ring-1 focus:ring-light-blue-500 focus:outline-none w-full text-sm text-black placeholder-gray-500 border border-gray-200 rounded-md py-2 pl-2"
          label="Password"
          name="password"
          type="password"
          ref={register({ min: 8, max: 12, required: true })}
        />

        <input
          type="submit"
          value="Sign In"
          className="flex items-center justify-center my-3 rounded-md border border-gray-300 px-3 py-2 bg-white hover:bg-black hover:text-white duration-200"
        />
      </form>
      <button
        disabled={isAuthorizing}
        onClick={handleAuth}
        className="flex items-center justify-center rounded-md border border-gray-300 px-3 py-2 mt-4 bg-red-600 text-white font-semibold hover:bg-white hover:text-red-600 duration-200 w-full"
      >
        Sign In With Google
      </button>
    </div>
  );
};

export default SignIn;
