import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import CaseStudyPage from './pages/CaseStudy';
import Admin from './pages/Admin';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import FloatingContact from './components/FloatingContact';
import ErrorBoundary from './components/ErrorBoundary';
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';

import { Toaster } from 'react-hot-toast';

export default function App() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  return (
    <ErrorBoundary>
      <Toaster position="top-right" toastOptions={{
        style: {
          background: '#1A0B2E',
          color: '#fff',
          border: '1px solid rgba(138, 43, 226, 0.2)',
        },
      }} />
      <Router>
        <div className="min-h-screen bg-bg dot-grid selection:bg-primary-accent selection:text-white">
          <Navbar user={user} />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/case-study/:slug" element={<CaseStudyPage />} />
              <Route path="/admin" element={<Admin user={user} loading={loading} />} />
            </Routes>
          </main>
          <Footer />
          <FloatingContact />
        </div>
      </Router>
    </ErrorBoundary>
  );
}
