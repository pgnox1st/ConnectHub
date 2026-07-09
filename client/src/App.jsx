git add .
git commit -m "Final Chat UI"
git push
import React from "react";
import "./App.css";

import Header from "./components/Header/Header";
import Sidebar from "./components/Sidebar/Sidebar";
import FeatureCards from "./components/FeatureCards";
import ChatWindow from "./components/ChatWindow/ChatWindow";

function App() {
  return (
    <div className="app">
      <Sidebar />

      <div className="main">
        <Header />

        <div className="home">
          <ChatWindow />
        </div>
      </div>
    </div>
  );
}

export default App;
