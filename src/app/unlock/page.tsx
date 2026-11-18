// src/app/unlock/page.tsx
'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Sparkles, Eye, PartyPopper, CheckCircle2, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';
import { Floppy } from '@/characters/Floppy';

function UnlockContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const sid = searchParams.get('sid') || 'demo';
  const [status, setStatus] = useState<'unlocking' | 'success' | 'error'>('unlocking');

  useEffect(() => {
    const triggerUnlock = async () => {
      try {
        const res = await fetch('/api/unlock', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ sid }),
        });
        if (res.ok) {
          setStatus('success');
          confetti({
            particleCount: 80,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#FF4FA3', '#FFDA35', '#B7F45A', '#8C65FF'],
          });
        } else {
          setStatus('error');
        }
      } catch (err) {
        setStatus('error');
      }
    };

    triggerUnlock();
  }, [sid]);

  return (
    <div className="min-h-screen bg-[#FFF4E8] flex flex-col items-center justify-center p-6 text-center select-none font-sans">
      <div className="max-w-md w-full bg-white border-4 border-[#1E1233] rounded-3xl p-8 shadow-[8px_8px_0px_#8C65FF] space-y-6">
        {status === 'unlocking' && (
          <div className="space-y-4 py-8">
            <div className="inline-block animate-spin text-4xl">⏳</div>
            <h2 className="text-xl font-black text-[#1E1233]">
              Memverifikasi Kunci Sesi...
            </h2>
            <p className="text-xs text-gray-500 font-mono">
              Menghubungkan ke layar utama...
            </p>
          </div>
        )}

        {status === 'success' && (
          <div className="space-y-5 animate-in fade-in zoom-in duration-300">
            <div className="inline-flex p-3 rounded-full bg-[#EBFDE2] border-3 border-[#16A34A] text-[#16A34A]">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <span className="retro-badge bg-[#FFDA35] text-[#1E1233] text-xs">
                KUNCI BERHASIL DIBUKA!
              </span>
              <h1 className="text-2xl sm:text-3xl font-black text-[#8C65FF] leading-snug">
                SEKARANG COBA LIHAT KE LAYAR LAPTOP, BUNDA! 👀💜
              </h1>
            </div>

            <div className="bg-[#FAF5FF] p-4 rounded-2xl border-2 border-[#8C65FF] flex items-center gap-3 text-left">
              <Floppy pose="laughing" size={65} />
              <p className="text-xs font-bold text-[#5B21B6] leading-relaxed">
                “WKWKWK! Layar laptopnya sudah berubah total jadi pesta ulang tahun khusus buat Bunda Novi!”
              </p>
            </div>

            <button
              onClick={() => router.push('/')}
              className="w-full retro-btn retro-btn-pink text-sm py-3.5 flex items-center justify-center gap-2 cursor-pointer"
            >
              <PartyPopper className="w-4 h-4" />
              <span>Buka Pesta di HP Ini Juga</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {status === 'error' && (
          <div className="space-y-4">
            <h2 className="text-xl font-black text-red-600">Gagal Membuka Sesi</h2>
            <p className="text-xs text-gray-600">
              Silakan coba scan ulang QR Code di layar.
            </p>
            <button
              onClick={() => router.push('/')}
              className="retro-btn retro-btn-yellow text-xs"
            >
              Buka Halaman Utama Langsung
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function UnlockPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#FFF4E8] flex items-center justify-center">Memuat...</div>}>
      <UnlockContent />
    </Suspense>
  );
}
