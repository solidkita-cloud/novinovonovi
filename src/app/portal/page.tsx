// src/app/portal/page.tsx
'use client';

import React, { useState, useEffect, useRef } from 'react';
import QRCode from 'qrcode';
import { useRouter } from 'next/navigation';
import { ShieldAlert, Lock, CheckCircle, Maximize2, Sparkles, RefreshCw, PartyPopper } from 'lucide-react';
import confetti from 'canvas-confetti';
import { Floppy } from '@/characters/Floppy';
import { BundaNovi } from '@/characters/BundaNovi';
import { startMusicBox } from '@/lib/musicBox';

type PrankMode = 'office-prank' | 'floppy-retro' | 'sweet-gift';

export default function PortalPrankPage() {
  const router = useRouter();
  const [sessionId, setSessionId] = useState('');
  const [qrDataUrl, setQrDataUrl] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [mode, setMode] = useState<PrankMode>('office-prank');
  const [countdown, setCountdown] = useState(300); // 5 minutes countdown
  const [isFullscreen, setIsFullscreen] = useState(false);
  const pollIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Initialize unique session
  useEffect(() => {
    const sid = `novi-auth-${Math.floor(1000 + Math.random() * 9000)}`;
    setSessionId(sid);

    // Generate QR Code targeting the unlock route
    const unlockUrl = `https://novinovonovi.vercel.app/unlock?sid=${sid}`;
    QRCode.toDataURL(unlockUrl, {
      width: 260,
      margin: 1.5,
      color: {
        dark: '#1E1233',
        light: '#FFFFFF',
      },
    }).then((url) => {
      setQrDataUrl(url);
    });

    // Countdown timer simulation
    const timer = setInterval(() => {
      setCountdown((prev) => (prev > 0 ? prev - 1 : 300));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Poll for unlock signal
  useEffect(() => {
    if (!sessionId || isUnlocked) return;

    pollIntervalRef.current = setInterval(async () => {
      try {
        const res = await fetch(`/api/unlock?sid=${sessionId}`);
        const data = await res.json();
        if (data.success && data.unlocked) {
          triggerSurpriseReveal();
        }
      } catch (err) {
        // silent error on poll
      }
    }, 1200);

    return () => {
      if (pollIntervalRef.current) clearInterval(pollIntervalRef.current);
    };
  }, [sessionId, isUnlocked]);

  const triggerSurpriseReveal = () => {
    setIsUnlocked(true);
    if (pollIntervalRef.current) clearInterval(pollIntervalRef.current);

    // Start celebration music box automatically
    startMusicBox();

    // Trigger massive celebratory confetti burst
    const end = Date.now() + 4 * 1000;
    const colors = ['#FF4FA3', '#FFDA35', '#B7F45A', '#8C65FF', '#FFFFFF'];

    (function frame() {
      confetti({
        particleCount: 7,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors,
      });
      confetti({
        particleCount: 7,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  const formatCountdown = (sec: number) => {
    const m = Math.floor(sec / 60).toString().padStart(2, '0');
    const s = (sec % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  return (
    <div className="min-h-screen bg-[#0F172A] text-white flex flex-col justify-between font-sans selection:bg-red-500 selection:text-white relative overflow-hidden">
      {/* --- SURPRISE REVEAL OVERLAY (TRIGGERS WHEN SCANNED) --- */}
      {isUnlocked ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-gradient-to-br from-[#1E1233] via-[#4C1D95] to-[#150B24] animate-in zoom-in-95 duration-500">
          <div className="retro-window max-w-2xl w-full bg-white text-[#1E1233] border-4 border-[#FFDA35] shadow-[10px_10px_0px_#FF4FA3] p-8 text-center space-y-6">
            {/* Header Tag */}
            <div className="inline-block bg-[#FF4FA3] text-white font-mono font-black text-xs sm:text-sm px-6 py-1.5 rounded-full border-2 border-[#1E1233] shadow-[3px_3px_0px_#1E1233] tracking-widest uppercase animate-bounce">
              🎉 SYSTEM OVERRIDE: PRANK KANTOR BERHASIL! 🎉
            </div>

            <div className="space-y-2">
              <h1 className="text-3xl sm:text-5xl font-black text-[#1E1233] tracking-tight">
                KENA PRANK, BUNDA! 🥳💜
              </h1>
              <p className="text-xl sm:text-2xl font-black text-[#8C65FF]">
                SELAMAT ULANG TAHUN BUNDA NOVI TERSAYANG!
              </p>
              <p className="text-sm sm:text-base font-bold text-[#554070]">
                “Tidak ada data kantor yang terkunci kok! Ini kejutan spesial dari teman-teman kantor buat Bunda!”
              </p>
            </div>

            {/* Character Duo Celebration */}
            <div className="flex items-center justify-center gap-6 py-2">
              <BundaNovi pose="laughing" size={150} />
              <Floppy pose="cake" size={135} />
            </div>

            {/* Continue to main party CTA */}
            <div className="pt-2">
              <button
                onClick={() => router.push('/')}
                className="w-full sm:w-auto px-8 py-3.5 retro-btn retro-btn-pink text-base font-black cursor-pointer shadow-[5px_5px_0px_#FFDA35] animate-pulse-pop"
              >
                <PartyPopper className="w-5 h-5" />
                <span>BUKA PANGGUNG PESTA LENGKAP 🚀</span>
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {/* --- TOP BAR (LOOKS LIKE SERIOUS ENTERPRISE SECURITY PORTAL) --- */}
      <header className="bg-[#1E293B] border-b-2 border-slate-700 px-6 py-3 flex items-center justify-between shadow-md">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-red-600 rounded-lg text-white">
            <ShieldAlert className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <h1 className="font-mono font-black text-xs sm:text-sm tracking-wider text-slate-100 uppercase">
              {mode === 'office-prank'
                ? 'SISTEM VERIFIKASI KEAMANAN DATA KARYAWAN v3.2'
                : mode === 'floppy-retro'
                ? 'CLASSIFIED PROTOCOL: FLOPPY LOCKDOWN'
                : 'PORTAL PESAN KHUSUS BUNDA NOVI'}
            </h1>
            <p className="font-mono text-[10px] text-slate-400">
              STATUS: [ SESSION RESTRICTED • LEVEL 4 VERIFICATION REQUIRED ]
            </p>
          </div>
        </div>

        <button
          onClick={toggleFullscreen}
          className="text-xs font-mono font-bold text-slate-300 hover:text-white flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-600 cursor-pointer transition-colors"
          title="Tampilan Layar Penuh (F11)"
        >
          <Maximize2 className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Layar Penuh</span>
        </button>
      </header>

      {/* --- MAIN BODY WITH QR CODE --- */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-8">
        <div className="max-w-xl w-full bg-[#1E293B] border-2 border-slate-700 rounded-2xl p-6 sm:p-10 shadow-2xl text-center space-y-6">
          {/* Warning Banner */}
          <div className="p-4 bg-red-950/60 border border-red-500/50 rounded-xl text-left space-y-1">
            <div className="flex items-center gap-2 text-red-400 font-mono font-black text-xs tracking-wider">
              <Lock className="w-4 h-4" />
              <span>AKSES SERVER KANTOR DIKUNCI SEMENTARA:</span>
            </div>
            <p className="text-xs text-slate-300 font-sans leading-relaxed">
              {mode === 'office-prank'
                ? 'Aktivitas membutuhkan otentikasi ganda perangkat. Mohon pindai QR Code di bawah menggunakan ponsel karyawan yang berwenang (Bunda Novi) untuk membuka kunci akses data.'
                : 'Pintu gerbang rahasia terkunci! Pindai QR Code di bawah menggunakan kamera HP Bunda Novi untuk membuka brankas rahasia.'}
            </p>
          </div>

          {/* QR Code Container with Scanner Frame */}
          <div className="relative inline-block p-4 bg-white rounded-2xl border-4 border-slate-600 shadow-inner">
            {qrDataUrl ? (
              <img
                src={qrDataUrl}
                alt="Authentication QR Code"
                className="w-56 h-56 sm:w-64 sm:h-64 object-contain rounded-lg"
              />
            ) : (
              <div className="w-56 h-56 flex items-center justify-center font-mono text-xs text-slate-500">
                Membuat QR Code...
              </div>
            )}
            {/* Subtle animated scanline */}
            <div className="absolute inset-x-4 top-4 h-0.5 bg-red-500/80 animate-bounce pointer-events-none" />
          </div>

          {/* Verification Details */}
          <div className="space-y-1 font-mono text-xs text-slate-400">
            <p>
              ID SESI: <span className="text-amber-400 font-bold">{sessionId || 'MEMUAT...'}</span>
            </p>
            <p className="text-[11px] text-slate-400">
              Menunggu pemindaian dari kamera ponsel Bunda Novi...
            </p>
            <p className="text-[10px] text-red-400 font-bold">
              KUNCI KADALUARSA DALAM: {formatCountdown(countdown)}
            </p>
          </div>

          {/* Manual Trigger Test Button for Testing without scanning */}
          <div className="pt-2">
            <button
              onClick={triggerSurpriseReveal}
              className="text-[10px] font-mono text-slate-400 hover:text-slate-300 underline cursor-pointer"
            >
              [Klik di sini untuk uji coba meledak langsung tanpa scan]
            </button>
          </div>
        </div>
      </main>

      {/* --- FOOTER & MODE SWITCHER TOOLBAR --- */}
      <footer className="bg-[#1E293B] border-t-2 border-slate-700 px-6 py-2.5 flex flex-wrap items-center justify-between text-xs font-mono text-slate-400 gap-2">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span>LISTENER STATUS: ACTIVE & LISTENING</span>
        </div>

        {/* Secret Mode Switcher */}
        <div className="flex items-center gap-1.5">
          <span className="text-[10px]">TEMA TAMPILAN:</span>
          <button
            onClick={() => setMode('office-prank')}
            className={`px-2 py-1 rounded text-[10px] cursor-pointer ${
              mode === 'office-prank'
                ? 'bg-red-600 text-white font-bold'
                : 'bg-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            🕵️ Prank Kantor
          </button>
          <button
            onClick={() => setMode('floppy-retro')}
            className={`px-2 py-1 rounded text-[10px] cursor-pointer ${
              mode === 'floppy-retro'
                ? 'bg-purple-600 text-white font-bold'
                : 'bg-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            💾 Floppy Y2K
          </button>
        </div>
      </footer>
    </div>
  );
}
