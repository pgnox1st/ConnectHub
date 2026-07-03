import React from "react";

function ChatArea({ messages }) {
  return (
    <main className="chat">

      <div className="ai">
        <div className="avatar">🤖</div>

        <div className="bubble">
          <h2>Welcome to ConnectHub AI</h2>

          <p>Hello 👋</p>

          <p>I am pgnox1st AI.</p>

          <p>Start chatting below.</p>
        </div>
      </div>

      {messages.map((msg) => (
        <div
          key={msg.id}
          className="ai"
          style={{ justifyContent: "flex-end" }}
        >
          <div
            className="bubble"
            style={{
              background: "#10a37f",
              color: "#fff"
            }}
          >
            {msg.text}
          </div>
        </div>
      ))}

    </main>
  );
}

export default ChatArea;
