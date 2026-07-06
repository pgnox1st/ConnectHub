import React, { useState } from "react";
import "./Chatinput.css";
import { FiImage, FiMic, FiSend } from "react-icons/fi";

function ChatInput() {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!message.trim()) return;

    setLoading(true);

    try {
      const res = await fetch(
        "https://connect-hub-79kd.vercel.app/api/chat",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message,
          }),
        }
      );

      const data = await res.json();

      alert(data.reply);

      setMessage("");
    } catch (err) {
      alert("Server Error");
      console.error(err);
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

      <button>
        <FiImage />
      </button>

      <button>
        <FiMic />
      </button>

      <button
        onClick={sendMessage}
        className="send-btn"
        disabled={loading}
      >
        {loading ? "..." : <FiSend />}
      </button>
    </div>
  );
}

export default ChatInput;
