import { useEffect } from "react";
import { getAuth } from "firebase/auth";
import { auth } from '../lib/firebase';  // Import directly from your Firebase file

export default function Dashboard() {
  useEffect(() => {
    // Chatbot script integration
    const script = document.createElement("script");
    script.src = "https://www.chatbase.co/embed.min.js";
    script.defer = true;
    script.setAttribute("chatbotId", "sTwT15j1ts_lw1PfeP78l");
    script.setAttribute("domain", "www.chatbase.co");
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div 
      className="dashboard-container" 
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        height: '100vh', // Make sure the container takes up the full height of the viewport
        background: 'linear-gradient(to right, #232526, #414345)', // This is the previous gradient
      }}
    >
      {/* Chatbot on one side */}
      <div id="chatbot" style={{ flex: 1 }}>
        {/* Chatbot will render here */}
      </div>
      
      {/* Lottie Animation on the other side */}
      <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <script src="https://unpkg.com/@dotlottie/player-component@latest/dist/dotlottie-player.mjs" type="module"></script>
        <dotlottie-player 
          src="https://lottie.host/45ee9b08-15c2-494a-b217-2dd787cd2cfc/NM0g4rGM5b.json"
          background="transparent" 
          speed="1" 
          style={{ width: "600px", height: "600px", transform: "translateX(-200px)" }} 
          loop 
          autoplay>
        </dotlottie-player>
      </div>
    </div>
  );
}
