// src/components/friendship/AwardsGrid.tsx
'use client';

import React from 'react';
import { FRIENDSHIP_AWARDS } from '@/data/awards';
import { Award, Sparkles, MessageSquare } from 'lucide-react';

export const AwardsGrid: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {FRIENDSHIP_AWARDS.map((award) => {
        const borderStyles =
          award.colorScheme === 'yellow'
            ? 'border-[#FFDA35] shadow-[6px_6px_0px_#FFDA35]'
            : award.colorScheme === 'lime'
            ? 'border-[#B7F45A] shadow-[6px_6px_0px_#B7F45A]'
            : 'border-[#FF4FA3] shadow-[6px_6px_0px_#FF4FA3]';

        return (
          <div
            key={award.id}
            className={`bg-white border-3 border-[#1E1233] rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 ${borderStyles} flex flex-col justify-between`}
          >
            <div className="space-y-3">
              {/* Top Badge Icon */}
              <div className="flex items-center justify-between">
                <span className="text-4xl p-2 bg-[#FFF4E8] rounded-2xl border-2 border-[#1E1233]">
                  {award.badgeIcon}
                </span>
                <span className="retro-badge bg-[#1E1233] text-[#FFDA35] text-[10px]">
                  CERTIFIED 100%
                </span>
              </div>

              {/* Title & Category */}
              <div>
                <p className="text-[11px] font-mono font-black text-[#8C65FF] uppercase tracking-wider">
                  {award.category}
                </p>
                <h3 className="text-lg font-black text-[#1E1233] leading-snug">
                  {award.title}
                </h3>
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-[#44335E] font-semibold leading-relaxed">
                {award.description}
              </p>
            </div>

            {/* Floppy's cheeky comment */}
            <div className="mt-5 pt-4 border-t-2 border-dashed border-[#1E1233]/20 bg-[#FBF8FF] -mx-2 -mb-2 p-3 rounded-xl border border-[#8C65FF]/30">
              <div className="flex items-start gap-2">
                <MessageSquare className="w-4 h-4 text-[#8C65FF] shrink-0 mt-0.5" />
                <p className="text-[11px] font-mono text-[#5B21B6] font-bold leading-tight">
                  {award.floppyComment}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
