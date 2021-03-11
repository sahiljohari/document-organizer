import { useState } from "react";
import { useAuth } from "../utils/auth";
import { useForm } from "react-hook-form";
import { useToasts } from "react-toast-notifications";
import FormInput from "./common/forminput.component";
import ValidationMessage from "./common/validationmessage.component";
import Router from "next/router";
import Link from "next/link";

const SignUp = () => {
  const { signup, createUserProfileDocument } = useAuth();
  const { register, handleSubmit, errors } = useForm();
  const { addToast } = useToasts();
  const [passwordError, setPasswordError] = useState(false);
  const [isSigningUp, setIsSigningUp] = useState(false);

  const onSubmit = async (data) => {
    const { displayName, email, password, confirmPassword } = data;

    if (password !== confirmPassword) {
      setPasswordError(true);
      return;
    }
    setIsSigningUp(true);
    try {
      const user = await signup(email, password);
      await createUserProfileDocument(user, { displayName });

      Router.push("/dashboard");
    } catch (error) {
      addToast(error.message, {
        appearance: "error",
      });
    }
    setIsSigningUp(false);
  };

  return (
    <>
      <div className="mt-6 w-96">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col mt-2 w-full"
        >
          <FormInput
            classNames="mb-3 focus:border-gray-800 focus:ring-1 focus:ring-gray-800 focus:outline-none w-full text-sm text-black placeholder-gray-500 border border-gray-400 rounded-md py-2 pl-2"
            label="Display Name"
            name="displayName"
            placeholder="Ex. John Doe"
            ref={register({ required: true, minLength: 5, maxLength: 50 })}
          />
          {errors.displayName && errors.displayName.type === "required" && (
            <ValidationMessage>This field is required</ValidationMessage>
          )}
          {errors.displayName && errors.displayName.type === "minLength" && (
            <ValidationMessage>
              Display Name should have minimum 5 characters
            </ValidationMessage>
          )}
          {errors.displayName && errors.displayName.type === "maxLength" && (
            <ValidationMessage>
              Display Name cannot exceed 50 characters
            </ValidationMessage>
          )}

          <FormInput
            classNames="mb-3 focus:border-gray-800 focus:ring-1 focus:ring-gray-800 focus:outline-none w-full text-sm text-black placeholder-gray-500 border border-gray-400 rounded-md py-2 pl-2"
            label="Email"
            name="email"
            type="email"
            placeholder="johndoe@site.com"
            ref={register({ required: true })}
            autoComplete="off"
          />
          {errors.email && (
            <ValidationMessage>This field is required</ValidationMessage>
          )}

          <FormInput
            classNames="mb-3 focus:border-gray-800 focus:ring-1 focus:ring-gray-800 focus:outline-none w-full text-sm text-black placeholder-gray-500 border border-gray-400 rounded-md py-2 pl-2"
            label="Password"
            name="password"
            type="password"
            ref={register({ minLength: 8, maxLength: 12, required: true })}
            autoComplete="off"
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

          <FormInput
            classNames="mb-3 focus:border-gray-800 focus:ring-1 focus:ring-gray-800 focus:outline-none w-full text-sm text-black placeholder-gray-500 border border-gray-400 rounded-md py-2 pl-2"
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            ref={register({ required: true })}
            onChange={() => setPasswordError(false)}
          />
          {errors.confirmPassword &&
            errors.confirmPassword.type === "required" && (
              <ValidationMessage>This field is required</ValidationMessage>
            )}
          {passwordError && (
            <ValidationMessage>Passwords do not match</ValidationMessage>
          )}

          <input
            type="submit"
            value={isSigningUp ? "Signing you up..." : "Sign Up"}
            disabled={isSigningUp}
            className="flex items-center justify-center mt-4 rounded-md border px-3 py-2 bg-gray-800 text-white font-semibold hover:bg-white hover:text-gray-800 hover:border-gray-800 duration-200"
          />
        </form>
      </div>
      <div className="mt-8">
        <span className="mx-2 font-semibold">Already have an account?</span>
        <Link href="/">
          <a className="mt-8">Sign in here &#10141;</a>
        </Link>
      </div>
    </>
  );
};

export default SignUp;
