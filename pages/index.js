import Hero from "../components/hero.component";
import SignIn from "../components/signin.component";
import SignUp from "../components/signup.component";

const Home = () => (
  <div className="flex flex-col items-center mt-8 h-screen w-full">
    <Hero />
    <div className="flex flex-row place-content-between w-1/2">
      <SignIn />
      <SignUp />
    </div>
  </div>
);

export default Home;
