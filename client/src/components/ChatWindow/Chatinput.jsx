import React, { useState } from "react";
import "./ChatInput.css";
import { FiImage, FiMic, FiSend } from "react-icons/fi";

function ChatInput() {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!message.trim()) return;

    setLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: message,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.reply || "AI request failed");
      }

      alert(data.reply);

      setMessage("");

    } catch (error) {
      console.error("Chat Error:", error);

      alert(error.message);

    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="chat-input">

      <button className="icon-btn">
        <FiImage />
      </button>

      <button className="icon-btn">
        <FiMic />
      </button>

      <input
        type="text"
        placeholder="Message AI..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            sendMessage();
          }
        }}
      />

      <button
        className="send-btn"
        onClick={sendMessage}
        disabled={loading}
      >
        <FiSend />
      </button>

    </div>
  );
}

export default ChatInput;
