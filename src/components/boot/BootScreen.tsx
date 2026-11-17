// src/components/boot/BootScreen.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { BOOT_SEQUENCE } from '@/data/birthday';
import { Floppy } from '@/characters/Floppy';
import { Terminal, Sparkles, Play, ShieldAlert } from 'lucide-react';

interface BootScreenProps {
  onEnterParty: () => void;
}

export const BootScreen: React.FC<BootScreenProps> = ({ onEnterParty }) => {
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [bootReady, setBootReady] = useState(false);

  useEffect(() => {
    if (currentLineIndex < BOOT_SEQUENCE.length) {
      const timer = setTimeout(() => {
        setCurrentLineIndex((prev) => prev + 1);
      }, 350);
      return () => clearTimeout(timer);
    } else {
      setBootReady(true);
    }
  }, [currentLineIndex]);

  const handleSkip = () => {
    setCurrentLineIndex(BOOT_SEQUENCE.length);
    setBootReady(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#150B24] p-4 font-mono text-[#B7F45A] overflow-y-auto">
      {/* Background Matrix / Grid scanline effect */}
      <div 
        className="pointer-events-none absolute inset-0 opacity-15"
        style={{
          backgroundImage: 'linear-gradient(rgba(183, 244, 90, 0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(183, 244, 90, 0.2) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />

      <div className="relative w-full max-w-2xl retro-window bg-[#1E1233] border-4 border-[#8C65FF] shadow-[8px_8px_0px_#B7F45A] rounded-2xl overflow-hidden">
        {/* Terminal Title Bar */}
        <div className="bg-[#8C65FF] px-4 py-3 flex items-center justify-between border-b-4 border-[#150B24]">
          <div className="flex items-center gap-2 text-white font-bold text-sm tracking-wider">
            <Terminal className="w-5 h-5 text-[#FFDA35]" />
            <span>C:\SYS\BIRTHDAY.EXE — RETRO BOOT LOADER</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3.5 h-3.5 rounded-full bg-[#FF4FA3] border-2 border-[#1E1233]" />
            <span className="w-3.5 h-3.5 rounded-full bg-[#FFDA35] border-2 border-[#1E1233]" />
            <span className="w-3.5 h-3.5 rounded-full bg-[#B7F45A] border-2 border-[#1E1233]" />
          </div>
        </div>

        {/* Terminal Body */}
        <div className="p-5 sm:p-7 space-y-4 text-xs sm:text-sm">
          {/* Boot lines list */}
          <div className="space-y-1.5 min-h-[170px] bg-[#120921] p-4 rounded-xl border-2 border-[#8C65FF]/40 text-[#B7F45A] leading-relaxed">
            {BOOT_SEQUENCE.slice(0, currentLineIndex).map((line, idx) => {
              const isTarget = line.includes('TARGET FOUND');
              const isAge = line.includes('CLASSIFIED AGE');
              const isActivated = line.includes('ACTIVATED');

              return (
                <div key={idx} className="flex items-start gap-2">
                  <span className="text-[#FF4FA3] font-bold select-none">&gt;&gt;</span>
                  <span
                    className={
                      isTarget
                        ? 'text-[#FFDA35] font-extrabold bg-[#FFDA35]/20 px-1 rounded'
                        : isAge
                        ? 'text-[#FF4FA3] font-bold flex items-center gap-1'
                        : isActivated
                        ? 'text-white font-bold underline'
                        : 'text-[#B7F45A]'
                    }
                  >
                    {isAge && <ShieldAlert className="w-3.5 h-3.5 inline text-[#FF4FA3]" />}
                    {line}
                  </span>
                </div>
              );
            })}
            {!bootReady && (
              <div className="flex items-center gap-2 text-[#FFDA35] animate-pulse">
                <span>&gt;&gt;</span>
                <span>PROCESSING SYSTEM COMMANDS...</span>
              </div>
            )}
          </div>

          {/* Floppy Mascot Interaction Box */}
          <div className="bg-[#2D1B4E] border-3 border-[#FF4FA3] rounded-xl p-4 flex flex-col sm:flex-row items-center gap-4 shadow-[4px_4px_0px_#FF4FA3]">
            <Floppy pose={bootReady ? 'laughing' : 'roasting'} size={110} />
            <div className="flex-1 text-center sm:text-left space-y-2">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#FF4FA3] text-white text-[10px] font-extrabold tracking-wider">
                <Sparkles className="w-3 h-3" />
                <span>FLOPPY MEMORY BOT</span>
              </div>
              <p className="text-white text-sm font-sans font-semibold leading-snug">
                {bootReady
                  ? '“Sistem Pesta 100% Siap! Tekan tombol di bawah sekarang, Bunda Novi sudah ditunggu di panggung utama!”'
                  : '“Eits! Jangan buru-buru. Sistem sedang mempersiapkan pesta paling penting tahun ini!”'}
              </p>
              <p className="text-[#FFDA35] text-xs font-mono">
                Status: {bootReady ? 'READY FOR EXPLOSION OF JOY 🎉' : 'Calibrating confetti cannons...'}
              </p>
            </div>
          </div>

          {/* Action Button Section */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
            {!bootReady ? (
              <button
                onClick={handleSkip}
                className="text-xs text-[#C9C9D2] hover:text-[#FFDA35] underline underline-offset-4 font-mono transition-colors"
              >
                [Tekan untuk Lewati Booting &gt;&gt;]
              </button>
            ) : (
              <span className="text-xs text-[#B7F45A] font-mono">
                ✓ ALL CHECKS PASSED. ACCESS GRANTED.
              </span>
            )}

            <button
              onClick={onEnterParty}
              disabled={!bootReady}
              className={`w-full sm:w-auto px-7 py-3 rounded-xl font-bold font-sans text-base transition-all duration-200 flex items-center justify-center gap-2 border-3 border-[#1E1233] ${
                bootReady
                  ? 'bg-[#FFDA35] hover:bg-[#FFE566] text-[#1E1233] shadow-[5px_5px_0px_#B7F45A] hover:translate-x-[-2px] hover:translate-y-[-2px] active:translate-x-[2px] active:translate-y-[2px] cursor-pointer animate-pulse-pop'
                  : 'bg-gray-600 text-gray-400 opacity-60 cursor-not-allowed shadow-none'
              }`}
            >
              <Play className="w-5 h-5 fill-current" />
              <span>ENTER THE PARTY 🚀</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
