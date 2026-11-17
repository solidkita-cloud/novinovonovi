// src/types/birthday.ts

export type WishStatus = 'pending' | 'approved' | 'rejected';
export type WishSource = 'seed' | 'visitor';

export interface Wish {
  id: string;
  display_name: string;
  message: string;
  status: WishStatus;
  source: WishSource;
  created_at: string;
  approved_at?: string | null;
}

export interface WishSubmissionInput {
  display_name: string;
  message: string;
  honeypot?: string;
}

export interface FriendshipAward {
  id: string;
  title: string;
  category: string;
  description: string;
  badgeIcon: string;
  floppyComment: string;
  colorScheme: 'yellow' | 'pink' | 'lime' | 'violet';
}

export interface MysteryVoucher {
  id: string;
  title: string;
  description: string;
  emoji: string;
  isClaimed: boolean;
}

export interface ComplimentItem {
  id: number;
  text: string;
  floppyReaction: string;
}

export interface UnguSong {
  id: string;
  title: string;
  album: string;
  year: string;
  lyricsHighlight: string;
  youtubeId?: string;
  spotifyTrackId?: string;
}
