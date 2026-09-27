import React from 'react';

interface ArabiSignatureProps {
  className?: string;
  color?: string;
  strokeWidth?: number;
}

/**
 * Exact geometric vector translation of Arabi's original signature:
 * - Top-left sharp horizontal lead bar
 * - Characteristic angled loop hook at the left
 * - Upper angular geometric enclosure (box) at the top-right
 * - Central crossing diagonal stroke slicing down into the diamond knot
 * - Dynamic lower-right zig-zag and distinct horizontal baseline anchor with trailing arrow flourish
 * - Bottom acute triangle anchor pointing down
 */
export const ArabiSignature: React.FC<ArabiSignatureProps> = ({
  className = 'w-6 h-6',
  color = 'currentColor',
  strokeWidth = 2.4,
}) => {
  return (
    <svg
      viewBox="0 0 100 85"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Arabi authentic signature"
    >
      {/* Upper-left horizontal stroke */}
      <path
        d="M 6 20 L 74 29"
        stroke={color}
        strokeWidth={strokeWidth + 0.3}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Upper-left triangular flourish return */}
      <path
        d="M 28 23 L 11 30 L 27 39"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Middle connecting bridge into center vertical */}
      <path
        d="M 27 39 L 41 39 L 44 26"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Top right geometric box structure */}
      <path
        d="M 53 14 L 73 14 L 69 31 L 47 30 L 53 14 Z"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Central downward stroke connecting box to middle glyphs */}
      <path
        d="M 50 14 L 38 46 L 43 53 L 51 46"
        stroke={color}
        strokeWidth={strokeWidth + 0.2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Center geometric knot (lower-left facet) */}
      <path
        d="M 32 44 L 39 53 L 36 56"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Center right dual zig-zag structure */}
      <path
        d="M 52 38 L 71 39 L 52 50 L 73 50 L 58 63"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Bottom acute triangular loop */}
      <path
        d="M 28 62 L 51 80 L 67 62"
        stroke={color}
        strokeWidth={strokeWidth + 0.2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Horizontal sweeping baseline with arrow terminal */}
      <path
        d="M 27 62 L 87 60"
        stroke={color}
        strokeWidth={strokeWidth + 0.4}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Arrow head on the right */}
      <path
        d="M 81 55 L 89 60 L 83 67"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
