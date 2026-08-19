import React, { useState } from 'react';
import { LegalPage } from '../components/LegalPage';
import { ChevronDown, ChevronUp, Zap, Globe, Shield, Activity, Search } from 'lucide-react';

const faqs = [
  {
    id: 1,
    question: "How does Copyright Remover work?",
    answer: "This tool only provides a demonstration of real processes and does not actually modify any video. It is intended purely for illustrative purposes. It does not change the video, remove copyright, or edit metadata in any way. The “simulation algorithms” simply show how such processes might work in practice, without performing any real actions. Techniques like perceptual hashing are demonstrated only to explain how videos can be identified or analyzed for similarity—they are not applied to alter the content. In short, this tool is meant to help users understand how video optimization works, but it does not make any actual changes on its own. Our platform charges a subscription only for access to this simulation and demonstration, not for removing copyright or modifying videos.",
    icon: <Zap size={20} color="#6366f1" />
  },
  {
    id: 2,
    question: "Which platforms are supported?",
    answer: "Our tool simulates optimization for YouTube, Facebook, Instagram, TikTok, and more.",
    icon: <Globe size={20} color="#a855f7" />
  },
  {
    id: 3,
    question: "Is it safe to use?",
    answer: "Absolutely. We do not store your original video files permanently. All processing happens in a secure, temporary environment.",
    icon: <Shield size={20} color="#10b981" />
  },
  {
    id: 4,
    question: "Can I earn from these videos?",
    answer: "The “copyright remover” does not guarantee whether you will earn revenue or not. It only provides a simulation of possible outcomes, and the subscription fee is charged for access to that simulation.",
    icon: <Activity size={20} color="#f59e0b" />
  },
  {
    id: 5,
    question: "What is AI Simulation?",
    answer: "This tool only demonstrates how advanced video encoding and metadata cleanup work. It does not actually remove copyright from any video, nor does it delete or alter the video’s metadata. It also does not modify the original content of the video in any way. This is purely a simulation intended to show how these processes function.",
    icon: <Search size={20} color="#ec4899" />
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
              background: 'var(--card-bg)',
              border: '1px solid var(--card-border)',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)'
            }}
            onClick={() => toggle(faq.id)}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                <div style={{ 
                  width: '44px', height: '44px', borderRadius: '12px', 
                  background: 'rgba(37,99,235,0.05)', 
                  display: 'flex', alignItems: 'center', justifyContent: 'center' 
                }}>
                  {faq.icon}
                </div>
                <h3 style={{ margin: 0, fontSize: '1.15rem', fontWeight: 600 }}>{faq.question}</h3>
              </div>
              <div>
                {openId === faq.id ? <ChevronUp size={20} color="var(--text-secondary)" /> : <ChevronDown size={20} color="var(--text-secondary)" />}
              </div>
            </div>
            {openId === faq.id && (
              <div style={{ marginTop: '1.5rem', paddingLeft: '4.25rem', color: 'var(--text-secondary)', lineHeight: '1.7', fontSize: '0.95rem' }}>
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
    content={
      <>
        <p className="text-secondary" style={{ marginBottom: '2rem' }}>Last Updated: April 2024</p>
        
        <h3>What Data We Collect</h3>
        <p>We collect minimal data required to run our SaaS platform:</p>
        <ul>
          <li><strong>Phone Number/Email:</strong> Required for account authentication and security.</li>
          <li><strong>Video Uploads:</strong> Temporarily stored for processing simulation.</li>
          <li><strong>Payment Metadata:</strong> Transaction IDs for billing support (no bank/UPI PINs stored).</li>
        </ul>

        <h3>How We Handle Your Videos (Auto-Deletion)</h3>
        <p>We value your privacy and server storage. All uploaded and processed videos are automatically permanently deleted from our servers within 24 to 48 hours of upload. We do not sell, share, or claim ownership of your content.</p>

        <h3>Third-Party Services</h3>
        <p>We use secure third-party payment gateways to process transactions and Telegram APIs for internal system logging. These services have their own privacy policies which we encourage you to review.</p>

        <h3>Questions about your data?</h3>
        <p>Reach out to us at copyrightremover7@gmail.com for any data-related queries.</p>
      </>
    } 
  />
);

export const Terms: React.FC = () => (
  <LegalPage 
    title="Terms of Service" 
    content={
      <>
        <p className="text-secondary" style={{ marginBottom: '2rem' }}>Last Updated: April 2024</p>

        <h3>1. Acceptance of Terms</h3>
        <p>By using Copyright Remover, you agree to these terms. If you do not agree, do not use our services. We provide an AI-based video processing tool "as is".</p>

        <h3>2. User Responsibilities & Risk</h3>
        <p>This is only a simulation that shows how things work. Dont think this is a copyright remover too, This is a simulation only. if you simulate the video from here and upload the video on YouTube, Facebook, Instagram, or any other social media platform it is entirely your responsibility. If your video receives any copyright claim or any action is taken against it, you will be solely responsible for it. use this tool only for fun and see the simulation, dont think this is real copyright remover tool. if you think this is real tool and upload on any social media and your video or your account will be ban or suspended this is your responsibility.</p>

        <h3>3. No Liability for Account Bans</h3>
        <p>If you upload videos simulate by our tool and upload to YouTube, Instagram, Facebook, or any other platform and your account gets suspended, banned, or receives a copyright strike, WE ARE NOT RESPONSIBLE. We hold zero liability for your actions, because we clearly mention this is a simulation tool and shows how the thing does work.</p>

        <h3>4. Service Availability & Limits</h3>
        <p>Purchasing a pass gives you specific video simulation limits. We reserve the right to modify these limits, block accounts, or shut down the service at any time without prior notice.</p>

        <h3>Agreement of Use</h3>
        <p>By continuing to use this site, you accept all terms listed above.</p>
      </>
    } 
  />
);

export const Refund: React.FC = () => (
  <LegalPage 
    title="Refund Policy" 
    content={
      <>
        <p className="text-secondary" style={{ marginBottom: '2rem' }}>Last Updated: April 2024</p>

        <h3>Strict No-Refund Policy</h3>
        <p>Copyright Remover provides a digital utility service in the form of a subscription access pass. <strong>ALL SALES ARE FINAL. WE DO NOT OFFER REFUNDS.</strong></p>

        <h3>Failed Transactions</h3>
        <p>If your money is deducted from your bank account but the pass is not activated due to a technical error, the amount will automatically be refunded by your bank/UPI provider within 3-5 business days. Our system does not capture funds for failed API calls.</p>

        <h3>Limit Exhaustion</h3>
        <p>If you exhaust your video simulation limit before your subscription month expires, you will not receive a partial refund. The pass is valid for the duration OR until the limit is reached, whichever comes first.</p>

        <h3>Final Sale Agreement</h3>
        <p>By completing a purchase, you acknowledge and accept our strict no-refund policy.</p>
      </>
    } 
  />
);

export const Disclaimer: React.FC = () => (
  <LegalPage 
    title="Fair Use Disclaimer" 
    content={
      <>
        <p className="text-secondary" style={{ marginBottom: '2rem' }}>Last Updated: April 2026</p>

        <h3>Zero Responsibility Policy</h3>
        <p>"Copyright REMOVER TAKES ZERO RESPONSIBILITY FOR HOW YOU USE THIS SIMULATION TOOL. USE IT FOR ONLY FUN AND UNDERSTAND THE SIMULATION. DONT THINK THIS IS REAL"</p>

        <p>The Copyright Remover Simulation tool is designed strictly for educational, testing and simulation purpose only and personal archiving purposes. We do not host, store, or distribute copyrighted content, this is simulation tool.</p>

        <h3>Content Ownership</h3>
        <p>By processing a video through our servers, you explicitly state that you are the original creator of the content or have obtained the necessary legal permissions from the copyright holder, this is a simulation tool that shows how the things work. if you are a original owner of the content so you can upload the video on youtube.</p>

        <h3>Anti-Misuse Guidelines</h3>
        <p>Any misuse of this tool to bypass DRM, remove legitimate watermarks, or steal intellectual property is strictly against our guidelines. If you face legal action, financial penalties, or platform bans, Copyright Remover, its founders, and its servers cannot be held liable under any circumstances. because this is a simulation tool and we are not responsible for how you use this tool, we are just providing a tool that shows how the things work. and not a real copyright remover tool. and we charge for showing this simulation to you.</p>

        <h3>Disclaimer of Use</h3>
        <p>By continuing to use this site, you accept all terms of this disclaimer.</p>
      </>
    } 
  />
);
