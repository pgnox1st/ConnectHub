import { useState } from "react";
import "./App.css";
import FeatureCards from "./components/FeatureCards";

import {
  FiMenu,
  FiSend,
  FiMic,
  FiImage,
  FiClock,
  FiSettings,
  FiTool,
} from "react-icons/fi";

import {
  MdOutlineChatBubbleOutline,
  MdWorkspacePremium,
} from "react-icons/md";

import { BsStars } from "react-icons/bs";
import { FaRobot } from "react-icons/fa";

function App() {
  const [message, setMessage] = useState("");

  const [messages, setMessages] = useState([
    {
      sender: "ai",
      text: "👋 Hello! I am ConnectHub AI. How can I help you today?",
    },
  ]);

  const sendMessage = async () => {
    if (!message.trim()) return;

    const userMessage = {
      sender: "user",
      text: message,
    };

    setMessages((prev) => [...prev, userMessage]);

    const currentMessage = message;
    setMessage("");

    try {
      const res = await fetch(
        "https://connecthub-backend-ydqo.onrender.com/api/chat",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message: currentMessage,
          }),
        }
      );

      const data = await res.json();

      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: data.reply || "No response.",
        },
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: "❌ Server connection failed.",
        },
      ]);
    }
  };

  return (
    <div className="app">
      {/* Header */}
      <header className="header">
        <button className="menuButton">
          <FiMenu />
        </button>

        <div className="logoArea">
          <h1 className="logoText">
            ConnectHub <span>AI ✨</span>
          </h1>
          <p>Your Intelligent Companion</p>
        </div>

        <button className="proBtn">
          <MdWorkspacePremium />
          <span>Pro</span>
        </button>
      </header>

      {/* Welcome Section */}
      <section className="welcome">
        <h2>
          Hello, <span>User 👋</span>
        </h2>
        <p>How can I help you today?</p>
      </section>

      {/* Feature Cards */}
      <FeatureCards />

      {/* Chat Section */}
      <div className="chat">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={msg.sender === "user" ? "userMessage" : "aiMessage"}
          >
            {msg.sender === "ai" && <FaRobot className="aiIcon" />}
            {msg.text}
          </div>
        ))}
      </div>

      {/* Input Section */}
      <div className="inputArea">
        <input
          type="text"
          placeholder="Ask anything..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              sendMessage();
            }
          }}
        />

        <button className="iconBtn">
          <FiImage />
        </button>

        <button className="iconBtn">
          <FiMic />
        </button>

        <button className="sendBtn" onClick={sendMessage}>
          <FiSend />
        </button>
      </div>

      {/* Bottom Navigation */}
      <nav className="bottomNav">
        <button className="active">
          <MdOutlineChatBubbleOutline />
          <span>Chat</span>
        </button>

        <button>
          <FiClock />
          <span>History</span>
        </button>

        <button className="centerButton">
          <BsStars />
        </button>

        <button>
          <FiTool />
          <span>Tools</span>
        </button>

        <button>
          <FiSettings />
          <span>Settings</span>
        </button>
      </nav>
    </div>
  );
}

export default App;
    
