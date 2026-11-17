// src/components/wishes/WishSection.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { WishWall } from './WishWall';
import { WishForm } from './WishForm';
import { Wish } from '@/types/birthday';
import { SEED_WISHES } from '@/data/seedWishes';
import { Floppy } from '@/characters/Floppy';
import { MessageSquareHeart, RefreshCw, ShieldCheck } from 'lucide-react';

export const WishSection: React.FC = () => {
  const [wishes, setWishes] = useState<Wish[]>(SEED_WISHES);
  const [loading, setLoading] = useState(false);

  const fetchWishes = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/wishes');
      const data = await res.json();
      if (data.success && data.data && data.data.length > 0) {
        setWishes(data.data);
      }
    } catch (err) {
      console.warn('Using seed wishes fallback:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWishes();
  }, []);

  return (
    <section id="wall-of-wishes" className="py-12 px-4 max-w-5xl mx-auto space-y-10">
      {/* Section Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#8C65FF] border-2 border-[#1E1233] text-xs font-black text-white shadow-[3px_3px_0px_#1E1233]">
          <MessageSquareHeart className="w-4 h-4 fill-current" />
          <span>OFFICIAL WALL OF WISHES</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-black text-[#1E1233] tracking-tight">
          Papan Harapan & Doa Bunda Novi 💜
        </h2>

        <p className="text-sm sm:text-base text-[#554070] font-bold max-w-xl mx-auto">
          Kumpulan doa, ucapan selamat, dan curahan hati hangat dari rekan-rekan kantor yang berbahagia!
        </p>
      </div>

      {/* Moderation Notice & Refresh */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-[#FAF5FF] border-2 border-[#8C65FF]/40 rounded-xl px-4 py-2.5">
        <div className="flex items-center gap-2 text-xs font-semibold text-[#5B21B6]">
          <ShieldCheck className="w-4 h-4 text-[#16A34A]" />
          <span>Sistem Moderasi Aktif: Hanya ucapan yang disetujui yang tampil di papan utama.</span>
        </div>
        <button
          onClick={fetchWishes}
          disabled={loading}
          className="text-xs font-mono font-bold text-[#8C65FF] hover:text-[#5B21B6] flex items-center gap-1.5 cursor-pointer"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          <span>Muat Ulang Pesan</span>
        </button>
      </div>

      {/* Grid: Wish Form (Left/Top) & Sticky Wall (Right/Bottom) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-1">
          <WishForm onWishSubmitted={fetchWishes} />
        </div>

        <div className="lg:col-span-2 space-y-4">
          <WishWall wishes={wishes} loading={loading} />
        </div>
      </div>
    </section>
  );
};
