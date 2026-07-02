import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar/Sidebar.jsx';
import ChatList from './components/ChatList/ChatList.jsx';
import Header from './components/Header/Header.jsx';
import ChatWindow from './components/ChatWindow/ChatWindow.jsx';
import ProfileSidebar from './components/ProfileSidebar/ProfileSidebar.jsx';
import Login from './components/Auth/Login.jsx';
import Register from './components/Auth/Register.jsx';

// Final Screenshot Matched Full Layout Structure
const MainLayout = () => {
  return (
    <div className="app-container" style={{ display: 'flex', width: '100vw', height: '100vh', overflow: 'hidden' }}>
      {/* 1. Left Slim Sidebar */}
      <Sidebar />

      {/* 2. Messages/Users List Panel */}
      <ChatList />
      
      {/* 3. Center Main Chat Area (Header + Window) */}
      <div className="main-content" style={{ display: 'flex', flexDirection: 'column', flex: 1, height: '100%' }}>
        <Header />
        <ChatWindow />
      </div>

      {/* 4. Right Sidebar User Details Panel */}
      <ProfileSidebar />
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
