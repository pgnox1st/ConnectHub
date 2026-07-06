import React from "react";
import "./Sidebar.css";

import {
  FiMessageSquare,
  FiClock,
  FiImage,
  FiFolder,
  FiMic,
  FiStar,
  FiUser,
  FiSettings,
  FiMoon,
  FiPlus
} from "react-icons/fi";

function Sidebar() {
  return (
    <aside className="sidebar">

      <div>

        <div className="logo">
          <h2>🤖 ConnectHub AI</h2>
          <p>Premium AI Assistant</p>
        </div>

        <button className="new-chat">
          <FiPlus />
          New Chat
        </button>

        <div className="menu">

          <button>
            <FiMessageSquare />
            Chats
          </button>

          <button>
            <FiClock />
            History
          </button>

          <button>
            <FiImage />
            AI Images
          </button>

          <button>
            <FiFolder />
            Files
          </button>

          <button>
            <FiMic />
            Voice Chat
          </button>

          <button>
            <FiStar />
            Favorites
          </button>

        </div>

      </div>

      <div className="bottom-menu">

        <button>
          <FiUser />
          Profile
        </button>

        <button>
          <FiSettings />
          Settings
        </button>

        <button>
          <FiMoon />
          Dark Mode
        </button>

      </div>

    </aside>
  );
}

export default Sidebar;
