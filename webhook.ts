import type { NextApiRequest, NextApiResponse } from 'next';
import crypto from 'crypto';

export const config = {
  api: {
    bodyParser: false, // we need the raw body for HMAC verification
  },
};

function readStream(req: NextApiRequest): Promise<string> {
  return new Promise((resolve, reject) => {
    let data = '';
    req.on('data', (chunk) => (data += chunk));
    req.on('end', () => resolve(data));
    req.on('error', reject);
  });
}

function verifyHmacSHA256(rawBody: string, signature: string | null, secret: string): boolean {
  if (!signature) return false;
  const hmac = crypto.createHmac('sha256', secret).update(rawBody).digest('hex');
  try {
    return crypto.timingSafeEqual(Buffer.from(hmac), Buffer.from(signature));
  } catch {
    return false;
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const secret = process.env.TAVUS_WEBHOOK_SECRET;
  if (!secret) return res.status(500).json({ error: 'Webhook secret not configured' });

  const raw = await readStream(req);
  const signature = req.headers['x-tavus-signature'] as string | undefined || null;

  const ok = verifyHmacSHA256(raw, signature, secret);
  if (!ok) return res.status(400).json({ error: 'Invalid signature' });

  try {
    const payload = JSON.parse(raw);
    console.log('[tavus:webhook]', payload.event_type, payload.conversation_id);
  } catch {
    // If not JSON, still accept
  }

  res.status(200).json({ received: true });
}
