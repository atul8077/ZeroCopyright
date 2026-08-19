import React from 'react';
import { User, Mail, MapPin, MessageSquare, ShieldAlert } from 'lucide-react';

export const Contact: React.FC = () => {
  return (
    <main className="container" style={{ padding: '4rem 1.5rem', maxWidth: '1000px', margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(37, 99, 235, 0.1)', color: 'var(--accent-color)', padding: '0.5rem 1rem', borderRadius: '20px', fontSize: '0.9rem', fontWeight: 600, marginBottom: '1.5rem' }}>
          <MessageSquare size={16} /> Support & Inquiries
        </div>
        <h1 className="text-gradient" style={{ fontSize: '3rem', marginBottom: '1.5rem', fontWeight: 800 }}>Contact Us</h1>
        <p className="text-secondary" style={{ fontSize: '1.15rem', maxWidth: '600px', margin: '0 auto', lineHeight: '1.6' }}>
          Have questions or need assistance? Our team is here to help you with your video optimization needs.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem', marginBottom: '3rem' }}>
        {/* Owner Card */}
        <div className="glass-card" style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(37, 99, 235, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
            <User size={24} color="var(--accent-color)" />
          </div>
          <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Owner</h3>
          <p className="text-secondary" style={{ fontSize: '1rem' }}>Atul Maurya</p>
        </div>

        {/* Email Card */}
        <div className="glass-card" style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(139, 92, 246, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
            <Mail size={24} color="#8b5cf6" />
          </div>
          <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Email</h3>
          <p className="text-secondary" style={{ fontSize: '1rem', wordBreak: 'break-all' }}>copyrightremover7@gmail.com</p>
        </div>

        {/* Address Card */}
        <div className="glass-card" style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(236, 72, 153, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
            <MapPin size={24} color="#ec4899" />
          </div>
          <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Address</h3>
          <p className="text-secondary" style={{ fontSize: '1rem', fontStyle: 'italic', lineHeight: '1.5' }}>
            Koramangala,<br/>Bangalore, Karnataka,<br/>560034, India
          </p>
        </div>
      </div>

      <div className="glass-card" style={{ padding: '2rem', display: 'flex', alignItems: 'flex-start', gap: '1.5rem', background: 'linear-gradient(135deg, rgba(37, 99, 235, 0.05) 0%, rgba(139, 92, 246, 0.05) 100%)' }}>
        <div style={{ width: '56px', height: '56px', borderRadius: '16px', background: 'var(--accent-gradient)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <ShieldAlert size={28} color="#ffffff" />
        </div>
        <div>
          <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>24/7 Technical Support</h3>
          <p className="text-secondary" style={{ fontSize: '0.95rem', lineHeight: '1.6', margin: 0 }}>
            We're committed to providing the best simulation experience. For technical issues or platform inquiries, please reach out to our team.
          </p>
        </div>
      </div>
    </main>
  );
};
