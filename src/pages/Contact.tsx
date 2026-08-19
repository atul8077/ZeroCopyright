import React, { useState } from 'react';
import { supabase } from '../lib/supabaseClient';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    
    setLoading(true);
    try {
      const { error } = await supabase
        .from('queries')
        .insert([formData]);
        
      if (error) throw error;
      
      setSuccess(true);
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setSuccess(false), 5000);
    } catch (err: any) {
      alert('Error sending message: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="container" style={{ padding: '4rem 2rem', maxWidth: '600px' }}>
      <h1 className="text-gradient" style={{ textAlign: 'center', marginBottom: '2rem' }}>Contact Us</h1>
      <form onSubmit={handleSubmit} className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem' }}>Name</label>
          <input type="text" className="input-field" placeholder="Your Name" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} required />
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem' }}>Email</label>
          <input type="email" className="input-field" placeholder="your@email.com" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} required />
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem' }}>Message</label>
          <textarea className="input-field" rows={5} placeholder="How can we help?" value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} required></textarea>
        </div>
        {success && <p style={{ color: 'var(--success-color)', textAlign: 'center', margin: '0.5rem 0' }}>Message sent successfully! We will get back to you soon.</p>}
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Sending...' : 'Send Message'}
        </button>
      </form>
    </main>
  );
};
