
import React from 'react';
import { useApp } from '../store/AppContext';
import Logo from './Logo';

const Footer: React.FC = () => {
  const { settings, setCurrentView } = useApp();

  const handleHomeClick = () => {
    setCurrentView('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAdminClick = () => {
    setCurrentView('settings');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-black border-t border-white/10 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <div className="cursor-pointer inline-block" onClick={handleHomeClick}>
              <Logo brandName={settings.brandName} variant="footer" className="mb-6" />
            </div>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs mb-8">
              {settings.footerDescription}
            </p>
            <a 
              href="https://t.me/UnfoldLab" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-6 py-3 bg-zinc-900 border border-white/10 rounded-xl text-sm font-bold text-white hover:bg-orange-500 hover:border-orange-500 transition-all duration-300 group shadow-lg shadow-black/50"
            >
              <svg className="w-5 h-5 text-orange-500 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                <path d="M11.944 0C5.346 0 0 5.346 0 11.944c0 6.598 5.346 11.944 11.944 11.944 6.598 0 11.944-5.346 11.944-11.944C23.888 5.346 18.542 0 11.944 0zm5.203 8.32l-1.761 8.303c-.131.583-.478.727-.967.451l-2.684-1.979-1.295 1.246c-.143.143-.263.263-.539.263l.192-2.723 4.956-4.478c.215-.192-.047-.299-.333-.108l-6.125 3.854-2.639-.824c-.574-.18-.585-.574.12-.849l10.311-3.973c.478-.175.895.112.759.817z"/>
              </svg>
              @UnfoldLab 텔레그램 1:1 채팅상담
            </a>
          </div>
          
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-widest mb-6">연락처</h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li>{settings.contactAddress}</li>
              <li>Email: {settings.contactEmail}</li>
              <li className="flex flex-wrap gap-4 mt-6">
                {settings.socialLinks.facebook && (
                  <a href={settings.socialLinks.facebook} target="_blank" rel="noopener noreferrer" className="hover:text-orange-500 transition-colors">Facebook</a>
                )}
                {settings.socialLinks.instagram && (
                  <a href={settings.socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-orange-500 transition-colors">Instagram</a>
                )}
                {settings.socialLinks.twitter && (
                  <a href={settings.socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="hover:text-orange-500 transition-colors">Twitter</a>
                )}
                {settings.socialLinks.youtube && (
                  <a href={settings.socialLinks.youtube} target="_blank" rel="noopener noreferrer" className="hover:text-orange-500 transition-colors">YouTube</a>
                )}
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-widest mb-6">구독</h4>
            <p className="text-sm text-gray-400 mb-6">새로운 데이터 인사이트를 영상으로 만나보세요.</p>
            <a 
              href={settings.socialLinks.youtube || "https://www.youtube.com/@Unfold-Lab"} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block transition-transform duration-300 hover:scale-110 active:scale-95 group"
            >
              <svg className="w-12 h-12 text-orange-500 shadow-xl shadow-orange-500/10 group-hover:drop-shadow-[0_0_15px_rgba(249,115,22,0.4)] transition-all" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
            </a>
          </div>
        </div>
        
        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-zinc-500">
          <p>
            <span 
              onClick={handleAdminClick}
              className="cursor-pointer hover:text-orange-500 transition-all duration-300 font-bold px-1"
              title="관리자 설정"
            >
              ©
            </span> 
            2026 {settings.brandName}. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">이용약관</a>
            <a href="#" className="hover:text-white transition-colors">개인정보처리방침</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
