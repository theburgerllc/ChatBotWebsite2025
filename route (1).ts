import { NextResponse } from 'next/server';
import crypto from 'crypto';

export const dynamic = 'force-dynamic';

function verifyHmacSHA256(rawBody: string, signature: string | null, secret: string): boolean {
  if (!signature) return false;
  const hmac = crypto.createHmac('sha256', secret).update(rawBody).digest('hex');
  try {
    // Constant-time compare
    return crypto.timingSafeEqual(Buffer.from(hmac), Buffer.from(signature));
  } catch {
    return false;
  }
}

export async function POST(req: Request) {
  const secret = process.env.TAVUS_WEBHOOK_SECRET;
  if (!secret) {
    return NextResponse.json({ error: 'Webhook secret not configured' }, { status: 500 });
  }

  const signature = req.headers.get('x-tavus-signature');
  const raw = await req.text(); // IMPORTANT: use raw body for HMAC

  const ok = verifyHmacSHA256(raw, signature, secret);
  if (!ok) {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  // Optionally persist or enqueue event; for now, echo minimal ack.
  try {
    const payload = JSON.parse(raw);
    console.log('[tavus:webhook]', payload.event_type, payload.conversation_id);
  } catch {
    // If body isn't JSON, still acknowledge if signature is valid
  }

  return NextResponse.json({ received: true });
}
