import React from "react";

function Sidebar() {
  return (
    <aside className="sidebar">

      <div className="logo">
        <h2>ConnectHub</h2>
      </div>

      <nav className="menu">

        <button>🏠 Home</button>

        <button>💬 Chats</button>

        <button>👥 Friends</button>

        <button>🔔 Notifications</button>

        <button>🤖 AI Chat</button>

        <button>📞 Calls</button>

        <button>⚙️ Settings</button>

      </nav>

    </aside>
  );
}

export default Sidebar;
