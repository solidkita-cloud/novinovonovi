// src/components/surprises/MysteryBox.tsx
'use client';

import React, { useState } from 'react';
import { INITIAL_VOUCHERS } from '@/data/surprises';
import { MysteryVoucher } from '@/types/birthday';
import { Gift, CheckCircle, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

export const MysteryBox: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [vouchers, setVouchers] = useState<MysteryVoucher[]>(INITIAL_VOUCHERS);

  const handleOpenBox = () => {
    if (!isOpen) {
      setIsOpen(true);
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#FFDA35', '#FF4FA3', '#8C65FF'],
      });
    }
  };

  const handleClaimVoucher = (id: string) => {
    setVouchers((prev) =>
      prev.map((v) => (v.id === id ? { ...v, isClaimed: true } : v))
    );
    confetti({
      particleCount: 30,
      spread: 50,
      origin: { y: 0.8 },
      colors: ['#B7F45A', '#FF4FA3'],
    });
  };

  return (
    <div className="bg-white border-3 border-[#1E1233] rounded-2xl p-6 shadow-[6px_6px_0px_#1E1233] flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-4">
          <span className="retro-badge bg-[#FFDA35] text-[#1E1233]">
            FEATURE A: MYSTERY BOX
          </span>
          <span className="text-2xl">🎁</span>
        </div>

        <h3 className="text-xl font-black text-[#1E1233] mb-2">
          Kotak Kado Kejutan Kantor 📦
        </h3>
        <p className="text-xs sm:text-sm text-[#554070] font-semibold mb-6">
          Ketuk kotak kado di bawah untuk membuka kupon voucher kebahagiaan khusus Bunda Novi!
        </p>

        {!isOpen ? (
          <div className="py-8 text-center">
            <button
              onClick={handleOpenBox}
              className="group relative inline-flex flex-col items-center justify-center p-6 bg-[#FAF5FF] hover:bg-[#F3E8FF] border-3 border-[#8C65FF] rounded-2xl shadow-[5px_5px_0px_#8C65FF] cursor-pointer transition-all duration-300 hover:scale-105 active:scale-95"
            >
              <div className="text-6xl group-hover:scale-110 transition-transform animate-bounce">
                🎁
              </div>
              <span className="mt-4 retro-btn retro-btn-pink text-xs sm:text-sm">
                <Sparkles className="w-4 h-4" />
                BUKA KOTAK SEKARANG!
              </span>
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            <p className="text-xs font-mono font-bold text-[#8C65FF] text-center">
              🎉 KUPON SPESIAL BUNDA NOVI TERBUKA! (Klik untuk klaim)
            </p>
            {vouchers.map((voucher) => (
              <div
                key={voucher.id}
                className={`p-3.5 rounded-xl border-2 border-[#1E1233] transition-all flex items-center justify-between gap-3 ${
                  voucher.isClaimed
                    ? 'bg-[#F0FDF4] border-[#16A34A] opacity-90'
                    : 'bg-[#FFF8E7] hover:bg-[#FFF2D1]'
                }`}
              >
                <div className="space-y-0.5">
                  <p className="text-xs sm:text-sm font-black text-[#1E1233]">
                    {voucher.title}
                  </p>
                  <p className="text-[11px] text-[#554070] font-semibold">
                    {voucher.description}
                  </p>
                </div>
                <button
                  onClick={() => handleClaimVoucher(voucher.id)}
                  disabled={voucher.isClaimed}
                  className={`shrink-0 px-3 py-1.5 rounded-lg text-xs font-bold border-2 border-[#1E1233] transition-all ${
                    voucher.isClaimed
                      ? 'bg-[#B7F45A] text-[#1E1233] cursor-default'
                      : 'bg-[#FF4FA3] text-white hover:bg-[#FF2E90] cursor-pointer shadow-[2px_2px_0px_#1E1233]'
                  }`}
                >
                  {voucher.isClaimed ? 'KLAIMED ✓ 🌸' : 'KLAIM!'}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
