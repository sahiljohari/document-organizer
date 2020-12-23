import "tailwindcss/tailwind.css";
import Head from "next/head";
import { ProvideAuth } from "../utils/auth";

const MyApp = ({ Component, pageProps }) => (
  <>
    <Head>
      <title>Document Organizer App</title>
      <link rel="icon" href="/favicon.ico" />
      <link rel="preconnect" href="https://fonts.gstatic.com" />
      <link
        href="https://fonts.googleapis.com/css2?family=Barlow:wght@100;200;300;400;500;600;700&display=swap"
        rel="stylesheet"
      />
    </Head>
    <ProvideAuth>
      <Component {...pageProps} />
    </ProvideAuth>
  </>
);

export default MyApp;
