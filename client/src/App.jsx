import React, { useState, useEffect, useRef } from 'react';

// ==========================================
// 1. DATABASE NODE & MOCK ARCHITECTURE
// ==========================================
const INITIAL_CONTACTS = {
  101: {
    id: 101,
    name: "Emily Johnson",
    username: "@emily.j",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150",
    status: "online",
    unread: 2,
    typing: false,
    history: [
      { id: 1, text: "Hey there! 👋", time: "02:10 PM", type: "inbound" },
      { id: 2, text: "Hi Emily! How are you doing?", time: "02:11 PM", type: "outbound" },
      { id: 3, text: "I'm good, thanks! You?", time: "02:11 PM", type: "inbound" },
      { id: 4, text: "Doing great! What's up?", time: "02:12 PM", type: "outbound" },
      { id: 5, text: "🎙️ Voice message (0:12)", time: "02:12 PM", type: "inbound", isAudio: true },
      { id: 6, text: "That's awesome! 😁", time: "02:13 PM", type: "outbound" }
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
    unread: 1,
    typing: false,
    history: [
      { id: 1, text: "Hey! How are you?", time: "10 hours ago", type: "inbound" }
    ],
    media: []
  },
  103: {
    id: 103,
    name: "Sophia Martinez",
    username: "@sophia.m",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150",
    status: "online",
    unread: 0,
    typing: false,
    history: [
      { id: 1, text: "Voice message delivered", time: "25m ago", type: "inbound" }
    ],
    media: []
  },
  104: {
    id: 104,
    name: "Noah Wilson",
    username: "@noah.w",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
    status: "offline",
    unread: 0,
    typing: false,
    history: [
      { id: 1, text: "Let's catch up later.", time: "1h ago", type: "inbound" }
    ],
    media: []
  },
  105: {
    id: 105,
    name: "Olivia Taylor",
    username: "@olivia.t",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150",
    status: "offline",
    unread: 0,
    typing: false,
    history: [
      { id: 1, text: "Missed call", time: "1h ago", type: "missed" }
    ],
    media: []
  }
};

const INITIAL_GROUPS = [
  { id: 501, name: "Family Group", members: "5 members", avatar: "https://images.unsplash.com/photo-1581579438747-1dc8d1e0ca96?w=150" },
  { id: 502, name: "Study Group", members: "8 members", avatar: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=150" },
  { id: 503, name: "Work Team", members: "12 members", avatar: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=150" }
];

const INITIAL_CALLS = [
  { id: 901, name: "Liam Davis", type: "Voice Call", status: "Outgoing", time: "2m ago", icon: "fa-arrow-up-right", color: "#25d366", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150" },
  { id: 902, name: "Sophia Martinez", type: "Video Call", status: "Incoming", time: "10m ago", icon: "fa-arrow-down-left", color: "#25d366", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150" },
  { id: 903, name: "Noah Wilson", type: "Voice Call", status: "Missed", time: "25m ago", icon: "fa-arrow-down-left", color: "#ea0038", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150" }
];

export default function App() {
  // Navigation & Authentication Layout States
  const [currentScreen, setCurrentScreen] = useState('welcome'); // welcome -> login -> app
  const [activeTab, setActiveTab] = useState('messages'); // messages, calls, people, groups, settings
  const [selectedChatId, setSelectedChatId] = useState(101);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Dynamic Real-time Databases States
  const [database, setDatabase] = useState(INITIAL_CONTACTS);
  const [inputMessage, setInputMessage] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Right profile bar desktop toggle
  const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 768);

  // Calling Telemetry States
  const [activeCall, setActiveCall] = useState(null); // null or { user, type, status }

  const messagesEndRef = useRef(null);

  // Responsive Layout Watcher Hook
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobileView(mobile);
      if (mobile) setIsSidebarOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Automatic Message Scroller Hook
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [database, selectedChatId]);

  // Global Audio Feedback Engine Simulator
  const triggerHapticFeedback = (logString) => {
    console.log(`%c[ConnectHub Telemetry]: ${logString}`, 'color: #a855f7; font-weight: bold;');
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;
    triggerHapticFeedback("Dispatched Message payload to secure stream");

    const activeChat = database[selectedChatId];
    const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const updatedLog = [
      ...activeChat.history,
      { id: Date.now(), text: inputMessage, time: currentTime, type: "outbound" }
    ];

    setDatabase({
      ...database,
      [selectedChatId]: { ...activeChat, history: updatedLog }
    });
    setInputMessage('');

    // Trigger Smart Recipient System Automation Simulation
    setTimeout(() => {
      setDatabase(prev => ({
        ...prev,
        [selectedChatId]: { ...prev[selectedChatId], typing: true }
      }));
    }, 1000);

    setTimeout(() => {
      setDatabase(prev => {
        const currentChat = prev[selectedChatId];
        return {
          ...prev,
          [selectedChatId]: {
            ...currentChat,
            typing: false,
            history: [
              ...currentChat.history,
              { id: Date.now(), text: "Secure End-to-End automated Response synchronized successfully. ✔️", time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), type: "inbound" }
            ]
          }
        };
      });
      triggerHapticFeedback("Received Synchronized payload data node downstream");
    }, 2800);
  };

  const launchCallSession = (user, type) => {
    triggerHapticFeedback(`Initializing ${type} WebRTC Pipeline`);
    setActiveCall({ user, type, status: "Calling..." });
    
    setTimeout(() => {
      setActiveCall(prev => prev ? { ...prev, status: "Connected (00:02)" } : null);
    }, 2000);
  };

  const closeCallSession = () => {
    triggerHapticFeedback("WebRTC Call matrix channel terminated");
    setActiveCall(null);
  };

  // Font-Awesome Loader Guard
  return (
    <div style={styles.bodyWrapper}>
      {/* Dynamic FontAwesome injection hook */}
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />

      {/* ========================================================
          SCREEN A: IMMERSIVE WELCOME INTRO GATEWAY
          ======================================================== */}
      {currentScreen === 'welcome' && (
        <div style={styles.fullscreenOnboarding}>
          <div style={styles.onboardingCard}>
            <div style={styles.appIconLogo}><i class="fas fa-comments"></i></div>
            <h1 style={styles.onboardingTitle}>ConnectHub</h1>
            <p style={styles.onboardingSubtitle}>Connect. Chat. Share.<br/>Anywhere. Anytime.</p>
            <button style={styles.primaryActionButton} onClick={() => setCurrentScreen('login')}>Get Started</button>
            <button style={styles.secondaryTextButton} onClick={() => { setCurrentScreen('app'); triggerHapticFeedback("Bypassed Auth module via guest node"); }}>Skip Registration</button>
          </div>
        </div>
      )}

      {/* ========================================================
          SCREEN B: SECURE IDENTITY CREDENTIALS GATEWAY
          ======================================================== */}
      {currentScreen === 'login' && (
        <div style={styles.fullscreenOnboarding}>
          <div style={styles.onboardingCard}>
            <div style={styles.appIconLogo}><i class="fas fa-user-shield"></i></div>
            <h2 style={{ ...styles.onboardingTitle, fontSize: '26px' }}>Welcome Back</h2>
            <p style={{ ...styles.onboardingSubtitle, marginBottom: '25px' }}>Login to your encrypted workspace container</p>
            
            <div style={styles.inputFormGroup}>
              <i class="fas fa-envelope" style={styles.formInputIcon}></i>
              <input type="email" placeholder="john.doe@gmail.com" defaultValue="john.doe@gmail.com" style={styles.formInputField} />
            </div>
            <div style={styles.inputFormGroup}>
              <i class="fas fa-lock" style={styles.formInputIcon}></i>
              <input type="password" placeholder="••••••••••••" defaultValue="password123" style={styles.formInputField} />
            </div>

            <button style={styles.primaryActionButton} onClick={() => setCurrentScreen('app')}>Login</button>
            <div style={styles.authDivider}>Or continue with</div>
            <div style={styles.oauthButtonGroupRow}>
              <button style={styles.oauthIconButton}><i class="fab fa-google" style={{ color: '#ea4335' }}></i></button>
              <button style={styles.oauthIconButton}><i class="fab fa-apple" style={{ color: '#ffffff' }}></i></button>
              <button style={styles.oauthIconButton}><i class="fab fa-facebook" style={{ color: '#1877f2' }}></i></button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          SCREEN C: MASTER PRODUCTION APPLICATION MATRIX
          ======================================================== */}
      {currentScreen === 'app' && (
        <div style={styles.masterAppWorkspaceContainer}>
          
          {/* COLUMN 1: INDUSTRIAL COMPACT SIDEBAR NAVIGATION CONTROL BAR */}
          {(!isMobileView || selectedChatId === null) && (
            <div style={styles.navigationSidebarControlDeck}>
              <div style={styles.brandGroupContainer}>
                <div style={styles.brandLogoCircle}><i class="fas fa-bolt"></i></div>
                {!isMobileView && <span style={styles.brandTextLabel}>ConnectHub</span>}
              </div>

              <div style={styles.navigationTabItemsWrapper}>
                <div style={{ ...styles.tabItemButtonLink, ...(activeTab === 'messages' ? styles.tabItemButtonLinkActive : {}) }} onClick={() => { setActiveTab('messages'); triggerHapticFeedback("Tab shifted -> messages workspace"); }}>
                  <i class="fas fa-message"></i>
                  {!isMobileView && <span>Messages</span>}
                </div>
                <div style={{ ...styles.tabItemButtonLink, ...(activeTab === 'calls' ? styles.tabItemButtonLinkActive : {}) }} onClick={() => { setActiveTab('calls'); triggerHapticFeedback("Tab shifted -> calls ledger"); }}>
                  <i class="fas fa-phone"></i>
                  {!isMobileView && <span>Voice Call</span>}
                </div>
                <div style={{ ...styles.tabItemButtonLink, ...(activeTab === 'people' ? styles.tabItemButtonLinkActive : {}) }} onClick={() => { setActiveTab('people'); triggerHapticFeedback("Tab shifted -> global contacts container"); }}>
                  <i class="fas fa-user-group"></i>
                  {!isMobileView && <span>People</span>}
                </div>
                <div style={{ ...styles.tabItemButtonLink, ...(activeTab === 'groups' ? styles.tabItemButtonLinkActive : {}) }} onClick={() => { setActiveTab('groups'); triggerHapticFeedback("Tab shifted -> groups directory"); }}>
                  <i class="fas fa-users-viewfinder"></i>
                  {!isMobileView && <span>Groups</span>}
                </div>
                <div style={{ ...styles.tabItemButtonLink, ...(activeTab === 'settings' ? styles.tabItemButtonLinkActive : {}) }} onClick={() => { setActiveTab('settings'); triggerHapticFeedback("Tab shifted -> master system core configuration control"); }}>
                  <i class="fas fa-gear"></i>
                  {!isMobileView && <span>Settings</span>}
                </div>
              </div>

              <div style={styles.currentUserIdentityFooterProfileDeck}>
                <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150" alt="Master Profile Avatar" style={styles.currentUserIdentityAvatarNode} />
                {!isMobileView && (
                  <div style={{ marginLeft: '10px' }}>
                    <div style={{ fontWeight: '600', color: '#ffffff', fontSize: '14px' }}>John Doe</div>
                    <div style={{ color: '#25d366', fontSize: '11px' }}><i class="fas fa-circle" style={{ fontSize: '7px', marginRight: '4px' }}></i>Online</div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* COLUMN 2: OPERATIONS / CONVERSATIONS LEDGER PANELS SUB-SYSTEM */}
          {(!isMobileView || (selectedChatId === null && activeTab !== '')) && (
            <div style={styles.operationalLedgerPanelSection}>
              <div style={styles.ledgerHeaderPanelRow}>
                <h2 style={styles.ledgerHeaderPanelTitle}>
                  {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
                </h2>
                <div style={styles.searchBoxInputControlWrapper}>
                  <i class="fas fa-search" style={styles.searchBoxIconElement}></i>
                  <input type="text" placeholder={`Search ${activeTab}...`} value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} style={styles.searchBoxInputNode} />
                </div>
              </div>

              {/* DYNAMIC TAB COMPONENT INJECTOR VIEW MATRIX */}
              <div style={styles.ledgerDynamicScrollableContainerFeed}>
                
                {/* INTERACTIVE WORKSPACE DATA STREAM NODE: MESSAGES FEED */}
                {activeTab === 'messages' && Object.values(database)
                  .filter(c => c.name.toLowerCase().includes(searchQuery.toLowerCase()))
                  .map(contact => {
                    const lastLog = contact.history[contact.history.length - 1];
                    return (
                      <div key={contact.id} style={{ ...styles.contactDataRowItemCard, ...(selectedChatId === contact.id ? styles.contactDataRowItemCardSelected : {}) }} onClick={() => setSelectedChatId(contact.id)}>
                        <div style={styles.contactAvatarFrameComponentWrapper}>
                          <img src={contact.avatar} alt={contact.name} style={styles.contactAvatarImageNode} />
                          {contact.status === 'online' && <div style={styles.contactOnlineStatusTelemetryDotIndicator}></div>}
                        </div>
                        <div style={{ flex: 1, overflow: 'hidden' }}>
                          <div style={styles.contactMetaInformationRowHeaderLine}>
                            <span style={styles.contactIdentityDisplayNameLabelText}>{contact.name}</span>
                            <span style={styles.contactDataNodeTimestampLabel}>{lastLog ? lastLog.time : ''}</span>
                          </div>
                          <div style={styles.contactMetaInformationRowSubLine}>
                            <span style={styles.contactDataNodeMessageTextPreviewString}>
                              {contact.typing ? <span style={{ color: '#a855f7', fontWeight: 'bold' }}>typing...</span> : (lastLog ? lastLog.text : '')}
                            </span>
                            {contact.unread > 0 && <span style={styles.contactUnreadBadgeCounterBadge}>{contact.unread}</span>}
                          </div>
                        </div>
                      </div>
                    );
                })}

                {/* INTERACTIVE WORKSPACE DATA STREAM NODE: CALLS VIEW */}
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

                {/* INTERACTIVE WORKSPACE DATA STREAM NODE: PEOPLE VIEW */}
                {activeTab === 'people' && Object.values(database).map(contact => (
                  <div key={contact.id} style={styles.contactDataRowItemCard}>
                    <img src={contact.avatar} alt={contact.name} style={styles.contactAvatarImageNode} />
                    <div style={{ flex: 1, marginLeft: '12px' }}>
                      <div style={styles.contactIdentityDisplayNameLabelText}>{contact.name}</div>
                      <div style={{ fontSize: '13px', color: '#25d366' }}>{contact.status}</div>
                    </div>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button style={styles.circularActionButtonControlNode} onClick={() => launchCallSession(contact, 'Voice Call')}><i class="fas fa-phone"></i></button>
                      <button style={styles.circularActionButtonControlNode} onClick={() => launchCallSession(contact, 'Video Call')}><i class="fas fa-video"></i></button>
                    </div>
                  </div>
                ))}

                {/* INTERACTIVE WORKSPACE DATA STREAM NODE: GROUPS VIEW */}
                {activeTab === 'groups' && INITIAL_GROUPS.map(group => (
                  <div key={group.id} style={styles.contactDataRowItemCard}>
                    <img src={group.avatar} alt={group.name} style={styles.contactAvatarImageNode} />
                    <div style={{ flex: 1, marginLeft: '12px' }}>
                      <div style={styles.contactIdentityDisplayNameLabelText}>{group.name}</div>
                      <div style={{ fontSize: '13px', color: '#8696a0' }}>{group.members}</div>
                    </div>
                    <button style={styles.circularActionButtonControlNode} onClick={() => triggerHapticFeedback(`Access Group room matrix console: ${group.name}`)}><i class="fas fa-arrow-right"></i></button>
                  </div>
                ))}

                {/* INTERACTIVE WORKSPACE DATA STREAM NODE: SYSTEMS SETTINGS INTERFACE VIEW */}
                {activeTab === 'settings' && (
                  <div style={{ padding: '8px' }}>
                    <div style={styles.settingsOptionMenuRowButtonNode} onClick={() => triggerHapticFeedback("Toggle Account Security Matrix Layer")}>
                      <i class="fas fa-user-lock" style={styles.settingsOptionMenuRowIconElement}></i>
                      <div>
                        <div style={styles.settingsOptionMenuRowPrimaryTitleText}>Account Security</div>
                        <div style={styles.settingsOptionMenuRowSecondaryDescriptionText}>Enforce end-to-end multi-factor cryptography keys</div>
                      </div>
                    </div>
                    <div style={styles.settingsOptionMenuRowButtonNode} onClick={() => triggerHapticFeedback("Purge Memory Array Logs Cache")}>
                      <i class="fas fa-database" style={styles.settingsOptionMenuRowIconElement}></i>
                      <div>
                        <div style={styles.stylesSettingsOptionMenuRowPrimaryTitleText}>Data & Local Storage Storage</div>
                        <div style={styles.settingsOptionMenuRowSecondaryDescriptionText}>Manage local volatile storage and diagnostics telemetry caches</div>
                      </div>
                    </div>
                    <div style={styles.settingsOptionMenuRowButtonNode} onClick={() => triggerHapticFeedback("Reset system theme layer pipeline configuration")}>
                      <i class="fas fa-palette" style={styles.settingsOptionMenuRowIconElement}></i>
                      <div>
                        <div style={styles.stylesSettingsOptionMenuRowPrimaryTitleText}>Theme & Aesthetics View Customizer</div>
                        <div style={styles.settingsOptionMenuRowSecondaryDescriptionText}>Configure dynamic custom canvas UI palettes settings</div>
                      </div>
                    </div>
                  </div>
                )}

              </div>
            </div>
          )}

          {/* COLUMN 3: REAL-TIME SECURED CHAT CANVAS PLATFORM VIEW ECOSYSTEM */}
          {(!isMobileView || selectedChatId !== null) && activeTab === 'messages' && (
            <div style={styles.conversationEcosystemMainCanvasContainerPanel}>
              {selectedChatId ? (
                <>
                  {/* REAL TIME CONVERSATIONS CONSOLE CHAT HEADER TOOLBAR SUB-SECTION */}
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
                        <div style={{ fontSize: '12px', color: database[selectedChatId].status === 'online' ? '#25d366' : '#8696a0' }}>
                          {database[selectedChatId].typing ? "typing..." : database[selectedChatId].status}
                        </div>
                      </div>
                    </div>

                    <div style={{ display: 'flex', gap: '20px', fontSize: '18px', color: '#a855f7', cursor: 'pointer' }}>
                      <i class="fas fa-phone" onClick={() => launchCallSession(database[selectedChatId], 'Voice Call')}></i>
                      <i class="fas fa-video" onClick={() => launchCallSession(database[selectedChatId], 'Video Call')}></i>
                      <i class="fas fa-circle-info" onClick={() => setIsSidebarOpen(!isSidebarOpen)}></i>
                    </div>
                  </div>

                  {/* CHAT GRAPHICS DIALOG CONVERSATION HISTORY LOG LIST AREA SCREEN */}
                  <div style={styles.chatMessagesScrollableCanvasViewportAreaBodyContainer}>
                    {database[selectedChatId].history.map(msg => (
                      <div key={msg.id} style={{ ...styles.messageBubbleBaseStructureLayoutCard, ...(msg.type === 'outbound' ? styles.messageBubbleBaseStructureLayoutCardOutbound : styles.messageBubbleBaseStructureLayoutCardInbound) }}>
                        {msg.isAudio ? (
                          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '4px 0' }}>
                            <button style={styles.audioMessageComponentPlayCircularBtnElementNode}><i class="fas fa-play"></i></button>
                            <span style={{ fontSize: '14px' }}>{msg.text}</span>
                          </div>
                        ) : (
                          <div>{msg.text}</div>
                        )}
                        <div style={styles.messageBubbleCardFooterLineMetadataRowLayout}>
                          <span>{msg.time}</span>
                          {msg.type === 'outbound' && <i class="fas fa-check-double" style={{ color: '#53bdeb', marginLeft: '4px' }}></i>}
                        </div>
                      </div>
                    ))}
                    {database[selectedChatId].typing && (
                      <div style={{ ...styles.messageBubbleBaseStructureLayoutCard, ...styles.messageBubbleBaseStructureLayoutCardInbound, fontStyle: 'italic', color: '#a855f7' }}>
                        Emily is typing...
                      </div>
                    )}
                    <div ref={messagesEndRef} />
                  </div>

                  {/* STREAM DATA CONVERSATION REAL-TIME CONSOLE FOOTER SYSTEM BAR DOCK */}
                  <div style={styles.chatInputDockToolbarPanelFooterBar}>
                    <i class="far fa-face-smile" style={{ fontSize: '22px', color: '#8696a0', cursor: 'pointer' }} onClick={() => triggerHapticFeedback("Intercepted request: Deploy System Native Emoji Drawer Window Container Engine")}></i>
                    <i class="fas fa-plus" style={{ fontSize: '20px', color: '#8696a0', cursor: 'pointer' }} onClick={() => triggerHapticFeedback("Intercepted request: Open Secure Content Binary Payload Attachment Pipeline Matrix File Dialog Router Module")}></i>
                    <input type="text" placeholder="Type a message..." value={inputMessage} onChange={(e) => setInputMessage(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()} style={styles.chatInputFieldTextNodeControl} />
                    <button style={styles.chatInputDockToolbarPanelSubmitActionCircularBtnControl} onClick={handleSendMessage}>
                      <i class="fas fa-paper-plane" style={{ color: '#ffffff', fontSize: '16px' }}></i>
                    </button>
                  </div>
                </>
              ) : (
                <div style={styles.conversationEcosystemMainCanvasContainerPanelEmptyStatePlaceholderContainer}>
                  <i class="fas fa-comments" style={{ fontSize: '70px', color: '#222e35', marginBottom: '16px' }}></i>
                  <h3>Select a conversation pipeline stream data connection layer link to initialize encryption chat room session matrix desk view.</h3>
                </div>
              )}
            </div>
          )}

          {/* COLUMN 4: EXTENDED PROFILE BIOMETRIC DATA DATA METADATA DRAWER SIDEBAR COLUMN PANEL */}
          {isSidebarOpen && activeTab === 'messages' && selectedChatId && !isMobileView && (
            <div style={styles.profileExtendedDetailsSidebarDeckColumnPanel}>
              <div style={{ textAlign: 'center', marginBottom: '24px' }}>
                <img src={database[selectedChatId].avatar} alt={database[selectedChatId].name} style={styles.profileExtendedDetailsSidebarDeckColumnPanelAvatarNodeElementComponent} />
                <h3 style={{ color: '#ffffff', margin: '12px 0 4px 0', fontSize: '20px' }}>{database[selectedChatId].name}</h3>
                <p style={{ color: '#25d366', fontSize: '14px' }}>{database[selectedChatId].status}</p>
              </div>

              <div style={styles.profileExtendedDetailsSidebarDeckColumnPanelOauthActionButtonsQuickRow}>
                <button style={styles.profileExtendedDetailsSidebarDeckColumnPanelOauthActionButtonLinkNode} onClick={() => launchCallSession(database[selectedChatId], 'Voice Call')}><i class="fas fa-phone"></i><div>Voice Call</div></button>
                <button style={styles.profileExtendedDetailsSidebarDeckColumnPanelOauthActionButtonLinkNode} onClick={() => launchCallSession(database[selectedChatId], 'Video Call')}><i class="fas fa-video"></i><div>Video Call</div></button>
                <button style={styles.profileExtendedDetailsSidebarDeckColumnPanelOauthActionButtonLinkNode} onClick={() => triggerHapticFeedback("Mute status payload active state updated")}><i class="fas fa-bell-slash"></i><div>Mute</div></button>
              </div>

              <hr style={{ border: 'none', height: '1px', background: '#222e35', margin: '20px 0' }} />

              <h4 style={{ color: '#ffffff', fontSize: '14px', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Media, Files and Links</h4>
              <div style={styles.profileExtendedDetailsSidebarDeckColumnPanelMediaAttachmentsPhotoGalleryMatrixGridAreaContainer}>
                {database[selectedChatId].media && database[selectedChatId].media.length > 0 ? (
                  database[selectedChatId].media.map((img, index) => (
                    <img key={index} src={img} alt="Attachment Media Grid Node Resource" style={styles.profileExtendedDetailsSidebarDeckColumnPanelMediaAttachmentsPhotoGalleryMatrixGridAreaItemComponentNode} />
                  ))
                ) : (
                  <div style={{ color: '#8696a0', fontSize: '13px', gridColumn: 'span 3', textAlign: 'center', padding: '10px' }}>No media shared asset buffers found in memory storage grid array node logs ledger system.</div>
                )}
              </div>

              <div style={{ marginTop: '30px' }}>
                <div style={styles.profileExtendedDetailsSidebarDeckColumnPanelSystemSettingsActionLabelBtnLinkRow} onClick={() => triggerHapticFeedback("Mute status matrix adjusted")}><i class="fas fa-bell"></i> Mute Notifications</div>
                <div style={{ ...styles.profileExtendedDetailsSidebarDeckColumnPanelSystemSettingsActionLabelBtnLinkRow, color: '#ea0038' }} onClick={() => triggerHapticFeedback("Block operational access protocol enforced")}><i class="fas fa-ban"></i> Block User Matrix Data Node Connection</div>
                <div style={{ ...styles.profileExtendedDetailsSidebarDeckColumnPanelSystemSettingsActionLabelBtnLinkRow, color: '#ea0038' }} onClick={() => triggerHapticFeedback("Dispatched telemetry alert: User malicious pattern behavior detected report")}><i class="fas fa-flag"></i> Report Malicious System Footprint Actor Node</div>
              </div>
            </div>
          )}

          {/* ========================================================
              IMMERSIVE SECURE REAL TIME LIVE STREAMING CALL MATRIX
              ======================================================== */}
          {activeCall && (
            <div style={styles.immersiveLiveCallModalScreenMatrixOverlayBoxBackdropLayer}>
              <div style={{ textAlign: 'center' }}>
                <img src={activeCall.user.avatar} alt="Live active peer connection node avatar identity photo" style={styles.immersiveLiveCallModalScreenMatrixOverlayBoxAvatarNodeGraphicElement} />
                <h2 style={{ color: '#ffffff', fontSize: '26px', marginBottom: '8px' }}>{activeCall.user.name}</h2>
                <div style={styles.immersiveLiveCallModalScreenMatrixOverlayBoxTelemetryPulseStatusMsg}>{activeCall.status}</div>
              </div>

              <div style={styles.immersiveLiveCallModalScreenMatrixOverlayBoxActionControlsButtonsToolbarRowConsoleDesk}>
                <button style={styles.immersiveLiveCallModalScreenMatrixOverlayBoxActionControlsIconCircleBtn} onClick={() => triggerHapticFeedback("Local microphone input stream gain channel toggled mute status")}><i class="fas fa-microphone-slash"></i></button>
                <button style={styles.immersiveLiveCallModalScreenMatrixOverlayBoxActionControlsIconCircleBtn} onClick={() => triggerHapticFeedback("Remote speaker peripheral amplifier boost output matrix toggled volume")}><i class="fas fa-volume-high"></i></button>
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
// 2. INDUSTRIAL JSS DARK THEME SHEET ENGINE
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
    maxWidth: '400px',
    width: '100%',
    textAlign: 'center',
    boxShadow: '0 20px 40px rgba(0,0,0,0.4)'
  },
  appIconLogo: {
    fontSize: '60px',
    color: '#a855f7',
    marginBottom: '20px',
    animation: 'pulse 2s infinite'
  },
  onboardingTitle: {
    fontSize: '32px',
    fontWeight: '800',
    color: '#ffffff',
    letterSpacing: '1px',
    marginBottom: '10px'
  },
  onboardingSubtitle: {
    fontSize: '15px',
    color: '#8696a0',
    lineHeight: '1.5',
    marginBottom: '40px'
  },
  primaryActionButton: {
    background: '#a855f7',
    color: '#ffffff',
    border: 'none',
    borderRadius: '12px',
    padding: '14px 28px',
    fontSize: '16px',
    fontWeight: '600',
    width: '100%',
    cursor: 'pointer',
    transition: 'all 0.2s',
    boxShadow: '0 4px 12px rgba(168,85,247,0.3)'
  },
  secondaryTextButton: {
    background: 'transparent',
    color: '#a855f7',
    border: 'none',
    marginTop: '16px',
    fontSize: '14px',
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
    fontSize: '16px'
  },
  formInputField: {
    background: 'transparent',
    border: 'none',
    outline: 'none',
    color: '#ffffff',
    fontSize: '15px',
    width: '100%'
  },
  authDivider: {
    color: '#8696a0',
    fontSize: '13px',
    margin: '25px 0'
  },
  oauthButtonGroupRow: {
    display: 'flex',
    justifyContent: 'center',
    gap: '16px'
  },
  oauthIconButton: {
    background: '#202c33',
    border: '1px solid #222e35',
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justify-content: 'center',
    fontSize: '18px',
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
    width: '260px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: '24px 16px'
  },
  brandGroupContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '0 8px',
    marginBottom: '32px'
  },
  brandLogoCircle: {
    background: '#a855f7',
    color: '#ffffff',
    width: '36px',
    height: '36px',
    borderRadius: '10px',
    display: 'flex',
    alignItems: 'center',
    justify-content: 'center',
    fontSize: '18px'
  },
  brandTextLabel: {
    fontSize: '20px',
    fontWeight: '700',
    color: '#ffffff',
    letterSpacing: '0.5px'
  },
  navigationTabItemsWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    flex: 1
  },
  tabItemButtonLink: {
    display: 'flex',
    alignItems: 'center',
    gap: '14px',
    padding: '14px 16px',
    borderRadius: '12px',
    color: '#8696a0',
    fontSize: '15px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.2s'
  },
  tabItemButtonLinkActive: {
    background: 'rgba(168,85,247,0.15)',
    color: '#a855f7',
    fontWeight: '600'
  },
  currentUserIdentityFooterProfileDeck: {
    display: 'flex',
    alignItems: 'center',
    padding: '12px',
    background: '#202c33',
    borderRadius: '16px'
  },
  currentUserIdentityAvatarNode: {
    width: '40px',
    height: '40px',
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
    padding: '24px 20px 16px 20px'
  },
  ledgerHeaderPanelTitle: {
    fontSize: '24px',
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: '16px'
  },
  searchBoxInputControlWrapper: {
    background: '#202c33',
    borderRadius: '10px',
    display: 'flex',
    alignItems: 'center',
    padding: '8px 14px',
    gap: '10px'
  },
  searchBoxIconElement: {
    color: '#8696a0',
    fontSize: '14px'
  },
  searchBoxInputNode: {
    background: 'transparent',
    border: 'none',
    outline: 'none',
    color: '#ffffff',
    fontSize: '14px',
    width: '100%'
  },
  ledgerDynamicScrollableContainerFeed: {
    flex: 1,
    overflowY: 'auto',
    padding: '0 10px 20px 10px'
  },
  contactDataRowItemCard: {
    display: 'flex',
    alignItems: 'center',
    padding: '12px',
    borderRadius: '14px',
    cursor: 'pointer',
    marginBottom: '4px',
    transition: 'background 0.2s'
  },
  contactDataRowItemCardSelected: {
    background: '#202c33'
  },
  contactAvatarFrameComponentWrapper: {
    position: 'relative',
    marginRight: '14px'
  },
  contactAvatarImageNode: {
    width: '48px',
    height: '48px',
    borderRadius: '50%',
    objectFit: 'cover'
  },
  contactOnlineStatusTelemetryDotIndicator: {
    width: '12px',
    height: '12px',
    backgroundColor: '#25d366',
    border: '2px solid #111b21',
    borderRadius: '50%',
    position: 'absolute',
    bottom: '2px',
    right: '0px'
  },
  contactMetaInformationRowHeaderLine: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '4px'
  },
  contactIdentityDisplayNameLabelText: {
    fontWeight: '600',
    color: '#ffffff',
    fontSize: '15px'
  },
  contactDataNodeTimestampLabel: {
    fontSize: '12px',
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
    text-overflow: 'ellipsis',
    maxWidth: '180px'
  },
  contactUnreadBadgeCounterBadge: {
    background: '#a855f7',
    color: '#ffffff',
    fontSize: '11px',
    fontWeight: '700',
    borderRadius: '50%',
    padding: '2px 6px',
    minWidth: '18px',
    textAlign: 'center'
  },
  circularActionButtonControlNode: {
    width: '36px',
    height: '36px',
    borderRadius: '50%',
    background: '#202c33',
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
    gap: '16px',
    padding: '16px 12px',
    borderRadius: '12px',
    cursor: 'pointer',
    borderBottom: '1px solid #222e35'
  },
  settingsOptionMenuRowIconElement: {
    fontSize: '20px',
    color: '#a855f7',
    width: '24px',
    textAlign: 'center'
  },
  settingsOptionMenuRowPrimaryTitleText: {
    fontWeight: '600',
    color: '#ffffff',
    fontSize: '15px'
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
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    objectFit: 'cover'
  },
  chatHeaderActiveUserDisplayNameLabelText: {
    fontWeight: '600',
    color: '#ffffff',
    fontSize: '16px'
  },
  borderlessTransparentActionControlBtn: {
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    marginRight: '8px'
  },
  chatMessagesScrollableCanvasViewportAreaBodyContainer: {
    flex: 1,
    overflowY: 'auto',
    padding: '20px',
    backgroundStyle: 'cover',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px'
  },
  messageBubbleBaseStructureLayoutCard: {
    maxWidth: '65%',
    padding: '10px 14px',
    borderRadius: '14px',
    fontSize: '14.5px',
    lineHeight: '1.45',
    position: 'relative',
    boxShadow: '0 1px 2px rgba(0,0,0,0.15)'
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
    fontSize: '11px',
    color: 'rgba(255,255,255,0.6)',
    marginTop: '4px',
    textAlign: 'right'
  },
  audioMessageComponentPlayCircularBtnElementNode: {
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    background: 'rgba(255,255,255,0.2)',
    border: 'none',
    color: '#ffffff',
    cursor: 'pointer'
  },
  chatInputDockToolbarPanelFooterBar: {
    background: '#111b21',
    padding: '12px 20px',
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    borderTop: '1px solid #222e35'
  },
  chatInputFieldTextNodeControl: {
    flex: 1,
    background: '#202c33',
    border: 'none',
    outline: 'none',
    padding: '12px 18px',
    borderRadius: '12px',
    color: '#ffffff',
    fontSize: '14.5px'
  },
  chatInputDockToolbarPanelSubmitActionCircularBtnControl: {
    background: '#a855f7',
    border: 'none',
    width: '44px',
    height: '44px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer'
  },
  profileExtendedDetailsSidebarDeckColumnPanel: {
    width: '320px',
    background: '#111b21',
    borderLeft: '1px solid #222e35',
    padding: '24px',
    overflowY: 'auto',
    flexShrink: 0
  },
  profileExtendedDetailsSidebarDeckColumnPanelAvatarNodeElementComponent: {
    width: '100px',
    height: '100px',
    borderRadius: '50%',
    objectFit: 'cover',
    border: '3px solid rgba(168,85,247,0.2)'
  },
  profileExtendedDetailsSidebarDeckColumnPanelOauthActionButtonsQuickRow: {
    display: 'flex',
    justifyContent: 'center',
    gap: '20px'
  },
  profileExtendedDetailsSidebarDeckColumnPanelOauthActionButtonLinkNode: {
    background: 'transparent',
    border: 'none',
    color: '#a855f7',
    cursor: 'pointer',
    fontSize: '12px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '6px'
  },
  profileExtendedDetailsSidebarDeckColumnPanelMediaAttachmentsPhotoGalleryMatrixGridAreaContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '8px',
    marginTop: '10px'
  },
  profileExtendedDetailsSidebarDeckColumnPanelMediaAttachmentsPhotoGalleryMatrixGridAreaItemComponentNode: {
    width: '100%',
    height: '75px',
    borderRadius: '8px',
    objectFit: 'cover'
  },
  profileExtendedDetailsSidebarDeckColumnPanelSystemSettingsActionLabelBtnLinkRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '14px',
    padding: '12px 0',
    color: '#8696a0',
    fontSize: '14.5px',
    cursor: 'pointer',
    borderBottom: '1px solid #222e35'
  },
  immersiveLiveCallModalScreenMatrixOverlayBoxBackdropLayer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'radial-gradient(circle at center, #1a102f 0%, #0b141a 100%)',
    zIndex: 999,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '80px 40px'
  },
  immersiveLiveCallModalScreenMatrixOverlayBoxAvatarNodeGraphicElement: {
    width: '130px',
    height: '130px',
    borderRadius: '50%',
    objectFit: 'cover',
    border: '4px solid #a855f7',
    marginBottom: '20px',
    boxShadow: '0 0 30px rgba(168,85,247,0.4)'
  },
  immersiveLiveCallModalScreenMatrixOverlayBoxTelemetryPulseStatusMsg: {
    color: '#25d366',
    fontSize: '15px',
    letterSpacing: '1px',
    fontWeight: '500'
  },
  immersiveLiveCallModalScreenMatrixOverlayBoxActionControlsIconCircleBtn: {
    width: '56px',
    height: '56px',
    borderRadius: '50%',
    background: 'rgba(255,255,255,0.1)',
    border: 'none',
    color: '#ffffff',
    fontSize: '20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    transition: 'background 0.2s'
  },
  immersiveLiveCallModalScreenMatrixOverlayBoxActionControlsButtonsToolbarRowConsoleDesk: {
    display: 'flex',
    gap: '24px'
  }
};
