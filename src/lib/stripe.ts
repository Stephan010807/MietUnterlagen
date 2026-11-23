import { createHash, timingSafeEqual } from 'node:crypto';
import Stripe from 'stripe';
import { z } from 'zod';
import { OFFER } from './constants';

export const secretSchema = z.string().regex(/^[a-f0-9]{64}$/);
export const recoverySchema = z.object({
  id: z.string().regex(/^cs_(test|live)_[a-zA-Z0-9]{16,160}$/),
  secret: secretSchema,
}).strict();
export type Recovery = z.infer<typeof recoverySchema>;

export function stripeConfig() {
  const key = process.env.STRIPE_SECRET_KEY;
  const webhook = process.env.STRIPE_WEBHOOK_SECRET;
  const url = process.env.CHECKOUT_ORIGIN;
  if (!key || !webhook?.startsWith('whsec_') || !url || key.endsWith('_REPLACE_ME') || webhook.endsWith('_REPLACE_ME')) return null;
  const live = key.startsWith('sk_live_') && process.env.CHECKOUT_MODE === 'live';
  if (!live && !(key.startsWith('sk_test_') && process.env.CHECKOUT_MODE === 'test')) return null;
  try {
    const parsed = new URL(url);
    const local = ['localhost', '127.0.0.1'].includes(parsed.hostname);
    if (url !== parsed.origin || (parsed.protocol !== 'https:' &&
        !(parsed.protocol === 'http:' && local && !live))) return null;
    if (live && local) return null;
    const acceptingOrders = !live || process.env.CHECKOUT_NEW_ORDERS === 'true';
    return { acceptingOrders, stripe: new Stripe(key, { maxNetworkRetries: 1, timeout: 10_000 }), origin: url, webhook, live };
  } catch {
    return null;
  }
}

export function secretHash(secret: string) {
  return createHash('sha256').update(secret).digest('hex');
}

export function eligibleSession(session: Stripe.Checkout.Session, live: boolean, now = Date.now()) {
  const intent = session.payment_intent;
  const charge = intent && typeof intent !== 'string' ? intent.latest_charge : null;
  return session.livemode === live &&
    session.mode === 'payment' &&
    session.status === 'complete' &&
    session.payment_status === 'paid' &&
    session.metadata?.offer === OFFER.id &&
    session.amount_total === OFFER.amount &&
    session.currency === OFFER.currency &&
    !!intent && typeof intent !== 'string' && intent.status === 'succeeded' &&
    intent.amount_received === OFFER.amount && intent.currency === OFFER.currency &&
    !!charge && typeof charge !== 'string' && charge.paid && charge.captured &&
    !charge.disputed && !charge.refunded && charge.amount_refunded === 0 &&
    charge.amount === OFFER.amount && charge.currency === OFFER.currency &&
    now >= charge.created * 1000 && now < (charge.created + OFFER.days * 86400) * 1000;
}

export async function verifyPurchase(client: Stripe, live: boolean, recovery: Recovery) {
  const session = await client.checkout.sessions.retrieve(recovery.id, {
    expand: ['payment_intent.latest_charge'],
  });
  const stored = session.metadata?.recovery;
  return Boolean(stored && secretSchema.safeParse(stored).success &&
    timingSafeEqual(Buffer.from(stored, 'hex'), Buffer.from(secretHash(recovery.secret), 'hex')) &&
    eligibleSession(session, live));
}
