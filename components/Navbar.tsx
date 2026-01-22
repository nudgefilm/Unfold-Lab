
import React, { useState } from 'react';
import { useApp } from '../store/AppContext';
import Logo from './Logo';

const Navbar: React.FC = () => {
  const { currentView, setCurrentView, settings } = useApp();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleHomeClick = () => {
    setCurrentView('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavClick = (view: any) => {
    if (view === 'home') {
      handleHomeClick();
    } else if (view === 'lab') {
      setCurrentView('home');
      setTimeout(() => {
        const element = document.getElementById('lab-intro');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else if (view === 'services') {
      setCurrentView('home');
      setTimeout(() => {
        const element = document.getElementById('services');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else if (view === 'blog') {
      setCurrentView('home');
      setTimeout(() => {
        const element = document.getElementById('blog');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      setCurrentView(view);
      // '문의하기' 뷰 전환 시 페이지 최상단으로 이동
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const menuItems = [
    { label: '홈', view: 'home' as const },
    { label: 'LAB 소개', view: 'lab' as const },
    { label: '서비스', view: 'services' as const },
    { label: '블로그', view: 'blog' as const },
    { label: '문의하기', view: 'contact' as const },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-black/80 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div 
            className="flex-shrink-0 cursor-pointer"
            onClick={handleHomeClick}
          >
            <Logo brandName={settings.brandName} variant="header" />
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-16">
            {menuItems.map((item) => (
              <button
                key={item.view}
                onClick={() => handleNavClick(item.view)}
                className={`text-sm font-bold tracking-tight transition-colors hover:text-orange-500 ${
                  currentView === item.view ? 'text-orange-500' : 'text-gray-400'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-400 hover:text-white"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-black border-b border-white/10">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {menuItems.map((item) => (
              <button
                key={item.view}
                onClick={() => handleNavClick(item.view)}
                className="block w-full text-left px-3 py-2 text-base font-medium text-gray-300 hover:text-orange-500"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
