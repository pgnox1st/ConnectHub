import React, { useState, useRef, useEffect } from 'react';

const App = () => {
  const [messageDraft, setMessageDraft] = useState('');
  const [bufferedMediaAsset, setBufferedMediaAsset] = useState(null);
  const [chatThreads, setChatThreads] = useState([
    {
      id: 0,
      text: "Hello! I am pgnox1st AI. How can I assist you today?",
      sender: 'nexus',
      systemTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [isNexusProcessing, setIsNexusProcessing] = useState(false);
  const chatEndRef = useRef(null);

  // Auto-scroll to the bottom of the chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatThreads, isNexusProcessing]);

  const shipTerminalMessage = async () => {
    if (!messageDraft.trim() && !bufferedMediaAsset) return;
    
    const currentHumanClock = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const userText = messageDraft;
    const userImage = bufferedMediaAsset;

    // Display user message immediately
    setChatThreads(prev => [...prev, {
      id: Date.now(),
      text: userText,
      sender: 'operator',
      systemTime: currentHumanClock,
      attachedVisualStream: userImage
    }]);

    setMessageDraft('');
    setBufferedMediaAsset(null);
    setIsNexusProcessing(true);

    try {
      // Send request to backend
      const response = await fetch('https://connecthub-ai.onrender.com/api/chat', { 
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userText,
          imageBuffer: userImage, 
          mimeType: userImage ? userImage.substring(userImage.indexOf(":") + 1, userImage.indexOf(";")) : null
        })
      });

      const data = await response.json();

      // Display AI response
      setChatThreads(prev => [...prev, {
        id: Date.now() + 1,
        text: data.reply || "No response received.",
        sender: 'nexus',
        systemTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    } catch (err) {
      console.error("Frontend Fetch Error:", err);
      setChatThreads(prev => [...prev, {
        id: Date.now() + 1,
        text: "Could not connect to the server. Please check your backend service status.",
        sender: 'nexus',
        systemTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    } finally {
      setIsNexusProcessing(false);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setBufferedMediaAsset(reader.result);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div style={{ background: '#131314', color: '#e3e3e3', minHeight: '100vh', display: 'flex', flexDirection: 'column', fontFamily: '"Segoe UI", Roboto, sans-serif' }}>
      
      {/* Header */}
      <header style={{ padding: '16px 24px', borderBottom: '1px solid #2f2f30', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#1e1e20' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#4285f4' }}></div>
          <h1 style={{ fontSize: '18px', fontWeight: '600', margin: 0, color: '#fff' }}>pgnox1st AI</h1>
        </div>
        <span style={{ fontSize: '12px', background: '#2f2f30', padding: '4px 10px', borderRadius: '12px', color: '#9aa0a6' }}>v2.5 Live</span>
      </header>

      {/* Main Content */}
      <main style={{ flex: 1, overflowY: 'auto', padding: '24px 16px', maxWidth: '750px', width: '100%', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {chatThreads.map((chat) => (
          <div key={chat.id} style={{ display: 'flex', gap: '16px', flexDirection: chat.sender === 'operator' ? 'row-reverse' : 'row', alignItems: 'start' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: chat.sender === 'operator' ? '#0056b3' : '#a142f4', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '13px', color: '#fff' }}>
              {chat.sender === 'operator' ? 'U' : 'AI'}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', maxWidth: '75%', alignItems: chat.sender === 'operator' ? 'end' : 'start' }}>
              <div style={{ padding: '12px 18px', borderRadius: chat.sender === 'operator' ? '18px 4px 18px 18px' : '4px 18px 18px 18px', background: chat.sender === 'operator' ? '#2b2a33' : '#1e1e20', border: '1px solid #2f2f30' }}>
                {chat.attachedVisualStream && <img src={chat.attachedVisualStream} alt="Attachment" style={{ maxWidth: '100%', borderRadius: '10px', marginBottom: '10px' }} />}
                <div style={{ whiteSpace: 'pre-wrap' }}>{chat.text}</div>
              </div>
              <small style={{ fontSize: '11px', color: '#80868b', marginTop: '6px' }}>{chat.systemTime}</small>
            </div>
          </div>
        ))}
        {isNexusProcessing && <div style={{ color: '#80868b', fontSize: '14px' }}>Thinking...</div>}
        <div ref={chatEndRef} />
      </main>

      {/* Footer */}
      <footer style={{ padding: '16px', background: '#131314', borderTop: '1px solid #2f2f30' }}>
        <div style={{ maxWidth: '750px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', background: '#1e1e20', borderRadius: '28px', padding: '8px 16px', border: '1px solid #2f2f30' }}>
            <label style={{ cursor: 'pointer', fontSize: '18px' }}>📎<input type="file" onChange={handleImageChange} style={{ display: 'none' }} /></label>
            <input type="text" value={messageDraft} onChange={(e) => setMessageDraft(e.target.value)} placeholder="Ask pgnox1st AI..." style={{ flex: 1, background: 'transparent', border: 'none', color: '#fff', outline: 'none' }} onKeyDown={(e) => e.key === 'Enter' && shipTerminalMessage()} />
            <button onClick={shipTerminalMessage} style={{ background: '#1a73e8', color: '#fff', border: 'none', borderRadius: '20px', padding: '8px 18px' }}>Send</button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
            
