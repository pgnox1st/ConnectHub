import React, { useState } from "react";
import "./ChatInput.css";

import {
  FiImage,
  FiMic,
  FiSend
} from "react-icons/fi";

function ChatInput() {

  const [message, setMessage] = useState("");

  const sendMessage = () => {
    if (!message.trim()) return;

    console.log(message);

    setMessage("");
  };

  return (
    <div className="chat-input">

      <input
        type="text"
        placeholder="Ask anything..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />

      <button>
        <FiImage />
      </button>

      <button>
        <FiMic />
      </button>

      <button onClick={sendMessage} className="send-btn">
        <FiSend />
      </button>

    </div>
  );
}

export default ChatInput;
