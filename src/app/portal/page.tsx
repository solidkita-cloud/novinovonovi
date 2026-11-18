// src/app/portal/page.tsx
'use client';

import React, { useState, useEffect, useRef } from 'react';
import QRCode from 'qrcode';
import { useRouter } from 'next/navigation';
import { ShieldAlert, Maximize2, PartyPopper, AlertTriangle } from 'lucide-react';
import confetti from 'canvas-confetti';
import { Floppy } from '@/characters/Floppy';
import { BundaNovi } from '@/characters/BundaNovi';
import { startMusicBox } from '@/lib/musicBox';

type PortalPhase = 'waiting' | 'crash-blank' | 'reboot-shake' | 'revealed';

export default function PortalPrankPage() {
  const router = useRouter();
  const [sessionId, setSessionId] = useState('');
  const [qrDataUrl, setQrDataUrl] = useState('');
  const [phase, setPhase] = useState<PortalPhase>('waiting');
  const [countdown, setCountdown] = useState(120); // 2 minutes countdown
  const pollIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Initialize session and QR code
  useEffect(() => {
    // Hidden random identifier without the word "prank"
    const sid = `auth-${Math.floor(100000 + Math.random() * 900000)}`;
    setSessionId(sid);

    const unlockUrl = `https://novinovonovi.vercel.app/unlock?sid=${sid}`;
    QRCode.toDataURL(unlockUrl, {
      width: 280,
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
          triggerSuspensePrank();
        }
      } catch (err) {
        // silent error
      }
    }, 1000);

    return () => {
      if (pollIntervalRef.current) clearInterval(pollIntervalRef.current);
    };
  }, [sessionId, phase]);

  // Audio Synthesizer Beep for celebration explosion
  const playExplosionSound = () => {
    try {
      const AudioCtxClass =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtxClass) {
        const ctx = new AudioCtxClass();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(440, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.3);
        gain.gain.setValueAtTime(0.3, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.6);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.6);
      }
    } catch (e) {}
  };

  const triggerSuspensePrank = () => {
    if (pollIntervalRef.current) clearInterval(pollIntervalRef.current);

    // STEP 1: SUDDEN CRASH & PITCH BLACK BLANK SCREEN FOR 10 FULL SECONDS!
    // (Bikin satu ruangan hening & panik: "Lho layarnya mati beneran?! Rusak apa ya?!")
    setPhase('crash-blank');

    // STEP 2: At Second 10.0 -> Quick glitch/reboot warning (1.2 detik)
    const tShake = setTimeout(() => {
      setPhase('reboot-shake');
      playExplosionSound();
    }, 10000);

    // STEP 3: At Second 11.2 -> KABOOOOM! CELEBRATION EXPLOSION!
    const tReveal = setTimeout(() => {
      setPhase('revealed');
      startMusicBox();

      // Massive continuous confetti storm from both sides
      const end = Date.now() + 6 * 1000;
      const colors = ['#FF4FA3', '#FFDA35', '#B7F45A', '#8C65FF', '#FFFFFF'];

      (function frame() {
        confetti({
          particleCount: 9,
          angle: 60,
          spread: 65,
          origin: { x: 0 },
          colors,
        });
        confetti({
          particleCount: 9,
          angle: 120,
          spread: 65,
          origin: { x: 1 },
          colors,
        });
        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      })();
    }, 11200);

    return () => {
      clearTimeout(tShake);
      clearTimeout(tReveal);
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
    <div className="min-h-screen bg-[#060911] text-white flex flex-col justify-between font-sans selection:bg-red-500 selection:text-white relative overflow-hidden select-none">
      {/* ======================================================== */}
      {/* FASE 2: PITCH BLACK BLANK CRASH (5 - 6 DETIK MENEGANGKAN) */}
      {/* ======================================================== */}
      {phase === 'crash-blank' && (
        <div className="fixed inset-0 z-50 bg-black flex flex-col justify-between p-8 font-mono text-xs text-neutral-600 animate-in fade-in duration-200 cursor-none">
          <div className="space-y-1">
            <p className="text-neutral-500">SYSTEM FAILURE: IRQ_NOT_LESS_OR_EQUAL (0x0000000A)</p>
            <p>Dumping physical memory to disk: 100% completed.</p>
            <p>Terminating active display session...</p>
          </div>
          {/* Pitch black center - looks like the monitor literally died */}
          <div className="flex-1 flex items-center justify-center">
            <span className="w-2.5 h-4 bg-neutral-700 animate-pulse" />
          </div>
          <p className="text-[10px] text-neutral-700 text-center">
            Signal lost. Attempting hardware reboot...
          </p>
        </div>
      )}

      {/* ======================================================== */}
      {/* FASE 3: GLITCH & REBOOT (1 DETIK SEBELUM MELEDAK)         */}
      {/* ======================================================== */}
      {phase === 'reboot-shake' && (
        <div className="fixed inset-0 z-50 bg-red-950/90 flex flex-col items-center justify-center p-6 text-center font-mono animate-screen-shake">
          <div className="text-yellow-400 text-7xl animate-ping mb-4">⚠️</div>
          <h2 className="text-3xl sm:text-5xl font-black text-red-500 tracking-widest mb-2">
            OVERRIDING SYSTEM LOCK!
          </h2>
          <p className="text-yellow-300 text-lg font-bold">
            DETONATING SURPRISE IN 3... 2... 1...
          </p>
        </div>
      )}

      {/* ======================================================== */}
      {/* FASE 4: THE ULTIMATE "PANIK GAK BUNDA?!" REVEAL          */}
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
                  “Tenang Bundaaa, laptop & data kantor aman sentosa! Tidak ada file yang hilang! Yang ada hari ini cuma kue, tumpeng, tawa, dan cinta dari seluruh rekan kantor!”
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
      {/* FASE 1: TAMPILAN PRANK SERIUS DENGAN TIMER RAKSASA       */}
      {/* ======================================================== */}
      {/* Top Header */}
      <header className="bg-[#0F172A] border-b-2 border-slate-800 px-6 py-3.5 flex items-center justify-between shadow-lg">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-red-600 rounded-lg text-white shadow-md animate-pulse">
            <ShieldAlert className="w-5 h-5" />
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

      {/* Main Center Area with QR Code & Giant Timer */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-6">
        <div className="max-w-xl w-full bg-[#0F172A] border-2 border-slate-700 rounded-2xl p-6 sm:p-8 shadow-2xl text-center space-y-6">
          {/* Urgent Threat Warning */}
          <div className="p-4 bg-red-950/70 border-2 border-red-600/70 rounded-xl text-left space-y-2">
            <div className="flex items-center gap-2 text-red-400 font-mono font-black text-xs tracking-wider">
              <AlertTriangle className="w-4 h-4 text-red-500 animate-pulse" />
              <span>PERINGATAN RESMI: PROTOKOL KEAMANAN DATA AKTIF</span>
            </div>
            <p className="text-xs text-slate-300 font-sans leading-relaxed">
              Terdeteksi anomali pada sesi workstation internal. Sesuai dengan Kebijakan Tata Kelola Keamanan TI, sistem memerlukan otentikasi biometrik ganda untuk verifikasi hak akses pengguna:{' '}
              <span className="text-yellow-400 font-black underline tracking-wide">NOVI</span>.
            </p>
            <p className="text-[11px] text-slate-400 font-sans leading-relaxed border-t border-red-900/50 pt-1.5">
              Harap segera selesaikan pemindaian verifikasi identitas sebelum batas waktu berakhir guna mencegah isolasi data dan penguncian akun secara otomatis oleh sistem keamanan pusat.
            </p>
          </div>

          {/* High-Tech QR Code with animated laser scan line */}
          <div className="relative inline-block p-4 bg-white rounded-2xl border-4 border-slate-600 shadow-inner">
            {qrDataUrl ? (
              <img
                src={qrDataUrl}
                alt="Authentication QR Code"
                className="w-56 h-56 sm:w-64 sm:h-64 object-contain rounded-lg"
              />
            ) : (
              <div className="w-56 h-56 flex items-center justify-center font-mono text-xs text-slate-500">
                Membuat QR Code Otentikasi...
              </div>
            )}
            {/* Animated Laser Scanning Beam */}
            <div className="absolute inset-x-4 top-4 h-1 bg-red-600 shadow-[0_0_12px_#EF4444] animate-laser pointer-events-none" />
          </div>

          {/* TIMER RAKSASA (Bikin Panik!) */}
          <div className="bg-[#1E122A] p-4 rounded-xl border-2 border-red-500/60 shadow-[0_0_20px_rgba(239,68,68,0.2)] space-y-1">
            <p className="text-[11px] font-mono font-bold text-red-400 uppercase tracking-widest">
              SISA WAKTU SEBELUM SISTEM DIKUNCI PERMANEN:
            </p>
            <div className="text-4xl sm:text-6xl font-mono font-black text-red-500 tracking-widest drop-shadow-[0_0_10px_rgba(239,68,68,0.8)] animate-pulse">
              {formatCountdown(countdown)}
            </div>
            <p className="text-xs text-slate-300 font-mono pt-1">
              Pindai QR Code di atas menggunakan kamera ponsel untuk verifikasi identitas (2FA)
            </p>
          </div>

          {/* Secret Manual Trigger for testing without phone */}
          <div className="pt-1 border-t border-slate-800">
            <button
              onClick={triggerSuspensePrank}
              className="text-[10px] font-mono text-slate-600 hover:text-slate-400 underline cursor-pointer"
            >
              [Klik di sini untuk uji coba efek ledakan langsung tanpa scan]
            </button>
          </div>
        </div>
      </main>

      {/* Footer Status */}
      <footer className="bg-[#0F172A] border-t border-slate-800 px-6 py-2.5 flex items-center justify-between text-xs font-mono text-slate-500">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-slate-400">STATUS SENSOR: ACTIVE & LISTENING</span>
        </div>
        <span className="text-[10px]">KEAMANAN KANTOR • STRICT LEVEL 4</span>
      </footer>
    </div>
  );
}
