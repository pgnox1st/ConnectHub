import React, { useState, useEffect, useRef } from 'react';

// ========================================================
// 1. INTELLIGENT EXPERT CO-PILOT ENGINE (NEXUS-AI)
// ========================================================
const getNexusAIResponse = (userMessage, hasImage = false) => {
  const msg = userMessage.toLowerCase().trim();

  if (hasImage) {
    return "I have intercepted the image asset metadata. 📸 Visual structural components successfully analyzed. I can compile this directly into responsive CSS or set up backend handlers for you step-by-step!";
  }
  
  if (msg.includes("hello") || msg.includes("hi") || msg.includes("hey")) {
    return "System fully operational. Hello! I am Nexus-AI, your dedicated development copilot. What amazing layout or feature are we building today? 🚀";
  }
  
  if (msg.includes("error") || msg.includes("bug") || msg.includes("help")) {
    return "Don't worry! Share the complete error trace or paste the snippet here. We will debug it step-by-step together like a pro team. 💻🛠️";
  }

  return `Interesting requirement! Regarding "${userMessage}", we can implement an optimized framework. Should I generate the state logic or build out the styling layout first?`;
};

export default function App() {
  // Navigation States: 'register' -> 'login' -> 'otp' -> 'chat-room'
  const [screen, setScreen] = useState('register'); 

  // Form Field Tracking States
  const [regForm, setRegForm] = useState({ email: '', phone: '', password: '' });
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [inputOtp, setInputOtp] = useState('');
  const [generatedOtp, setGeneratedOtp] = useState('');

  // AI Workspace Thread States
  const [chatMessages, setChatMessages] = useState([
    { id: 1, text: "Secure uplink initialized. Hello! I am Nexus-AI, your visual and code logic assistant. You can chat with me, upload designs, and request layout instructions.", sender: 'ai', time: 'Active' }
  ]);
  const [textInput, setTextInput] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [isAiTyping, setIsAiTyping] = useState(false);
  
  const chatBottomRef = useRef(null);

  // Dynamic Library and Style Injector (Replaces index.html manual editing)
  useEffect(() => {
    // 1. Inject SweetAlert2 Stylesheet directly into Document Head
    const swalStyle = document.createElement("link");
    swalStyle.rel = "stylesheet";
    swalStyle.href = "https://cdn.jsdelivr.net/npm/sweetalert2@11/dist/sweetalert2.min.css";
    document.head.appendChild(swalStyle);

    // 2. Inject SweetAlert2 Core Script directly into Document Head
    const swalScript = document.createElement("script");
    swalScript.src = "https://cdn.jsdelivr.net/npm/sweetalert2@11";
    swalScript.async = true;
    document.head.appendChild(swalScript);

    // 3. Request system web push permissions
    if ("Notification" in window && Notification.permission === "default") {
      Notification.requestPermission();
    }

    return () => {
      document.head.removeChild(swalStyle);
      document.head.removeChild(swalScript);
    };
  }, []);

  // Auto-scroll chat terminal interface
  useEffect(() => {
    if (chatBottomRef.current) {
      chatBottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatMessages, isAiTyping]);

  // ========================================================
  // 2. HIGH-FIDELITY COMPACT POPUPS & VALIDATION SCHEMES
  // ========================================================
  
  const fireCompactAlert = (icon, title, text) => {
    if (window.Swal) {
      window.Swal.fire({
        icon: icon,
        title: title,
        text: text,
        width: '280px', // Small compact real size requested
        confirmButtonColor: '#bc13fe',
        customClass: {
          popup: 'swal2-popup-small',
          title: 'swal2-title',
          htmlContainer: 'swal2-html-container'
        }
      });
    } else {
      alert(`${title}: ${text}`);
    }
  };

  const validateEmailFormat = (email) => {
    return String(email).toLowerCase().match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  };

  const dispatchRealNotification = (code) => {
    if ("Notification" in window && Notification.permission === "granted") {
      new Notification("Nexus Security Token", {
        body: `Your real system validation code is: ${code}`,
        icon: "https://upload.wikimedia.org/wikipedia/commons/b/b8/2021_Facebook_icon.svg"
      });
    }
  };

  // Step A: Register Account & Save to persistent LocalStorage
  const handleRegisterSubmit = (e) => {
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

    // Prevents dynamic reset of credentials on page reload
    localStorage.setItem('persistent_email', regForm.email.toLowerCase().trim());
    localStorage.setItem('persistent_password', regForm.password);
    localStorage.setItem('persistent_phone', regForm.phone);

    fireCompactAlert('success', 'Registered!', 'Account configuration saved.');
    setScreen('login');
  };

  // Step B: Authenticate login details against LocalStorage records
  const handleLoginSubmit = (e) => {
    e.preventDefault();

    const storedEmail = localStorage.getItem('persistent_email');
    const storedPassword = localStorage.getItem('persistent_password');

    if (!storedEmail) {
      fireCompactAlert('warning', 'Warning!', 'No system record discovered. Please register.');
      return;
    }

    if (loginForm.email.toLowerCase().trim() !== storedEmail || loginForm.password !== storedPassword) {
      fireCompactAlert('error', 'Error!', 'Incorrect account password pattern.');
      return;
    }

    // Generate real 6-digit random code
    const tokenCode = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(tokenCode);

    // Call browser notifications
    dispatchRealNotification(tokenCode);

    if (window.Swal) {
      window.Swal.fire({
        icon: 'info',
        title: 'Verification Code',
        html: `A security code has been sent to your tray.<br><br><span style="font-size: 16px; color: #bc13fe; font-weight: bold; background: rgba(0,0,0,0.3); padding: 4px 10px; border-radius: 6px;">Backup: ${tokenCode}</span>`,
        width: '280px',
        confirmButtonColor: '#bc13fe'
      });
    }

    setScreen('otp');
  };

  // Step C: Validate security token code
  const handleVerifyOtpSubmit = (e) => {
    e.preventDefault();

    if (inputOtp !== generatedOtp) {
      fireCompactAlert('error', 'Error!', 'Incorrect account password pattern.');
      return;
    }

    fireCompactAlert('success', 'Access Granted', 'Terminal network synchronized.');
    setScreen('chat-room');
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setSelectedImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  // Step D: Broadcast message context stream to Nexus-AI
  const handleSendMessage = () => {
    if (!textInput.trim() && !selectedImage) return;

    const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const userPayload = { id: Date.now(), text: textInput, sender: 'user', time: currentTime, image: selectedImage };

    setChatMessages(prev => [...prev, userPayload]);
    
    const textSnapshot = textInput;
    const imageSnapshot = selectedImage;
    
    setTextInput('');
    setSelectedImage(null);

    setIsAiTyping(true);
    setTimeout(() => {
      setIsAiTyping(false);
      const aiReply = getNexusAIResponse(textSnapshot, !!imageSnapshot);
      const aiPayload = { id: Date.now() + 1, text: aiReply, sender: 'ai', time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), image: null };
      setChatMessages(prev => [...prev, aiPayload]);
    }, 1200);
  };

  // Simulated Game Collection Assets matching your pattern
  const structuralApps = [
    { name: "Free Fire", img: "freefire.png.jpg" },
    { name: "COD Mobile", img: "codm.png.jpg" },
    { name: "Shells", img: "shells.png.jpg" },
    { name: "AOV", img: "aov.png.jpg" },
    { name: "Undawn", img: "hero-banner.jpg.jpg" },
    { name: "SPEED", img: "speed.png.jpg" },
    { name: "Haikyu!!", img: "haikyu.png.jpg" },
    { name: "Delta Force", img: "delta.png.jpg" }
  ];

  return (
    <div style={styles.pageBodyWrapper}>
      <div style={styles.backgroundCoverImage}></div>
      
      {/* ADAPTIVE HEADER SYSTEM */}
      <header style={styles.siteHeader}>
        <div style={styles.headerLeftBlock}>
          <img src="https://raw.githubusercontent.com/northway656-create/myflaskapp/main/static/icons/garena_full_logo_eyes.png.jpg" style={styles.brandLogoAsset} alt="Logo" />
          <div style={styles.headerVerticalLine}></div>
          <span style={styles.headerTitleText}>Official Top Up Center</span>
        </div>
        <div style={styles.helpCenterBtn} onClick={() => window.open('https://ffsupport.garena.com/', '_blank')}>Help Center</div>
      </header>

      {/* CORE FRAMEWORK WORKSPACE */}
      <div style={styles.mainLayoutContainer}>
        
        {/* PREMIUM RENDERED GAME GRID (VISIBLE ON LOGIN/REGISTER SECTIONS) */}
        {screen !== 'chat-room' && (
          <div style={styles.gridContainerRow}>
            {structuralApps.map((app, index) => (
              <div key={index} style={styles.gridGameItem}>
                <img src={`https://raw.githubusercontent.com/northway656-create/myflaskapp/main/static/icons/${app.img}`} style={styles.gridItemThumbnail} alt={app.name} />
                <p style={styles.gridItemLabelText}>{app.name}</p>
              </div>
            ))}
          </div>
        )}

        {/* SCREEN 1: REGISTER COMPONENT CARD */}
        {screen === 'register' && (
          <div style={styles.glassmorphicCard}>
            <h1 style={styles.cardMainHeading}>Rewards Redemption Site</h1>
            <p style={styles.cardSubText}>Please register your secure portal profile.</p>
            <form onSubmit={handleRegisterSubmit} style={styles.flexFormStack}>
              <input type="email" placeholder="Email Address" value={regForm.email} onChange={e => setRegForm({...regForm, email: e.target.value})} style={styles.darkInputText} required />
              <input type="tel" placeholder="Mobile Number" value={regForm.phone} onChange={e => setRegForm({...regForm, phone: e.target.value})} maxLength={10} style={styles.darkInputText} required />
              <input type="password" placeholder="Password Setup" value={regForm.password} onChange={e => setRegForm({...regForm, password: e.target.value})} style={styles.darkInputText} required />
              <button type="submit" style={styles.neonPurpleBtn}>CREATE ACCOUNT</button>
            </form>
            <p style={styles.authToggleFooter}>Already configured? <span onClick={() => setScreen('login')} style={styles.authToggleLink}>Login</span></p>
          </div>
        )}

        {/* SCREEN 2: LOGIN COMPONENT CARD */}
        {screen === 'login' && (
          <div style={styles.glassmorphicCard}>
            <h1 style={styles.cardMainHeading}>Rewards Redemption Site</h1>
            <p style={styles.cardSubText}>Please log in to your developer environment.</p>
            <form onSubmit={handleLoginSubmit} style={styles.flexFormStack}>
              <input type="email" placeholder="Email Address" value={loginForm.email} onChange={e => setLoginForm({...loginForm, email: e.target.value})} style={styles.darkInputText} required />
              <input type="password" placeholder="Account Password" value={loginForm.password} onChange={e => setLoginForm({...loginForm, password: e.target.value})} style={styles.darkInputText} required />
              <button type="submit" style={styles.neonPurpleBtn}>LOG IN NOW</button>
            </form>
            <p style={styles.authToggleFooter}>Need an environment account? <span onClick={() => setScreen('register')} style={styles.authToggleLink}>Register Here</span></p>
          </div>
        )}

        {/* SCREEN 3: HIGH-FIDELITY COMPACT VERIFICATION CARD */}
        {screen === 'otp' && (
          <div style={styles.glassmorphicCard}>
            <h1 style={styles.cardMainHeading}>Verification Code</h1>
            <p style={styles.cardSubText}>A secure authorization key has been transmitted to your device.</p>
            <form onSubmit={handleVerifyOtpSubmit} style={styles.flexFormStack}>
              <input type="text" placeholder="••••••" value={inputOtp} onChange={e => setInputOtp(e.target.value)} maxLength={6} style={{ ...styles.darkInputText, textAlign: 'center', fontSize: '22px', letterSpacing: '8px', color: '#bc13fe' }} required />
              <button type="submit" style={styles.neonPurpleBtn}>VERIFY & CLAIM</button>
            </form>
          </div>
        )}

        {/* SCREEN 4: ADVANCED CHAT ROOM ENVIRONMENT TERMINAL */}
        {screen === 'chat-room' && (
          <div style={styles.terminalContainerDock}>
            <div style={styles.terminalHeader}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={styles.tealStatusIndicatorDot}></div>
                <div>
                  <b style={{ fontSize: '15px', color: '#ffffff' }}>Nexus-AI Hub Console</b>
                  <span style={{ fontSize: '11px', color: '#00a884', display: 'block' }}>Operational Development Engine</span>
                </div>
              </div>
              <button onClick={() => setScreen('login')} style={styles.terminalDisconnectBtn}>Disconnect Terminal</button>
            </div>

            <div style={styles.terminalChatViewport}>
              {chatMessages.map(msg => (
                <div key={msg.id} style={{ ...styles.messageBubbleCell, alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start', backgroundColor: msg.sender === 'user' ? '#005c4b' : 'rgba(255,255,255,0.06)', border: msg.sender === 'user' ? 'none' : '1px solid rgba(255,255,255,0.08)' }}>
                  <span style={{ fontSize: '10px', fontWeight: 'bold', marginBottom: '5px', color: msg.sender === 'user' ? '#00a884' : '#bc13fe', display: 'block' }}>
                    {msg.sender === 'user' ? 'Developer Profile' : 'Nexus-AI System'}
                  </span>
                  {msg.image && <img src={msg.image} alt="User asset stream" style={styles.bubbleEmbeddedAsset} />}
                  <div style={{ fontSize: '14px', lineHeight: '1.5', color: '#ffffff', wordBreak: 'break-word' }}>{msg.text}</div>
                  <div style={styles.bubbleTimestamp}>{msg.time}</div>
                </div>
              ))}
              {isAiTyping && (
                <div style={{ ...styles.messageBubbleCell, alignSelf: 'flex-start', backgroundColor: 'rgba(255,255,255,0.04)', color: '#bc13fe', fontStyle: 'italic', fontSize: '13px' }}>
                  Nexus-AI compiling layout data matrices...🚀
                </div>
              )}
              <div ref={chatBottomRef} />
            </div>

            {selectedImage && (
              <div style={styles.thumbnailContextBar}>
                <img src={selectedImage} alt="Attachment Buffer" style={styles.contextThumbImg} />
                <button onClick={() => setSelectedImage(null)} style={styles.purgeContextBtn}>Purge File Context ✕</button>
              </div>
            )}

            <div style={styles.terminalInputDock}>
              <label style={styles.fileLabelBtn}>
                📁 Photo
                <input type="file" accept="image/*" onChange={handleFileChange} style={{ display: 'none' }} />
              </label>
              <input type="text" placeholder="Type a layout instruction or communicate queries..." value={textInput} onChange={e => setTextInput(e.target.value)} onKeyPress={e => e.key === 'Enter' && handleSendMessage()} style={styles.terminalMainInputField} />
              <button onClick={handleSendMessage} style={styles.terminalSendBtn}>Send</button>
            </div>
          </div>
        )}

      </div>

      {/* FOOTER AREA MATCHING THE FLASK SPECIFICATIONS */}
      <footer style={styles.siteFooter}>
        <img src="https://raw.githubusercontent.com/northway656-create/myflaskapp/main/static/icons/free-fire-logo.jpg.jpg" style={styles.footerBrandLogoAsset} alt="Footer Logo" />
        <div style={styles.footerTextBlock}>
          <p>Copyright © Garena International Environment System.</p>
          <p>Trademarks belong to their respective execution owners. All rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
}

// ========================================================
// 3. CLEAN INDUSTRIAL GLASS-NEON DESIGN MATRICES
// ========================================================
const styles = {
  pageBodyWrapper: {
    width: '100vw',
    height: '100vh',
    backgroundColor: '#050a18',
    color: '#ffffff',
    fontFamily: '"Roboto", sans-serif',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: 0,
    overflow: 'hidden'
  },
  backgroundCoverImage: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: "url('https://raw.githubusercontent.com/northway656-create/myflaskapp/main/5e2003ebfaf9ed29a40dc2f5db3a8aad%20(1).jpg') no-repeat center top",
    backgroundSize: 'cover',
    filter: 'brightness(0.25)',
    zIndex: -1
  },
  siteHeader: {
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    padding: '0 15px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '55px',
    borderBottom: '1px solid rgba(0,0,0,0.05)',
    zIndex: 10
  },
  headerLeftBlock: {
    display: 'flex',
    alignItems: 'center'
  },
  brandLogoAsset: {
    height: '28px',
    objectFit: 'contain'
  },
  headerVerticalLine: {
    width: '1px',
    height: '24px',
    backgroundColor: '#e0e0e0',
    margin: '0 12px'
  },
  headerTitleText: {
    color: '#333333',
    fontSize: '14px',
    fontWeight: '500'
  },
  helpCenterBtn: {
    backgroundColor: '#bc13fe',
    color: '#ffffff',
    padding: '6px 14px',
    borderRadius: '4px',
    fontSize: '11px',
    fontWeight: '700',
    cursor: 'pointer'
  },
  mainLayoutContainer: {
    flex: 1,
    width: '100%',
    maxWidth: '400px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0 12px',
    overflowY: 'auto'
  },
  gridContainerRow: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '12px',
    margin: '15px 0',
    width: '100%'
  },
  gridGameItem: {
    textAlign: 'center',
    display: 'block'
  },
  gridItemThumbnail: {
    width: '54px',
    height: '54px',
    borderRadius: '14px',
    border: '1px solid rgba(188, 19, 254, 0.2)',
    objectFit: 'cover'
  },
  gridItemLabelText: {
    fontSize: '9px',
    marginTop: '6px',
    color: 'rgba(255,255,255,0.9)',
    fontWeight: '600',
    textTransform: 'uppercase',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  },
  glassmorphicCard: {
    background: 'rgba(255, 255, 255, 0.07)',
    backdropFilter: 'blur(25px)',
    WebkitBackdropFilter: 'blur(25px)',
    border: '1px solid rgba(255, 255, 255, 0.12)',
    borderRadius: '20px',
    padding: '25px',
    width: '100%',
    boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
    textAlign: 'center',
    marginBottom: '15px'
  },
  cardMainHeading: {
    fontSize: '18px',
    fontWeight: '800',
    color: '#bc13fe',
    textTransform: 'uppercase',
    margin: '0 0 5px 0'
  },
  cardSubText: {
    fontSize: '14px',
    color: 'rgba(255,255,255,0.8)',
    margin: '0 0 25px 0',
    fontWeight: '400'
  },
  flexFormStack: {
    display: 'flex',
    flexDirection: 'column',
    gap: '14px'
  },
  darkInputText: {
    width: '100%',
    background: 'rgba(0, 0, 0, 0.2)',
    border: '1px solid rgba(255, 255, 255, 0.15)',
    color: '#ffffff',
    borderRadius: '10px',
    padding: '14px',
    fontSize: '14px',
    outline: 'none',
    boxSizing: 'border-box'
  },
  neonPurpleBtn: {
    width: '100%',
    background: 'linear-gradient(135deg, #bc13fe, #7a0bc0)',
    color: '#ffffff',
    fontWeight: '700',
    textTransform: 'uppercase',
    border: 'none',
    borderRadius: '10px',
    padding: '16px',
    cursor: 'pointer',
    fontSize: '13.5px'
  },
  authToggleFooter: {
    fontSize: '13px',
    color: 'rgba(255,255,255,0.6)',
    marginTop: '20px',
    marginBottom: 0
  },
  authToggleLink: {
    color: '#bc13fe',
    cursor: 'pointer',
    fontWeight: '600',
    textDecoration: 'underline'
  },
  terminalContainerDock: {
    width: '100vw',
    maxWidth: '850px',
    height: '75vh',
    background: 'rgba(17, 27, 33, 0.9)',
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '16px',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    boxShadow: '0 20px 45px rgba(0,0,0,0.6)',
    margin: '10px 0'
  },
  terminalHeader: {
    height: '65px',
    backgroundColor: '#202c33',
    padding: '0 20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '1px solid rgba(255,255,255,0.06)'
  },
  tealStatusIndicatorDot: {
    width: '10px',
    height: '10px',
    backgroundColor: '#00a884',
    borderRadius: '50%',
    boxShadow: '0 0 8px #00a884'
  },
  terminalDisconnectBtn: {
    background: 'none',
    border: '1px solid #ea0038',
    color: '#ea0038',
    padding: '6px 12px',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '12px',
    fontWeight: '600'
  },
  terminalChatViewport: {
    flex: 1,
    overflowY: 'auto',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    gap: '14px',
    backgroundColor: '#0b141a'
  },
  messageBubbleCell: {
    maxWidth: '70%',
    padding: '12px 16px',
    borderRadius: '10px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.15)'
  },
  bubbleEmbeddedAsset: {
    maxWidth: '100%',
    maxHeight: '180px',
    borderRadius: '6px',
    marginBottom: '8px',
    display: 'block'
  },
  bubbleTimestamp: {
    fontSize: '9px',
    color: 'rgba(255,255,255,0.35)',
    textAlign: 'right',
    marginTop: '5px'
  },
  thumbnailContextBar: {
    padding: '10px 20px',
    backgroundColor: '#1f2c34',
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
    borderTop: '1px solid rgba(255,255,255,0.06)'
  },
  contextThumbImg: {
    width: '45px',
    height: '45px',
    objectFit: 'cover',
    borderRadius: '4px',
    border: '1px solid #bc13fe'
  },
  purgeContextBtn: {
    backgroundColor: 'transparent',
    border: 'none',
    color: '#ea0038',
    cursor: 'pointer',
    fontSize: '12.5px'
  },
  terminalInputDock: {
    padding: '14px 20px',
    backgroundColor: '#202c33',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    borderTop: '1px solid rgba(255,255,255,0.06)'
  },
  fileLabelBtn: {
    backgroundColor: 'rgba(255,255,255,0.06)',
    border: '1px solid rgba(255,255,255,0.1)',
    color: '#ffffff',
    padding: '12px 16px',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '13.5px',
    fontWeight: '600'
  },
  terminalMainInputField: {
    flex: 1,
    padding: '12px 16px',
    borderRadius: '8px',
    border: 'none',
    backgroundColor: '#2a3942',
    color: '#ffffff',
    outline: 'none',
    fontSize: '14.5px'
  },
  terminalSendBtn: {
    backgroundColor: '#bc13fe',
    color: '#ffffff',
    border: 'none',
    padding: '12px 20px',
    borderRadius: '8px',
    fontWeight: 'bold',
    cursor: 'pointer',
    fontSize: '14px',
    boxShadow: '0 2px 10px rgba(188, 19, 254, 0.3)'
  },
  siteFooter: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
    padding: '15px 15px 30px'
  },
  footerBrandLogoAsset: {
    height: '26px',
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
            
