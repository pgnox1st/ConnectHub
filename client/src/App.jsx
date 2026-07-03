import React, { useState, useEffect, useRef, useCallback } from 'react';
import { SYSTEM_CHANNELS, INITIAL_TERMINAL_LOGS, SECURITY_POLICIES } from './types';
import { triggerNeuralInference } from './aiEngine';
import { inlineStyles } from './styles';

export default function App() {
  const [activeRoute, setActiveRoute] = useState('register'); 
  const [signupForm, setSignupForm] = useState({ accountEmail: '', targetPhone: '', initialPassword: '' });
  const [signinForm, setSigninForm] = useState({ loginEmail: '', verificationPassword: '' });
  const [oneTimeToken, setOneTimeToken] = useState(['', '', '', '', '', '']);
  const [serverSideOtp, setServerSideOtp] = useState('');
  
  const [chatThreads, setChatThreads] = useState(INITIAL_TERMINAL_LOGS);
  const [messageDraft, setMessageDraft] = useState('');
  const [bufferedMediaAsset, setBufferedMediaAsset] = useState(null);
  const [isNexusProcessing, setIsNexusProcessing] = useState(false);
  const [networkLatency, setNetworkLatency] = useState('4ms');

  const otpInputRefs = [useRef(), useRef(), useRef(), useRef(), useRef(), useRef()];
  const terminalScrollAnchor = useRef(null);

  useEffect(() => {
    const swalStyles = document.createElement("link");
    swalStyles.rel = "stylesheet";
    swalStyles.href = "https://cdn.jsdelivr.net/npm/sweetalert2@11/dist/sweetalert2.min.css";
    document.head.appendChild(swalStyles);

    const swalEngine = document.createElement("script");
    swalEngine.src = "https://cdn.jsdelivr.net/npm/sweetalert2@11";
    swalEngine.async = true;
    document.head.appendChild(swalEngine);

    const latencyInterval = setInterval(() => {
      setNetworkLatency(`${Math.floor(2 + Math.random() * 5)}ms`);
    }, 4000);

    return () => {
      document.head.removeChild(swalStyles);
      document.head.removeChild(swalEngine);
      clearInterval(latencyInterval);
    };
  }, []);

  useEffect(() => {
    if (terminalScrollAnchor.current) {
      terminalScrollAnchor.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatThreads, isNexusProcessing]);

  const triggerSystemFeedback = useCallback((statusType, mainHeading, contextualBody) => {
    if (window.Swal) {
      window.Swal.fire({
        icon: statusType,
        title: mainHeading,
        text: contextualBody,
        width: '340px',
        background: '#0d0d1e',
        color: '#ffffff',
        confirmButtonColor: '#7a0bc0'
      });
    } else {
      alert(`${mainHeading} -> ${contextualBody}`);
    }
  }, []);

  const executeProfileCreation = (e) => {
    e.preventDefault();
    const targetEmailLower = signupForm.accountEmail.toLowerCase().trim();
    const mailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!mailPattern.test(targetEmailLower)) {
      triggerSystemFeedback('error', 'Malformed Parameters', 'Invalid email format entered.');
      return;
    }
    if (signupForm.targetPhone.length !== 10 || isNaN(signupForm.targetPhone)) {
      triggerSystemFeedback('warning', 'Format Violation', 'Phone number must be exactly 10 digits.');
      return;
    }
    if (signupForm.initialPassword.length < SECURITY_POLICIES.minPasswordLength) {
      triggerSystemFeedback('error', 'Weak Encryption', 'Password must be at least 8 characters.');
      return;
    }

    localStorage.setItem('connecthub_user_email', targetEmailLower);
    localStorage.setItem('connecthub_user_password', signupForm.initialPassword);
    triggerSystemFeedback('success', 'Profile Verified', 'Registered successfully on secure servers!');
    setActiveRoute('login');
  };

  const executeAuthenticationCheck = (e) => {
    e.preventDefault();
    const storedIdentityKey = localStorage.getItem('connecthub_user_email');
    const storedEncryptionKey = localStorage.getItem('connecthub_user_password');
    const processedInputMail = signinForm.loginEmail.toLowerCase().trim();

    if (!storedIdentityKey) {
      triggerSystemFeedback('question', 'Account Void', 'No account found. Register a baseline configuration profile.');
      return;
    }
    if (processedInputMail !== storedIdentityKey || signinForm.verificationPassword !== storedEncryptionKey) {
      triggerSystemFeedback('error', 'Incorrect Credentials', 'Invalid email pattern or incorrect verification pass.');
      return;
    }

    const uniqueTokenSequence = Math.floor(100000 + Math.random() * 900000).toString();
    setServerSideOtp(uniqueTokenSequence);

    if (window.Swal) {
      window.Swal.fire({
        icon: 'info',
        title: 'MFA Token Dispatched',
        html: `<p>Your system access code is:</p><span style="font-size: 24px; color: #a855f7; font-weight: 800; letter-spacing:3px;">${uniqueTokenSequence}</span>`,
        background: '#0d0d1e',
        color: '#ffffff',
        confirmButtonColor: '#7a0bc0'
      });
    }
    setActiveRoute('otp');
  };

  const adjustOtpValue = (characterInput, structuralIndex) => {
    if (isNaN(characterInput)) return;
    const freshOtpArray = [...oneTimeToken];
    freshOtpArray[structuralIndex] = characterInput;
    setOneTimeToken(freshOtpArray);
    if (characterInput !== '' && structuralIndex < 5) {
      otpInputRefs[structuralIndex + 1].current.focus();
    }
  };

  const traverseOtpInputsViaKeys = (keyboardEvent, elementIndex) => {
    if (keyboardEvent.key === 'Backspace' && !oneTimeToken[elementIndex] && elementIndex > 0) {
      otpInputRefs[elementIndex - 1].current.focus();
    }
  };

  const processTokenValidation = (e) => {
    e.preventDefault();
    if (oneTimeToken.join('') !== serverSideOtp) {
      triggerSystemFeedback('error', 'Verification Failure', 'Mismatched cryptographic security token. Try again.');
      return;
    }
    triggerSystemFeedback('success', 'Access Granted', 'Welcome back to the network matrix node.');
    setActiveRoute('terminal');
  };

  const serializeIncomingMedia = (e) => {
    const rawLocalFile = e.target.files[0];
    if (rawLocalFile) {
      if (rawLocalFile.size > SECURITY_POLICIES.maxImageSize) {
        triggerSystemFeedback('warning', 'Payload Blocked', 'Image size exceeds max 5MB encryption ceiling.');
        return;
      }
      const asyncReaderInstance = new FileReader();
      asyncReaderInstance.onloadend = () => setBufferedMediaAsset(asyncReaderInstance.result);
      asyncReaderInstance.readAsDataURL(rawLocalFile);
    }
  };

  const shipTerminalMessage = () => {
    if (!messageDraft.trim() && !bufferedMediaAsset) return;
    const currentHumanClock = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    setChatThreads(prev => [...prev, {
      id: Date.now(),
      text: messageDraft,
      sender: 'operator',
      systemTime: currentHumanClock,
      attachedVisualStream: bufferedMediaAsset
    }]);

    const textSnapshot = messageDraft;
    const visualSnapshot = bufferedMediaAsset;
    setMessageDraft('');
    setBufferedMediaAsset(null);
    setIsNexusProcessing(true);

    setTimeout(() => {
      setIsNexusProcessing(false);
      setChatThreads(prev => [...prev, {
        id: Date.now() + 1,
        text: triggerNeuralInference(textSnapshot, !!visualSnapshot),
        sender: 'nexus',
        systemTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    }, 1200);
  };

  return (
    <div style={inlineStyles.appContainer}>
      <div style={inlineStyles.backgroundMeshGlow}></div>
      <nav style={inlineStyles.navbarHeader}>
        <div style={inlineStyles.navbarBranding}>
          <div style={inlineStyles.logoPulseIcon}></div>
          <span style={inlineStyles.logoTypography}>ConnectHub<span style={{ color: '#a855f7', fontWeight: '400' }}>//PRO</span></span>
        </div>
        <div style={inlineStyles.navbarMetricsPane}>
          <div style={inlineStyles.latencyindicator}>
            <span style={inlineStyles.greenPulseDot}></span>
            Ping: <span style={{ color: '#00ffcc' }}>{networkLatency}</span>
          </div>
          <div style={inlineStyles.encryptionBadge}>AES-256 SECURE</div>
        </div>
      </nav>

      <main style={inlineStyles.primaryContentShell}>
        {activeRoute === 'register' && (
          <div style={inlineStyles.glassSecurityCard}>
            <h2 style={inlineStyles.cardHeadline}>Create Profile</h2>
            <p style={inlineStyles.cardParagraphDescription}>Provision access credentials across the enterprise directory.</p>
            <form onSubmit={executeProfileCreation} style={inlineStyles.verticalFormLayout}>
              <div style={inlineStyles.inputGroupingCell}>
                <label style={inlineStyles.fieldLabelText}>Enterprise Email</label>
                <input type="email" placeholder="name@domain.com" value={signupForm.accountEmail} onChange={e => setSignupForm({...signupForm, accountEmail: e.target.value})} style={inlineStyles.highEndInputField} required />
              </div>
              <div style={inlineStyles.inputGroupingCell}>
                <label style={inlineStyles.fieldLabelText}>Mobile Gateway</label>
                <input type="tel" placeholder="10-digit number" value={signupForm.targetPhone} onChange={e => setSignupForm({...signupForm, targetPhone: e.target.value})} maxLength={10} style={inlineStyles.highEndInputField} required />
              </div>
              <div style={inlineStyles.inputGroupingCell}>
                <label style={inlineStyles.fieldLabelText}>Passphrase Encryption Key</label>
                <input type="password" placeholder="••••••••••••" value={signupForm.initialPassword} onChange={e => setSignupForm({...signupForm, initialPassword: e.target.value})} style={inlineStyles.highEndInputField} required />
              </div>
              <button type="submit" style={inlineStyles.solidNeonActionButton}>Deploy Credentials</button>
            </form>
            <p style={inlineStyles.routingInterchangeNotice}>Already registered? <span onClick={() => setActiveRoute('login')} style={inlineStyles.routingActionSpan}>Authenticate</span></p>
          </div>
        )}

        {activeRoute === 'login' && (
          <div style={inlineStyles.glassSecurityCard}>
            <h2 style={inlineStyles.cardHeadline}>Credential Check</h2>
            <p style={inlineStyles.cardParagraphDescription}>Supply validation keys to initialize multi-factor authentication token dispatches.</p>
            <form onSubmit={executeAuthenticationCheck} style={inlineStyles.verticalFormLayout}>
              <div style={inlineStyles.inputGroupingCell}>
                <label style={inlineStyles.fieldLabelText}>Account Email</label>
                <input type="email" placeholder="name@domain.com" value={signinForm.loginEmail} onChange={e => setSigninForm({...signinForm, loginEmail: e.target.value})} style={inlineStyles.highEndInputField} required />
              </div>
              <div style={inlineStyles.inputGroupingCell}>
                <label style={inlineStyles.fieldLabelText}>Verification Password</label>
                <input type="password" placeholder="••••••••••••" value={signinForm.verificationPassword} onChange={e => setSigninForm({...signinForm, verificationPassword: e.target.value})} style={inlineStyles.highEndInputField} required />
              </div>
              <button type="submit" style={inlineStyles.solidNeonActionButton}>Fire Token Stream</button>
            </form>
            <p style={inlineStyles.routingInterchangeNotice}>Need profile allocations? <span onClick={() => setActiveRoute('register')} style={inlineStyles.routingActionSpan}>Initialize Account</span></p>
          </div>
        )}

        {activeRoute === 'otp' && (
          <div style={inlineStyles.glassSecurityCard}>
            <h2 style={inlineStyles.cardHeadline}>MFA Token Entry</h2>
            <p style={inlineStyles.cardParagraphDescription}>Enter the 6-digit cryptographic security sequence provided by your service layer.</p>
            <form onSubmit={processTokenValidation} style={inlineStyles.verticalFormLayout}>
              <div style={inlineStyles.otpArrayFlexRow}>
                {oneTimeToken.map((char, idx) => (
                  <input key={idx} ref={otpInputRefs[idx]} type="text" maxLength={1} value={char} onChange={e => adjustOtpValue(e.target.value, idx)} onKeyDown={e => traverseOtpInputsViaKeys(e, idx)} style={inlineStyles.otpIndividualBlockCell} />
                ))}
              </div>
              <button type="submit" style={inlineStyles.solidNeonActionButton}>Validate OTP Signature</button>
            </form>
          </div>
        )}

        {activeRoute === 'terminal' && (
          <div style={inlineStyles.mainframeTerminalDock}>
            <div style={inlineStyles.terminalChannelListPanel}>
              <div style={inlineStyles.channelSectionHeadingText}>ACTIVE CHANNELS</div>
              {SYSTEM_CHANNELS.map(ch => (
                <div key={ch.id} style={{ ...inlineStyles.channelRowSelectorCard, backgroundColor: ch.id === 'global_ai_core' ? 'rgba(168,85,247,0.12)' : 'transparent', color: ch.id === 'global_ai_core' ? '#ffffff' : '#64748b' }}>
                  <span>⚡</span> {ch.name}
                </div>
              ))}
            </div>
            <div style={inlineStyles.terminalDialogueMainBoard}>
              <div style={inlineStyles.dialogueHeaderConsoleBar}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={inlineStyles.glowingNetworkNodeAnimation}></div>
                  <div>
                    <h4 style={inlineStyles.activeNodeHeaderLabelText}>Nexus AI Kernel v4</h4>
                    <span style={inlineStyles.activeNodeSubtextDescription}>Latency: Stable</span>
                  </div>
                </div>
                <button onClick={() => { setActiveRoute('login'); setOneTimeToken(['','','','','','']); }} style={inlineStyles.severTerminalUplinkButton}>Disconnect</button>
              </div>
              <div style={inlineStyles.dialogueViewportScrollGrid}>
                {chatThreads.map(msg => (
                  <div key={msg.id} style={{ ...inlineStyles.dialogueMessageBubble, alignSelf: msg.sender === 'operator' ? 'flex-end' : 'flex-start', backgroundColor: msg.sender === 'operator' ? '#6b21a8' : 'rgba(30, 41, 59, 0.7)' }}>
                    <span style={{ ...inlineStyles.bubbleSystemLabelText, color: msg.sender === 'operator' ? '#00ffcc' : '#a855f7' }}>{msg.sender.toUpperCase()}</span>
                    {msg.attachedVisualStream && <img src={msg.attachedVisualStream} alt="Uploaded Context" style={inlineStyles.bubbleEmbeddedImageElement} />}
                    <div style={inlineStyles.bubbleMainBodyTypography}>{msg.text}</div>
                  </div>
                ))}
                {isNexusProcessing && <div style={{ color: '#a855f7', fontStyle: 'italic', fontSize: '13px' }}>Neural inference matrix running...</div>}
                <div ref={terminalScrollAnchor} />
              </div>
              <div style={inlineStyles.dialogueInputConsoleDeck}>
                <label style={inlineStyles.visualPayloadTriggerLabel}>
                  📷 Add Media
                  <input type="file" accept="image/*" onChange={serializeIncomingMedia} style={{ display: 'none' }} />
                </label>
                <input type="text" value={messageDraft} onChange={e => setMessageDraft(e.target.value)} onKeyPress={e => e.key === 'Enter' && shipTerminalMessage()} style={inlineStyles.consoleTextInputFieldElement} placeholder="Transmit parameters or ask AI code logic..." />
                <button onClick={shipTerminalMessage} style={inlineStyles.consoleTransmitExecutionButton}>Execute</button>
              </div>
            </div>
          </div>
        )}
      </main>
      <footer style={inlineStyles.systemMainframeFooter}>CONNECTHUB PLATFORM MATRIX ENGINE v4.9.1-PRO © 2026</footer>
    </div>
  );
            }
      
