import React, { useState } from 'react';
import { FileImage, FileAudio, FileVideo, CheckCircle, Circle, Loader2, Download } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

interface FileCardProps {
  file: File;
  onRemove: () => void;
}

const steps = [
  "Initializing AI engine...",
  "Extracting metadata & EXIF data...",
  "Content fingerprint analysis...",
  "Perceptual hash normalization...",
  "Deep-clean encoding pipeline...",
  "Re-muxing stream (H.264/AAC)...",
  "Verifying output integrity...",
  "Complete"
];

export const FileCard: React.FC<FileCardProps> = ({ file, onRemove }) => {
  const [status, setStatus] = useState<'idle' | 'processing' | 'done'>('idle');
  const [progress, setProgress] = useState(0);
  const [cleanedUrl, setCleanedUrl] = useState<string | null>(null);
  
  const { user } = useAuth();
  const navigate = useNavigate();

  const isImage = file.type.startsWith('image/');
  const isAudio = file.type.startsWith('audio/');
  
  const fileType = isImage ? 'Image' : isAudio ? 'Audio' : 'Video';

  const startProcessing = () => {
    setStatus('processing');
    setProgress(0);
    
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          clearInterval(interval);
          finishProcessing();
          return 100;
        }
        return p + 1;
      });
    }, 120);
  };

  const finishProcessing = async () => {
    if (isImage) {
      const objectUrl = URL.createObjectURL(file);
      const img = new Image();
      img.src = objectUrl;
      await new Promise((resolve) => {
        img.onload = () => {
          const canvas = document.createElement('canvas');
          canvas.width = img.width;
          canvas.height = img.height;
          const ctx = canvas.getContext('2d');
          if (ctx) {
            ctx.drawImage(img, 0, 0);
            canvas.toBlob((blob) => {
              if (blob) {
                setCleanedUrl(URL.createObjectURL(blob));
              }
              resolve(true);
            }, file.type);
          }
        };
      });
    } else {
      setCleanedUrl(URL.createObjectURL(file));
    }
    setStatus('done');
  };

  const handleDownload = () => {
    if (cleanedUrl) {
      const a = document.createElement('a');
      a.href = cleanedUrl;
      a.download = `clean_${file.name}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      
      if (!user) {
        navigate('/auth');
      }
    }
  };

  const currentStepIndex = Math.min(Math.floor((progress / 100) * steps.length), steps.length - 1);

  if (status === 'idle') {
    return (
      <div className="glass-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.5rem', width: '100%', boxSizing: 'border-box' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            {isImage ? <FileImage size={24} color="#10b981" /> : isAudio ? <FileAudio size={24} color="#6366f1" /> : <FileVideo size={24} color="#ef4444" />}
          </div>
          <div style={{ overflow: 'hidden' }}>
            <div style={{ fontWeight: 600, marginBottom: '0.25rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '300px' }}>{file.name}</div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{(file.size / 1024 / 1024).toFixed(2)} MB • Ready</div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '1rem', flexShrink: 0 }}>
          <button className="btn btn-secondary" onClick={onRemove}>Cancel</button>
          <button className="btn btn-primary" onClick={startProcessing}>Remove Copyright</button>
        </div>
      </div>
    );
  }

  if (status === 'done') {
    return (
      <div className="glass-card" style={{ padding: '4rem 2rem', background: '#11131a', border: '1px solid rgba(255,255,255,0.05)', width: '100%', boxSizing: 'border-box', textAlign: 'center' }}>
        <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'rgba(16, 185, 129, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 2rem' }}>
          <CheckCircle size={40} color="#10b981" />
        </div>
        <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem', fontWeight: 700 }}>Your {fileType.toLowerCase()} is ready!</h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '3rem', fontSize: '1.1rem' }}>
          The content optimization simulation is complete. You can now download your optimized {fileType.toLowerCase()}.
        </p>
        
        <button className="btn-login" onClick={handleDownload} style={{ width: '100%', maxWidth: '350px', padding: '1rem', fontSize: '1.1rem', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', margin: '0 auto', borderRadius: '12px' }}>
          <Download size={20} /> Download Optimized {fileType}
        </button>
        
        <div style={{ marginTop: '2rem' }}>
          <button style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', fontSize: '1rem' }} onClick={onRemove}>Process another {fileType.toLowerCase()}</button>
        </div>
      </div>
    );
  }

  return (
    <div className="glass-card" style={{ padding: '2.5rem', background: '#11131a', border: '1px solid rgba(255,255,255,0.05)', width: '100%', boxSizing: 'border-box' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '1.5rem' }}>
        <div>
          <h2 style={{ fontSize: '1.75rem', marginBottom: '0.5rem', margin: 0, fontWeight: 700 }}>Processing {fileType}...</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', margin: 0 }}>Please do not refresh or close this tab</p>
        </div>
        <div className="text-gradient" style={{ fontSize: '3rem', fontWeight: 800, lineHeight: 1 }}>{progress}%</div>
      </div>
      
      {/* Progress Bar */}
      <div style={{ height: '14px', background: 'rgba(255,255,255,0.05)', borderRadius: '7px', overflow: 'hidden', marginBottom: '3rem' }}>
        <div style={{ width: `${progress}%`, height: '100%', background: 'linear-gradient(90deg, #3b82f6, #a855f7)', transition: 'width 0.2s linear' }}></div>
      </div>

      {/* Steps Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
        {steps.map((step, idx) => {
          const isCompleted = idx < currentStepIndex;
          const isActive = idx === currentStepIndex && status === 'processing';
          const isPending = idx > currentStepIndex;
          
          return (
            <div key={idx} style={{ 
              display: 'flex', alignItems: 'center', gap: '1rem',
              padding: isActive ? '0.8rem 1.2rem' : '0.5rem',
              background: isActive ? 'rgba(59, 130, 246, 0.05)' : 'transparent',
              border: isActive ? '1px solid rgba(59, 130, 246, 0.2)' : '1px solid transparent',
              borderRadius: '12px',
              transition: 'all 0.3s ease'
            }}>
              {isCompleted && <CheckCircle size={22} color="#10b981" />}
              {isActive && <Loader2 size={22} color="#3b82f6" className="animate-spin" />}
              {isPending && <Circle size={22} color="rgba(255,255,255,0.05)" />}
              
              <span style={{ 
                color: isCompleted ? 'var(--text-secondary)' : isActive ? 'var(--text-primary)' : 'rgba(255,255,255,0.2)',
                fontWeight: isActive ? 600 : 400,
                fontSize: '1rem'
              }}>
                {step}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
