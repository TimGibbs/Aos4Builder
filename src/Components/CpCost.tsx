import React, { CSSProperties } from 'react';

const CpCost: React.FC<{ number: number, style?: CSSProperties; }> = ({ number, style }) => {
    return (
        <svg style={style} viewBox="0 0 100 100">
            <polygon
                points="50,5 90,25 90,75 50,95 10,75 10,25"
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

export default CpCost