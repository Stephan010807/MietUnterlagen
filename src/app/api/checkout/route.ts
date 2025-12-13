import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { PDF_PRICE, SITE_CONFIG } from '@/lib/constants';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { formData } = body;

    if (!formData || !formData.email) {
      return NextResponse.json(
        { error: 'Form data is required' },
        { status: 400 }
      );
    }

    // Create Stripe Checkout session
    // Note: formData is stored in localStorage on client-side
    // We only store essential info in metadata to avoid the 500 char limit
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card', 'paypal'],
      line_items: [
        {
          price_data: {
            currency: 'eur',
            product_data: {
              name: 'Mieter-Selbstauskunft PDF',
              description:
                'Professionelle, rechtlich geprüfte Mieter-Selbstauskunft als PDF',
              images: [`${SITE_CONFIG.url}/og-image.jpg`],
            },
            unit_amount: PDF_PRICE,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${SITE_CONFIG.url}/erfolg?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${SITE_CONFIG.url}/vorschau`,
      customer_email: formData.email,
      metadata: {
        customerName: `${formData.firstName} ${formData.lastName}`,
        customerEmail: formData.email,
      },
      locale: 'de',
    });

    return NextResponse.json({ sessionId: session.id, url: session.url });
  } catch (error) {
    console.error('Checkout error:', error);
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    );
  }
}
