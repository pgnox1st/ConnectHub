import React from 'react';
import { FaBell, FaSearch } from 'react-icons/fa';

function Header() {
  return (
    <div style={{
      height: '60px',
      backgroundColor: '#ffffff',
      borderBottom: '1px solid #e4e6eb',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'between',
      padding: '0 20px',
      justifyContent: 'space-between'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', backgroundColor: '#f0f2f5', padding: '8px 12px', borderRadius: '50px', width: '250px' }}>
        <FaSearch style={{ color: '#65676b', marginRight: '8px' }} />
        <input type="text" placeholder="ConnectHub पर खोजें" style={{ border: 'none', backgroundColor: 'transparent', outline: 'none', width: '100%' }} />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
        <button style={{ border: 'none', backgroundColor: '#f0f2f5', padding: '10px', borderRadius: '50%', cursor: 'pointer' }}>
          <FaBell style={{ fontSize: '16px', color: '#050505' }} />
        </button>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: '#1877f2', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>U</div>
          <span style={{ fontWeight: '600', fontSize: '15px' }}>My Account</span>
        </div>
      </div>
    </div>
  );
}

export default Header;
      
