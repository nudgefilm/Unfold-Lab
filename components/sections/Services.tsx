
import React from 'react';
import { useApp } from '../../store/AppContext';

const Services: React.FC = () => {
  const { settings } = useApp();

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'trajectory':
        return (
          <svg className="w-8 h-8 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
          </svg>
        );
      case 'profiling':
        return (
          <svg className="w-8 h-8 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
        );
      case 'factcheck':
        return (
          <svg className="w-8 h-8 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
        );
      case 'visualization':
        return (
          <svg className="w-8 h-8 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        );
      default:
        return (
          <svg className="w-8 h-8 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
    }
  };

  return (
    <section id="services" className="py-32 bg-zinc-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16">
          <h2 className="text-orange-500 font-bold tracking-widest text-sm uppercase mb-4">WHAT WE DO</h2>
          <h3 className="text-4xl md:text-5xl font-bold text-white tracking-tighter">데이터를 통해 가치를 설계합니다.</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {(settings.services || []).map((s) => (
            <div key={s.id} className="group p-8 rounded-2xl bg-black border border-white/5 hover:border-orange-500/50 transition-all duration-500 flex flex-col h-full">
              <div className="mb-8 p-4 bg-zinc-900 rounded-xl inline-block group-hover:bg-orange-500/10 transition-colors w-fit">
                {getIcon(s.icon)}
              </div>
              <h4 className="text-lg font-bold text-white mb-4 group-hover:text-orange-500 transition-colors leading-snug">
                {s.title}
              </h4>
              <p className="text-gray-400 text-sm leading-relaxed mt-auto">
                {s.description}
              </p>
            </div>
          ))}
        </div>

        <div className="flex justify-center">
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
      </div>
    </section>
  );
};

export default Services;
