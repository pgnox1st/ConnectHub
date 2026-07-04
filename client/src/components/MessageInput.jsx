import React, { useState, useRef } from "react";

function MessageInput({ sendMessage }) {
  const [text, setText] = useState("");
  const [preview, setPreview] = useState(null);

  const fileInputRef = useRef(null);

  const handleSend = () => {
    if (!text.trim() && !preview) return;

    sendMessage({
      text,
      image: preview,
    });

    setText("");
    setPreview(null);
  };

  const handleFileClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setPreview(URL.createObjectURL(file));
  };

  return (
    <>
      {preview && (
        <div
          style={{
            padding: "10px",
            background: "#161b22",
            textAlign: "center",
          }}
        >
          <img
            src={preview}
            alt="Preview"
            style={{
              width: "120px",
              borderRadius: "10px",
            }}
          />
        </div>
      )}

      <footer className="inputBox">

        <button onClick={handleFileClick}>
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
          placeholder="Message pgnox1st AI..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSend();
          }}
        />

        <button>
          🎤
        </button>

        <button onClick={handleSend}>
          ➤
        </button>

      </footer>
    </>
  );
}

export default MessageInput;
