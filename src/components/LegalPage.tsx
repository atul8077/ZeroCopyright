import React from 'react';

export const LegalPage: React.FC<{ title: string, content: React.ReactNode }> = ({ title, content }) => {
  return (
    <main className="container" style={{ padding: '4rem 2rem', maxWidth: '800px' }}>
      <div className="glass-card">
        <h1 className="text-gradient" style={{ marginBottom: '2rem' }}>{title}</h1>
        <div className="text-secondary" style={{ lineHeight: '1.8' }}>
          {content}
        </div>
      </div>
    </main>
  );
};
