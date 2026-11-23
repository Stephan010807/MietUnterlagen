import type { Metadata } from 'next';
import { stripeConfig } from '@/lib/stripe';
import ApplicationEditor from './ApplicationEditor';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Mieterselbstauskunft und Bewerbungsmappe erstellen',
  description: 'Selbstauskunft kostenlos als PDF herunterladen, ein Anschreiben bearbeiten und eine Bewerbungsmappe erstellen.',
  alternates: { canonical: '/formular' },
};

export default function FormularPage() {
  const config = stripeConfig();
  return <ApplicationEditor checkoutEnabled={Boolean(config)} acceptingOrders={Boolean(config?.acceptingOrders)} />;
}
