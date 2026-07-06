import React from "react";
import "./ChatWindow.css";
import {
  FiCopy,
  FiThumbsUp,
  FiThumbsDown,
  FiRefreshCw
} from "react-icons/fi";

function ChatWindow() {
  return (
    <div className="chat-window">

      <div className="chat-message ai">

        <div className="avatar">🤖</div>

        <div className="bubble">

          <h4>ConnectHub AI</h4>

          <p>
            Hello 👋 Welcome to ConnectHub AI.
            <br />
            Ask me anything. I can help you with coding,
            writing, images, research, mathematics and much more.
          </p>

          <div className="actions">
            <FiCopy />
            <FiRefreshCw />
            <FiThumbsUp />
            <FiThumbsDown />
          </div>

        </div>

      </div>

    </div>
  );
}

export default ChatWindow;
