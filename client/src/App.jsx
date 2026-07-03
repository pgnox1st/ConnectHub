import React, { useState, useEffect, useRef } from 'react';

// ==========================================
// 1. ADVANCED DATA ARRAYS & NODE REGISTRY
// ==========================================
const INITIAL_CONTACTS = {
  101: {
    id: 101,
    name: "Emily Johnson",
    username: "@emily.j",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150",
    status: "online",
    bio: "Design is not just what it looks like, it's how it works. ✨",
    unread: 2,
    typing: false,
    history: [
      { id: 1, text: "Hey there! 👋 Are we still reviewing the ConnectHub UI today?", time: "02:10 PM", type: "inbound" },
      { id: 2, text: "Hi Emily! Yes, absolutely. I'm checking the live logs on Render right now.", time: "02:11 PM", type: "outbound" },
      { id: 3, text: "Awesome! Let me know if you hit any build blockages.", time: "02:11 PM", type: "inbound" },
      { id: 4, text: "I found a tiny syntax error in the style objects but it's completely fixed now.", time: "02:12 PM", type: "outbound" },
      { id: 5, text: "🎙️ Audio note transmitted (0:12)", time: "02:12 PM", type: "inbound", isAudio: true },
      { id: 6, text: "Perfect! Code structure looks clean and ready for deployment. 😁", time: "02:13 PM", type: "outbound" }
    ],
    media: [
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=150",
      "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=150",
      "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=150"
    ]
  },
  102: {
    id: 102,
    name: "Liam Davis",
    username: "@liam.d",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150",
    status: "online",
    bio: "Backend developer | Docker & Kubernetes enthusiast 🛠️",
    unread: 1,
    typing: false,
    history: [
      { id: 1, text: "Hey! The server deployment is green. Vite build process is perfectly stable.", time: "10:45 AM", type: "inbound" }
    ],
    media: []
  },
  103: {
    id: 103,
    name: "Sophia Martinez",
    username: "@sophia.m",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150",
    status: "online",
    bio: "Exploring the matrix of life 🌌",
    unread: 0,
    typing: false,
    history: [
      { id: 1, text: "Sent you the architectural asset files. Check whenever free.", time: "Yesterday", type: "inbound" }
    ],
    media: [
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=150"
    ]
  },
  104: {
    id: 104,
    name: "Noah Wilson",
    username: "@noah.w",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
    status: "offline",
    bio: "Busy keeping the codebase clean. Do not disturb.",
    unread: 0,
    typing: false,
    history: [
      { id: 1, text: "Let's plan the weekend sync-up session over coffee.", time: "2 days ago", type: "outbound" }
    ],
    media: []
  },
  105: {
    id: 105,
    name: "Olivia Taylor",
    username: "@olivia.t",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150",
    status: "offline",
    bio: "Product Manager | Making apps faster and beautiful.",
    unread: 0,
    typing: false,
    history: [
      { id: 1, text: "Call entry missed at 09:15 AM", time: "3 days ago", type: "missed" }
    ],
    media: []
  }
};

