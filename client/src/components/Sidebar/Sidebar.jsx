import React from "react";

function Sidebar() {
  return (
    <div className="sidebar">

      <div className="sidebar-top">

        <button className="new-chat">
          ➕ New Chat
        </button>

        <div className="menu">

          <button>💬 Chats</button>

          <button>🖼 Images</button>

          <button>📁 Files</button>

          <button>🎤 Voice</button>

          <button>⭐ Favorites</button>

          <button>🕘 History</button>

        </div>

      </div>

      <div className="sidebar-bottom">

        <button>👤 Profile</button>

        <button>⚙️ Settings</button>

      </div>

    </div>
  );
}

export default Sidebar;
