import React from "react";
import "./App.css";

import Header from "./components/Header/Header";
import Sidebar from "./components/Sidebar/Sidebar";
import FeatureCards from "./components/FeatureCards/FeatureCards";
import ChatWindow from "./components/ChatWindow/ChatWindow";

function App() {
  return (
    <div className="app">

      <Sidebar />

      <div className="main">

        <Header />

        <div className="home">

          <div className="welcome">

            <h1>
              Hello, <span>User 👋</span>
            </h1>

            <p>How can I help you today?</p>

          </div>

          <FeatureCards />

          <ChatWindow />

        </div>

      </div>

    </div>
  );
}

export default App;
