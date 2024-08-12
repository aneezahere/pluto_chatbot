import { useState } from "react";
import { getAuth, signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "../lib/firebase";  // Ensure this path is correct

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
    <div className="sign-in-page" style={{ 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center', 
      height: '100vh', 
      background: 'linear-gradient(145deg, #121212, #1e1e1e)' 
    }}>
      <div className="container" style={{ 
        background: '#212121', 
        padding: '20px', 
        borderRadius: '10px', 
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.4)' 
      }}>
        <h1 style={{ color: '#fff', textAlign: 'center', marginBottom: '20px' }}>Welcome to Pluto</h1>
        <p style={{ color: '#bbb', textAlign: 'center', marginBottom: '20px' }}>Your financial literacy companion.</p>
        <form onSubmit={handleEmailSignIn} style={{ marginBottom: '20px' }}>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{
              width: '100%',
              padding: '10px',
              margin: '10px 0',
              borderRadius: '5px',
              border: 'none',
              background: '#333',
              color: '#fff'
            }}
          />
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{
              width: '100%',
              padding: '10px',
              margin: '10px 0',
              borderRadius: '5px',
              border: 'none',
              background: '#333',
              color: '#fff'
            }}
          />
          <button 
            type="submit" 
            style={{
              width: '100%',
              padding: '10px',
              background: 'linear-gradient(145deg, #121212, #1e1e1e)', 
              color: '#fff',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}>
            Sign In
          </button>
        </form>
        <button 
          type="button" 
          className="google-signin" 
          onClick={handleGoogleSignIn}
          style={{
            width: '100%',
            padding: '10px',
            background: 'linear-gradient (145deg, #121212, #1e1e1e)',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}>
          Sign in with Google
        </button>
      </div>
    </div>
  );
}
