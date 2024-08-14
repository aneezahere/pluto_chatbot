// pages/_app.js
import Head from 'next/head';
import '../css/signin.css';  // Adjust the path if necessary
import '../css/dashboard.css';  // Adjust the path if necessary
import '../css/style.css';  // Adjust the path if necessary
import '../app/globals.css';  // Adjust the path if necessary

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name="description" content="Pluto.ai - An AI built by Aneeza Shakeel and Ali Hamza" />
        <meta property="og:title" content="Pluto.ai" />
        <meta property="og:description" content="An AI built by Aneeza Shakeel and Ali Hamza" />
        <meta property="og:image" content="https://pluto-chatbotai.vercel.app//images/pluto.webp" />
        <meta property="og:image:alt" content="Preview of Pluto.ai" />
        <meta property="og:image:type" content="image/jpeg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <title>Pluto.ai</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
