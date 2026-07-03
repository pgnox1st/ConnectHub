import React from "react";
import "./styles/global.css";

function App() {
  return (
    <div className="app">

      <header className="header">
        <div className="logo">
          🤖 pgnox1st AI
          <span className="live">LIVE</span>
        </div>
      </header>

      <main className="chat">

        <div className="ai">
          <div className="avatar">AI</div>

          <div className="bubble">
            Welcome to ConnectHub AI v2.5.
            <br /><br />
            Ask me anything.
          </div>
        </div>

      </main>

      <footer className="inputBox">

        <button>📎</button>

        <input
          type="text"
          placeholder="Message pgnox1st AI..."
        />

        <button>🎤</button>

        <button>➤</button>

      </footer>

    </div>
  );
}

export default App;
