import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Shield, Send, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [clickCount, setClickCount] = React.useState(0);

  const handleBrandClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const newCount = clickCount + 1;
    setClickCount(newCount);
    
    if (newCount >= 5) {
      setClickCount(0);
      navigate('/admin');
    } else {
      navigate('/');
    }
  };

  return (
    <header className="header">
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <a href="/" onClick={handleBrandClick} className="header-brand" style={{ textDecoration: 'none', cursor: 'pointer' }}>
          <Shield style={{ color: '#4f46e5' }} size={32} />
          <span style={{ color: '#a5b4fc', fontSize: '1.5rem', userSelect: 'none' }}>ZeroCopyright</span>
        </a>
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
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'var(--bg-color)', padding: '0.4rem 0.8rem', borderRadius: '20px', border: '1px solid var(--card-border)' }}>
                <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: 'var(--accent-gradient)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: 'bold', color: '#fff' }}>
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
