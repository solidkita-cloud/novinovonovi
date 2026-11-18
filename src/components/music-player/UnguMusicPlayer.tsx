// src/components/music-player/UnguMusicPlayer.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { UNGU_PLAYLIST } from '@/data/playlist';
import { Floppy } from '@/characters/Floppy';
import {
  startMusicBox,
  stopMusicBox,
  toggleMusicBox,
  isMusicBoxActive,
  setMusicBoxMuted,
  isMusicBoxMuted,
  subscribeMusicBox,
} from '@/lib/musicBox';
import { Play, Pause, SkipForward, SkipBack, Music, Volume2, VolumeX, Radio } from 'lucide-react';

export const UnguMusicPlayer: React.FC = () => {
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [playbackMode, setPlaybackMode] = useState<'synth' | 'youtube'>('synth');
  const [synthPlaying, setSynthPlaying] = useState(false);
  const [ytPlaying, setYtPlaying] = useState(false);
  const [isMuted, setIsMutedState] = useState(false);

  const currentSong = UNGU_PLAYLIST[currentSongIndex];

  // Subscribe to global Music Box state
  useEffect(() => {
    const unsubscribe = subscribeMusicBox((playing) => {
      setSynthPlaying(playing);
    });
    setIsMutedState(isMusicBoxMuted());
    return () => unsubscribe();
  }, []);

  const isPlaying = playbackMode === 'synth' ? synthPlaying : ytPlaying;

  const handleTogglePlay = () => {
    if (playbackMode === 'synth') {
      toggleMusicBox();
    } else {
      setYtPlaying(!ytPlaying);
    }
  };

  const handleNext = () => {
    setCurrentSongIndex((prev) => (prev + 1) % UNGU_PLAYLIST.length);
    if (playbackMode === 'synth' && !synthPlaying) {
      startMusicBox();
    } else if (playbackMode === 'youtube') {
      setYtPlaying(true);
    }
  };

  const handlePrev = () => {
    setCurrentSongIndex((prev) => (prev - 1 + UNGU_PLAYLIST.length) % UNGU_PLAYLIST.length);
    if (playbackMode === 'synth' && !synthPlaying) {
      startMusicBox();
    } else if (playbackMode === 'youtube') {
      setYtPlaying(true);
    }
  };

  const switchMode = (mode: 'synth' | 'youtube') => {
    if (mode === 'youtube') {
      stopMusicBox();
      setYtPlaying(true);
    } else {
      setYtPlaying(false);
      startMusicBox();
    }
    setPlaybackMode(mode);
  };

  const handleToggleMute = () => {
    const nextMuted = !isMuted;
    setIsMutedState(nextMuted);
    setMusicBoxMuted(nextMuted);
  };

  return (
    <section id="ungu-music-player" className="py-12 px-4 max-w-4xl mx-auto">
      {/* Player Window */}
      <div className="retro-window bg-[#1E1233] border-4 border-[#8C65FF] shadow-[8px_8px_0px_#FFDA35]">
        {/* Header Bar */}
        <div className="bg-[#8C65FF] px-4 py-2.5 flex items-center justify-between border-b-3 border-[#150B24]">
          <div className="flex items-center gap-2 text-white font-mono font-bold text-xs sm:text-sm">
            <Music className="w-4 h-4 text-[#FFDA35]" />
            <span>UNGU_PLAYER.EXE — Y2K DIGITAL SOUND BOX</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-[#FF4FA3] border border-[#1E1233]" />
            <span className="w-3 h-3 rounded-full bg-[#FFDA35] border border-[#1E1233]" />
            <span className="w-3 h-3 rounded-full bg-[#B7F45A] border border-[#1E1233]" />
          </div>
        </div>

        {/* Player Body */}
        <div className="p-6 sm:p-8 space-y-6">
          {/* Mode Switcher Tabs */}
          <div className="flex flex-wrap items-center justify-between gap-3 bg-[#150B24] p-2 rounded-xl border-2 border-[#8C65FF]/40">
            <span className="text-xs font-mono text-[#FFDA35] font-bold pl-2 flex items-center gap-1.5">
              <Radio className="w-4 h-4" />
              PILIH SUMBER AUDIO:
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => switchMode('synth')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold font-mono transition-all border-2 border-[#1E1233] cursor-pointer ${
                  playbackMode === 'synth'
                    ? 'bg-[#FFDA35] text-[#1E1233] shadow-[2px_2px_0px_#B7F45A]'
                    : 'bg-[#2D1B4E] text-gray-300 hover:bg-[#3D256A]'
                }`}
              >
                🔔 Kotak Musik Chime (Autoplay Aktif)
              </button>
              <button
                onClick={() => switchMode('youtube')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold font-mono transition-all border-2 border-[#1E1233] cursor-pointer ${
                  playbackMode === 'youtube'
                    ? 'bg-[#FF4FA3] text-white shadow-[2px_2px_0px_#FFDA35]'
                    : 'bg-[#2D1B4E] text-gray-300 hover:bg-[#3D256A]'
                }`}
              >
                🎸 Lagu Asli Ungu (YouTube Video)
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            {/* Left: Floppy DJ + Spinning Vinyl */}
            <div className="flex flex-col items-center justify-center p-4 bg-[#2A1845] rounded-2xl border-2 border-[#8C65FF]/40 text-center relative overflow-hidden">
              {/* Spinning Vinyl Background behind Floppy */}
              <div
                className={`w-28 h-28 rounded-full border-4 border-[#1E1233] bg-[#110822] flex items-center justify-center shadow-lg mb-2 ${
                  isPlaying ? 'animate-spin' : ''
                }`}
                style={{ animationDuration: '3.5s' }}
              >
                <div className="w-10 h-10 rounded-full bg-[#FF4FA3] border-2 border-white flex items-center justify-center">
                  <div className="w-3 h-3 rounded-full bg-[#1E1233]" />
                </div>
              </div>

              <Floppy pose="headphone" size={110} />
              <div className="mt-2 inline-block px-3 py-1 rounded-full bg-[#FF4FA3] text-white text-[10px] font-mono font-black">
                {isPlaying ? 'DJ FLOPPY IS JAMMING! 🎶' : 'DJ FLOPPY WAITING... 🎧'}
              </div>
            </div>

            {/* Middle & Right: Screen & Controls */}
            <div className="md:col-span-2 space-y-4">
              {playbackMode === 'synth' ? (
                /* LCD Screen for Synth Mode */
                <div className="bg-[#0D2818] border-3 border-[#B7F45A] rounded-xl p-4 font-mono text-[#B7F45A] shadow-inner space-y-2">
                  <div className="flex items-center justify-between text-[10px] tracking-wider border-b border-[#B7F45A]/30 pb-1.5">
                    <span className="flex items-center gap-1.5">
                      <span className={`w-2.5 h-2.5 rounded-full ${synthPlaying ? 'bg-[#B7F45A] animate-ping' : 'bg-gray-600'}`} />
                      {synthPlaying ? 'NOW PLAYING: MUSIC BOX CHIME ✨' : 'AUDIO PAUSED • CLICK PLAY TO RESUME'}
                    </span>
                    <span>44.1kHz • WEB AUDIO</span>
                  </div>

                  <div className="space-y-0.5">
                    <p className="text-xl sm:text-2xl font-black text-[#FFDA35] tracking-wide">
                      Happy Birthday (Music Box Edition) 🎂
                    </p>
                    <p className="text-xs text-[#B7F45A]/90">
                      Tribute Khusus: {currentSong.title} — Ungu Band ({currentSong.year})
                    </p>
                  </div>

                  {/* Equalizer Bars Simulation */}
                  <div className="flex items-end gap-1 h-6 pt-1">
                    {[40, 70, 95, 60, 85, 50, 100, 75, 45, 90, 65, 80, 55].map((h, i) => (
                      <div
                        key={i}
                        className={`flex-1 rounded-t transition-all ${
                          synthPlaying ? 'bg-[#B7F45A]' : 'bg-gray-700'
                        }`}
                        style={{
                          height: synthPlaying ? `${(h * ((i % 3) + 1)) % 100}%` : '20%',
                          transitionDuration: '0.2s',
                        }}
                      />
                    ))}
                  </div>

                  {/* Lyrics Highlight */}
                  <p className="text-xs italic text-white/90 pt-1 leading-relaxed border-t border-[#B7F45A]/20">
                    {currentSong.lyricsHighlight}
                  </p>
                </div>
              ) : (
                /* YouTube Official Video Player Mode */
                <div className="bg-[#120921] border-3 border-[#FF4FA3] rounded-xl p-3 shadow-inner space-y-2">
                  <div className="flex items-center justify-between text-[10px] font-mono text-[#FFDA35] pb-1">
                    <span>YOUTUBE OFFICIAL PLAYER • {currentSong.title}</span>
                    <span className="text-xs">HD 1080p</span>
                  </div>
                  <div className="aspect-video w-full rounded-lg overflow-hidden border-2 border-[#1E1233] bg-black">
                    <iframe
                      width="100%"
                      height="100%"
                      src={`https://www.youtube.com/embed/${currentSong.youtubeId}?autoplay=${ytPlaying ? 1 : 0}&enablejsapi=1&origin=https://novinovonovi.vercel.app`}
                      title={`Ungu - ${currentSong.title}`}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                </div>
              )}

              {/* Physical Playback Controls */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                <div className="flex items-center gap-2">
                  <button
                    onClick={handlePrev}
                    className="p-3 rounded-xl bg-[#2D1B4E] hover:bg-[#3D256A] text-[#FFDA35] border-2 border-[#8C65FF] cursor-pointer active:scale-95 transition-all shadow-[2px_2px_0px_#8C65FF]"
                    title="Lagu Sebelumnya"
                  >
                    <SkipBack className="w-5 h-5 fill-current" />
                  </button>

                  <button
                    onClick={handleTogglePlay}
                    className="px-7 py-3 rounded-xl bg-[#FFDA35] hover:bg-[#FFE055] text-[#1E1233] border-3 border-[#1E1233] font-black text-sm sm:text-base flex items-center gap-2 cursor-pointer active:scale-95 transition-all shadow-[4px_4px_0px_#B7F45A]"
                  >
                    {isPlaying ? (
                      <>
                        <Pause className="w-5 h-5 fill-current text-[#1E1233]" />
                        <span>PAUSE MUSIK</span>
                      </>
                    ) : (
                      <>
                        <Play className="w-5 h-5 fill-current text-[#1E1233]" />
                        <span>PUTAR MUSIK 🎵</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={handleNext}
                    className="p-3 rounded-xl bg-[#2D1B4E] hover:bg-[#3D256A] text-[#FFDA35] border-2 border-[#8C65FF] cursor-pointer active:scale-95 transition-all shadow-[2px_2px_0px_#8C65FF]"
                    title="Lagu Berikutnya"
                  >
                    <SkipForward className="w-5 h-5 fill-current" />
                  </button>
                </div>

                {/* Mute Toggle */}
                {playbackMode === 'synth' && (
                  <button
                    onClick={handleToggleMute}
                    className="p-3 rounded-xl bg-[#2D1B4E] hover:bg-[#3D256A] text-white border-2 border-[#8C65FF] cursor-pointer active:scale-95 transition-all shadow-[2px_2px_0px_#8C65FF]"
                    title={isMuted ? 'Buka Suara (Unmute)' : 'Matikan Suara (Mute)'}
                  >
                    {isMuted ? <VolumeX className="w-5 h-5 text-red-400" /> : <Volume2 className="w-5 h-5 text-[#B7F45A]" />}
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Tracklist selection pills */}
          <div className="pt-4 border-t-2 border-[#8C65FF]/30">
            <p className="text-xs font-mono text-[#FFDA35] font-bold mb-2">
              PILIH LAGU FAVORIT UNGU BUNDA NOVI:
            </p>
            <div className="flex flex-wrap gap-2">
              {UNGU_PLAYLIST.map((song, idx) => (
                <button
                  key={song.id}
                  onClick={() => {
                    setCurrentSongIndex(idx);
                    if (playbackMode === 'synth' && !synthPlaying) {
                      startMusicBox();
                    } else if (playbackMode === 'youtube') {
                      setYtPlaying(true);
                    }
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all border cursor-pointer ${
                    currentSongIndex === idx
                      ? 'bg-[#B7F45A] text-[#1E1233] border-[#B7F45A] shadow-[2px_2px_0px_#FFDA35]'
                      : 'bg-[#2A1845] text-gray-300 border-[#8C65FF]/40 hover:bg-[#3D256A]'
                  }`}
                >
                  {idx + 1}. {song.title}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
