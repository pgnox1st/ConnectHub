import React from "react";

function MessageInput() {
  return (
    <footer className="inputBox">

      <button title="Attach File">
        📎
      </button>

      <input
        type="text"
        placeholder="Message pgnox1st AI..."
      />

      <button title="Voice">
        🎤
      </button>

      <button title="Send">
        ➤
      </button>

    </footer>
  );
}

export default MessageInput;
