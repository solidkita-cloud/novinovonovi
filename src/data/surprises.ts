// src/data/surprises.ts
import { MysteryVoucher, ComplimentItem } from '@/types/birthday';

export const INITIAL_VOUCHERS: MysteryVoucher[] = [
  {
    id: 'vouch-1',
    title: 'TIKET BEBAS REQUEST CAMILAN 🧋',
    description: 'Bisa ditukarkan ke teman-teman kantor kapan pun Bunda lagi pengen boba, es kopi, atau gorengan hangat.',
    emoji: '🎁',
    isClaimed: false,
  },
  {
    id: 'vouch-2',
    title: 'KUPON BEBAS RIBET SEHARIAN 🕊️',
    description: 'Hak istimewa untuk menjawab "Nanti dulu ya, saya lagi ulang tahun" terhadap urusan-urusan yang memusingkan.',
    emoji: '✨',
    isClaimed: false,
  },
  {
    id: 'vouch-3',
    title: 'VIP TIKET CURHAT & DUKUNGAN 24/7 🎧',
    description: 'Layanan gratis seumur hidup dari teman-teman kantor untuk jadi pendengar setia dan suporter no. 1 Bunda Novi.',
    emoji: '💜',
    isClaimed: false,
  },
];

export const RANDOM_COMPLIMENTS: ComplimentItem[] = [
  {
    id: 1,
    text: 'Bunda Novi kalau senyum, level kecerahan ruangan kantor langsung naik 200%!',
    floppyReaction: 'Floppy terpesona! Layar monokrom Floppy langsung jadi warna-warni!',
  },
  {
    id: 2,
    text: 'Aura keibuan dan kebaikan Bunda adalah AC alami di kantor yang selalu bikin tenang.',
    floppyReaction: 'Suhu server stabil karena aura sejuk Bunda Novi!',
  },
  {
    id: 3,
    text: 'Gaya hijab dan kacamata Bunda selalu elegan dan berwibawa tapi tetap humble banget.',
    floppyReaction: 'Skor fesyen: 100/100! Floppy yang cuma disket kotak aja iri!',
  },
  {
    id: 4,
    text: 'Bunda adalah bukti nyata bahwa orang baik dan tulus selalu dicintai banyak orang.',
    floppyReaction: 'Data akurat terverifikasi oleh jutaan baris kode cinta!',
  },
  {
    id: 5,
    text: 'Kecerdasan emosional Bunda Novi adalah standar emas yang patut dicontoh.',
    floppyReaction: 'Algoritma kecerdasan: Superior level Bunda Novi!',
  },
  {
    id: 6,
    text: 'Bunda selalu punya cara bikin suasana yang tegang jadi santai dan cair kembali.',
    floppyReaction: 'Error 404: Kebencian tidak ditemukan di dekat Bunda Novi!',
  },
];

export const UNGU_FAN_TRIVIA = [
  {
    question: 'Kenapa Ungu itu istimewa?',
    answer: 'Karena bukan cuma warna band favorit Bunda Novi, tapi ungu juga melambangkan keanggunan, ketenangan, dan cinta yang tulus!',
  },
  {
    question: 'Lagu wajib saat karaoke kantor?',
    answer: '"Demi Waktu" & "Kekasih Gelapku" pasti auto koor satu ruangan kalau Bunda yang nyanyi!',
  },
  {
    question: 'Pesan rahasia dari Pasha dkk?',
    answer: '"Selamat ulang tahun Bunda Novi! Tetap jadi Cliquerz sejati dan terus sebarkan kebahagiaan!" 💜',
  },
];
