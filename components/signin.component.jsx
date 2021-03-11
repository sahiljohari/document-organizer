import Router from "next/router";
import Link from "next/link";
import { useState } from "react";
import { useAuth } from "../utils/auth";
import { useForm } from "react-hook-form";
import { useToasts } from "react-toast-notifications";
import FormInput from "./common/forminput.component";
import ValidationMessage from "./common/validationmessage.component";

const SignIn = () => {
  const [isAuthorizing, setIsAuthorizing] = useState(false);
  const { handleSubmit, register, errors } = useForm();
  const { signin, signinWithGoogle } = useAuth();
  const { addToast } = useToasts();

  const handleAuth = async () => {
    setIsAuthorizing(true);

    try {
      const user = await signinWithGoogle();

      if (!user) {
        addToast("Login failed! Please try again...", {
          appearance: "error",
          autoDismiss: true,
        });
      }

      Router.push("/dashboard");
    } catch (error) {
      addToast(error.message, {
        appearance: "error",
      });
    }

    setIsAuthorizing(false);
  };

  const handleAuthWithCreds = async (creds) => {
    setIsAuthorizing(true);
    const { email, password } = creds;
    try {
      const user = await signin(email, password);
      if (!user) {
        addToast("Login failed! Please try again...", {
          appearance: "error",
          autoDismiss: true,
        });
      }

      Router.push("/dashboard");
    } catch (error) {
      addToast(error.message, {
        appearance: "error",
      });
    }

    setIsAuthorizing(false);
  };

  return (
    <>
      <div className="mt-6 w-96">
        <form
          onSubmit={handleSubmit(handleAuthWithCreds)}
          className="flex flex-col mt-2 w-full"
        >
          <FormInput
            classNames="mb-4 focus:border-gray-800 focus:ring-1 focus:ring-gray-800 focus:outline-none w-full text-sm text-black placeholder-gray-500 border border-gray-400 rounded-md py-2 pl-2"
            label="Email"
            name="email"
            type="email"
            placeholder="johndoe@site.com"
            ref={register({ required: true })}
          />
          {errors.email && (
            <ValidationMessage>This field is required</ValidationMessage>
          )}

          <FormInput
            classNames="mb-4 focus:border-gray-800 focus:ring-1 focus:ring-gray-800 focus:outline-none w-full text-sm text-black placeholder-gray-500 border border-gray-400 rounded-md py-2 pl-2"
            label="Password"
            name="password"
            type="password"
            ref={register({ minLength: 8, maxLength: 12, required: true })}
          />
          {errors.password && errors.password.type === "required" && (
            <ValidationMessage>This field is required</ValidationMessage>
          )}
          {errors.password && errors.password.type === "minLength" && (
            <ValidationMessage>
              Password should have minimum 8 characters
            </ValidationMessage>
          )}
          {errors.password && errors.password.type === "maxLength" && (
            <ValidationMessage>
              Password cannot exceed 12 characters
            </ValidationMessage>
          )}

          <input
            type="submit"
            value={isAuthorizing ? "Signing in..." : "Sign In"}
            disabled={isAuthorizing}
            className="flex items-center justify-center mt-4 rounded-md border px-3 py-2 bg-gray-800 text-white font-semibold hover:bg-white hover:text-gray-800 hover:border-gray-800 duration-200"
          />
        </form>
        <button
          disabled={isAuthorizing}
          onClick={handleAuth}
          className="flex items-center justify-center rounded-md border border-gray-300 px-3 py-2 mt-2 bg-red-600 text-white font-semibold hover:bg-white hover:text-red-600 duration-200 w-full"
        >
          Sign In With Google
        </button>
      </div>
      <div className="mt-8">
        <span className="mx-2 font-semibold">New to ExpiryMinder?</span>
        <Link href="/signup">
          <a className="mt-8">Create an account &#10141;</a>
        </Link>
      </div>
    </>
  );
};

export default SignIn;
