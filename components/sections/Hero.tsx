
import React from 'react';
import { useApp } from '../../store/AppContext';

const Hero: React.FC = () => {
  const { settings, setCurrentView } = useApp();

  // Split title to handle the specific line breaks and coloring
  const titleLines = settings.heroTitle.split('\n');

  return (
    <section id="hero" className="relative min-h-screen pt-32 pb-20 flex flex-col justify-center overflow-hidden bg-black">
      
      {/* Light Movement Background Layers */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Glowing Orb 1 - Orange */}
        <div className="absolute top-[-10%] left-[-10%] w-[80%] h-[80%] bg-orange-500/10 rounded-full blur-[150px] animate-drift-1"></div>
        
        {/* Glowing Orb 2 - Subtle Zinc/White */}
        <div className="absolute bottom-[-10%] right-[-10%] w-[70%] h-[70%] bg-zinc-500/5 rounded-full blur-[120px] animate-drift-2"></div>
        
        {/* Shimmering Light Beams */}
        <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-orange-500/40 to-transparent animate-shimmer" style={{ top: '20%' }}></div>
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" style={{ top: '50%', animationDelay: '-4s' }}></div>
            <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-transparent via-orange-500/30 to-transparent animate-shimmer" style={{ top: '80%', animationDelay: '-8s' }}></div>
        </div>
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
        
        <p className="max-w-none text-white text-lg md:text-xl lg:text-2xl mb-14 font-medium whitespace-nowrap overflow-visible">
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
