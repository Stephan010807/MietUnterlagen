import { apiError, limitedText } from '@/lib/request-body';
import { stripeConfig } from '@/lib/stripe';

export async function POST(request: Request) {
  const config = stripeConfig();
  if (!config) return apiError('Webhook nicht verfügbar.', 503);
  const signature = request.headers.get('stripe-signature');
  if (!signature) return apiError('Ungültige Signatur.', 400);
  try {
    const event = config.stripe.webhooks.constructEvent(await limitedText(request, 128 * 1024), signature, config.webhook);
    if (event.livemode !== config.live) return apiError('Ungültiger Zahlungsmodus.', 400);
    // Stripe remains the source of truth. No event can create or extend an entitlement.
    return Response.json({ received: true });
  } catch {
    return apiError('Ungültige Signatur oder Nachricht.', 400);
  }
}
