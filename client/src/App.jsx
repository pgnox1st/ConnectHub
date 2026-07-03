import React, { useState } from "react";
import "./styles/global.css";

import ChatHeader from "./components/ChatHeader";
import Sidebar from "./components/Sidebar";
import ChatArea from "./components/ChatArea";
import MessageInput from "./components/MessageInput";

import { askAI } from "./services/api";

function App() {
  const [messages, setMessages] = useState([]);

  const sendMessage = async (text) => {
    if (!text.trim()) return;

    // User Message
    const userMessage = {
      id: Date.now(),
      text,
      sender: "me",
    };

    setMessages((prev) => [...prev, userMessage]);

    try {
      const res = await askAI(text);

      const aiMessage = {
        id: Date.now() + 1,
        text: res.data.reply,
        sender: "ai",
      };

      setMessages((prev) => [...prev, aiMessage]);

    } catch (error) {
      const errorMessage = {
        id: Date.now() + 2,
        text: "❌ AI Server Error",
        sender: "ai",
      };

      setMessages((prev) => [...prev, errorMessage]);
    }
  };

  return (
    <div className="app">
      <ChatHeader />

      <div className="main-layout">
        <Sidebar />
        <ChatArea messages={messages} />
      </div>

      <MessageInput sendMessage={sendMessage} />
    </div>
  );
}

export default App;
