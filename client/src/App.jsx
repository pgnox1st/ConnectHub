import React from "react";
import "./styles/global.css";
import ChatHeader from "./components/ChatHeader";
import Sidebar from "./components/Sidebar";

function App() {
  return (
    <div className="app">

      {/* Header */}
      <ChatHeader />

      {/* Main Layout */}
      <div className="main-layout">

        {/* Left Sidebar */}
        <Sidebar />

        {/* Chat Area */}
        <main className="chat">

          <div className="ai">

            <div className="avatar">
              🤖
            </div>

            <div className="bubble">

              <h2>Welcome to pgnox1st AI</h2>

              <br />

              <p>Hello 👋</p>

              <br />

              <p>
                I am <strong>pgnox1st AI v2.5</strong>, the official AI assistant of ConnectHub.
              </p>

              <br />

              <p>
                Ask me anything. I can help you with coding, chatting, images, ideas, and much more.
              </p>

            </div>

          </div>

        </main>

      </div>

      {/* Bottom Input */}
      <footer className="inputBox">

        <button title="Attach File">
          📎
        </button>

        <input
          type="text"
          placeholder="Message pgnox1st AI..."
        />

        <button title="Voice">
          🎤
        </button>

        <button title="Send">
          ➤
        </button>

      </footer>

    </div>
  );
}

export default App;
