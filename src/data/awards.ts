// src/data/awards.ts
import { FriendshipAward } from '@/types/birthday';

export const FRIENDSHIP_AWARDS: FriendshipAward[] = [
  {
    id: 'award-01',
    title: 'LEGENDARY HUMAN AWARD',
    category: 'Spesies Paling Berharga di Kantor',
    description: 'Dianugerahkan atas kesabaran legendaris menghadapi pertanyaan-pertanyaan random rekan kantor setiap hari tanpa kehilangan senyum manisnya.',
    badgeIcon: '👑',
    floppyComment: 'Floppy scan: Kadar kesabaran 999.9%. Kalau Floppy jadi Bunda, udah Floppy format disk-nya!',
    colorScheme: 'yellow',
  },
  {
    id: 'award-02',
    title: 'CERTIFIED CHAOS MANAGER',
    category: 'Manajemen Badai Tanpa Panik',
    description: 'Kemampuan supranatural tetap tenang dan tersenyum anggun meskipun situasi kantor sedang berputar seperti kipas angin kecepatan maksimal.',
    badgeIcon: '⚡',
    floppyComment: 'Peringatan Sistem: Tingkat ketenangan Bunda Novi melampaui batas CPU server!',
    colorScheme: 'lime',
  },
  {
    id: 'award-03',
    title: 'SUPREME BOSS OF HAPPINESS',
    category: 'Penebar Energi Positif Nasional',
    description: 'Terbukti secara ilmiah bahwa setiap kali Bunda Novi tersenyum dan bahagia, atmosfer kantor langsung berubah jadi cerah dan adem ayem.',
    badgeIcon: '💖',
    floppyComment: 'Protocol verified: Bunda Novi Bahagia, Semua Bahagia! Tidak ada perdebatan!',
    colorScheme: 'pink',
  },
];
