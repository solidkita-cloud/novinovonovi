// src/components/friendship/FriendshipChaos.tsx
'use client';

import React from 'react';
import { AwardsGrid } from './AwardsGrid';
import { Floppy } from '@/characters/Floppy';
import { Zap, Laugh } from 'lucide-react';

export const FriendshipChaos: React.FC = () => {
  return (
    <section className="py-12 px-4 max-w-5xl mx-auto">
      {/* Section Header */}
      <div className="text-center space-y-3 mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#B7F45A] border-2 border-[#1E1233] text-xs font-black text-[#1E1233] shadow-[3px_3px_0px_#1E1233]">
          <Zap className="w-4 h-4 fill-current" />
          <span>FRIENDSHIP CHAOS ARCHIVES</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-black text-[#1E1233] tracking-tight">
          Penghargaan Khusus Dari Teman Kantor 🏆
        </h2>

        <p className="text-sm sm:text-base text-[#554070] font-bold max-w-xl mx-auto">
          Penghargaan absurd dan penuh cinta hasil rembukan kolektif teman-teman kantor untuk Bunda Novi tersayang!
        </p>
      </div>

      {/* Floppy Introduction Bubble */}
      <div className="mb-8 bg-[#FFF2B2] border-3 border-[#1E1233] rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-center gap-4 shadow-[5px_5px_0px_#1E1233]">
        <Floppy pose="roasting" size={100} />
        <div className="space-y-1 text-center sm:text-left">
          <span className="retro-badge bg-[#FF4FA3] text-white text-[10px]">
            FLOPPY SYSTEM AUDIT
          </span>
          <p className="text-sm sm:text-base font-extrabold text-[#1E1233]">
            “Setelah memindai seluruh interaksi di kantor selama 365 hari terakhir, dewan juri sepakat memberikan 3 piala kehormatan mutlak kepada Bunda Novi!”
          </p>
        </div>
      </div>

      {/* Awards Grid */}
      <AwardsGrid />
    </section>
  );
};
