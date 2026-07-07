import React, { useState } from "react";
import "./Chatinput.css";
import { FiImage, FiMic, FiSend } from "react-icons/fi";

function ChatInput({ addMessage }) {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!message.trim() || loading) return;

    addMessage("user", message);

    const userMessage = message;
    setMessage("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: userMessage,
        }),
      });

      const data = await res.json();

      addMessage(
        "ai",
        data.reply || "Sorry, I couldn't generate a response."
      );
    } catch (error) {
      console.error(error);

      addMessage(
        "ai",
        "⚠️ AI is currently unavailable. Please try again later."
      );
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
          if (e.key === "Enter") {
            sendMessage();
          }
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
