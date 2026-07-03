import React from "react";
import "./styles/global.css";
import ChatHeader from "./components/ChatHeader";

function App() {
  return (
    <div className="app">

      <ChatHeader />

      <main className="chat">

        <div className="ai">

          <div className="avatar">
            🤖
          </div>

          <div className="bubble">

            <h2>Welcome to pgnox1st AI</h2>

            <br />

            <p>
              Hello 👋
            </p>

            <br />

            <p>
              I am <b>pgnox1st AI v2.5</b>, the official AI assistant of
              ConnectHub.
            </p>

            <br />

            <p>
              Ask me anything...
            </p>

          </div>

        </div>

      </main>

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
