// src/app/api/admin/wishes/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getServerSupabase } from '@/lib/supabase/server';
import { sharedWishesStore } from '@/lib/memoryStore';

function isAuthorized(req: NextRequest): boolean {
  const adminSecret = process.env.ADMIN_SECRET_KEY || 'bundanovi-admin-secret-2026';
  const authHeader = req.headers.get('x-admin-key') || req.nextUrl.searchParams.get('key');
  return authHeader === adminSecret;
}

export async function GET(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const supabase = getServerSupabase();
    if (supabase) {
      const { data, error } = await supabase
        .from('wishes')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && data) {
        return NextResponse.json({ success: true, data });
      }
    }

    return NextResponse.json({ success: true, data: sharedWishesStore });
  } catch (err) {
    console.error('Admin wishes error:', err);
    return NextResponse.json({ success: false, error: 'Internal Error' }, { status: 500 });
  }
}
