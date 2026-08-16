import React, { useState, useEffect } from 'react';
import { Trash2, CheckCircle, Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';

export const Admin: React.FC = () => {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState('');
  const [payments, setPayments] = useState<any[]>([]);
  const [selectedPayments, setSelectedPayments] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      fetchPayments();
    }
  }, [isAuthenticated]);

  const fetchPayments = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('payments')
        .select(`
          id,
          plan,
          utr_number,
          status,
          created_at,
          profiles:user_id (full_name)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPayments(data || []);
    } catch (err: any) {
      console.error('Error fetching payments:', err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'AdminAtul&') {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Invalid password');
    }
  };

  const handleSelect = (id: string) => {
    setSelectedPayments(prev => 
      prev.includes(id) ? prev.filter(pId => pId !== id) : [...prev, id]
    );
  };

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedPayments(payments.map(p => p.id));
    } else {
      setSelectedPayments([]);
    }
  };

  const handleDeleteSelected = async () => {
    if (!window.confirm(`Are you sure you want to delete ${selectedPayments.length} payments?`)) return;

    try {
      const { error } = await supabase
        .from('payments')
        .delete()
        .in('id', selectedPayments);

      if (error) throw error;
      
      setPayments(prev => prev.filter(p => !selectedPayments.includes(p.id)));
      setSelectedPayments([]);
    } catch (err: any) {
      alert('Error deleting payments: ' + err.message);
    }
  };

  const handleApprove = async (id: string) => {
    try {
      // Approve the payment
      const { error: paymentError } = await supabase
        .from('payments')
        .update({ status: 'approved' })
        .eq('id', id);

      if (paymentError) throw paymentError;

      // In a real app, also update the user's profile subscription_tier here if needed
      // await supabase.from('profiles').update({ subscription_tier: 'pro' }).eq('id', userId);

      setPayments(prev => prev.map(p => p.id === id ? { ...p, status: 'approved' } : p));
      alert(`Payment approved successfully!`);
    } catch (err: any) {
      alert('Error approving payment: ' + err.message);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <form onSubmit={handleLogin} className="glass-card" style={{ width: '100%', maxWidth: '400px' }}>
          <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>Admin Access</h2>
          <input 
            type="password" 
            className="input-field" 
            placeholder="Enter Admin Password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoFocus
          />
          {error && <p className="text-secondary" style={{ color: 'var(--danger-color)', marginBottom: '1rem' }}>{error}</p>}
          <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Login</button>
        </form>
      </div>
    );
  }

  return (
    <div className="container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 className="text-gradient">Admin Dashboard</h1>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button onClick={fetchPayments} className="btn" style={{ padding: '0.5rem 1rem', background: 'rgba(255,255,255,0.05)', borderRadius: '8px' }}>
            Refresh
          </button>
          {selectedPayments.length > 0 && (
            <button onClick={handleDeleteSelected} className="btn" style={{ background: 'rgba(239, 68, 68, 0.1)', color: 'var(--danger-color)', border: '1px solid rgba(239,68,68,0.2)', display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', borderRadius: '8px' }}>
              <Trash2 size={18} /> Delete Selected ({selectedPayments.length})
            </button>
          )}
        </div>
      </div>
      
      <div className="glass-card" style={{ overflowX: 'auto' }}>
        <h3 style={{ marginBottom: '1.5rem' }}>UTR Payments</h3>
        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', padding: '3rem' }}><Loader2 size={32} className="spin text-secondary" /></div>
        ) : payments.length === 0 ? (
          <p style={{ color: 'var(--text-secondary)', textAlign: 'center', padding: '2rem 0' }}>No payments found.</p>
        ) : (
          <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse', minWidth: '700px' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--card-border)' }}>
                <th style={{ padding: '1rem 0.5rem', width: '40px' }}>
                  <input type="checkbox" onChange={handleSelectAll} checked={selectedPayments.length === payments.length && payments.length > 0} style={{ cursor: 'pointer' }} />
                </th>
                <th style={{ padding: '1rem 0.5rem' }}>Date</th>
                <th style={{ padding: '1rem 0.5rem' }}>User</th>
                <th style={{ padding: '1rem 0.5rem' }}>UTR Number</th>
                <th style={{ padding: '1rem 0.5rem' }}>Plan</th>
                <th style={{ padding: '1rem 0.5rem' }}>Status</th>
                <th style={{ padding: '1rem 0.5rem', textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {payments.map(p => (
                <tr key={p.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', background: selectedPayments.includes(p.id) ? 'rgba(59,130,246,0.05)' : 'transparent' }}>
                  <td style={{ padding: '1rem 0.5rem' }}>
                    <input type="checkbox" checked={selectedPayments.includes(p.id)} onChange={() => handleSelect(p.id)} style={{ cursor: 'pointer' }} />
                  </td>
                  <td style={{ padding: '1rem 0.5rem', color: 'var(--text-secondary)' }}>{new Date(p.created_at).toLocaleDateString()}</td>
                  <td style={{ padding: '1rem 0.5rem' }}>{p.profiles?.full_name || 'Unknown'}</td>
                  <td style={{ padding: '1rem 0.5rem', fontFamily: 'monospace', fontSize: '1.1rem', letterSpacing: '1px' }}>{p.utr_number}</td>
                  <td style={{ padding: '1rem 0.5rem', color: 'var(--text-secondary)' }}>{p.plan}</td>
                  <td style={{ padding: '1rem 0.5rem' }}>
                    <span className={p.status === 'approved' ? 'badge badge-success' : 'badge'} style={{ background: p.status === 'pending' ? 'rgba(234, 179, 8, 0.1)' : '', color: p.status === 'pending' ? '#eab308' : '' }}>
                      {p.status.toUpperCase()}
                    </span>
                  </td>
                  <td style={{ padding: '1rem 0.5rem', textAlign: 'right' }}>
                    {p.status === 'pending' && (
                      <button onClick={() => handleApprove(p.id)} className="btn btn-primary" style={{ padding: '0.4rem 0.75rem', fontSize: '0.85rem', display: 'inline-flex', alignItems: 'center', gap: '0.25rem', borderRadius: '6px' }}>
                        <CheckCircle size={14} /> Approve
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};
