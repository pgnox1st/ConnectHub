import React from "react";
import "./styles/global.css";

import ChatHeader from "./components/ChatHeader";
import Sidebar from "./components/Sidebar";
import ChatArea from "./components/ChatArea";
import MessageInput from "./components/MessageInput";

function App() {
  return (
    <div className="app">

      {/* Header */}
      <ChatHeader />

      {/* Main Layout */}
      <div className="main-layout">

        {/* Sidebar */}
        <Sidebar />

        {/* Chat Area */}
        <ChatArea />

      </div>

      {/* Bottom Input */}
      <MessageInput />

    </div>
  );
}

export default App;
