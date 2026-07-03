import React, { useState, useEffect, useRef } from 'react';

// ========================================================
// 1. CHAT DATABASE MATRIX (WITH CUSTOM AI PERSONAS)
// ========================================================
const INITIAL_CONTACTS = {
  101: {
    id: 101,
    name: "Emily Johnson",
    username: "@emily.j",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150",
    status: "online",
    time: "2m",
    unread: 2,
    typing: false,
    history: [
      { id: 1, text: "Hey there! 👋", time: "02:10 PM", type: "inbound" },
      { id: 2, text: "Hi Emily! How are you doing?", time: "02:11 PM", type: "outbound" },
      { id: 3, text: "I'm good, thanks! You?", time: "02:11 PM", type: "inbound" },
      { id: 4, text: "Doing great! What's up?", time: "02:12 PM", type: "outbound" },
      { id: 5, text: "🎙️ Audio log transmitted (0:12)", time: "02:12 PM", type: "inbound", isAudio: true },
      { id: 6, text: "That's awesome! 😄", time: "02:13 PM", type: "outbound" }
    ],
    // Gemini System Prompts for Personas
    aiPrompt: "You are Emily Johnson. Respond in a friendly, enthusiastic manner, using emojis occasionally. Keep it natural."
  },
  102: {
    id: 102,
    name: "Liam Davis",
    username: "@liam.d",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150",
    status: "online",
    time: "10m",
    unread: 1,
    typing: false,
    history: [
      { id: 1, text: "Hey! How are you?", time: "10:45 AM", type: "inbound" }
    ],
    aiPrompt: "You are Liam Davis, a tech-savvy backend engineer. Keep responses crisp, clean, and professional."
  },
  103: {
    id: 103,
    name: "Sophia Martinez",
    username: "@sophia.m",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150",
    status: "online",
    time: "25m",
    unread: 0,
    typing: false,
    history: [
      { id: 1, text: "Voice message standard audio packet loaded.", time: "Yesterday", type: "inbound" }
    ],
    aiPrompt: "You are Sophia Martinez, a creative designer. Use artistic or relaxed vocabulary."
  },
  104: {
    id: 104,
    name: "Noah Wilson",
    username: "@noah.w",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
    status: "offline",
    time: "1h",
    unread: 0,
    typing: false,
    history: [
      { id: 1, text: "Let's catch up later.", time: "3 hours ago", type: "inbound" }
    ],
    aiPrompt: "You are Noah Wilson. Calm, collected, writes short and clear text sentences."
  },
  105: {
    id: 105,
    name: "Olivia Taylor",
    username: "@olivia.t",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150",
    status: "offline",
    time: "1h",
    unread: 0,
    typing: false,
    history: [
      { id: 1, text: "Missed voice pipeline connection.", time: "4 hours ago", type: "missed" }
    ],
    aiPrompt: "You are Olivia Taylor, a busy product manager. Quick, execution-oriented answers."
  }
};

