// src/components/hero/BirthdayHero.tsx
'use client';

import React from 'react';
import { BundaNovi } from '@/characters/BundaNovi';
import { Floppy } from '@/characters/Floppy';
import { Sparkles, ShieldAlert, Heart, PartyPopper } from 'lucide-react';
import confetti from 'canvas-confetti';

export const BirthdayHero: React.FC = () => {
  const triggerConfetti = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#FF4FA3', '#FFDA35', '#B7F45A', '#8C65FF', '#FFFFFF'],
    });
  };

  return (
    <section className="relative w-full pt-8 pb-16 px-4 max-w-5xl mx-auto">
      {/* Top Floating Badge Bar */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
        <span className="retro-badge bg-[#FFDA35] text-[#1E1233] flex items-center gap-1.5 shadow-[3px_3px_0px_#1E1233]">
          <Sparkles className="w-3.5 h-3.5 fill-current" />
          EDISI SPESIAL KANTOR
        </span>
        <span className="retro-badge bg-[#FF4FA3] text-white flex items-center gap-1.5 shadow-[3px_3px_0px_#1E1233]">
          <Heart className="w-3.5 h-3.5 fill-current" />
          BUNDA NOVI DAY
        </span>
        <span className="retro-badge bg-[#B7F45A] text-[#1E1233] font-mono shadow-[3px_3px_0px_#1E1233]">
          STATUS: BAHAGIA MAKSIMAL 💜
        </span>
      </div>

      {/* Main Stage Window */}
      <div className="retro-window bg-white relative">
        {/* Retro Header */}
        <div className="retro-window-header">
          <div className="flex items-center gap-2">
            <span className="text-[#FFDA35]">★</span>
            <span>STAGE_01://HAPPY_BIRTHDAY_BUNDA_NOVI.EXE</span>
          </div>
          <div>
            <span className="retro-btn-dot bg-[#FF4FA3]" />
            <span className="retro-btn-dot bg-[#FFDA35]" />
            <span className="retro-btn-dot bg-[#B7F45A]" />
          </div>
        </div>

        {/* Stage Content */}
        <div className="p-6 sm:p-10 text-center relative overflow-hidden bg-gradient-to-b from-[#FFFDF9] to-[#FFF4E8]">
          {/* Decorative Corner Stars */}
          <div className="absolute top-4 left-4 text-3xl animate-bounce select-none">🎈</div>
          <div className="absolute top-4 right-4 text-3xl animate-bounce select-none delay-150">🎂</div>

          {/* Headline Stage */}
          <div className="space-y-2 mb-8">
            <div className="inline-block transform -rotate-2">
              <span className="inline-block bg-[#8C65FF] text-white font-black text-xs sm:text-sm px-4 py-1 rounded-full border-2 border-[#1E1233] shadow-[3px_3px_0px_#1E1233] tracking-widest uppercase">
                Official Birthday Celebration
              </span>
            </div>

            <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-[#1E1233] font-sans drop-shadow-sm">
              HAPPY <span className="text-[#FF4FA3] underline decoration-[#FFDA35] decoration-wavy">XXth</span> BIRTHDAY
            </h1>

            <div className="text-3xl sm:text-5xl md:text-6xl font-black text-[#8C65FF] tracking-wider transform rotate-1 drop-shadow-md">
              ✨ BUNDA NOVI ✨
            </div>

            <p className="text-base sm:text-lg text-[#554070] font-bold max-w-xl mx-auto pt-2">
              “Bunda Novi Bahagia, Semua Bahagia! Pesta Digital Ter-Ceria dari Rekan-Rekan Kantor!”
            </p>
          </div>

          {/* STRICT NO-AGE POLICY BANNER (Umur Rahasia Negara) */}
          <div className="inline-flex flex-col sm:flex-row items-center gap-2 sm:gap-3 bg-[#FFE8E8] border-3 border-[#FF4FA3] px-5 py-2.5 rounded-2xl shadow-[4px_4px_0px_#1E1233] mb-8">
            <div className="flex items-center gap-2 text-[#E11D48] font-black text-xs sm:text-sm font-mono tracking-wider">
              <ShieldAlert className="w-5 h-5 text-[#FF4FA3] animate-pulse" />
              <span>CLASSIFIED INFORMATION:</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="bg-[#1E1233] text-[#FFDA35] font-mono font-bold text-xs px-2.5 py-1 rounded border border-[#1E1233]">
                UMUR RAHASIA NEGARA
              </span>
              <span className="bg-[#8C65FF] text-white font-mono font-bold text-xs px-2.5 py-1 rounded border border-[#1E1233]">
                ACCESS DENIED
              </span>
            </div>
          </div>

          {/* Characters Presentation Showcase */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center max-w-3xl mx-auto my-6">
            {/* Bunda Novi Showcase */}
            <div className="flex flex-col items-center bg-[#FAF5FF] p-6 rounded-2xl border-3 border-[#8C65FF] shadow-[5px_5px_0px_#8C65FF] transform -rotate-1 hover:rotate-0 transition-transform">
              <div className="relative mb-2">
                <BundaNovi pose="hero" size={210} />
                <span className="absolute -top-2 -right-2 bg-[#FFDA35] border-2 border-[#1E1233] text-xs font-black px-2.5 py-0.5 rounded-full shadow-[2px_2px_0px_#1E1233]">
                  👑 QUEEN OF THE DAY
                </span>
              </div>
              <h3 className="text-xl font-black text-[#1E1233]">Bunda Novi</h3>
              <p className="text-xs font-bold text-[#8C65FF]">Tokoh Utama & Bintang Kantor Paling Ramah</p>
            </div>

            {/* Floppy Mascot Showcase */}
            <div className="flex flex-col items-center bg-[#FFFDE6] p-6 rounded-2xl border-3 border-[#FFDA35] shadow-[5px_5px_0px_#FFDA35] transform rotate-1 hover:rotate-0 transition-transform">
              <div className="relative mb-2">
                <Floppy pose="hero" size={175} />
                <span className="absolute -top-2 -right-2 bg-[#FF4FA3] text-white border-2 border-[#1E1233] text-xs font-black px-2.5 py-0.5 rounded-full shadow-[2px_2px_0px_#1E1233]">
                  ⚡ FLOPPY DISK BOT
                </span>
              </div>
              <div className="bg-white p-3 rounded-xl border-2 border-[#1E1233] shadow-[3px_3px_0px_#1E1233] text-xs font-bold text-[#1E1233] max-w-xs text-left space-y-1">
                <p className="text-[#FF4FA3] font-mono text-[10px] uppercase font-black">Floppy Roasting Log:</p>
                <p>
                  “Data usia Bunda Novi tidak dapat diakses oleh masyarakat umum. Bahkan saya sendiri tidak punya izin! Yang pasti Bunda awet muda selamanya! WKWK!”
                </p>
              </div>
            </div>
          </div>

          {/* Interactive Confetti Cannon CTA */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={triggerConfetti}
              className="retro-btn retro-btn-pink text-sm sm:text-base cursor-pointer"
            >
              <PartyPopper className="w-5 h-5" />
              <span>Tembakkan Konfeti Pesta! 🎊</span>
            </button>
            <a
              href="#birthday-message"
              className="retro-btn retro-btn-lime text-sm sm:text-base"
            >
              <span>Baca Surat Ucapan Utama 💌</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
