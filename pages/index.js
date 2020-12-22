import Link from "next/link";
import Hero from "../components/hero.component";
import styles from "../styles/Home.module.css";

const Home = () => (
  <div className={styles.container}>
    <Hero />
    <Link href="/auth">
      <button>Get Started</button>
    </Link>
  </div>
);

export default Home;
