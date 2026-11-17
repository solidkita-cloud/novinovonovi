# 🎂 BIRTHDAY.exe — Bunda Novi Edition (v1.0)
> **"Bunda Novi Bahagia, Semua Bahagia! WKWKWKWK! 💜"**  
> *Persembahan Kolektif Penuh Tawa & Kasih dari Rekan-Rekan Kantor*

---

## 🌟 Ringkasan Produk
**BIRTHDAY.exe** adalah aplikasi web interaktif satu halaman (*one-page immersive experience*) bergaya **Maximalist Y2K Pop Party** era 2000-an yang dirancang khusus untuk perayaan ulang tahun Bunda Novi.

Target URL Deployment: `https://novinovonovi.vercel.app`

---

## ✨ Fitur & Modul Utama

1. **💻 FR-01: System Boot (Retro 2000s BIOS)**
   - Booting retro terminal Windows 98/2000.
   - Deteksi target otomatis: `BUNDA NOVI`.
   - Dialog usil maskot **Floppy**.
   - Tombol interaktif: `ENTER THE PARTY 🚀`.

2. **👑 FR-02: Birthday Main Stage (Strict No-Age Policy)**
   - Visual 3D Chibi **Bunda Novi** berhijab ungu & berkacamata anggun bersama maskot **Floppy**.
   - Badge perlindungan privasi: **"UMUR RAHASIA NEGARA"**, **"CLASSIFIED INFORMATION"**, **"ACCESS DENIED"**, **"XXth TOP SECRET"** *(Tidak membocorkan angka usia)*.
   - Meriam konfeti interaktif (*Confetti Cannon*).

3. **💌 FR-03: Birthday Message (Digital Scrapbook)**
   - Washi tape vintage, stempel kantor, teks ucapan resmi dari kantor.
   - Puncak pesan: *"BUNDA BAHAGIA, SEMUA BAHAGIA! WKWKWKWK! 💜"*.

4. **⚡ FR-04: Friendship Chaos (Piala Absurd Kantor)**
   - 3 Penghargaan humor & apresiasi tulus:
     - 👑 *Legendary Human Award* (Spesies paling berharga di kantor).
     - ⚡ *Certified Chaos Manager* (Ketenangan di tengah badai deadline).
     - 💖 *Supreme Boss of Happiness* (Penebar energi positif kantor).
   - Komentar roasting jenaka dari Floppy.

5. **🎁 FR-05: Surprise Corner (Pojok Kejutan Interaktif)**
   - **Feature A:** *Mystery Box* — 3 voucher kebahagiaan yang dapat diklaim (Tiket Request Camilan, Kupon Bebas Ribet, VIP Tiket Curhat).
   - **Feature B:** *Random Compliment Machine* — Generator pujian manis acak dengan reaksi live Floppy.
   - **Feature C:** *Ungu Fan Zone* — Area trivia & dedikasi untuk grup musik Ungu.

6. **🎸 FR-06: Ungu Music Player (Y2K Digital Sound Box)**
   - Pemutar lagu retro bergaya Winamp/MP3 LCD screen.
   - Daftar lagu hits legendaris: *Demi Waktu, Tercipta Untukku, Cinta Dalam Hati, Kekasih Gelapku, Dengan Nafas-Mu*.
   - Integrasi video resmi YouTube / Spotify tanpa bajak hak cipta dan tanpa paksaan autoplay.
   - Tampilan maskot DJ Floppy ber-headphone.

7. **📌 FR-07: Wall of Wishes (Papan Harapan & Moderasi)**
   - Formulir pengiriman ucapan instan (anti-bot honeypot, rate limiting, sanitasi XSS).
   - Sticky notes warna-warni (*Butter Yellow, Blush Pink, Mint, Lavender*).
   - **Pre-populated 10 Ucapan Awal** dari berbagai divisi teman kantor.
   - **Sistem Moderasi:** Status ucapan baru otomatis `pending`. Hanya pesan `approved` yang tampil di publik.

8. **🌸 FR-08: Emotional Finale (Penutup Menyentuh)**
   - Suasana lembut serba lavender.
   - Pose Floppy sentimental memegang hati ungu bersama Bunda Novi.
   - Surat hangat & tulus dari rekan-rekan kantor: *"Semoga Bunda tidak pernah merasa sendirian menghadapi hari-hari yang berat... Terima kasih sudah menjadi bagian dari cerita kita di kantor."*

9. **🛡️ Panel Admin Moderasi (`/admin`)**
   - Rute terproteksi kunci rahasia untuk memeriksa, menyetujui (*Approve*), atau menolak (*Reject*) ucapan yang masuk.

---

## 🛠️ Stack Teknologi

- **Framework:** Next.js 16 (App Router) + TypeScript
- **Styling:** Tailwind CSS + Y2K Design Tokens
- **Animasi & Interaksi:** Canvas Confetti + CSS 3D Keyframes
- **Database:** Supabase PostgreSQL + Row Level Security (RLS)
- **Deployment:** Vercel (`novinovonovi.vercel.app`)

---

## 🚀 Menjalankan Secara Lokal

```bash
# 1. Pindah ke direktori proyek
cd birthday-exe

# 2. Instal dependensi (jika belum)
npm install

# 3. Jalankan development server
npm run dev

# Buka http://localhost:3000 di browser
```

---

## 🗄️ Menghubungkan ke Supabase (Database Wishes)

Proyek ini memiliki **Zero-Breakdown Fallback** (dapat berjalan 100% interaktif dan memuat 10 ucapan awal bahkan sebelum Supabase dikoneksikan).

Untuk mengaktifkan database Supabase persisten:
1. Buka [Supabase Dashboard](https://supabase.com) dan buat proyek baru (misal: `birthday-exe`).
2. Masuk ke menu **SQL Editor**, buka file `supabase/schema.sql`, salin seluruh kodenya lalu klik **Run**.
3. Buka **Project Settings -> API**, salin kredensial berikut ke file `.env.local` atau ke Vercel Environment Variables:
```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6...
ADMIN_SECRET_KEY=bundanovi-admin-secret-2026
```

---

## 🌐 Panduan Deployment ke Vercel (`novinovonovi.vercel.app`)

1. Push repository `birthday-exe` ini ke GitHub Anda.
2. Buka [Vercel Dashboard](https://vercel.com) -> Klik **"Add New..."** -> **Project**.
3. Impor repository GitHub tersebut.
4. Pada bagian **Root Directory**, pastikan mengarah ke `birthday-exe`.
5. Masukkan **Environment Variables** (kredensial Supabase di atas).
6. Pada pengaturan **Domains**, tambahkan domain target: `novinovonovi.vercel.app`.
7. Klik **Deploy**!
