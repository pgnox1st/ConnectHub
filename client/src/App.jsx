import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar/Sidebar.jsx';
import ChatList from './components/ChatList/ChatList.jsx';
import Header from './components/Header/Header.jsx';
import ChatWindow from './components/ChatWindow/ChatWindow.jsx';
import Login from './components/Auth/Login.jsx';
import Register from './components/Auth/Register.jsx';

// Updated Premium Layout containing Sidebar + ChatList + Main Chat Area
const MainLayout = () => {
  return (
    <div className="app-container">
      {/* 1. Slim Left Sidebar */}
      <Sidebar />

      {/* 2. Chat/Messages User List */}
      <ChatList />
      
      {/* 3. Main Content Area (Header + Open Chat) */}
      <div className="main-content">
        <Header />
        <ChatWindow />
      </div>
    </div>
  );
};

function App() {
  const isAuthenticated = true; 

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route 
          path="/" 
          element={isAuthenticated ? <MainLayout /> : <Navigate to="/login" />} 
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
        
