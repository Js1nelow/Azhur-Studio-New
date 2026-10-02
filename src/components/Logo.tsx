import React from 'react';

interface LogoProps {
  className?: string;
  variant?: 'gap' | 'minimal' | 'corner';
  showSubtitle?: boolean;
}

export function Logo({ className = '', variant = 'gap', showSubtitle = true }: LogoProps) {
  return (
    <div className={`flex items-center gap-3 select-none group cursor-pointer ${className}`}>
      {/* Vector Icon Mark */}
      <div className="shrink-0 transition-transform duration-300 group-hover:scale-105">
        {variant === 'gap' && (
          <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Ceiling plane datum line */}
            <line x1="4" y1="5" x2="30" y2="5" stroke="#0F172A" strokeWidth="2.5" strokeLinecap="round" />
            {/* Shadow gap accent (EuroKRAAB terracotta line) */}
            <line x1="9" y1="9" x2="25" y2="9" stroke="#E05A2B" strokeWidth="2" strokeLinecap="round" />
            {/* Architectural Letter 'A' */}
            <path d="M6 29L17 13L28 29" stroke="#0F172A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            <line x1="10.5" y1="22.5" x2="23.5" y2="22.5" stroke="#E05A2B" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
        )}

        {variant === 'minimal' && (
          <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Pure geometric A with suspended light line */}
            <path d="M5 29L17 5L29 29" stroke="#0F172A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            <line x1="8" y1="20" x2="26" y2="20" stroke="#E05A2B" strokeWidth="2.5" strokeLinecap="round" />
            <circle cx="17" cy="12" r="1.5" fill="#E05A2B" />
          </svg>
        )}

        {variant === 'corner' && (
          <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Wall and ceiling 90deg intersection with light line */}
            <path d="M5 29V6C5 5.44772 5.44772 5 6 5H29" stroke="#0F172A" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="11" y1="11" x2="29" y2="11" stroke="#E05A2B" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M12 29L18 18L24 29" stroke="#0F172A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <line x1="14.5" y1="25" x2="21.5" y2="25" stroke="#E05A2B" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        )}
      </div>

      {/* Typography Brandmark */}
      <div className="flex flex-col leading-none">
        <div className="flex items-center gap-1">
          <span className="font-sans font-extrabold text-xl sm:text-2xl tracking-tight text-gray-950 transition-colors group-hover:text-brand-red">
            АЖУР
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-brand-red mb-1 shrink-0" />
        </div>
        {showSubtitle && (
          <span className="text-[9px] font-bold text-gray-500 uppercase tracking-[0.22em] mt-0.5">
            студия потолков
          </span>
        )}
      </div>
    </div>
  );
}
