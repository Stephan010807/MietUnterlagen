import { OFFER } from '@/lib/constants';
import { apiError, limitedJson } from '@/lib/request-body';
import { secretHash, secretSchema, stripeConfig } from '@/lib/stripe';
import { z } from 'zod';

export async function POST(request: Request) {
  const config = stripeConfig();
  if (!config?.acceptingOrders) return apiError('Der Kauf ist derzeit nicht verfügbar.', 503);
  if (request.headers.get('origin') !== config.origin) return apiError('Anfrage abgelehnt.', 403);

  let secret: string;
  try {
    ({ secret } = z.object({ secret: secretSchema }).strict().parse(await limitedJson(request, 512)));
  } catch {
    return apiError('Ungültige Anfrage.', 400);
  }
  try {
    const hash = secretHash(secret);
    const session = await config.stripe.checkout.sessions.create({
      mode: 'payment',
      adaptive_pricing: { enabled: false },
      allowed_payment_method_types: ['card'],
      line_items: [{
        price_data: {
          currency: OFFER.currency, unit_amount: OFFER.amount,
          product_data: { name: OFFER.name, description: 'PDF-Export und Korrekturen für 30 Tage ab Zahlung.' },
        },
        quantity: 1,
      }],
      metadata: { offer: OFFER.id, recovery: hash },
      locale: 'de',
      success_url: `${config.origin}/erfolg`,
      cancel_url: `${config.origin}/formular#mappe`,
      allow_promotion_codes: false,
    }, { idempotencyKey: `checkout:${OFFER.id}:${hash}` });
    if (!session.url?.startsWith('https://checkout.stripe.com/')) return apiError('Checkout konnte nicht gestartet werden.', 502);
    return Response.json({ id: session.id, url: session.url }, { headers: { 'Cache-Control': 'no-store' } });
  } catch {
    return apiError('Checkout konnte nicht gestartet werden. Bitte versuchen Sie es erneut.', 502);
  }
}
