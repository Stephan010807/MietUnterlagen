'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useFormStore } from '@/hooks/useFormStore';
import { PDFPreview } from '@/components/pdf/PDFPreview';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowLeft, Download, FileCheck } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';
import { PDF_PRICE } from '@/lib/constants';

export default function VorschauPage() {
  const router = useRouter();
  const { formData, resetForm } = useFormStore();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Check if form is filled
    if (!formData.firstName || !formData.lastName || !formData.email) {
      router.push('/formular');
    }
  }, [formData, router]);

  const handleCheckout = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ formData }),
      });

      const { url, error } = await response.json();

      if (error) {
        alert('Fehler beim Erstellen der Checkout-Sitzung: ' + error);
        setIsLoading(false);
        return;
      }

      if (url) {
        window.location.href = url;
      }
    } catch (error) {
      console.error('Checkout error:', error);
      alert('Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.');
      setIsLoading(false);
    }
  };

  const handleBackToForm = () => {
    router.push('/formular');
  };

  return (
    <div className="container py-8 md:py-12">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="mb-8">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleBackToForm}
            className="mb-4 gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Zurück zum Formular
          </Button>

          <h1 className="text-heading-lg text-neutral-900 mb-3">
            Vorschau Ihrer Selbstauskunft
          </h1>
          <p className="text-base text-neutral-600">
            Überprüfen Sie Ihre Angaben. Das PDF sieht genau so aus, wie es
            Vermieter erhalten werden.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* PDF Preview */}
          <div className="lg:col-span-2">
            <PDFPreview data={formData} />
          </div>

          {/* Download Card */}
          <div className="lg:col-span-1">
            <Card variant="elevated" className="sticky top-8">
              <div className="space-y-6">
                <div>
                  <h3 className="text-heading-sm text-neutral-900 mb-2">
                    PDF herunterladen
                  </h3>
                  <p className="text-sm text-neutral-600">
                    Laden Sie Ihre professionelle Selbstauskunft als PDF herunter
                    und bewerben Sie sich damit auf Ihre Wunschwohnung.
                  </p>
                </div>

                <div className="bg-primary-50 border border-primary-200 rounded-lg p-4">
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-3xl font-bold text-primary-900">
                      {formatCurrency(PDF_PRICE / 100)}
                    </span>
                    <span className="text-sm text-primary-700">einmalig</span>
                  </div>
                  <p className="text-sm text-primary-800">
                    Keine versteckten Kosten. Kein Abo.
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <FileCheck className="h-5 w-5 text-secondary-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-neutral-700">
                      Professionelles Layout
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <FileCheck className="h-5 w-5 text-secondary-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-neutral-700">
                      Rechtlich geprüfte Fragen
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <FileCheck className="h-5 w-5 text-secondary-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-neutral-700">
                      Sofort verfügbar
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <FileCheck className="h-5 w-5 text-secondary-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-neutral-700">
                      Keine Datenspeicherung
                    </span>
                  </div>
                </div>

                <Button
                  variant="primary"
                  size="lg"
                  className="w-full gap-2"
                  onClick={handleCheckout}
                  loading={isLoading}
                >
                  <Download className="h-5 w-5" />
                  Jetzt für {formatCurrency(PDF_PRICE / 100)} herunterladen
                </Button>

                <p className="text-xs text-neutral-500 text-center">
                  Sichere Zahlung über Stripe. Nach dem Kauf erhalten Sie sofort
                  Zugriff auf Ihr PDF.
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
