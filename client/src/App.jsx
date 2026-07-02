import React from 'react';
import Sidebar from './components/Sidebar/Sidebar.jsx';
import Header from './components/Header/Header.jsx';
import ChatWindow from './components/ChatWindow/ChatWindow.jsx';

function App() {
  return (
    <div className="app-container">
      <Sidebar />
      <div className="main-content">
        <Header />
        <ChatWindow />
      </div>
    </div>
  );
}

export default App;
