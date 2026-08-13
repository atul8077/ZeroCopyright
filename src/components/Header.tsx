import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Shield, Send, LayoutDashboard, LogOut, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

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
          <>
            <Link to="/admin" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-secondary)' }}>
              <LayoutDashboard size={16} /> Dashboard
            </Link>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', background: 'rgba(255,255,255,0.05)', padding: '0.4rem 1rem', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.1)' }}>
              <User size={16} color="#a5b4fc" />
              <span style={{ fontSize: '0.95rem', fontWeight: 600 }}>{user}</span>
              <div 
                style={{ marginLeft: '0.5rem', display: 'flex', alignItems: 'center', cursor: 'pointer', color: 'var(--text-secondary)' }}
                onClick={handleLogout}
              >
                <LogOut size={16} />
              </div>
            </div>
          </>
        ) : (
          <Link to="/auth" className="btn-login">Log In / Sign Up</Link>
        )}
      </nav>
    </header>
  );
};
