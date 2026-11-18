// src/app/portal/page.tsx
'use client';

import React, { useState, useEffect, useRef } from 'react';
import QRCode from 'qrcode';
import { useRouter } from 'next/navigation';
import { ShieldAlert, Lock, Maximize2, PartyPopper, AlertTriangle, Terminal } from 'lucide-react';
import confetti from 'canvas-confetti';
import { Floppy } from '@/characters/Floppy';
import { BundaNovi } from '@/characters/BundaNovi';
import { startMusicBox } from '@/lib/musicBox';

type PortalPhase = 'waiting' | 'shaking' | 'revealed';

export default function PortalPrankPage() {
  const router = useRouter();
  const [sessionId, setSessionId] = useState('');
  const [qrDataUrl, setQrDataUrl] = useState('');
  const [phase, setPhase] = useState<PortalPhase>('waiting');
  const [countdown, setCountdown] = useState(120); // 2 minutes urgent countdown
  const [glitchText, setGlitchText] = useState('>> MEMINDAI WAJAH BUNDA NOVI...');
  const pollIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Initialize session and QR code
  useEffect(() => {
    const sid = `novi-prank-${Math.floor(1000 + Math.random() * 9000)}`;
    setSessionId(sid);

    const unlockUrl = `https://novinovonovi.vercel.app/unlock?sid=${sid}`;
    QRCode.toDataURL(unlockUrl, {
      width: 270,
      margin: 1.5,
      color: {
        dark: '#0F172A',
        light: '#FFFFFF',
      },
    }).then((url) => {
      setQrDataUrl(url);
    });

    const timer = setInterval(() => {
      setCountdown((prev) => (prev > 0 ? prev - 1 : 120));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Poll for unlock signal from phone
  useEffect(() => {
    if (!sessionId || phase !== 'waiting') return;

    pollIntervalRef.current = setInterval(async () => {
      try {
        const res = await fetch(`/api/unlock?sid=${sessionId}`);
        const data = await res.json();
        if (data.success && data.unlocked) {
          triggerDramaticReveal();
        }
      } catch (err) {
        // silent error
      }
    }, 1000);

    return () => {
      if (pollIntervalRef.current) clearInterval(pollIntervalRef.current);
    };
  }, [sessionId, phase]);

  // Audio Synthesizer Beep for drama
  const playAlertBuzzer = () => {
    try {
      const AudioCtxClass =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtxClass) {
        const ctx = new AudioCtxClass();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(320, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(140, ctx.currentTime + 0.5);
        gain.gain.setValueAtTime(0.2, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.5);
      }
    } catch (e) {}
  };

  const triggerDramaticReveal = () => {
    if (pollIntervalRef.current) clearInterval(pollIntervalRef.current);

    // Phase 1: DRAMATIC SCREEN SHAKE & GLITCH (2.2 seconds)
    setPhase('shaking');
    playAlertBuzzer();

    const g1 = setTimeout(() => {
      setGlitchText('>> WAJAH BUNDA NOVI TERDETEKSI 100%!');
      playAlertBuzzer();
    }, 600);

    const g2 = setTimeout(() => {
      setGlitchText('>> ERROR 999: KECANTIKAN & KERAMAHAN MELEBIHI KAPASITAS CPU SERVER!');
    }, 1200);

    const g3 = setTimeout(() => {
      setGlitchText('>> SYSTEM OVERHEAT! MELEDAK DALAM 3... 2... 1...');
    }, 1800);

    // Phase 2: FULL CONFETTI EXPLOSION & REVEAL
    const finalTimer = setTimeout(() => {
      setPhase('revealed');
      startMusicBox();

      // Massive celebration fireworks
      const end = Date.now() + 5 * 1000;
      const colors = ['#FF4FA3', '#FFDA35', '#B7F45A', '#8C65FF', '#FFFFFF'];

      (function frame() {
        confetti({
          particleCount: 8,
          angle: 60,
          spread: 60,
          origin: { x: 0 },
          colors,
        });
        confetti({
          particleCount: 8,
          angle: 120,
          spread: 60,
          origin: { x: 1 },
          colors,
        });
        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      })();
    }, 2400);

    return () => {
      clearTimeout(g1);
      clearTimeout(g2);
      clearTimeout(g3);
      clearTimeout(finalTimer);
    };
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  };

  const formatCountdown = (sec: number) => {
    const m = Math.floor(sec / 60).toString().padStart(2, '0');
    const s = (sec % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  return (
    <div
      className={`min-h-screen bg-[#090D16] text-white flex flex-col justify-between font-sans selection:bg-red-500 selection:text-white relative overflow-hidden ${
        phase === 'shaking' ? 'animate-screen-shake bg-red-950/70' : ''
      }`}
    >
      {/* ======================================================== */}
      {/* PHASE 3: THE ULTIMATE REVEAL OVERLAY                     */}
      {/* ======================================================== */}
      {phase === 'revealed' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-gradient-to-br from-[#1E1233] via-[#4C1D95] to-[#150B24] animate-in zoom-in-95 duration-500 overflow-y-auto">
          <div className="retro-window max-w-3xl w-full bg-[#FFFDF9] text-[#1E1233] border-4 border-[#FFDA35] shadow-[12px_12px_0px_#FF4FA3] p-6 sm:p-10 text-center space-y-6">
            {/* Top Comic Banner */}
            <div className="inline-block transform -rotate-1 bg-[#FF4FA3] text-white font-mono font-black text-xs sm:text-sm px-6 py-2 rounded-full border-3 border-[#1E1233] shadow-[4px_4px_0px_#1E1233] tracking-widest uppercase animate-bounce">
              🎉 SYSTEM OVERHEAT: PRANK KANTOR 100% SUKSES! 🎉
            </div>

            {/* Giant Comedy Punchline */}
            <div className="space-y-3">
              <h1 className="text-3xl sm:text-6xl font-black text-[#1E1233] tracking-tight leading-none drop-shadow-sm">
                WKWKWK PANIK GAK BUNDA?! 🤣
              </h1>
              <p className="text-2xl sm:text-4xl font-black text-[#8C65FF] tracking-wide">
                PANIK LAH MASA NGGAK! 💜✨
              </p>
              <div className="max-w-xl mx-auto p-4 bg-[#FFF8E7] rounded-2xl border-2 border-[#FFDA35] shadow-sm">
                <p className="text-sm sm:text-base font-extrabold text-[#5B21B6] leading-relaxed">
                  “Tenang Bundaaa, server dan data kantor aman sentosa! Tidak ada file yang hilang! Yang ada hari ini cuma kue, tawa, dan cinta dari seluruh rekan kantor!”
                </p>
              </div>
            </div>

            {/* Duo Characters Celebration */}
            <div className="flex items-center justify-center gap-6 sm:gap-10 py-1">
              <BundaNovi pose="laughing" size={170} />
              <Floppy pose="cake" size={150} />
            </div>

            {/* Action Button to Full Party */}
            <div className="pt-2">
              <button
                onClick={() => router.push('/')}
                className="w-full sm:w-auto px-10 py-4 retro-btn retro-btn-pink text-base sm:text-lg font-black cursor-pointer shadow-[6px_6px_0px_#FFDA35] animate-pulse-pop"
              >
                <PartyPopper className="w-6 h-6" />
                <span>BUKA PANGGUNG PESTA BUNDA NOVI SEKARANG! 🚀</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* PHASE 2: DRAMATIC GLITCH & SHAKE OVERLAY                 */}
      {/* ======================================================== */}
      {phase === 'shaking' && (
        <div className="fixed inset-0 z-40 bg-black/85 flex flex-col items-center justify-center p-6 text-center space-y-6 font-mono">
          <div className="text-red-500 text-6xl sm:text-8xl animate-ping select-none">
            ⚠️
          </div>
          <div className="space-y-3 max-w-lg">
            <h2 className="text-2xl sm:text-4xl font-black text-red-500 tracking-wider">
              CRITICAL SYSTEM FAULT!
            </h2>
            <div className="bg-red-950/80 border-2 border-red-500 p-4 rounded-xl text-left text-xs sm:text-sm text-yellow-300 space-y-1">
              <p>{glitchText}</p>
              <p className="text-red-400">&gt;&gt; OVERRIDING PERMISSIONS...</p>
              <p className="text-white font-bold">&gt;&gt; UNLOCKING CELEBRATION PROTOCOL...</p>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* PHASE 1: THE ENTERPRISE SECURITY PRANK SCREEN            */}
      {/* ======================================================== */}
      {/* Top Header */}
      <header className="bg-[#111827] border-b-2 border-slate-800 px-6 py-3 flex items-center justify-between shadow-lg">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-red-600 rounded-lg text-white shadow-md">
            <ShieldAlert className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <h1 className="font-mono font-black text-xs sm:text-sm tracking-wider text-slate-100 uppercase">
              SISTEM SENTRAL DATA KEUANGAN & ABSENSI KANTOR v3.2
            </h1>
            <p className="font-mono text-[10px] text-red-400 font-bold">
              STATUS: [ CRITICAL LEVEL 4: SYSTEM ENCRYPTION PENDING ]
            </p>
          </div>
        </div>

        <button
          onClick={toggleFullscreen}
          className="text-xs font-mono font-bold text-slate-300 hover:text-white flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 cursor-pointer transition-colors"
          title="Layar Penuh (F11)"
        >
          <Maximize2 className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Layar Penuh (F11)</span>
        </button>
      </header>

      {/* Main Center Area with QR Code */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-8">
        <div className="max-w-xl w-full bg-[#111827] border-2 border-slate-700 rounded-2xl p-6 sm:p-10 shadow-2xl text-center space-y-6">
          {/* Urgent Threat Warning */}
          <div className="p-4 bg-red-950/70 border-2 border-red-600/70 rounded-xl text-left space-y-2">
            <div className="flex items-center gap-2 text-red-400 font-mono font-black text-xs tracking-wider">
              <AlertTriangle className="w-4 h-4 text-red-500 animate-bounce" />
              <span>PERINGATAN: DATA KANTOR DIKUNCI SEMENTARA</span>
            </div>
            <p className="text-xs text-slate-300 font-sans leading-relaxed">
              Sesi kerja membutuhkan otentikasi biometrik ganda untuk Operator Target:{' '}
              <span className="text-yellow-400 font-black underline">BUNDA NOVI</span>.
              Jika pemindaian tidak dilakukan dalam waktu yang ditentukan, seluruh jatah cuti, file Excel keuangan, dan jatah camilan kantor akan otomatis dipindahkan ke divisi IT!
            </p>
          </div>

          {/* High-Tech QR Code with animated laser scan line */}
          <div className="relative inline-block p-4 bg-white rounded-2xl border-4 border-slate-600 shadow-inner">
            {qrDataUrl ? (
              <img
                src={qrDataUrl}
                alt="Authentication QR Code"
                className="w-60 h-60 sm:w-68 sm:h-68 object-contain rounded-lg"
              />
            ) : (
              <div className="w-60 h-60 flex items-center justify-center font-mono text-xs text-slate-500">
                Membuat QR Code Otentikasi...
              </div>
            )}
            {/* Animated Laser Scanning Beam */}
            <div className="absolute inset-x-4 top-4 h-1 bg-red-600 shadow-[0_0_12px_#EF4444] animate-laser pointer-events-none" />
          </div>

          {/* Sesi & Countdown Timer */}
          <div className="space-y-1 font-mono text-xs text-slate-400">
            <p>
              ID SESI: <span className="text-amber-400 font-bold">{sessionId || 'MEMUAT...'}</span>
            </p>
            <p className="text-xs text-slate-300 font-bold">
              Arahkan kamera ponsel Bunda Novi ke QR Code di atas 📱
            </p>
            <p className="text-xs text-red-400 font-black tracking-wider pt-1">
              DATA TERANCAM TERHAPUS DALAM: {formatCountdown(countdown)} ⏳
            </p>
          </div>

          {/* Secret Manual Trigger for testing without phone */}
          <div className="pt-2 border-t border-slate-800">
            <button
              onClick={triggerDramaticReveal}
              className="text-[10px] font-mono text-slate-500 hover:text-slate-300 underline cursor-pointer"
            >
              [Klik di sini untuk uji coba efek ledakan langsung tanpa scan]
            </button>
          </div>
        </div>
      </main>

      {/* Footer Status */}
      <footer className="bg-[#111827] border-t border-slate-800 px-6 py-2.5 flex items-center justify-between text-xs font-mono text-slate-500">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-slate-400">STATUS SENSOR: ACTIVE & LISTENING</span>
        </div>
        <span className="text-[10px]">KEAMANAN KANTOR • STRICT LEVEL 4</span>
      </footer>
    </div>
  );
}
