// src/components/music-player/UnguMusicPlayer.tsx
'use client';

import React, { useState } from 'react';
import { UNGU_PLAYLIST } from '@/data/playlist';
import { Floppy } from '@/characters/Floppy';
import { Play, Pause, SkipForward, SkipBack, Music, ExternalLink, Disc, Video } from 'lucide-react';

export const UnguMusicPlayer: React.FC = () => {
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showEmbed, setShowEmbed] = useState(false);

  const currentSong = UNGU_PLAYLIST[currentSongIndex];

  const handleNext = () => {
    setCurrentSongIndex((prev) => (prev + 1) % UNGU_PLAYLIST.length);
    setIsPlaying(true);
  };

  const handlePrev = () => {
    setCurrentSongIndex((prev) => (prev - 1 + UNGU_PLAYLIST.length) % UNGU_PLAYLIST.length);
    setIsPlaying(true);
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <section className="py-12 px-4 max-w-4xl mx-auto">
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            {/* Left: Floppy DJ */}
            <div className="flex flex-col items-center justify-center p-4 bg-[#2A1845] rounded-2xl border-2 border-[#8C65FF]/40 text-center">
              <Floppy pose="headphone" size={135} />
              <div className="mt-2 inline-block px-3 py-1 rounded-full bg-[#FF4FA3] text-white text-[10px] font-mono font-black">
                DJ FLOPPY IN THE MIX 🎧
              </div>
            </div>

            {/* Middle & Right: LCD Screen & Controls */}
            <div className="md:col-span-2 space-y-4">
              {/* LCD Screen */}
              <div className="bg-[#0D2818] border-3 border-[#B7F45A] rounded-xl p-4 font-mono text-[#B7F45A] shadow-inner space-y-2">
                <div className="flex items-center justify-between text-[10px] tracking-wider border-b border-[#B7F45A]/30 pb-1.5">
                  <span className="flex items-center gap-1.5">
                    <span className={`w-2 h-2 rounded-full ${isPlaying ? 'bg-[#B7F45A] animate-ping' : 'bg-gray-500'}`} />
                    {isPlaying ? 'PLAYING TRACK' : 'PLAYER IDLE'}
                  </span>
                  <span>STEREO 44.1kHz</span>
                </div>

                <div className="space-y-0.5">
                  <p className="text-lg sm:text-2xl font-black text-[#FFDA35] tracking-wide truncate">
                    {currentSong.title}
                  </p>
                  <p className="text-xs text-[#B7F45A]/90">
                    Artis: Ungu • Album: {currentSong.album} ({currentSong.year})
                  </p>
                </div>

                {/* Lyrics Highlight */}
                <p className="text-xs italic text-white/90 pt-1 leading-relaxed border-t border-[#B7F45A]/20">
                  {currentSong.lyricsHighlight}
                </p>
              </div>

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
                    onClick={togglePlay}
                    className="px-6 py-3 rounded-xl bg-[#FFDA35] hover:bg-[#FFE055] text-[#1E1233] border-3 border-[#1E1233] font-bold flex items-center gap-2 cursor-pointer active:scale-95 transition-all shadow-[4px_4px_0px_#B7F45A]"
                  >
                    {isPlaying ? (
                      <>
                        <Pause className="w-5 h-5 fill-current" />
                        <span>PAUSE</span>
                      </>
                    ) : (
                      <>
                        <Play className="w-5 h-5 fill-current" />
                        <span>PLAY</span>
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

                {/* Spotify / YouTube Switcher */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setShowEmbed(!showEmbed)}
                    className="px-3.5 py-2 rounded-xl bg-[#8C65FF] hover:bg-[#7A50F0] text-white text-xs font-bold border-2 border-[#1E1233] cursor-pointer shadow-[2px_2px_0px_#FFDA35] transition-all"
                  >
                    {showEmbed ? 'Sembunyikan Pemutar YouTube' : 'Buka Video Resmi YouTube'}
                  </button>
                </div>
              </div>

              {/* YouTube Official Video Embed (Optional View) */}
              {showEmbed && currentSong.youtubeId && (
                <div className="pt-3">
                  <div className="aspect-video w-full rounded-xl overflow-hidden border-2 border-[#FF4FA3]">
                    <iframe
                      width="100%"
                      height="100%"
                      src={`https://www.youtube.com/embed/${currentSong.youtubeId}?autoplay=0&origin=https://novinovonovi.vercel.app`}
                      title={`Ungu - ${currentSong.title}`}
                      frameBorder="0"
                      allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Tracklist selection pills */}
          <div className="pt-4 border-t-2 border-[#8C65FF]/30">
            <p className="text-xs font-mono text-[#FFDA35] font-bold mb-2">
              DAFTAR LAGU FAVORIT UNGU PILIHAN KANTOR:
            </p>
            <div className="flex flex-wrap gap-2">
              {UNGU_PLAYLIST.map((song, idx) => (
                <button
                  key={song.id}
                  onClick={() => {
                    setCurrentSongIndex(idx);
                    setIsPlaying(true);
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
