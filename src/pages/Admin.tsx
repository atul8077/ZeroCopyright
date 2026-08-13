import React, { useState } from 'react';

export const Admin: React.FC = () => {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'AdminAtul&') {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Invalid password');
    }
  };

  const signups = [
    { id: 1, email: 'user1@example.com', date: '2026-08-12' },
    { id: 2, email: 'john.doe@test.com', date: '2026-08-11' },
    { id: 3, email: 'alex.smith@test.com', date: '2026-08-10' }
  ];

  const payments = [
    { id: 'txn_001', user: 'user1@example.com', amount: '$15.00', status: 'Completed', plan: 'Pro' },
    { id: 'txn_002', user: 'john.doe@test.com', amount: '$5.00', status: 'Completed', plan: 'Basic' },
    { id: 'txn_003', user: 'alex.smith@test.com', amount: '$15.00', status: 'Completed', plan: 'Pro' }
  ];

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
      <h1 className="text-gradient" style={{ marginBottom: '2rem' }}>Admin Dashboard</h1>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '2rem' }}>
        <div className="glass-card">
          <h3 style={{ marginBottom: '1.5rem' }}>Recent Signups (Supabase)</h3>
          <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--card-border)' }}>
                <th style={{ padding: '0.75rem 0' }}>Email</th>
                <th style={{ padding: '0.75rem 0' }}>Date</th>
              </tr>
            </thead>
            <tbody>
              {signups.map(s => (
                <tr key={s.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  <td style={{ padding: '0.75rem 0', color: 'var(--text-secondary)' }}>{s.email}</td>
                  <td style={{ padding: '0.75rem 0', color: 'var(--text-secondary)' }}>{s.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="glass-card">
          <h3 style={{ marginBottom: '1.5rem' }}>Payment Details</h3>
          <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--card-border)' }}>
                <th style={{ padding: '0.75rem 0' }}>User</th>
                <th style={{ padding: '0.75rem 0' }}>Plan</th>
                <th style={{ padding: '0.75rem 0' }}>Amount</th>
              </tr>
            </thead>
            <tbody>
              {payments.map(p => (
                <tr key={p.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  <td style={{ padding: '0.75rem 0', color: 'var(--text-secondary)' }}>{p.user}</td>
                  <td style={{ padding: '0.75rem 0', color: 'var(--text-secondary)' }}>{p.plan}</td>
                  <td style={{ padding: '0.75rem 0', color: 'var(--success-color)' }}>{p.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
