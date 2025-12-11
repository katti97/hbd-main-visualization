import React, { useState } from 'react';
import { LogIn, Loader2, AlertCircle } from 'lucide-react';
import logo from "./logo.png";

const API_BASE_URL = "https://e150d73573530.notebooks.jarvislabs.net/proxy/8000";

const colors = {
  primary: 'rgb(150, 133, 117)',
  primaryHover: 'rgb(100, 89, 78)',
  background: 'rgb(255, 255, 255)',
  backgroundSecondary: 'rgb(244, 235, 226)',
  text: 'rgb(0, 0, 0)',
  textSecondary: 'rgb(51, 51, 51)',
  border: 'rgb(200, 178, 156)',
  borderLight: 'rgb(244, 235, 226)',
};

const HummingBirdLogo = () => {
  return (
    <img
      src={logo}
      alt="HummingBird Logo"
      style={{ width: "150px", height: "100px", objectFit: "contain" }}
    />
  );
};

export default function Login({ onLoginSuccess }) {
  const [clientId, setClientId] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!clientId.trim() || !password.trim()) {
      setError('Please enter both Client ID and Password');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          client_id: clientId.trim(),
          password: password.trim(),
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        // Store token in sessionStorage
        sessionStorage.setItem('auth_token', data.token);
        sessionStorage.setItem('client_id', data.client_id);
        
        // Call parent callback
        onLoginSuccess(data.token, data.client_id);
      } else {
        setError(data.message || 'Invalid credentials. Please try again.');
      }
    } catch (err) {
      setError('Unable to connect to server. Please try again.');
      console.error('Login error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f5f5f5 0%, #e8e8e8 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: '"Cormorant Garamond", "Playfair Display", serif',
      padding: '2rem'
    }}>
      <link
        href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600&display=swap"
        rel="stylesheet"
      />

      <div style={{
        background: colors.background,
        borderRadius: '16px',
        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15)',
        padding: '3rem',
        width: '100%',
        maxWidth: '450px',
        border: `1px solid ${colors.borderLight}`
      }}>
        {/* Logo and Title */}
        <div style={{
          textAlign: 'center',
          marginBottom: '2.5rem'
        }}>
          <HummingBirdLogo />
          <h1 style={{
            fontSize: '2rem',
            fontWeight: '600',
            color: colors.text,
            margin: '1rem 0 0.5rem',
            letterSpacing: '-0.01em'
          }}>
            HUMMINGBIRD
          </h1>
          <p style={{
            fontSize: '0.875rem',
            color: colors.textSecondary,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            margin: 0
          }}>
            Analytics Portal
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{
              display: 'block',
              fontSize: '0.875rem',
              fontWeight: '600',
              color: colors.text,
              marginBottom: '0.5rem',
              fontFamily: 'Inter, sans-serif',
              textTransform: 'uppercase',
              letterSpacing: '0.05em'
            }}>
              Client ID
            </label>
            <input
              type="text"
              value={clientId}
              onChange={(e) => {
                setClientId(e.target.value);
                setError('');
              }}
              placeholder="Enter your Client ID"
              disabled={isLoading}
              style={{
                width: '100%',
                padding: '0.875rem 1rem',
                fontSize: '1rem',
                border: `1px solid ${colors.borderLight}`,
                borderRadius: '8px',
                outline: 'none',
                transition: 'all 0.2s',
                background: colors.background,
                boxSizing: 'border-box',
                fontFamily: 'Inter, sans-serif'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = colors.primary;
                e.target.style.boxShadow = `0 0 0 3px ${colors.primary}15`;
              }}
              onBlur={(e) => {
                e.target.style.borderColor = colors.borderLight;
                e.target.style.boxShadow = 'none';
              }}
            />
          </div>

          <div style={{ marginBottom: '2rem' }}>
            <label style={{
              display: 'block',
              fontSize: '0.875rem',
              fontWeight: '600',
              color: colors.text,
              marginBottom: '0.5rem',
              fontFamily: 'Inter, sans-serif',
              textTransform: 'uppercase',
              letterSpacing: '0.05em'
            }}>
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError('');
              }}
              placeholder="Enter your password"
              disabled={isLoading}
              style={{
                width: '100%',
                padding: '0.875rem 1rem',
                fontSize: '1rem',
                border: `1px solid ${colors.borderLight}`,
                borderRadius: '8px',
                outline: 'none',
                transition: 'all 0.2s',
                background: colors.background,
                boxSizing: 'border-box',
                fontFamily: 'Inter, sans-serif'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = colors.primary;
                e.target.style.boxShadow = `0 0 0 3px ${colors.primary}15`;
              }}
              onBlur={(e) => {
                e.target.style.borderColor = colors.borderLight;
                e.target.style.boxShadow = 'none';
              }}
            />
          </div>

          {/* Error Message */}
          {error && (
            <div style={{
              background: '#FFF5F5',
              border: '1px solid #FFCDD2',
              borderRadius: '8px',
              padding: '1rem',
              marginBottom: '1.5rem',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '0.75rem'
            }}>
              <AlertCircle size={20} color="#C62828" style={{ flexShrink: 0, marginTop: '2px' }} />
              <p style={{
                fontSize: '0.875rem',
                color: '#C62828',
                margin: 0,
                lineHeight: '1.5',
                fontFamily: 'Inter, sans-serif'
              }}>
                {error}
              </p>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            style={{
              width: '100%',
              padding: '1rem',
              background: colors.primary,
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '1rem',
              fontWeight: '600',
              cursor: isLoading ? 'not-allowed' : 'pointer',
              opacity: isLoading ? 0.7 : 1,
              transition: 'all 0.2s',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              fontFamily: 'Inter, sans-serif',
              letterSpacing: '0.02em'
            }}
            onMouseEnter={(e) => {
              if (!isLoading) {
                e.target.style.background = colors.primaryHover;
                e.target.style.transform = 'translateY(-1px)';
                e.target.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
              }
            }}
            onMouseLeave={(e) => {
              e.target.style.background = colors.primary;
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = 'none';
            }}
          >
            {isLoading ? (
              <>
                <Loader2 size={20} style={{ animation: 'spin 1s linear infinite' }} />
                <span>Signing In...</span>
              </>
            ) : (
              <>
                <LogIn size={20} />
                <span>Sign In</span>
              </>
            )}
          </button>
        </form>

        {/* Info Text */}
        <p style={{
          fontSize: '0.8125rem',
          color: colors.textSecondary,
          textAlign: 'center',
          marginTop: '1.5rem',
          lineHeight: '1.6',
          fontFamily: 'Inter, sans-serif'
        }}>
          Use your Client ID as both username and password
        </p>
      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
