import { useState } from "react";
import "./App.css";
import FeatureCards from "./components/FeatureCards";
import { FiMenu, FiSend, FiMic, FiImage, FiClock, FiSettings, FiTool } from "react-icons/fi";
import { MdOutlineChatBubbleOutline, MdWorkspacePremium } from "react-icons/md";
import { BsStars } from "react-icons/bs";

function App() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    { sender: "ai", text: "👋 Hello! I am ConnectHub AI. How can I help you today?" },
  ]);

  const sendMessage = async () => {
    if (!message.trim()) return;
    const userMessage = { sender: "user", text: message };
    setMessages((prev) => [...prev, userMessage]);
    const currentMessage = message;
    setMessage("");

    try {
      const res = await fetch("https://connecthub-backend-ydqo.onrender.com/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: currentMessage }),
      });
      const data = await res.json();
      setMessages((prev) => [...prev, { sender: "ai", text: data.reply || "No response." }]);
    } catch (err) {
      setMessages((prev) => [...prev, { sender: "ai", text: "❌ Server connection failed." }]);
    }
  };

  return (
    <div className="app">
      <header className="header">
        <button className="menuButton"><FiMenu /></button>
        <div className="logoArea">
          <h1 className="logoText">ConnectHub <span>AI ✨</span></h1>
          <p>Your Intelligent Companion</p>
        </div>
        <button className="proBtn"><MdWorkspacePremium /><span>Pro</span></button>
      </header>

      <section className="welcome">
        <h2>Hello, <span>User 👋</span></h2>
        <p>How can I help you today?</p>
      </section>

      <FeatureCards />

      {/* नया चैट UI स्ट्रक्चर */}
      <div className="chat">
        {messages.map((msg, index) => (
          <div key={index} className={msg.sender === "user" ? "messageRow userRow" : "messageRow aiRow"}>
            {msg.sender === "ai" && <div className="avatar aiAvatar">✨</div>}
            <div className={msg.sender === "user" ? "userMessage" : "aiMessage"}>{msg.text}</div>
            {msg.sender === "user" && <div className="avatar userAvatar">U</div>}
          </div>
        ))}
      </div>

      <div className="inputArea">
        <input type="text" placeholder="Ask anything..." value={message} onChange={(e) => setMessage(e.target.value)} onKeyDown={(e) => e.key === "Enter" && sendMessage()} />
        <button className="iconBtn"><FiImage /></button>
        <button className="iconBtn"><FiMic /></button>
        <button className="sendBtn" onClick={sendMessage}><FiSend /></button>
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
      
