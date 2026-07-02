import React from 'react';
import { FaPaperPlane, FaSmile, FaImage } from 'react-icons/fa';

function ChatWindow() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', flex: 1, height: 'calc(100vh - 60px)', backgroundColor: '#f0f2f5' }}>
      {/* Messages Area */}
      <div style={{ flex: 1, padding: '20px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <div style={{ alignSelf: 'flex-start', backgroundColor: '#ffffff', padding: '10px 14px', borderRadius: '18px', maxWidth: '60%', boxShadow: '0 1px 2px rgba(0,0,0,0.1)' }}>
          हेलो! ConnectHub चैट में आपका स्वागत है। 👋
        </div>
        <div style={{ alignSelf: 'flex-end', backgroundColor: '#1877f2', color: '#ffffff', padding: '10px 14px', borderRadius: '18px', maxWidth: '60%' }}>
          अरे वाह! यह तो बिल्कुल असली चैट जैसा दिख रहा है। 🚀
        </div>
      </div>

      {/* Input Message Area */}
      <div style={{ padding: '15px', backgroundColor: '#ffffff', borderTop: '1px solid #e4e6eb', display: 'flex', alignItems: 'center', gap: '12px' }}>
        <FaImage style={{ fontSize: '22px', color: '#45bd62', cursor: 'pointer' }} />
        <FaSmile style={{ fontSize: '22px', color: '#f7b928', cursor: 'pointer' }} />
        <input type="text" placeholder="एक संदेश लिखें..." style={{ flex: 1, padding: '10px 15px', borderRadius: '50px', border: '1px solid #ccd0d5', outline: 'none', backgroundColor: '#f0f2f5' }} />
        <button style={{ border: 'none', backgroundColor: '#1877f2', color: '#fff', padding: '10px 15px', borderRadius: '50px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px', fontWeight: 'bold' }}>
          भेजें <FaPaperPlane style={{ fontSize: '12px' }} />
        </button>
      </div>
    </div>
  );
}

export default ChatWindow;
                   
