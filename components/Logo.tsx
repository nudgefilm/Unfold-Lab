
import React from 'react';

interface LogoProps {
  brandName: string;
  className?: string;
  variant?: 'header' | 'footer';
}

const Logo: React.FC<LogoProps> = ({ brandName, className = "", variant = 'header' }) => {
  const renderBrandName = (name: string) => {
    if (name.toUpperCase().startsWith('UNFOLD')) {
      return (
        <>
          <span className="text-orange-500">UNFOLD</span>
          {name.slice(6)}
        </>
      );
    }
    return name;
  };

  return (
    <div className={`flex items-center gap-3 group ${className}`}>
      {variant === 'header' ? (
        /* Sharp orange square box for Header only - size reduced by 10% from w-8 (32px) to 28.8px */
        <div className="relative w-[28.8px] h-[28.8px] bg-orange-500 transition-transform duration-500 ease-in-out group-hover:rotate-90 shadow-lg shadow-orange-500/20 flex-shrink-0 rounded-none">
        </div>
      ) : (
        /* Footer variant: Simple accent circle or just text */
        <div className="w-2 h-8 bg-orange-500 rounded-full flex-shrink-0"></div>
      )}
      <span className={`${variant === 'header' ? 'text-2xl text-glow' : 'text-xl'} font-black tracking-tighter text-white whitespace-nowrap`}>
        {renderBrandName(brandName)}
      </span>
    </div>
  );
};

export default Logo;