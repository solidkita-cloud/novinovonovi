// src/lib/musicBox.ts

// Frequency mapping for notes in music box chime pitch (Key of C/G)
const NOTES: Record<string, number> = {
  G4: 392.00,
  A4: 440.00,
  B4: 493.88,
  C5: 523.25,
  D5: 587.33,
  E5: 659.25,
  F5: 698.46,
  G5: 783.99,
  REST: 0,
};

const BDAY_MELODY: [string, number][] = [
  // Happy birthday to you
  ['G4', 0.75], ['G4', 0.25], ['A4', 1.0], ['G4', 1.0], ['C5', 1.0], ['B4', 2.0],
  // Happy birthday to you
  ['G4', 0.75], ['G4', 0.25], ['A4', 1.0], ['G4', 1.0], ['D5', 1.0], ['C5', 2.0],
  // Happy birthday dear Bunda Novi
  ['G4', 0.75], ['G4', 0.25], ['G5', 1.0], ['E5', 1.0], ['C5', 1.0], ['B4', 1.0], ['A4', 1.5],
  // Happy birthday to you
  ['F5', 0.75], ['F5', 0.25], ['E5', 1.0], ['C5', 1.0], ['D5', 1.0], ['C5', 2.5],
  ['REST', 1.5],
];

let audioCtx: AudioContext | null = null;
let synthTimer: NodeJS.Timeout | null = null;
let melodyIndex = 0;
let isPlaying = false;
let isMuted = false;

const listeners = new Set<(playing: boolean) => void>();

function notify() {
  listeners.forEach((cb) => cb(isPlaying));
}

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioCtxClass =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioCtxClass) {
      audioCtx = new AudioCtxClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

function playChimeNote(freq: number, startTime: number, duration: number) {
  if (!audioCtx || freq <= 0 || isMuted) return;

  const osc1 = audioCtx.createOscillator();
  const gain1 = audioCtx.createGain();
  osc1.type = 'sine';
  osc1.frequency.setValueAtTime(freq, startTime);

  const osc2 = audioCtx.createOscillator();
  const gain2 = audioCtx.createGain();
  osc2.type = 'sine';
  osc2.frequency.setValueAtTime(freq * 2.76, startTime); // Harmonic chime overtone

  const volume = 0.22;
  gain1.gain.setValueAtTime(volume, startTime);
  gain1.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

  gain2.gain.setValueAtTime(volume * 0.4, startTime);
  gain2.gain.exponentialRampToValueAtTime(0.0001, startTime + duration * 0.7);

  osc1.connect(gain1);
  gain1.connect(audioCtx.destination);
  osc2.connect(gain2);
  gain2.connect(audioCtx.destination);

  osc1.start(startTime);
  osc1.stop(startTime + duration);
  osc2.start(startTime);
  osc2.stop(startTime + duration * 0.7);
}

function scheduleLoop() {
  if (!isPlaying) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const [noteName, durMult] = BDAY_MELODY[melodyIndex];
  const freq = NOTES[noteName] || 0;
  const tempoBeat = 0.45; // seconds per base beat
  const duration = durMult * tempoBeat;

  if (freq > 0) {
    playChimeNote(freq, ctx.currentTime, duration * 1.2);
  }

  melodyIndex = (melodyIndex + 1) % BDAY_MELODY.length;
  synthTimer = setTimeout(() => {
    scheduleLoop();
  }, duration * 1000);
}

export function startMusicBox() {
  if (isPlaying) return;
  getAudioContext();
  isPlaying = true;
  melodyIndex = 0;
  scheduleLoop();
  notify();
}

export function stopMusicBox() {
  isPlaying = false;
  if (synthTimer) {
    clearTimeout(synthTimer);
    synthTimer = null;
  }
  notify();
}

export function toggleMusicBox(): boolean {
  if (isPlaying) {
    stopMusicBox();
  } else {
    startMusicBox();
  }
  return isPlaying;
}

export function isMusicBoxActive(): boolean {
  return isPlaying;
}

export function setMusicBoxMuted(muted: boolean) {
  isMuted = muted;
}

export function isMusicBoxMuted(): boolean {
  return isMuted;
}

export function subscribeMusicBox(cb: (playing: boolean) => void): () => void {
  listeners.add(cb);
  cb(isPlaying);
  return () => {
    listeners.delete(cb);
  };
}
