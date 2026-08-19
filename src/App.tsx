import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import { Studio } from './pages/Studio';
import { Admin } from './pages/Admin';
import { Pricing } from './pages/Pricing';
import { Contact } from './pages/Contact';
import { FAQ, Privacy, Terms, Refund, Disclaimer } from './pages/Legal';
import { Auth } from './pages/Auth';
import { Checkout } from './pages/Checkout';
import { Header } from './components/Header';
import ScrollToTop from './components/ScrollToTop';
import { AuthProvider } from './context/AuthContext';
import { Shield, Mail, Zap, Info } from 'lucide-react';
import './App.css';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const isAdmin = location.pathname.startsWith('/admin');
  const [footerClickCount, setFooterClickCount] = useState(0);

  const handleFooterBrandClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const newCount = footerClickCount + 1;
    setFooterClickCount(newCount);
    if (newCount >= 5) {
      setFooterClickCount(0);
      navigate('/admin');
    } else {
      navigate('/');
    }
  };

  return (
    <>
      {!isAdmin && <Header />}
      {children}
      {!isAdmin && (
        <footer className="footer">
          <div className="footer-grid">
            <div className="footer-col">
              <a href="/" onClick={handleFooterBrandClick} className="header-brand" style={{ marginBottom: '1rem', textDecoration: 'none', cursor: 'pointer', userSelect: 'none' }}>
                <Shield style={{ color: '#4f46e5' }} size={28} />
                <span style={{ color: '#a5b4fc' }}>ZeroCopyright</span>
              </a>
              <p>
                The world's most advanced simulation-based video optimization platform. 
                Trusted by content creators worldwide for processing simulations.
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-primary)' }}>
                <Mail size={18} color="#4f46e5" /> zerocopyright7@gmail.com
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
            <div style={{ fontStyle: 'italic', opacity: 0.7 }}>"This tool is for content optimization simulation only. We do not promote or support copyright infringement."</div>
          </div>
        </footer>
      )}
    </>
  );
};

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Layout>
          <Routes>
            <Route path="/" element={<Studio />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/refund" element={<Refund />} />
            <Route path="/disclaimer" element={<Disclaimer />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
