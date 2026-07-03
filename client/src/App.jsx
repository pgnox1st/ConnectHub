import React, { useState, useRef, useEffect } from 'react';

const App = () => {
  const [messageDraft, setMessageDraft] = useState('');
  const [isNexusProcessing, setIsNexusProcessing] = useState(false);
  const [chatThreads, setChatThreads] = useState([
    {
      id: 1,
      text: "Welcome back! I am pgnox1st AI v2.5. How can I help you build, design, or solve problems today?",
      sender: 'nexus',
      systemTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  
  const chatEndRef = useRef(null);
  const textInputRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatThreads, isNexusProcessing]);

  useEffect(() => {
    textInputRef.current?.focus();
  }, []);

  const shipTerminalMessage = async () => {
    if (!messageDraft.trim()) return;
    
    const currentHumanClock = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const userText = messageDraft;

    setChatThreads(prev => [...prev, {
      id: Date.now(),
      text: userText,
      sender: 'operator',
      systemTime: currentHumanClock
    }]);

    setMessageDraft('');
    setIsNexusProcessing(true);

    try {
      // Connecting to your live Render backend
      const networkResponse = await fetch('https://connecthub-live-isjm.onrender.com/api/chat', { 
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userText })
      });

      const jsonOutput = await networkResponse.json();

      setChatThreads(prev => [...prev, {
        id: Date.now() + 1,
        text: jsonOutput.reply,
        sender: 'nexus',
        systemTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);

    } catch (networkError) {
      console.error("Pipeline Error:", networkError);
      setChatThreads(prev => [...prev, {
        id: Date.now() + 1,
        text: "Pipeline Disconnect: Failed to connect to the server.",
        sender: 'nexus',
        systemTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    } finally {
      setIsNexusProcessing(false);
      setTimeout(() => textInputRef.current?.focus(), 50);
    }
  };

  return (
    <div style={{ background: '#0e0e10', color: '#f3f4f6', minHeight: '100vh', display: 'flex', flexDirection: 'column', fontFamily: 'sans-serif' }}>
      <header style={{ padding: '16px 32px', borderBottom: '1px solid #232329', background: '#16161a' }}>
        <h1 style={{ fontSize: '19px', margin: 0 }}>pgnox1st AI v2.5</h1>
      </header>
      
      <main style={{ flex: 1, overflowY: 'auto', padding: '32px 20px', maxWidth: '800px', margin: '0 auto', width: '100%' }}>
        {chatThreads.map((chat) => (
          <div key={chat.id} style={{ marginBottom: '20px', textAlign: chat.sender === 'operator' ? 'right' : 'left' }}>
            <div style={{ padding: '10px 15px', background: chat.sender === 'operator' ? '#2563eb' : '#1f1f24', display: 'inline-block', borderRadius: '10px' }}>
              {chat.text}
            </div>
          </div>
        ))}
        {isNexusProcessing && <div>Thinking...</div>}
        <div ref={chatEndRef} />
      </main>

      <footer style={{ padding: '20px', background: '#0e0e10', borderTop: '1px solid #1f1f24' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', gap: '10px' }}>
          <input 
            type="text" 
            ref={textInputRef}
            value={messageDraft} 
            onChange={(e) => setMessageDraft(e.target.value)} 
            placeholder="Ask AI..." 
            style={{ flex: 1, padding: '10px', borderRadius: '5px', border: 'none' }}
            onKeyDown={(e) => e.key === 'Enter' && shipTerminalMessage()}
          />
          <button onClick={shipTerminalMessage} style={{ padding: '10px 20px', background: '#2563eb', color: '#fff', border: 'none', borderRadius: '5px' }}>
            Send
          </button>
        </div>
      </footer>
    </div>
  );
};

export default App;
                              
