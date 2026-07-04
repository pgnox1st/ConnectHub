import React, { useState } from "react";
import "./styles/global.css";

import ChatHeader from "./components/ChatHeader";
import Sidebar from "./components/Sidebar";
import ChatArea from "./components/ChatArea";
import MessageInput from "./components/MessageInput";

import { askAI } from "./services/api";

function App() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async ({ text, image }) => {
    const userMessage = {
      id: Date.now(),
      text,
      image,
      sender: "me",
    };

    setMessages((prev) => [...prev, userMessage]);

    if (!text.trim()) return;

    setLoading(true);

    try {
      const res = await askAI(text);

      const aiMessage = {
        id: Date.now() + 1,
        text: res.data.reply,
        sender: "ai",
      };

      setMessages((prev) => [...prev, aiMessage]);

    } catch (err) {

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 2,
          text: "❌ AI Server Error",
          sender: "ai",
        },
      ]);

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">

      <ChatHeader />

      <div className="main-layout">
        <Sidebar />
        <ChatArea
          messages={messages}
          loading={loading}
        />
      </div>

      <MessageInput sendMessage={sendMessage} />

    </div>
  );
}

export default App;
