import React, { useState, useEffect, useRef } from 'react';

// ========================================================
// 1. ADVANCED NEXUS-AI EXPERT CO-PILOT ENGINE
// ========================================================
const getNexusAIResponse = (userMessage, hasImage = false) => {
  const msg = userMessage.toLowerCase().trim();

  if (hasImage) {
    return "I have analyzed the provided asset/screenshot. 📸 The UI layout and hierarchy look consistent. If you need me to convert this visual into production-ready Tailwind CSS or responsive flexbox code, just let me know! Let's build it.";
  }
  
  if (msg.includes("hello") || msg.includes("hi") || msg.includes("hey")) {
    return "Hello! I am Nexus-AI, your technical development partner. I am fully synced and ready to generate components, layout strategies, or debug errors. What feature are we integrating next? 🚀";
  }
  
  if (msg.includes("how are you")) {
    return "My core engines are fully optimized and running at peak performance. Ready to write code with you! How is your application development workflow going today?";
  }

  if (msg.includes("help") || msg.includes("error") || msg.includes("bug")) {
    return "I am here to fix this. Paste the complete stack trace or block of code right here. We will refactor it step-by-step to keep the implementation bug-free. 💻🛠️";
  }

  return `Understood. Regarding your query: "${userMessage}", we can implement a highly optimized solution. Should I write the functional business logic components, or do you want me to set up the interface styles for this feature?`;
};

