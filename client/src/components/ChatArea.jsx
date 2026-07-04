import React, { useEffect, useRef } from "react";

function ChatArea({ messages }) {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  return (
    <main className="chat">

      <div className="ai">
        <div className="avatar">🤖</div>

        <div className="bubble">
          <h2>Welcome to ConnectHub AI</h2>
          <p>Hello 👋</p>
          <p>I am <strong>pgnox1st AI</strong>.</p>
          <p>How can I help you today?</p>
        </div>
      </div>

      {messages.map((msg) => (

        <div
          key={msg.id}
          className={msg.sender === "me" ? "user-message" : "ai"}
        >

          {msg.sender === "ai" && (
            <div className="avatar">🤖</div>
          )}

          <div className="bubble">

            {msg.image && (
              <img
                src={msg.image}
                alt="Uploaded"
                style={{
                  width: "220px",
                  borderRadius: "12px",
                  marginBottom: "10px",
                }}
              />
            )}

            {msg.text && <p>{msg.text}</p>}

          </div>

        </div>

      ))}

      <div ref={bottomRef}></div>

    </main>
  );
}

export default ChatArea;
