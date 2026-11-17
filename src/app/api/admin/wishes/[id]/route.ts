// src/app/api/admin/wishes/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getServerSupabase } from '@/lib/supabase/server';
import { sharedWishesStore } from '@/lib/memoryStore';

function isAuthorized(req: NextRequest): boolean {
  const adminSecret = process.env.ADMIN_SECRET_KEY || 'bundanovi-admin-secret-2026';
  const authHeader = req.headers.get('x-admin-key') || req.nextUrl.searchParams.get('key');
  return authHeader === adminSecret;
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { id } = await params;
    const body = await req.json();
    const { status } = body;

    if (!['approved', 'rejected', 'pending'].includes(status)) {
      return NextResponse.json({ success: false, error: 'Invalid status' }, { status: 400 });
    }

    const supabase = getServerSupabase();
    if (supabase) {
      const updatePayload: Record<string, unknown> = { status };
      if (status === 'approved') {
        updatePayload.approved_at = new Date().toISOString();
      }

      const { data, error } = await supabase
        .from('wishes')
        .update(updatePayload)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
      }

      return NextResponse.json({ success: true, data });
    }

    const item = sharedWishesStore.find((w) => w.id === id);
    if (item) {
      item.status = status;
      if (status === 'approved') item.approved_at = new Date().toISOString();
    }

    return NextResponse.json({
      success: true,
      message: 'Status updated (fallback mode)',
      data: item || { id, status },
    });
  } catch (err) {
    console.error('Admin PATCH error:', err);
    return NextResponse.json({ success: false, error: 'Internal Error' }, { status: 500 });
  }
}
