import React, { useState, useEffect, useRef } from 'react';

// ========================================================
// 1. GLOBAL ENCRYPTED CORE MOCK DATABASE
// ========================================================
const MASTER_CONTACTS_REGISTRY = {
  701: {
    id: 701,
    name: "Olivia Taylor",
    phone: "+91 91122 33445",
    email: "olivia.t@connecthub.io",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150",
    status: "online",
    bio: "Code | Design | Repeat 🚀",
    unreadCount: 0,
    messages: [
      { id: 1, text: "Missed voice pipeline connection.", time: "04:00 AM", type: "inbound", media: null },
      { id: 2, text: "Hey! Let's sync the frontend deployment layout today.", time: "08:15 AM", type: "inbound", media: null }
    ],
    aiPersonaPrompt: "You are Olivia Taylor, a sharp product developer. Reply professionally, guide technical tasks, and use modern tech terminology."
  },
  702: {
    id: 702,
    name: "Sophia Martinez",
    phone: "+91 92233 44556",
    email: "sophia.m@designhub.com",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150",
    status: "online",
    bio: "Pixel perfect enthusiast ✨",
    unreadCount: 2,
    messages: [
      { id: 1, text: "🎙️ Transmitting dynamic audio waveform log...", time: "Yesterday", type: "inbound", isAudio: true }
    ],
    aiPersonaPrompt: "You are Sophia, a creative UI designer. Speak artistically, use design words like aesthetic, composition, palettes, and add emojis."
  },
  703: {
    id: 703,
    name: "Noah Wilson",
    phone: "+91 93344 55667",
    email: "noah.dev@backend.net",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
    status: "offline",
    bio: "Databases are beautiful.",
    unreadCount: 0,
    messages: [
      { id: 1, text: "Server clusters are operating at nominal capacity.", time: "2 days ago", type: "inbound", media: null }
    ],
    aiPersonaPrompt: "You are Noah, a rigorous system architect. Use short, blunt sentences and focus heavily on data, structure, and optimization."
  }
};

