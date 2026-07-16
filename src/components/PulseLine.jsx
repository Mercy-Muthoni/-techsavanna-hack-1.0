import React from 'react';

const PulseLine = ({ color = '#1976D2', height = 2 }) => {
  return (
    <svg width="100%" height={height} viewBox="0 0 100 2" preserveAspectRatio="none">
      <path 
        d="M0,1 L20,1 L25,0.3 L30,1.7 L35,1 L65,1 L70,0.3 L75,1.7 L80,1 L100,1" 
        stroke={color} 
        strokeWidth="1.5" 
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default PulseLine;