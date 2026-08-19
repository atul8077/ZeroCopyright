import React from 'react';
import { MessageCircle, Rocket, Zap, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export const Pricing: React.FC = () => {
  const { user, profile } = useAuth();
  const navigate = useNavigate();
  const isPro = profile?.subscription_tier === 'pro';

  const handlePlanSelection = () => {
    if (!user) {
      navigate('/auth');
    } else {
      navigate('/checkout');
    }
  };

  return (
    <main className="container" style={{ padding: '4rem 1.5rem', maxWidth: '1100px', margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <h1 className="text-gradient" style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', marginBottom: '1rem', fontWeight: 800, letterSpacing: '-0.02em' }}>Transparent Pricing</h1>
        <p className="text-secondary" style={{ fontSize: 'clamp(1rem, 2vw, 1.15rem)', maxWidth: '600px', margin: '0 auto' }}>Choose the perfect plan for your content journey. No hidden fees.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem', alignItems: 'stretch' }}>
        {/* Free Plan */}
        <div className="glass-card pricing-card" style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column' }}>
          <div style={{ width: '52px', height: '52px', borderRadius: '14px', background: 'rgba(37, 99, 235, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
            <MessageCircle size={26} color="var(--accent-color)" />
          </div>
          <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', fontWeight: 700 }}>Free Plan</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1.5rem', minHeight: '40px' }}>Perfect for testing the waters and basic optimizations.</p>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: '0.25rem', marginBottom: '2rem' }}>
            <span style={{ fontSize: '2.75rem', fontWeight: 800, lineHeight: 1 }}>₹0</span>
            <span style={{ color: 'var(--text-secondary)', fontSize: '1rem', paddingBottom: '0.35rem' }}>/forever</span>
          </div>
          
          <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 2rem 0', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <li style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.95rem' }}><CheckCircle2 size={18} color="var(--success-color)" /> 5 files per day</li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.95rem' }}><CheckCircle2 size={18} color="var(--success-color)" /> Standard processing</li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.95rem', color: 'var(--text-secondary)' }}><CheckCircle2 size={18} color="var(--card-border)" /> No batch processing</li>
          </ul>

          <div style={{ marginTop: 'auto' }}>
            <button className="btn" onClick={handlePlanSelection} style={{ width: '100%', padding: '0.875rem', fontSize: '1rem', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', borderRadius: '12px', fontWeight: 600 }}>Get Started</button>
          </div>
        </div>

        {/* Pro Plan */}
        <div className="glass-card pricing-card pro-card" style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column', border: '2px solid var(--accent-color)', position: 'relative', transform: 'scale(1.03)', zIndex: 10, boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}>
          <div style={{ position: 'absolute', top: '-14px', left: '50%', transform: 'translateX(-50%)', background: 'var(--accent-gradient)', color: '#ffffff', padding: '0.35rem 1.25rem', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase', boxShadow: '0 4px 10px rgba(37,99,235,0.2)' }}>Most Popular</div>
          <div style={{ width: '52px', height: '52px', borderRadius: '14px', background: 'rgba(37, 99, 235, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
            <Rocket size={26} color="var(--accent-color)" />
          </div>
          <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', fontWeight: 700 }}>Pro</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1.5rem', minHeight: '40px' }}>Advanced features for regular content creators.</p>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: '0.5rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', textDecoration: 'line-through', paddingBottom: '0.45rem' }}>₹649</span>
            <span style={{ fontSize: '2.75rem', fontWeight: 800, lineHeight: 1 }}>₹349</span>
            <span style={{ color: 'var(--text-secondary)', fontSize: '1rem', paddingBottom: '0.35rem' }}>/month</span>
          </div>

          <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 2rem 0', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <li style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.95rem' }}><CheckCircle2 size={18} color="var(--success-color)" /> Unlimited files</li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.95rem' }}><CheckCircle2 size={18} color="var(--success-color)" /> Priority AI processing</li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.95rem' }}><CheckCircle2 size={18} color="var(--success-color)" /> Batch upload (up to 10)</li>
          </ul>

          <div style={{ marginTop: 'auto' }}>
            {isPro ? (
              <button className="btn btn-primary" onClick={() => navigate('/studio')} style={{ width: '100%', padding: '0.875rem', fontSize: '1rem', borderRadius: '12px', fontWeight: 600, background: 'var(--success-color)', color: '#fff' }}>Open Plan</button>
            ) : (
              <button className="btn btn-primary" onClick={handlePlanSelection} style={{ width: '100%', padding: '0.875rem', fontSize: '1rem', borderRadius: '12px', fontWeight: 600 }}>Choose Pro</button>
            )}
          </div>
        </div>

        {/* Creator Pro */}
        <div className="glass-card pricing-card" style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column' }}>
          <div style={{ width: '52px', height: '52px', borderRadius: '14px', background: 'rgba(16, 185, 129, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
            <Zap size={26} color="var(--success-color)" />
          </div>
          <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', fontWeight: 700 }}>Creator Pro</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1.5rem', minHeight: '40px' }}>The ultimate toolkit for professional agencies.</p>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: '0.5rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', textDecoration: 'line-through', paddingBottom: '0.45rem' }}>₹749</span>
            <span style={{ fontSize: '2.75rem', fontWeight: 800, lineHeight: 1 }}>₹449</span>
            <span style={{ color: 'var(--text-secondary)', fontSize: '1rem', paddingBottom: '0.35rem', whiteSpace: 'nowrap' }}>/2 months</span>
          </div>

          <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 2rem 0', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <li style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.95rem' }}><CheckCircle2 size={18} color="var(--success-color)" /> Everything in Pro</li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.95rem' }}><CheckCircle2 size={18} color="var(--success-color)" /> API Access</li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.95rem' }}><CheckCircle2 size={18} color="var(--success-color)" /> Dedicated support</li>
          </ul>

          <div style={{ marginTop: 'auto' }}>
            <button className="btn" onClick={handlePlanSelection} style={{ width: '100%', padding: '0.875rem', fontSize: '1rem', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', borderRadius: '12px', fontWeight: 600 }}>Choose Creator Pro</button>
          </div>
        </div>
      </div>
    </main>
  );
};
