import React, { useState, useEffect, useRef } from 'react';

// ========================================================
// 1. INTELLIGENT CO-PILOT RESPONSE CORE (NEXUS ENGINE)
// ========================================================
const generateNexusResponse = (userMessage, hasAttachment = false) => {
  const query = userMessage.toLowerCase().trim();

  if (hasAttachment) {
    return "Visual structural asset detected and buffered successfully. 📸 The image schema has been analyzed. I can now compile tailored CSS layout parameters or configure backend schema handlers based on this blueprint.";
  }
  
  if (query.includes("hello") || query.includes("hi") || query.includes("hey") || query.includes("system")) {
    return "Secure uplink fully operational. Hello! I am Nexus-AI, your dedicated technical development co-pilot. What complex systems or premium layouts are we constructing today? 🚀";
  }
  
  if (query.includes("error") || query.includes("bug") || query.includes("fail") || query.includes("help")) {
    return "Understood. Please isolate the error trace or paste the target code snippet directly into this terminal. We will analyze the call stack and debug it systematically. 💻🛠️";
  }

  return `Requirement logged into active system memory. Regarding your instruction: "${userMessage}", we can proceed with an optimized architecture. Should I generate the functional state logic or build out the layout styling matrix first?`;
};

export default function App() {
  // Navigation States: 'register' -> 'login' -> 'otp' -> 'terminal'
  const [currentScreen, setCurrentScreen] = useState('register'); 

  // Form Tracking States
  const [registrationData, setRegistrationData] = useState({ email: '', phone: '', password: '' });
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [enteredOtp, setEnteredOtp] = useState('');
  const [systemGeneratedOtp, setSystemGeneratedOtp] = useState('');

  // Workspace Thread States
  const [terminalHistory, setTerminalHistory] = useState([
    { id: 1, text: "Uplink verified. Welcome to the Nexus-AI Hub terminal. Secure identity logs confirmed. You can transmit structural directives, attach visual layouts, and evaluate code implementations.", sender: 'system', timestamp: 'Active' }
  ]);
  const [textInput, setTextInput] = useState('');
  const [attachedImage, setAttachedImage] = useState(null);
  const [isEngineProcessing, setIsEngineProcessing] = useState(false);
  
  const viewportTerminalBottom = useRef(null);

  // Dynamic Content & Library Injector 
  useEffect(() => {
    // Inject SweetAlert2 Style Sheet Core
    const stylesheetNode = document.createElement("link");
    stylesheetNode.rel = "stylesheet";
    stylesheetNode.href = "https://cdn.jsdelivr.net/npm/sweetalert2@11/dist/sweetalert2.min.css";
    document.head.appendChild(stylesheetNode);

    // Inject SweetAlert2 Script Core
    const scriptNode = document.createElement("script");
    scriptNode.src = "https://cdn.jsdelivr.net/npm/sweetalert2@11";
    scriptNode.async = true;
    document.head.appendChild(scriptNode);

    // Prompt for Web Notification API Permissions
    if ("Notification" in window && Notification.permission === "default") {
      Notification.requestPermission();
    }

    return () => {
      document.head.removeChild(stylesheetNode);
      document.head.removeChild(scriptNode);
    };
  }, []);

  // Track and lock scrolling behavior to the baseline of the terminal viewport
  useEffect(() => {
    if (viewportTerminalBottom.current) {
      viewportTerminalBottom.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [terminalHistory, isEngineProcessing]);

  // ========================================================
  // 2. ALERT VALIDATION & GATEKEEPER INTERCEPTORS
  // ========================================================
  
  const triggerCompactAlert = (statusIcon, headline, description) => {
    if (window.Swal) {
      window.Swal.fire({
        icon: statusIcon,
        title: headline,
        text: description,
        width: '280px', // Exact compact sizing constraint matching specifications
        confirmButtonColor: '#bc13fe',
        background: '#131c2e',
        color: '#ffffff',
        customClass: {
          popup: 'nexus-alert-panel',
          title: 'nexus-alert-title',
          htmlContainer: 'nexus-alert-desc'
        }
      });
    } else {
      alert(`${headline}: ${description}`);
    }
  };

  const dispatchSystemTrayNotification = (token) => {
    if ("Notification" in window && Notification.permission === "granted") {
      new Notification("Security Operations Center", {
        body: `Your access authentication signature token is: ${token}`,
        icon: "https://upload.wikimedia.org/wikipedia/commons/b/b8/2021_Facebook_icon.svg"
      });
    }
  };

  // Action Gate A: Form Validation and User Registration
  const handleRegistrationProcess = (e) => {
    e.preventDefault();
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(registrationData.email)) {
      triggerCompactAlert('error', 'Invalid Input', 'Provide a properly formatted enterprise or personal email address.');
      return;
    }
    if (registrationData.phone.length !== 10 || isNaN(registrationData.phone)) {
      triggerCompactAlert('info', 'Format Notice', 'Phone parameters must consist of an exact 10-digit configuration.');
      return;
    }
    if (registrationData.password.length < 6) {
      triggerCompactAlert('error', 'Security Policy', 'Account credentials must possess a minimum string density of 6 units.');
      return;
    }

    // Write parameters into persistent storage matrices
    localStorage.setItem('nexus_stored_email', registrationData.email.toLowerCase().trim());
    localStorage.setItem('nexus_stored_password', registrationData.password);

    triggerCompactAlert('success', 'Profile Created', 'Credentials secured in active database segment.');
    setCurrentScreen('login');
  };

  // Action Gate B: Authentication Check & Multi-Factor Token Assembly
  const handleLoginProcess = (e) => {
    e.preventDefault();

    const verifiedTargetEmail = localStorage.getItem('nexus_stored_email');
    const verifiedTargetPassword = localStorage.getItem('nexus_stored_password');

    if (!verifiedTargetEmail) {
      triggerCompactAlert('warning', 'Void System', 'No configuration record detected on this cluster. Complete registration.');
      return;
    }

    if (loginData.email.toLowerCase().trim() !== verifiedTargetEmail || loginData.password !== verifiedTargetPassword) {
      triggerCompactAlert('error', 'Auth Failed', 'Credentials mismatched against registered encryption keys.');
      return;
    }

    // Manufacture an un-guessable verification key
    const numericalToken = Math.floor(100000 + Math.random() * 900000).toString();
    setSystemGeneratedOtp(numericalToken);

    // Push token out to external interfaces
    dispatchSystemTrayNotification(numericalToken);

    if (window.Swal) {
      window.Swal.fire({
        icon: 'info',
        title: 'Security Dispatch',
        html: `An authorization key has been appended to your system notification tree.<br><br><span style="font-size: 16px; color: #bc13fe; font-weight: bold; background: rgba(0,0,0,0.4); padding: 5px 12px; border-radius: 6px; letter-spacing: 1px;">Fallback Link: ${numericalToken}</span>`,
        width: '280px',
        confirmButtonColor: '#bc13fe',
        background: '#131c2e',
        color: '#ffffff'
      });
    }

    setCurrentScreen('otp');
  };

  // Action Gate C: Verification Token Assessment
  const handleTokenVerificationProcess = (e) => {
    e.preventDefault();

    if (enteredOtp !== systemGeneratedOtp) {
      triggerCompactAlert('error', 'Access Denied', 'Verification mismatch. Token check evaluated as corrupt.');
      return;
    }

    triggerCompactAlert('success', 'Identity Verified', 'Welcome to your active processing partition.');
    setCurrentScreen('terminal');
  };

  // Action Gate D: Convert File Buffer Data Streams
  const processAssetInput = (e) => {
    const rawAssetFile = e.target.files[0];
    if (rawAssetFile) {
      const systemStreamReader = new FileReader();
      systemStreamReader.onloadend = () => setAttachedImage(systemStreamReader.result);
      systemStreamReader.readAsDataURL(rawAssetFile);
    }
  };

  // Action Gate E: Package Context and Transmit via Network Array
  const dispatchTerminalPayload = () => {
    if (!textInput.trim() && !attachedImage) return;

    const isolatedTimestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const userPayloadFrame = { id: Date.now(), text: textInput, sender: 'user', timestamp: isolatedTimestamp, visualStream: attachedImage };

    setTerminalHistory(prevData => [...prevData, userPayloadFrame]);
    
    const preservedText = textInput;
    const preservedImage = attachedImage;
    
    setTextInput('');
    setAttachedImage(null);

    setIsEngineProcessing(true);
    setTimeout(() => {
      setIsEngineProcessing(false);
      const automatedResponse = generateNexusResponse(preservedText, !!preservedImage);
      const enginePayloadFrame = { id: Date.now() + 1, text: automatedResponse, sender: 'system', timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), visualStream: null };
      setTerminalHistory(prevData => [...prevData, enginePayloadFrame]);
    }, 1300);
  };

  return (
    <div style={uiStyles.mainViewportWrapper}>
      <div style={uiStyles.matrixBackgroundCanvas}></div>
      
      {/* GLOBAL MANAGEMENT NAVIGATION BAR */}
      <header style={uiStyles.navigationBar}>
        <div style={uiStyles.brandingBlock}>
          <div style={uiStyles.brandAccentOrb}></div>
          <span style={uiStyles.brandPrimaryLabel}>NEXUS//<span>CORE</span></span>
        </div>
        <div style={uiStyles.environmentStatusLabel}>Operational Node</div>
      </header>

      {/* CORE FRAMEWORK WORKSPACE */}
      <main style={uiStyles.centerContainerLayout}>
        
        {/* VIEWPORT AREA 1: SECURE SUBSCRIPTION BLOCK */}
        {currentScreen === 'register' && (
          <div style={uiStyles.cyberFormPanel}>
            <h1 style={uiStyles.panelTitleHeader}>System Registration</h1>
            <p style={uiStyles.panelSubtitleText}>Configure profile access parameters below</p>
            <form onSubmit={handleRegistrationProcess} style={uiStyles.formFlexStack}>
              <input type="email" placeholder="Network Identification (Email)" value={registrationData.email} onChange={e => setRegistrationData({...registrationData, email: e.target.value})} style={uiStyles.industrialInputField} required />
              <input type="tel" placeholder="Communication Node (Mobile)" value={registrationData.phone} onChange={e => setRegistrationData({...registrationData, phone: e.target.value})} maxLength={10} style={uiStyles.industrialInputField} required />
              <input type="password" placeholder="Passphrase Matrix" value={registrationData.password} onChange={e => setRegistrationData({...registrationData, password: e.target.value})} style={uiStyles.industrialInputField} required />
              <button type="submit" style={uiStyles.neonExecutionButton}>Deploy Profile Credentials</button>
            </form>
            <p style={uiStyles.navigationInterchangeLink}>System profile configured? <span onClick={() => setCurrentScreen('login')} style={uiStyles.interactiveHighlightSpan}>Authenticate</span></p>
          </div>
        )}

        {/* VIEWPORT AREA 2: VERIFICATION GATE ENTRY */}
        {currentScreen === 'login' && (
          <div style={uiStyles.cyberFormPanel}>
            <h1 style={uiStyles.panelTitleHeader}>Identity Check</h1>
            <p style={uiStyles.panelSubtitleText}>Input core verification markers to initialize token dispatch</p>
            <form onSubmit={handleLoginProcess} style={uiStyles.formFlexStack}>
              <input type="email" placeholder="Network Identification" value={loginData.email} onChange={e => setLoginData({...loginData, email: e.target.value})} style={uiStyles.industrialInputField} required />
              <input type="password" placeholder="Passphrase Key" value={loginData.password} onChange={e => setLoginData({...loginData, password: e.target.value})} style={uiStyles.industrialInputField} required />
              <button type="submit" style={uiStyles.neonExecutionButton}>Request Authorization Token</button>
            </form>
            <p style={uiStyles.navigationInterchangeLink}>Need profile assignment? <span onClick={() => setCurrentScreen('register')} style={uiStyles.interactiveHighlightSpan}>Register Workspace</span></p>
          </div>
        )}

        {/* VIEWPORT AREA 3: TWO-FACTOR KEY INTERCEPTOR */}
        {currentScreen === 'otp' && (
          <div style={uiStyles.cyberFormPanel}>
            <h1 style={uiStyles.panelTitleHeader}>Token Check</h1>
            <p style={uiStyles.panelSubtitleText}>Provide the 6-digit cryptographic security sequence</p>
            <form onSubmit={handleTokenVerificationProcess} style={uiStyles.formFlexStack}>
              <input type="text" placeholder="••••••" value={enteredOtp} onChange={e => setEnteredOtp(e.target.value)} maxLength={6} style={{ ...uiStyles.industrialInputField, textAlign: 'center', fontSize: '24px', letterSpacing: '8px', color: '#bc13fe', fontWeight: 'bold' }} required />
              <button type="submit" style={uiStyles.neonExecutionButton}>Verify Access Token</button>
            </form>
          </div>
        )}

        {/* VIEWPORT AREA 4: HIGH-FIDELITY UNIFIED CO-PILOT WORKSPACE */}
        {currentScreen === 'terminal' && (
          <div style={uiStyles.mainframeChatDock}>
            <div style={uiStyles.dockHeaderControls}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={uiStyles.pulsingGreenNode}></div>
                <div>
                  <b style={{ fontSize: '15px', color: '#ffffff', letterSpacing: '0.5px' }}>Nexus-AI Hub Console</b>
                  <span style={{ fontSize: '11px', color: '#00a884', display: 'block', marginTop: '2px' }}>Active Core Matrix Pipeline</span>
                </div>
              </div>
              <button onClick={() => setCurrentScreen('login')} style={uiStyles.terminalSeverConnectionBtn}>Sever Session Array</button>
            </div>

            {/* Messaging Display Module */}
            <div style={uiStyles.dockLiveViewport}>
              {terminalHistory.map(item => (
                <div key={item.id} style={{ ...uiStyles.messageBubbleCell, alignSelf: item.sender === 'user' ? 'flex-end' : 'flex-start', backgroundColor: item.sender === 'user' ? '#005c4b' : 'rgba(255, 255, 255, 0.05)', border: item.sender === 'user' ? 'none' : '1px solid rgba(255,255,255,0.06)' }}>
                  <span style={{ fontSize: '10px', fontWeight: 'bold', marginBottom: '6px', color: item.sender === 'user' ? '#00a884' : '#bc13fe', display: 'block', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    {item.sender === 'user' ? 'Local Operator' : 'Nexus Engine System'}
                  </span>
                  {item.visualStream && <img src={item.visualStream} alt="System Payload Stream" style={uiStyles.bubbleRenderedImage} />}
                  <div style={{ fontSize: '14.5px', lineHeight: '1.5', color: '#eef2f7', wordBreak: 'break-word' }}>{item.text}</div>
                  <div style={uiStyles.bubbleInternalTime}>{item.timestamp}</div>
                </div>
              ))}
              {isEngineProcessing && (
                <div style={{ ...uiStyles.messageBubbleCell, alignSelf: 'flex-start', backgroundColor: 'rgba(255,255,255,0.02)', color: '#bc13fe', fontStyle: 'italic', fontSize: '13px' }}>
                  Nexus Core processing instructions... ⚙️
                </div>
              )}
              <div ref={viewportTerminalBottom} />
            </div>

            {/* Media Attachment Pre-flight Viewport */}
            {attachedImage && (
              <div style={uiStyles.contextBufferBar}>
                <img src={attachedImage} alt="Attachment Preview" style={uiStyles.bufferThumbnailImage} />
                <button onClick={() => setAttachedImage(null)} style={uiStyles.purgeContextButton}>Flush Attachment Context ✕</button>
              </div>
            )}

            {/* User Interaction Console Bar */}
            <div style={uiStyles.dockUserInteractionConsole}>
              <label style={uiStyles.mediaAttachButtonTrigger}>
                📁 Add Image
                <input type="file" accept="image/*" onChange={processAssetInput} style={{ display: 'none' }} />
              </label>
              <input type="text" placeholder="Transmit systems parameters or query core application logic..." value={textInput} onChange={e => setTextInput(e.target.value)} onKeyPress={e => e.key === 'Enter' && dispatchTerminalPayload()} style={uiStyles.terminalTextEntryField} />
              <button onClick={dispatchTerminalPayload} style={uiStyles.terminalTransmitButton}>Execute</button>
            </div>
          </div>
        )}

      </main>

      {/* FOOTER LAYER */}
      <footer style={uiStyles.mainframeFooter}>
        SECURE MULTI-FACTOR CRYPTOGRAPHIC INTERFACE MATRIX // NEXUS-AI PROTOCOLS IN EFFECT © 2026
      </footer>
    </div>
  );
}

// ========================================================
// 3. INDUSTRIAL CYBER-CYAN & NEO-PURPLE UI DESIGN THEME
// ========================================================
const uiStyles = {
  mainViewportWrapper: {
    width: '100vw',
    height: '100vh',
    backgroundColor: '#040814',
    color: '#ffffff',
    fontFamily: '"SF Pro Display", -apple-system, sans-serif',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: 0,
    overflow: 'hidden',
    position: 'relative'
  },
  matrixBackgroundCanvas: {
    position: 'absolute',
    top: 0, left: 0, width: '100%', height: '100%',
    background: 'radial-gradient(circle at 50% 15%, rgba(188, 19, 254, 0.15) 0%, transparent 65%), radial-gradient(circle at 10% 85%, rgba(0, 168, 132, 0.05) 0%, transparent 50%)',
    zIndex: 0
  },
  navigationBar: {
    width: '100%',
    backgroundColor: 'rgba(10, 17, 34, 0.85)',
    backdropFilter: 'blur(16px)',
    WebkitBackdropFilter: 'blur(16px)',
    padding: '0 30px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '60px',
    borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
    zIndex: 10
  },
  brandingBlock: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px'
  },
  brandAccentOrb: {
    width: '12px',
    height: '12px',
    borderRadius: '50%',
    backgroundColor: '#bc13fe',
    boxShadow: '0 0 10px #bc13fe'
  },
  brandPrimaryLabel: {
    fontSize: '16px',
    fontWeight: '800',
    letterSpacing: '1.5px',
    color: '#ffffff'
  },
  environmentStatusLabel: {
    backgroundColor: 'rgba(188, 19, 254, 0.1)',
    color: '#bc13fe',
    border: '1px solid rgba(188, 19, 254, 0.25)',
    padding: '4px 12px',
    borderRadius: '6px',
    fontSize: '11px',
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: '0.5px'
  },
  centerContainerLayout: {
    flex: 1,
    width: '100%',
    maxWidth: '1000px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0 20px',
    zIndex: 5
  },
  cyberFormPanel: {
    background: 'rgba(13, 22, 43, 0.45)',
    backdropFilter: 'blur(25px)',
    WebkitBackdropFilter: 'blur(25px)',
    border: '1px solid rgba(255, 255, 255, 0.08)',
    borderRadius: '20px',
    padding: '40px',
    width: '100%',
    maxWidth: '430px',
    boxShadow: '0 20px 50px rgba(0, 0, 0, 0.55)',
    textAlign: 'center'
  },
  panelTitleHeader: {
    fontSize: '24px',
    fontWeight: '800',
    color: '#ffffff',
    letterSpacing: '-0.5px',
    margin: '0 0 6px 0'
  },
  panelSubtitleText: {
    fontSize: '14px',
    color: 'rgba(255, 255, 255, 0.55)',
    margin: '0 0 30px 0',
    lineHeight: '1.4'
  },
  formFlexStack: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px'
  },
  industrialInputField: {
    width: '100%',
    background: 'rgba(3, 7, 18, 0.4)',
    border: '1px solid rgba(255, 255, 255, 0.12)',
    color: '#ffffff',
    borderRadius: '10px',
    padding: '15px 16px',
    fontSize: '14.5px',
    outline: 'none',
    boxSizing: 'border-box',
    transition: 'border-color 0.2s ease'
  },
  neonExecutionButton: {
    width: '100%',
    background: 'linear-gradient(135deg, #bc13fe, #7a0bc0)',
    color: '#ffffff',
    fontWeight: '700',
    letterSpacing: '0.5px',
    border: 'none',
    borderRadius: '10px',
    padding: '16px',
    cursor: 'pointer',
    fontSize: '14px',
    marginTop: '6px',
    boxShadow: '0 4px 15px rgba(188, 19, 254, 0.25)'
  },
  navigationInterchangeLink: {
    fontSize: '13px',
    color: 'rgba(255, 255, 255, 0.45)',
    marginTop: '25px',
    marginibe: 0
  },
  interactiveHighlightSpan: {
    color: '#bc13fe',
    cursor: 'pointer',
    fontWeight: '700',
    textDecoration: 'underline'
  },
  mainframeChatDock: {
    width: '100%',
    height: '76vh',
    background: 'rgba(10, 17, 32, 0.85)',
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(255, 255, 255, 0.06)',
    borderRadius: '16px',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    boxShadow: '0 25px 60px rgba(0, 0, 0, 0.6)'
  },
  dockHeaderControls: {
    height: '65px',
    backgroundColor: '#131f37',
    padding: '0 24px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '1px solid rgba(255, 255, 255, 0.05)'
  },
  pulsingGreenNode: {
    width: '10px',
    height: '10px',
    backgroundColor: '#00a884',
    borderRadius: '50%',
    boxShadow: '0 0 10px #00a884'
  },
  terminalSeverConnectionBtn: {
    background: 'none',
    border: '1px solid #ff3b30',
    color: '#ff3b30',
    padding: '6px 14px',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '12px',
    fontWeight: '600',
    transition: 'all 0.2s ease'
  },
  dockLiveViewport: {
    flex: 1,
    overflowY: 'auto',
    padding: '24px',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    backgroundColor: '#070d19'
  },
  messageBubbleCell: {
    maxWidth: '70%',
    padding: '14px 18px',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
  },
  bubbleRenderedImage: {
    maxWidth: '100%',
    maxHeight: '200px',
    borderRadius: '8px',
    marginBottom: '10px',
    display: 'block',
    border: '1px solid rgba(255,255,255,0.1)'
  },
  bubbleInternalTime: {
    fontSize: '9px',
    color: 'rgba(255, 255, 255, 0.3)',
    textAlign: 'right',
    marginTop: '6px'
  },
  contextBufferBar: {
    padding: '12px 24px',
    backgroundColor: '#131f37',
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    borderTop: '1px solid rgba(255, 255, 255, 0.05)'
  },
  bufferThumbnailImage: {
    width: '46px',
    height: '46px',
    objectFit: 'cover',
    borderRadius: '6px',
    border: '1px solid #bc13fe'
  },
  purgeContextButton: {
    backgroundColor: 'transparent',
    border: 'none',
    color: '#ff3b30',
    cursor: 'pointer',
    fontSize: '13px',
    fontWeight: '500'
  },
  dockUserInteractionConsole: {
    padding: '16px 24px',
    backgroundColor: '#131f37',
    display: 'flex',
    alignItems: 'center',
    gap: '14px',
    borderTop: '1px solid rgba(255, 255, 255, 0.05)'
  },
  mediaAttachButtonTrigger: {
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    color: '#ffffff',
    padding: '12px 18px',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '13.5px',
    fontWeight: '600'
  },
  terminalTextEntryField: {
    flex: 1,
    padding: '13px 18px',
    borderRadius: '8px',
    border: 'none',
    backgroundColor: '#1c2a45',
    color: '#ffffff',
    outline: 'none',
    fontSize: '14.5px'
  },
  terminalTransmitButton: {
    backgroundColor: '#bc13fe',
    color: '#ffffff',
    border: 'none',
    padding: '13px 24px',
    borderRadius: '8px',
    fontWeight: '700',
    cursor: 'pointer',
    fontSize: '14px',
    boxShadow: '0 4px 12px rgba(188, 19, 254, 0.3)'
  },
  mainframeFooter: {
    width: '100%',
    textAlign: 'center',
    padding: '20px',
    fontSize: '11px',
    color: 'rgba(255, 255, 255, 0.25)',
    backgroundColor: 'rgba(6, 11, 25, 0.6)',
    borderTop: '1px solid rgba(255, 255, 255, 0.03)',
    letterSpacing: '0.5px'
  }
};
        
