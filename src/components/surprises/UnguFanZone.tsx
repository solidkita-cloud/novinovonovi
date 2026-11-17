// src/components/surprises/UnguFanZone.tsx
'use client';

import React, { useState } from 'react';
import { UNGU_FAN_TRIVIA } from '@/data/surprises';
import { Music2, Disc3, Heart } from 'lucide-react';

export const UnguFanZone: React.FC = () => {
  const [activeTrivia, setActiveTrivia] = useState(0);

  return (
    <div className="bg-white border-3 border-[#1E1233] rounded-2xl p-6 shadow-[6px_6px_0px_#1E1233] flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-4">
          <span className="retro-badge bg-[#8C65FF] text-white">
            FEATURE C: UNGU FAN ZONE
          </span>
          <span className="text-2xl">💜</span>
        </div>

        <h3 className="text-xl font-black text-[#1E1233] mb-2">
          Zona Spesial Cliquers (Fans Ungu) 🎸
        </h3>
        <p className="text-xs sm:text-sm text-[#554070] font-semibold mb-6">
          Penghormatan khusus atas kecintaan Bunda Novi pada karya-karya legendaris grup musik Ungu!
        </p>

        {/* Trivia Selector */}
        <div className="space-y-3 mb-6">
          {UNGU_FAN_TRIVIA.map((item, idx) => (
            <div
              key={idx}
              onClick={() => setActiveTrivia(idx)}
              className={`p-3.5 rounded-xl border-2 border-[#1E1233] cursor-pointer transition-all ${
                activeTrivia === idx
                  ? 'bg-[#F3E8FF] border-[#8C65FF] shadow-[3px_3px_0px_#8C65FF]'
                  : 'bg-[#FFFDF9] hover:bg-[#FAF5FF]'
              }`}
            >
              <div className="flex items-center gap-2">
                <Disc3 className={`w-4 h-4 ${activeTrivia === idx ? 'text-[#8C65FF] animate-spin' : 'text-[#8C8CA0]'}`} />
                <p className="text-xs font-black text-[#1E1233]">{item.question}</p>
              </div>
              {activeTrivia === idx && (
                <p className="mt-2 text-xs text-[#5B21B6] font-semibold pl-6 border-l-2 border-[#8C65FF]">
                  {item.answer}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="p-3 bg-[#FAF5FF] rounded-xl border-2 border-dashed border-[#8C65FF] text-center">
        <p className="text-[11px] font-mono font-bold text-[#8C65FF]">
          “Untukmu Selamanya, Demi Waktu, Bunda Novi Selalu di Hati!”
        </p>
      </div>
    </div>
  );
};
