
import React from 'react';
import { useApp } from '../../store/AppContext';

const Hero: React.FC = () => {
  const { settings, setCurrentView } = useApp();

  // Split title to handle the specific line breaks and coloring
  const titleLines = settings.heroTitle.split('\n');

  return (
    <section id="hero" className="relative min-h-screen pt-32 pb-20 flex flex-col justify-center overflow-hidden bg-black">
      
      {/* Visual background with Enhanced Moving Lights */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
        
        {/* Layer 1: Ambient Roaming Spotlight (Orange) */}
        <div className="absolute top-[-25%] left-[-25%] w-[150%] h-[150%] opacity-30 animate-spotlight">
          <div className="w-full h-full bg-[radial-gradient(circle_at_center,rgba(255,92,0,0.12)_0%,transparent_50%)] blur-[100px]"></div>
        </div>

        {/* Layer 2: Roaming Spotlight (Cool White) */}
        <div className="absolute bottom-[-20%] right-[-20%] w-[130%] h-[130%] opacity-15 animate-spotlight" style={{ animationDirection: 'reverse', animationDuration: '25s' }}>
          <div className="w-full h-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08)_0%,transparent_45%)] blur-[120px]"></div>
        </div>

        {/* Layer 3: Cinematic Beams (Investigative Searchlight feeling) */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-[200%] bg-gradient-to-b from-transparent via-white/[0.03] to-transparent animate-beam"></div>
          <div className="absolute top-0 left-1/4 w-[2px] h-full bg-gradient-to-b from-transparent via-orange-500/10 to-transparent animate-beam" style={{ animationDelay: '-4s', animationDuration: '15s' }}></div>
          <div className="absolute top-0 right-1/4 w-[1px] h-full bg-gradient-to-b from-transparent via-white/5 to-transparent animate-beam" style={{ animationDelay: '-8s', animationDuration: '18s' }}></div>
        </div>

        {/* Layer 4: Soft flowing curves (SVG based) */}
        <svg className="absolute inset-0 w-full h-full opacity-30 blur-3xl animate-flow" viewBox="0 0 1000 1000" preserveAspectRatio="none">
          <defs>
            <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#333" />
              <stop offset="50%" stopColor="#111" />
              <stop offset="100%" stopColor="#000" />
            </linearGradient>
          </defs>
          <path d="M0,500 C200,300 400,700 600,500 C800,300 1000,700 1000,500 L1000,1000 L0,1000 Z" fill="url(#grad1)" />
        </svg>

        {/* Layer 5: Highlight Folds (Fabric/Metal edges) */}
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-1/4 left-[-10%] w-[120%] h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent rotate-12 animate-fold-sweep"></div>
          <div className="absolute top-1/3 left-[-10%] w-[120%] h-[2px] bg-gradient-to-r from-transparent via-white/5 to-transparent -rotate-6 animate-fold-sweep" style={{ animationDelay: '-5s' }}></div>
          <div className="absolute top-2/3 left-[-10%] w-[120%] h-[1px] bg-gradient-to-r from-transparent via-white/15 to-transparent rotate-45 animate-fold-sweep" style={{ animationDelay: '-10s' }}></div>
        </div>

        {/* Constant base glow */}
        <div className="absolute bottom-0 left-1/4 w-[50%] h-[50%] bg-orange-500/5 rounded-full blur-[180px] animate-pulse-soft"></div>
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-left md:pl-[10%]">
        <div className="inline-block px-4 py-1.5 mb-8 rounded-full border border-orange-500/30 bg-orange-500/5 backdrop-blur-sm text-orange-500 text-xs font-bold tracking-widest uppercase">
          Technology > Data Analytics & Investigation
        </div>
        
        <h1 className="flex flex-col mb-10 tracking-tighter leading-[1.05] font-black">
          <span className="text-white text-5xl md:text-7xl lg:text-8xl">
            {titleLines[0]}
          </span>
          <span className="text-orange-500 text-5xl md:text-7xl lg:text-8xl">
            {titleLines[1]}
          </span>
        </h1>
        
        <p className="max-w-2xl text-zinc-400 text-lg md:text-xl lg:text-2xl mb-14 font-medium leading-relaxed">
          {settings.heroDescription}
        </p>

        <div className="flex flex-wrap gap-5">
          <button 
            onClick={() => setCurrentView('services')}
            className="px-10 py-5 bg-orange-500 text-white font-black rounded-lg hover:bg-orange-600 transition-all shadow-xl shadow-orange-500/20 text-lg uppercase tracking-tight"
          >
            서비스 보기
          </button>
          <button 
            onClick={() => setCurrentView('contact')}
            className="px-10 py-5 bg-white/5 text-white border border-white/10 backdrop-blur-sm font-black rounded-lg hover:bg-white/10 transition-all text-lg uppercase tracking-tight"
          >
            문의하기
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
