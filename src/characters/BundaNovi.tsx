// src/characters/BundaNovi.tsx
'use client';

import React from 'react';

export type BundaNoviPose = 'hero' | 'laughing' | 'gift' | 'together';

interface BundaNoviProps {
  pose?: BundaNoviPose;
  className?: string;
  size?: number;
  animated?: boolean;
}

export const BundaNovi: React.FC<BundaNoviProps> = ({
  pose = 'hero',
  className = '',
  size = 200,
  animated = true,
}) => {
  return (
    <div
      className={`relative inline-flex items-center justify-center select-none ${
        animated ? 'hover:scale-105 transition-transform duration-300' : ''
      } ${className}`}
      style={{ width: size, height: size * 1.25 }}
    >
      <svg
        viewBox="0 0 200 250"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-2xl"
      >
        <defs>
          {/* Hijab gradients */}
          <linearGradient id="hijabGrad" x1="50" y1="20" x2="160" y2="180" gradientUnits="userSpaceOnUse">
            <stop stopColor="#A78BFA" />
            <stop offset="0.5" stopColor="#8C65FF" />
            <stop offset="1" stopColor="#6D28D9" />
          </linearGradient>

          {/* Clothes gradient */}
          <linearGradient id="tunicGrad" x1="60" y1="160" x2="140" y2="240" gradientUnits="userSpaceOnUse">
            <stop stopColor="#7C3AED" />
            <stop offset="1" stopColor="#5B21B6" />
          </linearGradient>

          {/* Skin tone */}
          <linearGradient id="skinGrad" x1="80" y1="80" x2="120" y2="140" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FFF2E8" />
            <stop offset="1" stopColor="#FFE0CC" />
          </linearGradient>

          <radialGradient id="bundaBlush" cx="0.5" cy="0.5" r="0.5">
            <stop stopColor="#FF4FA3" stopOpacity="0.55" />
            <stop offset="1" stopColor="#FF4FA3" stopOpacity="0" />
          </radialGradient>

          <filter id="bundaShadow" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="5" stdDeviation="4" floodColor="#3B0764" floodOpacity="0.3" />
          </filter>
        </defs>

        {/* --- DROP SHADOW --- */}
        <ellipse cx="100" cy="242" rx="60" ry="7" fill="#1E1233" opacity="0.25" />

        {/* --- BACK HIJAB DRAPE --- */}
        <path
          d="M45 80 C30 130 40 180 55 200 C70 215 130 215 145 200 C160 180 170 130 155 80 Z"
          fill="#5B21B6"
        />

        {/* --- BODY & CLOTHES (Modest Long Tunic) --- */}
        <g id="body" filter="url(#bundaShadow)">
          {/* Skirt / Base Dress */}
          <path
            d="M60 180 L48 238 C48 240 52 242 56 242 H144 C148 242 152 240 152 238 L140 180 Z"
            fill="#FFF4E8"
            stroke="#1E1233"
            strokeWidth="3.5"
          />

          {/* Elegant Purple Blazer / Outer Tunic */}
          <path
            d="M62 170 C58 190 56 215 54 230 C75 235 125 235 146 230 C144 215 142 190 138 170 Z"
            fill="url(#tunicGrad)"
            stroke="#1E1233"
            strokeWidth="3.5"
          />

          {/* Collar / Lapel accents */}
          <path d="M85 170 L100 200 L115 170" stroke="#FFDA35" strokeWidth="3" strokeLinecap="round" fill="none" />
          <circle cx="100" cy="210" r="3" fill="#FFDA35" />
          <circle cx="100" cy="222" r="3" fill="#FFDA35" />
        </g>

        {/* --- FRONT HIJAB & HEAD WRAP --- */}
        <g id="hijab" filter="url(#bundaShadow)">
          {/* Main rounded hijab hood */}
          <path
            d="M100 25 C55 25 45 65 45 110 C45 155 60 180 85 188 L100 192 L115 188 C140 180 155 155 155 110 C155 65 145 25 100 25 Z"
            fill="url(#hijabGrad)"
            stroke="#1E1233"
            strokeWidth="4"
          />

          {/* Cream inner hijab forehead band */}
          <path
            d="M68 85 C80 72 120 72 132 85 C125 76 115 74 100 74 C85 74 75 76 68 85 Z"
            fill="#FFF4E8"
          />

          {/* Face opening */}
          <ellipse
            cx="100"
            cy="114"
            rx="35"
            ry="40"
            fill="url(#skinGrad)"
            stroke="#1E1233"
            strokeWidth="3.5"
          />

          {/* Hijab drape folds near neck */}
          <path
            d="M85 152 C92 162 108 162 115 152 C122 170 135 188 138 196 C115 204 85 204 62 196 C65 188 78 170 85 152 Z"
            fill="#7C3AED"
            stroke="#1E1233"
            strokeWidth="3"
          />
          {/* Hijab brooch pin */}
          <circle cx="100" cy="180" r="6" fill="#FFDA35" stroke="#1E1233" strokeWidth="2" />
          <circle cx="100" cy="180" r="2" fill="#FF4FA3" />
        </g>

        {/* --- CHEEKS & FACE DETAILS --- */}
        <g id="face">
          {/* Cheerful blush */}
          <circle cx="78" cy="124" r="8" fill="url(#bundaBlush)" />
          <circle cx="122" cy="124" r="8" fill="url(#bundaBlush)" />

          {/* Eyebrows */}
          <path d="M74 95 Q84 90 92 94" stroke="#4C1D95" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          <path d="M108 94 Q116 90 126 95" stroke="#4C1D95" strokeWidth="2.5" strokeLinecap="round" fill="none" />

          {/* Big Warm Eyes */}
          <ellipse cx="83" cy="108" rx="8" ry="10" fill="#1E1233" />
          <ellipse cx="117" cy="108" rx="8" ry="10" fill="#1E1233" />
          {/* Eye sparkles */}
          <circle cx="80" cy="104" r="3.5" fill="#FFFFFF" />
          <circle cx="85" cy="111" r="1.5" fill="#FFFFFF" />
          <circle cx="114" cy="104" r="3.5" fill="#FFFFFF" />
          <circle cx="119" cy="111" r="1.5" fill="#FFFFFF" />

          {/* Eyelashes */}
          <path d="M73 103 L69 100" stroke="#1E1233" strokeWidth="2" strokeLinecap="round" />
          <path d="M127 103 L131 100" stroke="#1E1233" strokeWidth="2" strokeLinecap="round" />

          {/* --- STYLISH GLASSES (KACAMATA BUNDA NOVI) --- */}
          <g id="glasses">
            {/* Left Frame */}
            <circle cx="83" cy="108" r="15" stroke="#1E1233" strokeWidth="3" fill="#FFFFFF" fillOpacity="0.15" />
            {/* Right Frame */}
            <circle cx="117" cy="108" r="15" stroke="#1E1233" strokeWidth="3" fill="#FFFFFF" fillOpacity="0.15" />
            {/* Bridge */}
            <path d="M98 107 Q100 105 102 107" stroke="#1E1233" strokeWidth="3" fill="none" />
            {/* Glass Glare */}
            <path d="M74 100 L88 100" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" opacity="0.8" />
            <path d="M108 100 L122 100" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" opacity="0.8" />
          </g>

          {/* Warm Smiling Mouth */}
          {pose === 'laughing' ? (
            <path d="M90 128 Q100 144 110 128 Z" fill="#FF4FA3" stroke="#1E1233" strokeWidth="2.5" />
          ) : (
            <path d="M92 128 Q100 137 108 128" stroke="#1E1233" strokeWidth="3" strokeLinecap="round" fill="#FF4FA3" />
          )}
        </g>

        {/* --- HANDS & ACCESSORIES --- */}
        <g id="hands">
          {pose === 'hero' && (
            <>
              {/* Right hand waving */}
              <circle cx="156" cy="160" r="10" fill="#FFE0CC" stroke="#1E1233" strokeWidth="3" />
              {/* Left hand resting gracefully */}
              <circle cx="44" cy="180" r="10" fill="#FFE0CC" stroke="#1E1233" strokeWidth="3" />
              {/* Sparkles */}
              <text x="165" y="145" fontSize="20" fill="#FFDA35">✨</text>
              <text x="25" y="160" fontSize="18" fill="#FF4FA3">🌸</text>
            </>
          )}

          {pose === 'gift' && (
            <>
              <g transform="translate(75, 175)">
                {/* Gift Box */}
                <rect x="0" y="8" width="50" height="40" rx="4" fill="#FFDA35" stroke="#1E1233" strokeWidth="3" />
                <rect x="20" y="8" width="10" height="40" fill="#FF4FA3" />
                <rect x="0" y="24" width="50" height="8" fill="#FF4FA3" />
                {/* Ribbon Bow */}
                <circle cx="20" cy="5" r="7" fill="#FF4FA3" stroke="#1E1233" strokeWidth="2" />
                <circle cx="30" cy="5" r="7" fill="#FF4FA3" stroke="#1E1233" strokeWidth="2" />
              </g>
              <circle cx="72" cy="192" r="9" fill="#FFE0CC" stroke="#1E1233" strokeWidth="3" />
              <circle cx="128" cy="192" r="9" fill="#FFE0CC" stroke="#1E1233" strokeWidth="3" />
            </>
          )}

          {(pose === 'laughing' || pose === 'together') && (
            <>
              <circle cx="48" cy="178" r="9" fill="#FFE0CC" stroke="#1E1233" strokeWidth="3" />
              <circle cx="152" cy="178" r="9" fill="#FFE0CC" stroke="#1E1233" strokeWidth="3" />
            </>
          )}
        </g>
      </svg>
    </div>
  );
};