const INITIAL_GROUPS = [
  { id: 501, name: "ConnectHub Core Devs", members: "12 active nodes", avatar: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=150", description: "Official workspace for code architecture discussions." },
  { id: 502, name: "UI/UX Creative Matrix", members: "6 thinkers", avatar: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=150", description: "Brainstorming premium interface elements and dark mode aesthetics." },
  { id: 503, name: "Volatile Testers Array", members: "45 users", avatar: "https://images.unsplash.com/photo-1581579438747-1dc8d1e0ca96?w=150", description: "Public deployment alpha staging crash reports tracker logs." }
];

const INITIAL_CALLS = [
  { id: 901, name: "Liam Davis", type: "Voice Session", status: "Outgoing", time: "5m ago", icon: "fa-arrow-up-right", color: "#25d366", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150" },
  { id: 902, name: "Sophia Martinez", type: "Video Session", status: "Incoming", time: "42m ago", icon: "fa-arrow-down-left", color: "#25d366", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150" },
  { id: 903, name: "Noah Wilson", type: "Voice Session", status: "Missed Check", time: "Yesterday", icon: "fa-arrow-down-left", color: "#ea0038", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150" }
];

export default function App() {
  // Navigation & Screen Control Hub States
  const [currentScreen, setCurrentScreen] = useState('app'); // welcome -> login -> app
  const [activeTab, setActiveTab] = useState('messages'); // messages, calls, people, groups, settings
  const [selectedChatId, setSelectedChatId] = useState(101);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Real-time Storage Engine States
  const [database, setDatabase] = useState(INITIAL_CONTACTS);
  const [inputMessage, setInputMessage] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 768);
  const [showAttachmentMenu, setShowAttachmentMenu] = useState(false);

  // Live Telecom Call State Management
  const [activeCall, setActiveCall] = useState(null); 
  const [callTimer, setCallTimer] = useState(0);

  const messagesEndRef = useRef(null);
  let callIntervalInstance = useRef(null);

  // Window Resize Listener for Responsive Adjustments
  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth <= 768;
      setIsMobileView(isMobile);
      if (isMobile) setIsSidebarOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Call StopWatch Timer Lifecycle Hook
  useEffect(() => {
    if (activeCall && activeCall.status.includes("Connected")) {
      callIntervalInstance.current = setInterval(() => {
        setCallTimer(prev => prev + 1);
      }, 1000);
    } else {
      clearInterval(callIntervalInstance.current);
      setCallTimer(0);
    }
    return () => clearInterval(callIntervalInstance.current);
  }, [activeCall]);

  // Scroll Viewport Auto-Anchor Hook
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [database, selectedChatId]);

  // Formatted StopWatch Stream Calculator
  const compileCallDuration = (totalSeconds) => {
    const minutes = Math.floor(totalSeconds / 60).toString().padStart(2, '0');
    const seconds = (totalSeconds % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const currentTargetId = selectedChatId;
    const currentTargetContact = database[currentTargetId];
    const clockTimestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const updatedHistoryLog = [
      ...currentTargetContact.history,
      { id: Date.now(), text: inputMessage, time: clockTimestamp, type: "outbound" }
    ];

    setDatabase(prev => ({
      ...prev,
      [currentTargetId]: { ...prev[currentTargetId], history: updatedHistoryLog }
    }));
    setInputMessage('');
    setShowAttachmentMenu(false);

    // Advanced Automated Peer System Responder Simulation
    setTimeout(() => {
      setDatabase(prev => {
        if (!prev[currentTargetId]) return prev;
        return {
          ...prev,
          [currentTargetId]: { ...prev[currentTargetId], typing: true }
        };
      });
    }, 900);

    setTimeout(() => {
      setDatabase(prev => {
        if (!prev[currentTargetId]) return prev;
        const currentInstance = prev[currentTargetId];
        
        let microResponseText = "Message payload securely sync'd with remote database node. ✔️";
        if (currentInstance.name.includes("Emily")) {
          microResponseText = "Wow, that's awesome! The Render deployment build is fully active now. 🚀";
        } else if (currentInstance.name.includes("Liam")) {
          microResponseText = "Acknowledged. Merging code improvements branch inside the main root container.";
        }

        return {
          ...prev,
          [currentTargetId]: {
            ...currentInstance,
            typing: false,
            history: [
              ...currentInstance.history,
              { id: Date.now() + 1, text: microResponseText, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), type: "inbound" }
            ]
          }
        };
      });
    }, 2400);
  };

  const launchCallSession = (targetUser, sessionType) => {
    setActiveCall({ user: targetUser, type: sessionType, status: "Establishing secure pipeline..." });
    setTimeout(() => {
      setActiveCall(prev => prev ? { ...prev, status: "Connected State (Active Encryption)" } : null);
    }, 1800);
  };

  const closeCallSession = () => {
    setActiveCall(null);
  };

  return (
    <div style={styles.bodyWrapper}>
      
      {/* ========================================================
          SCREEN 1: WELCOME INTRO GATEWAY SPLASH 
          ======================================================== */}
      {currentScreen === 'welcome' && (
        <div style={styles.fullscreenOnboarding}>
          <div style={styles.onboardingCard}>
            <div style={styles.appIconLogo}><i class="fas fa-comments"></i></div>
            <h1 style={styles.onboardingTitle}>ConnectHub</h1>
            <p style={styles.onboardingSubtitle}>The industrial grade fast communication ecosystem layer.<br/>Secure. Reliable. Decentralized.</p>
            <button style={styles.primaryActionButton} onClick={() => setCurrentScreen('login')}>Initialize Secure Key</button>
            <button style={styles.secondaryTextButton} onClick={() => setCurrentScreen('app')}>Bypass Auth (Staging Node)</button>
          </div>
        </div>
      )}

      {/* ========================================================
          SCREEN 2: IDENTITY SECURE CREDENTIALS ENTER LINK
          ======================================================== */}
      {currentScreen === 'login' && (
        <div style={styles.fullscreenOnboarding}>
          <div style={styles.onboardingCard}>
            <div style={styles.appIconLogo}><i class="fas fa-user-shield"></i></div>
            <h2 style={{ ...styles.onboardingTitle, fontSize: '26px' }}>Identity Handshake</h2>
            <p style={{ ...styles.onboardingSubtitle, marginBottom: '25px' }}>Access decrypted user environment matrix</p>
            
            <div style={styles.inputFormGroup}>
              <i class="fas fa-envelope" style={styles.formInputIcon}></i>
              <input type="email" placeholder="dev.node@connecthub.io" defaultValue="dev.node@connecthub.io" style={styles.formInputField} />
            </div>
            <div style={styles.inputFormGroup}>
              <i class="fas fa-lock" style={styles.formInputIcon}></i>
              <input type="password" placeholder="••••••••••••" defaultValue="password123" style={styles.formInputField} />
            </div>

            <button style={styles.primaryActionButton} onClick={() => setCurrentScreen('app')}>Unlock Terminal</button>
            <div style={styles.authDivider}>Or link physical signature hardware via</div>
            <div style={styles.oauthButtonGroupRow}>
              <button style={styles.oauthIconButton}><i class="fab fa-google" style={{ color: '#ea4335' }}></i></button>
              <button style={styles.oauthIconButton}><i class="fab fa-apple" style={{ color: '#ffffff' }}></i></button>
              <button style={styles.oauthIconButton}><i class="fab fa-github" style={{ color: '#ffffff' }}></i></button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          SCREEN 3: MAIN APP ECOSYSTEM MASTER FRAMEWORK
          ======================================================== */}
      {currentScreen === 'app' && (
        <div style={styles.masterAppWorkspaceContainer}>
          
          {/* COLUMN 1: VERTICAL CONTROLS ICON STRIP */}
          {(!isMobileView || selectedChatId === null) && (
            <div style={styles.navigationSidebarControlDeck}>
              <div style={styles.brandGroupContainer}>
                <div style={styles.brandLogoCircle}><i class="fas fa-bolt"></i></div>
                {!isMobileView && <span style={styles.brandTextLabel}>ConnectHub</span>}
              </div>

              <div style={styles.navigationTabItemsWrapper}>
                <div style={{ ...styles.tabItemButtonLink, ...(activeTab === 'messages' ? styles.tabItemButtonLinkActive : {}) }} onClick={() => setActiveTab('messages')}>
                  <i class="fas fa-message"></i>
                  {!isMobileView && <span>Chat Matrix</span>}
                </div>
                <div style={{ ...styles.tabItemButtonLink, ...(activeTab === 'calls' ? styles.tabItemButtonLinkActive : {}) }} onClick={() => setActiveTab('calls')}>
                  <i class="fas fa-phone"></i>
                  {!isMobileView && <span>Comms Call</span>}
                </div>
                <div style={{ ...styles.tabItemButtonLink, ...(activeTab === 'people' ? styles.tabItemButtonLinkActive : {}) }} onClick={() => setActiveTab('people')}>
                  <i class="fas fa-user-group"></i>
                  {!isMobileView && <span>Directory</span>}
                </div>
                <div style={{ ...styles.tabItemButtonLink, ...(activeTab === 'groups' ? styles.tabItemButtonLinkActive : {}) }} onClick={() => setActiveTab('groups')}>
                  <i class="fas fa-users-viewfinder"></i>
                  {!isMobileView && <span>Channels</span>}
                </div>
                <div style={{ ...styles.tabItemButtonLink, ...(activeTab === 'settings' ? styles.tabItemButtonLinkActive : {}) }} onClick={() => setActiveTab('settings')}>
                  <i class="fas fa-gear"></i>
                  {!isMobileView && <span>Settings</span>}
                </div>
              </div>

              <div style={styles.currentUserIdentityFooterProfileDeck}>
                <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150" alt="Root Master User Profile" style={styles.currentUserIdentityAvatarNode} />
                {!isMobileView && (
                  <div style={{ marginLeft: '10px', overflow: 'hidden' }}>
                    <div style={{ fontWeight: '600', color: '#ffffff', fontSize: '14px', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>Alpha Developer</div>
                    <div style={{ color: '#25d366', fontSize: '11px', display: 'flex', alignItems: 'center' }}><i class="fas fa-circle" style={{ fontSize: '6px', marginRight: '4px' }}></i>System Root</div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* COLUMN 2: ACTIVE TARGET DIRECTORY ITEMS COMPONENT PANEL */}
          {(!isMobileView || (selectedChatId === null && activeTab !== '')) && (
            <div style={styles.operationalLedgerPanelSection}>
              <div style={styles.ledgerHeaderPanelRow}>
                <h2 style={styles.ledgerHeaderPanelTitle}>
                  {activeTab === 'messages' ? 'Conversations' : activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
                </h2>
                <div style={styles.searchBoxInputControlWrapper}>
                  <i class="fas fa-search" style={styles.searchBoxIconElement}></i>
                  <input type="text" placeholder={`Search secure logs...`} value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} style={styles.searchBoxInputNode} />
                </div>
              </div>

              <div style={styles.ledgerDynamicScrollableContainerFeed}>
                
                {/* MATRICES RENDER TAB ENGINE LAYER: CHAT ROSTER */}
                {activeTab === 'messages' && Object.values(database)
                  .filter(c => c.name.toLowerCase().includes(searchQuery.toLowerCase()))
                  .map(contact => {
                    const logsArray = contact.history;
                    const finalLogNode = logsArray[logsArray.length - 1];
                    return (
                      <div key={contact.id} style={{ ...styles.contactDataRowItemCard, ...(selectedChatId === contact.id ? styles.contactDataRowItemCardSelected : {}) }} onClick={() => setSelectedChatId(contact.id)}>
                        <div style={styles.contactAvatarFrameComponentWrapper}>
                          <img src={contact.avatar} alt={contact.name} style={styles.contactAvatarImageNode} />
                          {contact.status === 'online' && <div style={styles.contactOnlineStatusTelemetryDotIndicator}></div>}
                        </div>
                        <div style={{ flex: 1, overflow: 'hidden' }}>
                          <div style={styles.contactMetaInformationRowHeaderLine}>
                            <span style={styles.contactIdentityDisplayNameLabelText}>{contact.name}</span>
                            <span style={styles.contactDataNodeTimestampLabel}>{finalLogNode ? finalLogNode.time : ''}</span>
                          </div>
                          <div style={styles.contactMetaInformationRowSubLine}>
                            <span style={styles.contactDataNodeMessageTextPreviewString}>
                              {contact.typing ? <span style={{ color: '#a855f7', fontWeight: '700' }}>typing message...</span> : (finalLogNode ? finalLogNode.text : 'Empty queue channel logs.')}
                            </span>
                            {contact.unread > 0 && <span style={styles.contactUnreadBadgeCounterBadge}>{contact.unread}</span>}
                          </div>
                        </div>
                      </div>
                    );
                })}

                {/* MATRICES RENDER TAB ENGINE LAYER: RECENT CALLS */}
                {activeTab === 'calls' && INITIAL_CALLS.map(call => (
                  <div key={call.id} style={styles.contactDataRowItemCard}>
                    <img src={call.avatar} alt={call.name} style={styles.contactAvatarImageNode} />
                    <div style={{ flex: 1, marginLeft: '12px' }}>
                      <div style={styles.contactIdentityDisplayNameLabelText}>{call.name}</div>
                      <div style={{ fontSize: '13px', color: '#8696a0', marginTop: '2px' }}>
                        <i class={`fas ${call.icon}`} style={{ color: call.color, marginRight: '6px' }}></i>
                        {call.type} • {call.time}
                      </div>
                    </div>
                    <button style={styles.circularActionButtonControlNode} onClick={() => launchCallSession(call, 'Voice Call')}><i class="fas fa-phone" style={{ color: '#a855f7' }}></i></button>
                  </div>
                ))}

                {/* MATRICES RENDER TAB ENGINE LAYER: MEMBERS DIRECTORY */}
                {activeTab === 'people' && Object.values(database).map(contact => (
                  <div key={contact.id} style={styles.contactDataRowItemCard}>
                    <img src={contact.avatar} alt={contact.name} style={styles.contactAvatarImageNode} />
                    <div style={{ flex: 1, marginLeft: '12px' }}>
                      <div style={styles.contactIdentityDisplayNameLabelText}>{contact.name}</div>
                      <div style={{ fontSize: '13px', color: '#8696a0', marginTop: '2px' }}>{contact.username}</div>
                    </div>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button style={styles.circularActionButtonControlNode} onClick={() => launchCallSession(contact, 'Voice Session Call')}><i class="fas fa-phone"></i></button>
                      <button style={styles.circularActionButtonControlNode} onClick={() => launchCallSession(contact, 'Video Session Call')}><i class="fas fa-video"></i></button>
                    </div>
                  </div>
                ))}

                {/* MATRICES RENDER TAB ENGINE LAYER: CHANNELS/GROUPS */}
                {activeTab === 'groups' && INITIAL_GROUPS.map(group => (
                  <div key={group.id} style={{ ...styles.contactDataRowItemCard, flexDirection: 'column', alignItems: 'flex-start', padding: '16px', gap: '10px', background: '#1c262d', border: '1px solid #222e35' }}>
                    <div style={{ display: 'flex', alignItems: 'center', width: '100%', gap: '12px' }}>
                      <img src={group.avatar} alt={group.name} style={{ ...styles.contactAvatarImageNode, width: '40px', height: '40px' }} />
                      <div style={{ flex: 1 }}>
                        <div style={styles.contactIdentityDisplayNameLabelText}>{group.name}</div>
                        <div style={{ fontSize: '12px', color: '#a855f7', fontWeight: '500' }}>{group.members}</div>
                      </div>
                    </div>
                    <p style={{ fontSize: '13px', color: '#8696a0', lineHeight: '1.4' }}>{group.description}</p>
                    <button style={{ ...styles.primaryActionButton, padding: '8px 14px', fontSize: '13px', borderRadius: '8px' }}>Join Staging Room</button>
                  </div>
                ))}

                {/* MATRICES RENDER TAB ENGINE LAYER: CORE APP CONFIG SYSTEM */}
                {activeTab === 'settings' && (
                  <div style={{ padding: '4px' }}>
                    <div style={styles.settingsOptionMenuRowButtonNode}>
                      <i class="fas fa-user-shield" style={styles.settingsOptionMenuRowIconElement}></i>
                      <div>
                        <div style={styles.settingsOptionMenuRowPrimaryTitleText}>End-to-End Cryptography Keys</div>
                        <div style={styles.settingsOptionMenuRowSecondaryDescriptionText}>Enforce strict peer communication verification checks</div>
                      </div>
                    </div>
                    <div style={styles.settingsOptionMenuRowButtonNode}>
                      <i class="fas fa-server" style={styles.settingsOptionMenuRowIconElement}></i>
                      <div>
                        <div style={styles.settingsOptionMenuRowPrimaryTitleText}>Staging Buffer Database</div>
                        <div style={styles.settingsOptionMenuRowSecondaryDescriptionText}>Purge local volatile message cache storage indexes</div>
                      </div>
                    </div>
                    <div style={styles.settingsOptionMenuRowButtonNode}>
                      <i class="fas fa-network-wired" style={styles.settingsOptionMenuRowIconElement}></i>
                      <div>
                        <div style={styles.settingsOptionMenuRowPrimaryTitleText}>WebRTC Network Routing Profile</div>
                        <div style={styles.settingsOptionMenuRowSecondaryDescriptionText}>Configure TURN/STUN proxy servers channels endpoints</div>
                      </div>
                    </div>
                  </div>
                )}

              </div>
            </div>
          )}

          {/* COLUMN 3: LIVE STREAM CONVERSATION WINDOW ENVIRONMENT CONTAINER */}
          {(!isMobileView || selectedChatId !== null) && activeTab === 'messages' && (
            <div style={styles.conversationEcosystemMainCanvasContainerPanel}>
              {selectedChatId ? (
                <>
                  {/* CONVERSATION TOP BAR COMPONENT CONTROL CONTROL PANELS */}
                  <div style={styles.chatHeaderToolbarControlRow}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      {isMobileView && (
                        <button style={styles.borderlessTransparentActionControlBtn} onClick={() => setSelectedChatId(null)}>
                          <i class="fas fa-arrow-left" style={{ fontSize: '18px', color: '#ffffff' }}></i>
                        </button>
                      )}
                      <img src={database[selectedChatId].avatar} alt={database[selectedChatId].name} style={styles.chatHeaderActiveUserAvatarElementNode} />
                      <div>
                        <div style={styles.chatHeaderActiveUserDisplayNameLabelText}>{database[selectedChatId].name}</div>
                        <div style={{ fontSize: '12px', color: database[selectedChatId].status === 'online' ? '#25d366' : '#8696a0', display: 'flex', alignItems: 'center', gap: '4px' }}>
                          {database[selectedChatId].typing ? (
                            <span style={{ color: '#a855f7', fontWeight: 'bold' }}>typing...</span>
                          ) : (
                            <>
                              <i class="fas fa-circle" style={{ fontSize: '5px', color: database[selectedChatId].status === 'online' ? '#25d366' : '#8696a0' }}></i>
                              {database[selectedChatId].status}
                            </>
                          )}
                        </div>
                      </div>
                    </div>

                    <div style={{ display: 'flex', gap: '22px', fontSize: '18px', color: '#a855f7', cursor: 'pointer', alignItems: 'center' }}>
                      <i class="fas fa-phone" onClick={() => launchCallSession(database[selectedChatId], 'Encrypted Voice Call')}></i>
                      <i class="fas fa-video" onClick={() => launchCallSession(database[selectedChatId], 'Immersive Video Call')}></i>
                      <i class="fas fa-sidebar" style={{ transform: isSidebarOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} onClick={() => setIsSidebarOpen(!isSidebarOpen)}></i>
                    </div>
                  </div>

                  {/* CHAT INTERACTIVE LOG MESSAGES CANVAS VIEW AREA */}
                  <div style={styles.chatMessagesScrollableCanvasViewportAreaBodyContainer}>
                    {database[selectedChatId].history.map(msg => (
                      <div key={msg.id} style={{ ...styles.messageBubbleBaseStructureLayoutCard, ...(msg.type === 'outbound' ? styles.messageBubbleBaseStructureLayoutCardOutbound : styles.messageBubbleBaseStructureLayoutCardInbound) }}>
                        {msg.isAudio ? (
                          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '4px 0', minWidth: '180px' }}>
                            <button style={styles.audioMessageComponentPlayCircularBtnElementNode}><i class="fas fa-play"></i></button>
                            <div style={{ flex: 1, height: '4px', background: 'rgba(255,255,255,0.2)', borderRadius: '2px', position: 'relative' }}>
                              <div style={{ width: '40%', height: '100%', background: '#ffffff', borderRadius: '2px' }}></div>
                            </div>
                            <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.7)' }}>0:12</span>
                          </div>
                        ) : (
                          <div style={{ wordBreak: 'break-word' }}>{msg.text}</div>
                        )}
                        <div style={styles.messageBubbleCardFooterLineMetadataRowLayout}>
                          <span>{msg.time}</span>
                          {msg.type === 'outbound' && <i class="fas fa-check-double" style={{ color: '#34b7f1', marginLeft: '4px' }}></i>}
                        </div>
                      </div>
                    ))}
                    <div ref={messagesEndRef} />
                  </div>

                  {/* ACTIVE SECURE DATA LINK INPUT DOCK ENGINE SECTION ELEMENT */}
                  <div style={{ position: 'relative' }}>
                    {showAttachmentMenu && (
                      <div style={styles.floatingAttachmentPanelDrawer}>
                        <div style={styles.attachmentDrawerItemRow}><i class="fas fa-file-invoice" style={{ color: '#5157e0' }}></i> Document Buffer</div>
                        <div style={styles.attachmentDrawerItemRow}><i class="fas fa-image" style={{ color: '#e051b8' }}></i> Photo Grid Media</div>
                        <div style={styles.attachmentDrawerItemRow}><i class="fas fa-location-dot" style={{ color: '#1ca64a' }}></i> Geolocation Matrix</div>
                      </div>
                    )}

                    <div style={styles.chatInputDockToolbarPanelFooterBar}>
                      <i class="far fa-face-smile" style={{ fontSize: '22px', color: '#8696a0', cursor: 'pointer' }}></i>
                      <i class="fas fa-paperclip" style={{ fontSize: '20px', color: showAttachmentMenu ? '#a855f7' : '#8696a0', cursor: 'pointer' }} onClick={() => setShowAttachmentMenu(!showAttachmentMenu)}></i>
                      <input type="text" placeholder="Type an encrypted stream message packet..." value={inputMessage} onChange={(e) => setInputMessage(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()} style={styles.chatInputFieldTextNodeControl} />
                      <button style={styles.chatInputDockToolbarPanelSubmitActionCircularBtnControl} onClick={handleSendMessage}>
                        <i class="fas fa-paper-plane" style={{ color: '#ffffff', fontSize: '15px' }}></i>
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <div style={styles.conversationEcosystemMainCanvasContainerPanelEmptyStatePlaceholderContainer}>
                  <i class="fas fa-circle-nodes" style={{ fontSize: '80px', color: '#1c262d', marginBottom: '20px' }}></i>
                  <h3 style={{ color: '#ffffff', marginBottom: '8px' }}>Active Workspace Channel Link Idle</h3>
                  <p style={{ maxWidth: '400px', fontSize: '14px' }}>Select an available user endpoint from the list matrix left sidebar assembly to spin up an ephemeral communication layer session.</p>
                </div>
              )}
            </div>
          )}

          {/* COLUMN 4: EXTRA DETAILED METADATA COMPONENT PROFILE VIEW DRAWER */}
          {isSidebarOpen && activeTab === 'messages' && selectedChatId && !isMobileView && (
            <div style={styles.profileExtendedDetailsSidebarDeckColumnPanel}>
              <div style={{ textAlign: 'center', marginBottom: '26px' }}>
                <img src={database[selectedChatId].avatar} alt={database[selectedChatId].name} style={styles.profileExtendedDetailsSidebarDeckColumnPanelAvatarNodeElementComponent} />
                <h3 style={{ color: '#ffffff', margin: '14px 0 4px 0', fontSize: '18px' }}>{database[selectedChatId].name}</h3>
                <p style={{ color: '#8696a0', fontSize: '13px' }}>{database[selectedChatId].username}</p>
              </div>

              <div style={{ background: '#1c262d', padding: '14px', borderRadius: '12px', border: '1px solid #222e35', marginBottom: '20px' }}>
                <div style={{ fontSize: '12px', color: '#a855f7', fontWeight: 'bold', textTransform: 'uppercase', marginBottom: '4px' }}>User Information Log</div>
                <div style={{ fontSize: '14px', color: '#e9edef', lineHeight: '1.4' }}>{database[selectedChatId].bio}</div>
              </div>

              <div style={styles.profileExtendedDetailsSidebarDeckColumnPanelOauthActionButtonsQuickRow}>
                <button style={styles.profileExtendedDetailsSidebarDeckColumnPanelOauthActionButtonLinkNode} onClick={() => launchCallSession(database[selectedChatId], 'Voice Call')}><i class="fas fa-phone"></i><div>Voice Call</div></button>
                <button style={styles.profileExtendedDetailsSidebarDeckColumnPanelOauthActionButtonLinkNode} onClick={() => launchCallSession(database[selectedChatId], 'Video Call')}><i class="fas fa-video"></i><div>Video Call</div></button>
              </div>

              <hr style={{ border: 'none', height: '1px', background: '#222e35', margin: '20px 0' }} />

              <h4 style={{ color: '#ffffff', fontSize: '13px', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Shared Asset Buffer Logs</h4>
              <div style={styles.profileExtendedDetailsSidebarDeckColumnPanelMediaAttachmentsPhotoGalleryMatrixGridAreaContainer}>
                {database[selectedChatId].media && database[selectedChatId].media.length > 0 ? (
                  database[selectedChatId].media.map((img, index) => (
                    <img key={index} src={img} alt="Shared Matrix Graphics Asset" style={styles.profileExtendedDetailsSidebarDeckColumnPanelMediaAttachmentsPhotoGalleryMatrixGridAreaItemComponentNode} />
                  ))
                ) : (
                  <div style={{ color: '#8696a0', fontSize: '12px', gridColumn: 'span 3', textAlign: 'center', padding: '14px', background: '#1c262d', borderRadius: '8px' }}>No media shared storage files arrays recorded.</div>
                )}
              </div>

              <div style={{ marginTop: '24px' }}>
                <div style={styles.profileExtendedDetailsSidebarDeckColumnPanelSystemSettingsActionLabelBtnLinkRow}><i class="fas fa-bell-slash"></i> Mute Notification Stream</div>
                <div style={{ ...styles.profileExtendedDetailsSidebarDeckColumnPanelSystemSettingsActionLabelBtnLinkRow, color: '#ea0038' }}><i class="fas fa-ban"></i> Revoke Connection Access Token</div>
              </div>
            </div>
          )}

          {/* ========================================================
              LIVE TELECOM OVERLAY WINDOW LAYER VIEWPORT CONTAINER
              ======================================================== */}
          {activeCall && (
            <div style={styles.immersiveLiveCallModalScreenMatrixOverlayBoxBackdropLayer}>
              <div style={{ textAlign: 'center' }}>
                <img src={activeCall.user.avatar} alt="Active remote target participant profile data footprint" style={styles.immersiveLiveCallModalScreenMatrixOverlayBoxAvatarNodeGraphicElement} />
                <h2 style={{ color: '#ffffff', fontSize: '24px', marginBottom: '6px' }}>{activeCall.user.name}</h2>
                
                {activeCall.status.includes("Connected") ? (
                  <div style={{ ...styles.immersiveLiveCallModalScreenMatrixOverlayBoxTelemetryPulseStatusMsg, color: '#a855f7', fontWeight: 'bold', fontSize: '18px' }}>
                    <i class="fas fa-shield-halved" style={{ marginRight: '8px' }}></i>
                    {compileCallDuration(callTimer)}
                  </div>
                ) : (
                  <div style={styles.immersiveLiveCallModalScreenMatrixOverlayBoxTelemetryPulseStatusMsg}>{activeCall.status}</div>
                )}
              </div>

              <div style={styles.immersiveLiveCallModalScreenMatrixOverlayBoxActionControlsButtonsToolbarRowConsoleDesk}>
                <button style={styles.immersiveLiveCallModalScreenMatrixOverlayBoxActionControlsIconCircleBtn}><i class="fas fa-microphone-slash"></i></button>
                <button style={styles.immersiveLiveCallModalScreenMatrixOverlayBoxActionControlsIconCircleBtn}><i class="fas fa-volume-high"></i></button>
                <button style={{ ...styles.immersiveLiveCallModalScreenMatrixOverlayBoxActionControlsIconCircleBtn, background: '#ea0038' }} onClick={closeCallSession}><i class="fas fa-phone-slash"></i></button>
              </div>
            </div>
          )}

        </div>
      )}
    </div>
  );
}

// ==========================================
// 2. STYLES SHEET SPECIFICATION MAP DATA MODULE
// ==========================================
const styles = {
  bodyWrapper: {
    backgroundColor: '#0b141a',
    color: '#e9edef',
    height: '100vh',
    width: '100vw',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden'
  },
  fullscreenOnboarding: {
    width: '100%',
    height: '100%',
    background: 'radial-gradient(circle at center, #111b21 0%, #0b141a 100%)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px'
  },
  onboardingCard: {
    background: '#111b21',
    border: '1px solid #222e35',
    borderRadius: '24px',
    padding: '40px 30px',
    maxWidth: '410px',
    width: '100%',
    textAlign: 'center',
    boxShadow: '0 20px 40px rgba(0,0,0,0.5)'
  },
  appIconLogo: {
    fontSize: '56px',
    color: '#a855f7',
    marginBottom: '22px'
  },
  onboardingTitle: {
    fontSize: '30px',
    fontWeight: '800',
    color: '#ffffff',
    letterSpacing: '0.5px',
    marginBottom: '12px'
  },
  onboardingSubtitle: {
    fontSize: '14.5px',
    color: '#8696a0',
    lineHeight: '1.55',
    marginBottom: '36px'
  },
  primaryActionButton: {
    background: '#a855f7',
    color: '#ffffff',
    border: 'none',
    borderRadius: '12px',
    padding: '14px 24px',
    fontSize: '15.5px',
    fontWeight: '600',
    width: '100%',
    cursor: 'pointer',
    boxShadow: '0 4px 14px rgba(168,85,247,0.35)'
  },
  secondaryTextButton: {
    background: 'transparent',
    color: '#8696a0',
    border: 'none',
    marginTop: '16px',
    fontSize: '13.5px',
    fontWeight: '500',
    cursor: 'pointer'
  },
  inputFormGroup: {
    background: '#202c33',
    border: '1px solid #222e35',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    padding: '12px 16px',
    gap: '14px',
    marginBottom: '16px'
  },
  formInputIcon: {
    color: '#8696a0',
    fontSize: '15px'
  },
  formInputField: {
    background: 'transparent',
    border: 'none',
    outline: 'none',
    color: '#ffffff',
    fontSize: '14.5px',
    width: '100%'
  },
  authDivider: {
    color: '#8696a0',
    fontSize: '12.5px',
    margin: '24px 0'
  },
  oauthButtonGroupRow: {
    display: 'flex',
    justifyContent: 'center',
    gap: '16px'
  },
  oauthIconButton: {
    background: '#202c33',
    border: '1px solid #222e35',
    width: '48px',
    height: '48px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '17px',
    cursor: 'pointer'
  },
  masterAppWorkspaceContainer: {
    width: '100%',
    height: '100%',
    display: 'flex',
    background: '#111b21',
    overflow: 'hidden'
  },
  navigationSidebarControlDeck: {
    background: '#111b21',
    borderRight: '1px solid #222e35',
    width: '240px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: '24px 14px',
    flexShrink: 0
  },
  brandGroupContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '0 6px',
    marginBottom: '30px'
  },
  brandLogoCircle: {
    background: '#a855f7',
    color: '#ffffff',
    width: '34px',
    height: '34px',
    borderRadius: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '16px'
  },
  brandTextLabel: {
    fontSize: '19px',
    fontWeight: '700',
    color: '#ffffff',
    letterSpacing: '0.2px'
  },
  navigationTabItemsWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
    flex: 1
  },
  tabItemButtonLink: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '12px 14px',
    borderRadius: '10px',
    color: '#8696a0',
    fontSize: '14.5px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.15s'
  },
  tabItemButtonLinkActive: {
    background: 'rgba(168,85,247,0.12)',
    color: '#a855f7',
    fontWeight: '600'
  },
  currentUserIdentityFooterProfileDeck: {
    display: 'flex',
    alignItems: 'center',
    padding: '10px',
    background: '#1c262d',
    border: '1px solid #222e35',
    borderRadius: '14px'
  },
  currentUserIdentityAvatarNode: {
    width: '36px',
    height: '36px',
    borderRadius: '50%',
    objectFit: 'cover'
  },
  operationalLedgerPanelSection: {
    background: '#111b21',
    borderRight: '1px solid #222e35',
    width: '340px',
    display: 'flex',
    flexDirection: 'column',
    flexShrink: 0
  },
  ledgerHeaderPanelRow: {
    padding: '24px 20px 14px 20px'
  },
  ledgerHeaderPanelTitle: {
    fontSize: '22px',
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: '14px'
  },
  searchBoxInputControlWrapper: {
    background: '#1c262d',
    border: '1px solid #222e35',
    borderRadius: '10px',
    display: 'flex',
    alignItems: 'center',
    padding: '8px 14px',
    gap: '10px'
  },
  searchBoxIconElement: {
    color: '#8696a0',
    fontSize: '13px'
  },
  searchBoxInputNode: {
    background: 'transparent',
    border: 'none',
    outline: 'none',
    color: '#ffffff',
    fontSize: '13.5px',
    width: '100%'
  },
  ledgerDynamicScrollableContainerFeed: {
    flex: 1,
    overflowY: 'auto',
    padding: '0 8px 20px 8px'
  },
  contactDataRowItemCard: {
    display: 'flex',
    alignItems: 'center',
    padding: '12px',
    borderRadius: '12px',
    cursor: 'pointer',
    marginBottom: '3px',
    transition: 'background 0.15s'
  },
  contactDataRowItemCardSelected: {
    background: '#1c262d'
  },
  contactAvatarFrameComponentWrapper: {
    position: 'relative',
    marginRight: '12px'
  },
  contactAvatarImageNode: {
    width: '46px',
    height: '46px',
    borderRadius: '50%',
    objectFit: 'cover'
  },
  contactOnlineStatusTelemetryDotIndicator: {
    width: '11px',
    height: '11px',
    backgroundColor: '#25d366',
    border: '2px solid #111b21',
    borderRadius: '50%',
    position: 'absolute',
    bottom: '1px',
    right: '0px'
  },
  contactMetaInformationRowHeaderLine: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '3px'
  },
  contactIdentityDisplayNameLabelText: {
    fontWeight: '600',
    color: '#ffffff',
    fontSize: '14.5px'
  },
  contactDataNodeTimestampLabel: {
    fontSize: '11.5px',
    color: '#8696a0'
  },
  contactMetaInformationRowSubLine: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  contactDataNodeMessageTextPreviewString: {
    fontSize: '13px',
    color: '#8696a0',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    maxWidth: '170px'
  },
  contactUnreadBadgeCounterBadge: {
    background: '#a855f7',
    color: '#ffffff',
    fontSize: '11px',
    fontWeight: '700',
    borderRadius: '50%',
    padding: '2px 5px',
    minWidth: '17px',
    textAlign: 'center'
  },
  circularActionButtonControlNode: {
    width: '34px',
    height: '34px',
    borderRadius: '50%',
    background: '#1c262d',
    border: 'none',
    color: '#8696a0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer'
  },
  settingsOptionMenuRowButtonNode: {
    display: 'flex',
    alignItems: 'center',
    gap: '14px',
    padding: '14px 10px',
    borderRadius: '10px',
    cursor: 'pointer',
    borderBottom: '1px solid #222e35'
  },
  settingsOptionMenuRowIconElement: {
    fontSize: '18px',
    color: '#a855f7',
    width: '22px',
    textAlign: 'center'
  },
  settingsOptionMenuRowPrimaryTitleText: {
    fontWeight: '600',
    color: '#ffffff',
    fontSize: '14.5px'
  },
  settingsOptionMenuRowSecondaryDescriptionText: {
    fontSize: '12px',
    color: '#8696a0',
    marginTop: '2px'
  },
  conversationEcosystemMainCanvasContainerPanel: {
    flex: 1,
    background: '#0b141a',
    display: 'flex',
    flexDirection: 'column'
  },
  conversationEcosystemMainCanvasContainerPanelEmptyStatePlaceholderContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '40px',
    textAlign: 'center',
    color: '#8696a0'
  },
  chatHeaderToolbarControlRow: {
    background: '#111b21',
    borderBottom: '1px solid #222e35',
    padding: '14px 20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    zIndex: 10
  },
  chatHeaderActiveUserAvatarElementNode: {
    width: '38px',
    height: '38px',
    borderRadius: '50%',
    objectFit: 'cover'
  },
  chatHeaderActiveUserDisplayNameLabelText: {
    fontWeight: '600',
    color: '#ffffff',
    fontSize: '15.5px'
  },
  borderlessTransparentActionControlBtn: {
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    marginRight: '6px'
  },
  chatMessagesScrollableCanvasViewportAreaBodyContainer: {
    flex: 1,
    overflowY: 'auto',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px'
  },
  messageBubbleBaseStructureLayoutCard: {
    maxWidth: '65%',
    padding: '10px 14px',
    borderRadius: '14px',
    fontSize: '14px',
    lineHeight: '1.45',
    position: 'relative',
    boxShadow: '0 1px 2px rgba(0,0,0,0.12)'
  },
  messageBubbleBaseStructureLayoutCardInbound: {
    background: '#111b21',
    color: '#e9edef',
    alignSelf: 'flex-start',
    borderTopLeftRadius: '0px'
  },
  messageBubbleBaseStructureLayoutCardOutbound: {
    background: '#a855f7',
    color: '#ffffff',
    alignSelf: 'flex-end',
    borderTopRightRadius: '0px'
  },
  messageBubbleCardFooterLineMetadataRowLayout: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    fontSize: '10.5px',
    color: 'rgba(255,255,255,0.55)',
    marginTop: '4px'
  },
  audioMessageComponentPlayCircularBtnElementNode: {
    width: '30px',
    height: '30px',
    borderRadius: '50%',
    background: 'rgba(255,255,255,0.15)',
    border: 'none',
    color: '#ffffff',
    cursor: 'pointer'
  },
  chatInputDockToolbarPanelFooterBar: {
    background: '#111b21',
    padding: '12px 20px',
    display: 'flex',
    alignItems: 'center',
    gap: '14px',
    borderTop: '1px solid #222e35'
  },
  chatInputFieldTextNodeControl: {
    flex: 1,
    background: '#1c262d',
    border: 'none',
    outline: 'none',
    padding: '12px 16px',
    borderRadius: '10px',
    color: '#ffffff',
    fontSize: '14px'
  },
  chatInputDockToolbarPanelSubmitActionCircularBtnControl: {
    background: '#a855f7',
    border: 'none',
    width: '42px',
    height: '42px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer'
  },
  floatingAttachmentPanelDrawer: {
    position: 'absolute',
    bottom: '70px',
    left: '20px',
    background: '#111b21',
    border: '1px solid #222e35',
    borderRadius: '12px',
    padding: '10px 0',
    width: '200px',
    boxShadow: '0 -4px 20px rgba(0,0,0,0.3)',
    zIndex: 50
  },
  attachmentDrawerItemRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '10px 16px',
    cursor: 'pointer',
    fontSize: '13.5px',
    color: '#e9edef',
    transition: 'background 0.2s'
  },
  profileExtendedDetailsSidebarDeckColumnPanel: {
    width: '300px',
    background: '#111b21',
    borderLeft: '1px solid #222e35',
    padding: '24px 20px',
    overflowY: 'auto',
    flexShrink: 0
  },
  profileExtendedDetailsSidebarDeckColumnPanelAvatarNodeElementComponent: {
    width: '90px',
    height: '90px',
    borderRadius: '50%',
    objectFit: 'cover',
    border: '3px solid rgba(168,85,247,0.15)'
  },
  profileExtendedDetailsSidebarDeckColumnPanelOauthActionButtonsQuickRow: {
    display: 'flex',
    justifyContent: 'center',
    gap: '16px'
  },
  profileExtendedDetailsSidebarDeckColumnPanelOauthActionButtonLinkNode: {
    background: '#1c262d',
    border: '1px solid #222e35',
    borderRadius: '10px',
    color: '#a855f7',
    cursor: 'pointer',
    fontSize: '11px',
    width: '80px',
    padding: '10px 0',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '6px'
  },
  profileExtendedDetailsSidebarDeckColumnPanelMediaAttachmentsPhotoGalleryMatrixGridAreaContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '6px',
    marginTop: '8px'
  },
  profileExtendedDetailsSidebarDeckColumnPanelMediaAttachmentsPhotoGalleryMatrixGridAreaItemComponentNode: {
    width: '100%',
    height: '70px',
    borderRadius: '6px',
    objectFit: 'cover'
  },
  profileExtendedDetailsSidebarDeckColumnPanelSystemSettingsActionLabelBtnLinkRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '12px 0',
    color: '#8696a0',
    fontSize: '14px',
    cursor: 'pointer',
    borderBottom: '1px solid #222e35'
  },
  immersiveLiveCallModalScreenMatrixOverlayBoxBackdropLayer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'radial-gradient(circle at center, #1b122c 0%, #0b141a 100%)',
    zIndex: 999,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '80px 40px'
  },
  immersiveLiveCallModalScreenMatrixOverlayBoxAvatarNodeGraphicElement: {
    width: '120px',
    height: '120px',
    borderRadius: '50%',
    objectFit: 'cover',
    border: '3px solid #a855f7',
    marginBottom: '20px',
    boxShadow: '0 0 25px rgba(168,85,247,0.3)'
  },
  immersiveLiveCallModalScreenMatrixOverlayBoxTelemetryPulseStatusMsg: {
    color: '#25d366',
    fontSize: '14px',
    letterSpacing: '0.5px'
  },
  immersiveLiveCallModalScreenMatrixOverlayBoxActionControlsIconCircleBtn: {
    width: '54px',
    height: '54px',
    borderRadius: '50%',
    background: 'rgba(255,255,255,0.08)',
    border: 'none',
    color: '#ffffff',
    fontSize: '18px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer'
  },
  immersiveLiveCallModalScreenMatrixOverlayBoxActionControlsButtonsToolbarRowConsoleDesk: {
    display: 'flex',
    gap: '20px'
  }
};
      
