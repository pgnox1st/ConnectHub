import React from "react";
import "./App.css";

import Sidebar from "./components/Sidebar/Sidebar";
import Header from "./components/Header/Header";
import ChatWindow from "./components/ChatWindow/ChatWindow";

function App() {
  return (
    <div className="app">
      <Sidebar />

      <div className="main">
        <Header />
        <ChatWindow />
      </div>
    </div>
  );
}

export default App;
