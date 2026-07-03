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

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatThreads, isNexusProcessing]);

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
      // Points directly to your Render backend web service
      const response = await fetch('https://connecthub-ai.onrender.com/api/chat', { 
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userText,
          imageBuffer: userImage, 
          mimeType: userImage ? userImage.substring(userImage.indexOf(":")+1, userImage.indexOf(";")) : null
        })
      });

      const data = await response.json();

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
        text: "Sorry, I am facing connection trouble. Please ensure your backend web service is active.",
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
      
      {/* Premium Header */}
      <header style={{ padding: '16px 24px', borderBottom: '1px solid #2f2f30', display: 'flex', alignItems: 'center', justifyContent: 'between', background: '#1e1e20' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#4285f4' }}></div>
          <h1 style={{ fontSize: '18px', fontWeight: '600', margin: 0, color: '#fff' }}>pgnox1st AI</h1>
        </div>
        <span style={{ fontSize: '12px', background: '#2f2f30', padding: '4px 8px', borderRadius: '12px', color: '#9aa0a6' }}>v2.0 Pro</span>
      </header>

      {/* Chat Space */}
      <main style={{ flex: 1, overflowY: 'auto', padding: '20px 16px', maxWidth: '800px', width: '100%', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {chatThreads.map((chat) => (
          <div key={chat.id} style={{ display: 'flex', gap: '16px', flexDirection: chat.sender === 'operator' ? 'row-reverse' : 'row', alignItems: 'start' }}>
            
            {/* Avatar Icons */}
            <div style={{ 
              width: '36px', 
              height: '36px', 
              borderRadius: '50%', 
              background: chat.sender === 'operator' ? '#0056b3' : '#a142f4', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              fontWeight: 'bold',
              fontSize: '14px',
              color: '#fff',
              flexShrink: 0
            }}>
              {chat.sender === 'operator' ? 'U' : 'AI'}
            </div>

            {/* Bubble Layout */}
            <div style={{ display: 'flex', flexDirection: 'column', maxWidth: '75%', alignItems: chat.sender === 'operator' ? 'end' : 'start' }}>
              <div style={{ 
                padding: '12px 16px', 
                borderRadius: '18px', 
                background: chat.sender === 'operator' ? '#2b2a33' : '#1e1e20', 
                color: '#e3e3e3',
                fontSize: '15px',
                lineHeight: '1.5',
                border: chat.sender === 'operator' ? '1px solid #3c3b43' : '1px solid #2f2f30',
                wordBreak: 'break-word'
              }}>
                {chat.attachedVisualStream && (
                  <img src={chat.attachedVisualStream} alt="Uploaded attachment" style={{ maxWidth: '100%', maxHeight: '200px', borderRadius: '12px', marginBottom: '8px', display: 'block' }} />
                )}
                <div style={{ whiteSpace: 'pre-wrap' }}>{chat.text}</div>
              </div>
              <small style={{ fontSize: '11px', color: '#80868b', marginTop: '4px', padding: '0 4px' }}>{chat.systemTime}</small>
            </div>

          </div>
        ))}

        {/* Typing Loading Placeholder */}
        {isNexusProcessing && (
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#a142f4', display: 'flex', alignItems: 'center', justify: 'center', fontWeight: 'bold', fontSize: '14px', color: '#fff' }}>AI</div>
            <div style={{ color: '#80868b', fontSize: '14px', fontStyle: 'italic', display: 'flex', alignItems: 'center', gap: '5px' }}>
              <span>Thinking</span>
              <span style={{ animation: 'blink 1.4s infinite both' }}>...</span>
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </main>

      {/* Modern Fixed Footer Dock */}
      <footer style={{ padding: '16px', background: '#131314', borderTop: '1px solid #2f2f30' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', width: '100%', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          
          {/* Preview Image Thumb */}
          {bufferedMediaAsset && (
            <div style={{ position: 'relative', display: 'inline-block', alignSelf: 'start', padding: '4px', background: '#1e1e20', borderRadius: '8px', border: '1px solid #2f2f30' }}>
              <img src={bufferedMediaAsset} alt="Preview" style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '6px' }} />
              <button onClick={() => setBufferedMediaAsset(null)} style={{ position: 'absolute', top: '-6px', right: '-6px', background: '#ea4335', color: '#fff', border: 'none', borderRadius: '50%', width: '18px', height: '18px', fontSize: '12px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>×</button>
            </div>
          )}

          {/* Controls Deck */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', background: '#1e1e20', borderRadius: '28px', padding: '6px 12px', border: '1px solid #2f2f30' }}>
            
            {/* Attachment Pin Icon */}
            <label style={{ cursor: 'pointer', padding: '8px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#2f2f30', color: '#fff' }}>
              <span style={{ fontSize: '18px' }}>📎</span>
              <input type="file" accept="image/*" onChange={handleImageChange} style={{ display: 'none' }} />
            </label>

            {/* Core Text Input */}
            <input 
              type="text" 
              value={messageDraft} 
              onChange={(e) => setMessageDraft(e.target.value)} 
              placeholder="Ask pgnox1st AI anything..." 
              style={{ flex: 1, padding: '10px 4px', background: 'transparent', border: 'none', color: '#fff', fontSize: '15px', outline: 'none' }}
              onKeyDown={(e) => e.key === 'Enter' && shipTerminalMessage()}
            />

            {/* Send Paper Rocket Button */}
            <button onClick={shipTerminalMessage} style={{ padding: '10px 18px', background: '#1a73e8', color: '#fff', border: 'none', borderRadius: '20px', cursor: 'pointer', fontWeight: '600', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '5px' }}>
              <span>Send</span>
              <span>🚀</span>
            </button>

          </div>
          <p style={{ fontSize: '11px', color: '#606468', textAlign: 'center', margin: '4px 0 0 0' }}>pgnox1st AI can make mistakes. Verify important info.</p>
        </div>
      </footer>

    </div>
  );
};

export default App;
            
