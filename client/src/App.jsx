const shipTerminalMessage = async () => {
  if (!messageDraft.trim() && !bufferedMediaAsset) return;
  
  const currentHumanClock = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const userText = messageDraft;
  const userImage = bufferedMediaAsset;

  // 1. तुरंत यूजर का संदेश स्क्रीन पर रेंडर करें
  setChatThreads(prev => [...prev, {
    id: Date.now(),
    text: userText,
    sender: 'operator',
    systemTime: currentHumanClock,
    attachedVisualStream: userImage
  }]);

  setMessageDraft('');
  setBufferedMediaAsset(null);
  setIsNexusProcessing(true); // लोडिंग स्टेट चालू

  try {
    // 2. अपने बैकएंड API को लाइव रिक्वेस्ट भेजना
    const response = await fetch('/api/chat', { 
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: userText,
        imageBuffer: userImage, 
        mimeType: userImage ? userImage.substring(userImage.indexOf(":")+1, userImage.indexOf(";")) : null
      })
    });

    const data = await response.json();

    // 3. जेमिनी AI का असली जवाब स्क्रीन पर दिखाना
    setChatThreads(prev => [...prev, {
      id: Date.now() + 1,
      text: data.reply,
      sender: 'nexus',
      systemTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }]);
  } catch (err) {
    console.error("Frontend Fetch Error:", err);
  } finally {
    setIsNexusProcessing(false); // लोडिंग बंद
  }
};
