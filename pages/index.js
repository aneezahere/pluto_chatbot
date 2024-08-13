import { useState } from "react";
import { getAuth, signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "../lib/firebase"; // Ensure this path is correct
import Meteors from "@/components/magicui/meteors";
export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleGoogleSignIn = async () => {
    const auth = getAuth(app);
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log('User signed in with Google: ', user);
      window.location.href = "/dashboard";
    } catch (error) {
      console.error('Error during Google sign-in: ', error);
    }
  };

  const handleEmailSignIn = async (e) => {
    e.preventDefault();
    const auth = getAuth(app);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log('User signed in with email: ', user);
      window.location.href = "/dashboard";
    } catch (error) {
      console.error('Error during email sign-in: ', error);
    }
  };

  return (
    <>
     

     <Meteors number={30} />
      <div className="sign-in-page">
        <div className="container">
          <h1 className="text-lg font-bold">Welcome to Pluto</h1>
          <p className="pb-2">Your financial literacy companion.</p>
          <form onSubmit={handleEmailSignIn}>
            <input
              type="email"
              placeholder="Enter your email"
              className="input-style"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              className="input-style"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit" className="py-3 text-white" >
              Sign In
            </button>
          </form>
          <button 
            type="button"
            className="google-signin py-3 text-white"
            onClick={handleGoogleSignIn}>
            Sign in with Google
          </button>
        </div>
      </div>
    </>
  );
}