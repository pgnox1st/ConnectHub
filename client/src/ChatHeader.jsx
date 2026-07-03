import React from "react";

function ChatHeader() {
  return (
    <div className="chat-header">

      <div className="header-left">
        <div className="ai-avatar">
          🤖
        </div>

        <div>
          <h2>pgnox1st AI</h2>

          <p>Official AI Assistant • LIVE</p>
        </div>
      </div>

      <div className="header-right">

        <button title="New Chat">➕</button>

        <button title="Search">🔍</button>

        <button title="Settings">⚙️</button>

      </div>

    </div>
  );
}

export default ChatHeader;
