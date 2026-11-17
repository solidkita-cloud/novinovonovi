// src/characters/Floppy.tsx
'use client';

import React from 'react';

export type FloppyPose = 
  | 'hero' 
  | 'roasting' 
  | 'laughing' 
  | 'surprised' 
  | 'sentimental' 
  | 'headphone' 
  | 'cake';

interface FloppyProps {
  pose?: FloppyPose;
  className?: string;
  size?: number;
  animated?: boolean;
}

export const Floppy: React.FC<FloppyProps> = ({
  pose = 'hero',
  className = '',
  size = 180,
  animated = true,
}) => {
  return (
    <div
      className={`relative inline-flex items-center justify-center select-none ${
        animated ? 'hover:scale-105 transition-transform duration-300' : ''
      } ${className}`}
      style={{ width: size, height: size * 1.15 }}
    >
      <svg
        viewBox="0 0 200 230"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-xl"
      >
        <defs>
          {/* Body gradients for 3D Chibi Depth */}
          <linearGradient id="floppyBody" x1="20" y1="20" x2="180" y2="200" gradientUnits="userSpaceOnUse">
            <stop stopColor="#A884FF" />
            <stop offset="0.6" stopColor="#8C65FF" />
            <stop offset="1" stopColor="#673DE6" />
          </linearGradient>

          <linearGradient id="metalShutter" x1="45" y1="20" x2="155" y2="80" gradientUnits="userSpaceOnUse">
            <stop stopColor="#F0F0F5" />
            <stop offset="0.5" stopColor="#D8D8E2" />
            <stop offset="1" stopColor="#B0B0C0" />
          </linearGradient>

          <linearGradient id="shutterHole" x1="110" y1="35" x2="145" y2="70" gradientUnits="userSpaceOnUse">
            <stop stopColor="#1E1233" />
            <stop offset="1" stopColor="#3E2B63" />
          </linearGradient>

          <linearGradient id="labelGrad" x1="35" y1="110" x2="165" y2="180" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FFFFFF" />
            <stop offset="1" stopColor="#FFF4E8" />
          </linearGradient>

          <radialGradient id="cheekBlush" cx="0.5" cy="0.5" r="0.5" fx="0.5" fy="0.5">
            <stop stopColor="#FF4FA3" stopOpacity="0.6" />
            <stop offset="1" stopColor="#FF4FA3" stopOpacity="0" />
          </radialGradient>

          <filter id="shadowFilter" x="-10%" y="-10%" width="120%" height="130%">
            <feDropShadow dx="0" dy="6" stdDeviation="4" floodColor="#27134A" floodOpacity="0.4" />
          </filter>
        </defs>

        {/* --- DROP SHADOW UNDER FEET --- */}
        <ellipse cx="100" cy="220" rx="65" ry="8" fill="#1E1233" opacity="0.25" />

        {/* --- FEET (Chibi Round Shoes) --- */}
        <g id="feet">
          <ellipse cx="65" cy="214" rx="18" ry="10" fill="#FFDA35" stroke="#1E1233" strokeWidth="3" />
          <ellipse cx="135" cy="214" rx="18" ry="10" fill="#FFDA35" stroke="#1E1233" strokeWidth="3" />
          <ellipse cx="62" cy="211" rx="6" ry="3" fill="#FFFFFF" opacity="0.8" />
          <ellipse cx="132" cy="211" rx="6" ry="3" fill="#FFFFFF" opacity="0.8" />
        </g>

        {/* --- MAIN FLOPPY DISK BODY (Beveled Square with Cut Corner) --- */}
        <g id="main-disk" filter="url(#shadowFilter)">
          <path
            d="M32 20 H152 L178 46 V192 C178 198 174 202 168 202 H32 C26 202 22 198 22 192 V30 C22 24 26 20 32 20 Z"
            fill="url(#floppyBody)"
            stroke="#1E1233"
            strokeWidth="4"
            strokeLinejoin="round"
          />

          {/* 3D Highlight Edge */}
          <path
            d="M32 24 H150 L174 48 V190"
            stroke="#C4A8FF"
            strokeWidth="2.5"
            strokeLinecap="round"
            fill="none"
          />
        </g>

        {/* --- TOP METAL SHUTTER (CHROME SILVER) --- */}
        <g id="metal-slider">
          <rect
            x="48"
            y="20"
            width="104"
            height="58"
            rx="4"
            fill="url(#metalShutter)"
            stroke="#1E1233"
            strokeWidth="3.5"
          />
          {/* Shutter window hole exposing dark media disc inside */}
          <rect
            x="116"
            y="30"
            width="24"
            height="38"
            rx="3"
            fill="url(#shutterHole)"
            stroke="#1E1233"
            strokeWidth="2.5"
          />
          {/* Shutter grooves */}
          <line x1="58" y1="32" x2="58" y2="66" stroke="#8C8CA0" strokeWidth="2" strokeLinecap="round" />
          <line x1="66" y1="32" x2="66" y2="66" stroke="#8C8CA0" strokeWidth="2" strokeLinecap="round" />
        </g>

        {/* --- FRONT WHITE LABEL (FACE AREA) --- */}
        <g id="label-face">
          <rect
            x="36"
            y="94"
            width="128"
            height="98"
            rx="8"
            fill="url(#labelGrad)"
            stroke="#1E1233"
            strokeWidth="3.5"
          />
          {/* Label Header Banner */}
          <path
            d="M36 102 C36 97.5 39.5 94 44 94 H156 C160.5 94 164 97.5 164 102 V112 H36 V102 Z"
            fill="#FF4FA3"
          />
          <text
            x="100"
            y="107"
            textAnchor="middle"
            fill="#FFFFFF"
            fontSize="9"
            fontWeight="900"
            fontFamily="monospace"
            letterSpacing="2"
          >
            FLOPPY.EXE · 1.44MB
          </text>

          {/* Color Stripe Lines */}
          <line x1="42" y1="117" x2="158" y2="117" stroke="#FFDA35" strokeWidth="3" strokeLinecap="round" />
          <line x1="42" y1="123" x2="158" y2="123" stroke="#B7F45A" strokeWidth="2" strokeLinecap="round" />
        </g>

        {/* --- BLUSH CHEEKS --- */}
        <circle cx="56" cy="156" r="12" fill="url(#cheekBlush)" />
        <circle cx="144" cy="156" r="12" fill="url(#cheekBlush)" />

        {/* --- EYES & EXPRESSION BASED ON POSE --- */}
        {pose === 'hero' && (
          <g id="face-hero">
            {/* Big anime sparkle eyes */}
            <ellipse cx="72" cy="144" rx="12" ry="15" fill="#1E1233" />
            <ellipse cx="128" cy="144" rx="12" ry="15" fill="#1E1233" />
            {/* Highlights */}
            <circle cx="68" cy="138" r="5" fill="#FFFFFF" />
            <circle cx="76" cy="150" r="2.5" fill="#FFFFFF" />
            <circle cx="124" cy="138" r="5" fill="#FFFFFF" />
            <circle cx="132" cy="150" r="2.5" fill="#FFFFFF" />
            {/* Cute smile */}
            <path d="M90 156 Q100 168 110 156" stroke="#1E1233" strokeWidth="3.5" strokeLinecap="round" fill="#FF4FA3" />
          </g>
        )}

        {pose === 'roasting' && (
          <g id="face-roasting">
            {/* Mischievous raised eyebrow eyes */}
            <path d="M60 134 Q74 126 84 136" stroke="#1E1233" strokeWidth="4" strokeLinecap="round" fill="none" />
            <path d="M116 138 Q126 130 140 136" stroke="#1E1233" strokeWidth="4" strokeLinecap="round" fill="none" />
            {/* Half-lidded cunning eyes */}
            <ellipse cx="72" cy="146" rx="10" ry="12" fill="#1E1233" />
            <ellipse cx="128" cy="146" rx="10" ry="12" fill="#1E1233" />
            <circle cx="70" cy="142" r="3.5" fill="#FFFFFF" />
            <circle cx="126" cy="142" r="3.5" fill="#FFFFFF" />
            {/* Smug smirk */}
            <path d="M88 158 Q100 162 114 153" stroke="#1E1233" strokeWidth="3.5" strokeLinecap="round" fill="none" />
            {/* Little sweat drop */}
            <path d="M152 130 Q158 138 155 142 Q150 142 150 137 Z" fill="#4FACFE" />
          </g>
        )}

        {pose === 'laughing' && (
          <g id="face-laughing">
            {/* Happy closed crescent eyes ^ ^ */}
            <path d="M60 146 Q72 134 84 146" stroke="#1E1233" strokeWidth="4.5" strokeLinecap="round" fill="none" />
            <path d="M116 146 Q128 134 140 146" stroke="#1E1233" strokeWidth="4.5" strokeLinecap="round" fill="none" />
            {/* Wide open laughing mouth */}
            <path d="M86 154 Q100 178 114 154 Z" fill="#FF4FA3" stroke="#1E1233" strokeWidth="3.5" />
            {/* Little tongue */}
            <path d="M93 166 Q100 162 107 166" fill="#FFA5C8" />
          </g>
        )}

        {pose === 'surprised' && (
          <g id="face-surprised">
            {/* Huge wide eyes */}
            <circle cx="72" cy="142" r="14" fill="#1E1233" />
            <circle cx="128" cy="142" r="14" fill="#1E1233" />
            <circle cx="68" cy="136" r="6" fill="#FFFFFF" />
            <circle cx="124" cy="136" r="6" fill="#FFFFFF" />
            {/* Big O mouth */}
            <ellipse cx="100" cy="162" rx="9" ry="12" fill="#1E1233" />
            <ellipse cx="100" cy="160" rx="6" ry="8" fill="#FF4FA3" />
            {/* Question / Exclamation */}
            <text x="160" y="115" fontSize="22" fontWeight="900" fill="#FFDA35" stroke="#1E1233" strokeWidth="2">!?</text>
          </g>
        )}

        {pose === 'sentimental' && (
          <g id="face-sentimental">
            {/* Big teary glassy eyes */}
            <ellipse cx="72" cy="144" rx="13" ry="15" fill="#1E1233" />
            <ellipse cx="128" cy="144" rx="13" ry="15" fill="#1E1233" />
            <circle cx="68" cy="137" r="6" fill="#FFFFFF" />
            <circle cx="76" cy="149" r="3" fill="#FFFFFF" />
            <circle cx="124" cy="137" r="6" fill="#FFFFFF" />
            <circle cx="132" cy="149" r="3" fill="#FFFFFF" />
            {/* Soft smiling mouth */}
            <path d="M92 160 Q100 166 108 160" stroke="#1E1233" strokeWidth="3" strokeLinecap="round" fill="none" />
            {/* Glowing purple heart held by Floppy */}
            <path
              d="M100 178 C96 172 82 174 82 186 C82 196 100 206 100 206 C100 206 118 196 118 186 C118 174 104 172 100 178 Z"
              fill="#FF4FA3"
              stroke="#1E1233"
              strokeWidth="2.5"
            />
          </g>
        )}

        {pose === 'headphone' && (
          <g id="headphones">
            {/* Eyes enjoying music with closed smile */}
            <path d="M62 144 Q72 136 82 144" stroke="#1E1233" strokeWidth="4" strokeLinecap="round" fill="none" />
            <path d="M118 144 Q128 136 138 144" stroke="#1E1233" strokeWidth="4" strokeLinecap="round" fill="none" />
            <path d="M90 158 Q100 168 110 158" stroke="#1E1233" strokeWidth="3" strokeLinecap="round" fill="#FF4FA3" />
            
            {/* Headphone band arched over floppy */}
            <path d="M20 130 C20 40 180 40 180 130" stroke="#B7F45A" strokeWidth="8" strokeLinecap="round" fill="none" />
            <path d="M20 130 C20 40 180 40 180 130" stroke="#1E1233" strokeWidth="2.5" fill="none" />
            
            {/* Ear cups */}
            <rect x="10" y="115" width="20" height="34" rx="8" fill="#FF4FA3" stroke="#1E1233" strokeWidth="3" />
            <rect x="170" y="115" width="20" height="34" rx="8" fill="#FF4FA3" stroke="#1E1233" strokeWidth="3" />
            {/* Music notes */}
            <text x="168" y="90" fontSize="18" fill="#FFDA35">♪</text>
            <text x="180" y="75" fontSize="22" fill="#B7F45A">♫</text>
          </g>
        )}

        {pose === 'cake' && (
          <g id="face-cake">
            <ellipse cx="72" cy="144" rx="12" ry="14" fill="#1E1233" />
            <ellipse cx="128" cy="144" rx="12" ry="14" fill="#1E1233" />
            <circle cx="68" cy="138" r="5" fill="#FFFFFF" />
            <circle cx="124" cy="138" r="5" fill="#FFFFFF" />
            <path d="M92 158 Q100 166 108 158" stroke="#1E1233" strokeWidth="3" strokeLinecap="round" fill="none" />
            {/* Cupcake with glowing candle */}
            <g transform="translate(76, 170)">
              <polygon points="12,28 36,28 42,16 6,16" fill="#FFA5C8" stroke="#1E1233" strokeWidth="2" />
              <path d="M4 16 Q24 6 44 16" fill="#FFF4E8" stroke="#1E1233" strokeWidth="2" />
              <rect x="22" y="6" width="4" height="10" fill="#FFDA35" stroke="#1E1233" strokeWidth="1.5" />
              <circle cx="24" cy="3" r="3.5" fill="#FF4FA3" />
              <circle cx="24" cy="3" r="1.5" fill="#FFF" />
            </g>
          </g>
        )}

        {/* --- HANDS --- */}
        <g id="hands">
          {pose === 'hero' ? (
            <>
              {/* Left hand waving */}
              <circle cx="16" cy="100" r="12" fill="#FFDA35" stroke="#1E1233" strokeWidth="3" />
              {/* Right hand resting */}
              <circle cx="184" cy="140" r="12" fill="#FFDA35" stroke="#1E1233" strokeWidth="3" />
            </>
          ) : (
            <>
              <circle cx="16" cy="140" r="12" fill="#FFDA35" stroke="#1E1233" strokeWidth="3" />
              <circle cx="184" cy="140" r="12" fill="#FFDA35" stroke="#1E1233" strokeWidth="3" />
            </>
          )}
        </g>
      </svg>
    </div>
  );
};
