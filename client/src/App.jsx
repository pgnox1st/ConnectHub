import React, { useState } from "react";
import "./styles/global.css";

import ChatHeader from "./components/ChatHeader";
import Sidebar from "./components/Sidebar";
import ChatArea from "./components/ChatArea";
import MessageInput from "./components/MessageInput";

function App() {

  const [messages, setMessages] = useState([]);

  const sendMessage = (text) => {

    if (!text.trim()) return;

    setMessages([
      ...messages,
      {
        id: Date.now(),
        text: text,
        sender: "me"
      }
    ]);

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
