import React from 'react';
import { FaHome, FaComment, FaPhone, FaVideo, FaUsers, FaHeart, FaBell, FaHeadset, FaShieldAlt, FaFileText, FaLock, FaCog } from 'react-icons/fa';

function Sidebar() {
  return (
    <div style={{
      width: '80px',
      backgroundColor: '#ffffff',
      height: '100%',
      borderRight: '1px solid #f0f2f5',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '20px 0',
      justifyContent: 'space-between'
    }}>
      {/* Top Logo Icon */}
      <div style={{ fontSize: '24px', color: '#7b57ff', marginBottom: '20px', cursor: 'pointer' }}>
        <FaComment />
      </div>

      {/* Main Navigation Menu Icons */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', flex: 1, justifyContent: 'center' }}>
        <button style={btnStyle} title="Home"><FaHome /></button>
        <button style={{...btnStyle, backgroundColor: '#f3efff', color: '#7b57ff'}} title="Messages"><FaComment /></button>
        <button style={btnStyle} title="Voice Call"><FaPhone /></button>
        <button style={btnStyle} title="Video Call"><FaVideo /></button>
        <button style={btnStyle} title="People"><FaUsers /></button>
        <button style={btnStyle} title="Favorites"><FaHeart /></button>
        <button style={btnStyle} title="Notifications"><FaBell /></button>
        <button style={btnStyle} title="Help Center"><FaHeadset /></button>
        <button style={btnStyle} title="Safety Center"><FaShieldAlt /></button>
        <button style={btnStyle} title="Terms of Service"><FaFileText /></button>
        <button style={btnStyle} title="Privacy Policy"><FaLock /></button>
      </div>

      {/* Bottom Settings Icon */}
      <button style={btnStyle} title="Settings"><FaCog /></button>
    </div>
  );
}

const btnStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '45px',
  height: '45px',
  border: 'none',
  backgroundColor: 'transparent',
  borderRadius: '12px',
  cursor: 'pointer',
  fontSize: '20px',
  color: '#65676b',
  transition: 'all 0.2s'
};

export default Sidebar;
        
