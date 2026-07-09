import React, { useState } from "react";
import "./ChatWindow.css";
import ChatInput from "../ChatInput/ChatInput";

function ChatWindow() {
  const [messages, setMessages] = useState([
    {
      sender: "ai",
      text: "Hello 👋 Welcome to ConnectHub AI. How can I help you today?",
    },
  ]);

  return (
    <div className="chat-window">
      <div className="messages">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={
              msg.sender === "user"
                ? "user-message"
                : "ai-message"
            }
          >
            {msg.text}
          </div>
        ))}
      </div>

      <ChatInput setMessages={setMessages} />
    </div>
  );
}

export default ChatWindow;
