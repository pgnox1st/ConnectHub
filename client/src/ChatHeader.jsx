import React from "react";

function ChatHeader() {
  return (
    <header className="chat-header">

      <div className="header-left">

        <div className="ai-avatar">
          🤖
        </div>

        <div>
          <h2>pgnox1st AI</h2>
          <p>🟢 Online • ConnectHub Official AI</p>
        </div>

      </div>

      <div className="header-right">

        <button title="New Chat">
          ➕
        </button>

        <button title="Search">
          🔍
        </button>

        <button title="Notifications">
          🔔
        </button>

        <button title="Settings">
          ⚙️
        </button>

      </div>

    </header>
  );
}

export default ChatHeader;
