import React, { useState, useRef, useEffect } from 'react';

const App = () => {
  const [messageDraft, setMessageDraft] = useState('');
  const [bufferedMediaAsset, setBufferedMediaAsset] = useState(null);
  const [chatThreads, setChatThreads] = useState([
    {
      id: 1,
      text: "Welcome back! I am pgnox1st AI v2.5. How can I help you build, design, or solve problems today?",
      sender: 'nexus',
      systemTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [isNexusProcessing, setIsNexusProcessing] = useState(false);
  
  const chatEndRef = useRef(null);
  const textInputRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatThreads, isNexusProcessing]);

  useEffect(() => {
    textInputRef.current?.focus();
  }, []);

  const shipTerminalMessage = async () => {
    if (!messageDraft.trim() && !bufferedMediaAsset) return;
    
    const currentHumanClock = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const userText = messageDraft;
    const userImage = bufferedMediaAsset;

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
      // यहाँ आपका नया बैकएंड URL अपडेट कर दिया गया है
      const networkResponse = await fetch('https://connecthub-backend-ydqo.onrender.com/api/chat', { 
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userText,
          imageBuffer: userImage, 
          mimeType: userImage ? userImage.substring(userImage.indexOf(":") + 1, userImage.indexOf(";")) : null
        })
      });

      if (!networkResponse.ok) {
        throw new Error(`Server returned status: ${networkResponse.status}`);
      }

      const jsonOutput = await networkResponse.json();

      setChatThreads(prev => [...prev, {
        id: Date.now() + 1,
        text: jsonOutput.reply,
        sender: 'nexus',
        systemTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);

    } catch (networkError) {
      console.error("Terminal Pipeline Error:", networkError);
      setChatThreads(prev => [...prev, {
        id: Date.now() + 1,
        text: "Pipeline Disconnect: Failed to connect to pgnox1st backend server.",
        sender: 'nexus',
        systemTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    } finally {
      setIsNexusProcessing(false);
      setTimeout(() => textInputRef.current?.focus(), 50);
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
    <div style={{ background: '#0e0e10', color: '#f3f4f6', minHeight: '100vh', display: 'flex', flexDirection: 'column', fontFamily: '"Inter", sans-serif' }}>
      <header style={{ padding: '16px 32px', borderBottom: '1px solid #232329', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#16161a' }}>
        <h1 style={{ fontSize: '19px', fontWeight: '700', margin: 0 }}>pgnox1st AI</h1>
        <span style={{ fontSize: '11px', background: '#24242b', padding: '5px 12px', borderRadius: '20px', color: '#9ca3af' }}>v2.5 Live</span>
      </header>

      <main style={{ flex: 1, overflowY: 'auto', padding: '32px 20px', maxWidth: '800px', width: '100%', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '28px' }}>
        {chatThreads.map((chat) => (
          <div key={chat.id} style={{ display: 'flex', gap: '18px', flexDirection: chat.sender === 'operator' ? 'row-reverse' : 'row', alignItems: 'start' }}>
            <div style={{ width: '38px', height: '38px', borderRadius: '50%', background: chat.sender === 'operator' ? '#2563eb' : '#7c3aed', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700', fontSize: '12px' }}>
              {chat.sender === 'operator' ? 'USER' : 'AI'}
            </div>
            <div style={{ padding: '14px 20px', borderRadius: '20px', background: chat.sender === 'operator' ? '#1f1f24' : '#16161a', border: '1px solid #2d2d35' }}>
              {chat.attachedVisualStream && <img src={chat.attachedVisualStream} style={{ maxWidth: '100%', maxHeight: '250px', borderRadius: '12px', marginBottom: '12px' }} />}
              <div style={{ whiteSpace: 'pre-wrap' }}>{chat.text}</div>
            </div>
          </div>
        ))}
        {isNexusProcessing && <div style={{ color: '#9ca3af' }}>Thinking...</div>}
        <div ref={chatEndRef} />
      </main>

      <footer style={{ padding: '20px', background: '#0e0e10', borderTop: '1px solid #1f1f24' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', gap: '10px', alignItems: 'center' }}>
          <label style={{ cursor: 'pointer', padding: '10px', background: '#222227', borderRadius: '50%' }}>📎<input type="file" onChange={handleImageChange} style={{ display: 'none' }} /></label>
          <input 
            type="text" 
            ref={textInputRef}
            value={messageDraft} 
            onChange={(e) => setMessageDraft(e.target.value)} 
            placeholder="Ask pgnox1st AI anything..." 
            style={{ flex: 1, padding: '12px', background: '#16161a', border: '1px solid #24242b', color: '#fff', borderRadius: '20px' }}
            onKeyDown={(e) => e.key === 'Enter' && shipTerminalMessage()}
          />
          <button onClick={shipTerminalMessage} style={{ padding: '10px 20px', background: '#2563eb', color: '#fff', border: 'none', borderRadius: '20px' }}>Send</button>
        </div>
      </footer>
    </div>
  );
};

export default App;
        
