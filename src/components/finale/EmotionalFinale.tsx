// src/components/finale/EmotionalFinale.tsx
'use client';

import React from 'react';
import { FINALE_MESSAGE } from '@/data/birthday';
import { Floppy } from '@/characters/Floppy';
import { BundaNovi } from '@/characters/BundaNovi';
import { Heart, Sparkles } from 'lucide-react';

export const EmotionalFinale: React.FC = () => {
  return (
    <section className="py-20 px-4 bg-gradient-to-b from-transparent via-[#F3E8FF] to-[#E9D5FF] border-t-4 border-[#8C65FF]/30 mt-16">
      <div className="max-w-3xl mx-auto space-y-8">
        {/* Soft Decorative Badge */}
        <div className="text-center">
          <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#8C65FF] text-white text-xs sm:text-sm font-bold shadow-[4px_4px_0px_#1E1233] border-2 border-[#1E1233]">
            <Heart className="w-4 h-4 fill-current text-[#FF4FA3]" />
            <span>PENUTUP DARI HATI YANG PALING DALAM</span>
          </span>
        </div>

        {/* Sentimental Card */}
        <div className="bg-white/95 border-4 border-[#8C65FF] rounded-3xl p-8 sm:p-14 shadow-[8px_8px_0px_#8C65FF] relative text-center space-y-6">
          {/* Characters Duo at Center */}
          <div className="flex items-center justify-center gap-4 sm:gap-8 pb-4">
            <BundaNovi pose="together" size={140} />
            <Floppy pose="sentimental" size={110} />
          </div>

          {/* Intro Text */}
          <p className="text-base sm:text-lg font-bold text-[#6D28D9] leading-relaxed italic">
            “{FINALE_MESSAGE.intro}”
          </p>

          {/* Main Body */}
          <div className="text-base sm:text-lg text-[#2D1B4E] font-medium leading-relaxed space-y-4 max-w-xl mx-auto border-y-2 border-dashed border-[#8C65FF]/30 py-6">
            <p>
              Semoga Bunda selalu punya alasan untuk bahagia. Semoga hal-hal baik datang lebih sering, dan semoga Bunda tidak pernah merasa sendirian menghadapi hari-hari yang berat.
            </p>
            <p className="font-semibold text-[#5B21B6]">
              Terima kasih sudah menjadi bagian dari cerita, kehangatan, dan kebersamaan kita di kantor.
            </p>
          </div>

          {/* Slogan Finale */}
          <div className="space-y-2 pt-2">
            <h3 className="text-2xl sm:text-4xl font-black text-[#7C3AED] tracking-tight">
              {FINALE_MESSAGE.closing}
            </h3>
            <p className="text-xs sm:text-sm font-mono font-bold text-[#A855F7] tracking-widest uppercase">
              {FINALE_MESSAGE.subclosing}
            </p>
          </div>

          {/* Office Sign-Off */}
          <div className="pt-4">
            <span className="inline-block bg-[#FFDA35] border-2 border-[#1E1233] text-[#1E1233] font-black text-sm px-6 py-2 rounded-xl shadow-[3px_3px_0px_#1E1233]">
              {FINALE_MESSAGE.signOff} 🏢✨
            </span>
          </div>
        </div>

        {/* Footer Credit & Copyright */}
        <div className="text-center font-mono text-xs text-[#6B5B82] space-y-1">
          <p>BIRTHDAY.exe v1.0 • Bunda Novi Edition • novinovonovi.vercel.app</p>
          <p>Dibuat dengan segenap tawa, kopi lembur, dan cinta oleh Rekan-Rekan Kantor.</p>
        </div>
      </div>
    </section>
  );
};
