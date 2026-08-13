import React, { useState } from 'react';
import { Phone, Lock, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export const Auth: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleAuthAction = () => {
    // Mock login logic
    const userName = isLogin ? 'ramesh' : (name || 'ramesh');
    login(userName);
    navigate('/pricing');
  };

  return (
    <main className="container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '75vh' }}>
      <div className="glass-card" style={{ width: '100%', maxWidth: '420px', padding: '2.5rem' }}>
        
        {isLogin ? (
          <>
            <h2 style={{ textAlign: 'center', marginBottom: '2.5rem', fontSize: '1.5rem' }}>Welcome Back</h2>
            <form style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Phone Number</label>
                <div style={{ position: 'relative' }}>
                  <Phone size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
                  <input type="text" className="input-field" placeholder="Enter you Number" style={{ paddingLeft: '2.75rem', marginBottom: 0 }} />
                </div>
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Password</label>
                <div style={{ position: 'relative' }}>
                  <Lock size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
                  <input type="password" className="input-field" placeholder="Enter Password" style={{ paddingLeft: '2.75rem', marginBottom: 0 }} />
                </div>
              </div>
              <button type="button" className="btn-login" onClick={handleAuthAction} style={{ width: '100%', padding: '0.8rem', marginTop: '1rem', fontSize: '1rem' }}>Log In</button>
            </form>
            <div style={{ textAlign: 'center', marginTop: '2rem', color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
              Don't have an account? <span onClick={() => setIsLogin(false)} style={{ color: '#8b5cf6', cursor: 'pointer', fontWeight: 600 }}>Sign Up</span>
            </div>
          </>
        ) : (
          <>
            <h2 style={{ textAlign: 'center', marginBottom: '0.5rem', fontSize: '1.5rem' }}>Create Account</h2>
            <p style={{ textAlign: 'center', color: 'var(--text-secondary)', marginBottom: '2rem', fontSize: '0.95rem' }}>Get started with your phone number</p>
            <form style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Full Name</label>
                <div style={{ position: 'relative' }}>
                  <User size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
                  <input type="text" className="input-field" placeholder="Enter your name" value={name} onChange={(e) => setName(e.target.value)} style={{ paddingLeft: '2.75rem', marginBottom: 0 }} />
                </div>
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Phone Number</label>
                <div style={{ position: 'relative' }}>
                  <Phone size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
                  <input type="text" className="input-field" placeholder="Enter you Number" style={{ paddingLeft: '2.75rem', marginBottom: 0 }} />
                </div>
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Password</label>
                <div style={{ position: 'relative' }}>
                  <Lock size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
                  <input type="password" className="input-field" placeholder="Enter Password" style={{ paddingLeft: '2.75rem', marginBottom: 0 }} />
                </div>
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Repeat Password</label>
                <div style={{ position: 'relative' }}>
                  <Lock size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
                  <input type="password" className="input-field" placeholder="Repeat Password" style={{ paddingLeft: '2.75rem', marginBottom: 0 }} />
                </div>
              </div>
              <button type="button" className="btn-login" onClick={handleAuthAction} style={{ width: '100%', padding: '0.8rem', marginTop: '1rem', fontSize: '1rem' }}>Sign Up</button>
            </form>
            <div style={{ textAlign: 'center', marginTop: '2rem', color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
              Already have an account? <span onClick={() => setIsLogin(true)} style={{ color: '#8b5cf6', cursor: 'pointer', fontWeight: 600 }}>Log In</span>
            </div>
          </>
        )}
      </div>
    </main>
  );
};
