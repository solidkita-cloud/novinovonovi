// src/components/surprises/SurpriseCorner.tsx
'use client';

import React from 'react';
import { MysteryBox } from './MysteryBox';
import { ComplimentMachine } from './ComplimentMachine';
import { UnguFanZone } from './UnguFanZone';
import { Gift, Sparkles } from 'lucide-react';

export const SurpriseCorner: React.FC = () => {
  return (
    <section className="py-12 px-4 max-w-5xl mx-auto">
      {/* Section Header */}
      <div className="text-center space-y-3 mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FF4FA3] border-2 border-[#1E1233] text-xs font-black text-white shadow-[3px_3px_0px_#1E1233]">
          <Gift className="w-4 h-4 fill-current" />
          <span>INTERACTIVE SURPRISE CORNER</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-black text-[#1E1233] tracking-tight">
          Pojok Kejutan Interaktif 🎁
        </h2>

        <p className="text-sm sm:text-base text-[#554070] font-bold max-w-xl mx-auto">
          Tiga fitur mini interaktif yang dirancang khusus untuk menghibur dan membahagiakan Bunda Novi hari ini!
        </p>
      </div>

      {/* 3 Interactive Columns */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <MysteryBox />
        <ComplimentMachine />
        <UnguFanZone />
      </div>
    </section>
  );
};
