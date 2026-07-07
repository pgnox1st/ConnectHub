import React, { useState } from "react";
import { FiImage, FiMic, FiSend } from "react-icons/fi";

function Chatinput() {
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
        throw new Error(data.reply || "AI Error");
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
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
        marginTop: "20px",
        padding: "12px",
        background: "#11141f",
        borderRadius: "18px",
      }}
    >

      <button
        style={buttonStyle}
      >
        <FiImage />
      </button>

      <button
        style={buttonStyle}
      >
        <FiMic />
      </button>

      <input
        style={inputStyle}
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
        style={{
          ...buttonStyle,
          background: "#7c3aed",
        }}
        onClick={sendMessage}
        disabled={loading}
      >
        <FiSend />
      </button>

    </div>
  );
}

const buttonStyle = {
  width: "45px",
  height: "45px",
  border: "none",
  borderRadius: "12px",
  background: "#1a1f2e",
  color: "#fff",
  fontSize: "20px",
  cursor: "pointer",
};

const inputStyle = {
  flex: 1,
  background: "transparent",
  border: "none",
  outline: "none",
  fontSize: "16px",
  color: "#fff",
};

export default Chatinput;
