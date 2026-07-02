import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signIn } from '../../services/api.js';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // API call to backend
      const { data } = await signIn({ email, password });
      
      // Save user profile and token in browser storage
      localStorage.setItem('profile', JSON.stringify(data));
      
      setLoading(false);
      navigate('/'); // Redirect to full chat screen
      window.location.reload(); // Refresh to update auth state
    } catch (err) {
      setLoading(false);
      setError(err.response?.data?.message || 'Something went wrong. Please try again.');
    }
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <h2 style={titleStyle}>Login to ConnectHub</h2>
        <p style={subtitleStyle}>Welcome back! Please enter your details.</p>
        
        {error && <div style={errorStyle}>{error}</div>}

        <form onSubmit={handleSubmit} style={formStyle}>
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
              placeholder="Enter your password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={inputStyle} 
              required 
            />
          </div>

          <button type="submit" style={buttonStyle} disabled={loading}>
            {loading ? 'Logging in...' : 'Sign In'}
          </button>
        </form>

        <p style={footerTextStyle}>
          Don't have an account? <span onClick={() => navigate('/register')} style={linkStyle}>Sign up for free</span>
        </p>
      </div>
    </div>
  );
}

const containerStyle = { display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', width: '100vw', backgroundColor: '#f0f2f5' };
const cardStyle = { backgroundColor: '#ffffff', padding: '40px', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', width: '100%', maxWidth: '400px', textAlign: 'center' };
const titleStyle = { fontSize: '26px', fontWeight: 'bold', color: '#7b57ff', marginBottom: '8px' };
const subtitleStyle = { color: '#65676b', fontSize: '14px', marginBottom: '24px' };
const errorStyle = { backgroundColor: '#ffebe9', color: '#f02849', padding: '10px', borderRadius: '8px', fontSize: '14px', marginBottom: '16px', fontWeight: '600', textAlign: 'left' };
const formStyle = { display: 'flex', flexDirection: 'column', gap: '16px', textAlign: 'left' };
const inputGroupStyle = { display: 'flex', flexDirection: 'column', gap: '6px' };
const labelStyle = { fontSize: '14px', fontWeight: '600', color: '#050505' };
const inputStyle = { padding: '12px', borderRadius: '8px', border: '1px solid #ccd0d5', outline: 'none', fontSize: '15px' };
const buttonStyle = { backgroundColor: '#7b57ff', color: '#ffffff', padding: '12px', border: 'none', borderRadius: '8px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer', marginTop: '10px' };
const footerTextStyle = { color: '#65676b', fontSize: '14px', marginTop: '20px' };
const linkStyle = { color: '#7b57ff', fontWeight: '600', cursor: 'pointer' };

export default Login;
                    
