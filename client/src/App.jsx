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

  // Keep the viewport locked to the latest messages smoothly
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatThreads, isNexusProcessing]);

  // Focus on the input bar on initial terminal boot
  useEffect(() => {
    textInputRef.current?.focus();
  }, []);

  const shipTerminalMessage = async () => {
    if (!messageDraft.trim() && !bufferedMediaAsset) return;
    
    const currentHumanClock = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const userText = messageDraft;
    const userImage = bufferedMediaAsset;

    // Immediately map the user's action thread to the UI console layout
    setChatThreads(prev => [...prev, {
      id: Date.now(),
      text: userText,
      sender: 'operator',
      systemTime: currentHumanClock,
      attachedVisualStream: userImage
    }]);

    // Reset input fields instantly for rapid multi-turn typing workflows
    setMessageDraft('');
    setBufferedMediaAsset(null);
    setIsNexusProcessing(true);

    try {
      // Direct live network dispatch to Render backend instance gateway
      const networkResponse = await fetch('https://connecthub-ai.onrender.com/api/chat', { 
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userText,
          imageBuffer: userImage, 
          mimeType: userImage ? userImage.substring(userImage.indexOf(":") + 1, userImage.indexOf(";")) : null
        })
      });

      if (!networkResponse.ok) {
        throw new Error(`Server returned HTTP bad code status: ${networkResponse.status}`);
      }

      const jsonOutput = await networkResponse.json();

      // Commit the verified AI response token to display streams
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
        text: "Pipeline Disconnect: Failed to gather data from pgnox1st server. Please verify your Render API logs.",
        sender: 'nexus',
        systemTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    } finally {
      setIsNexusProcessing(false);
      // Re-focus back onto input console for next query cycle
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
    <div style={{ background: '#0e0e10', color: '#f3f4f6', minHeight: '100vh', display: 'flex', flexDirection: 'column', fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif' }}>
      
      {/* Premium Navigation Header Dashboard */}
      <header style={{ padding: '16px 32px', borderBottom: '1px solid #232329', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#16161a', sticky: 'top', zIndex: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#10b981', boxShadow: '0 0 12px #10b981' }}></div>
          <h1 style={{ fontSize: '19px', fontWeight: '700', margin: 0, color: '#ffffff', letterSpacing: '-0.3px' }}>pgnox1st AI</h1>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '11px', background: '#24242b', padding: '5px 12px', borderRadius: '20px', color: '#9ca3af', fontWeight: '600', border: '1px solid #2e2e38' }}>v2.5 Live</span>
        </div>
      </header>

      {/* Main Stream Messaging Layout Container */}
      <main style={{ flex: 1, overflowY: 'auto', padding: '32px 20px', maxWidth: '800px', width: '100%', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '28px' }}>
        {chatThreads.map((chat) => (
          <div key={chat.id} style={{ display: 'flex', gap: '18px', flexDirection: chat.sender === 'operator' ? 'row-reverse' : 'row', alignItems: 'start' }}>
            
            {/* Round Identity Badge Avatars */}
            <div style={{ 
              width: '38px', 
              height: '38px', 
              borderRadius: '50%', 
              background: chat.sender === 'operator' ? 'linear-gradient(135deg, #2563eb, #1d4ed8)' : 'linear-gradient(135deg, #7c3aed, #6d28d9)', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              fontWeight: '700',
              fontSize: '12px',
              color: '#ffffff',
              flexShrink: 0,
              boxShadow: '0 4px 10px rgba(0,0,0,0.3)'
            }}>
              {chat.sender === 'operator' ? 'USER' : 'AI'}
            </div>

            {/* Bubble Formatting Block */}
            <div style={{ display: 'flex', flexDirection: 'column', maxWidth: '78%', alignItems: chat.sender === 'operator' ? 'end' : 'start' }}>
              <div style={{ 
                padding: '14px 20px', 
                borderRadius: chat.sender === 'operator' ? '20px 4px 20px 20px' : '4px 20px 20px 20px', 
                background: chat.sender === 'operator' ? '#1f1f24' : '#16161a', 
                color: '#e5e7eb',
                fontSize: '15.5px',
                lineHeight: '1.65',
                border: chat.sender === 'operator' ? '1px solid #2d2d35' : '1px solid #222227',
                wordBreak: 'break-word',
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
              }}>
                {chat.attachedVisualStream && (
                  <img src={chat.attachedVisualStream} alt="User media content pipeline" style={{ maxWidth: '100%', maxHeight: '250px', borderRadius: '12px', marginBottom: '12px', display: 'block', border: '1px solid #3f3f46' }} />
                )}
                <div style={{ whiteSpace: 'pre-wrap' }}>{chat.text}</div>
              </div>
              <small style={{ fontSize: '11px', color: '#6b7280', marginTop: '6px', padding: '0 6px', fontWeight: '500' }}>{chat.systemTime}</small>
            </div>

          </div>
        ))}

        {/* Enhanced Smooth CSS Infinite Processing Loader Animation */}
        {isNexusProcessing && (
          <div style={{ display: 'flex', gap: '18px', alignItems: 'center', paddingLeft: '2px' }}>
            <div style={{ width: '38px', height: '38px', borderRadius: '50%', background: 'linear-gradient(135deg, #7c3aed, #6d28d9)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700', fontSize: '12px', color: '#fff' }}>AI</div>
            <div style={{ color: '#9ca3af', fontSize: '14.5px', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: '500' }}>
              <span>Thinking</span>
              <span style={{ display: 'inline-flex', letterSpacing: '2px' }}>...</span>
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </main>

      {/* Modern Docked Floating Cockpit Footer Panel */}
      <footer style={{ padding: '20px', background: '#0e0e10', borderTop: '1px solid #1f1f24' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', width: '100%', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          
          {/* Dynamic Image Micro Preview Thumbnail */}
          {bufferedMediaAsset && (
            <div style={{ position: 'relative', display: 'inline-block', alignSelf: 'start', padding: '5px', background: '#16161a', borderRadius: '10px', border: '1px solid #2e2e38', boxShadow: '0 4px 10px rgba(0,0,0,0.4)' }}>
              <img src={bufferedMediaAsset} alt="Asset media attach track" style={{ width: '65px', height: '65px', objectFit: 'cover', borderRadius: '6px' }} />
              <button onClick={() => setBufferedMediaAsset(null)} style={{ position: 'absolute', top: '-8px', right: '-8px', background: '#ef4444', color: '#ffffff', border: 'none', borderRadius: '50%', width: '20px', height: '20px', fontSize: '12px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>×</button>
            </div>
          )}

          {/* Console Command Dock Grid */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', background: '#16161a', borderRadius: '32px', padding: '8px 20px', border: '1px solid #24242b', boxShadow: '0 8px 24px rgba(0,0,0,0.3)' }}>
            
            {/* Attachment System Input Label Icon */}
            <label style={{ cursor: 'pointer', padding: '8px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#222227', color: '#f3f4f6', width: '38px', height: '38px', border: '1px solid #2e2e38' }}>
              <span style={{ fontSize: '18px' }}>📎</span>
              <input type="file" accept="image/*" onChange={handleImageChange} style={{ display: 'none' }} />
            </label>

            {/* Input Form Terminal */}
            <input 
              type="text" 
              ref={textInputRef}
              value={messageDraft} 
              onChange={(e) => setMessageDraft(e.target.value)} 
              placeholder="Ask pgnox1st AI anything..." 
              style={{ flex: 1, padding: '10px 2px', background: 'transparent', border: 'none', color: '#ffffff', fontSize: '15.5px', outline: 'none' }}
              onKeyDown={(e) => e.key === 'Enter' && shipTerminalMessage()}
            />

            {/* Jet Engine Dispatch Control Button Trigger */}
            <button onClick={shipTerminalMessage} style={{ padding: '10px 22px', background: '#2563eb', color: '#ffffff', border: 'none', borderRadius: '24px', cursor: 'pointer', fontWeight: '600', fontSize: '14.5px', display: 'flex', alignItems: 'center', gap: '8px', boxShadow: '0 4px 14px rgba(37,99,235,0.4)', transition: 'transform 0.1s' }}>
              <span>Send</span>
              <span>🚀</span>
            </button>

          </div>
          <p style={{ fontSize: '11px', color: '#4b5563', textAlign: 'center', margin: '4px 0 0 0', fontWeight: '500' }}>pgnox1st AI can make mistakes. Consider checking important source information.</p>
        </div>
      </footer>

    </div>
  );
};

export default App;
                    
