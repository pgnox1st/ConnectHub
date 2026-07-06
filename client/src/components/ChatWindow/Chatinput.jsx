import React, { useState } from "react";
import "./Chatinput.css";
import { FiImage, FiMic, FiSend } from "react-icons/fi";

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
        body: JSON.stringify({ message }),
      });

      // ❗ safe parse
      const data = await res.json().catch(() => null);

      if (!res.ok) {
        throw new Error("Server Error");
      }

      alert(data?.reply || "No AI response");

      setMessage("");
    } catch (error) {
      console.error("Error:", error);
      alert("AI is currently unavailable (backend issue)");
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
        onKeyDown={(e) => e.key === "Enter" && sendMessage()}
      />

      <button><FiImage /></button>
      <button><FiMic /></button>

      <button onClick={sendMessage} disabled={loading}>
        {loading ? "..." : <FiSend />}
      </button>
    </div>
  );
}

export default ChatInput;
