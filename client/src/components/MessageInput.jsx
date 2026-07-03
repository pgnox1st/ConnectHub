import React, { useState } from "react";

function MessageInput({ sendMessage }) {

  const [text, setText] = useState("");

  const handleSend = () => {
    if (!text.trim()) return;

    sendMessage(text);
    setText("");
  };

  return (
    <footer className="inputBox">

      <button title="Attach File">
        📎
      </button>

      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSend();
          }
        }}
        placeholder="Message pgnox1st AI..."
      />

      <button title="Voice">
        🎤
      </button>

      <button
        title="Send"
        onClick={handleSend}
      >
        ➤
      </button>

    </footer>
  );
}

export default MessageInput;