const SEED_STORIES = [
  { id: 1, name: "My Status", avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150", time: "Just now", viewed: false },
  { id: 2, name: "Sophia", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150", time: "25 minutes ago", viewed: false },
  { id: 3, name: "Olivia", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150", time: "1 hour ago", viewed: true }
];

const SEED_CALLS = [
  { id: 1, name: "Olivia Taylor", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150", time: "Today, 09:36 AM", type: "voice", incoming: true, missed: true },
  { id: 2, name: "Sophia Martinez", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150", time: "Yesterday, 04:12 PM", type: "video", incoming: false, missed: false }
];

// ========================================================
// 2. MAIN CORE MASTER SYSTEM COMPONENT
// ========================================================
export default function UltimateWhatsAppEngine() {
  // Application Window App Router
  const [appScreen, setAppScreen] = useState('auth-gateway'); // auth-gateway, otp-pipeline, dashboard-view, settings-workspace, full-screen-media
  const [dashboardTab, setDashboardTab] = useState('chats-directory'); // chats-directory, status-feed, call-logs
  const [selectedContactId, setSelectedContactId] = useState(701);
  const [activeSettingsPanel, setActiveSettingsPanel] = useState('profile-hub');

  // Interactive Live Chat Real-time Simulation Engine Data State
  const [chatDatabase, setChatDatabase] = useState(MASTER_CONTACTS_REGISTRY);
  const [textInputField, setTextInputField] = useState('');
  const [isPeerTyping, setIsPeerTyping] = useState(false);
  const [stagedMediaPacket, setStagedMediaPacket] = useState(null); 
  const [mediaPreviewContext, setMediaPreviewContext] = useState(null);

  // Auth Multi-Factor Telemetry State
  const [authFormFields, setAuthFormFields] = useState({ email: '', phone: '', credentialsToken: '' });
  const [receivedOtpToken, setReceivedOtpToken] = useState('');

  // Global Multi-Theme Global App Configuration Engine
  const [userProfileIdentity, setUserProfileIdentity] = useState({
    fullName: "John Doe",
    registeredPhone: "+91 98765 43210",
    registeredEmail: "johndoe@connecthub.com",
    avatarUrl: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150",
    customBioText: "Available | Building the future of networks."
  });

  const [globalPrivacyPolicy, setGlobalPrivacyPolicy] = useState({ lastSeenOption: 'Everyone', profilePhotoOption: 'My Contacts', readReceiptsActive: true });
  const [globalChatCustomizer, setGlobalChatCustomizer] = useState({ uiMode: 'dark', chatBackgroundLayout: 'doodle-matrix', typographyWeight: '14.5px' });

  const messageLayoutScrollerAnchor = useRef(null);

  useEffect(() => {
    if (messageLayoutScrollerAnchor.current) {
      messageLayoutScrollerAnchor.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatDatabase, selectedContactId, isPeerTyping, appScreen]);

  // ========================================================
  // 3. UNDERCOVER AI AUTOMATION CORE HANDLING PIPELINE
  // ========================================================
  const executeUndercoverAIProcessingEngine = (targetChatId, incomingUserMsgText) => {
    setIsPeerTyping(true);

    setTimeout(() => {
      setIsPeerTyping(false);
      const clockStamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      
      setChatDatabase(prevDatabase => {
        const structuralProfile = prevDatabase[targetChatId];
        if (!structuralProfile) return prevDatabase;

        let dynamicCalculatedResponse = "System message correctly synchronized across network frames. No parsing errors detected.";
        const normalText = incomingUserMsgText.toLowerCase();

        // Advanced Content Parser & Simulated Multi-Model Intent Recognizer
        if (normalText.includes("hi") || normalText.includes("hello") || normalText.includes("hey")) {
          dynamicCalculatedResponse = `Hey! Thanks for connecting back. I was just adjusting some pipeline assets. What's the schedule today?`;
        } else if (normalText.includes("photo") || normalText.includes("image") || normalText.includes("video") || normalText.includes("media")) {
          dynamicCalculatedResponse = "Wow! The media transmission completed seamlessly. The clarity looks stunning on my display array! 📸✨";
        } else if (normalText.includes("status") || normalText.includes("render") || normalText.includes("code")) {
          dynamicCalculatedResponse = "The architecture build deployment status on Render is fully active and validated.";
        } else if (normalText.includes("work") || normalText.includes("project")) {
          dynamicCalculatedResponse = "Let's review the final staging builds before deploying to production servers.";
        }

        const structuralMessageNode = {
          id: Date.now() + 9,
          text: dynamicCalculatedResponse,
          time: clockStamp,
          type: "inbound",
          media: null
        };

        return {
          ...prevDatabase,
          [targetChatId]: {
            ...structuralProfile,
            messages: [...structuralProfile.messages, structuralMessageNode]
          }
        };
      });
    }, 2200);
  };

  // Dispatch Outbound Message Node Link Loop
  const dispatchMessagePacketPayload = () => {
    if (!textInputField.trim() && !stagedMediaPacket) return;

    const systemClockTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const targetScopeId = selectedContactId;

    const structuralOutputMessageNode = {
      id: Date.now(),
      text: textInputField || `📷 Transmitted attachment: [${stagedMediaPacket.assetClass.toUpperCase()}]`,
      time: systemClockTime,
      type: "outbound",
      media: stagedMediaPacket
    };

    setChatDatabase(prev => ({
      ...prev,
      [targetScopeId]: {
        ...prev[targetScopeId],
        messages: [...prev[targetScopeId].messages, structuralOutputMessageNode]
      }
    }));

    const cachedTextData = textInputField;
    setTextInputField('');
    setStagedMediaPacket(null);

    // Call Undercover AI Context Pipeline Engine
    executeUndercoverAIProcessingEngine(targetScopeId, cachedTextData);
  };

  // Inject File Media Simulation
  const handleSimulatedMediaIngestion = (assetClass) => {
    if (assetClass === 'image') {
      setStagedMediaPacket({
        assetClass: 'image',
        sourceUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=500'
      });
    } else {
      setStagedMediaPacket({
        assetClass: 'video',
        sourceUrl: 'https://www.w3schools.com/html/mov_bbb.mp4'
      });
    }
  };

  const selectedChatContext = chatDatabase[selectedContactId];

  return (
    <div style={{ ...styles.appViewportContainerFrame, backgroundColor: globalChatCustomizer.uiMode === 'dark' ? '#0b141a' : '#f0f2f5', color: globalChatCustomizer.uiMode === 'dark' ? '#e9edef' : '#111b21' }}>
      
      {/* ========================================================
          GATEWAY SCREEN 1: MULTI-FACTOR AUTH SUB-FRAME SYSTEM
          ======================================================== */}
      {appScreen === 'auth-gateway' && (
        <div style={styles.authViewportModuleDeckCenterBox}>
          <div style={styles.brandLogoCircleGraphicWrapper}>💬</div>
          <h1 style={styles.authGlobalBrandHeaderTitle}>ConnectHub Linking Service</h1>
          <p style={styles.authSubtextHelperStringParagraph}>Enter registration endpoints to synchronize instant messaging nodes.</p>
          
          <div style={styles.authFormVerticalStackPanelBox}>
            <input type="email" placeholder="Email Node Address (e.g. user@domain.com)" value={authFormFields.email} onChange={e => setAuthFormFields({...authFormFields, email: e.target.value})} style={styles.authNativeInputBoxControlElement} />
            <input type="tel" placeholder="Mobile Verification Node Phone (+91...)" value={authFormFields.phone} onChange={e => setAuthFormFields({...authFormFields, phone: e.target.value})} style={styles.authNativeInputBoxControlElement} />
            <input type="password" placeholder="Secure Connection Key Access Token" value={authFormFields.credentialsToken} onChange={e => setAuthFormFields({...authFormFields, credentialsToken: e.target.value})} style={styles.authNativeInputBoxControlElement} />
            
            <button onClick={() => { if(authFormFields.email && authFormFields.phone) { setAppScreen('otp-pipeline'); } else { alert('Please provide fully verified networking data strings.'); } }} style={styles.authPrimaryActionSubmitBtnElement}>
              Generate Secure SMS/Email OTP Routing Channel
            </button>
          </div>
        </div>
      )}

      {/* ========================================================
          GATEWAY SCREEN 2: HIGH SECURITY OTP PIPELINE VALIDATOR
          ======================================================== */}
      {appScreen === 'otp-pipeline' && (
        <div style={styles.authViewportModuleDeckCenterBox}>
          <div style={styles.brandLogoCircleGraphicWrapper}>🔒</div>
          <h1 style={styles.authGlobalBrandHeaderTitle}>Enter Network Core Security OTP</h1>
          <p style={styles.authSubtextHelperStringParagraph}>Security token layer routed to endpoints. Input <b style={{color: '#00a884'}}>1234</b> to authorize verification sequence.</p>
          
          <div style={styles.authFormVerticalStackPanelBox}>
            <input type="text" placeholder="• • • •" value={receivedOtpToken} onChange={e => setReceivedOtpToken(e.target.value)} style={{ ...styles.authNativeInputBoxControlElement, textAlign: 'center', fontSize: '24px', letterSpacing: '10px' }} maxLength={4} />
            
            <button onClick={() => { if(receivedOtpToken === '1234') { setUserProfileIdentity(prev => ({...prev, registeredEmail: authFormFields.email, registeredPhone: authFormFields.phone})); setAppScreen('dashboard-view'); } else { alert('Security core validation faulted. Re-input network key token.'); } }} style={styles.authPrimaryActionSubmitBtnElement}>
              Finalize Synchronization & Initialize Core Pipeline
            </button>
            <button onClick={() => setAppScreen('auth-gateway')} style={styles.authSecondaryAlternativeActionLinkBtn}>Modify Gateway Configuration Handlers</button>
          </div>
        </div>
      )}

      {/* ========================================================
          CORE SCREEN 3: WHATSAPP FULL RUNTIME APPLICATION DASHBOARD
          ======================================================== */}
      {appScreen === 'dashboard-view' && (
        <div style={styles.mainDashboardTwoColumnLayoutSplitViewport}>
          
          {/* DIRECTORY FEED CHANNELS MATRIX GRID - LEFT SECTION */}
          <div style={{ ...styles.dashboardDirectorySidebarLeftRailPane, background: globalChatCustomizer.uiMode === 'dark' ? '#111b21' : '#ffffff', borderRight: globalChatCustomizer.uiMode === 'dark' ? '1px solid #222e35' : '1px solid #e9edef' }}>
            <div style={{ ...styles.dashboardLeftPanelHeaderToolbarRow, background: globalChatCustomizer.uiMode === 'dark' ? '#202c33' : '#f0f2f5' }}>
              <img src={userProfileIdentity.avatarUrl} alt="Active Identity Anchor" style={styles.userProfileIdentityAvatarCircularThumbnailImgNode} onClick={() => setAppScreen('settings-workspace')} title="Edit Profile Configurations" />
              <div style={{ display: 'flex', gap: '20px', color: '#aebac1', fontSize: '18px', cursor: 'pointer' }}>
                <span onClick={() => setAppScreen('settings-workspace')} title="Open Matrix Configuration Settings">⚙️ Control Hub</span>
              </div>
            </div>

            {/* Custom Tab Router Controller Bar Header */}
            <div style={{ ...styles.dashboardCategoryNavigationTabStripRowBar, background: globalChatCustomizer.uiMode === 'dark' ? '#111b21' : '#ffffff' }}>
              {['chats-directory', 'status-feed', 'call-logs'].map(tabKey => (
                <div key={tabKey} onClick={() => setDashboardTab(tabKey)} style={{ ...styles.dashboardTabHeaderClickableActionNode, color: dashboardTab === tabKey ? '#00a884' : '#8696a0', borderBottom: dashboardTab === tabKey ? '3px solid #00a884' : 'none' }}>
                  {tabKey.replace('-',' ').toUpperCase()}
                </div>
              ))}
            </div>

            {/* Scrolling Roster Feed Pipeline Stack */}
            <div style={styles.dashboardVerticalScrollableContactFeedContainerStack}>
              {dashboardTab === 'chats-directory' && Object.values(chatDatabase).map(contactObj => {
                const logsArray = contactObj.messages;
                const topTerminalMessageNode = logsArray[logsArray.length - 1];
                return (
                  <div key={contactObj.id} onClick={() => setSelectedContactId(contactObj.id)} style={{ ...styles.rosterCardItemFlexlineContainerBox, background: selectedContactId === contactObj.id ? (globalChatCustomizer.uiMode === 'dark' ? '#2a3942' : '#f0f2f5') : 'transparent' }}>
                    <img src={contactObj.avatar} alt={contactObj.name} style={styles.rosterContactAvatarElementNodeSquareCircularImg} />
                    <div style={{ flex: 1, overflow: 'hidden' }}>
                      <div style={styles.rosterContactMetaHeaderFlexlineRow}>
                        <span style={{ fontWeight: '600', color: globalChatCustomizer.uiMode === 'dark' ? '#ffffff' : '#000000' }}>{contactObj.name}</span>
                        <span style={{ fontSize: '11px', color: '#8696a0' }}>{topTerminalMessageNode ? topTerminalMessageNode.time : ''}</span>
                      </div>
                      <p style={styles.rosterContactMessagePreviewSubtextBlockParagraph}>{topTerminalMessageNode ? topTerminalMessageNode.text : 'Secure data stream pipeline idle.'}</p>
                    </div>
                  </div>
                );
              })}

              {dashboardTab === 'status-feed' && (
                <div style={{ padding: '12px' }}>
                  <span style={{ fontSize: '13px', fontWeight: '600', color: '#8696a0', display: 'block', marginBottom: '12px' }}>RECENT INSTANT BROADCAST STORIES</span>
                  {SEED_STORIES.map(story => (
                    <div key={story.id} style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '14px', cursor: 'pointer' }}>
                      <img src={story.avatar} alt="" style={{ width: '44px', height: '44px', borderRadius: '50%', objectFit: 'cover', border: story.viewed ? '2px solid #8696a0' : '2px solid #00a884', padding: '1.5px' }} />
                      <div>
                        <div style={{ fontSize: '14.5px', fontWeight: '600' }}>{story.name}</div>
                        <div style={{ fontSize: '12px', color: '#8696a0' }}>{story.time}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {dashboardTab === 'call-logs' && (
                <div style={{ padding: '12px' }}>
                  <span style={{ fontSize: '13px', fontWeight: '600', color: '#8696a0', display: 'block', marginBottom: '12px' }}>TELECOM CHANNEL REVERB PIPELINE LOGS</span>
                  {SEED_CALLS.map(call => (
                    <div key={call.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                        <img src={call.avatar} alt="" style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }} />
                        <div>
                          <div style={{ fontSize: '14.5px', fontWeight: '600', color: call.missed ? '#ea0038' : 'inherit' }}>{call.name}</div>
                          <div style={{ fontSize: '12px', color: '#8696a0' }}>{call.incoming ? '⬇ Incoming' : '⬆ Outbound'} • {call.time}</div>
                        </div>
                      </div>
                      <span style={{ fontSize: '18px' }}>{call.type === 'video' ? '📹' : '📞'}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* ACTIVE WORKSPACE CHANNEL CORE CANVAS - RIGHT SECTION */}
          <div style={{ ...styles.dashboardActiveWorkspaceChatCanvasPane, background: globalChatCustomizer.uiMode === 'dark' ? '#0b141a' : '#efeae2' }}>
            {selectedChatContext ? (
              <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                
                {/* Workspace Header Panel */}
                <div style={{ ...styles.workspaceHeaderNavbarControlStripRow, background: globalChatCustomizer.uiMode === 'dark' ? '#202c33' : '#f0f2f5' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                    <img src={selectedChatContext.avatar} alt={selectedChatContext.name} style={styles.rosterContactAvatarElementNodeSquareCircularImg} />
                    <div>
                      <div style={{ fontWeight: '600', color: globalChatCustomizer.uiMode === 'dark' ? '#ffffff' : '#000000', fontSize: '15px' }}>{selectedChatContext.name}</div>
                      <div style={{ fontSize: '12px', color: selectedChatContext.status === 'online' ? '#25d366' : '#8696a0' }}>
                        {selectedChatContext.status === 'online' ? 'Secure Peer Online Connection Active' : 'Offline Mode Storage Relay'}
                      </div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '22px', color: '#aebac1', fontSize: '18px', cursor: 'pointer' }}>
                    <span onClick={() => alert(`Initializing end-to-end encrypted voice link to ${selectedChatContext.phone}`)}>📞</span>
                    <span onClick={() => alert(`Opening peer WebRTC streaming video pipeline layer...`)}>📹</span>
                  </div>
                </div>

                {/* Message Runway Scrollable View Area */}
                <div style={styles.workspaceMessagesScrollableCanvasFieldArea}>
                  {selectedChatContext.messages.map(messageNode => (
                    <div key={messageNode.id} style={{ ...styles.messageBubbleFrameStructureBox, alignSelf: messageNode.type === 'outbound' ? 'flex-end' : 'flex-start', backgroundColor: messageNode.type === 'outbound' ? '#005c4b' : '#202c33' }}>
                      {messageNode.media && messageNode.media.assetClass === 'image' && (
                        <img src={messageNode.media.sourceUrl} alt="Transmitted Core Frame Pipeline Media" style={styles.bubbleEmbeddedAssetMediaImageGraphicPreview} onClick={() => { setMediaPreviewContext(messageNode.media.sourceUrl); setAppScreen('full-screen-media'); }} />
                      )}
                      {messageNode.media && messageNode.media.assetClass === 'video' && (
                        <video src={messageNode.media.sourceUrl} controls style={styles.bubbleEmbeddedAssetMediaImageGraphicPreview} />
                      )}
                      <div style={{ fontSize: globalChatCustomizer.typographyWeight, wordBreak: 'break-word' }}>{messageNode.text}</div>
                      <div style={styles.bubbleTimestampLayoutLineLabelMetaStringField}>{messageNode.time}</div>
                    </div>
                  ))}
                  
                  {isPeerTyping && (
                    <div style={{ ...styles.messageBubbleFrameStructureBox, alignSelf: 'flex-start', backgroundColor: '#202c33', color: '#00a884', fontWeight: '600', animation: 'pulse 1s infinite' }}>
                      AI System Engine processing response parameters...
                    </div>
                  )}
                  <div ref={messageLayoutScrollerAnchor} />
                </div>

                {/* Media Attachment Core Frame Sync Ingestion Preview Bar Selector */}
                {stagedMediaPacket && (
                  <div style={styles.mediaStagedUploadStatusIndicatorPanelStripBar}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span style={{ fontSize: '18px' }}>📂</span>
                      <span style={{ fontSize: '13px' }}>Simulated Data Pipeline Payload Block ready: [Type: {stagedMediaPacket.assetClass.toUpperCase()}]</span>
                    </div>
                    <button onClick={() => setStagedMediaPacket(null)} style={{ background: 'none', border: 'none', color: '#ea0038', cursor: 'pointer', fontWeight: '600' }}>Flush Buffer</button>
                  </div>
                )}

                {/* Input Ingestion Controller Terminal Footer Dock */}
                <div style={{ ...styles.workspaceInputFormFooterDockPanelBarRow, background: globalChatCustomizer.uiMode === 'dark' ? '#202c33' : '#f0f2f5' }}>
                  <div style={{ display: 'flex', gap: '16px', fontSize: '20px', cursor: 'pointer' }}>
                    <span onClick={() => handleSimulatedMediaIngestion('image')} title="Ingest High-Res Photo Module Node">🖼️</span>
                    <span onClick={() => handleSimulatedMediaIngestion('video')} title="Ingest Video Stream Asset Pointer">🎥</span>
                  </div>
                  
                  <input type="text" placeholder="Type a secure message..." value={textInputField} onChange={e => setTextInputField(e.target.value)} onKeyPress={e => { if(e.key === 'Enter') dispatchMessagePacketPayload(); }} style={{ ...styles.workspaceMainInputTextFieldUnitControlBox, background: globalChatCustomizer.uiMode === 'dark' ? '#2a3942' : '#ffffff', color: globalChatCustomizer.uiMode === 'dark' ? '#ffffff' : '#000000' }} />
                  
                  <button onClick={dispatchMessagePacketPayload} style={styles.workspaceMessagePayloadSubmitActionTriggerBtn}>➔</button>
                </div>

              </div>
            ) : (
              <div style={styles.workspaceEmptyPlaceholderOverlayCentralContainer}>
                <div style={{ fontSize: '80px', marginBottom: '20px' }}>💬</div>
                <h3>ConnectHub Messaging Core Ready</h3>
                <p style={{ color: '#8696a0', fontSize: '14px', marginTop: '6px' }}>Select an active interface connection node endpoint from directory stack index frame matrix.</p>
              </div>
            )}
          </div>

        </div>
      )}

      {/* ========================================================
          CORE SCREEN 4: DETAILED MASTER SYSTEM CONFIGURATION CONTROLLER HUB
          ======================================================== */}
      {appScreen === 'settings-workspace' && (
        <div style={styles.settingsOverlayPanelCanvasMasterContainerLayout}>
          <div style={{ ...styles.settingsHeaderNavbarTopControlStripRow, background: globalChatCustomizer.uiMode === 'dark' ? '#202c33' : '#f0f2f5' }}>
            <button onClick={() => setAppScreen('dashboard-view')} style={styles.settingsHeaderReturnActionDismissBtnLink}>⬅ Exit Control Configuration Hub</button>
            <h2 style={{ fontSize: '18px', fontWeight: '700' }}>Central System Config Console</h2>
          </div>

          <div style={styles.settingsPanelBodyGridSplitterLayoutFrame}>
            {/* Sidebar Navigation Selector Array */}
            <div style={{ ...styles.settingsSidebarTabsVerticalStackRail, background: globalChatCustomizer.uiMode === 'dark' ? '#111b21' : '#ffffff', borderRight: globalChatCustomizer.uiMode === 'dark' ? '1px solid #222e35' : '1px solid #e9edef' }}>
              <div onClick={() => setActiveSettingsPanel('profile-hub')} style={{ ...styles.settingsClickableTabNavigationCardRow, backgroundColor: activeSettingsPanel === 'profile-hub' ? '#2a3942' : 'transparent' }}>👤 Identity Node Profile</div>
              <div onClick={() => setActiveSettingsPanel('privacy-hub')} style={{ ...styles.settingsClickableTabNavigationCardRow, backgroundColor: activeSettingsPanel === 'privacy-hub' ? '#2a3942' : 'transparent' }}>🔒 Cryptographic Privacy Guard</div>
              <div onClick={() => setActiveSettingsPanel('chat-customizer-hub')} style={{ ...styles.settingsClickableTabNavigationCardRow, backgroundColor: activeSettingsPanel === 'chat-customizer-hub' ? '#2a3942' : 'transparent' }}>🎨 Core Themes & Canvas Matrix</div>
            </div>

            {/* Config Control Target Terminal Content Block View */}
            <div style={styles.settingsActiveValueInspectorDisplayPanelFieldPane}>
              {activeSettingsPanel === 'profile-hub' && (
                <div style={styles.configurationOptionInspectorCardUnit}>
                  <h3 style={{ borderBottom: '1px solid #222e35', paddingBottom: '10px', marginBottom: '20px' }}>Identity Core Parameters</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
                    <img src={userProfileIdentity.avatarUrl} alt="Large Profile Configuration Source View" style={styles.largeScaleAvatarProfileModifierGraphicCircleImg} />
                    <input type="text" value={userProfileIdentity.fullName} onChange={e => setUserProfileIdentity({...userProfileIdentity, fullName: e.target.value})} style={styles.authNativeInputBoxControlElement} placeholder="Synchronize Display Roster Username String" />
                    <input type="text" value={userProfileIdentity.customBioText} onChange={e => setUserProfileIdentity({...userProfileIdentity, customBioText: e.target.value})} style={styles.authNativeInputBoxControlElement} placeholder="Network Broadcast Custom Status Bio Packet" />
                    
                    <div style={{ width: '100%', fontSize: '13px', color: '#8696a0', display: 'flex', flexDirection: 'column', gap: '6px', background: '#111b21', padding: '14px', borderRadius: '8px' }}>
                      <span>🔑 Hardcoded Infrastructure Endpoint Phone String: <b>{userProfileIdentity.registeredPhone}</b></span>
                      <span>🛡️ Secure Validated Root Email System Context Anchor: <b>{userProfileIdentity.registeredEmail}</b></span>
                    </div>
                  </div>
                </div>
              )}

              {activeSettingsPanel === 'privacy-hub' && (
                <div style={styles.configurationOptionInspectorCardUnit}>
                  <h3 style={{ borderBottom: '1px solid #222e35', paddingBottom: '10px', marginBottom: '20px' }}>Cryptographic Privacy Control Filters</h3>
                  
                  <div style={styles.configOptionLabelSelectorFlexlineRowItemRow}>
                    <span>Last Seen Synchronization Interval Transmission Mask:</span>
                    <select value={globalPrivacyPolicy.lastSeenOption} onChange={e => setGlobalPrivacyPolicy({...globalPrivacyPolicy, lastSeenOption: e.target.value})} style={styles.configSelectionDropdownInputSelectBoxControlUnit}>
                      <option>Everyone</option>
                      <option>My Contacts</option>
                      <option>Nobody Protocol State</option>
                    </select>
                  </div>

                  <div style={styles.configOptionLabelSelectorFlexlineRowItemRow}>
                    <span>Identity Profile Asset Group Visibility Node:</span>
                    <select value={globalPrivacyPolicy.profilePhotoOption} onChange={e => setGlobalPrivacyPolicy({...globalPrivacyPolicy, profilePhotoOption: e.target.value})} style={styles.configSelectionDropdownInputSelectBoxControlUnit}>
                      <option>Everyone</option>
                      <option>My Contacts</option>
                      <option>Nobody Protocol State</option>
                    </select>
                  </div>
                </div>
              )}

              {activeSettingsPanel === 'chat-customizer-hub' && (
                <div style={styles.configurationOptionInspectorCardUnit}>
                  <h3 style={{ borderBottom: '1px solid #222e35', paddingBottom: '10px', marginBottom: '20px' }}>Canvas Theme Rendering Customizers</h3>
                  
                  <div style={styles.configOptionLabelSelectorFlexlineRowItemRow}>
                    <span>Application Frame Base Rendering Layout Mode:</span>
                    <select value={globalChatCustomizer.uiMode} onChange={e => setGlobalChatCustomizer({...globalChatCustomizer, uiMode: e.target.value})} style={styles.configSelectionDropdownInputSelectBoxControlUnit}>
                      <option value="dark">Dark Matrix Engine (डार्क मोड)</option>
                      <option value="light">Light Luminescence Engine (लाइट मोड)</option>
                    </select>
                  </div>

                  <div style={styles.configOptionLabelSelectorFlexlineRowItemRow}>
                    <span>Canvas Typography Scaling Vector Weight:</span>
                    <select value={globalChatCustomizer.typographyWeight} onChange={e => setGlobalChatCustomizer({...globalChatCustomizer, typographyWeight: e.target.value})} style={styles.configSelectionDropdownInputSelectBoxControlUnit}>
                      <option value="13px">Compact Node Pack (13px)</option>
                      <option value="14.5px">Standard Layout Target Array (14.5px)</option>
                      <option value="17px">Expanded Font Scale Viewport Matrix (17px)</option>
                    </select>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          AUXILIARY SCREEN 5: IMMERSIVE FULL SCREEN MEDIA DISPLAY VIEWER DETECTOR
          ======================================================== */}
      {appScreen === 'full-screen-media' && (
        <div style={styles.fullScreenImmersiveMediaViewerOverlayBackdropLayoutCanvas} onClick={() => setAppScreen('dashboard-view')}>
          <div style={styles.fullScreenImmersiveDismissCloseTopActionHeaderBtn}>✕ Tap Screen Layer Canvas Frame to Collapse Vault Array Viewer</div>
          <img src={mediaPreviewContext} alt="Immersive Media Context View Room" style={styles.fullScreenTargetImageRenderElementGraphicImg} />
        </div>
      )}

    </div>
  );
}

// ========================================================
// 4. ARCHITECTURAL LEVEL EXTENSIVE STYLING MANIFEST SCHEMATICS
// ========================================================
const styles = {
  appViewportContainerFrame: {
    width: '100vw',
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    margin: 0,
    boxSizing: 'border-box'
  },
  authViewportModuleDeckCenterBox: {
    backgroundColor: '#111b21',
    padding: '44px 36px',
    borderRadius: '16px',
    boxShadow: '0 12px 40px rgba(0,0,0,0.5)',
    width: '100%',
    maxWidth: '430px',
    textAlign: 'center',
    color: '#ffffff',
    border: '1px solid #222e35'
  },
  brandLogoCircleGraphicWrapper: {
    fontSize: '44px',
    marginBottom: '16px',
    display: 'inline-block'
  },
  authGlobalBrandHeaderTitle: {
    fontSize: '22px',
    fontWeight: '700',
    marginBottom: '8px',
    color: '#00a884',
    letterSpacing: '0.2px'
  },
  authSubtextHelperStringParagraph: {
    color: '#8696a0',
    fontSize: '13.5px',
    lineHeight: '1.5',
    marginBottom: '26px',
    padding: '0 10px'
  },
  authFormVerticalStackPanelBox: {
    display: 'flex',
    flexDirection: 'column',
    gap: '14px'
  },
  authNativeInputBoxControlElement: {
    padding: '14px 16px',
    borderRadius: '10px',
    border: '1px solid #2a3942',
    backgroundColor: '#2a3942',
    color: '#ffffff',
    fontSize: '14.5px',
    outline: 'none',
    width: '100%',
    boxSizing: 'border-box'
  },
  authPrimaryActionSubmitBtnElement: {
    backgroundColor: '#00a884',
    color: '#ffffff',
    border: 'none',
    padding: '14px',
    borderRadius: '10px',
    fontWeight: '700',
    cursor: 'pointer',
    fontSize: '15px',
    marginTop: '8px',
    boxShadow: '0 4px 12px rgba(0,168,132,0.3)',
    transition: 'background 0.2s'
  },
  authSecondaryAlternativeActionLinkBtn: {
    background: 'none',
    color: '#8696a0',
    border: 'none',
    cursor: 'pointer',
    fontSize: '13px',
    textDecoration: 'underline',
    marginTop: '10px'
  },
  mainDashboardTwoColumnLayoutSplitViewport: {
    display: 'grid',
    gridTemplateColumns: '380px 1fr',
    width: '100%',
    height: '100%'
  },
  dashboardDirectorySidebarLeftRailPane: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%'
  },
  dashboardLeftPanelHeaderToolbarRow: {
    height: '60px',
    padding: '10px 16px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxSizing: 'border-box'
  },
  userProfileIdentityAvatarCircularThumbnailImgNode: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    cursor: 'pointer',
    objectFit: 'cover',
    border: '2px solid #00a884'
  },
  dashboardCategoryNavigationTabStripRowBar: {
    display: 'flex',
    height: '48px',
    borderBottom: '1px solid #222e35'
  },
  dashboardTabHeaderClickableActionNode: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    fontWeight: '700',
    fontSize: '12px',
    letterSpacing: '0.6px'
  },
  dashboardVerticalScrollableContactFeedContainerStack: {
    flex: 1,
    overflowY: 'auto'
  },
  rosterCardItemFlexlineContainerBox: {
    display: 'flex',
    alignItems: 'center',
    padding: '14px 16px',
    gap: '14px',
    cursor: 'pointer',
    borderBottom: '1px solid #222e35',
    transition: 'background-color 0.15s'
  },
  rosterContactAvatarElementNodeSquareCircularImg: {
    width: '46px',
    height: '46px',
    borderRadius: '50%',
    objectFit: 'cover'
  },
  rosterContactMetaHeaderFlexlineRow: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '4px'
  },
  rosterContactMessagePreviewSubtextBlockParagraph: {
    margin: 0,
    fontSize: '13px',
    color: '#8696a0',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  },
  dashboardActiveWorkspaceChatCanvasPane: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative'
  },
  workspaceEmptyPlaceholderOverlayCentralContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    color: '#8696a0',
    textAlign: 'center'
  },
  workspaceHeaderNavbarControlStripRow: {
    height: '60px',
    padding: '10px 20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxSizing: 'border-box',
    borderBottom: '1px solid rgba(0,0,0,0.15)',
    zIndex: 10
  },
  workspaceMessagesScrollableCanvasFieldArea: {
    flex: 1,
    overflowY: 'auto',
    padding: '24px 40px',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px'
  },
  messageBubbleFrameStructureBox: {
    maxWidth: '65%',
    padding: '10px 14px',
    borderRadius: '10px',
    boxShadow: '0 1px 1.5px rgba(0,0,0,0.3)',
    color: '#ffffff',
    display: 'flex',
    flexDirection: 'column'
  },
  bubbleTimestampLayoutLineLabelMetaStringField: {
    fontSize: '9.5px',
    color: 'rgba(255,255,255,0.5)',
    textAlign: 'right',
    marginTop: '5px'
  },
  bubbleEmbeddedAssetMediaImageGraphicPreview: {
    width: '100%',
    maxHeight: '220px',
    borderRadius: '8px',
    marginBottom: '6px',
    objectFit: 'cover',
    cursor: 'pointer'
  },
  mediaStagedUploadStatusIndicatorPanelStripBar: {
    padding: '12px 24px',
    backgroundColor: '#111b21',
    borderTop: '1px solid #222e35',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    color: '#00a884'
  },
  workspaceInputFormFooterDockPanelBarRow: {
    padding: '12px 24px',
    display: 'flex',
    alignItems: 'center',
    gap: '18px',
    boxSizing: 'border-box'
  },
  workspaceMainInputTextFieldUnitControlBox: {
    flex: 1,
    padding: '12px 18px',
    borderRadius: '10px',
    border: 'none',
    outline: 'none',
    fontSize: '14.5px'
  },
  workspaceMessagePayloadSubmitActionTriggerBtn: {
    background: 'none',
    border: 'none',
    color: '#00a884',
    fontSize: '24px',
    cursor: 'pointer'
  },
  settingsOverlayPanelCanvasMasterContainerLayout: {
    width: '100%',
    height: '100%',
    backgroundColor: '#0b141a',
    display: 'flex',
    flexDirection: 'column'
  },
  settingsHeaderNavbarTopControlStripRow: {
    height: '60px',
    display: 'flex',
    alignItems: 'center',
    padding: '0 24px',
    gap: '40px',
    color: '#ffffff',
    borderBottom: '1px solid #222e35'
  },
  settingsHeaderReturnActionDismissBtnLink: {
    backgroundColor: 'transparent',
    border: 'none',
    color: '#00a884',
    fontSize: '14.5px',
    cursor: 'pointer',
    fontWeight: '700'
  },
  settingsPanelBodyGridSplitterLayoutFrame: {
    display: 'grid',
    gridTemplateColumns: '300px 1fr',
    flex: 1
  },
  settingsSidebarTabsVerticalStackRail: {
    padding: '24px 12px',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  },
  settingsClickableTabNavigationCardRow: {
    padding: '14px 18px',
    borderRadius: '10px',
    color: '#ffffff',
    cursor: 'pointer',
    fontWeight: '600',
    fontSize: '14px',
    transition: 'background-color 0.2s'
  },
  settingsActiveValueInspectorDisplayPanelFieldPane: {
    padding: '40px 60px'
  },
  configurationOptionInspectorCardUnit: {
    maxWidth: '550px'
  },
  largeScaleAvatarProfileModifierGraphicCircleImg: {
    width: '130px',
    height: '130px',
    borderRadius: '50%',
    objectFit: 'cover',
    border: '3px solid #00a884',
    boxShadow: '0 0 16px rgba(0,168,132,0.4)'
  },
  configOptionLabelSelectorFlexlineRowItemRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '24px',
    fontSize: '14.5px'
  },
  configSelectionDropdownInputSelectBoxControlUnit: {
    backgroundColor: '#2a3942',
    color: '#ffffff',
    border: '1px solid #222e35',
    padding: '10px 14px',
    borderRadius: '8px',
    outline: 'none',
    cursor: 'pointer'
  },
  fullScreenImmersiveMediaViewerOverlayBackdropLayoutCanvas: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    backgroundColor: 'rgba(0,0,0,0.95)',
    zIndex: 99999,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '40px',
    boxSizing: 'border-box'
  },
  fullScreenImmersiveDismissCloseTopActionHeaderBtn: {
    position: 'absolute',
    top: '30px',
    color: '#8696a0',
    fontSize: '14px',
    letterSpacing: '0.4px',
    cursor: 'pointer',
    background: 'rgba(255,255,255,0.05)',
    padding: '8px 16px',
    borderRadius: '20px'
  },
  fullScreenTargetImageRenderElementGraphicImg: {
    maxWidth: '90%',
    maxHeight: '80%',
    objectFit: 'contain',
    borderRadius: '8px',
    boxShadow: '0 8px 30px rgba(0,0,0,0.5)'
  }
};
    
