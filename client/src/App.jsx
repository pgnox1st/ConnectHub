import "./App.css";

function App() {
  return (
    <div className="app">

      {/* Sidebar Button */}
      <div className="menuButton">
        ☰
      </div>

      {/* Header */}
      <header className="header">

        <div>
          <h1>ConnectHub AI ✨</h1>
          <p>Your Intelligent Companion</p>
        </div>

        <div className="headerRight">

          <button className="proBtn">
            👑 Pro
          </button>

          <img
            className="avatar"
            src="https://i.pravatar.cc/100"
            alt="profile"
          />

        </div>

      </header>

      {/* Welcome */}

      <div className="welcome">

        <h2>
          Hello,
          <span> User 👋</span>
        </h2>

        <p>How can I help you today?</p>

      </div>

      {/* Cards */}

      <div className="cards">

        <div className="card">
          <div className="icon">💬</div>
          <h3>AI Chat</h3>
          <p>Smart conversations</p>
        </div>

        <div className="card">
          <div className="icon">🔍</div>
          <h3>AI Search</h3>
          <p>Find answers instantly</p>
        </div>

        <div className="card">
          <div className="icon">🖼️</div>
          <h3>AI Image</h3>
          <p>Create amazing images</p>
        </div>

        <div className="card">
          <div className="icon">✍️</div>
          <h3>AI Write</h3>
          <p>Write anything</p>
        </div>

      </div>

      {/* Chat */}

      <div className="chat">

        <div className="aiMessage">
          Hello 👋<br />
          Welcome to ConnectHub AI.
        </div>

        <div className="userMessage">
          Explain Artificial Intelligence.
        </div>

        <div className="aiMessage">
          Artificial Intelligence (AI) enables computers to perform tasks that normally require human intelligence such as understanding language, generating images, solving problems, and assisting users.
        </div>

      </div>

      {/* Input */}

      <div className="inputArea">

        <input
          placeholder="Ask anything..."
        />

        <button>🖼️</button>

        <button>🎤</button>

        <button className="sendBtn">
          ➤
        </button>

      </div>

      {/* Bottom Navigation */}

      <nav className="bottomNav">

        <button>💬<br />Chat</button>

        <button>🕘<br />History</button>

        <button className="centerButton">
          ✨
        </button>

        <button>🧰<br />Tools</button>

        <button>⚙️<br />Settings</button>

      </nav>

    </div>
  );
}

export default App;
