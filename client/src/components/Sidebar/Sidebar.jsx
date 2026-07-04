import React from "react";

function Sidebar() {
  return (
    <aside className="sidebar">

      <div className="sidebar-top">

        <div className="logo">
          <h2>🤖 ConnectHub AI</h2>
          <p>pgnox1st AI v2.5</p>
        </div>

        <button className="new-chat">
          ➕ New Chat
        </button>

        <div className="menu">

          <button>💬 Chats</button>

          <button>🕘 History</button>

          <button>🖼 Images</button>

          <button>📁 Files</button>

          <button>🎤 Voice</button>

          <button>⭐ Favorites</button>

        </div>

      </div>

      <div className="sidebar-bottom">

        <button>👤 Profile</button>

        <button>⚙️ Settings</button>

        <button>🌙 Dark Mode</button>

      </div>

    </aside>
  );
}

export default Sidebar;
