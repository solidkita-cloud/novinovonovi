-- =========================================================
-- BIRTHDAY.exe — Bunda Novi Edition V1.0
-- Database Schema for Supabase PostgreSQL
-- =========================================================

-- Aktifkan UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Buat Tabel wishes
CREATE TABLE IF NOT EXISTS public.wishes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    display_name VARCHAR(40) NOT NULL,
    message VARCHAR(500) NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'pending' 
        CHECK (status IN ('pending', 'approved', 'rejected')),
    source VARCHAR(20) NOT NULL DEFAULT 'visitor' 
        CHECK (source IN ('seed', 'visitor')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    approved_at TIMESTAMPTZ NULL
);

-- 2. Buat Index untuk performa query publik
CREATE INDEX IF NOT EXISTS idx_wishes_approved_created 
    ON public.wishes (status, created_at DESC) 
    WHERE status = 'approved';

-- 3. Aktifkan Row Level Security (RLS)
ALTER TABLE public.wishes ENABLE ROW LEVEL SECURITY;

-- Policy 1: Publik (anon) hanya bisa membaca ucapan yang sudah di-APPROVED
DROP POLICY IF EXISTS "Public can only read approved wishes" ON public.wishes;
CREATE POLICY "Public can only read approved wishes"
    ON public.wishes
    FOR SELECT
    TO anon, authenticated
    USING (status = 'approved');

-- Policy 2: Publik hanya bisa melakukan INSERT pesan baru dengan status 'pending' dan source 'visitor'
DROP POLICY IF EXISTS "Public can insert pending wishes" ON public.wishes;
CREATE POLICY "Public can insert pending wishes"
    ON public.wishes
    FOR INSERT
    TO anon, authenticated
    WITH CHECK (
        status = 'pending' AND 
        source = 'visitor' AND 
        char_length(display_name) <= 40 AND 
        char_length(message) <= 500
    );

-- Policy 3: Moderasi status (UPDATE/DELETE) hanya diizinkan untuk Service Role (Backend Server)
DROP POLICY IF EXISTS "Only service role can update wishes status" ON public.wishes;
CREATE POLICY "Only service role can update wishes status"
    ON public.wishes
    FOR UPDATE
    TO service_role
    USING (true)
    WITH CHECK (true);

DROP POLICY IF EXISTS "Only service role can delete wishes" ON public.wishes;
CREATE POLICY "Only service role can delete wishes"
    ON public.wishes
    FOR DELETE
    TO service_role
    USING (true);

-- 4. SEED CONTENT: 10 Ucapan Awal Teman-Teman Kantor (Kolektif)
INSERT INTO public.wishes (display_name, message, status, source, created_at, approved_at) VALUES
('Divisi Bahagia & Sentosa', 'Selamat ulang tahun Bunda Novi panutan kita semua! Semoga rezekinya mengalir deras seperti air terjun, selalu sehat, dan makin cetar membahana!', 'approved', 'seed', now() - INTERVAL '9 hours', now()),
('Pencari Berkah Lembur', 'Happy birthday Bundaaa! Terima kasih sudah selalu menjadi penenang di kala deadline kantor menyerang. Pokoknya Bunda bahagia, kita semua ikut bahagia!', 'approved', 'seed', now() - INTERVAL '8 hours', now()),
('Sobat Es Kopi & Camilan', 'Met ultah Bunda! Doa terbaik semoga sehat selalu, makin berlimpah rezeki biar bisa sering-sering jajan bareng. Pokoknya jangan bosen dengerin kekacauan kita wkwk!', 'approved', 'seed', now() - INTERVAL '7 hours', now()),
('Tim Support Garis Depan', 'Barakallah fii umrik Bunda Novi! Semoga setiap langkah berkah, urusan dipermudah, dan senyum manis Bunda selalu mencerahkan kantor!', 'approved', 'seed', now() - INTERVAL '6 hours', now()),
('Aliansi Penggemar Ungu', 'Demi waktu yang bergulir, selamat ulang tahun Bunda tersayang! Tetap jadi sosok yang menginspirasi dan penuh energi positif untuk kita semua 💜', 'approved', 'seed', now() - INTERVAL '5 hours', now()),
('Admin Penyebar Tawa', 'Happy XXth Birthday Bunda! Umur hanyalah rahasia negara, yang penting jiwa tetap muda, dompet makin tebal, dan hati selalu gembira!', 'approved', 'seed', now() - INTERVAL '4 hours', now()),
('Rekan Satu Perjuangan', 'Selamat milad Bunda Novi! Semoga selalu diberikan kesehatan, kelapangan hati, serta keberkahan rezeki tanpa batas bersama keluarga tercinta.', 'approved', 'seed', now() - INTERVAL '3 hours', now()),
('Grup Pemburu Promo', 'Bundaaaa selamat ulang tahun! Semoga tahun ini banjir cuan, banjir kebahagiaan, dan makin banyak jalan-jalan seru!', 'approved', 'seed', now() - INTERVAL '2 hours', now()),
('Pemberi Semangat Harian', 'Selamat ulang tahun Bunda! Terima kasih atas keramahan dan kehangatan Bunda selama ini. Kami beruntung banget punya Bunda di kantor!', 'approved', 'seed', now() - INTERVAL '1 hours', now()),
('Teman Sebelah Meja', 'HBD Bunda Novi ter-favorit! Semoga hari ini penuh tawa, kue enak, dan kejutan istimewa! Pokoknya Bunda Novi bahagia, SEMUA BAHAGIA! WKWKWK 💜', 'approved', 'seed', now(), now());
