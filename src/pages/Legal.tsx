import React, { useState } from 'react';
import { LegalPage } from '../components/LegalPage';
import { ChevronDown, ChevronUp, Zap, Globe, Shield } from 'lucide-react';

const faqs = [
  {
    id: 1,
    question: "How does ZeroCopyright work?",
    answer: "This tool provides advanced client-side processing. Our engine precisely strips metadata chunks (EXIF, ID3, atoms) without altering the core video, audio, or image streams. Re-baking applies a lossless pass entirely in your browser.",
    icon: <Zap size={20} color="#6366f1" />
  },
  {
    id: 2,
    question: "Which platforms are supported?",
    answer: "ZeroCopyright supports all major platforms including Windows, macOS, and Linux, since it runs directly in your modern web browser. No installation is required.",
    icon: <Globe size={20} color="#a855f7" />
  },
  {
    id: 3,
    question: "Is it safe to use?",
    answer: "Absolutely. We do not store your original video files permanently. All processing happens in a secure, temporary environment locally on your device.",
    icon: <Shield size={20} color="#10b981" />
  }
];

export const FAQ: React.FC = () => {
  const [openId, setOpenId] = useState<number | null>(1);

  const toggle = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <main className="container" style={{ padding: '4rem 2rem', maxWidth: '900px' }}>
      <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <h1 className="text-gradient" style={{ fontSize: '3rem', marginBottom: '1rem' }}>Frequently Asked Questions</h1>
        <p className="text-secondary" style={{ fontSize: '1.1rem' }}>
          Everything you need to know about our video processing simulation and SaaS platform.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {faqs.map(faq => (
          <div 
            key={faq.id} 
            className="glass-card" 
            style={{ 
              padding: '1.5rem 2rem', 
              cursor: 'pointer',
              background: '#15171e', // Slightly lighter dark background matching the image
              border: 'none',
              boxShadow: 'none'
            }}
            onClick={() => toggle(faq.id)}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                <div style={{ 
                  width: '44px', height: '44px', borderRadius: '12px', 
                  background: 'rgba(255,255,255,0.05)', 
                  display: 'flex', alignItems: 'center', justifyContent: 'center' 
                }}>
                  {faq.icon}
                </div>
                <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 600 }}>{faq.question}</h3>
              </div>
              <div>
                {openId === faq.id ? <ChevronUp size={20} color="var(--text-secondary)" /> : <ChevronDown size={20} color="var(--text-secondary)" />}
              </div>
            </div>
            {openId === faq.id && (
              <div style={{ marginTop: '1.5rem', paddingLeft: '4.5rem', color: 'var(--text-secondary)', lineHeight: '1.7', fontSize: '1.05rem' }}>
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </main>
  );
};

export const Privacy: React.FC = () => (
  <LegalPage 
    title="Privacy Policy" 
    content={<p>Your privacy is our primary concern. We do not upload, collect, or store any of your files. All metadata scrubbing is done entirely in your web browser locally. We only collect basic analytics and account signup information if you choose to register.</p>} 
  />
);

export const Terms: React.FC = () => (
  <LegalPage 
    title="Terms of Service" 
    content={<p>By using ZeroCopyright, you agree that you are solely responsible for the media you process. This tool is provided for privacy optimization only. You must not use this tool to infringe upon the intellectual property rights of others.</p>} 
  />
);

export const Refund: React.FC = () => (
  <LegalPage 
    title="Refund Policy" 
    content={<p>If you are not satisfied with your Pro subscription, we offer a 7-day money-back guarantee. Please contact our support team to request a refund.</p>} 
  />
);

export const Disclaimer: React.FC = () => (
  <LegalPage 
    title="Fair Use Disclaimer" 
    content={<p>This tool is intended for content optimization and privacy protection. We do not promote, encourage, or support copyright infringement. Users must ensure they have the right to modify and distribute the content they process.</p>} 
  />
);
