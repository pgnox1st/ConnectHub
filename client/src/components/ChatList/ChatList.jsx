import React, { useState } from 'react';
import { FaSearch, FaSlidersH } from 'react-icons/fa';

function ChatList() {
  // Dynamic users state looking like your screenshot
  const [users, setUsers] = useState([
    { id: 1, name: 'Emily Johnson', message: 'Typing...', time: '2m', unread: 2, isTyping: true, status: 'online' },
    { id: 2, name: 'Liam Davis', message: 'Hey! How are you?', time: '10m', unread: 1, status: 'away' },
    { id: 3, name: 'Sophia Martinez', message: 'Voice message', time: '25m', unread: 0, status: 'offline' },
    { id: 4, name: 'Noah Wilson', message: "Let's catch up later.", time: '1h', unread: 0, status: 'away' },
    { id: 5, name: 'Olivia Taylor', message: 'Missed call', time: '1h', unread: 0, isMissedCall: true, status: 'offline' }
  ]);

  const [activeUserId, setActiveUserId] = useState(1);

  return (
    <div style={{ width: '320px', backgroundColor: '#ffffff', height: '100vh', borderRight: '1px solid #f0f2f5', display: 'flex', flexDirection: 'column' }}>
      {/* Title */}
      <div style={{ padding: '24px 20px 15px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ fontSize: '22px', fontWeight: 'bold', color: '#1c1e21', margin: 0 }}>Messages</h2>
      </div>

      {/* Search Bar */}
      <div style={{ padding: '0 20px 20px 20px', display: 'flex', gap: '10px' }}>
        <div style={{ display: 'flex', alignItems: 'center', backgroundColor: '#f0f2f5', padding: '10px 14px', borderRadius: '12px', flex: 1 }}>
          <FaSearch style={{ color: '#8e9297', marginRight: '10px' }} />
          <input type="text" placeholder="Search messages or users" style={{ border: 'none', backgroundColor: 'transparent', outline: 'none', width: '100%', fontSize: '14px' }} />
        </div>
        <button style={{ border: 'none', backgroundColor: '#f0f2f5', padding: '12px', borderRadius: '12px', cursor: 'pointer', color: '#65676b' }}>
          <FaSlidersH />
        </button>
      </div>

      {/* Users List Area */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '0 10px' }}>
        {users.map((user) => (
          <div 
            key={user.id} 
            onClick={() => {
              setActiveUserId(user.id);
              // Clear unread badge on click
              setUsers(users.map(u => u.id === user.id ? { ...u, unread: 0 } : u));
            }}
            style={{
              display: 'flex',
              padding: '12px 10px',
              borderRadius: '12px',
              cursor: 'pointer',
              backgroundColor: user.id === activeUserId ? '#f3efff' : 'transparent',
              marginBottom: '4px',
              alignItems: 'center',
              transition: 'background-color 0.2s'
            }}
          >
            {/* Avatar */}
            <div style={{ position: 'relative', marginRight: '12px' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: '#7b57ff', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '16px' }}>
                {user.name[0]}
              </div>
              {user.status === 'online' && <div style={{ position: 'absolute', bottom: '2px', right: '2px', width: '12px', height: '12px', backgroundColor: '#45bd62', borderRadius: '50%', border: '2px solid #fff' }} />}
            </div>

            {/* User Info */}
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                <span style={{ fontWeight: '600', fontSize: '15px', color: '#1c1e21' }}>{user.name}</span>
                <span style={{ fontSize: '12px', color: '#8e9297' }}>{user.time}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{
                  fontSize: '13px',
                  color: user.isTyping ? '#45bd62' : user.isMissedCall ? '#f02849' : '#65676b',
                  fontWeight: user.isTyping ? '600' : 'normal'
                }}>
                  {user.message}
                </span>
                {user.unread > 0 && (
                  <div style={{ backgroundColor: '#7b57ff', color: '#ffffff', fontSize: '11px', fontWeight: 'bold', borderRadius: '50%', width: '18px', height: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {user.unread}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ChatList;
      
