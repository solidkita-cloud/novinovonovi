// src/app/page.tsx
'use client';

import React, { useState } from 'react';
import { BootScreen } from '@/components/boot/BootScreen';
import { BirthdayHero } from '@/components/hero/BirthdayHero';
import { BirthdayMessage } from '@/components/birthday-message/BirthdayMessage';
import { FriendshipChaos } from '@/components/friendship/FriendshipChaos';
import { SurpriseCorner } from '@/components/surprises/SurpriseCorner';
import { UnguMusicPlayer } from '@/components/music-player/UnguMusicPlayer';
import { WishSection } from '@/components/wishes/WishSection';
import { EmotionalFinale } from '@/components/finale/EmotionalFinale';
import { Sparkles, Heart, Disc, MessageSquareHeart } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function BirthdayPage() {
  const [bootCompleted, setBootCompleted] = useState(false);

  const handleEnterParty = () => {
    setBootCompleted(true);
    // Welcome celebratory confetti shower
    confetti({
      particleCount: 100,
      spread: 90,
      origin: { y: 0.5 },
      colors: ['#FF4FA3', '#FFDA35', '#B7F45A', '#8C65FF', '#FFFFFF'],
    });
  };

  return (
    <main className="min-h-screen bg-[#FFF4E8] text-[#1E1233] relative overflow-hidden">
      {/* FR-01: SYSTEM BOOT OVERLAY */}
      {!bootCompleted && <BootScreen onEnterParty={handleEnterParty} />}

      {/* Background Retro Grid / Pop Dot Texture */}
      <div 
        className="pointer-events-none fixed inset-0 opacity-25 z-0"
        style={{
          backgroundImage: 'radial-gradient(#8C65FF 1px, transparent 1px), radial-gradient(#FF4FA3 1px, transparent 1px)',
          backgroundSize: '32px 32px',
          backgroundPosition: '0 0, 16px 16px',
        }}
      />

      {/* Sticky Retro Top Navbar */}
      <header className="sticky top-0 z-40 bg-[#FFFDF9]/90 backdrop-blur-md border-b-3 border-[#1E1233] px-4 py-2.5 shadow-sm">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          {/* Brand Logo */}
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[#FF4FA3] border border-[#1E1233]" />
            <span className="font-mono font-black text-xs sm:text-sm tracking-wider text-[#1E1233]">
              BIRTHDAY.exe <span className="text-[#8C65FF]">★ BUNDA NOVI</span>
            </span>
          </div>

          {/* Quick Nav Anchors */}
          <nav className="flex items-center gap-1.5 sm:gap-2 text-[11px] font-mono font-bold">
            <a
              href="#birthday-message"
              className="px-2.5 py-1 rounded-lg bg-[#FFE4EE] hover:bg-[#FFD1E3] text-[#1E1233] border border-[#1E1233] transition-colors hidden sm:inline-block"
            >
              Surat
            </a>
            <a
              href="#wall-of-wishes"
              className="px-2.5 py-1 rounded-lg bg-[#EBFDE2] hover:bg-[#D5FCC7] text-[#1E1233] border border-[#1E1233] transition-colors"
            >
              Wishes 💜
            </a>
            <a
              href="/admin"
              className="px-2.5 py-1 rounded-lg bg-[#FFF2B2] hover:bg-[#FFEAA0] text-[#1E1233] border border-[#1E1233] transition-colors text-[10px]"
            >
              Admin
            </a>
          </nav>
        </div>
      </header>

      {/* Main Content Sections */}
      <div className="relative z-10">
        {/* FR-02: BIRTHDAY MAIN STAGE */}
        <BirthdayHero />

        {/* FR-03: BIRTHDAY MESSAGE (SCRAPBOOK) */}
        <BirthdayMessage />

        {/* FR-04: FRIENDSHIP CHAOS (ABSURD AWARDS) */}
        <FriendshipChaos />

        {/* FR-05: SURPRISE CORNER (MYSTERY BOX, COMPLIMENTS, UNGU FAN ZONE) */}
        <SurpriseCorner />

        {/* FR-06: UNGU MUSIC PLAYER */}
        <UnguMusicPlayer />

        {/* FR-07: WALL OF WISHES (STICKY WALL + SUBMISSION FORM) */}
        <WishSection />

        {/* FR-08: EMOTIONAL FINALE */}
        <EmotionalFinale />
      </div>
    </main>
  );
}
