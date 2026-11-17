// src/components/birthday-message/BirthdayMessage.tsx
'use client';

import React from 'react';
import { MAIN_BIRTHDAY_MESSAGE } from '@/data/birthday';
import { BundaNovi } from '@/characters/BundaNovi';
import { Heart, Sparkles, Star } from 'lucide-react';

export const BirthdayMessage: React.FC = () => {
  return (
    <section id="birthday-message" className="py-12 px-4 max-w-4xl mx-auto">
      {/* Scrapbook Container */}
      <div className="relative bg-[#FFFDF5] border-4 border-[#1E1233] rounded-3xl p-6 sm:p-12 shadow-[8px_8px_0px_#FF4FA3] overflow-hidden">
        {/* Washi Tape Decorations at Top */}
        <div className="absolute -top-3 left-10 sm:left-20 bg-[#FFDA35] px-6 py-1.5 border-2 border-[#1E1233] transform -rotate-3 text-xs font-mono font-bold text-[#1E1233] shadow-[2px_2px_0px_#1E1233] select-none">
          ✦ OFFICIAL OFFICE MESSAGE ✦
        </div>
        <div className="absolute -top-3 right-10 sm:right-20 bg-[#B7F45A] px-5 py-1.5 border-2 border-[#1E1233] transform rotate-4 text-xs font-mono font-bold text-[#1E1233] shadow-[2px_2px_0px_#1E1233] select-none">
          SCRAPBOOK MEMO 📌
        </div>

        {/* Vintage Stamp at Right */}
        <div className="hidden sm:flex flex-col items-center absolute top-8 right-8 border-2 border-dashed border-[#8C65FF] p-2 bg-[#F5EEFF] rounded-lg rotate-6 select-none">
          <span className="text-[10px] font-mono font-black text-[#8C65FF]">SPECIAL DELIVERY</span>
          <span className="text-2xl">💜</span>
          <span className="text-[9px] font-mono font-bold text-[#1E1233]">POSTAGE PAID</span>
        </div>

        {/* Message Header */}
        <div className="space-y-3 mb-8 text-center sm:text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#FF4FA3]/15 text-[#FF4FA3] rounded-full border border-[#FF4FA3] text-xs font-bold">
            <Heart className="w-3.5 h-3.5 fill-current" />
            <span>Pesan Hangat Dari Seluruh Rekan Kantor</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-[#1E1233] tracking-tight">
            {MAIN_BIRTHDAY_MESSAGE.header}
          </h2>

          <p className="text-xl sm:text-2xl font-black text-[#8C65FF]">
            {MAIN_BIRTHDAY_MESSAGE.salutation}
          </p>
        </div>

        {/* Message Body (Verbatim paragraphs) */}
        <div className="space-y-6 text-base sm:text-lg text-[#2A1D45] font-semibold leading-relaxed">
          {MAIN_BIRTHDAY_MESSAGE.paragraphs.map((para, index) => (
            <p key={index} className="bg-white/80 p-4 rounded-2xl border-2 border-[#1E1233]/20 shadow-sm">
              {para}
            </p>
          ))}

          {/* Climax & Punchline Highlight */}
          <div className="bg-gradient-to-r from-[#FFF0F8] via-[#F8EEFF] to-[#FFFBE6] p-6 sm:p-8 rounded-2xl border-3 border-[#8C65FF] shadow-[5px_5px_0px_#8C65FF] text-center space-y-3">
            <p className="text-sm sm:text-base font-black text-[#FF4FA3] uppercase tracking-wider">
              {MAIN_BIRTHDAY_MESSAGE.climax}
            </p>

            <div className="text-2xl sm:text-4xl md:text-5xl font-black text-[#8C65FF] tracking-wide transform hover:scale-102 transition-transform">
              ✨ {MAIN_BIRTHDAY_MESSAGE.punchline} ✨
            </div>

            <p className="text-xl sm:text-3xl font-black text-[#FF4FA3] tracking-wider pt-2">
              {MAIN_BIRTHDAY_MESSAGE.laugh}
            </p>
          </div>
        </div>

        {/* Bottom Mascot Showcase and Signature */}
        <div className="mt-8 pt-6 border-t-3 border-dashed border-[#1E1233]/30 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <BundaNovi pose="laughing" size={90} />
            <div>
              <p className="font-black text-sm text-[#1E1233]">Bunda Novi</p>
              <p className="text-xs font-semibold text-[#8C65FF]">Senyum Manis Nomor Satu di Kantor</p>
            </div>
          </div>

          <div className="text-center sm:text-right font-mono">
            <p className="text-xs text-[#8C8CA0] uppercase tracking-widest font-bold">Tertanda dengan Penuh Cinta:</p>
            <p className="text-sm font-black text-[#1E1233] bg-[#FFDA35] px-3 py-1 rounded-md border border-[#1E1233] inline-block mt-1">
              TEMAN-TEMAN KANTOR 🏢
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
