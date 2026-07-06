import React from "react";
import "./Message.css";

import {
  FiCopy,
  FiRefreshCw,
  FiThumbsUp,
  FiThumbsDown
} from "react-icons/fi";

function Message({ type = "ai", text }) {
  return (
    <div className={`message ${type}`}>

      <div className="avatar">
        {type === "ai" ? "🤖" : "👤"}
      </div>

      <div className="message-box">

        <p>{text}</p>

        {type === "ai" && (
          <div className="message-actions">
            <FiCopy />
            <FiRefreshCw />
            <FiThumbsUp />
            <FiThumbsDown />
          </div>
        )}

      </div>

    </div>
  );
}

export default Message;
