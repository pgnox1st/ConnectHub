import React, { useState, useEffect, useRef } from 'react';

// ========================================================
// 1. ADVANCED CO-PILOT AI ENGINE (NEXUS-AI CONSOLE)
// ========================================================
const getNexusAIResponse = (userMessage, hasImage = false) => {
  const msg = userMessage.toLowerCase().trim();

  if (hasImage) {
    return "File stream decrypted successfully! 📸 Visual structural components analyzed. I can help you compile this template into modern responsive CSS, or write the operational endpoint handlers. Let's design it step-by-step!";
  }
  
  if (msg.includes("hello") || msg.includes("hi") || msg.includes("hey")) {
    return "Welcome to the operational core! I am Nexus-AI, your specialized technical development partner. What interface architecture or operational functions are we deploying today? 🚀";
  }
  
  if (msg.includes("how are you")) {
    return "All server matrices are optimal. Active thread loops are running at peak performance, ready to write clean code alongside you!";
  }

  if (msg.includes("help") || msg.includes("error") || msg.includes("bug")) {
    return "Understood. Drop the execution trace or paste the flawed component logic. We will inspect, isolate, and refactor the bugs immediately. 💻🛠️";
  }

  return `Analysis complete. Regarding: "${userMessage}", we can implement a highly optimized structural routine. Let me know if you require the boilerplate architecture or the exact API fetch calls!`;
};

