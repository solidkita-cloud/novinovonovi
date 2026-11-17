// src/components/surprises/ComplimentMachine.tsx
'use client';

import React, { useState } from 'react';
import { RANDOM_COMPLIMENTS } from '@/data/surprises';
import { Floppy } from '@/characters/Floppy';
import { Sparkles, Dices, Heart } from 'lucide-react';
import confetti from 'canvas-confetti';

export const ComplimentMachine: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNextCompliment = () => {
    const nextIdx = (currentIndex + 1) % RANDOM_COMPLIMENTS.length;
    setCurrentIndex(nextIdx);
    confetti({
      particleCount: 25,
      spread: 45,
      origin: { y: 0.8 },
      colors: ['#FF4FA3', '#FFDA35', '#B7F45A'],
    });
  };

  const current = RANDOM_COMPLIMENTS[currentIndex];

  return (
    <div className="bg-white border-3 border-[#1E1233] rounded-2xl p-6 shadow-[6px_6px_0px_#1E1233] flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-4">
          <span className="retro-badge bg-[#B7F45A] text-[#1E1233]">
            FEATURE B: COMPLIMENT MACHINE
          </span>
          <span className="text-2xl">✨</span>
        </div>

        <h3 className="text-xl font-black text-[#1E1233] mb-2">
          Mesin Pujian Acak Bunda Novi 💖
        </h3>
        <p className="text-xs sm:text-sm text-[#554070] font-semibold mb-6">
          Generator fakta objektif tentang betapa luar biasanya Bunda Novi di mata teman kantor!
        </p>

        {/* Compliment Display Screen */}
        <div className="bg-[#FAF5FF] border-3 border-[#8C65FF] rounded-2xl p-5 shadow-[4px_4px_0px_#8C65FF] space-y-4 mb-6">
          <div className="flex items-start gap-3">
            <span className="text-2xl">💬</span>
            <p className="text-sm sm:text-base font-extrabold text-[#1E1233] leading-relaxed">
              “{current.text}”
            </p>
          </div>

          <div className="pt-3 border-t-2 border-dashed border-[#8C65FF]/30 flex items-center gap-3">
            <Floppy pose="hero" size={45} animated={false} />
            <p className="text-xs font-mono font-bold text-[#6D28D9]">
              {current.floppyReaction}
            </p>
          </div>
        </div>
      </div>

      <button
        onClick={handleNextCompliment}
        className="w-full retro-btn retro-btn-yellow text-xs sm:text-sm cursor-pointer"
      >
        <Dices className="w-4 h-4" />
        <span>PILIH PUJIAN LAINNYA! (Klik lagi)</span>
      </button>
    </div>
  );
};
