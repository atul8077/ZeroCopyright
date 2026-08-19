import React, { useRef, useState } from 'react';
import { FileCard } from '../components/FileCard';
import { Image as ImageIcon, Video, Music, PlayCircle, Star, Zap } from 'lucide-react';

export const Studio: React.FC = () => {
  const [files, setFiles] = useState<File[]>([]);
  
  const audioRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLInputElement>(null);
  const imageRef = useRef<HTMLInputElement>(null);

  const handleFilesSelected = (fileList: FileList | null) => {
    if (!fileList) return;
    const newFiles = Array.from(fileList);
    setFiles(prev => [...prev, ...newFiles]);
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <>
      {/* Top Stats Bar */}
      <div style={{ 
        display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '3rem', 
        padding: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.05)', marginBottom: '3rem',
        flexWrap: 'wrap'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', background: 'rgba(255,255,255,0.03)', padding: '0.5rem 1.25rem', borderRadius: '30px' }}>
          <div style={{ display: 'flex', marginLeft: '0.5rem' }}>
            <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: '#2563eb', marginLeft: '-0.75rem', border: '2px solid #ffffff' }}></div>
            <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: '#10b981', marginLeft: '-0.75rem', border: '2px solid #ffffff' }}></div>
            <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: '#059669', marginLeft: '-0.75rem', border: '2px solid #ffffff' }}></div>
          </div>
          <span style={{ fontSize: '0.9rem', color: 'var(--text-primary)', fontWeight: 500 }}>20k+ Trusted Users</span>
        </div>
        <div style={{ color: 'rgba(255,255,255,0.2)', fontSize: '1.2rem' }}>•</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <PlayCircle size={20} color="#2563eb" />
          <span style={{ fontSize: '0.9rem', color: 'var(--text-primary)', fontWeight: 500 }}>50k+ Media Processed</span>
        </div>
        <div style={{ color: 'rgba(255,255,255,0.2)', fontSize: '1.2rem' }}>•</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ display: 'flex', gap: '4px' }}>
            <Star size={16} color="#eab308" fill="#eab308" />
            <Star size={16} color="#eab308" fill="#eab308" />
            <Star size={16} color="#eab308" fill="#eab308" />
            <Star size={16} color="#eab308" fill="#eab308" />
            <Star size={16} color="#eab308" />
          </div>
          <span style={{ fontSize: '0.9rem', color: 'var(--text-primary)', fontWeight: 500 }}>(4.9/5 Rating)</span>
        </div>
      </div>

      <main className="container">
        {/* Hero Section */}
        <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
          <div style={{ 
            display: 'inline-flex', alignItems: 'center', gap: '0.5rem', 
            background: '#f4f4f5', border: '1px solid #e4e4e7', 
            padding: '0.6rem 1.25rem', borderRadius: '24px', color: '#09090b', fontSize: '0.9rem', fontWeight: 600,
            marginBottom: '2rem'
          }}>
            <Zap size={16} /> New AI Engine 2.0 Live
          </div>
          <h1 style={{ fontSize: '5rem', lineHeight: '1.1', marginBottom: '1.5rem', fontWeight: 800 }}>
            ZeroCopyright <br/>
            <span className="text-gradient">Scrubbing Instantly</span>
          </h1>
          <p className="text-secondary" style={{ fontSize: '1.15rem', maxWidth: '750px', margin: '0 auto', lineHeight: '1.6' }}>
            ZeroCopyright - Professional AI deep-clean technology. Upload your media below to simulate advanced privacy optimization.
          </p>
        </div>

        {/* Upload Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem', marginBottom: '3rem' }}>
          {/* Audio Upload */}
          <div className="glass-card" style={{ textAlign: 'center', padding: '3rem 2rem', cursor: 'pointer' }} onClick={() => audioRef.current?.click()}>
            <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'rgba(37, 99, 235, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', transition: 'all 0.3s ease' }}>
              <Music size={32} color="#2563eb" />
            </div>
            <h3 style={{ marginBottom: '0.5rem' }}>Clean Audio</h3>
            <p className="text-secondary" style={{ fontSize: '0.9rem', marginBottom: '1.5rem' }}>MP3, WAV, M4A</p>
            <button className="btn btn-secondary" style={{ width: '100%' }}>Select Audio</button>
            <input type="file" ref={audioRef} onChange={(e) => handleFilesSelected(e.target.files)} accept="audio/*" multiple style={{ display: 'none' }} />
          </div>

          {/* Video Upload */}
          <div className="glass-card" style={{ textAlign: 'center', padding: '3rem 2rem', cursor: 'pointer' }} onClick={() => videoRef.current?.click()}>
            <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'rgba(239, 68, 68, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', transition: 'all 0.3s ease' }}>
              <Video size={32} color="#ef4444" />
            </div>
            <h3 style={{ marginBottom: '0.5rem' }}>Clean Video</h3>
            <p className="text-secondary" style={{ fontSize: '0.9rem', marginBottom: '1.5rem' }}>MP4, WEBM, MOV</p>
            <button className="btn btn-secondary" style={{ width: '100%' }}>Select Video</button>
            <input type="file" ref={videoRef} onChange={(e) => handleFilesSelected(e.target.files)} accept="video/*" multiple style={{ display: 'none' }} />
          </div>

          {/* Image Upload */}
          <div className="glass-card" style={{ textAlign: 'center', padding: '3rem 2rem', cursor: 'pointer' }} onClick={() => imageRef.current?.click()}>
            <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'rgba(16, 185, 129, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', transition: 'all 0.3s ease' }}>
              <ImageIcon size={32} color="#10b981" />
            </div>
            <h3 style={{ marginBottom: '0.5rem' }}>Clean Image</h3>
            <p className="text-secondary" style={{ fontSize: '0.9rem', marginBottom: '1.5rem' }}>JPG, PNG, WEBP</p>
            <button className="btn btn-secondary" style={{ width: '100%' }}>Select Image</button>
            <input type="file" ref={imageRef} onChange={(e) => handleFilesSelected(e.target.files)} accept="image/*" multiple style={{ display: 'none' }} />
          </div>
        </div>

        {files.length > 0 && (
          <div style={{ marginTop: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h2>Processing Queue ({files.length})</h2>
            </div>
            
            <div className="file-grid">
              {files.map((file, i) => (
                <FileCard key={`${file.name}-${i}`} file={file} onRemove={() => removeFile(i)} />
              ))}
            </div>
          </div>
        )}
      </main>
    </>
  );
};
