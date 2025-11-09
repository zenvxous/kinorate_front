import React from 'react';

const DefaultPoster: React.FC = () => {
  return (
    <svg 
      className="default-poster-svg" 
      viewBox="0 0 200 300" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="200" height="300" fill="var(--surface-color)" />
      
      <g stroke="var(--secondary-text-color)" strokeWidth="8" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path d="M30 200 L80 150 L110 180 L150 140 L180 170" />
        <circle cx="70" cy="80" r="15" />
      </g>
      
      <text 
        x="100" 
        y="250" 
        fontFamily="Inter, system-ui, sans-serif"
        fontSize="24" 
        fontWeight="bold" 
        fill="var(--primary-text-color)" 
        textAnchor="middle"
      >
        Kinorate
      </text>
    </svg>
  );
};

export default DefaultPoster;