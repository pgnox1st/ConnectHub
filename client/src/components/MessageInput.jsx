import React, { useState, useRef } from "react";

function MessageInput({ sendMessage }) {
  const [text, setText] = useState("");
  const fileInputRef = useRef(null);

  const handleSend = () => {
    if (!text.trim()) return;

    sendMessage(text);
    setText("");
  };

  const handleFileClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    alert(`Selected: ${file.name}`);

    // अगले स्टेप में यहीं से Image Upload करेंगे
  };

  return (
    <footer className="inputBox">

      <button
        type="button"
        title="Attach File"
        onClick={handleFileClick}
      >
        📎
      </button>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        onChange={handleFileChange}
      />

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

      <button type="button" title="Voice">
        🎤
      </button>

      <button
        type="button"
        title="Send"
        onClick={handleSend}
      >
        ➤
      </button>

    </footer>
  );
}

export default MessageInput;
