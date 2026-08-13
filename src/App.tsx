import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { Studio } from './pages/Studio';
import { Admin } from './pages/Admin';
import { Pricing } from './pages/Pricing';
import { Contact } from './pages/Contact';
import { FAQ, Privacy, Terms, Refund, Disclaimer } from './pages/Legal';
import { Auth } from './pages/Auth';
import { Header } from './components/Header';
import ScrollToTop from './components/ScrollToTop';
import { AuthProvider } from './context/AuthContext';
import { Shield, Mail, Zap, Info } from 'lucide-react';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Header />
        <Routes>
          <Route path="/" element={<Studio />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/refund" element={<Refund />} />
          <Route path="/disclaimer" element={<Disclaimer />} />
        </Routes>
        <footer className="footer">
          <div className="footer-grid">
            <div className="footer-col">
              <Link to="/" className="header-brand" style={{ marginBottom: '1rem', textDecoration: 'none' }}>
                <Shield style={{ color: '#4f46e5' }} size={28} />
                <span style={{ color: '#a5b4fc' }}>ZeroCopyright</span>
              </Link>
              <p>
                The world's most advanced privacy-first metadata optimization platform. 
                Trusted by content creators worldwide for secure, client-side scrubbing.
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-primary)' }}>
                <Mail size={18} color="#4f46e5" /> support@zerocopyright.com
              </div>
            </div>
            
            <div className="footer-col">
              <h4><Zap size={18} color="#4f46e5" /> Quick Links</h4>
              <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/pricing">Pricing</Link></li>
                <li><Link to="/faq">FAQ</Link></li>
                <li><Link to="/contact">Contact Us</Link></li>
                <li><Link to="/auth">Login / Sign Up</Link></li>
                <li><Link to="/admin">Admin Panel</Link></li>
              </ul>
            </div>

            <div className="footer-col">
              <h4><Info size={18} color="#4f46e5" /> Legal</h4>
              <ul>
                <li><Link to="/privacy">Privacy Policy</Link></li>
                <li><Link to="/terms">Terms of Service</Link></li>
                <li><Link to="/refund">Refund Policy</Link></li>
                <li><Link to="/disclaimer">Fair Use Disclaimer</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="footer-bottom">
            <div>© 2026 ZeroCopyright. All rights reserved.</div>
            <div style={{ fontStyle: 'italic', opacity: 0.7 }}>"This tool is for privacy optimization only."</div>
          </div>
        </footer>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
