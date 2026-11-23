import Stripe from 'stripe';
import { z } from 'zod';
import { packetSchema } from '@/lib/application';
import { packetPdf } from '@/lib/packet-pdf';
import { apiError, limitedJson } from '@/lib/request-body';
import { recoverySchema, stripeConfig, verifyPurchase, type Recovery } from '@/lib/stripe';

async function packetRequest(request: Request, withPacket: boolean) {
  const config = stripeConfig();
  if (!config) return apiError('Der Export ist derzeit nicht verfügbar.', 503);
  if (request.headers.get('origin') !== config.origin) return apiError('Anfrage abgelehnt.', 403);
  let recovery: Recovery;
  let packet: z.infer<typeof packetSchema> | undefined;
  try {
    const body = await limitedJson(request, withPacket ? 16_384 : 512);
    if (withPacket) {
      ({ recovery, packet } = z.object({ recovery: recoverySchema, packet: packetSchema }).strict().parse(body));
    } else {
      recovery = recoverySchema.parse(body);
    }
  } catch {
    return apiError('Bitte prüfen Sie Ihre Angaben und den Kaufcode.', 400);
  }
  try {
    if (!await verifyPurchase(config.stripe, config.live, recovery)) {
      return apiError('Kauf nicht bestätigt oder Zugriff abgelaufen. Prüfen Sie den Kaufcode und bei verzögerter Zahlung später erneut.', 403);
    }
  } catch (error) {
    if (error instanceof Stripe.errors.StripeInvalidRequestError && error.code === 'resource_missing') {
      return apiError('Kauf nicht bestätigt. Bitte prüfen Sie den Kaufcode.', 403);
    }
    return apiError('Die Zahlung konnte gerade nicht geprüft werden. Bitte versuchen Sie es erneut.', 502);
  }
  if (!packet) return Response.json({ verified: true }, { headers: { 'Cache-Control': 'no-store' } });
  try {
    const pdf = await packetPdf(packet.application, packet.letter);
    return new Response(new Uint8Array(pdf), {
      headers: { 'Content-Type': 'application/pdf', 'Cache-Control': 'no-store', 'Content-Disposition': 'attachment; filename="bewerbungsmappe.pdf"' },
    });
  } catch {
    return apiError('Das PDF konnte nicht erstellt werden. Bitte prüfen Sie, ob Ihre Eingaben Sonderzeichen enthalten, die das PDF nicht darstellen kann.', 422);
  }
}

export const POST = (request: Request) => packetRequest(request, true);
export const PUT = (request: Request) => packetRequest(request, false);
