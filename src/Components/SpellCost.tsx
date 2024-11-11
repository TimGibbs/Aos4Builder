import React from 'react';

const SpellCost: React.FC<{ number:number}>  = ({ number }) => {
  return (
    <svg style={{height:"2em", width:"2em"}} viewBox="0 0 100 100">
      {/* Black circle with white outline */}
      <circle cx="50" cy="50" r="45" fill="black" stroke="white" strokeWidth="5" />
      
      {/* White number text centered in the circle */}
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