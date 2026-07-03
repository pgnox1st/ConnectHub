import React, { useState, useEffect, useRef } from 'react';

// ========================================================
// 1. INTELLIGENT AI ENGINE (NEXUS-AI) WITH IMAGE SUPPORT
// ========================================================
const getNexusAIResponse = (userMessage, hasImage = false) => {
  const msg = userMessage.toLowerCase().trim();

  if (hasImage) {
    return "I have analyzed the image/screenshot you shared! 📸 It looks like a great layout. Tell me, do you want to modify its CSS styling, add responsiveness, or connect it to an API? I'm ready to help you build it step-by-step!";
  }
  
  if (msg.includes("hello") || msg.includes("hi") || msg.includes("hey")) {
    return "Hey there! I am Nexus-AI, your development copilot. I can help you write code, design UI, and fix bugs. What amazing feature are we building today? 🚀";
  }
  
  if (msg.includes("how are you")) {
    return "I'm running at peak performance! Fully optimized and ready to assist you. How is your project coding going?";
  }

  if (msg.includes("help") || msg.includes("error") || msg.includes("bug")) {
    return "Don't worry! Share the error message or paste the code snippet here. We will debug it together step-by-step just like a pro team. 💻🛠️";
  }

  if (msg.includes("clear") || msg.includes("reset")) {
    return "Understood. Let's start fresh! Tell me your requirements.";
  }

  return `Interesting query! Regarding "${userMessage}", we can implement this effectively. Do you want me to generate the functional React components or structure the database model for this? Let me know! ⚡`;
};