export default function App() {
  // Navigation Router state: 'register' -> 'login' -> 'otp' -> 'chat-room'
  const [screen, setScreen] = useState('register'); 

  // Input Collection Hooks
  const [regForm, setRegForm] = useState({ email: '', phone: '', password: '' });
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [inputOtp, setInputOtp] = useState('');
  const [generatedOtp, setGeneratedOtp] = useState('');

  // AI Workspace Stream Hooks
  const [chatMessages, setChatMessages] = useState([
    { id: 1, text: "Secure link verified. Nexus-AI Environment fully initialized. Send code instructions or upload UI design screenshots for diagnostic assistance.", sender: 'ai', time: 'Active' }
  ]);
  const [textInput, setTextInput] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [isAiTyping, setIsAiTyping] = useState(false);
  
  const chatBottomRef = useRef(null);

  // Synchronize terminal stream scroll position
  useEffect(() => {
    if (chatBottomRef.current) {
      chatBottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatMessages, isAiTyping]);

  // Request operational system permission for push indicators
  useEffect(() => {
    if ("Notification" in window && Notification.permission === "default") {
      Notification.requestPermission();
    }
  }, []);

  // ========================================================
  // 2. HIGH-FIDELITY COMPACT SWEETALERT & SECURITY CONTROLLERS
  // ========================================================
  
  const fireCompactAlert = (icon, title, text) => {
    window.Swal.fire({
      icon: icon,
      title: title,
      text: text,
      width: '280px', // Matches your shared file configuration perfectly
      confirmButtonColor: '#bc13fe', // Premium Neon Purple theme matching your design
      customClass: {
        popup: 'swal2-popup-small',
        title: 'swal2-title',
        htmlContainer: 'swal2-html-container'
      }
    });
  };

  const validateEmailFormat = (email) => {
    return String(email).toLowerCase().match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  };

  const dispatchPushIndicator = (tokenValue) => {
    if ("Notification" in window && Notification.permission === "granted") {
      new Notification("Nexus Cryptographic Key", {
        body: `Security authentication token issued: ${tokenValue}`,
        icon: "https://upload.wikimedia.org/wikipedia/commons/b/b8/2021_Facebook_icon.svg"
      });
    }
  };

  // Process Permanent Registration inside Browser Storage
  const handleRegister = (e) => {
    e.preventDefault();
    
    if (!validateEmailFormat(regForm.email)) {
      fireCompactAlert('error', 'Error!', 'Enter a valid personal email.');
      return;
    }
    if (regForm.phone.length !== 10 || isNaN(regForm.phone)) {
      fireCompactAlert('info', 'Info!', 'Enter a 10-digit number.');
      return;
    }
    if (regForm.password.length < 6) {
      fireCompactAlert('error', 'Error!', 'Incorrect account password pattern.');
      return;
    }

    // Persisting data securely to prevent wrong password issue on reload
    localStorage.setItem('db_user_email', regForm.email.toLowerCase().trim());
    localStorage.setItem('db_user_password', regForm.password);
    localStorage.setItem('db_user_phone', regForm.phone);

    fireCompactAlert('success', 'Registered!', 'Account configuration synchronized.');
    setScreen('login');
  };

  // Authenticate from LocalStorage credentials
  const handleLogin = (e) => {
    e.preventDefault();

    const storedEmail = localStorage.getItem('db_user_email');
    const storedPassword = localStorage.getItem('db_user_password');

    if (!storedEmail) {
      fireCompactAlert('warning', 'Warning!', 'No system database entry discovered.');
      return;
    }

    const currentInputEmail = loginForm.email.toLowerCase().trim();

    if (currentInputEmail !== storedEmail || loginForm.password !== storedPassword) {
      fireCompactAlert('error', 'Authentication Failed', 'Invalid credentials profile.');
      return;
    }

    // Issue cryptographic 6-Digit security code
    const secureToken = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(secureToken);

    dispatchPushIndicator(secureToken);

    window.Swal.fire({
      icon: 'info',
      title: 'Verification Code',
      html: `A security code has been transmitted.<br><br><span style="font-size: 16px; color: #bc13fe; font-weight: bold; background: rgba(0,0,0,0.4); padding: 4px 12px; border-radius: 6px;">Backup Code: ${secureToken}</span>`,
      width: '280px',
      confirmButtonColor: '#bc13fe'
    });

    setScreen('otp');
  };

  const handleOtpVerification = (e) => {
    e.preventDefault();

    if (inputOtp !== generatedOtp) {
      fireCompactAlert('error', 'Invalid Code', 'The verification token code is incorrect.');
      return;
    }

    fireCompactAlert('success', 'Verified', 'Terminal access authorized.');
    setScreen('chat-room');
  };

  const uploadFileHandler = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setSelectedImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const dispatchUserStream = () => {
    if (!textInput.trim() && !selectedImage) return;

    const stamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const payload = { id: Date.now(), text: textInput, sender: 'user', time: stamp, image: selectedImage };

    setChatMessages(prev => [...prev, payload]);
    
    const contextText = textInput;
    const contextImg = selectedImage;
    
    setTextInput('');
    setSelectedImage(null);

    setIsAiTyping(true);
    setTimeout(() => {
      setIsAiTyping(false);
      const aiResponse = getNexusAIResponse(contextText, !!contextImg);
      const responsePayload = { id: Date.now() + 1, text: aiResponse, sender: 'ai', time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), image: null };
      setChatMessages(prev => [...prev, responsePayload]);
    }, 1200);
  };

  return (
    <div style={styles.bodyWrapper}>
      <div style={styles.backgroundBlurLayer}></div>
      
      {/* HEADER SECTION MATCHING METRICS */}
      <header style={styles.appHeader}>
        <div style={styles.headerLeftBlock}>
          <img src="https://raw.githubusercontent.com/northway656-create/myflaskapp/main/static/icons/garena_full_logo_eyes.png.jpg" style={styles.headerLogo} alt="Logo" />
          <div style={styles.headerDivider}></div>
          <span style={styles.headerTitle}>Official Terminal Integration</span>
        </div>
        <div style={styles.helpBadge} onClick={() => window.open('https://ffsupport.garena.com/', '_blank')}>Help Center</div>
      </header>

      {/* RENDER FORM / MAIN TILES CONTAINER */}
      <div style={styles.mainContentContainer}>
        
        {/* VIEW 1: PREMIUM REGISTRATION CONTAINER */}
        {screen === 'register' && (
          <div style={styles.premiumRewardCard}>
            <h1 style={styles.cardHeaderTitle}>Create Environment Profile</h1>
            <p style={styles.cardHeaderSub}>Configure your cryptographic credentials</p>
            <form onSubmit={handleRegister} style={styles.formLayoutStack}>
              <div style={styles.inputElementWrapper}><input type="email" placeholder="Email Address" value={regForm.email} onChange={e => setRegForm({...regForm, email: e.target.value})} style={styles.nativeStyledInput} required /></div>
              <div style={styles.inputElementWrapper}><input type="tel" placeholder="Mobile Number" value={regForm.phone} onChange={e => setRegForm({...regForm, phone: e.target.value})} maxLength={10} style={styles.nativeStyledInput} required /></div>
              <div style={styles.inputElementWrapper}><input type="password" placeholder="Create System Password" value={regForm.password} onChange={e => setRegForm({...regForm, password: e.target.value})} style={styles.nativeStyledInput} required /></div>
              <button type="submit" style={styles.primaryGradientBtn}>REGISTER ACCOUNT</button>
            </form>
            <p style={styles.toggleFooterText}>Already configured? <span onClick={() => setScreen('login')} style={styles.toggleFooterLink}>Login</span></p>
          </div>
        )}

        {/* VIEW 2: PREMIUM SECURE LOGIN GATEWAY */}
        {screen === 'login' && (
          <div style={styles.premiumRewardCard}>
            <h1 style={styles.cardHeaderTitle}>Secure Verification</h1>
            <p style={styles.cardHeaderSub}>Please enter your configured database credentials</p>
            <form onSubmit={handleLogin} style={styles.formLayoutStack}>
              <div style={styles.inputElementWrapper}><input type="email" placeholder="Email Address" value={loginForm.email} onChange={e => setLoginForm({...loginForm, email: e.target.value})} style={styles.nativeStyledInput} required /></div>
              <div style={styles.inputElementWrapper}><input type="password" placeholder="Password" value={loginForm.password} onChange={e => setLoginForm({...loginForm, password: e.target.value})} style={styles.nativeStyledInput} required /></div>
              <button type="submit" style={styles.primaryGradientBtn}>VERIFY CREDENTIALS</button>
            </form>
            <p style={styles.toggleFooterText}>Need a setup? <span onClick={() => setScreen('register')} style={styles.toggleFooterLink}>Register Profile</span></p>
          </div>
        )}

        {/* VIEW 3: COMPACT 6-DIGIT TOKEN INPUT SECTION */}
        {screen === 'otp' && (
          <div style={styles.premiumRewardCard}>
            <h1 style={styles.cardHeaderTitle}>Verification Token</h1>
            <p style={styles.cardHeaderSub}>Provide the 6-digit cryptographic security code</p>
            <form onSubmit={handleOtpVerification} style={styles.formLayoutStack}>
              <div style={styles.inputElementWrapper}>
                <input type="text" placeholder="••••••" value={inputOtp} onChange={e => setInputOtp(e.target.value)} maxLength={6} style={{ ...styles.nativeStyledInput, textAlign: 'center', fontSize: '22px', letterSpacing: '8px', color: '#bc13fe' }} required />
              </div>
              <button type="submit" style={styles.primaryGradientBtn}>VALIDATE & CLAIM ACCESS</button>
            </form>
          </div>
        )}

        {/* VIEW 4: ULTRA HIGH-FIDELITY CHAT WORKSPACE (NEXUS TERMINAL) */}
        {screen === 'chat-room' && (
          <div style={styles.chatWorkspaceContainer}>
            <div style={styles.workspaceHeader}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={styles.glowingTealStatusDot}></div>
                <div>
                  <b style={{ fontSize: '15px', color: '#ffffff' }}>Nexus-AI Terminal Panel</b>
                  <span style={{ fontSize: '11px', color: '#00a884', display: 'block' }}>Operational Synchronized Pipeline</span>
                </div>
              </div>
              <button onClick={() => setScreen('login')} style={styles.headerDisconnectBtn}>Disconnect</button>
            </div>

            <div style={styles.terminalChatCanvas}>
              {chatMessages.map(msg => (
                <div key={msg.id} style={{ ...styles.messageBubbleNode, alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start', backgroundColor: msg.sender === 'user' ? '#005c4b' : 'rgba(255,255,255,0.06)', border: msg.sender === 'user' ? 'none' : '1px solid rgba(255,255,255,0.08)' }}>
                  <span style={{ fontSize: '10px', fontWeight: 'bold', marginBottom: '6px', color: msg.sender === 'user' ? '#00a884' : '#bc13fe', display: 'block' }}>
                    {msg.sender === 'user' ? 'Developer' : 'Nexus-AI Copilot'}
                  </span>
                  {msg.image && <img src={msg.image} alt="Stream Attachment" style={styles.embeddedBubbleAsset} />}
                  <div style={{ fontSize: '14px', lineHeight: '1.5', color: '#ffffff', wordBreak: 'break-word' }}>{msg.text}</div>
                  <div style={styles.bubbleMessageTime}>{msg.time}</div>
                </div>
              ))}
              {isAiTyping && (
                <div style={{ ...styles.messageBubbleNode, alignSelf: 'flex-start', backgroundColor: 'rgba(255,255,255,0.04)', color: '#bc13fe', fontStyle: 'italic', fontSize: '13px' }}>
                  Nexus-AI is interpreting system data modules...🛡️
                </div>
              )}
              <div ref={chatBottomRef} />
            </div>

            {selectedImage && (
              <div style={styles.fileUploadPreviewBar}>
                <img src={selectedImage} alt="Buffer Attachment" style={styles.thumbnailPreviewImg} />
                <button onClick={() => setSelectedImage(null)} style={styles.cancelAttachmentBtn}>Purge File Context ✕</button>
              </div>
            )}

            <div style={styles.workspaceInputDock}>
              <label style={styles.customFileBtnLabel}>
                📁 Photo
                <input type="file" accept="image/*" onChange={uploadFileHandler} style={{ display: 'none' }} />
              </label>
              <input type="text" placeholder="Execute request command line or ask queries..." value={textInput} onChange={e => setTextInput(e.target.value)} onKeyPress={e => e.key === 'Enter' && dispatchUserStream()} style={styles.dockInputField} />
              <button onClick={dispatchUserStream} style={styles.dockSendBtn}>Send</button>
            </div>
          </div>
        )}

      </div>

      {/* FOOTER METRICS AND LAYOUT MATCH */}
      <footer style={styles.appFooter}>
        <img src="https://raw.githubusercontent.com/northway656-create/myflaskapp/main/static/icons/free-fire-logo.jpg.jpg" style={styles.footerBrandLogo} alt="Garena Support" />
        <div style={styles.footerTextBlock}>
          <p>Copyright © Garena International Environment.</p>
          <p>System operational frameworks and trademarks belong to their absolute owners.</p>
        </div>
      </footer>
    </div>
  );
}

// ========================================================
// 3. EXTREME HIGH-FIDELITY NEON-DARK STYLE MATRIX
// ========================================================
const styles = {
  bodyWrapper: {
    width: '100vw',
    height: '100vh',
    backgroundColor: '#050a18',
    color: '#ffffff',
    fontFamily: '"Roboto", "Segoe UI", sans-serif',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: 0,
    overflow: 'hidden'
  },
  backgroundBlurLayer: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: "url('https://raw.githubusercontent.com/northway656-create/myflaskapp/main/5e2003ebfaf9ed29a40dc2f5db3a8aad%20(1).jpg') no-repeat center top",
    backgroundSize: 'cover',
    filter: 'brightness(0.22) contrast(1.1)',
    zIndex: -1
  },
  appHeader: {
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.96)',
    padding: '0 20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '55px',
    borderBottom: '1px solid rgba(0,0,0,0.08)',
    boxShadow: '0 2px 10px rgba(0,0,0,0.2)'
  },
  headerLeftBlock: {
    display: 'flex',
    alignItems: 'center'
  },
  headerLogo: {
    height: '26px',
    objectFit: 'contain'
  },
  headerDivider: {
    width: '1px',
    height: '24px',
    backgroundColor: '#e0e0e0',
    margin: '0 15px'
  },
  headerTitle: {
    color: '#222222',
    fontSize: '14px',
    fontWeight: '500'
  },
  helpBadge: {
    backgroundColor: '#bc13fe',
    color: '#ffffff',
    padding: '6px 14px',
    borderRadius: '4px',
    fontSize: '11px',
    fontWeight: '700',
    cursor: 'pointer'
  },
  mainContentContainer: {
    flex: 1,
    width: '100%',
    maxWidth: '420px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0 15px'
  },
  premiumRewardCard: {
    background: 'rgba(255, 255, 255, 0.07)',
    backdropFilter: 'blur(30px)',
    WebkitBackdropFilter: 'blur(30px)',
    border: '1px solid rgba(255, 255, 255, 0.12)',
    borderRadius: '20px',
    padding: '30px 25px',
    width: '100%',
    boxShadow: '0 15px 35px rgba(0,0,0,0.4)',
    textAlign: 'center'
  },
  cardHeaderTitle: {
    fontSize: '19px',
    fontWeight: '800',
    color: '#bc13fe',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    margin: '0 0 4px 0'
  },
  cardHeaderSub: {
    fontSize: '13.5px',
    color: 'rgba(255, 255, 255, 0.75)',
    margin: '0 0 25px 0'
  },
  formLayoutStack: {
    display: 'flex',
    flexDirection: 'column',
    gap: '14px'
  },
  inputElementWrapper: {
    position: 'relative',
    width: '100%'
  },
  nativeStyledInput: {
    width: '100%',
    background: 'rgba(0, 0, 0, 0.35)',
    border: '1px solid rgba(255, 255, 255, 0.16)',
    color: '#ffffff',
    borderRadius: '10px',
    padding: '14px',
    fontSize: '14px',
    outline: 'none',
    boxSizing: 'border-box'
  },
  primaryGradientBtn: {
    width: '100%',
    background: 'linear-gradient(135deg, #bc13fe, #7a0bc0)',
    color: '#ffffff',
    fontWeight: '700',
    textTransform: 'uppercase',
    border: 'none',
    borderRadius: '10px',
    padding: '16px',
    cursor: 'pointer',
    fontSize: '13.5px',
    letterSpacing: '0.5px',
    boxShadow: '0 4px 15px rgba(188, 19, 254, 0.25)',
    marginTop: '6px'
  },
  toggleFooterText: {
    fontSize: '13px',
    color: 'rgba(255,255,255,0.6)',
    marginTop: '22px',
    marginBottom: 0
  },
  toggleFooterLink: {
    color: '#bc13fe',
    cursor: 'pointer',
    fontWeight: '600',
    textDecoration: 'underline'
  },
  chatWorkspaceContainer: {
    width: '100vw',
    maxWidth: '850px',
    height: '82vh',
    background: 'rgba(17, 27, 33, 0.85)',
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '16px',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    boxShadow: '0 25px 55px rgba(0,0,0,0.6)'
  },
  workspaceHeader: {
    height: '65px',
    backgroundColor: 'rgba(32, 44, 51, 0.95)',
    padding: '0 20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '1px solid rgba(255,255,255,0.06)'
  },
  glowingTealStatusDot: {
    width: '10px',
    height: '10px',
    backgroundColor: '#00a884',
    borderRadius: '50%',
    boxShadow: '0 0 10px #00a884'
  },
  headerDisconnectBtn: {
    background: 'none',
    border: '1px solid #ea0038',
    color: '#ea0038',
    padding: '6px 14px',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '12.5px',
    fontWeight: '600'
  },
  terminalChatCanvas: {
    flex: 1,
    overflowY: 'auto',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    gap: '14px',
    backgroundColor: '#0b141a'
  },
  messageBubbleNode: {
    maxWidth: '70%',
    padding: '12px 16px',
    borderRadius: '10px',
    boxShadow: '0 2px 5px rgba(0,0,0,0.2)'
  },
  embeddedBubbleAsset: {
    maxWidth: '100%',
    maxHeight: '180px',
    borderRadius: '6px',
    marginBottom: '8px',
    display: 'block'
  },
  bubbleMessageTime: {
    fontSize: '9.5px',
    color: 'rgba(255,255,255,0.35)',
    textAlign: 'right',
    marginTop: '6px'
  },
  fileUploadPreviewBar: {
    padding: '10px 20px',
    backgroundColor: '#1f2c34',
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
    borderTop: '1px solid rgba(255,255,255,0.06)'
  },
  thumbnailPreviewImg: {
    width: '45px',
    height: '45px',
    objectFit: 'cover',
    borderRadius: '4px',
    border: '1px solid #bc13fe'
  },
  cancelAttachmentBtn: {
    backgroundColor: 'transparent',
    border: 'none',
    color: '#ea0038',
    cursor: 'pointer',
    fontSize: '12.5px'
  },
  workspaceInputDock: {
    padding: '14px 20px',
    backgroundColor: 'rgba(32, 44, 51, 0.95)',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    borderTop: '1px solid rgba(255,255,255,0.06)'
  },
  customFileBtnLabel: {
    backgroundColor: 'rgba(255,255,255,0.06)',
    border: '1px solid rgba(255,255,255,0.1)',
    color: '#ffffff',
    padding: '12px 16px',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '13.5px',
    fontWeight: '600'
  },
  dockInputField: {
    flex: 1,
    padding: '12px 16px',
    borderRadius: '8px',
    border: 'none',
    backgroundColor: '#2a3942',
    color: '#ffffff',
    outline: 'none',
    fontSize: '14.5px'
  },
  dockSendBtn: {
    backgroundColor: '#bc13fe',
    color: '#ffffff',
    border: 'none',
    padding: '12px 22px',
    borderRadius: '8px',
    fontWeight: 'bold',
    cursor: 'pointer',
    fontSize: '14px',
    boxShadow: '0 2px 10px rgba(188, 19, 254, 0.3)'
  },
  appFooter: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '12px',
    padding: '15px 15px 25px'
  },
  footerBrandLogo: {
    height: '24px',
    width: 'auto',
    objectFit: 'contain'
  },
  footerTextBlock: {
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'left',
    fontSize: '9px',
    color: '#ffffff',
    opacity: 0.4,
    lineHeight: '1.4'
  }
};
      