export default function SecureAiApp() {
  // Screen views: 'register' -> 'login' -> 'otp' -> 'chat-room'
  const [screen, setScreen] = useState('register'); 

  // Form Input States
  const [regForm, setRegForm] = useState({ email: '', phone: '', password: '' });
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [inputOtp, setInputOtp] = useState('');
  const [generatedOtp, setGeneratedOtp] = useState('');

  // Chat Terminal States
  const [chatMessages, setChatMessages] = useState([
    { id: 1, text: "System connection established. Hello! I am Nexus-AI, your professional assistant. Send me messages or upload UI designs for step-by-step help.", sender: 'ai', time: 'Online', image: null }
  ]);
  const [textInput, setTextInput] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [isAiTyping, setIsAiTyping] = useState(false);
  
  const chatBottomRef = useRef(null);

  // Auto-scroll chat terminal
  useEffect(() => {
    if (chatBottomRef.current) {
      chatBottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatMessages, isAiTyping]);

  // Request system notification permissions
  useEffect(() => {
    if ("Notification" in window && Notification.permission === "default") {
      Notification.requestPermission();
    }
  }, []);

  // Custom configurations for smaller, modern SweetAlert popups
  const fireCompactAlert = (icon, title, text) => {
    window.Swal.fire({
      icon: icon,
      title: title,
      text: text,
      width: '320px', // Custom compact size requested
      confirmButtonColor: '#00a884',
      customClass: {
        popup: 'compact-swal-popup',
        title: 'compact-swal-title',
        htmlContainer: 'compact-swal-text'
      }
    });
  };

  // Helper utility to test email patterns
  const validateEmail = (email) => {
    return String(email).toLowerCase().match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  };

  // Browser level notification trigger
  const triggerSystemNotification = (otpCode) => {
    if ("Notification" in window && Notification.permission === "granted") {
      new Notification("Security Token", {
        body: `Your secure validation OTP code is: ${otpCode}`,
        icon: "https://cdn-icons-png.flaticon.com/512/891/891399.png"
      });
    }
  };

  // ========================================================
  // 2. BACKEND VALIDATION FUNCTIONALITIES (PERSISTENT VIA LOCALSTORAGE)
  // ========================================================

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    
    if (!validateEmail(regForm.email)) {
      fireCompactAlert('error', 'Invalid Email', 'Please provide a structured email address.');
      return;
    }
    if (regForm.phone.length !== 10 || isNaN(regForm.phone)) {
      fireCompactAlert('error', 'Invalid Phone', 'The phone number must be exactly 10 digits.');
      return;
    }
    if (regForm.password.length < 4) {
      fireCompactAlert('error', 'Weak Password', 'Password must contain at least 4 characters.');
      return;
    }

    // SAVING TO LOCALSTORAGE (This prevents data loss on refresh!)
    localStorage.setItem('nexus_user_email', regForm.email.toLowerCase().trim());
    localStorage.setItem('nexus_user_password', regForm.password);
    localStorage.setItem('nexus_user_phone', regForm.phone);

    fireCompactAlert('success', 'Registered!', 'Account saved successfully. Proceed to login.');
    setScreen('login');
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();

    // RETRIEVING DATA FROM LOCALSTORAGE
    const savedEmail = localStorage.getItem('nexus_user_email');
    const savedPassword = localStorage.getItem('nexus_user_password');
    const savedPhone = localStorage.getItem('nexus_user_phone');

    if (!savedEmail) {
      fireCompactAlert('warning', 'No User Found', 'No record exists. Please register an account.');
      return;
    }

    const currentEnteredEmail = loginForm.email.toLowerCase().trim();

    if (currentEnteredEmail !== savedEmail || loginForm.password !== savedPassword) {
      fireCompactAlert('error', 'Incorrect Credentials', 'The email or password entered does not match our records.');
      return;
    }

    // Generate random 6-digit verification code
    const newOtp = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(newOtp);

    // Call real system notifications
    triggerSystemNotification(newOtp);

    // Popup showing backup display
    window.Swal.fire({
      icon: 'info',
      title: 'OTP Token Dispatched',
      html: `Check your device notification tray.<br><br><span style="font-size: 16px; color: #00a884; font-weight: bold;">Backup View Code: ${newOtp}</span>`,
      width: '320px',
      confirmButtonColor: '#00a884'
    });

    setScreen('otp');
  };

  const handleVerifyOtpSubmit = (e) => {
    e.preventDefault();

    if (inputOtp !== generatedOtp) {
      fireCompactAlert('error', 'Incorrect OTP', 'Verification failed. The token provided is invalid.');
      return;
    }

    fireCompactAlert('success', 'Access Granted', 'Terminal unlocked successfully.');
    setScreen('chat-room');
  };

  // Process selected files
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Dispatch message sequence
  const handleSendMessage = () => {
    if (!textInput.trim() && !selectedImage) return;

    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const userMsgNode = { 
      id: Date.now(), 
      text: textInput, 
      sender: 'user', 
      time: timestamp,
      image: selectedImage 
    };

    setChatMessages(prev => [...prev, userMsgNode]);
    
    const cachedText = textInput;
    const cachedImage = selectedImage;
    
    setTextInput('');
    setSelectedImage(null);

    setIsAiTyping(true);
    setTimeout(() => {
      setIsAiTyping(false);
      const aiResponseText = getNexusAIResponse(cachedText, !!cachedImage);
      const aiMsgNode = { 
        id: Date.now() + 1, 
        text: aiResponseText, 
        sender: 'ai', 
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        image: null
      };
      setChatMessages(prev => [...prev, aiMsgNode]);
    }, 1200);
  };

  return (
    <div style={styles.appWrapper}>
      
      {/* REGISTER TERMINAL CARD */}
      {screen === 'register' && (
        <div style={styles.authCard}>
          <h2 style={styles.title}>Create Account</h2>
          <p style={styles.subtitle}>ConnectHub Dev Production Environment</p>
          <form onSubmit={handleRegisterSubmit} style={styles.form}>
            <input type="email" placeholder="Email Address" value={regForm.email} onChange={e => setRegForm({...regForm, email: e.target.value})} style={styles.input} required />
            <input type="tel" placeholder="10-Digit Mobile Number" value={regForm.phone} onChange={e => setRegForm({...regForm, phone: e.target.value})} maxLength={10} style={styles.input} required />
            <input type="password" placeholder="Create Password" value={regForm.password} onChange={e => setRegForm({...regForm, password: e.target.value})} style={styles.input} required />
            <button type="submit" style={styles.btn}>Register System Account</button>
          </form>
          <p style={styles.toggleText}>Already have an account? <span onClick={() => setScreen('login')} style={styles.link}>Login</span></p>
        </div>
      )}

      {/* LOGIN TERMINAL CARD */}
      {screen === 'login' && (
        <div style={styles.authCard}>
          <h2 style={styles.title}>Secure Login</h2>
          <p style={styles.subtitle}>Enter your saved developer credentials</p>
          <form onSubmit={handleLoginSubmit} style={styles.form}>
            <input type="email" placeholder="Email Address" value={loginForm.email} onChange={e => setLoginForm({...loginForm, email: e.target.value})} style={styles.input} required />
            <input type="password" placeholder="Enter Password" value={loginForm.password} onChange={e => setLoginForm({...loginForm, password: e.target.value})} style={styles.input} required />
            <button type="submit" style={styles.btn}>Verify Credentials & Request OTP</button>
          </form>
          <p style={styles.toggleText}>Need an environment account? <span onClick={() => setScreen('register')} style={styles.link}>Register Here</span></p>
        </div>
      )}

      {/* SECURITY OTP VALDIATION CARD */}
      {screen === 'otp' && (
        <div style={styles.authCard}>
          <h2 style={styles.title}>Validate Token</h2>
          <p style={styles.subtitle}>Enter the 6-digit system generated verification code</p>
          <form onSubmit={handleVerifyOtpSubmit} style={styles.form}>
            <input type="text" placeholder="------" value={inputOtp} onChange={e => setInputOtp(e.target.value)} maxLength={6} style={{ ...styles.input, textAlign: 'center', fontSize: '24px', letterSpacing: '8px', color: '#00a884' }} required />
            <button type="submit" style={styles.btn}>Verify OTP Security Key</button>
          </form>
        </div>
      )}

      {/* PREMIUM HIGH-FIDELITY CHAT ENVIRONMENT */}
      {screen === 'chat-room' && (
        <div style={styles.chatContainer}>
          <div style={styles.chatHeader}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={styles.statusDot}></div>
              <div>
                <b style={{ fontSize: '15px', color: '#ffffff' }}>Nexus-AI Hub Terminal</b>
                <span style={{ fontSize: '12px', color: '#00a884', display: 'block' }}>Operational Help Agent Mode</span>
              </div>
            </div>
            <button onClick={() => setScreen('login')} style={styles.logoutBtn}>Disconnect</button>
          </div>

          <div style={styles.chatCanvas}>
            {chatMessages.map(msg => (
              <div key={msg.id} style={{ ...styles.msgBubble, alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start', backgroundColor: msg.sender === 'user' ? '#005c4b' : '#202c33' }}>
                <span style={{ fontSize: '11px', fontWeight: 'bold', marginBottom: '6px', color: msg.sender === 'user' ? '#00a884' : '#34b7f1', display: 'block' }}>
                  {msg.sender === 'user' ? 'You' : 'Nexus-AI (Assistant)'}
                </span>
                {msg.image && <img src={msg.image} alt="user attachment" style={styles.bubbleImg} />}
                <div style={{ fontSize: '14.5px', lineHeight: '1.5', color: '#ffffff', wordBreak: 'break-word' }}>{msg.text}</div>
                <div style={styles.msgTime}>{msg.time}</div>
              </div>
            ))}
            {isAiTyping && (
              <div style={{ ...styles.msgBubble, alignSelf: 'flex-start', backgroundColor: '#202c33', color: '#00a884' }}>
                Nexus-AI is analyzing structural components...⚡
              </div>
            )}
            <div ref={chatBottomRef} />
          </div>

          {selectedImage && (
            <div style={styles.previewRow}>
              <img src={selectedImage} alt="Preview Attachment" style={styles.previewThumb} />
              <button onClick={() => setSelectedImage(null)} style={styles.cancelImgBtn}>Remove Image Attachment ✕</button>
            </div>
          )}

          <div style={styles.chatInputFooter}>
            <label style={styles.fileUploadLabel}>
              📁 Photo
              <input type="file" accept="image/*" onChange={handleImageChange} style={{ display: 'none' }} />
            </label>
            <input type="text" placeholder="Type a message or execute code commands..." value={textInput} onChange={e => setTextInput(e.target.value)} onKeyPress={e => e.key === 'Enter' && handleSendMessage()} style={styles.mainInputField} />
            <button onClick={handleSendMessage} style={styles.sendButton}>Send</button>
          </div>
        </div>
      )}

    </div>
  );
}

// ========================================================
// 3. HIGH-FIDELITY LUXURY DARK ARCHITECTURE STYLES
// ========================================================
const styles = {
  appWrapper: {
    width: '100vw',
    height: '100vh',
    backgroundColor: '#0b141a',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
    margin: 0,
    overflow: 'hidden'
  },
  authCard: {
    backgroundColor: '#111b21',
    border: '1px solid #222e35',
    padding: '35px',
    borderRadius: '12px',
    width: '100%',
    maxWidth: '360px',
    textAlign: 'center',
    boxShadow: '0 12px 40px rgba(0,0,0,0.6)'
  },
  title: {
    fontSize: '22px',
    color: '#ffffff',
    margin: '0 0 6px 0',
    fontWeight: '600'
  },
  subtitle: {
    fontSize: '13px',
    color: '#8696a0',
    margin: '0 0 24px 0'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '14px'
  },
  input: {
    padding: '14px',
    borderRadius: '8px',
    border: '1px solid #2a3942',
    backgroundColor: '#2a3942',
    color: '#ffffff',
    fontSize: '14.5px',
    outline: 'none',
    boxSizing: 'border-box',
    width: '100%'
  },
  btn: {
    backgroundColor: '#00a884',
    color: '#ffffff',
    border: 'none',
    padding: '14px',
    borderRadius: '8px',
    fontWeight: 'bold',
    fontSize: '14.5px',
    cursor: 'pointer',
    marginTop: '6px'
  },
  toggleText: {
    fontSize: '13px',
    color: '#8696a0',
    marginTop: '20px'
  },
  link: {
    color: '#00a884',
    cursor: 'pointer',
    textDecoration: 'underline'
  },
  chatContainer: {
    width: '100%',
    maxWidth: '920px',
    height: '92vh',
    backgroundColor: '#111b21',
    border: '1px solid #222e35',
    borderRadius: '12px',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    boxShadow: '0 20px 50px rgba(0,0,0,0.7)'
  },
  chatHeader: {
    height: '65px',
    backgroundColor: '#202c33',
    padding: '0 20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '1px solid #222e35'
  },
  statusDot: {
    width: '10px',
    height: '10px',
    backgroundColor: '#00a884',
    borderRadius: '50%',
    boxShadow: '0 0 6px #00a884'
  },
  logoutBtn: {
    background: 'none',
    border: '1px solid #ea0038',
    color: '#ea0038',
    padding: '6px 14px',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '12.5px',
    fontWeight: '600'
  },
  chatCanvas: {
    flex: 1,
    overflowY: 'auto',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    gap: '14px',
    backgroundColor: '#0b141a'
  },
  msgBubble: {
    maxWidth: '65%',
    padding: '12px 16px',
    borderRadius: '8px',
    boxShadow: '0 1px 2px rgba(0,0,0,0.2)'
  },
  bubbleImg: {
    maxWidth: '100%',
    maxHeight: '180px',
    borderRadius: '6px',
    marginBottom: '8px',
    display: 'block'
  },
  msgTime: {
    fontSize: '10px',
    color: 'rgba(255,255,255,0.35)',
    textAlign: 'right',
    marginTop: '5px'
  },
  previewRow: {
    padding: '10px 20px',
    backgroundColor: '#1f2c34',
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
    borderTop: '1px solid #2a3942'
  },
  previewThumb: {
    width: '45px',
    height: '45px',
    objectFit: 'cover',
    borderRadius: '4px',
    border: '1px solid #00a884'
  },
  cancelImgBtn: {
    backgroundColor: 'transparent',
    border: 'none',
    color: '#ea0038',
    cursor: 'pointer',
    fontSize: '12.5px'
  },
  chatInputFooter: {
    padding: '14px 20px',
    backgroundColor: '#202c33',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    borderTop: '1px solid #222e35'
  },
  fileUploadLabel: {
    backgroundColor: '#2a3942',
    color: '#ffffff',
    padding: '12px 16px',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '13.5px',
    fontWeight: '600'
  },
  mainInputField: {
    flex: 1,
    padding: '12px 16px',
    borderRadius: '8px',
    border: 'none',
    backgroundColor: '#2a3942',
    color: '#ffffff',
    outline: 'none',
    fontSize: '14.5px'
  },
  sendButton: {
    backgroundColor: '#00a884',
    color: '#ffffff',
    border: 'none',
    padding: '12px 20px',
    borderRadius: '8px',
    fontWeight: 'bold',
    cursor: 'pointer',
    fontSize: '14px'
  }
};
        
