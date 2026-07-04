import React, { useEffect, useRef } from "react";

function ChatArea({ messages, loading }) {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, loading]);

  return (
    <main className="chat">

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
                  marginBottom: "10px"
                }}
              />
            )}

            {msg.text && <p>{msg.text}</p>}

          </div>

        </div>
      ))}

      {loading && (
        <div className="ai">
          <div className="avatar">🤖</div>

          <div className="bubble">
            <p>Typing...</p>
          </div>
        </div>
      )}

      <div ref={bottomRef}></div>

    </main>
  );
}

export default ChatArea;
