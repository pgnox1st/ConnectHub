import "./App.css";
import FeatureCards from "./components/FeatureCards";

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
            alt="Profile"
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

      {/* Premium Feature Cards */}

      <FeatureCards />

      {/* Chat */}

      <div className="chat">

        <div className="aiMessage">
          👋 Hello! I am <b>ConnectHub AI</b>.<br />
          How can I help you today?
        </div>

        <div className="userMessage">
          Explain Artificial Intelligence.
        </div>

        <div className="aiMessage">
          Artificial Intelligence (AI) enables computers to understand language,
          analyze images, generate content, answer questions and assist people
          intelligently.
        </div>

      </div>

      {/* Chat Input */}

      <div className="inputArea">

        <input
          type="text"
          placeholder="Ask anything..."
        />

        <button title="Image">
          🖼️
        </button>

        <button title="Voice">
          🎤
        </button>

        <button className="sendBtn">
          ➤
        </button>

      </div>

      {/* Bottom Navigation */}

      <nav className="bottomNav">

        <button>
          💬
          <br />
          Chat
        </button>

        <button>
          🕘
          <br />
          History
        </button>

        <button className="centerButton">
          ✨
        </button>

        <button>
          🧰
          <br />
          Tools
        </button>

        <button>
          ⚙️
          <br />
          Settings
        </button>

      </nav>

    </div>
  );
}

export default App;
