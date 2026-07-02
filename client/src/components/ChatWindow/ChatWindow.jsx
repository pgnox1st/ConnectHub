import React from 'react';
import { FaPhoneAlt, FaVideo, FaInfoCircle, FaPlus, FaSmile, FaMicrophone, FaPlay, FaCheckDouble } from 'react-icons/fa';

function ChatWindow() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', flex: 1, height: '100vh', backgroundColor: '#fafafb' }}>
      
      {/* 1. Top Chat Header Bar */}
      <div style={{
        height: '70px',
        backgroundColor: '#ffffff',
        borderBottom: '1px solid #f0f2f5',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 24px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {/* Active User Avatar */}
          <div style={{ position: 'relative' }}>
            <div style={{ width: '42px', height: '42px', borderRadius: '50%', backgroundColor: '#7b57ff', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
              E
            </div>
            <div style={{ position: 'absolute', bottom: '0', right: '0', width: '10px', height: '10px', backgroundColor: '#45bd62', borderRadius: '50%', border: '2px solid #fff' }} />
          </div>
          <div>
            <h4 style={{ margin: 0, fontSize: '15px', fontWeight: '600', color: '#1c1e21' }}>Emily Johnson</h4>
            <span style={{ fontSize: '12px', color: '#45bd62', fontWeight: '500' }}>Online</span>
          </div>
        </div>

        {/* Call and Info Action Icons */}
        <div style={{ display: 'flex', gap: '20px', color: '#65676b', fontSize: '18px' }}>
          <FaPhoneAlt style={{ cursor: 'pointer' }} title="Voice Call" />
          <FaVideo style={{ cursor: 'pointer' }} title="Video Call" />
          <FaInfoCircle style={{ cursor: 'pointer' }} title="Conversation Info" />
        </div>
      </div>

      {/* 2. Chat Messages Area (Screenshot Matched Color Themes) */}
      <div style={{ flex: 1, padding: '24px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        
        {/* Left Side Incoming Message */}
        <div style={{ alignSelf: 'flex-start', maxWidth: '60%' }}>
          <div style={{ backgroundColor: '#f0f2f5', color: '#1c1e21', padding: '12px 16px', borderRadius: '18px 18px 18px 4px', fontSize: '14px', lineHeight: '1.4' }}>
            Hey there! 👋
          </div>
          <span style={{ fontSize: '11px', color: '#8e9297', display: 'block', marginTop: '4px', marginLeft: '4px' }}>02:10 PM</span>
        </div>

        {/* Right Side Outgoing Message (Premium Purple Theme) */}
        <div style={{ alignSelf: 'flex-end', maxWidth: '60%', display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
          <div style={{ backgroundColor: '#7b57ff', color: '#ffffff', padding: '12px 16px', borderRadius: '18px 18px 4px 18px', fontSize: '14px', lineHeight: '1.4' }}>
            Hi Emily! How are you doing?
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '4px', marginRight: '4px' }}>
            <span style={{ fontSize: '11px', color: '#8e9297' }}>02:11 PM</span>
            <FaCheckDouble style={{ fontSize: '12px', color: '#7b57ff' }} />
          </div>
        </div>

        {/* Left Side Incoming Message */}
        <div style={{ alignSelf: 'flex-start', maxWidth: '60%' }}>
          <div style={{ backgroundColor: '#f0f2f5', color: '#1c1e21', padding: '12px 16px', borderRadius: '18px 18px 18px 4px', fontSize: '14px', lineHeight: '1.4' }}>
            I'm good, thanks! You?
          </div>
          <span style={{ fontSize: '11px', color: '#8e9297', display: 'block', marginTop: '4px', marginLeft: '4px' }}>02:11 PM</span>
        </div>

        {/* Right Side Outgoing Message */}
        <div style={{ alignSelf: 'flex-end', maxWidth: '60%', display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
          <div style={{ backgroundColor: '#7b57ff', color: '#ffffff', padding: '12px 16px', borderRadius: '18px 18px 4px 18px', fontSize: '14px', lineHeight: '1.4' }}>
            Doing great! What's up?
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '4px', marginRight: '4px' }}>
            <span style={{ fontSize: '11px', color: '#8e9297' }}>02:12 PM</span>
            <FaCheckDouble style={{ fontSize: '12px', color: '#7b57ff' }} />
          </div>
        </div>

        {/* Incoming Voice Message Track Placeholder (Looking like screenshot) */}
        <div style={{ alignSelf: 'flex-start', maxWidth: '60%' }}>
          <div style={{ 
            backgroundColor: '#f0f2f5', 
            padding: '10px 16px', 
            borderRadius: '18px 18px 18px 4px', 
            display: 'flex', 
            alignItems: 'center', 
            gap: '12px',
            width: '240px'
          }}>
            <button style={{ border: 'none', backgroundColor: '#7b57ff', color: '#fff', width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifycontent: 'center', cursor: 'pointer', paddingLeft: '3px' }}>
              <FaPlay style={{ fontSize: '12px' }} />
            </button>
            {/* Fake wave track bar lines */}
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '2px', height: '20px' }}>
              {[6, 14, 10, 18, 12, 8, 16, 10, 14, 6, 12, 18, 10, 14, 8, 16, 6, 10, 12].map((h, i) => (
                <div key={i} style={{ width: '2px', height: `${h}px`, backgroundColor: i < 8 ? '#7b57ff' : '#ccd0d5', borderRadius: '1px' }} />
              ))}
            </div>
            <span style={{ fontSize: '11px', color: '#65676b', whiteSpace: 'nowrap' }}>00:12</span>
          </div>
          <span style={{ fontSize: '11px', color: '#8e9297', display: 'block', marginTop: '4px', marginLeft: '4px' }}>02:12 PM</span>
        </div>

        {/* Emily is typing... indicator status */}
        <div style={{ alignSelf: 'flex-start', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: '#45bd62', fontWeight: '500', marginLeft: '4px' }}>
          <span style={{ display: 'inline-block', width: '6px', height: '6px', backgroundColor: '#45bd62', borderRadius: '50%' }}></span>
          Emily is typing...
        </div>

      </div>

      {/* 3. Bottom Message Input Bar */}
      <div style={{
        padding: '16px 24px',
        backgroundColor: '#ffffff',
        borderTop: '1px solid #f0f2f5',
        display: 'flex',
        alignItems: 'center',
        gap: '16px'
      }}>
        {/* Plus attachment button */}
        <button style={{ border: 'none', backgroundColor: '#7b57ff', color: '#ffffff', width: '36px', height: '36px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontSize: '14px' }}>
          <FaPlus />
        </button>

        {/* Input box wrapping area */}
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', backgroundColor: '#f0f2f5', padding: '10px 18px', borderRadius: '24px' }}>
          <input 
            type="text" 
            placeholder="Type a message..." 
            style={{ flex: 1, border: 'none', backgroundColor: 'transparent', outline: 'none', fontSize: '14px', color: '#1c1e21' }} 
          />
          <div style={{ display: 'flex', gap: '14px', color: '#65676b', fontSize: '18px', cursor: 'pointer' }}>
            <FaSmile title="Insert Emoji" />
            <FaMicrophone title="Record Voice Message" />
          </div>
        </div>
      </div>

    </div>
  );
}

export default ChatWindow;
          
