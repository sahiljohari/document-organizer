import Hero from "../components/hero.component";
import SignIn from "../components/signin.component";

const Home = () => (
  <div className="flex flex-col items-center mt-8 h-screen w-full">
    <Hero />
    <SignIn />
  </div>
);

export default Home;
