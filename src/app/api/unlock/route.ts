// src/app/api/unlock/route.ts
import { NextRequest, NextResponse } from 'next/server';

// In-memory unlock sessions store: Map<sessionId, { unlocked: boolean, timestamp: number }>
const unlockSessions = new Map<string, { unlocked: boolean; timestamp: number }>();

export async function GET(req: NextRequest) {
  const sid = req.nextUrl.searchParams.get('sid');
  if (!sid) {
    return NextResponse.json({ success: false, error: 'Missing sid' }, { status: 400 });
  }

  const session = unlockSessions.get(sid);
  if (!session) {
    return NextResponse.json({ success: true, unlocked: false });
  }

  return NextResponse.json({ success: true, unlocked: session.unlocked, timestamp: session.timestamp });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { sid } = body;

    if (!sid) {
      return NextResponse.json({ success: false, error: 'Missing sid' }, { status: 400 });
    }

    unlockSessions.set(sid, {
      unlocked: true,
      timestamp: Date.now(),
    });

    return NextResponse.json({
      success: true,
      message: 'BERHASIL DIBUKA! Layar laptop sekarang berubah ke mode pesta!',
    });
  } catch (err) {
    return NextResponse.json({ success: false, error: 'Internal Error' }, { status: 500 });
  }
}
