import React from "react";
import { FiMenu, FiMessageSquare, FiGlobe, FiImage, FiEdit3, FiSend, FiMic, FiClock, FiTool, FiSettings } from "react-icons/fi";
import { BsStars, MdWorkspacePremium } from "react-icons/md";
import "./App.css";

function App() {
  return (
    <div className="app">
      <header className="header">
        <FiMenu size={22} />
        <div className="logo-container">
          <h2>ConnectHub AI ✨</h2>
          <p>Your Intelligent Companion</p>
        </div>
        <button className="proBtn"><MdWorkspacePremium /> Pro</button>
      </header>

      <section className="welcome-sec">
        <h1>Hello, <span>User 👋</span></h1>
        <p>How can I help you today?</p>
      </section>

      <div className="feature-grid">
        {[ {icon: <FiMessageSquare/>, name: "AI Chat"}, {icon: <FiGlobe/>, name: "AI Search"}, {icon: <FiImage/>, name: "AI Image"}, {icon: <FiEdit3/>, name: "AI Writer"} ].map((f, i) => (
          <div key={i} className="feature-item"><div className="icon-box">{f.icon}</div><p>{f.name}</p></div>
        ))}
      </div>

      <div className="chat-window">
        <div className="ai-bubble">Hey there! I'm your AI assistant. Feel free to ask me anything...</div>
      </div>

      <div className="input-area">
        <input placeholder="Ask anything..." />
        <div className="input-actions"><FiImage /> <FiMic /></div>
        <button className="send-btn"><FiSend /></button>
      </div>

      <nav className="navbar">
        <button className="nav-btn"><FiMessageSquare size={18}/> Chat</button>
        <button className="nav-btn"><FiClock size={18}/> History</button>
        <button className="main-nav-btn"><BsStars size={24}/></button>
        <button className="nav-btn"><FiTool size={18}/> Tools</button>
        <button className="nav-btn"><FiSettings size={18}/> Settings</button>
      </nav>
    </div>
  );
}
export default App;
        
