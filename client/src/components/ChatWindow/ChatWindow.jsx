import React, { useState } from "react";
import "./Chatwindow.css";

import Message from "./Message";
import ChatInput from "./Chatinput";

function ChatWindow() {
  const [messages, setMessages] = useState([
    {
      type: "ai",
      text: "Hello 👋 Welcome to ConnectHub AI. How can I help you today?",
    },
  ]);

  // User और AI message जोड़ने का function
  const addMessage = (type, text) => {
    setMessages((prev) => [
      ...prev,
      {
        type,
        text,
      },
    ]);
  };

  return (
    <div className="chat-window">
      <div className="messages">
        {messages.map((msg, index) => (
          <Message
            key={index}
            type={msg.type}
            text={msg.text}
          />
        ))}
      </div>

      <ChatInput addMessage={addMessage} />
    </div>
  );
}

export default ChatWindow;
