// pages/_app.js
import '../css/signin.css';  // Adjust the path if necessary
import '../css/dashboard.css';  // Adjust the path if necessary
import '../css/style.css';  // Adjust the path if necessary
import '../app/globals.css';  // Adjust the path if necessar
function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;
