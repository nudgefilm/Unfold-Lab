
import React, { useEffect } from 'react';
import { AppProvider, useApp } from './store/AppContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Hero from './components/sections/Hero';
import LabIntro from './components/sections/LabIntro';
import Services from './components/sections/Services';
import Blog from './components/sections/Blog';
import Contact from './components/sections/Contact';
import Dashboard from './components/admin/Dashboard';

const AppContent: React.FC = () => {
  const { currentView, settings } = useApp();

  useEffect(() => {
    document.title = settings.seoTitle || settings.brandName;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', settings.seoDescription);
    }
  }, [settings.seoTitle, settings.seoDescription, settings.brandName]);

  const renderContent = () => {
    switch (currentView) {
      case 'home':
        return (
          <>
            <Hero />
            <LabIntro />
            <Services />
            <Blog />
          </>
        );
      case 'lab':
        return (
          <>
            <Hero />
            <LabIntro />
          </>
        );
      case 'services':
        return <Services />;
      case 'blog':
        return <Blog />;
      case 'contact':
        return <Contact />;
      case 'settings':
        return <Dashboard />;
      default:
        return <Hero />;
    }
  };

  return (
    <div className="min-h-screen bg-black text-white selection:bg-orange-500 selection:text-white">
      <Navbar />
      <main>
        {renderContent()}
      </main>
      <Footer />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
};

export default App;
