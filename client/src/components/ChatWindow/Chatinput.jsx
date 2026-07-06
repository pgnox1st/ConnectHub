import React, { useState } from "react";
import "./Chatinput.css";
import { FiImage, FiMic, FiSend } from "react-icons/fi";

// ✅ YOUR REAL BACKEND
const API_URL = "https://connecthub-backend-ydqo.onrender.com";

function ChatInput() {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!message.trim()) return;

    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/api/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: message,
        }),
      });

      const data = await res.json();

      // AI reply show (temporary UI)
      alert(data.reply || "No response from AI");

      setMessage("");
    } catch (error) {
      console.error("Error:", error);
      alert("AI is currently unavailable. Please try again later.");
    }

    setLoading(false);
  };

  return (
    <div className="chat-input">
      <input
        type="text"
        placeholder="Ask anything..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") sendMessage();
        }}
      />

      <button type="button">
        <FiImage />
      </button>

      <button type="button">
        <FiMic />
      </button>

      <button
        type="button"
        onClick={sendMessage}
        disabled={loading}
        className="send-btn"
      >
        {loading ? "..." : <FiSend />}
      </button>
    </div>
  );
}

export default ChatInput;
