/* eslint-disable @next/next/no-sync-scripts */
import { useEffect, useState } from "react";
import Script from 'next/script';

export default function Dashboard() {
  const [lottieLoaded, setLottieLoaded] = useState(false);

  useEffect(() => {
    setLottieLoaded(true);
  }, []);

  return (
    <div
      className="dashboard-container"
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        height: '100vh',
        background: 'linear-gradient(to right, #232526, #414345)',
      }}
    >
      {/* Chatbot on one side */}
      <div id="chatbot" style={{ flex: 1 }}>
        {/* Chatbot will render here */}
      </div>

      {/* Lottie Animation on the other side */}
      <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        {lottieLoaded && (
          <dotlottie-player
            src="https://lottie.host/45ee9b08-15c2-494a-b217-2dd787cd2cfc/NM0g4rGM5b.json"
            background="transparent"
            speed="1"
            style={{ width: "600px", height: "600px", transform: "translateX(-200px)" }}
            loop
            autoplay
          />
        )}
      </div>

      {/* Chatbot script */}
      <Script
        src="https://www.chatbase.co/embed.min.js"
        strategy="afterInteractive"
        data-chatbotId="sTwT15j1ts_lw1PfeP78l"
        data-domain="www.chatbase.co"
      />

      {/* Lottie Player script */}
      <Script
        src="https://unpkg.com/@dotlottie/player-component@latest/dist/dotlottie-player.mjs"
        type="module"
        strategy="afterInteractive"
        onLoad={() => setLottieLoaded(true)}
      />
    </div>
  );
}