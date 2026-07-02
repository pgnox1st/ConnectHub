import React, { useState, useRef, useEffect } from 'react';
import { FaPhoneAlt, FaVideo, FaInfoCircle, FaPlus, FaSmile, FaMicrophone, FaPlay, FaCheckDouble, FaPaperPlane } from 'react-icons/fa';
import { io } from 'socket.io-client';

// Connect to backend Socket.io server port 5000
const ENDPOINT = 'http://localhost:5000';
let socket;

function ChatWindow() {
  const [messages, setMessages] = useState([
    { id: 1, sender: 'emily', text: 'Hey there! 👋', time: '02:10 PM' },
    { id: 2, sender: 'me', text: 'Hi Emily! How are you doing?', time: '02:11 PM' },
    { id: 3, sender: 'emily', text: "I'm good, thanks! You?", time: '02:11 PM' },
    { id: 4, sender: 'me', text: "Doing great! What's up?", time: '02:12 PM' },
    { id: 5, sender: 'emily', type: 'audio', time: '02:12 PM', duration: '00:12' }
  ]);

  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [typingIndicator, setTypingIndicator] = useState(false);
  const messagesEndRef = useRef(null);
  
  // Fake static room ID for testing connection
  const activeChatId = "60c72b2f9b1d8b2bad6e4a1a"; 

  // Initialize Socket Connection
  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("join_chat", activeChatId);

    // Listen for incoming real-time messages
    socket.on("message_received", (newMessageReceived) => {
      setMessages((prevMessages) => [...prevMessages, {
        id: prevMessages.length + 1,
        sender: 'emily',
        text: newMessageReceived.text,
        time: newMessageReceived.time
      }]);
    });

    // Listen for typing statuses
    socket.on("typing", () => setTypingIndicator(true));
    socket.on("stop_typing", () => setTypingIndicator(false));

    return () => {
      socket.disconnect();
    };
  }, []);

  // Auto-scroll logic
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Typing logic handler
  const handleInputChange = (e) => {
    setInputText(e.target.value);

    if (!socket) return;

    if (!isTyping) {
      setIsTyping(true);
      socket.emit("typing", activeChatId);
    }

    // Stop typing indicator after 3 seconds of no keystrokes
    let lastTypingTime = new Date().getTime();
    setTimeout(() => {
      let timeNow = new Date().getTime();
      let timeDiff = timeNow - lastTypingTime;
      if (timeDiff >= 3000 && isTyping) {
        socket.emit("stop_typing", activeChatId);
        setIsTyping(false);
      }
    }, 3000);
  };

  // Send message logic via socket
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    socket.emit("stop_typing", activeChatId);
    setIsTyping(false);

    const now = new Date();
    const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const newMessage = {
      text: inputText,
      chatId: { _id: activeChatId, participants: [{ _id: "emily_id" }] },
      sender: { _id: "my_id" },
      time: timeString
    };

    // Emit event to server
    socket.emit("new_message", newMessage);

    // Render locally immediately
    setMessages([...messages, { id: messages.length + 1, sender: 'me', text: inputText, time: timeString }]);
    setInputText('');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', flex: 1, height: '100vh', backgroundColor: '#fafafb' }}>
      
      {/* Top Header */}
      <div style={{ height: '70px', backgroundColor: '#ffffff', borderBottom: '1px solid #f0f2f5', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ position: 'relative' }}>
            <div style={{ width: '42px', height: '42px', borderRadius: '50%', backgroundColor: '#7b57ff', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>E</div>
            <div style={{ position: 'absolute', bottom: '0', right: '0', width: '10px', height: '10px', backgroundColor: '#45bd62', borderRadius: '50%', border: '2px solid #fff' }} />
          </div>
          <div>
            <h4 style={{ margin: 0, fontSize: '15px', fontWeight: '600', color: '#1c1e21' }}>Emily Johnson</h4>
            <span style={{ fontSize: '12px', color: '#45bd62', fontWeight: '500' }}>Online</span>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '20px', color: '#65676b', fontSize: '18px' }}>
          <FaPhoneAlt style={{ cursor: 'pointer' }} title="Voice Call" />
          <FaVideo style={{ cursor: 'pointer' }} title="Video Call" />
          <FaInfoCircle style={{ cursor: 'pointer' }} title="Conversation Info" />
        </div>
      </div>

      {/* Messages Render Area */}
      <div style={{ flex: 1, padding: '24px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {messages.map((msg) => (
          <div key={msg.id} style={{ alignSelf: msg.sender === 'me' ? 'flex-end' : 'flex-start', maxWidth: '60%', display: 'flex', flexDirection: 'column', alignItems: msg.sender === 'me' ? 'flex-end' : 'flex-start' }}>
            
            {msg.type === 'audio' ? (
              <div style={{ backgroundColor: '#f0f2f5', padding: '10px 16px', borderRadius: '18px 18px 18px 4px', display: 'flex', alignItems: 'center', gap: '12px', width: '240px' }}>
                <button type="button" style={{ border: 'none', backgroundColor: '#7b57ff', color: '#fff', width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', paddingLeft: '3px' }}>
                  <FaPlay style={{ fontSize: '12px' }} />
                </button>
                <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '2px', height: '20px' }}>
                  {[6, 14, 10, 18, 12, 8, 16, 10, 14, 6, 12, 18, 10, 14, 8, 16, 6, 10, 12].map((h, i) => (
                    <div key={i} style={{ width: '2px', height: `${h}px`, backgroundColor: i < 8 ? '#7b57ff' : '#ccd0d5', borderRadius: '1px' }} />
                  ))}
                </div>
                <span style={{ fontSize: '11px', color: '#65676b' }}>{msg.duration}</span>
              </div>
            ) : (
              <div style={{ 
                backgroundColor: msg.sender === 'me' ? '#7b57ff' : '#f0f2f5', 
                color: msg.sender === 'me' ? '#ffffff' : '#1c1e21', 
                padding: '12px 16px', 
                borderRadius: msg.sender === 'me' ? '18px 18px 4px 18px' : '18px 18px 18px 4px', 
                fontSize: '14px', 
                lineHeight: '1.4' 
              }}>
                {msg.text}
              </div>
            )}

            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '4px' }}>
              <span style={{ fontSize: '11px', color: '#8e9297' }}>{msg.time}</span>
              {msg.sender === 'me' && <FaCheckDouble style={{ fontSize: '12px', color: '#7b57ff' }} />}
            </div>
          </div>
        ))}

        {/* Real-time Live Typing Status */}
        {typingIndicator && (
          <div style={{ alignSelf: 'flex-start', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: '#45bd62', fontWeight: '500', marginLeft: '4px' }}>
            <span style={{ display: 'inline-block', width: '6px', height: '6px', backgroundColor: '#45bd62', borderRadius: '50%' }}></span>
            Emily is typing...
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Bottom Input Area */}
      <form onSubmit={handleSendMessage} style={{ padding: '16px 24px', backgroundColor: '#ffffff', borderTop: '1px solid #f0f2f5', display: 'flex', alignItems: 'center', gap: '16px' }}>
        <button type="button" style={{ border: 'none', backgroundColor: '#7b57ff', color: '#ffffff', width: '36px', height: '36px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontSize: '14px' }}>
          <FaPlus />
        </button>

        <div style={{ flex: 1, display: 'flex', alignItems: 'center', backgroundColor: '#f0f2f5', padding: '10px 18px', borderRadius: '24px' }}>
          <input 
            type="text" 
            placeholder="Type a message..." 
            value={inputText}
            onChange={handleInputChange}
            style={{ flex: 1, border: 'none', backgroundColor: 'transparent', outline: 'none', fontSize: '14px', color: '#1c1e21' }} 
          />
          <div style={{ display: 'flex', gap: '14px', color: '#65676b', fontSize: '18px', cursor: 'pointer', alignItems: 'center' }}>
            <FaSmile title="Insert Emoji" />
            <FaMicrophone title="Record Voice Message" />
          </div>
        </div>

        {inputText.trim() && (
          <button type="submit" style={{ border: 'none', backgroundColor: '#7b57ff', color: '#ffffff', width: '36px', height: '36px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
            <FaPaperPlane style={{ fontSize: '14px' }} />
          </button>
        )}
      </form>

    </div>
  );
}

export default ChatWindow;
      
