import { useAuth } from "../utils/auth";
import { useForm } from "react-hook-form";
import FormInput from "./common/forminput.component";
import Router from "next/router";

const SignUp = () => {
  const { signup, createUserProfileDocument } = useAuth();
  const { register, handleSubmit } = useForm();
  const onSubmit = async (data) => {
    const { displayName, email, password, confirmPassword } = data;

    if (password !== confirmPassword) {
      // error message should be shown here
      return;
    }

    try {
      const user = await signup(email, password);
      await createUserProfileDocument(user, { displayName });

      Router.push("/dashboard");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="mt-8">
      <h2 className="mb-4 text-lg">Don't have an account yet? Sign Up here!</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col mt-2 w-full"
      >
        <FormInput
          classNames="mb-3 focus:border-light-blue-500 focus:ring-1 focus:ring-light-blue-500 focus:outline-none w-full text-sm text-black placeholder-gray-500 border border-gray-200 rounded-md py-2 pl-2"
          label="Display Name"
          name="displayName"
          placeholder="Ex. John Doe"
          ref={register({ required: true, maxLength: 50 })}
        />

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

        <FormInput
          classNames="mb-3 focus:border-light-blue-500 focus:ring-1 focus:ring-light-blue-500 focus:outline-none w-full text-sm text-black placeholder-gray-500 border border-gray-200 rounded-md py-2 pl-2"
          label="Confirm Password"
          name="confirmPassword"
          type="password"
          ref={register({ min: 8, max: 12, required: true })}
        />

        <input
          type="submit"
          className="flex items-center justify-center mt-4 rounded-md border border-gray-300 px-3 py-2 bg-white hover:bg-black hover:text-white"
        />
      </form>
    </div>
  );
};

export default SignUp;
