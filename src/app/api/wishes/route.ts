// src/app/api/wishes/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getServerSupabase } from '@/lib/supabase/server';
import { SEED_WISHES } from '@/data/seedWishes';
import { checkRateLimit, sanitizeText } from '@/lib/security/rateLimit';
import { Wish } from '@/types/birthday';

import { sharedWishesStore } from '@/lib/memoryStore';

export async function GET() {
  try {
    const supabase = getServerSupabase();
    
    if (supabase) {
      const { data, error } = await supabase
        .from('wishes')
        .select('*')
        .eq('status', 'approved')
        .order('created_at', { ascending: false });

      if (!error && data && data.length > 0) {
        return NextResponse.json({ success: true, data });
      }
    }

    // Return approved from in-memory fallback
    const approved = sharedWishesStore.filter((w) => w.status === 'approved');
    return NextResponse.json({ success: true, data: approved });
  } catch (err) {
    console.error('Error fetching wishes:', err);
    return NextResponse.json(
      { success: false, error: 'Internal Server Error', data: SEED_WISHES },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get('x-forwarded-for') || '127.0.0.1';
    
    // Rate limit check
    const rateCheck = checkRateLimit(ip, 5, 10 * 60 * 1000);
    if (!rateCheck.success) {
      return NextResponse.json(
        {
          success: false,
          error: 'Terlalu banyak permintaan. Mohon tunggu beberapa menit sebelum mengirim lagi ya!',
        },
        { status: 429 }
      );
    }

    const body = await req.json();
    const { display_name, message, honeypot } = body;

    // Bot trap check: honeypot field must be empty
    if (honeypot && String(honeypot).trim().length > 0) {
      return NextResponse.json(
        { success: false, error: 'Bot detected' },
        { status: 400 }
      );
    }

    // Validation
    const cleanName = sanitizeText(display_name || '');
    const cleanMsg = sanitizeText(message || '');

    if (cleanName.length < 2 || cleanName.length > 40) {
      return NextResponse.json(
        { success: false, error: 'Nama panggilan harus antara 2 sampai 40 karakter.' },
        { status: 400 }
      );
    }

    if (cleanMsg.length < 5 || cleanMsg.length > 500) {
      return NextResponse.json(
        { success: false, error: 'Pesan ucapan harus antara 5 sampai 500 karakter.' },
        { status: 400 }
      );
    }

    const newWish: Wish = {
      id: typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : `wish-${Date.now()}`,
      display_name: cleanName,
      message: cleanMsg,
      status: 'pending', // Always pending by default
      source: 'visitor',
      created_at: new Date().toISOString(),
      approved_at: null,
    };

    const supabase = getServerSupabase();
    if (supabase) {
      const { error } = await supabase.from('wishes').insert([
        {
          display_name: newWish.display_name,
          message: newWish.message,
          status: 'pending',
          source: 'visitor',
        },
      ]);

      if (error) {
        console.error('Supabase insert error:', error);
      }
    } else {
      // In-memory fallback
      sharedWishesStore.unshift(newWish);
    }

    return NextResponse.json(
      {
        success: true,
        message: 'YAY! Pesanmu sudah dikirim ke arsip kebahagiaan Bunda Novi! Floppy akan memastikan pesan ini diperiksa sebelum dipajang! WKWKWK! 💜',
        data: newWish,
      },
      { status: 201 }
    );
  } catch (err) {
    console.error('Error submitting wish:', err);
    return NextResponse.json(
      { success: false, error: 'Gagal mengirim ucapan. Silakan coba lagi.' },
      { status: 500 }
    );
  }
}
