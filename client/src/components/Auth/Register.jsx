import React, { useState } from 'react';

function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Registering:', username, email, password);
    // Future API call logic will go here
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <h2 style={titleStyle}>Create Account</h2>
        <p style={subtitleStyle}>Join ConnectHub today! It's free and easy.</p>
        
        <form onSubmit={handleSubmit} style={formStyle}>
          <div style={inputGroupStyle}>
            <label style={labelStyle}>Username</label>
            <input 
              type="text" 
              placeholder="Choose a username" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={inputStyle} 
              required 
            />
          </div>

          <div style={inputGroupStyle}>
            <label style={labelStyle}>Email Address</label>
            <input 
              type="email" 
              placeholder="Enter your email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={inputStyle} 
              required 
            />
          </div>

          <div style={inputGroupStyle}>
            <label style={labelStyle}>Password</label>
            <input 
              type="password" 
              placeholder="Create a strong password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={inputStyle} 
              required 
            />
          </div>

          <button type="submit" style={buttonStyle}>Sign Up</button>
        </form>

        <p style={footerTextStyle}>
          Already have an account? <span style={linkStyle}>Log in</span>
        </p>
      </div>
    </div>
  );
}

// Reusing same premium theme styles
const containerStyle = { display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', width: '100vw', backgroundColor: '#f0f2f5' };
const cardStyle = { backgroundColor: '#ffffff', padding: '40px', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', width: '100%', maxWidth: '400px', textAlign: 'center' };
const titleStyle = { fontSize: '26px', fontWeight: 'bold', color: '#1877f2', marginBottom: '8px' };
const subtitleStyle = { color: '#65676b', fontSize: '14px', marginBottom: '24px' };
const formStyle = { display: 'flex', flexDirection: 'column', gap: '16px', textAlign: 'left' };
const inputGroupStyle = { display: 'flex', flexDirection: 'column', gap: '6px' };
const labelStyle = { fontSize: '14px', fontWeight: '600', color: '#050505' };
const inputStyle = { padding: '12px', borderRadius: '8px', border: '1px solid #ccd0d5', outline: 'none', fontSize: '15px' };
const buttonStyle = { backgroundColor: '#1877f2', color: '#ffffff', padding: '12px', border: 'none', borderRadius: '8px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer', marginTop: '10px' };
const footerTextStyle = { color: '#65676b', fontSize: '14px', marginTop: '20px' };
const linkStyle = { color: '#1877f2', fontWeight: '600', cursor: 'pointer' };

export default Register;
          
