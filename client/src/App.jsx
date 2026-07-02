import React, { useState } from 'react';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('chat'); // 'messages', 'chat', 'profile'
  const [typedMessage, setTypedMessage] = useState('');
  const [messages, setMessages] = useState([
    { id: 1, text: "Hey there! 👋", time: "02:10 PM", isSender: false },
    { id: 2, text: "Hi Emily! How are going?", time: "02:11 PM", isSender: true },
    { id: 3, text: "I'm good, thanks! You?", time: "02:11 PM", isSender: false },
    { id: 4, text: "Doing great! What's up?", time: "02:12 PM", isSender: true },
    { id: 5, type: "voice", duration: "00:12", time: "02:12 PM", isSender: false },
    { id: 6, text: "That's awesome! 😉", time: "02:13 PM", isSender: true },
    { id: 7, type: "call", text: "Audio Call", duration: "2m 45s", time: "02:15 PM", isSender: false }
  ]);

  const handleSendMessage = () => {
    if (!typedMessage.trim()) return;
    const newMsg = {
      id: Date.now(),
      text: typedMessage,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isSender: true
    };
    setMessages([...messages, newMsg]);
    setTypedMessage('');
  };

  return (
    <div style={styles.appWrapper}>
      {/* 1. MESSAGES LIST SCREEN */}
      {currentScreen === 'messages' && (
        <div style={styles.screenContainer}>
          <div style={styles.header}>
            <button style={styles.iconButton}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
            </button>
            <h2 style={styles.headerTitle}>Messages</h2>
            <div style={{ width: 24 }}></div>
          </div>

          <div style={styles.searchBarWrapper}>
            <div style={styles.searchBar}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#65676b" strokeWidth="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
              <input type="text" placeholder="Search messages or users" style={styles.searchInput} />
            </div>
            <button style={styles.filterButton}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#65676b" strokeWidth="2"><line x1="4" y1="21" x2="4" y2="14"></line><line x1="4" y1="10" x2="4" y2="3"></line><line x1="12" y1="21" x2="12" y2="12"></line><line x1="12" y1="8" x2="12" y2="3"></line><line x1="20" y1="21" x2="20" y2="16"></line><line x1="20" y1="12" x2="20" y2="3"></line><line x1="1" y1="14" x2="7" y2="14"></line><line x1="9" y1="8" x2="15" y2="8"></line><line x1="17" y1="16" x2="23" y2="16"></line></svg>
            </button>
          </div>

          <div style={styles.chatList}>
            <div style={{ ...styles.chatItem, backgroundColor: '#f0eeff' }} onClick={() => setCurrentScreen('chat')}>
              <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150" alt="Emily" style={styles.avatar} />
              <div style={styles.chatMeta}>
                <div style={styles.chatRow}>
                  <span style={styles.chatName}>Emily Johnson</span>
                  <span style={{ ...styles.chatTime, color: '#6a4bfa' }}>2m</span>
                </div>
                <div style={styles.chatRow}>
                  <span style={{ ...styles.chatPreview, color: '#24b07a', fontWeight: '500' }}>Typing...</span>
                  <span style={styles.badge}>2</span>
                </div>
              </div>
            </div>

            {[
              { name: "Liam Davis", text: "Hey! How are you?", time: "10m", unread: 1, img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150" },
              { name: "Sophia Martinez", text: "🎙️ Voice message", time: "25m", unread: 0, img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150" },
              { name: "Noah Wilson", text: "Let's catch up later.", time: "1h", unread: 0, img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150" },
              { name: "Olivia Taylor", text: "📞 Missed call", time: "1h", unread: 0, img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150" }
            ].map((c, idx) => (
              <div key={idx} style={styles.chatItem} onClick={() => setCurrentScreen('chat')}>
                <img src={c.img} alt={c.name} style={styles.avatar} />
                <div style={styles.chatMeta}>
                  <div style={styles.chatRow}>
                    <span style={styles.chatName}>{c.name}</span>
                    <span style={styles.chatTime}>{c.time}</span>
                  </div>
                  <div style={styles.chatRow}>
                    <span style={styles.chatPreview}>{c.text}</span>
                    {c.unread > 0 && <span style={styles.badge}>{c.unread}</span>}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div style={styles.bottomTabBar}>
            <div style={styles.tabItem} onClick={() => setCurrentScreen('messages')}><span style={{ opacity: 0.5 }}>🏠</span><span style={styles.tabLabel}>Home</span></div>
            <div style={{ ...styles.tabItem, color: '#6a4bfa' }}><span style={{ fontSize: 20 }}>💬</span><span style={{ ...styles.tabLabel, fontWeight: '600' }}>Messages</span></div>
            <div style={styles.tabItem}><span style={{ opacity: 0.5 }}>👥</span><span style={styles.tabLabel}>People</span></div>
            <div style={styles.tabItem}><span style={{ opacity: 0.5 }}>⭐</span><span style={styles.tabLabel}>Favorites</span></div>
          </div>
        </div>
      )}

      {/* 2. ACTIVE CHAT SCREEN */}
      {currentScreen === 'chat' && (
        <div style={styles.screenContainer}>
          <div style={styles.header}>
            <button style={styles.iconButton} onClick={() => setCurrentScreen('messages')}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
            </button>
            <div style={styles.headerUserMeta} onClick={() => setCurrentScreen('profile')}>
              <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150" alt="Emily" style={styles.headerAvatar} />
              <div>
                <div style={styles.headerName}>Emily Johnson</div>
                <div style={styles.headerStatus}>Online</div>
              </div>
            </div>
            <div style={styles.headerActions}>
              <button style={styles.iconButton}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
              </button>
              <button style={styles.iconButton}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M23 7a2 2 0 0 0-2.45-1.45L16 7V5a2 2 0 0 0-2-2H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2l4.55 1.45A2 2 0 0 0 23 17V7z"></path></svg>
              </button>
            </div>
          </div>

          <div style={styles.chatFeed}>
            {messages.map((msg) => (
              <div key={msg.id} style={{
                ...styles.messageRow,
                justifyContent: msg.isSender ? 'flex-end' : 'flex-start'
              }}>
                <div style={{
                  ...styles.bubble,
                  backgroundColor: msg.isSender ? '#6a4bfa' : '#f1f3f4',
                  color: msg.isSender ? '#ffffff' : '#0f1419',
                  borderRadius: msg.isSender ? '16px 16px 4px 16px' : '16px 16px 16px 4px'
                }}>
                  {msg.type === 'voice' ? (
                    <div style={styles.voiceWrapper}>
                      <span style={{ fontSize: 18 }}>▶️</span>
                      <div style={styles.waveForm}></div>
                      <span style={styles.voiceDuration}>{msg.duration}</span>
                    </div>
                  ) : msg.type === 'call' ? (
                    <div style={styles.callWrapper}>
                      <span style={{ fontSize: 18 }}>📞</span>
                      <div>
                        <div style={{ fontWeight: '600', fontSize: 14 }}>{msg.text}</div>
                        <div style={{ fontSize: 11, opacity: 0.7 }}>{msg.duration}</div>
                      </div>
                    </div>
                  ) : (
                    <div>{msg.text}</div>
                  )}
                  <div style={{
                    ...styles.bubbleTime,
                    color: msg.isSender ? 'rgba(255,255,255,0.7)' : '#65676b',
                    textAlign: msg.isSender ? 'right' : 'left'
                  }}>{msg.time}</div>
                </div>
              </div>
            ))}
          </div>

          <div style={styles.inputDock}>
            <button style={styles.dockAddBtn}>+</button>
            <input 
              type="text" 
              placeholder="Type a message..." 
              value={typedMessage}
              onChange={(e) => setTypedMessage(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              style={styles.dockInput} 
            />
            <button style={styles.dockIconBtn}>😊</button>
            <button style={styles.dockIconBtn} onClick={handleSendMessage}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#6a4bfa" strokeWidth="2"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
            </button>
          </div>
        </div>
      )}

      {/* 3. USER PROFILE SCREEN */}
      {currentScreen === 'profile' && (
        <div style={styles.screenContainer}>
          <div style={styles.header}>
            <button style={styles.iconButton} onClick={() => setCurrentScreen('chat')}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
            </button>
            <div style={{ width: 24 }}></div>
          </div>

          <div style={styles.profileHero}>
            <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300" alt="Emily" style={styles.largeAvatar} />
            <h3 style={styles.profileName}>Emily Johnson</h3>
            <span style={styles.profileStatus}>Online</span>
          </div>

          <div style={styles.profileActionsRow}>
            <div style={styles.profileActionItem}><span>📞</span><label style={styles.profileActionLabel}>Voice Call</label></div>
            <div style={styles.profileActionItem}><span>📹</span><label style={styles.profileActionLabel}>Video Call</label></div>
            <div style={styles.profileActionItem}><span>🔔</span><label style={styles.profileActionLabel}>Mute</label></div>
            <div style={styles.profileActionItem}><span>···</span><label style={styles.profileActionLabel}>More</label></div>
          </div>

          <div style={styles.settingsGroup}>
            <div style={styles.settingsHeaderRow}>
              <span style={{ fontWeight: '600' }}>Media, files and links</span>
              <span style={{ color: '#65676b', fontSize: 13 }}>12 ❯</span>
            </div>
            <div style={styles.mediaGrid}>
              <img src="https://images.unsplash.com/photo-1511556532299-8f662fc26c06?w=150" alt="media" style={styles.mediaThumb} />
              <img src="https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=150" alt="media" style={styles.mediaThumb} />
              <img src="https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=150" alt="media" style={styles.mediaThumb} />
            </div>
          </div>

          <div style={{ ...styles.settingsGroup, padding: 0 }}>
            <div style={styles.settingItemRow}>
              <span>Block User</span>
              <span style={{ color: '#ff3b30' }}>❌</span>
            </div>
            <div style={{ ...styles.settingItemRow, border: 'none' }}>
              <span>Report User</span>
              <span style={{ color: '#ff3b30' }}>🚩</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  appWrapper: {
    backgroundColor: '#000000',
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif'
  },
  screenContainer: {
    width: '100%',
    maxWidth: '425px',
    height: '100vh',
    backgroundColor: '#ffffff',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    overflow: 'hidden'
  },
  header: {
    height: '64px',
    padding: '0 16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottom: '1px solid #f1f3f4',
    backgroundColor: '#ffffff',
    zIndex: 10
  },
  iconButton: {
    background: 'none',
    border: 'none',
    padding: '8px',
    cursor: 'pointer',
    color: '#0f1419',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  headerTitle: {
    fontSize: '20px',
    fontWeight: '700',
    color: '#0f1419',
    margin: 0
  },
  searchBarWrapper: {
    padding: '8px 16px',
    display: 'flex',
    gap: '12px'
  },
  searchBar: {
    flex: 1,
    backgroundColor: '#f1f3f4',
    borderRadius: '20px',
    padding: '0 14px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  },
  searchInput: {
    width: '100%',
    border: 'none',
    background: 'none',
    height: '36px',
    outline: 'none',
    fontSize: '14px'
  },
  filterButton: {
    width: '36px',
    height: '36px',
    borderRadius: '50%',
    backgroundColor: '#f1f3f4',
    border: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer'
  },
  chatList: {
    flex: 1,
    overflowY: 'auto',
    padding: '8px 0'
  },
  chatItem: {
    display: 'flex',
    padding: '12px 16px',
    gap: '14px',
    cursor: 'pointer',
    alignItems: 'center',
    transition: 'background-color 0.2s'
  },
  avatar: {
    width: '48px',
    height: '48px',
    borderRadius: '50%',
    objectFit: 'cover'
  },
  chatMeta: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: '4px'
  },
  chatRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  chatName: {
    fontWeight: '600',
    fontSize: '15px',
    color: '#0f1419'
  },
  chatTime: {
    fontSize: '12px',
    color: '#65676b'
  },
  chatPreview: {
    fontSize: '13px',
    color: '#65676b',
    maxWidth: '200px',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  },
  badge: {
    backgroundColor: '#6a4bfa',
    color: '#ffffff',
    fontSize: '11px',
    fontWeight: '600',
    borderRadius: '10px',
    padding: '2px 6px',
    minWidth: '10px',
    textAlign: 'center'
  },
  bottomTabBar: {
    height: '60px',
    borderTop: '1px solid #f1f3f4',
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#ffffff'
  },
  tabItem: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '4px',
    cursor: 'pointer',
    color: '#65676b'
  },
  tabLabel: {
    fontSize: '10px',
    fontWeight: '500'
  },
  headerUserMeta: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    marginLeft: '8px',
    cursor: 'pointer'
  },
  headerAvatar: {
    width: '36px',
    height: '36px',
    borderRadius: '50%',
    objectFit: 'cover'
  },
  headerName: {
    fontWeight: '600',
    fontSize: '15px'
  },
  headerStatus: {
    fontSize: '11px',
    color: '#24b07a',
    fontWeight: '500'
  },
  headerActions: {
    display: 'flex',
    gap: '8px'
  },
  chatFeed: {
    flex: 1,
    overflowY: 'auto',
    backgroundColor: '#ffffff',
    padding: '16px',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  },
  messageRow: {
    display: 'flex',
    width: '100%'
  },
  bubble: {
    maxWidth: '75%',
    padding: '10px 14px',
    fontSize: '14px',
    lineHeight: '1.4',
    position: 'relative'
  },
  bubbleTime: {
    fontSize: '10px',
    marginTop: '4px',
    opacity: 0.8
  },
  voiceWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    minWidth: '160px'
  },
  waveForm: {
    flex: 1,
    height: '2px',
    backgroundColor: '#b5a7ff',
    borderRadius: '1px'
  },
  voiceDuration: {
    fontSize: '11px',
    opacity: 0.9
  },
  callWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    minWidth: '140px'
  },
  inputDock: {
    padding: '12px 16px',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    borderTop: '1px solid #f1f3f4',
    backgroundColor: '#ffffff'
  },
  dockAddBtn: {
    width: '36px',
    height: '36px',
    borderRadius: '50%',
    backgroundColor: '#6a4bfa',
    color: '#ffffff',
    border: 'none',
    fontSize: '20px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  dockInput: {
    flex: 1,
    height: '36px',
    backgroundColor: '#f1f3f4',
    border: 'none',
    borderRadius: '18px',
    padding: '0 14px',
    outline: 'none',
    fontSize: '14px'
  },
  dockIconBtn: {
    background: 'none',
    border: 'none',
    fontSize: '20px',
    cursor: 'pointer',
    padding: '4px'
  },
  profileHero: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '24px 16px',
    borderBottom: '1px solid #f1f3f4'
  },
  largeAvatar: {
    width: '96px',
    height: '96px',
    borderRadius: '50%',
    objectFit: 'cover',
    marginBottom: '12px'
  },
  profileName: {
    fontSize: '20px',
    fontWeight: '700',
    margin: '0 0 4px 0',
    color: '#0f1419'
  },
  profileStatus: {
    fontSize: '13px',
    color: '#24b07a',
    fontWeight: '500'
  },
  profileActionsRow: {
    display: 'flex',
    justifyContent: 'space-around',
    padding: '16px',
    borderBottom: '1px solid #f1f3f4'
  },
  profileActionItem: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '6px',
    cursor: 'pointer',
    fontSize: '18px'
  },
  profileActionLabel: {
    fontSize: '11px',
    color: '#65676b',
    fontWeight: '500'
  },
  settingsGroup: {
    padding: '16px',
    borderBottom: '8px solid #f1f3f4'
  },
  settingsHeaderRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '12px',
    fontSize: '14px'
  },
  mediaGrid: {
    display: 'flex',
    gap: '8px',
    overflowX: 'auto'
  },
  mediaThumb: {
    width: '76px',
    height: '76px',
    borderRadius: '8px',
    objectFit: 'cover'
  },
  settingItemRow: {
    padding: '16px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '1px solid #f1f3f4',
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer'
  }
};
    
