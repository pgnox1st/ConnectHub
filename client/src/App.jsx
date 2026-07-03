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
            history
      
