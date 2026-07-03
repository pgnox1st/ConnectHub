import React, { useState } from 'react';

const App = () => {
  const [messageDraft, setMessageDraft] = useState('');
  const [bufferedMediaAsset, setBufferedMediaAsset] = useState(null);
  const [chatThreads, setChatThreads] = useState([]);
  const [isNexusProcessing, setIsNexusProcessing] = useState(false);

  const shipTerminalMessage = async () => {
    if (!messageDraft.trim() && !bufferedMediaAsset) return;
    
    const currentHumanClock = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const userText = messageDraft;
    const userImage = bufferedMediaAsset;

    // 1. Instantly render user message on the screen
    setChatThreads(prev => [...prev, {
      id: Date.now(),
      text: userText,
      sender: 'operator',
      systemTime: currentHumanClock,
      attachedVisualStream: userImage
    }]);

    setMessageDraft('');
    setBufferedMediaAsset(null);
    setIsNexusProcessing(true); // Turn on loading state

    try {
      // 2. Send live request to your Backend API (Render Web Service URL)
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

      // 3. Render Gemini AI response on the screen
      setChatThreads(prev => [...prev, {
        id: Date.now() + 1,
        text: data.reply,
        sender: 'nexus',
        systemTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    } catch (err) {
      console.error("Frontend Fetch Error:", err);
    } finaly {
      setIsNexusProcessing(false); // Turn off loading state
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setBufferedMediaAsset(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto', fontFamily: 'sans-serif' }}>
      <h2>ConnectHub AI Chat Terminal</h2>
      
      <div style={{ border: '1px solid #ccc', height: '400px', overflowY: 'scroll', padding: '10px', marginBottom: '10px', background: '#f9f9f9', borderRadius: '8px' }}>
        {chatThreads.map((chat) => (
          <div key={chat.id} style={{ margin: '10px 0', textAlign: chat.sender === 'operator' ? 'right' : 'left' }}>
            <div style={{ display: 'inline-block', padding: '8px 12px', borderRadius: '12px', background: chat.sender === 'operator' ? '#007bff' : '#e2e2e2', color: chat.sender === 'operator' ? '#fff' : '#000', maxWidth: '70%' }}>
              {chat.attachedVisualStream && (
                <img src={chat.attachedVisualStream} alt="Uploaded" style={{ maxWidth: '100%', borderRadius: '8px', marginBottom: '5px' }} />
              )}
              <div>{chat.text}</div>
              <small style={{ display: 'block', fontSize: '10px', marginTop: '4px', textAlign: 'right', color: chat.sender === 'operator' ? '#eee' : '#666' }}>
                {chat.systemTime}
              </small>
            </div>
          </div>
        ))}
        {isNexusProcessing && <div style={{ color: '#666', fontStyle: 'italic' }}>Nexus is processing...</div>}
      </div>

      <div style={{ display: 'flex', gap: '10px', flexDirection: 'column' }}>
        <input type="file" accept="image/*" onChange={handleImageChange} style={{ fontSize: '14px' }} />
        <div style={{ display: 'flex', gap: '5px' }}>
          <input 
            type="text" 
            value={messageDraft} 
            onChange={(e) => setMessageDraft(e.target.value)} 
            placeholder="Type your message..." 
            style={{ flex: 1, padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
            onKeyDown={(e) => e.key === 'Enter' && shipTerminalMessage()}
          />
          <button onClick={shipTerminalMessage} style={{ padding: '10px 20px', background: '#28a745', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
                                                    
