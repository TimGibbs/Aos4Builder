import React, { CSSProperties } from 'react';

const PrayerCost: React.FC<{ number:number, style?: CSSProperties;}>  = ({ number, style }) => {
  return (
    <svg style={style} viewBox="0 0 100 100">
      <polygon
        points="50,5 95,50 50,95 5,50"
        fill="black"
        stroke="white"
        strokeWidth="5"
      />
      
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        fill="white"
        fontSize="44"
        dy=".35em"
        fontFamily="Arial, sans-serif"
      >
        {number}
      </text>
    </svg>
  );
};

export default PrayerCost