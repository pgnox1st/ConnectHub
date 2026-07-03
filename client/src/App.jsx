import React, { useState, useEffect, useRef } from 'react';

// ========================================================
// 1. MOCK DATABASE (शुरुआती डेटा)
// ========================================================
const INITIAL_CHATS = {
  1: {
    id: 1, name: "Emily Johnson", status: "online", phone: "+1 555-0192", email: "emily@connecthub.com",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150",
    messages: [
      { id: 101, text: "Hey! Did you check the new update?", time: "09:30 AM", sender: "inbound" },
      { id: 102, text: "Yes, looks premium! 🔥", time: "09:32 AM", sender: "outbound" }
    ]
  },
  2: {
    id: 2, name: "Liam Davis", status: "offline", phone: "+1 555-0143", email: "liam@connecthub.com",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150",
    messages: [
      { id: 103, text: "Please send the project video snippet.", time: "Yesterday", sender: "inbound" }
    ]
  }
};

export default function WhatsAppProApp() {
  // Navigation & Screen States
  const [screen, setScreen] = useState('auth'); // 'auth', 'otp', 'main', 'settings'
  const [activeTab, setActiveTab] = useState('chats'); // 'chats', 'status', 'calls'
  const [selectedChatId, setSelectedChatId] = useState(1);
  const [currentSettingTab, setCurrentSettingTab] = useState('profile');

  // Auth States
  const [authForm, setAuthForm] = useState({ email: '', phone: '', password: '' });
  const [otpInput, setOtpInput] = useState('');
  
  // User Profile State
  const [myProfile, setMyProfile] = useState({
    name: "John Doe",
    phone: "+91 9876543210",
    email: "johndoe@gmail.com",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150",
    statusBio: "Hey there! I am using ConnectHub."
  });

  // App Settings States
  const [privacySettings, setPrivacySettings] = useState({ lastSeen: 'Everyone', profilePhoto: 'Everyone', blockedCount: 0 });
  const [chatSettings, setChatSettings] = useState({ theme: 'dark', wallpaper: 'default', fontSize: 'Medium' });

  // Chat Engine States
  const [chats, setChats] = useState(INITIAL_CHATS);
  const [msgInput, setMsgInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [mediaFile, setMediaFile] = useState(null);

  const msgEndRef = useRef(null);

  useEffect(() => {
    if (msgEndRef.current) {
      msgEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chats, screen, isTyping]);

  // ========================================================
  // 2. LOGIC HANDLERS (सिस्टम फंक्शन्स)
  // ========================================================
  const handleAuthSubmit = (e) => {
    e.preventDefault();
    if (!authForm.email || !authForm.phone) {
      alert("कृपया ईमेल और मोबाइल नंबर दर्ज करें!");
      return;
    }
    // OTP स्क्रीन पर भेजें (सिमुलेशन)
    setScreen('otp');
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    if (otpInput === '1234') { // Mock OTP Code
      setMyProfile(prev => ({ ...prev, email: authForm.email, phone: authForm.phone }));
      setScreen('main');
    } else {
      alert("गलत OTP! टेस्ट करने के लिए '1234' डालें।");
    }
  };

  const handleSendMessage = () => {
    if (!msgInput.trim() && !mediaFile) return;

    const timeString = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    const newMsg = {
      id: Date.now(),
      text: msgInput || "📸 [मीडिया फ़ाइल भेजी गई]",
      time: timeString,
      sender: "outbound",
      mediaUrl: mediaFile ? mediaFile.url : null,
      mediaType: mediaFile ? mediaFile.type : null
    };

    setChats(prev => ({
      ...prev,
      [selectedChatId]: {
        ...prev[selectedChatId],
        messages: [...prev[selectedChatId].messages, newMsg]
      }
    }));

    setMsgInput('');
    setMediaFile(null);

    // ऑटोमैटिक एआई/बॉट रिप्लाई सिमुलेशन
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      const replyTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      const botMsg = {
        id: Date.now() + 1,
        text: "आपका मीडिया और मैसेज मिल गया है! सिस्टम सुचारू रूप से काम कर रहा है। 👍",
        time: replyTime,
        sender: "inbound"
      };
      setChats(prev => ({
        ...prev,
        [selectedChatId]: {
          ...prev[selectedChatId],
          messages: [...prev[selectedChatId].messages, botMsg]
        }
      }));
    }, 1500);
  };

  const simulateMediaAttachment = (type) => {
    if (type === 'image') {
      setMediaFile({ type: 'image', url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400' });
    } else {
      setMediaFile({ type: 'video', url: 'video_mock_url' });
    }
  };

  return (
    <div style={{ ...styles.appContainer, backgroundColor: chatSettings.theme === 'dark' ? '#0b141a' : '#f0f2f5', color: chatSettings.theme === 'dark' ? '#ffffff' : '#000000' }}>
      
      {/* ========================================================
          SCREEN: AUTHENTICATION / SIGN UP WITH OTP
          ======================================================== */}
      {screen === 'auth' && (
        <div style={styles.authCard}>
          <h2 style={styles.authTitle}>ConnectHub में आपका स्वागत है</h2>
          <p style={{ color: '#8696a0', fontSize: '14px', marginBottom: '20px' }}>शुरू करने के लिए अपना प्रोफाइल लिंक करें</p>
          <form onSubmit={handleAuthSubmit} style={styles.formLayout}>
            <input type="email" placeholder="ईमेल आईडी दर्ज करें" value={authForm.email} onChange={e => setAuthForm({...authForm, email: e.target.value})} style={styles.authInput} required />
            <input type="tel" placeholder="मोबाइल नंबर (+91...)" value={authForm.phone} onChange={e => setAuthForm({...authForm, phone: e.target.value})} style={styles.authInput} required />
            <input type="password" placeholder="पासवर्ड बनाएं" value={authForm.password} onChange={e => setAuthForm({...authForm, password: e.target.value})} style={styles.authInput} required />
            <button type="submit" style={styles.primaryBtn}>ओटीपी (OTP) भेजें</button>
          </form>
        </div>
      )}

      {screen === 'otp' && (
        <div style={styles.authCard}>
          <h2 style={styles.authTitle}>सुरक्षा सत्यापन (OTP)</h2>
          <p style={{ color: '#8696a0', fontSize: '14px', marginBottom: '20px' }}>आपके ईमेल/मोबाइल पर भेजा गया कोड दर्ज करें। (टेस्ट कोड: 1234)</p>
          <form onSubmit={handleVerifyOtp} style={styles.formLayout}>
            <input type="text" placeholder="4-अंकों का OTP डालें" value={otpInput} onChange={e => setOtpInput(e.target.value)} style={{ ...styles.authInput, textAlign: 'center', letterSpacing: '8px', fontSize: '20px' }} maxLength={4} required />
            <button type="submit" style={styles.primaryBtn}>सत्यापन करें और खोलें</button>
            <button type="button" onClick={() => setScreen('auth')} style={styles.secondaryBtn}>पैक जाएं</button>
          </form>
        </div>
      )}

      {/* ========================================================
          SCREEN: MAIN WHATSAPP INTERFACE
          ======================================================== */}
      {screen === 'main' && (
        <div style={styles.mainLayoutGrid}>
          
          {/* LEFT SIDE PANEL: CHAT LIST & TABS */}
          <div style={{ ...styles.leftPanel, borderRight: chatSettings.theme === 'dark' ? '1px solid #222e35' : '1px solid #e9edef', backgroundColor: chatSettings.theme === 'dark' ? '#111b21' : '#ffffff' }}>
            <div style={styles.panelHeader}>
              <img src={myProfile.avatar} alt="Me" style={styles.myAvatar} onClick={() => setScreen('settings')} title="सेटिंग्स खोलें" />
              <div style={styles.headerActionGroup}>
                <span style={{ cursor: 'pointer', fontSize: '20px' }} onClick={() => setScreen('settings')}>⚙️ Settings</span>
              </div>
            </div>

            {/* Top Navigation Tabs */}
            <div style={styles.tabBarDeck}>
              {['chats', 'status', 'calls'].map(tab => (
                <div key={tab} onClick={() => setActiveTab(tab)} style={{ ...styles.tabItem, color: activeTab === tab ? '#00a884' : '#8696a0', borderBottom: activeTab === tab ? '3px solid #00a884' : 'none' }}>
                  {tab.toUpperCase()}
                </div>
              ))}
            </div>

            {/* Render Lists based on Active Tab */}
            <div style={styles.listScrollContainer}>
              {activeTab === 'chats' && Object.values(chats).map(chat => {
                const lastMsg = chat.messages[chat.messages.length - 1];
                return (
                  <div key={chat.id} onClick={() => setSelectedChatId(chat.id)} style={{ ...styles.chatRowItem, backgroundColor: selectedChatId === chat.id ? (chatSettings.theme === 'dark' ? '#2a3942' : '#f0f2f5') : 'transparent' }}>
                    <img src={chat.avatar} alt={chat.name} style={styles.listAvatar} />
                    <div style={{ flex: 1, overflow: 'hidden' }}>
                      <div style={styles.chatRowMeta}>
                        <span style={{ fontWeight: '600' }}>{chat.name}</span>
                        <span style={{ fontSize: '12px', color: '#8696a0' }}>{lastMsg ? lastMsg.time : ''}</span>
                      </div>
                      <p style={styles.lastMsgPreview}>{lastMsg ? lastMsg.text : 'कोई संदेश नहीं'}</p>
                    </div>
                  </div>
                );
              })}
              {activeTab === 'status' && <div style={{ padding: '20px', color: '#8696a0' }}>कोई स्टेटस अपडेट नहीं है।</div>}
              {activeTab === 'calls' && <div style={{ padding: '20px', color: '#8696a0' }}>आपकी कॉल हिस्ट्री खाली है।</div>}
            </div>
          </div>

          {/* RIGHT SIDE PANEL: LIVE CONVERSATION WINDOW */}
          <div style={styles.rightPanel}>
            {chats[selectedChatId] ? (
              <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                {/* Chat Top Window Bar */}
                <div style={{ ...styles.chatWindowHeader, backgroundColor: chatSettings.theme === 'dark' ? '#111b21' : '#f0f2f5' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <img src={chats[selectedChatId].avatar} alt="Active" style={styles.listAvatar} />
                    <div>
                      <div style={{ fontWeight: '600' }}>{chats[selectedChatId].name}</div>
                      <div style={{ fontSize: '12px', color: '#25d366' }}>{chats[selectedChatId].status}</div>
                    </div>
                  </div>
                </div>

                {/* Message Box Runway View */}
                <div style={{ ...styles.messageViewStage, backgroundImage: chatSettings.wallpaper === 'default' ? 'url("https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png")' : 'none' }}>
                  {chats[selectedChatId].messages.map(m => (
                    <div key={m.id} style={{ ...styles.msgBubble, alignSelf: m.sender === 'outbound' ? 'flex-end' : 'flex-start', backgroundColor: m.sender === 'outbound' ? '#005c4b' : '#202c33' }}>
                      {m.mediaUrl && <img src={m.mediaUrl} alt="Shared Asset" style={styles.embeddedMedia} />}
                      <div>{m.text}</div>
                      <div style={styles.msgTimeMeta}>{m.time}</div>
                    </div>
                  ))}
                  {isTyping && <div style={{ ...styles.msgBubble, alignSelf: 'flex-start', backgroundColor: '#202c33', color: '#00a884' }}>typing...</div>}
                  <div ref={msgEndRef} />
                </div>

                {/* Media Attachment Action Preview Bar */}
                {mediaFile && (
                  <div style={styles.mediaAttachmentPreviewBar}>
                    <span>📸 इमेज फ़ाइल भेजने के लिए तैयार है</span>
                    <button onClick={() => setMediaFile(null)} style={{ background: 'none', border: 'none', color: 'red', cursor: 'pointer' }}>हटाएं</button>
                  </div>
                )}

                {/* Input Controls Footer Dock */}
                <div style={{ ...styles.inputFooterDock, backgroundColor: chatSettings.theme === 'dark' ? '#111b21' : '#f0f2f5' }}>
                  <button onClick={() => simulateMediaAttachment('image')} style={styles.dockIconBtn} title="फोटो अटैच करें">📷</button>
                  <input type="text" placeholder="Type a message..." value={msgInput} onChange={e => setMsgInput(e.target.value)} onKeyPress={e => e.key === 'Enter' && handleSendMessage()} style={styles.mainChatInputField} />
                  <button onClick={handleSendMessage} style={styles.sendSubmitBtn}>➔</button>
                </div>
              </div>
            ) : (
              <div style={styles.emptyStateContainer}>WhatsApp Web की तरह चैट शुरू करने के लिए किसी कांटैक्ट पर क्लिक करें।</div>
            )}
          </div>

        </div>
      )}

      {/* ========================================================
          SCREEN: ADVANCED WHATSAPP SETINGS PANEL
          ======================================================== */}
      {screen === 'settings' && (
        <div style={styles.settingsOverlayPanel}>
          <div style={styles.settingsHeader}>
            <button onClick={() => setScreen('main')} style={styles.settingsBackBtn}>⬅ बैक टू चैट</button>
            <h2>सेटिंग्स (Settings)</h2>
          </div>

          <div style={styles.settingsBodyLayout}>
            {/* Left Settings Sidebar Tabs */}
            <div style={styles.settingsSidebar}>
              <div onClick={() => setCurrentSettingTab('profile')} style={{ ...styles.settingsSideTab, backgroundColor: currentSettingTab === 'profile' ? '#2a3942' : 'transparent' }}>👤 प्रोफाइल सेटिंग्स</div>
              <div onClick={() => setCurrentSettingTab('privacy')} style={{ ...styles.settingsSideTab, backgroundColor: currentSettingTab === 'privacy' ? '#2a3942' : 'transparent' }}>🔒 प्राइवेसी सुरक्षा</div>
              <div onClick={() => setCurrentSettingTab('chats')} style={{ ...styles.settingsSideTab, backgroundColor: currentSettingTab === 'chats' ? '#2a3942' : 'transparent' }}>💬 चैट वॉलपेपर व थीम</div>
            </div>

            {/* Right Active Configuration Node */}
            <div style={styles.settingsContentArea}>
              {currentSettingTab === 'profile' && (
                <div style={styles.settingContentCard}>
                  <h3>आपका प्रोफाइल</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', alignItems: 'center' }}>
                    <img src={myProfile.avatar} alt="Profile Large" style={styles.largeProfilePreviewAvatar} />
                    <input type="text" value={myProfile.name} onChange={e => setMyProfile({...myProfile, name: e.target.value})} style={styles.authInput} placeholder="नाम बदलें" />
                    <input type="text" value={myProfile.statusBio} onChange={e => setMyProfile({...myProfile, statusBio: e.target.value})} style={styles.authInput} placeholder="स्टेटस बायो" />
                    <div style={{ alignSelf: 'flex-start', width: '100%', fontSize: '14px', color: '#8696a0' }}>
                      <p>🔒 लिंक्ड मोबाइल नंबर: {myProfile.phone}</p>
                      <p>📧 लिंक्ड ईमेल: {myProfile.email}</p>
                    </div>
                  </div>
                </div>
              )}

              {currentSettingTab === 'privacy' && (
                <div style={styles.settingContentCard}>
                  <h3>प्राइवेसी सेटिंग्स</h3>
                  <label style={styles.settingLabelOptionRow}>
                    <span>Last Seen कौन देख सकता है:</span>
                    <select value={privacySettings.lastSeen} onChange={e => setPrivacySettings({...privacySettings, lastSeen: e.target.value})} style={styles.settingSelectDropdown}>
                      <option>Everyone</option>
                      <option>My Contacts</option>
                      <option>Nobody</option>
                    </select>
                  </label>
                  <label style={styles.settingLabelOptionRow}>
                    <span>प्रोफ़ाइल फ़ोटो प्राइवेसी:</span>
                    <select value={privacySettings.profilePhoto} onChange={e => setPrivacySettings({...privacySettings, profilePhoto: e.target.value})} style={styles.settingSelectDropdown}>
                      <option>Everyone</option>
                      <option>My Contacts</option>
                      <option>Nobody</option>
                    </select>
                  </label>
                  <div style={{ marginTop: '20px', padding: '10px', background: '#202c33', borderRadius: '6px', fontSize: '14px' }}>
                    🚫 ब्लॉक किए गए कॉन्टैक्ट्स की संख्या: <b>{privacySettings.blockedCount}</b>
                  </div>
                </div>
              )}

              {currentSettingTab === 'chats' && (
                <div style={styles.settingContentCard}>
                  <h3>चैट और डिस्प्ले सेटिंग्स</h3>
                  <label style={styles.settingLabelOptionRow}>
                    <span>एप्लीकेशन थीम चुनें:</span>
                    <select value={chatSettings.theme} onChange={e => setChatSettings({...chatSettings, theme: e.target.value})} style={styles.settingSelectDropdown}>
                      <option value="dark">डार्क मोड (Dark Theme)</option>
                      <option value="light">लाइट मोड (Light Theme)</option>
                    </select>
                  </label>
                  <label style={styles.settingLabelOptionRow}>
                    <span>टेक्स्ट का फॉन्ट साइज:</span>
                    <select value={chatSettings.fontSize} onChange={e => setChatSettings({...chatSettings, fontSize: e.target.value})} style={styles.settingSelectDropdown}>
                      <option>Small</option>
                      <option>Medium</option>
                      <option>Large</option>
                    </select>
                  </label>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

// ========================================================
// 3. WHATSAPP PREMIUM STYLING ARCHITECTURE
// ========================================================
const styles = {
  appContainer: {
    width: '100vw',
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
    overflow: 'hidden',
    margin: 0
  },
  authCard: {
    backgroundColor: '#111b21',
    padding: '40px',
    borderRadius: '12px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
    width: '100%',
    maxWidth: '400px',
    textAlign: 'center',
    color: '#ffffff'
  },
  authTitle: {
    fontSize: '24px',
    fontWeight: '600',
    marginBottom: '10px',
    color: '#00a884'
  },
  formLayout: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px'
  },
  authInput: {
    padding: '12px 16px',
    borderRadius: '8px',
    border: '1px solid #2a3942',
    backgroundColor: '#2a3942',
    color: '#ffffff',
    fontSize: '15px',
    outline: 'none',
    width: '100%',
    boxSizing: 'border-box'
  },
  primaryBtn: {
    backgroundColor: '#00a884',
    color: '#ffffff',
    border: 'none',
    padding: '12px',
    borderRadius: '8px',
    fontWeight: '600',
    cursor: 'pointer',
    fontSize: '16px',
    marginTop: '10px'
  },
  secondaryBtn: {
    background: 'none',
    color: '#8696a0',
    border: 'none',
    cursor: 'pointer',
    fontSize: '14px',
    textDecoration: 'underline'
  },
  mainLayoutGrid: {
    display: 'grid',
    gridTemplateColumns: '350px 1fr',
    width: '100%',
    height: '100%'
  },
  leftPanel: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%'
  },
  panelHeader: {
    height: '60px',
    padding: '10px 16px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#202c33',
    boxSizing: 'border-box'
  },
  myAvatar: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    cursor: 'pointer',
    objectFit: 'cover'
  },
  headerActionGroup: {
    color: '#aebac1',
    fontWeight: '500'
  },
  tabBarDeck: {
    display: 'flex',
    height: '45px',
    backgroundColor: '#111b21',
    borderBottom: '1px solid #222e35'
  },
  tabItem: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    fontWeight: '600',
    fontSize: '13px',
    letterSpacing: '0.5px'
  },
  listScrollContainer: {
    flex: 1,
    overflowY: 'auto'
  },
  chatRowItem: {
    display: 'flex',
    alignItems: 'center',
    padding: '12px 16px',
    gap: '15px',
    cursor: 'pointer',
    borderBottom: '1px solid #222e35',
    transition: 'background 0.2s'
  },
  listAvatar: {
    width: '48px',
    height: '48px',
    borderRadius: '50%',
    objectFit: 'cover'
  },
  chatRowMeta: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '4px',
    color: '#ffffff'
  },
  lastMsgPreview: {
    margin: 0,
    fontSize: '13px',
    color: '#8696a0',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  },
  rightPanel: {
    height: '100%',
    backgroundColor: '#222e35',
    display: 'flex',
    flexDirection: 'column'
  },
  emptyStateContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    color: '#8696a0',
    fontSize: '16px'
  },
  chatWindowHeader: {
    height: '60px',
    padding: '10px 16px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    color: '#ffffff',
    boxSizing: 'border-box'
  },
  messageViewStage: {
    flex: 1,
    overflowY: 'auto',
    padding: '20px 50px',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    backgroundColor: '#0b141a'
  },
  msgBubble: {
    maxWidth: '60%',
    padding: '8px 12px',
    borderRadius: '8px',
    fontSize: '14.5px',
    lineHeight: '1.4',
    color: '#ffffff',
    boxShadow: '0 1px 1px rgba(0,0,0,0.2)'
  },
  msgTimeMeta: {
    fontSize: '10px',
    color: 'rgba(255,255,255,0.6)',
    textAlign: 'right',
    marginTop: '4px'
  },
  embeddedMedia: {
    width: '100%',
    maxHeight: '200px',
    borderRadius: '6px',
    marginBottom: '6px',
    objectFit: 'cover'
  },
  mediaAttachmentPreviewBar: {
    padding: '10px 20px',
    backgroundColor: '#111b21',
    borderTop: '1px solid #222e35',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: '14px',
    color: '#00a884'
  },
  inputFooterDock: {
    padding: '10px 24px',
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
    boxSizing: 'border-box'
  },
  dockIconBtn: {
    background: 'none',
    border: 'none',
    fontSize: '22px',
    cursor: 'pointer'
  },
  mainChatInputField: {
    flex: 1,
    padding: '12px 20px',
    borderRadius: '8px',
    border: 'none',
    backgroundColor: '#2a3942',
    color: '#ffffff',
    outline: 'none',
    fontSize: '15px'
  },
  sendSubmitBtn: {
    background: 'none',
    border: 'none',
    color: '#00a884',
    fontSize: '22px',
    cursor: 'pointer'
  },
  settingsOverlayPanel: {
    width: '100%',
    height: '100%',
    backgroundColor: '#111b21',
    display: 'flex',
    flexDirection: 'column'
  },
  settingsHeader: {
    height: '60px',
    backgroundColor: '#202c33',
    display: 'flex',
    alignItems: 'center',
    padding: '0 20px',
    gap: '30px',
    color: '#ffffff'
  },
  settingsBackBtn: {
    backgroundColor: 'transparent',
    border: 'none',
    color: '#00a884',
    fontSize: '16px',
    cursor: 'pointer',
    fontWeight: '600'
  },
  settingsBodyLayout: {
    display: 'grid',
    gridTemplateColumns: '280px 1fr',
    flex: 1
  },
  settingsSidebar: {
    backgroundColor: '#111b21',
    borderRight: '1px solid #222e35',
    padding: '20px 10px',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px'
  },
  settingsSideTab: {
    padding: '14px 20px',
    borderRadius: '8px',
    color: '#ffffff',
    cursor: 'pointer',
    fontWeight: '500',
    transition: 'background 0.2s'
  },
  settingsContentArea: {
    backgroundColor: '#0b141a',
    padding: '40px'
  },
  settingContentCard: {
    maxWidth: '500px',
    color: '#ffffff'
  },
  largeProfilePreviewAvatar: {
    width: '120px',
    height: '120px',
    borderRadius: '50%',
    objectFit: 'cover',
    border: '3px solid #00a884'
  },
  settingLabelOptionRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
    fontSize: '15px'
  },
  settingSelectDropdown: {
    backgroundColor: '#2a3942',
    color: '#ffffff',
    border: '1px solid #222e35',
    padding: '8px 12px',
    borderRadius: '6px',
    outline: 'none'
  }
};
      