export default function SecureAiApp() {
  // Navigation States: 'register' -> 'login' -> 'otp' -> 'chat-room'
  const [screen, setScreen] = useState('register'); 
  
  // Simulated Database Local State
  const [registeredUser, setRegisteredUser] = useState(null);

  // Form Input States
  const [regForm, setRegForm] = useState({ email: '', phone: '', password: '' });
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [inputOtp, setInputOtp] = useState('');
  const [generatedOtp, setGeneratedOtp] = useState('');

  // Chat Room States
  const [chatMessages, setChatMessages] = useState([
    { id: 1, text: "System Booted. Hello! I am Nexus-AI, your dedicated assistant. You can chat with me, upload designs/images, and ask any coding or layout help!", sender: 'ai', time: 'Just Now', image: null }
  ]);
  const [textInput, setTextInput] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [isAiTyping, setIsAiTyping] = useState(false);
  
  const chatBottomRef = useRef(null);

  // Request Notification Permission on Load
  useEffect(() => {
    if ("Notification" in window && Notification.permission === "default") {
      Notification.requestPermission();
    }
  }, []);

  // Auto Scroll Chat
  useEffect(() => {
    if (chatBottomRef.current) {
      chatBottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatMessages, isAiTyping]);

  // ========================================================
  // 2. VALIDATION & SECURITY HANDLERS
  // ========================================================
  
  const validateEmail = (email) => {
    return String(email).toLowerCase().match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  };

  // Trigger Real System Push Notification
  const triggerRealNotification = (otpCode) => {
    if ("Notification" in window && Notification.permission === "granted") {
      new Notification("Nexus Security Alert", {
        body: `Your Secure 6-Digit Verification OTP is: ${otpCode}`,
        icon: "https://cdn-icons-png.flaticon.com/512/891/891399.png"
      });
    }
  };

  // Step A: Registration Submit
  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    
    if (!validateEmail(regForm.email)) {
      window.Swal.fire({ icon: 'error', title: 'Invalid Email!', text: 'Please enter a valid email address.', confirmButtonColor: '#ea0038' });
      return;
    }
    if (regForm.phone.length !== 10 || isNaN(regForm.phone)) {
      window.Swal.fire({ icon: 'error', title: 'Invalid Phone!', text: 'Phone number must be exactly 10 digits.', confirmButtonColor: '#ea0038' });
      return;
    }
    if (regForm.password.length < 6) {
      window.Swal.fire({ icon: 'error', title: 'Weak Password!', text: 'Password must be at least 6 characters long.', confirmButtonColor: '#ea0038' });
      return;
    }

    setRegisteredUser({ ...regForm });
    window.Swal.fire({ icon: 'success', title: 'Account Created!', text: 'Registration successful. Please login now.', confirmButtonColor: '#00a884', timer: 2000 });
    setScreen('login');
  };

  // Step B: Login Submit & Trigger OTP
  const handleLoginSubmit = (e) => {
    e.preventDefault();

    if (!registeredUser) {
      window.Swal.fire({ icon: 'warning', title: 'No Record Found!', text: 'Please register an account first.', confirmButtonColor: '#ffb300' });
      return;
    }

    if (loginForm.email !== registeredUser.email || loginForm.password !== registeredUser.password) {
      window.Swal.fire({ icon: 'error', title: 'Incorrect Credentials!', text: 'The email or password you entered is incorrect.', confirmButtonColor: '#ea0038' });
      return;
    }

    // Generate Random 6-Digit OTP
    const newOtp = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(newOtp);

    // Trigger both Web Push Notification and SweetAlert Backup View
    triggerRealNotification(newOtp);

    window.Swal.fire({
      icon: 'info',
      title: 'Security OTP Sent!',
      html: `A 6-digit OTP code has been sent via system notification to your device.<br><br><span style="font-size: 18px; color: #00a884; font-weight: bold;">(Fallback Display: ${newOtp})</span>`,
      confirmButtonColor: '#00a884'
    });

    setScreen('otp');
  };

  // Step C: Verify 6-Digit OTP
  const handleVerifyOtpSubmit = (e) => {
    e.preventDefault();

    if (inputOtp !== generatedOtp) {
      window.Swal.fire({ icon: 'error', title: 'Incorrect OTP!', text: 'The 6-digit verification token is invalid. Please check your notifications and try again.', confirmButtonColor: '#ea0038' });
      return;
    }

    window.Swal.fire({ icon: 'success', title: 'Access Granted!', text: 'Welcome to Nexus-AI Terminal Panel.', confirmButtonColor: '#00a884', timer: 2000 });
    setScreen('chat-room');
  };

  // Handle Image Selection
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

  // Step D: Message Dispatch with Image
  const handleSendMessage = () => {
    if (!textInput.trim() && !selectedImage) return;

    const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const userMsgNode = { 
      id: Date.now(), 
      text: textInput, 
      sender: 'user', 
      time: currentTime,
      image: selectedImage 
    };

    setChatMessages(prev => [...prev, userMsgNode]);
    
    const cachedText = textInput;
    const cachedImage = selectedImage;
    
    setTextInput('');
    setSelectedImage(null);

    // Simulate AI Processing Output Delay
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
    }, 1500);
  };

  return (
    <div style={styles.appWrapper}>
      
      {/* 1. REGISTER CARD */}
      {screen === 'register' && (
        <div style={styles.authCard}>
          <h2 style={styles.title}>Create Account</h2>
          <p style={styles.subtitle}>Join Nexus-AI Secure System Portal</p>
          <form onSubmit={handleRegisterSubmit} style={styles.form}>
            <input type="email" placeholder="Email Address" value={regForm.email} onChange={e => setRegForm({...regForm, email: e.target.value})} style={styles.input} required />
            <input type="tel" placeholder="10-Digit Mobile Number" value={regForm.phone} onChange={e => setRegForm({...regForm, phone: e.target.value})} maxLength={10} style={styles.input} required />
            <input type="password" placeholder="Create Password" value={regForm.password} onChange={e => setRegForm({...regForm, password: e.target.value})} style={styles.input} required />
            <button type="submit" style={styles.btn}>Register ➔</button>
          </form>
          <p style={styles.toggleText}>Already have an account? <span onClick={() => setScreen('login')} style={styles.link}>Login</span></p>
        </div>
      )}

      {/* 2. LOGIN CARD */}
      {screen === 'login' && (
        <div style={styles.authCard}>
          <h2 style={styles.title}>Secure Login Gateway</h2>
          <p style={styles.subtitle}>Provide your registered credentials</p>
          <form onSubmit={handleLoginSubmit} style={styles.form}>
            <input type="email" placeholder="Enter Registered Email" value={loginForm.email} onChange={e => setLoginForm({...loginForm, email: e.target.value})} style={styles.input} required />
            <input type="password" placeholder="Enter Password" value={loginForm.password} onChange={e => setLoginForm({...loginForm, password: e.target.value})} style={styles.input} required />
            <button type="submit" style={styles.btn}>Verify & Request OTP</button>
          </form>
          <p style={styles.toggleText}>Need a new account? <span onClick={() => setScreen('register')} style={styles.link}>Register Here</span></p>
        </div>
      )}

      {/* 3. 6-DIGIT OTP CARD */}
      {screen === 'otp' && (
        <div style={styles.authCard}>
          <h2 style={styles.title}>Enter Safety Token</h2>
          <p style={styles.subtitle}>Check your device notifications for the 6-digit OTP</p>
          <form onSubmit={handleVerifyOtpSubmit} style={styles.form}>
            <input type="text" placeholder="------" value={inputOtp} onChange={e => setInputOtp(e.target.value)} maxLength={6} style={{ ...styles.input, textAlign: 'center', fontSize: '24px', letterSpacing: '8px', color: '#00a884' }} required />
            <button type="submit" style={styles.btn}>Validate OTP Token ✅</button>
          </form>
        </div>
      )}

      {/* 4. UPGRADED NEXUS-AI WORKSPACE INTERFACE */}
      {screen === 'chat-room' && (
        <div style={styles.chatContainer}>
          {/* Header Bar */}
          <div style={styles.chatHeader}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={styles.statusDot}></div>
              <div>
                <b style={{ fontSize: '16px', color: '#ffffff' }}>Nexus-AI Workspace Terminal</b>
                <span style={{ fontSize: '12px', color: '#00a884', display: 'block' }}>Active Help Agent Mode</span>
              </div>
            </div>
            <button onClick={() => { setScreen('login'); setChatMessages([chatMessages[0]]); }} style={styles.logoutBtn}>Disconnect ✕</button>
          </div>

          {/* Chat Canvas Area */}
          <div style={styles.chatCanvas}>
            {chatMessages.map(msg => (
              <div key={msg.id} style={{ ...styles.msgBubble, alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start', backgroundColor: msg.sender === 'user' ? '#005c4b' : '#202c33' }}>
                <span style={{ fontSize: '11px', fontWeight: 'bold', marginBottom: '6px', color: msg.sender === 'user' ? '#00a884' : '#34b7f1', display: 'block' }}>
                  {msg.sender === 'user' ? 'You' : 'Nexus-AI (Assistant)'}
                </span>
                
                {/* Image rendering inside bubble if sent */}
                {msg.image && <img src={msg.image} alt="uploaded content" style={styles.previewImageInBubble} />}
                
                <div style={{ fontSize: '14.5px', lineHeight: '1.5', color: '#ffffff' }}>{msg.text}</div>
                <div style={styles.msgTime}>{msg.time}</div>
              </div>
            ))}
            {isAiTyping && (
              <div style={{ ...styles.msgBubble, alignSelf: 'flex-start', backgroundColor: '#202c33', color: '#00a884' }}>
                Nexus-AI is analyzing data...⏳
              </div>
            )}
            <div ref={chatBottomRef} />
          </div>

          {/* Image Upload Preview Row */}
          {selectedImage && (
            <div style={styles.previewRow}>
              <img src={selectedImage} alt="Attachment Preview" style={styles.uploadThumbnail} />
              <button onClick={() => setSelectedImage(null)} style={styles.removeImgBtn}>Cancel Attachment ✕</button>
            </div>
          )}

          {/* Input Sending Console */}
          <div style={styles.chatInputFooter}>
            <label style={styles.imageUploadLabel}>
              📁 Image
              <input type="file" accept="image/*" onChange={handleImageChange} style={{ display: 'none' }} />
            </label>
            <input type="text" placeholder="Ask Nexus-AI anything or upload a file context..." value={textInput} onChange={e => setTextInput(e.target.value)} onKeyPress={e => e.key === 'Enter' && handleSendMessage()} style={styles.mainInputField} />
            <button onClick={handleSendMessage} style={styles.sendIconBtn}>Send</button>
          </div>
        </div>
      )}

    </div>
  );
}

// ========================================================
// 3. CLEAN DARK INDUSTRIAL DESIGN ARCHITECTURE
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
    padding: '40px',
    borderRadius: '12px',
    width: '100%',
    maxWidth: '380px',
    textAlign: 'center',
    boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
  },
  title: {
    fontSize: '24px',
    color: '#ffffff',
    margin: '0 0 8px 0'
  },
  subtitle: {
    fontSize: '13px',
    color: '#8696a0',
    margin: '0 0 24px 0'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px'
  },
  input: {
    padding: '14px',
    borderRadius: '8px',
    border: '1px solid #2a3942',
    backgroundColor: '#2a3942',
    color: '#ffffff',
    fontSize: '15px',
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
    fontSize: '15px',
    cursor: 'pointer',
    transition: 'background 0.2s'
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
    maxWidth: '900px',
    height: '90vh',
    backgroundColor: '#111b21',
    border: '1px solid #222e35',
    borderRadius: '12px',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden'
  },
  chatHeader: {
    height: '70px',
    backgroundColor: '#202c33',
    padding: '0 20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '1px solid rgba(0,0,0,0.2)'
  },
  statusDot: {
    width: '12px',
    height: '12px',
    backgroundColor: '#00a884',
    borderRadius: '50%'
  },
  logoutBtn: {
    background: 'none',
    border: '1px solid #ea0038',
    color: '#ea0038',
    padding: '6px 14px',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '13px'
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
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
  },
  previewImageInBubble: {
    maxWidth: '100%',
    maxHeight: '200px',
    borderRadius: '6px',
    marginBottom: '8px',
    display: 'block'
  },
  msgTime: {
    fontSize: '10px',
    color: 'rgba(255,255,255,0.4)',
    textAlign: 'right',
    marginTop: '6px'
  },
  previewRow: {
    padding: '10px 20px',
    backgroundColor: '#1f2c34',
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
    borderTop: '1px solid #2a3942'
  },
  uploadThumbnail: {
    width: '50px',
    height: '50px',
    objectFit: 'cover',
    borderRadius: '4px',
    border: '1px solid #00a884'
  },
  removeImgBtn: {
    backgroundColor: 'transparent',
    border: 'none',
    color: '#ea0038',
    cursor: 'pointer',
    fontSize: '13px'
  },
  chatInputFooter: {
    padding: '16px 20px',
    backgroundColor: '#202c33',
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  },
  imageUploadLabel: {
    backgroundColor: '#2a3942',
    color: '#ffffff',
    padding: '12px 16px',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '14px',
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
    fontSize: '15px'
  },
  sendIconBtn: {
    backgroundColor: '#00a884',
    color: '#ffffff',
    border: 'none',
    padding: '12px 20px',
    borderRadius: '8px',
    fontWeight: 'bold',
    cursor: 'pointer'
  }
};
                   
