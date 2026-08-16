import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Shield, Send, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="header">
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <Link to="/" className="header-brand" style={{ textDecoration: 'none' }}>
          <Shield style={{ color: '#4f46e5' }} size={32} />
          <span style={{ color: '#a5b4fc', fontSize: '1.5rem' }}>ZeroCopyright</span>
        </Link>
        <div className="telegram-icon">
          <Send size={14} />
        </div>
      </div>
      <nav className="header-nav">
        <Link to="/">Home</Link>
        <Link to="/pricing">Pricing</Link>
        <Link to="/contact">Contact</Link>
        
        {user ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
              <Link to="/studio" className="btn" style={{ padding: '0.4rem 1rem', background: 'rgba(59, 130, 246, 0.1)', color: '#60a5fa', border: '1px solid rgba(59, 130, 246, 0.2)' }}>Dashboard</Link>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(255,255,255,0.05)', padding: '0.4rem 0.8rem', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.1)' }}>
                <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: 'bold' }}>
                  {(user.user_metadata?.full_name?.[0] || user.email?.[0] || 'U').toUpperCase()}
                </div>
                <span style={{ fontSize: '0.9rem', fontWeight: 500, color: 'var(--text-primary)' }}>
                  {user.user_metadata?.full_name || user.email?.split('@')[0] || 'User'}
                </span>
                <button onClick={() => { logout(); navigate('/'); }} style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', display: 'flex', alignItems: 'center', marginLeft: '0.5rem' }} title="Logout">
                  <LogOut size={16} />
                </button>
              </div>
            </div>
          ) : (
          <Link to="/auth" className="btn-login">Log In / Sign Up</Link>
        )}
      </nav>
    </header>
  );
};
