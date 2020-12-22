import Link from "next/link";
import Hero from "../components/hero.component";

const Home = () => (
  <div className="flex flex-col items-center mt-8 h-screen w-full">
    <Hero />
    <Link href="/auth">
      <button className="flex items-center justify-center rounded-md border border-gray-300 px-3 py-2 hover:bg-black hover:text-white">
        Get Started
      </button>
    </Link>
  </div>
);

export default Home;
