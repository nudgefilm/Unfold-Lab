
import React from 'react';
import { useApp } from '../../store/AppContext';

const LabIntro: React.FC = () => {
  const { settings } = useApp();

  const renderHighlightedTitle = (title: string) => {
    const target = "인사이트 추출.";
    if (title.includes(target)) {
      const parts = title.split(target);
      return (
        <>
          {parts[0]}
          <span className="text-orange-500">{target}</span>
          {parts[1]}
        </>
      );
    }
    const targetNoDot = "인사이트 추출";
    if (title.includes(targetNoDot)) {
      const parts = title.split(targetNoDot);
      return (
        <>
          {parts[0]}
          <span className="text-orange-500">{targetNoDot}</span>
          {parts[1]}
        </>
      );
    }
    return title;
  };

  return (
    <section id="lab-intro" className="relative py-32 bg-black overflow-hidden border-t border-white/5">
      
      {/* Background Graphic with Moving Spotlight */}
      <div className="absolute inset-0 pointer-events-none opacity-20 overflow-hidden">
        
        {/* Investigative Spotlight: Cold white light wandering */}
        <div className="absolute top-0 left-0 w-full h-full opacity-40 animate-spotlight" style={{ animationDuration: '30s' }}>
          <div className="absolute w-[800px] h-[800px] bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08)_0%,transparent_70%)] blur-[100px] rounded-full"></div>
        </div>

        <svg viewBox="0 0 1000 1000" className="relative w-full h-full">
          <defs>
            <radialGradient id="foldGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#444" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#000" stopOpacity="0" />
            </radialGradient>
          </defs>
          {/* Abstract Curves mimicking folding surfaces */}
          <path 
            d="M-200,1000 Q300,500 1200,1000" 
            fill="none" 
            stroke="url(#foldGrad)" 
            strokeWidth="150" 
            className="animate-pulse-soft"
          />
          <path 
            d="M-200,800 Q400,300 1200,800" 
            fill="none" 
            stroke="url(#foldGrad)" 
            strokeWidth="80" 
            style={{ animationDelay: '-2s' }}
            className="animate-pulse-soft"
          />
          
          {/* Subtle Scanning Light */}
          <rect x="0" y="0" width="1000" height="1" fill="white" opacity="0.1">
            <animate attributeName="y" values="0;1000;0" dur="15s" repeatCount="indefinite" />
          </rect>
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div>
            <h2 className="text-orange-500 font-bold tracking-[0.25em] text-xs uppercase mb-8 flex items-center gap-4">
              <span className="w-12 h-[1px] bg-orange-500"></span>
              LAB Introduction
            </h2>
            <h3 className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-10 leading-[1.15] whitespace-pre-line">
              {renderHighlightedTitle(settings.labIntroTitle)}
            </h3>
            <p className="text-zinc-400 text-lg md:text-xl leading-relaxed font-medium max-w-xl">
              {settings.labIntroDescription}
            </p>
          </div>

          <div className="space-y-8">
            <div className="group p-10 rounded-3xl glass hover:border-orange-500/30 transition-all duration-500">
              <div className="flex flex-col">
                <span className="text-[28.8px] md:text-[36px] font-black text-orange-500 tracking-tighter mb-2">
                  {settings.labStat1Value}
                </span>
                <span className="text-zinc-500 font-bold text-sm uppercase tracking-widest leading-tight">
                  {settings.labStat1Label}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-8 rounded-3xl glass hover:border-white/10 transition-all duration-500">
                <div className="text-[28.8px] font-black text-orange-500 tracking-tighter mb-2">
                  {settings.labStat2Value}
                </div>
                <div className="text-zinc-500 font-bold text-xs uppercase tracking-widest leading-relaxed">
                  {settings.labStat2Label}
                </div>
              </div>
              
              <div className="p-8 rounded-3xl glass hover:border-white/10 transition-all duration-500">
                <div className="text-[28.8px] font-black text-orange-500 tracking-tighter mb-2">
                  {settings.labStat3Value}
                </div>
                <div className="text-zinc-500 font-bold text-xs uppercase tracking-widest leading-relaxed">
                  {settings.labStat3Label}
                </div>
              </div>
            </div>
            
            <p className="text-[10px] text-zinc-600 font-bold tracking-widest uppercase text-right opacity-40">
              UNFOLD LAB Investigative Protocol v4.0
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LabIntro;
