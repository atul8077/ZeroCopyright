import React, { useState, useEffect } from 'react';
import { Trash2, CheckCircle, Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';

export const Admin: React.FC = () => {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState('');
  const [payments, setPayments] = useState<any[]>([]);
  const [selectedPayments, setSelectedPayments] = useState<string[]>([]);
  const [queries, setQueries] = useState<any[]>([]);
  const [selectedQueries, setSelectedQueries] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<'payments'|'queries'>('payments');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      fetchPayments();
      fetchQueries();
    }
  }, [isAuthenticated]);

  const fetchPayments = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('payments')
        .select(`
          id,
          user_id,
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

  const fetchQueries = async () => {
    try {
      const { data, error } = await supabase
        .from('queries')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) throw error;
      setQueries(data || []);
    } catch (err: any) {
      console.error('Error fetching queries:', err.message);
    }
  };

  const handleDeleteSelectedQueries = async () => {
    if (!window.confirm(`Are you sure you want to delete ${selectedQueries.length} queries?`)) return;
    try {
      const { error } = await supabase.from('queries').delete().in('id', selectedQueries);
      if (error) throw error;
      setQueries(prev => prev.filter(q => !selectedQueries.includes(q.id)));
      setSelectedQueries([]);
    } catch (err: any) {
      alert('Error deleting queries: ' + err.message);
    }
  };

  const handleSelectQuery = (id: string) => {
    setSelectedQueries(prev => prev.includes(id) ? prev.filter(qId => qId !== id) : [...prev, id]);
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

  const handleApprove = async (id: string, userId: string) => {
    try {
      // Approve the payment
      const { error: paymentError } = await supabase
        .from('payments')
        .update({ status: 'approved' })
        .eq('id', id);

      if (paymentError) throw paymentError;

      // Update the user's profile subscription_tier
      if (userId) {
        await supabase.from('profiles').update({ subscription_tier: 'pro', subscription_status: 'active' }).eq('id', userId);
      }

      setPayments(prev => prev.map(p => p.id === id ? { ...p, status: 'approved' } : p));
      alert(`Payment approved successfully! User plan is now active.`);
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
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <h1 className="text-gradient">Admin Dashboard</h1>
        
        <div style={{ display: 'flex', gap: '1rem', background: 'rgba(255,255,255,0.05)', padding: '0.25rem', borderRadius: '12px', border: '1px solid var(--card-border)' }}>
          <button 
            onClick={() => setActiveTab('payments')} 
            className={`btn ${activeTab === 'payments' ? 'btn-primary' : ''}`}
            style={{ padding: '0.5rem 1.5rem', background: activeTab === 'payments' ? '' : 'transparent', color: activeTab === 'payments' ? '' : 'var(--text-primary)', boxShadow: activeTab === 'payments' ? '' : 'none' }}>
            Payments
          </button>
          <button 
            onClick={() => setActiveTab('queries')} 
            className={`btn ${activeTab === 'queries' ? 'btn-primary' : ''}`}
            style={{ padding: '0.5rem 1.5rem', background: activeTab === 'queries' ? '' : 'transparent', color: activeTab === 'queries' ? '' : 'var(--text-primary)', boxShadow: activeTab === 'queries' ? '' : 'none' }}>
            Queries
          </button>
        </div>

        <div style={{ display: 'flex', gap: '1rem' }}>
          <button onClick={() => { fetchPayments(); fetchQueries(); }} className="btn" style={{ padding: '0.5rem 1rem', background: 'rgba(255,255,255,0.05)', borderRadius: '8px' }}>
            Refresh
          </button>
          {activeTab === 'payments' && selectedPayments.length > 0 && (
            <button onClick={handleDeleteSelected} className="btn" style={{ background: 'rgba(239, 68, 68, 0.1)', color: 'var(--danger-color)', border: '1px solid rgba(239,68,68,0.2)', display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', borderRadius: '8px' }}>
              <Trash2 size={18} /> Delete Selected ({selectedPayments.length})
            </button>
          )}
          {activeTab === 'queries' && selectedQueries.length > 0 && (
            <button onClick={handleDeleteSelectedQueries} className="btn" style={{ background: 'rgba(239, 68, 68, 0.1)', color: 'var(--danger-color)', border: '1px solid rgba(239,68,68,0.2)', display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', borderRadius: '8px' }}>
              <Trash2 size={18} /> Delete Selected ({selectedQueries.length})
            </button>
          )}
        </div>
      </div>
      
      <div className="glass-card" style={{ overflowX: 'auto' }}>
        <h3 style={{ marginBottom: '1.5rem' }}>{activeTab === 'payments' ? 'UTR Payments' : 'User Queries'}</h3>
        {loading && activeTab === 'payments' ? (
          <div style={{ display: 'flex', justifyContent: 'center', padding: '3rem' }}><Loader2 size={32} className="spin text-secondary" /></div>
        ) : activeTab === 'payments' ? (
          payments.length === 0 ? (
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
                        <button onClick={() => handleApprove(p.id, p.user_id)} className="btn btn-primary" style={{ padding: '0.4rem 0.75rem', fontSize: '0.85rem', display: 'inline-flex', alignItems: 'center', gap: '0.25rem', borderRadius: '6px' }}>
                          <CheckCircle size={14} /> Approve
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )
        ) : (
          queries.length === 0 ? (
            <p style={{ color: 'var(--text-secondary)', textAlign: 'center', padding: '2rem 0' }}>No queries found.</p>
          ) : (
            <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse', minWidth: '700px' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--card-border)' }}>
                  <th style={{ padding: '1rem 0.5rem', width: '40px' }}>
                    <input type="checkbox" onChange={(e) => setSelectedQueries(e.target.checked ? queries.map(q => q.id) : [])} checked={selectedQueries.length === queries.length && queries.length > 0} style={{ cursor: 'pointer' }} />
                  </th>
                  <th style={{ padding: '1rem 0.5rem' }}>Date</th>
                  <th style={{ padding: '1rem 0.5rem' }}>Name</th>
                  <th style={{ padding: '1rem 0.5rem' }}>Email</th>
                  <th style={{ padding: '1rem 0.5rem' }}>Message</th>
                </tr>
              </thead>
              <tbody>
                {queries.map(q => (
                  <tr key={q.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', background: selectedQueries.includes(q.id) ? 'rgba(59,130,246,0.05)' : 'transparent' }}>
                    <td style={{ padding: '1rem 0.5rem' }}>
                      <input type="checkbox" checked={selectedQueries.includes(q.id)} onChange={() => handleSelectQuery(q.id)} style={{ cursor: 'pointer' }} />
                    </td>
                    <td style={{ padding: '1rem 0.5rem', color: 'var(--text-secondary)' }}>{new Date(q.created_at).toLocaleDateString()}</td>
                    <td style={{ padding: '1rem 0.5rem' }}>{q.name}</td>
                    <td style={{ padding: '1rem 0.5rem', color: 'var(--accent-color)' }}>{q.email}</td>
                    <td style={{ padding: '1rem 0.5rem', color: 'var(--text-secondary)', maxWidth: '300px' }}>{q.message}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )
        )}
      </div>
    </div>
  );
};
