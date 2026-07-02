import React from 'react';
import { FaHome, FaComment, FaUser, FaCog } from 'react-icons/fa';

function Sidebar() {
  return (
    <div style={{
      width: '240px',
      backgroundColor: '#ffffff',
      height: '100%',
      borderRight: '1px solid #e4e6eb',
      display: 'flex',
      flexDirection: 'column',
      padding: '20px 10px'
    }}>
      <div style={{ fontSize: '22px', fontWeight: 'bold', color: '#1877f2', marginBottom: '30px', paddingLeft: '10px' }}>
        ConnectHub
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <button style={btnStyle}><FaHome style={iconStyle} /> होम</button>
        <button style={{...btnStyle, backgroundColor: '#e7f3ff', color: '#1877f2'}}><FaComment style={iconStyle} /> चैट</button>
        <button style={btnStyle}><FaUser style={iconStyle} /> प्रोफ़ाइल</button>
        <button style={btnStyle}><FaCog style={iconStyle} /> सेटिंग्स</button>
      </div>
    </div>
  );
}

const btnStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '15px',
  width: '100%',
  padding: '12px',
  border: 'none',
  backgroundColor: 'transparent',
  borderRadius: '8px',
  cursor: 'pointer',
  fontSize: '16px',
  fontWeight: '600',
  color: '#050505',
  textAlign: 'left'
};

const iconStyle = {
  fontSize: '20px'
};

export default Sidebar;
  
