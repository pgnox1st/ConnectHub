import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar/Sidebar.jsx';
import Header from './components/Header/Header.jsx';
import ChatWindow from './components/ChatWindow/ChatWindow.jsx';
import Login from './components/Auth/Login.jsx';
import Register from './components/Auth/Register.jsx';

// Main Chat Layout Component
const MainLayout = () => {
  return (
    <div className="app-container">
      {/* Sidebar on the left */}
      <Sidebar />
      
      {/* Header and Chat Area on the right */}
      <div className="main-content">
        <Header />
        <ChatWindow />
      </div>
    </div>
  );
};

function App() {
  // Temporary authentication flag (Set to true later when user successfully logs in)
  const isAuthenticated = true; 

  return (
    <Router>
      <Routes>
        {/* Auth Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Main Chat Route */}
        <Route 
          path="/" 
          element={isAuthenticated ? <MainLayout /> : <Navigate to="/login" />} 
        />

        {/* Redirect any other broken link to Home */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
        
