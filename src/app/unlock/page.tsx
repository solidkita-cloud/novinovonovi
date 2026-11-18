// src/app/unlock/page.tsx
'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { ScanFace, CheckCircle2, PartyPopper, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { Floppy } from '@/characters/Floppy';

function UnlockContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const sid = searchParams.get('sid') || 'demo';

  const [scanStep, setScanStep] = useState<'scanning' | 'verdict' | 'error'>('scanning');
  const [progress, setProgress] = useState(15);
  const [statusText, setStatusText] = useState('Menginisialisasi sensor biometrik wajah...');

  useEffect(() => {
    // Stage 1: Progress simulation (2.5 seconds of high-tech face scan)
    const t1 = setTimeout(() => {
      setProgress(45);
      setStatusText('Memindai kontur wajah dan ekspresi senyum Bunda Novi...');
    }, 800);

    const t2 = setTimeout(() => {
      setProgress(85);
      setStatusText('Mengecek database karyawan: Mencocokkan senyuman manis...');
    }, 1700);

    const t3 = setTimeout(async () => {
      setProgress(100);
      setStatusText('Pemindaian 100% Selesai! Menganalisis hasil...');

      // Send unlock signal to trigger the laptop screen explosion!
      try {
        await fetch('/api/unlock', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ sid }),
        });
      } catch (e) {
        // Continue anyway
      }

      setScanStep('verdict');
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#FF4FA3', '#FFDA35', '#B7F45A', '#8C65FF'],
      });
    }, 2600);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [sid]);

  return (
    <div className="min-h-screen bg-[#0F172A] text-white flex flex-col items-center justify-center p-5 text-center font-sans select-none relative overflow-hidden">
      {/* Background Matrix Grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-15"
        style={{
          backgroundImage:
            'linear-gradient(rgba(183, 244, 90, 0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(183, 244, 90, 0.2) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />

      <div className="relative max-w-sm w-full bg-[#1E293B] border-3 border-slate-600 rounded-3xl p-6 shadow-2xl space-y-6">
        {scanStep === 'scanning' && (
          <div className="space-y-6 py-4 animate-in fade-in duration-300">
            {/* Top Security Header */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-950/80 border border-red-500/50 text-red-400 text-[11px] font-mono font-bold">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
              <span>PEMINDAI BIOMETRIK AKTIF</span>
            </div>

            {/* Circular Face Reticle Frame */}
            <div className="relative mx-auto w-48 h-48 rounded-full border-4 border-dashed border-[#B7F45A] bg-[#0B132B] flex flex-col items-center justify-center overflow-hidden shadow-inner">
              <ScanFace className="w-20 h-20 text-[#B7F45A] animate-pulse" />

              {/* Animated Laser Scanning Line */}
              <div className="absolute inset-x-0 h-1 bg-[#B7F45A] shadow-[0_0_12px_#B7F45A] animate-laser" />

              <span className="absolute bottom-3 font-mono text-[10px] text-[#B7F45A] font-bold">
                {progress}% VERIFIED
              </span>
            </div>

            {/* Instruction and Progress Bar */}
            <div className="space-y-2">
              <h2 className="text-sm font-black text-slate-100 font-mono tracking-wide uppercase">
                Dekatkan Wajah Bunda ke Layar
              </h2>
              <p className="text-xs text-slate-400 font-sans min-h-[32px] leading-relaxed">
                {statusText}
              </p>

              {/* Progress Bar */}
              <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden border border-slate-700">
                <div
                  className="bg-gradient-to-r from-[#FF4FA3] via-[#FFDA35] to-[#B7F45A] h-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </div>
        )}

        {scanStep === 'verdict' && (
          <div className="space-y-5 animate-in zoom-in-95 duration-400 text-center">
            {/* Success Shield */}
            <div className="inline-flex p-3 rounded-full bg-emerald-950 border-3 border-emerald-500 text-emerald-400 shadow-lg animate-bounce">
              <CheckCircle2 className="w-12 h-12" />
            </div>

            <div className="space-y-1">
              <span className="inline-block px-3 py-1 rounded-full bg-[#FFDA35] text-[#1E1233] text-[10px] font-black font-mono">
                HASIL PEMINDAIAN BIOMETRIK:
              </span>
              <h1 className="text-2xl font-black text-[#B7F45A] leading-tight">
                WAJAH BUNDA NOVI TERDETEKSI! ✨
              </h1>
            </div>

            {/* The Funny Verdict Box */}
            <div className="bg-[#2D1B4E] border-2 border-[#FF4FA3] rounded-2xl p-4 text-left space-y-2 shadow-[4px_4px_0px_#FF4FA3]">
              <div className="flex items-center gap-2">
                <span className="text-xl">👑</span>
                <span className="text-xs font-mono font-black text-[#FFDA35] uppercase">
                  Hasil Analisis Komputer Kantor:
                </span>
              </div>
              <p className="text-xs sm:text-sm font-bold text-white leading-relaxed">
                “100% TERLALU CANTIK, AWET MUDA, & RAMAH UNTUK DIBERIKAN MASALAH KANTOR!”
              </p>
            </div>

            {/* Giant Call to Action to Look at the Laptop */}
            <div className="bg-[#FFF4E8] text-[#1E1233] p-4 rounded-2xl border-3 border-[#1E1233] shadow-[5px_5px_0px_#8C65FF] space-y-1 animate-pulse">
              <p className="text-[11px] font-mono font-bold text-[#8C65FF] uppercase">
                PERHATIAN BUNDA:
              </p>
              <p className="text-base sm:text-lg font-black text-[#1E1233] leading-snug">
                SEKARANG COBA LIHAT KE LAYAR LAPTOP DI DEPAN BUNDA! 👀💜
              </p>
            </div>

            {/* Button to view on phone too */}
            <button
              onClick={() => router.push('/')}
              className="w-full retro-btn retro-btn-pink text-xs sm:text-sm py-3.5 flex items-center justify-center gap-2 cursor-pointer shadow-[4px_4px_0px_#1E1233]"
            >
              <PartyPopper className="w-4 h-4" />
              <span>Buka Halaman Ulang Tahun di HP Ini</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function UnlockPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#0F172A] text-white flex items-center justify-center font-mono text-sm">
          Menyiapkan Sensor Biometrik...
        </div>
      }
    >
      <UnlockContent />
    </Suspense>
  );
}
