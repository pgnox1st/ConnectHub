import React, { useState } from "react";
import "./App.css";
import FeatureCards from "./FeatureCards";
import { FiMenu, FiSend, FiMic, FiImage, FiClock, FiSettings, FiTool } from "react-icons/fi";
import { MdOutlineChatBubbleOutline, MdWorkspacePremium } from "react-icons/md";
import { BsStars } from "react-icons/bs";

function App() {
  const [messages] = useState([
    { sender: "ai", text: "Hey there! I'm your AI assistant. Feel free to ask me anything..." }
  ]);

  return (
    <div className="app">
      <header className="header">
        <button className="menuButton"><FiMenu /></button>
        <div className="logoArea">
          <h1>ConnectHub AI ✨</h1>
          <p>Your Intelligent Companion</p>
        </div>
        <button className="proBtn"><MdWorkspacePremium /> Pro</button>
      </header>

      <section className="welcome">
        <h2>Hello, User 👋</h2>
        <p>How can I help you today?</p>
      </section>

      <FeatureCards />

      <div className="chat">
        {messages.map((msg, index) => (
          <div key={index} className="aiRow messageRow">
            <div className="avatar aiAvatar">✨</div>
            <div className="aiMessage">{msg.text}</div>
          </div>
        ))}
      </div>

      <div className="inputArea">
        <input type="text" placeholder="Ask anything..." />
        <button className="iconBtn"><FiImage /></button>
        <button className="iconBtn"><FiMic /></button>
        <button className="sendBtn"><FiSend /></button>
      </div>

      <nav className="bottomNav">
        <button className="active"><MdOutlineChatBubbleOutline /><span>Chat</span></button>
        <button><FiClock /><span>History</span></button>
        <button className="centerButton"><BsStars /></button>
        <button><FiTool /><span>Tools</span></button>
        <button><FiSettings /><span>Settings</span></button>
      </nav>
    </div>
  );
}
export default App;
  
