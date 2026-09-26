import React from 'react';

interface ArabiSignatureProps {
  className?: string;
  color?: string;
  strokeWidth?: number;
}

export const ArabiSignature: React.FC<ArabiSignatureProps> = ({
  className = 'w-6 h-6',
  color = 'currentColor',
  strokeWidth = 2.2,
}) => {
  return (
    <svg
      viewBox="0 0 120 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Arabi signature"
    >
      {/* Top horizontal baseline & geometric loop structure mirroring Arabi's signature */}
      <path
        d="M 12 34 L 88 34"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Top box structure at top right */}
      <path
        d="M 64 34 L 72 16 L 94 16 L 88 34"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Dynamic diagonal slicing down-left through the center */}
      <path
        d="M 72 16 L 56 64"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Left glyph loop */}
      <path
        d="M 38 34 L 18 46 L 36 46"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Center geometric knot/diamond */}
      <path
        d="M 44 54 L 56 64 L 64 54 L 54 44"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Right lower zig-zag flourish */}
      <path
        d="M 68 48 L 84 48 L 68 62 L 86 62 L 72 74"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Bottom heavy baseline arrow pointing right */}
      <path
        d="M 38 74 L 104 71"
        stroke={color}
        strokeWidth={strokeWidth + 0.4}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Arrow tip flourish */}
      <path
        d="M 98 67 L 105 71 L 99 76"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Bottom triangular hook anchor */}
      <path
        d="M 38 74 L 62 94 L 78 74"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
