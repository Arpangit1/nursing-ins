import React, { useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { SchoolProvider } from './context/SchoolContext';
import Layout from './components/Layout';
import PublicView from './components/PublicView';
import AdminPanel from './components/AdminPanel';
import About from './components/About';
import CoursesPage from './components/CoursesPage';
import GalleryPage from './components/GalleryPage';
import NoticesPage from './components/NoticesPage';
import Admission from './components/Admission';

// Component to scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  return (
    <SchoolProvider>
      <HashRouter>
        <ScrollToTop />
        <Layout>
          <Routes>
            <Route path="/" element={<PublicView />} />
            <Route path="/about" element={<About />} />
            <Route path="/courses" element={<CoursesPage />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/notices" element={<NoticesPage />} />
            <Route path="/admission" element={<Admission />} />
            <Route path="/admin" element={<AdminPanel />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Layout>
      </HashRouter>
    </SchoolProvider>
  );
}

export default App;