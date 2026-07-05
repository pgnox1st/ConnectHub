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
          <h1>ConnectHub AI ✨</h1>
          <p>Your Intelligent Companion</p>
        </div>

        <div className="headerRight">

          <button className="proBtn">
            <MdWorkspacePremium />
            <span>Pro</span>
          </button>

          <img
            src="https://i.pravatar.cc/100"
            alt="Profile"
            className="avatar"
          />

        </div>

      </header>

      {/* Welcome */}

      <section className="welcome">

        <h2>
          Hello,
          <span> User 👋</span>
        </h2>

        <p>How can I help you today?</p>

      </section>

      {/* Feature Cards */}

      <FeatureCards />

      {/* Chat */}

      <div className="chat">

        {messages.map((msg, index) => (

          <div
            key={index}
            className={
              msg.sender === "user"
                ? "userMessage"
                : "aiMessage"
            }
          >
            {msg.text}
          </div>

        ))}

      </div>

      {/* Input */}

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

        <button title="Image">
          <FiImage />
        </button>

        <button title="Voice">
          <FiMic />
        </button>

        <button
          className="sendBtn"
          onClick={sendMessage}
        >
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
