
import React, { useEffect } from 'react';
import { AppProvider, useApp } from './store/AppContext.tsx';
import Navbar from './components/Navbar.tsx';
import Footer from './components/Footer.tsx';
import Hero from './components/sections/Hero.tsx';
import LabIntro from './components/sections/LabIntro.tsx';
import Services from './components/sections/Services.tsx';
import Blog from './components/sections/Blog.tsx';
import Contact from './components/sections/Contact.tsx';
import Dashboard from './components/admin/Dashboard.tsx';

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
