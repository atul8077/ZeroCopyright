import React from 'react';

export const Contact: React.FC = () => {
  return (
    <main className="container" style={{ padding: '4rem 2rem', maxWidth: '600px' }}>
      <h1 className="text-gradient" style={{ textAlign: 'center', marginBottom: '2rem' }}>Contact Us</h1>
      <form className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem' }}>Name</label>
          <input type="text" className="input-field" placeholder="Your Name" />
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem' }}>Email</label>
          <input type="email" className="input-field" placeholder="your@email.com" />
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem' }}>Message</label>
          <textarea className="input-field" rows={5} placeholder="How can we help?"></textarea>
        </div>
        <button type="button" className="btn btn-primary">Send Message</button>
      </form>
    </main>
  );
};
