// src/components/wishes/WishWall.tsx
'use client';

import React from 'react';
import { Wish } from '@/types/birthday';
import { Heart, Sparkles, Pin } from 'lucide-react';

interface WishWallProps {
  wishes: Wish[];
  loading: boolean;
}

export const WishWall: React.FC<WishWallProps> = ({ wishes, loading }) => {
  // Pastel sticky note color cycles
  const stickyColors = [
    'bg-[#FFF9D2] border-[#FCD34D] text-[#1E1233] shadow-[4px_4px_0px_#FCD34D]', // Yellow
    'bg-[#FFE4EE] border-[#FDA4AF] text-[#1E1233] shadow-[4px_4px_0px_#FDA4AF]', // Pink
    'bg-[#EBFDE2] border-[#86EFAC] text-[#1E1233] shadow-[4px_4px_0px_#86EFAC]', // Mint
    'bg-[#F3E8FF] border-[#D8B4FE] text-[#1E1233] shadow-[4px_4px_0px_#D8B4FE]', // Lavender
  ];

  if (loading && wishes.length === 0) {
    return (
      <div className="py-12 text-center text-sm font-mono text-[#8C65FF] animate-pulse">
        MEMUAT PAPAN HARAPAN BUNDA NOVI...
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
      {wishes.map((wish, index) => {
        const colorStyle = stickyColors[index % stickyColors.length];
        const randomRotation = index % 3 === 0 ? '-rotate-1' : index % 3 === 1 ? 'rotate-1' : 'rotate-0';

        return (
          <div
            key={wish.id}
            className={`relative p-5 rounded-2xl border-3 border-[#1E1233] transition-all duration-300 hover:scale-102 hover:rotate-0 flex flex-col justify-between ${colorStyle} ${randomRotation}`}
          >
            {/* Pin Graphic at Top */}
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
              <span className="inline-block w-4 h-4 rounded-full bg-[#FF4FA3] border-2 border-[#1E1233] shadow-sm" />
            </div>

            {/* Note Content */}
            <div className="space-y-3 pt-2">
              <p className="text-sm sm:text-base font-semibold leading-relaxed text-[#2D1B4E]">
                “{wish.message}”
              </p>
            </div>

            {/* Note Footer */}
            <div className="mt-4 pt-3 border-t-2 border-dashed border-[#1E1233]/20 flex items-center justify-between">
              <div>
                <p className="text-xs font-black text-[#1E1233] truncate max-w-[150px]">
                  {wish.display_name}
                </p>
                <p className="text-[10px] font-mono text-[#786494]">
                  {wish.source === 'seed' ? '★ Tim Kantor' : '★ Rekan Pengunjung'}
                </p>
              </div>
              <span className="text-xs text-[#FF4FA3]">💜</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};
