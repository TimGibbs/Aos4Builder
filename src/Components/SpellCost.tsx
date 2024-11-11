import React, { CSSProperties } from 'react';

const SpellCost: React.FC<{ number:number, style?: CSSProperties;}>  = ({ number, style }) => {
  return (
    <svg style={style} viewBox="0 0 100 100">
      <circle cx="50" cy="50" r="45" fill="black" stroke="white" strokeWidth="5" />
      
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

export default SpellCost