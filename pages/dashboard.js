import { useState, useEffect } from "react";
import Script from 'next/script';

export default function Dashboard() {
  const [prompt, setPrompt] = useState("");
  const [conversation, setConversation] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [lottieLoaded, setLottieLoaded] = useState(false);

  useEffect(() => {
    const handleEnterPress = (event) => {
      if (event.key === "Enter") {
        handleChatSubmit();
      }
    };

    window.addEventListener("keydown", handleEnterPress);
    return () => {
      window.removeEventListener("keydown", handleEnterPress);
    };
  }, [prompt]);

  const handleChatSubmit = async () => {
    if (!prompt.trim()) return;

    const userMessage = { sender: "user", text: prompt };
    setConversation((prev) => [...prev, userMessage]);
    setPrompt("");
    setIsTyping(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      });

      const data = await res.json();
      setIsTyping(false);
      const aiMessage = { sender: "ai", text: data.text };
      setConversation((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error("Error fetching generated text:", error);
      setIsTyping(false);
      setConversation((prev) => [...prev, { sender: "ai", text: "Something went wrong. Please try again." }]);
    }
  };

  return (
    <div
      className="dashboard-container"
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '100vh',
        background: 'linear-gradient(to right, #232526, #414345)',
        padding: '20px',
        boxSizing: 'border-box',
      }}
    >
      {/* Lottie Animation on the Left Side */}
      <div style={{ flex: 1, textAlign: 'center' }}>
        {lottieLoaded && (
          <dotlottie-player
            src="https://lottie.host/45ee9b08-15c2-494a-b217-2dd787cd2cfc/NM0g4rGM5b.json"
            background="transparent"
            speed="1"
            style={{ width: "400px", height: "400px" }}
            loop
            autoplay
          />
        )}
      </div>

      {/* Chat Interface on the Right Side */}
      <div style={{ flex: 2, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
        <div
          style={{
            flexGrow: 1,
            overflowY: 'auto',
            padding: '15px',
            color: '#fff',
            width: '100%',
            boxSizing: 'border-box',
          }}
        >
          {conversation.map((msg, index) => (
            <div
              key={index}
              style={{
                display: 'flex',
                justifyContent: msg.sender === "user" ? 'flex-end' : 'flex-start',
                marginBottom: '10px',
              }}
            >
              <div
                style={{
                  backgroundColor: msg.sender === "user" ? '#007BFF' : '#444',
                  color: '#fff',
                  borderRadius: '15px',
                  padding: '15px 20px',
                  maxWidth: '70%',  // Reduce the maxWidth to prevent overflow
                  wordWrap: 'break-word',
                  whiteSpace: 'pre-wrap',
                  fontFamily: 'Arial, sans-serif',
                  fontSize: '16px',
                  overflowWrap: 'break-word', // Ensure long words are wrapped
                }}
              >
                {msg.text}
              </div>
            </div>
          ))}
          {isTyping && (
            <div
              style={{
                display: 'flex',
                justifyContent: 'flex-start',
                marginBottom: '10px',
              }}
            >
              <div
                style={{
                  backgroundColor: '#444',
                  color: '#fff',
                  borderRadius: '15px',
                  padding: '15px 20px',
                  maxWidth: '70%',
                  wordWrap: 'break-word',
                  whiteSpace: 'pre-wrap',
                  fontFamily: 'Arial, sans-serif',
                  fontSize: '16px',
                  overflowWrap: 'break-word',
                }}
              >
                Pluto is typing...
              </div>
            </div>
          )}
        </div>
        <input
          type="text"
          placeholder="Ask Pluto something..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          style={{
            padding: '20px',
            borderRadius: '10px',
            border: '1px solid #ccc',
            width: '100%',
            fontSize: '16px',
            marginTop: '10px',
          }}
        />
      </div>

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
