import React from "react";
import "./Chatwindow.css";

import Message from "./Message";
import ChatInput from "./Chatinput";

function ChatWindow() {
  return (
    <div className="chat-window">
      <Message
        type="ai"
        text="Hello 👋 Welcome to ConnectHub AI. How can I help you today?"
      />

      <Message
        type="user"
        text="Hi, can you help me build a website?"
      />

      <Message
        type="ai"
        text="Yes! I can help you build a premium AI website with chat, image generation, voice, search, login system and many more features."
      />

      <ChatInput />
    </div>
  );
}

export default ChatWindow;
