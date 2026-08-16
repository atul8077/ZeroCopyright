import React, { useState } from 'react';
import { Mail, Lock, User, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';

export const Auth: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleAuthAction = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        navigate('/pricing');
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: name,
            }
          }
        });
        if (error) throw error;
        
        // If email confirmation is off, this works immediately
        navigate('/pricing');
      }
    } catch (err: any) {
      setError(err.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '75vh' }}>
      <div className="glass-card" style={{ width: '100%', maxWidth: '420px', padding: '2.5rem' }}>
        
        {error && (
          <div style={{ background: 'rgba(239, 68, 68, 0.1)', color: 'var(--danger-color)', padding: '1rem', borderRadius: '8px', marginBottom: '1.5rem', fontSize: '0.9rem', textAlign: 'center' }}>
            {error}
          </div>
        )}

        {isLogin ? (
          <>
            <h2 style={{ textAlign: 'center', marginBottom: '2.5rem', fontSize: '1.5rem' }}>Welcome Back</h2>
            <form onSubmit={handleAuthAction} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Email Address</label>
                <div style={{ position: 'relative' }}>
                  <Mail size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
                  <input type="email" required className="input-field" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} style={{ paddingLeft: '2.75rem', marginBottom: 0 }} />
                </div>
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Password</label>
                <div style={{ position: 'relative' }}>
                  <Lock size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
                  <input type="password" required className="input-field" placeholder="Enter Password" value={password} onChange={(e) => setPassword(e.target.value)} style={{ paddingLeft: '2.75rem', marginBottom: 0 }} />
                </div>
              </div>
              <button type="submit" disabled={loading} className="btn-login" style={{ width: '100%', padding: '0.8rem', marginTop: '1rem', fontSize: '1rem', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem' }}>
                {loading && <Loader2 size={18} className="spin" />}
                Log In
              </button>
            </form>
            <div style={{ textAlign: 'center', marginTop: '2rem', color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
              Don't have an account? <span onClick={() => setIsLogin(false)} style={{ color: '#8b5cf6', cursor: 'pointer', fontWeight: 600 }}>Sign Up</span>
            </div>
          </>
        ) : (
          <>
            <h2 style={{ textAlign: 'center', marginBottom: '0.5rem', fontSize: '1.5rem' }}>Create Account</h2>
            <p style={{ textAlign: 'center', color: 'var(--text-secondary)', marginBottom: '2rem', fontSize: '0.95rem' }}>Get started with your email</p>
            <form onSubmit={handleAuthAction} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Full Name</label>
                <div style={{ position: 'relative' }}>
                  <User size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
                  <input type="text" required className="input-field" placeholder="Enter your name" value={name} onChange={(e) => setName(e.target.value)} style={{ paddingLeft: '2.75rem', marginBottom: 0 }} />
                </div>
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Email Address</label>
                <div style={{ position: 'relative' }}>
                  <Mail size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
                  <input type="email" required className="input-field" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} style={{ paddingLeft: '2.75rem', marginBottom: 0 }} />
                </div>
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Password</label>
                <div style={{ position: 'relative' }}>
                  <Lock size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
                  <input type="password" required className="input-field" placeholder="Enter Password" value={password} onChange={(e) => setPassword(e.target.value)} style={{ paddingLeft: '2.75rem', marginBottom: 0 }} />
                </div>
              </div>
              <button type="submit" disabled={loading} className="btn-login" style={{ width: '100%', padding: '0.8rem', marginTop: '1rem', fontSize: '1rem', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem' }}>
                {loading && <Loader2 size={18} className="spin" />}
                Sign Up
              </button>
            </form>
            <div style={{ textAlign: 'center', marginTop: '2rem', color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
              Already have an account? <span onClick={() => setIsLogin(true)} style={{ color: 'var(--text-primary)', cursor: 'pointer', fontWeight: 600, borderBottom: '1px solid var(--text-primary)' }}>Log In</span>
            </div>
          </>
        )}
      </div>
    </main>
  );
};