const STORIES_DATA = [
  { id: 1, name: "Your Story", avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150", active: false },
  { id: 2, name: "Emma", avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150", active: true },
  { id: 3, name: "Liam", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150", active: true },
  { id: 4, name: "Sophia", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150", active: true },
  { id: 5, name: "Noah", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150", active: false }
];

export default function App() {
  const [activeMenuTab, setActiveMenuTab] = useState('messages'); // Dynamic UI Tab Link Router
  const [selectedChatId, setSelectedChatId] = useState(101);
  const [chatDatabase, setChatDatabase] = useState(INITIAL_CONTACTS);
  const [inputTextMsg, setInputTextMsg] = useState('');
  const [searchFilter, setSearchFilter] = useState('');
  const [isAudioMuted, setIsAudioMuted] = useState(false);

  // Dedicated Voice/Video Calling System Overlay Configuration
  const [activeCallSession, setActiveCallSession] = useState(null);
  const [callStopwatchTime, setCallStopwatchTime] = useState(0);

  const endOfMessagesAnchorRef = useRef(null);
  let callTimerTickerRef = useRef(null);

  useEffect(() => {
    if (endOfMessagesAnchorRef.current) {
      endOfMessagesAnchorRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatDatabase, selectedChatId]);

  useEffect(() => {
    if (activeCallSession && activeCallSession.status === "Active Connection") {
      callTimerTickerRef.current = setInterval(() => {
        setCallStopwatchTime(prev => prev + 1);
      }, 1000);
    } else {
      clearInterval(callTimerTickerRef.current);
      setCallStopwatchTime(0);
    }
    return () => clearInterval(callTimerTickerRef.current);
  }, [activeCallSession]);

  const generateCallDurationStamp = (secs) => {
    const m = Math.floor(secs / 60).toString().padStart(2, '0');
    const s = (secs % 60).toString().padStart(2, '0');
    return `${m}m ${s}s`;
  };

  // ========================================================
  // SECRET AI (GEMINI ENGINE) RESPONSE SYSTEM
  // ========================================================
  const runSecretGeminiResponder = (targetId, userMessageText) => {
    // Trigger typing state imitation
    setTimeout(() => {
      setChatDatabase(prev => ({
        ...prev,
        [targetId]: { ...prev[targetId], typing: true }
      }));
    }, 800);

    // Deep processing simulation logic mirroring Gemini context pipeline
    setTimeout(() => {
      setChatDatabase(prev => {
        if (!prev[targetId]) return prev;
        const currentProfile = prev[targetId];

        // Intelligent Rule Layer mapping directly to user intents
        let geminiInferredReply = "Got it! Your update is completely logged into our master node network. 👍";
        
        const lowerMsg = userMessageText.toLowerCase();
        if (lowerMsg.includes("hi") || lowerMsg.includes("hello")) {
          geminiInferredReply = currentProfile.name.includes("Emily") 
            ? "Hey! Awesome to connect here, what's new on the development layout? ✨" 
            : `Hello! Hope your development server environment is running smooth.`;
        } else if (lowerMsg.includes("render") || lowerMsg.includes("website") || lowerMsg.includes("build")) {
          geminiInferredReply = "Wow, that's awesome! The Render deployment build is fully active now. 🚀";
        } else if (lowerMsg.includes("status") || lowerMsg.includes("code")) {
          geminiInferredReply = "The master repository code syntax is perfectly clean. Ready for scaling up pipelines.";
        }

        const clockTimeNow = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        return {
          ...prev,
          [targetId]: {
            ...currentProfile,
            typing: false,
            history: [
              ...currentProfile.history,
              { id: Date.now(), text: geminiInferredReply, time: clockTimeNow, type: "inbound" }
            ]
          }
        };
      });
    }, 2200);
  };

  const executeSendPacket = () => {
    if (!inputTextMsg.trim()) return;

    const activeChatScopeId = selectedChatId;
    const currentClockStamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    setChatDatabase(prev => ({
      ...prev,
      [activeChatScopeId]: {
        ...prev[activeChatScopeId],
        history: [
          ...prev[activeChatScopeId].history,
          { id: Date.now(), text: inputTextMsg, time: currentClockStamp, type: "outbound" }
        ]
      }
    }));

    const dynamicCachedMsg = inputTextMsg;
    setInputTextMsg('');

    // Launch the undercover conversational Gemini core thread loop
    runSecretGeminiResponder(activeChatScopeId, dynamicCachedMsg);
  };

  const initializeCallInterface = (userProfile, mode) => {
    setActiveCallSession({ user: userProfile, mode: mode, status: "Ringing Pipeline Signal..." });
    setTimeout(() => {
      setActiveCallSession(prev => prev ? { ...prev, status: "Active Connection" } : null);
    }, 1500);
  };

  return (
    <div style={styles.appViewportContainerLayoutFrame}>
      
      {/* ========================================================
          PANEL 1: CORE APPLICATION VERTICAL NAV STRIP
          ======================================================== */}
      <div style={styles.primaryLeftNavigationRailDeckContainer}>
        <div>
          <div style={styles.appCoreIdentityHeaderBrandRow}>
            <div style={styles.appLogoCircleGraphicIcon}><i class="fas fa-comment-dots"></i></div>
            <span style={styles.appLogoTitleStringTextLabel}>ConnectHub</span>
          </div>

          <div style={styles.navigationControlStackLinkContainer}>
            <div style={{ ...styles.navigationRailLinkItemCard, ...(activeMenuTab === 'home' ? styles.navigationRailLinkItemCardActive : {}) }} onClick={() => setActiveMenuTab('home')}>
              <i class="fas fa-house"></i> <span>Home</span>
            </div>
            <div style={{ ...styles.navigationRailLinkItemCard, ...(activeMenuTab === 'messages' ? styles.navigationRailLinkItemCardActive : {}) }} onClick={() => setActiveMenuTab('messages')}>
              <i class="fas fa-message"></i> <span>Messages</span>
            </div>
            <div style={{ ...styles.navigationRailLinkItemCard, ...(activeMenuTab === 'voice' ? styles.navigationRailLinkItemCardActive : {}) }} onClick={() => { setActiveMenuTab('voice'); initializeCallInterface(chatDatabase[selectedChatId], 'Voice Engine Call'); }}>
              <i class="fas fa-phone"></i> <span>Voice Call</span>
            </div>
            <div style={{ ...styles.navigationRailLinkItemCard, ...(activeMenuTab === 'video' ? styles.navigationRailLinkItemCardActive : {}) }} onClick={() => { setActiveMenuTab('video'); initializeCallInterface(chatDatabase[selectedChatId], 'Video Stream Matrix'); }}>
              <i class="fas fa-video"></i> <span>Video Call</span>
            </div>
            <div style={{ ...styles.navigationRailLinkItemCard, ...(activeMenuTab === 'people' ? styles.navigationRailLinkItemCardActive : {}) }} onClick={() => setActiveMenuTab('people')}>
              <i class="fas fa-user-group"></i> <span>People</span>
            </div>
            <div style={{ ...styles.navigationRailLinkItemCard, ...(activeMenuTab === 'favorites' ? styles.navigationRailLinkItemCardActive : {}) }} onClick={() => setActiveMenuTab('favorites')}>
              <i class="far fa-star"></i> <span>Favorites</span>
            </div>
            <div style={{ ...styles.navigationRailLinkItemCard, ...(activeMenuTab === 'notifications' ? styles.navigationRailLinkItemCardActive : {}) }} onClick={() => setActiveMenuTab('notifications')}>
              <i class="far fa-bell"></i> <span>Notifications</span>
            </div>
          </div>
        </div>

        <div>
          <div style={styles.navigationControlStackLinkContainer}>
            <div style={styles.navigationRailLinkItemCard}><i class="far fa-circle-question"></i> <span>Help Center</span></div>
            <div style={styles.navigationRailLinkItemCard}><i class="fas fa-shield-halved"></i> <span>Safety Center</span></div>
            <div style={styles.navigationRailLinkItemCard}><i class="far fa-file-lines"></i> <span>Terms of Service</span></div>
            <div style={styles.navigationRailLinkItemCard}><i class="fas fa-user-lock"></i> <span>Privacy Policy</span></div>
            <hr style={{ border: 'none', height: '1px', background: '#222e35', margin: '15px 0' }} />
            <div style={styles.navigationRailLinkItemCard}><i class="fas fa-gear"></i> <span>Settings</span></div>
          </div>
        </div>
      </div>

      {/* ========================================================
          PANEL 2: MESSAGES DIRECTORY FEED & STORIES CAROUSEL 
          ======================================================== */}
      <div style={styles.operationalLedgerSplitFeedDirectoryColumnMasterPanel}>
        <div style={styles.ledgerSearchAndGlobalTopActionsDockBarRow}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={styles.hamburgerMenuTriggerIcon}><i class="fas fa-bars"></i></div>
            <h2 style={styles.ledgerPanelSectionMainHeadingLabelTitle}>Messages</h2>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', color: '#8696a0', fontSize: '16px' }}>
            <i class="fas fa-globe" style={{ cursor: 'pointer' }}></i>
            <i class="far fa-bell" style={{ cursor: 'pointer' }}></i>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150" alt="Identity Roster Node Profile" style={{ width: '32px', height: '32px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #25d366' }} />
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: '13px', fontWeight: '600', color: '#ffffff' }}>John Doe</span>
                <span style={{ fontSize: '10px', color: '#25d366' }}>Online</span>
              </div>
            </div>
          </div>
        </div>

        {/* REPLICATED DYNAMIC INSTANT REELS/STORIES HORIZONTAL SLIDER ROW COMPONENT */}
        <div style={styles.storiesHorizontalSliderTrackContainerFrame}>
          {STORIES_DATA.map(story => (
            <div key={story.id} style={styles.storyIndividualCircleTrackUnitComponentNode}>
              <div style={{ ...styles.storyCircularRingBoundaryAvatarWrapperFrame, border: story.active ? '2.5px solid #a855f7' : '2.5px solid #222e35' }}>
                <img src={story.avatar} alt={story.name} style={styles.storyCircularRingBoundaryAvatarImageNodeElement} />
                {story.id === 1 && <div style={styles.storySelfActionBadgeAddPlusIndicatorIcon}><i class="fas fa-plus"></i></div>}
              </div>
              <span style={styles.storyIndividualTextLabelStringNameSnippet}>{story.name}</span>
            </div>
          ))}
        </div>

        <div style={{ padding: '0 24px 16px 24px' }}>
          <div style={styles.ledgerSearchInputOuterWrapperBoxControlDeckContainer}>
            <i class="fas fa-search" style={styles.ledgerSearchIconElementNodeSymbol}></i>
            <input type="text" placeholder="Search messages or users" value={searchFilter} onChange={(e) => setSearchFilter(e.target.value)} style={styles.ledgerSearchInputFieldControlElementBoxNode} />
            <div style={styles.filterControlActionTriggerIconBtn}><i class="fas fa-sliders"></i></div>
          </div>
        </div>

        {/* ACTIVE DIRECTORY ROSTER DISPLAY FEED ITERATOR STACK */}
        <div style={styles.ledgerScrollableFeedStackContainerListPanelComponent}>
          {Object.values(chatDatabase)
            .filter(c => c.name.toLowerCase().includes(searchFilter.toLowerCase()))
            .map(contact => {
              const localHistoryLogsArray = contact.history;
              const tailEndLogNode = localHistoryLogsArray[localHistoryLogsArray.length - 1];
              return (
                <div key={contact.id} style={{ ...styles.rosterCardItemRowFramePlatformContainer, ...(selectedChatId === contact.id ? styles.rosterCardItemRowFramePlatformContainerSelected : {}) }} onClick={() => setSelectedChatId(contact.id)}>
                  <div style={styles.rosterAvatarWrapperFrameComponentLayoutAnchor}>
                    <img src={contact.avatar} alt={contact.name} style={styles.rosterAvatarImageGraphicNodeElement} />
                    {contact.status === 'online' && <div style={styles.rosterAvatarOnlineTelemetryStatusDotBadgeIndicator}></div>}
                  </div>
                  <div style={{ flex: 1, overflow: 'hidden' }}>
                    <div style={styles.rosterMetaHeaderRowFlexlineContainerBoxed}>
                      <span style={styles.rosterDisplayIdentityTextLabelNameString}>{contact.name}</span>
                      <span style={styles.rosterTimestampLogMetricStringLabel}>{contact.time}</span>
                    </div>
                    <div style={styles.rosterMetaBodySubtextRowFlexlineContainerBoxed}>
                      <span style={styles.rosterMessageTextSnippetPreviewStringLine}>
                        {contact.typing ? <span style={{ color: '#a855f7', fontWeight: '700' }}>Typing...</span> : (tailEndLogNode ? tailEndLogNode.text : 'No active trace records.')}
                      </span>
                      {contact.unread > 0 && <span style={styles.rosterUnreadNotificationCounterBadgeUnitBubble}>{contact.unread}</span>}
                    </div>
                  </div>
                </div>
              );
          })}
        </div>
      </div>

      {/* ========================================================
          PANEL 3: INTERACTIVE CHAT ECOSYSTEM CENTRAL STAGE
          ======================================================== */}
      <div style={styles.chatStreamWorkspaceCentralStageCanvasPanelSectionContainer}>
        {selectedChatId && chatDatabase[selectedChatId] ? (
          <>
            <div style={styles.chatHeaderTopToolbarInterfaceDockRowBox}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div style={styles.rosterAvatarWrapperFrameComponentLayoutAnchor}>
                  <img src={chatDatabase[selectedChatId].avatar} alt={chatDatabase[selectedChatId].name} style={styles.chatHeaderActiveUserAvatarElementNodeIcon} />
                  {chatDatabase[selectedChatId].status === 'online' && <div style={styles.rosterAvatarOnlineTelemetryStatusDotBadgeIndicator}></div>}
                </div>
                <div>
                  <div style={styles.chatHeaderActiveUserDisplayNameLabelTextString}>{chatDatabase[selectedChatId].name}</div>
                  <div style={{ fontSize: '12px', color: chatDatabase[selectedChatId].status === 'online' ? '#25d366' : '#8696a0' }}>
                    {chatDatabase[selectedChatId].status === 'online' ? 'Online' : 'Offline'}
                  </div>
                </div>
              </div>

              <div style={styles.chatHeaderTopToolbarActionControlsButtonGroupRowIconsDeck}>
                <div style={styles.chatHeaderToolbarIconActionBtnCircleNodeLink} onClick={() => initializeCallInterface(chatDatabase[selectedChatId], 'Voice System Pipeline')}><i class="fas fa-phone"></i></div>
                <div style={styles.chatHeaderToolbarIconActionBtnCircleNodeLink} onClick={() => initializeCallInterface(chatDatabase[selectedChatId], 'Video Stream Matrix')}><i class="fas fa-video"></i></div>
                <div style={styles.chatHeaderToolbarIconActionBtnCircleNodeLink}><i class="fas fa-circle-info"></i></div>
              </div>
            </div>

            {/* MESSAGE SCROLL ENGINE RUNWAY CANVAS */}
            <div style={styles.chatMessageTrackScrollableCanvasViewportWindowContainer}>
              {chatDatabase[selectedChatId].history.map(msg => (
                <div key={msg.id} style={{ ...styles.chatBubbleBaseStructureLayoutBoxCard, ...(msg.type === 'outbound' ? styles.chatBubbleBaseStructureLayoutBoxCardOutbound : styles.chatBubbleBaseStructureLayoutBoxCardInbound) }}>
                  {msg.isAudio ? (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '6px 2px', minWidth: '220px' }}>
                      <div style={styles.chatAudioPlayIconCircleBtnGraphicElementNode}><i class="fas fa-play"></i></div>
                      <div style={{ flex: 1, height: '4px', background: 'rgba(255,255,255,0.2)', borderRadius: '2px', position: 'relative' }}>
                        <div style={{ width: '65%', height: '100%', background: msg.type === 'outbound' ? '#ffffff' : '#a855f7', borderRadius: '2px' }}></div>
                      </div>
                      <span style={{ fontSize: '11px', color: '#8696a0' }}>00:12</span>
                    </div>
                  ) : (
                    <div style={{ wordBreak: 'break-word', fontSize: '14.5px' }}>{msg.text}</div>
                  )}
                  <div style={styles.chatBubbleCardFooterLineMetadataRowLayoutFields}>
                    <span>{msg.time}</span>
                    {msg.type === 'outbound' && <i class="fas fa-check-double" style={{ color: '#34b7f1', marginLeft: '5px' }}></i>}
                  </div>
                </div>
              ))}
              
              {chatDatabase[selectedChatId].typing && (
                <div style={{ ...styles.chatBubbleBaseStructureLayoutBoxCard, ...styles.chatBubbleBaseStructureLayoutBoxCardInbound, display: 'flex', alignItems: 'center', gap: '6px', padding: '12px 18px' }}>
                  <div style={styles.typingIndicatorDotAnimPulse}></div>
                  <div style={{ ...styles.typingIndicatorDotAnimPulse, animationDelay: '0.2s' }}></div>
                  <div style={{ ...styles.typingIndicatorDotAnimPulse, animationDelay: '0.4s' }}></div>
                  <span style={{ fontSize: '12px', color: '#8696a0', marginLeft: '6px' }}>{chatDatabase[selectedChatId].name} is typing...</span>
                </div>
              )}
              <div ref={endOfMessagesAnchorRef} />
            </div>

            {/* SUBMIT ACTIONS IO DOCK FOOTER PIPELINE AREA */}
            <div style={styles.chatInputFooterDockPanelBarBoxRowContainer}>
              <div style={styles.chatInputToolbarPanelSubmitActionCircularBtnControlDeckIcon}><i class="fas fa-plus"></i></div>
              <div style={styles.chatInputFieldTextNodeControlWrapperBoxedContainerElement}>
                <input type="text" placeholder="Type a message..." value={inputTextMsg} onChange={(e) => setInputTextMsg(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && executeSendPacket()} style={styles.chatInputFieldTextNodeControlRawInputElementUnit} />
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', color: '#8696a0', fontSize: '18px', paddingRight: '6px' }}>
                  <i class="far fa-face-smile" style={{ cursor: 'pointer' }}></i>
                  <i class="fas fa-microphone" style={{ cursor: 'pointer' }}></i>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div style={styles.emptyCanvasStageContainerOverlayPlaceholder}>
            <i class="far fa-comments" style={{ fontSize: '70px', color: '#202c33', marginBottom: '16px' }}></i>
            <h3>No Active Convergent Channel Target Selected</h3>
          </div>
        )}
      </div>

      {/* ========================================================
          PANEL 4: DETAILED PROFILE COMPONENT DRAWER METADATA
          ======================================================== */}
      {selectedChatId && chatDatabase[selectedChatId] && (
        <div style={styles.profileExtendedDetailsSidebarDeckColumnPanelSectionFrame}>
          <div style={{ textAlign: 'center', padding: '10px 0' }}>
            <div style={{ position: 'relative', display: 'inline-block' }}>
              <img src={chatDatabase[selectedChatId].avatar} alt={chatDatabase[selectedChatId].name} style={styles.profileMetaSidebarAvatarImageGraphicNodeComponent} />
              {chatDatabase[selectedChatId].status === 'online' && <div style={styles.profileMetaSidebarAvatarOnlineTelemetryBadgeDotIndicator}></div>}
            </div>
            <h3 style={{ color: '#ffffff', fontSize: '20px', fontWeight: '700', marginTop: '16px', marginBottom: '4px' }}>{chatDatabase[selectedChatId].name}</h3>
            <p style={{ color: '#8696a0', fontSize: '13px' }}>{chatDatabase[selectedChatId].status === 'online' ? 'Online' : 'Offline'}</p>
          </div>

          <div style={styles.profileMetaSidebarActionButtonsQuickRowConsoleGrid}>
            <div style={styles.profileMetaSidebarActionButtonCircleLinkNode} onClick={() => initializeCallInterface(chatDatabase[selectedChatId], 'Voice Routing Link')}><i class="fas fa-phone"></i><span>Voice Call</span></div>
            <div style={styles.profileMetaSidebarActionButtonCircleLinkNode} onClick={() => initializeCallInterface(chatDatabase[selectedChatId], 'Video Routing Link')}><i class="fas fa-video"></i><span>Video Call</span></div>
            <div style={{ ...styles.profileMetaSidebarActionButtonCircleLinkNode, color: isAudioMuted ? '#ea0038' : '#8696a0' }} onClick={() => setIsAudioMuted(!isAudioMuted)}>
              <i class={`fas ${isAudioMuted ? 'fa-volume-xmark' : 'fa-volume-high'}`}></i><span>{isAudioMuted ? 'Unmute' : 'Mute'}</span>
            </div>
            <div style={styles.profileMetaSidebarActionButtonCircleLinkNode}><i class="fas fa-ellipsis"></i><span>More</span></div>
          </div>

          <div style={styles.profileAssetDirectorySectionAccordionContainerWrapperFrame}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
              <span style={{ fontWeight: '600', color: '#ffffff', fontSize: '14px' }}>Media, files and links</span>
              <span style={{ color: '#8696a0', fontSize: '13px', cursor: 'pointer' }}>12 <i class="fas fa-chevron-right" style={{ fontSize: '10px', marginLeft: '4px' }}></i></span>
            </div>
            <div style={styles.profileAssetSharedGraphicsPhotoMediaGridContainer}>
              <img src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=150" alt="Shared Graphic Vault Asset Element" style={styles.profileAssetSharedGraphicsPhotoMediaGridItemComponentNode} />
              <img src="https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=150" alt="Shared Graphic Vault Asset Element" style={styles.profileAssetSharedGraphicsPhotoMediaGridItemComponentNode} />
              <img src="https://images.unsplash.com/photo-1501854140801-50d01698950b?w=150" alt="Shared Graphic Vault Asset Element" style={styles.profileAssetSharedGraphicsPhotoMediaGridItemComponentNode} />
              <img src="https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=150" alt="Shared Graphic Vault Asset Element" style={styles.profileAssetSharedGraphicsPhotoMediaGridItemComponentNode} />
            </div>
          </div>

          <div style={{ padding: '0 8px' }}>
            <div style={styles.profileSystemSettingActionRowToggleLinkItemCard}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <i class="far fa-bell" style={{ fontSize: '16px' }}></i>
                <span style={{ fontSize: '14px' }}>Mute notifications</span>
              </div>
              <div style={{ ...styles.toggleSwitchBaseTrackOuterBodyGraphicFrame, backgroundColor: isAudioMuted ? '#a855f7' : '#202c33' }} onClick={() => setIsAudioMuted(!isAudioMuted)}>
                <div style={{ ...styles.toggleSwitchBaseTrackInnerKnobGraphicCircle, transform: isAudioMuted ? 'translateX(16px)' : 'translateX(0px)' }}></div>
              </div>
            </div>

            <div style={{ ...styles.profileSystemSettingActionRowToggleLinkItemCard, color: '#ea0038' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}>
                <i class="far fa-circle-xmark" style={{ fontSize: '16px' }}></i>
                <span style={{ fontSize: '14px', fontWeight: '600' }}>Block user</span>
              </div>
            </div>

            <div style={{ ...styles.profileSystemSettingActionRowToggleLinkItemCard, color: '#ea0038', borderBottom: 'none' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}>
                <i class="far fa-flag" style={{ fontSize: '16px' }}></i>
                <span style={{ fontSize: '14px', fontWeight: '600' }}>Report user</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          IMMERSIVE TELECOM OVERLAY VIEWPORT DIALOG MODAL BOX WINDOW
          ======================================================== */}
      {activeCallSession && (
        <div style={styles.telecomPipelineImmersiveOverlayBackdropLayerModalFrame}>
          <div style={{ textAlign: 'center' }}>
            <img src={activeCallSession.user.avatar} alt="Active Caller Anchor Thumbnail Profile Image" style={styles.telecomPipelineAvatarCircleGraphicNodeNodeElement} />
            <h2 style={{ color: '#ffffff', fontSize: '26px', fontWeight: '700', marginBottom: '6px' }}>{activeCallSession.user.name}</h2>
            <p style={{ color: activeCallSession.status.includes("Active") ? '#25d366' : '#8696a0', fontSize: '14px', letterSpacing: '0.4px', fontWeight: '500' }}>
              {activeCallSession.status.includes("Active") ? `Secure Peer Session Up: ${generateCallDurationStamp(callStopwatchTime)}` : activeCallSession.status}
            </p>
          </div>

          <div style={styles.telecomPipelineActionControlsToolbarConsoleDockButtonGroupRow}>
            <div style={styles.telecomPipelineControlActionCircularBtnIconNode}><i class="fas fa-microphone-slash"></i></div>
            <div style={styles.telecomPipelineControlActionCircularBtnIconNode}><i class="fas fa-video-slash"></i></div>
            <div style={{ ...styles.telecomPipelineControlActionCircularBtnIconNode, background: '#ea0038' }} onClick={() => setActiveCallSession(null)}><i class="fas fa-phone-slash"></i></div>
          </div>
        </div>
      )}

    </div>
  );
}

// ========================================================
// 2. STYLES SPECIFICATION MAP DATA MODULE (PREMIUM CORE DESIGN DECK)
// ========================================================
const styles = {
  appViewportContainerLayoutFrame: {
    backgroundColor: '#0b141a',
    color: '#e9edef',
    height: '100vh',
    width: '100vw',
    display: 'flex',
    overflow: 'hidden',
    fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif'
  },
  primaryLeftNavigationRailDeckContainer: {
    background: '#111b21',
    borderRight: '1px solid #222e35',
    width: '260px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: '30px 18px',
    flexShrink: 0
  },
  appCoreIdentityHeaderBrandRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '14px',
    padding: '0 8px',
    marginBottom: '36px'
  },
  appLogoCircleGraphicIcon: {
    background: '#a855f7',
    color: '#ffffff',
    width: '38px',
    height: '38px',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '18px',
    boxShadow: '0 4px 12px rgba(168,85,247,0.3)'
  },
  appLogoTitleStringTextLabel: {
    fontSize: '21px',
    fontWeight: '700',
    color: '#ffffff',
    letterSpacing: '0.3px'
  },
  navigationControlStackLinkContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px'
  },
  navigationRailLinkItemCard: {
    display: 'flex',
    alignItems: 'center',
    gap: '14px',
    padding: '13px 16px',
    borderRadius: '12px',
    color: '#8696a0',
    fontSize: '15px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.2s ease-in-out'
  },
  navigationRailLinkItemCardActive: {
    background: 'rgba(168,85,247,0.12)',
    color: '#a855f7',
    fontWeight: '600'
  },
  operationalLedgerSplitFeedDirectoryColumnMasterPanel: {
    background: '#111b21',
    borderRight: '1px solid #222e35',
    width: '360px',
    display: 'flex',
    flexDirection: 'column',
    flexShrink: 0
  },
  ledgerSearchAndGlobalTopActionsDockBarRow: {
    padding: '24px 24px 16px 24px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  hamburgerMenuTriggerIcon: {
    fontSize: '18px',
    color: '#ffffff',
    cursor: 'pointer'
  },
  ledgerPanelSectionMainHeadingLabelTitle: {
    fontSize: '24px',
    fontWeight: '700',
    color: '#ffffff'
  },
  storiesHorizontalSliderTrackContainerFrame: {
    display: 'flex',
    gap: '16px',
    padding: '8px 24px 20px 24px',
    overflowX: 'auto',
    scrollbarWidth: 'none'
  },
  storyIndividualCircleTrackUnitComponentNode: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '8px',
    cursor: 'pointer',
    flexShrink: 0
  },
  storyCircularRingBoundaryAvatarWrapperFrame: {
    width: '54px',
    height: '54px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    padding: '2px'
  },
  storyCircularRingBoundaryAvatarImageNodeElement: {
    width: '100%',
    height: '100%',
    borderRadius: '50%',
    objectFit: 'cover'
  },
  storySelfActionBadgeAddPlusIndicatorIcon: {
    position: 'absolute',
    bottom: '-2px',
    right: '-2px',
    background: '#a855f7',
    color: '#ffffff',
    width: '18px',
    height: '18px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '9px',
    border: '2px solid #111b21'
  },
  storyIndividualTextLabelStringNameSnippet: {
    fontSize: '11.5px',
    color: '#8696a0',
    fontWeight: '500'
  },
  ledgerSearchInputOuterWrapperBoxControlDeckContainer: {
    background: '#1c262d',
    border: '1px solid #222e35',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    padding: '10px 16px',
    gap: '12px'
  },
  ledgerSearchIconElementNodeSymbol: {
    color: '#8696a0',
    fontSize: '14px'
  },
  ledgerSearchInputFieldControlElementBoxNode: {
    background: 'transparent',
    border: 'none',
    outline: 'none',
    color: '#ffffff',
    fontSize: '14px',
    width: '100%'
  },
  filterControlActionTriggerIconBtn: {
    color: '#8696a0',
    fontSize: '14px',
    cursor: 'pointer'
  },
  ledgerScrollableFeedStackContainerListPanelComponent: {
    flex: 1,
    overflowY: 'auto',
    padding: '0 10px 24px 10px'
  },
  rosterCardItemRowFramePlatformContainer: {
    display: 'flex',
    alignItems: 'center',
    padding: '14px 14px',
    borderRadius: '14px',
    cursor: 'pointer',
    marginBottom: '4px',
    transition: 'background 0.2s'
  },
  rosterCardItemRowFramePlatformContainerSelected: {
    background: '#1c262d'
  },
  rosterAvatarWrapperFrameComponentLayoutAnchor: {
    position: 'relative',
    marginRight: '14px',
    display: 'flex',
    alignItems: 'center'
  },
  rosterAvatarImageGraphicNodeElement: {
    width: '48px',
    height: '48px',
    borderRadius: '50%',
    objectFit: 'cover'
  },
  rosterAvatarOnlineTelemetryStatusDotBadgeIndicator: {
    width: '12px',
    height: '12px',
    backgroundColor: '#25d366',
    border: '2.5px solid #111b21',
    borderRadius: '50%',
    position: 'absolute',
    bottom: '1px',
    right: '1px'
  },
  rosterMetaHeaderRowFlexlineContainerBoxed: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '4px'
  },
  rosterDisplayIdentityTextLabelNameString: {
    fontWeight: '600',
    color: '#ffffff',
    fontSize: '15px'
  },
  rosterTimestampLogMetricStringLabel: {
    fontSize: '12px',
    color: '#8696a0'
  },
  rosterMetaBodySubtextRowFlexlineContainerBoxed: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  rosterMessageTextSnippetPreviewStringLine: {
    fontSize: '13.5px',
    color: '#8696a0',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    maxWidth: '190px'
  },
  rosterUnreadNotificationCounterBadgeUnitBubble: {
    background: '#a855f7',
    color: '#ffffff',
    fontSize: '11px',
    fontWeight: '700',
    borderRadius: '50%',
    padding: '2px 6px',
    minWidth: '18px',
    textAlign: 'center'
  },
  chatStreamWorkspaceCentralStageCanvasPanelSectionContainer: {
    flex: 1,
    background: '#0b141a',
    display: 'flex',
    flexDirection: 'column'
  },
  emptyCanvasStageContainerOverlayPlaceholder: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#8696a0'
  },
  chatHeaderTopToolbarInterfaceDockRowBox: {
    background: '#111b21',
    borderBottom: '1px solid #222e35',
    padding: '16px 24px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  chatHeaderActiveUserAvatarElementNodeIcon: {
    width: '42px',
    height: '42px',
    borderRadius: '50%',
    objectFit: 'cover'
  },
  chatHeaderActiveUserDisplayNameLabelTextString: {
    fontWeight: '600',
    color: '#ffffff',
    fontSize: '16px'
  },
  chatHeaderTopToolbarActionControlsButtonGroupRowIconsDeck: {
    display: 'flex',
    gap: '12px'
  },
  chatHeaderToolbarIconActionBtnCircleNodeLink: {
    width: '38px',
    height: '38px',
    borderRadius: '50%',
    background: '#1c262d',
    color: '#a855f7',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '15px',
    cursor: 'pointer',
    border: '1px solid #222e35'
  },
  chatMessageTrackScrollableCanvasViewportWindowContainer: {
    flex: 1,
    overflowY: 'auto',
    padding: '24px',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    background: '#0b141a'
  },
  chatBubbleBaseStructureLayoutBoxCard: {
    maxWidth: '60%',
    padding: '12px 16px',
    borderRadius: '16px',
    fontSize: '14.5px',
    lineHeight: '1.5',
    position: 'relative'
  },
  chatBubbleBaseStructureLayoutBoxCardInbound: {
    background: '#1c262d',
    color: '#e9edef',
    alignSelf: 'flex-start',
    borderTopLeftRadius: '2px'
  },
  chatBubbleBaseStructureLayoutBoxCardOutbound: {
    background: '#a855f7',
    color: '#ffffff',
    alignSelf: 'flex-end',
    borderTopRightRadius: '2px',
    boxShadow: '0 2px 8px rgba(168,85,247,0.2)'
  },
  chatBubbleCardFooterLineMetadataRowLayoutFields: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    fontSize: '11px',
    color: 'rgba(255,255,255,0.5)',
    marginTop: '5px'
  },
  chatAudioPlayIconCircleBtnGraphicElementNode: {
    width: '34px',
    height: '34px',
    borderRadius: '50%',
    background: 'rgba(255,255,255,0.15)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#ffffff',
    cursor: 'pointer'
  },
  chatInputFooterDockPanelBarBoxRowContainer: {
    background: '#111b21',
    padding: '16px 24px',
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    borderTop: '1px solid #222e35'
  },
  chatInputToolbarPanelSubmitActionCircularBtnControlDeckIcon: {
    color: '#8696a0',
    fontSize: '20px',
    cursor: 'pointer'
  },
  chatInputFieldTextNodeControlWrapperBoxedContainerElement: {
    flex: 1,
    background: '#1c262d',
    borderRadius: '14px',
    display: 'flex',
    alignItems: 'center',
    padding: '4px 14px',
    border: '1px solid #222e35'
  },
  chatInputFieldTextNodeControlRawInputElementUnit: {
    flex: 1,
    background: 'transparent',
    border: 'none',
    outline: 'none',
    padding: '10px 4px',
    color: '#ffffff',
    fontSize: '14.5px'
  },
  profileExtendedDetailsSidebarDeckColumnPanelSectionFrame: {
    width: '320px',
    background: '#111b21',
    borderLeft: '1px solid #222e35',
    padding: '30px 20px',
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
    flexShrink: 0
  },
  profileMetaSidebarAvatarImageGraphicNodeComponent: {
    width: '94px',
    height: '94px',
    borderRadius: '50%',
    objectFit: 'cover',
    border: '3px solid rgba(168,85,247,0.2)'
  },
  profileMetaSidebarAvatarOnlineTelemetryBadgeDotIndicator: {
    width: '14px',
    height: '14px',
    backgroundColor: '#25d366',
    border: '2.5px solid #111b21',
    borderRadius: '50%',
    position: 'absolute',
    bottom: '4px',
    right: '4px'
  },
  profileMetaSidebarActionButtonsQuickRowConsoleGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '8px',
    paddingBottom: '8px'
  },
  profileMetaSidebarActionButtonCircleLinkNode: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '8px',
    color: '#8696a0',
    fontSize: '11px',
    cursor: 'pointer',
    textAlign: 'center'
  },
  profileAssetDirectorySectionAccordionContainerWrapperFrame: {
    background: '#1c262d',
    borderRadius: '16px',
    padding: '16px',
    border: '1px solid #222e35'
  },
  profileAssetSharedGraphicsPhotoMediaGridContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '8px'
  },
  profileAssetSharedGraphicsPhotoMediaGridItemComponentNode: {
    width: '100%',
    height: '56px',
    borderRadius: '8px',
    objectFit: 'cover'
  },
  profileSystemSettingActionRowToggleLinkItemCard: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '14px 0',
    borderBottom: '1px solid #222e35',
    color: '#e9edef'
  },
  toggleSwitchBaseTrackOuterBodyGraphicFrame: {
    width: '34px',
    height: '18px',
    borderRadius: '10px',
    padding: '2px',
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    transition: 'background-color 0.2s'
  },
  toggleSwitchBaseTrackInnerKnobGraphicCircle: {
    width: '14px',
    height: '14px',
    borderRadius: '50%',
    background: '#ffffff',
    transition: 'transform 0.2s'
  },
  telecomPipelineImmersiveOverlayBackdropLayerModalFrame: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'radial-gradient(circle at center, #1b122c 0%, #0b141a 100%)',
    zIndex: 9999,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '100px 40px'
  },
  telecomPipelineAvatarCircleGraphicNodeNodeElement: {
    width: '130px',
    height: '130px',
    borderRadius: '50%',
    objectFit: 'cover',
    border: '4px solid #a855f7',
    marginBottom: '24px',
    boxShadow: '0 0 30px rgba(168,85,247,0.4)'
  },
  telecomPipelineControlActionCircularBtnIconNode: {
    width: '56px',
    height: '56px',
    borderRadius: '50%',
    background: 'rgba(255,255,255,0.08)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#ffffff',
    fontSize: '18px',
    cursor: 'pointer',
    transition: 'background 0.2s'
  },
  telecomPipelineActionControlsToolbarConsoleDockButtonGroupRow: {
    display: 'flex',
    gap: '24px'
  },
  typingIndicatorDotAnimPulse: {
    width: '6px',
    height: '6px',
    background: '#a855f7',
    borderRadius: '50%',
    animation: 'pulse 1.2s infinite ease-in-out'
  }
};
    
