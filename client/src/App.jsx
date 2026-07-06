import React from 'react';
import './App.css';
import { FiMenu, FiMessageSquare, FiGlobe, FiImage, FiEdit3, FiSend, FiMic, FiClock, FiTool, FiSettings } from 'react-icons/fi';
import { BsStars, MdWorkspacePremium } from 'react-icons/md';

function App() {
  return (
    <div className="app">
      <header className="header">
        <FiMenu size={24}/>
        <div style={{textAlign:'center'}}><h3>ConnectHub AI ✨</h3><p style={{fontSize:'10px', color:'#666'}}>Your Intelligent Companion</p></div>
        <button className="proBtn"><MdWorkspacePremium/> Pro</button>
      </header>

      <section className="welcome-sec">
        <h1>Hello, <span style={{color:'#a78bfa'}}>User 👋</span></h1>
        <p>How can I help you today?</p>
      </section>

      <div className="feature-grid">
        {[ {icon: <FiMessageSquare/>, name: "AI Chat"}, {icon: <FiGlobe/>, name: "AI Search"}, {icon: <FiImage/>, name: "AI Image"}, {icon: <FiEdit3/>, name: "AI Pencil"} ].map((f, i) => (
          <div key={i} className="feature-card">{f.icon}<p>{f.name}</p></div>
        ))}
      </div>

      <div className="chat-window">
        <div className="ai-bubble">Hello! I am ConnectHub AI. How can I help you today?</div>
      </div>

      <div className="input-area">
        <input placeholder="Ask anything..." />
        <FiImage style={{marginRight:'10px'}}/> <FiMic style={{marginRight:'10px'}}/> <FiSend/>
      </div>

      <nav className="navbar">
        <button className="nav-btn"><FiMessageSquare/> Chat</button>
        <button className="nav-btn"><FiClock/> History</button>
        <button className="main-nav-btn"><BsStars size={25}/></button>
        <button className="nav-btn"><FiTool/> Tools</button>
        <button className="nav-btn"><FiSettings/> Settings</button>
      </nav>
    </div>
  );
}
export default App;
            
