import React from 'react';

const Logo: React.FC = () => {
  return (
    <svg 
      className="app-logo"
      viewBox="0 0 540 100"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="logoGradient" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#6366f1" />
          <stop offset="100%" stopColor="#a855f7" />
        </linearGradient>
      </defs>
      
      <g fill="url(#logoGradient)">
        <circle cx="50" cy="50" r="50" />
        <path d="M85 75 C 95 68, 115 76, 128 93 C 145 88, 138 96, 152 85 C 145 98, 115 101, 100 82 C 90 79, 85 85, 85 75 Z" />
      </g>
      
      <g fill="var(--background-color)">
        <circle cx="50" cy="22" r="12" /> 
        <circle cx="50" cy="78" r="12" />
        <circle cx="22" cy="50" r="12" />
        <circle cx="78" cy="50" r="12" />
        <circle cx="50" cy="50" r="9" /> 
        
        <rect x="106" y="82" width="4" height="4" rx="1" />
        <rect x="113" y="85" width="4" height="4" rx="1" />
        <rect x="120" y="88" width="4" height="4" rx="1" />
      </g>
      
      <text 
        x="140" 
        y="78" 
        fontFamily="Inter, system-ui, sans-serif" 
        fontSize="80" 
        fontWeight="bold" 
        fill="white"
      >
        KINORATE
      </text>
    </svg>
  );
};

export default Logo;