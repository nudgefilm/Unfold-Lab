
import React from 'react';
import { useApp } from '../../store/AppContext';

const LabIntro: React.FC = () => {
  const { settings } = useApp();

  // "인사이트 추출." 문구(마침표 포함)를 오렌지색으로 강조하는 함수
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
    // 마침표가 없는 경우도 대비하여 폴백 처리
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
      {/* Background Graphic - Enhanced Data & Investigation Visuals */}
      <div className="absolute inset-0 opacity-15 pointer-events-none">
        <svg viewBox="0 0 1000 1000" className="w-full h-full text-orange-500/20">
          {/* Pulsing Concentric Circles (Scanning) */}
          <circle cx="800" cy="400" r="300" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="10 20" className="animate-pulse-slow" />
          <circle cx="800" cy="400" r="200" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="5 10" />
          <circle cx="800" cy="400" r="100" fill="none" stroke="currentColor" strokeWidth="1" />

          {/* Abstract Data Nodes representing evidence points */}
          <g className="animate-float">
            <path d="M700 300 L850 250 L900 450 L750 500 Z" fill="none" stroke="currentColor" strokeWidth="0.5" />
            <circle cx="700" cy="300" r="3" fill="currentColor" />
            <circle cx="850" cy="250" r="3" fill="currentColor" />
            <circle cx="900" cy="450" r="3" fill="currentColor" />
            <circle cx="750" cy="500" r="3" fill="currentColor" />
            {/* Connecting lines */}
            <line x1="700" y1="300" x2="800" y2="400" stroke="currentColor" strokeWidth="0.2" />
            <line x1="850" y1="250" x2="800" y2="400" stroke="currentColor" strokeWidth="0.2" />
            <line x1="900" y1="450" x2="800" y2="400" stroke="currentColor" strokeWidth="0.2" />
          </g>

          {/* Horizontal Scanning Line */}
          <rect x="0" y="0" width="1000" height="2" fill="currentColor" opacity="0.5">
            <animate attributeName="y" values="0;1000;0" dur="8s" repeatCount="indefinite" />
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
            {/* Stat Cards - Styled according to the design guide */}
            <div className="group p-10 rounded-3xl bg-zinc-900/40 border border-white/5 backdrop-blur-xl hover:border-orange-500/30 transition-all duration-500">
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
              <div className="p-8 rounded-3xl bg-zinc-900/40 border border-white/5 backdrop-blur-md hover:border-white/10 transition-all duration-500">
                <div className="text-[28.8px] font-black text-orange-500 tracking-tighter mb-2">
                  {settings.labStat2Value}
                </div>
                <div className="text-zinc-500 font-bold text-xs uppercase tracking-widest leading-relaxed">
                  {settings.labStat2Label}
                </div>
              </div>
              
              <div className="p-8 rounded-3xl bg-zinc-900/40 border border-white/5 backdrop-blur-md hover:border-white/10 transition-all duration-500">
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
