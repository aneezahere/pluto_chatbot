import React, { useState } from "react";
import Spline from '@splinetool/react-spline';

const Dashboard = () => {
  const [conversation, setConversation] = useState([]);
  const [userInput, setUserInput] = useState("");

  const handleSendMessage = async () => {
    if (userInput.trim() === "") return;

    const userMessage = { sender: "user", text: userInput };
    setConversation([...conversation, userMessage]);

    // Send message to server-side API and receive a response
    const aiResponse = await fetchAIResponse(userInput);

    const aiMessage = { sender: "ai", text: aiResponse };
    setConversation([...conversation, userMessage, aiMessage]);
    setUserInput("");
  };

  const fetchAIResponse = async (message) => {
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message })
      });
      const data = await response.json();
      if (response.ok) {
        return data.response;
      } else {
        console.error("Error fetching AI response:", data.error);
        return "Sorry, something went wrong.";
      }
    } catch (error) {
      console.error("Error fetching AI response:", error);
      return "Sorry, something went wrong.";
    }
  };

  return (
    <div className="relative h-screen w-screen">
      {/* Spline Model as Background */}
      <div className="absolute inset-0 z-0">
        <Spline
          scene="https://prod.spline.design/JlYVvMnH3zgdMA4y/scene.splinecode"
          style={{ width: '100%', height: '100%' }}
        />
      </div>

      {/* Chat Interface Overlay */}
      <div className="relative z-10 h-full w-full flex flex-col justify-end">
        <div style={{ flex: 1, overflowY: "auto", padding: "20px" }}>
          {Array.isArray(conversation) && conversation.map((msg, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                justifyContent: msg.sender === "user" ? "flex-end" : "flex-start",
                marginBottom: "10px",
              }}
            >
              <div className="glassy-bg"
                style={{
                 
                  color: "#000",
                  borderRadius: "15px",
                  padding: "15px 20px",
                  maxWidth: "75%",
                  width: "fit-content",
                  wordWrap: "break-word",
                  whiteSpace: "pre-wrap",
                  fontSize: "16px",
                }}
              >
                {msg.text}
              </div>
            </div>
          ))}
        </div>
        <div className="w-full glassy-bg" style={{ display: "flex", justifyContent: "center", padding: "20px" }}>
          <input className=" w-full text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5  me-2 mb-2"
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="Type prompt..."
          />
          <button className="w-fit text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"

            onClick={handleSendMessage}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
