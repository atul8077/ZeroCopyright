import React, { useRef } from 'react';
import { UploadCloud } from 'lucide-react';

interface DropZoneProps {
  onFilesSelected: (files: FileList) => void;
}

export const DropZone: React.FC<DropZoneProps> = ({ onFilesSelected }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      onFilesSelected(e.dataTransfer.files);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onFilesSelected(e.target.files);
    }
  };

  return (
    <div 
      className="dropzone glass-card"
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
      onClick={() => fileInputRef.current?.click()}
    >
      <UploadCloud className="dropzone-icon" />
      <h2 style={{ margin: 0 }}>Drag & Drop Media Files</h2>
      <p className="text-secondary" style={{ margin: 0 }}>
        Supports Images (.jpg, .png), Audio (.mp3, .wav), Video (.mp4)
      </p>
      <button className="btn btn-primary" onClick={(e) => {
        e.stopPropagation();
        fileInputRef.current?.click();
      }}>Select Files</button>
      <input 
        type="file" 
        multiple 
        ref={fileInputRef} 
        onChange={handleChange} 
        style={{ display: 'none' }} 
        accept="image/*,audio/*,video/*"
      />
    </div>
  );
};
