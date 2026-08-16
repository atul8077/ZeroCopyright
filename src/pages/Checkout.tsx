import React, { useState } from 'react';
import { QrCode, CheckCircle2, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';
import { useAuth } from '../context/AuthContext';

export const Checkout: React.FC = () => {
  const [utr, setUtr] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      setError("You must be logged in to submit a payment.");
      return;
    }

    if (utr.length >= 12) {
      setLoading(true);
      setError('');
      
      try {
        const { error: dbError } = await supabase.from('payments').insert([
          {
            user_id: user.id,
            plan: 'Pro', // Can be made dynamic later
            utr_number: utr,
            status: 'pending'
          }
        ]);

        if (dbError) throw dbError;
        
        setSubmitted(true);
      } catch (err: any) {
        if (err.code === '23505') {
          setError('This UTR number has already been submitted.');
        } else {
          setError(err.message || 'Failed to submit payment. Please try again.');
        }
      } finally {
        setLoading(false);
      }
    }
  };

  if (submitted) {
    return (
      <main className="container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '70vh' }}>
        <div className="glass-card" style={{ padding: '3rem', textAlign: 'center', maxWidth: '500px' }}>
          <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'rgba(16, 185, 129, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
            <CheckCircle2 size={32} color="#10b981" />
          </div>
          <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Payment Submitted!</h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', lineHeight: '1.6' }}>
            Thank you! Your UTR number <strong>{utr}</strong> has been received. Our admins will verify the payment shortly and activate your subscription.
          </p>
          <button className="btn btn-primary" onClick={() => navigate('/')}>Return to Dashboard</button>
        </div>
      </main>
    );
  }

  return (
    <main className="container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '70vh', padding: '2rem 1rem' }}>
      <div className="glass-card" style={{ width: '100%', maxWidth: '450px', padding: '2.5rem' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '1.5rem', fontSize: '1.75rem' }}>Complete Payment</h2>
        <p style={{ textAlign: 'center', color: 'var(--text-secondary)', marginBottom: '2rem' }}>
          Please scan the QR code or use the UPI ID below to make your payment.
        </p>
        
        {error && (
          <div style={{ background: 'rgba(239, 68, 68, 0.1)', color: 'var(--danger-color)', padding: '1rem', borderRadius: '8px', marginBottom: '1.5rem', fontSize: '0.9rem', textAlign: 'center' }}>
            {error}
          </div>
        )}

        <div style={{ background: 'white', padding: '1.5rem', borderRadius: '16px', display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
          {/* Mock QR Code */}
          <div style={{ width: '200px', height: '200px', border: '4px solid #000', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f8fafc', flexDirection: 'column' }}>
            <QrCode size={100} color="#000" />
            <div style={{ color: '#000', fontWeight: 'bold', marginTop: '0.5rem' }}>Scan to Pay</div>
          </div>
        </div>

        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>UPI ID</div>
          <div style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--text-primary)', background: 'rgba(255,255,255,0.05)', padding: '0.5rem', borderRadius: '8px', display: 'inline-block' }}>
            zerocopyright@ybl
          </div>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.95rem' }}>Enter 12-Digit UTR Number</label>
            <input 
              type="text" 
              required
              minLength={12}
              className="input-field" 
              placeholder="e.g., 312345678901" 
              value={utr}
              onChange={(e) => setUtr(e.target.value)}
              style={{ fontSize: '1.1rem', letterSpacing: '2px', textAlign: 'center' }}
            />
          </div>
          <button type="submit" disabled={loading} className="btn btn-primary" style={{ padding: '0.875rem', fontSize: '1rem', marginTop: '0.5rem', borderRadius: '12px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem' }}>
            {loading && <Loader2 size={18} className="spin" />}
            Submit Payment for Verification
          </button>
        </form>
      </div>
    </main>
  );
};
