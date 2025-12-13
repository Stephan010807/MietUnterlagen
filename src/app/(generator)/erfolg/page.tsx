'use client';

import { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useFormStore } from '@/hooks/useFormStore';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { CheckCircle, Download, Home, Loader2 } from 'lucide-react';
import { generateAndDownloadPDF } from '@/lib/pdf/generate-pdf';

function ErfolgContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { formData, resetForm } = useFormStore();
  const [isDownloading, setIsDownloading] = useState(false);
  const [hasDownloaded, setHasDownloaded] = useState(false);

  const sessionId = searchParams.get('session_id');

  useEffect(() => {
    if (!sessionId) {
      // If no session ID, redirect to home
      router.push('/');
      return;
    }

    // Auto-download PDF on page load
    if (!hasDownloaded && formData.firstName) {
      handleDownloadPDF();
    }
  }, [sessionId, formData, hasDownloaded]);

  const handleDownloadPDF = async () => {
    if (!formData.firstName || !formData.lastName) {
      router.push('/');
      return;
    }

    setIsDownloading(true);
    try {
      await generateAndDownloadPDF(formData);
      setHasDownloaded(true);
    } catch (error) {
      console.error('PDF generation failed:', error);
      alert('PDF-Generierung fehlgeschlagen. Bitte versuchen Sie es erneut.');
    } finally {
      setIsDownloading(false);
    }
  };

  const handleBackToHome = () => {
    resetForm();
    router.push('/');
  };

  return (
    <div className="container py-16 md:py-24">
      <div className="mx-auto max-w-2xl">
        <Card variant="elevated" className="text-center">
          <div className="flex flex-col items-center space-y-6">
            {/* Success Icon */}
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-secondary-100">
              <CheckCircle className="h-12 w-12 text-secondary-600" />
            </div>

            {/* Title */}
            <div>
              <h1 className="text-heading-lg text-neutral-900 mb-3">
                Vielen Dank für Ihren Kauf!
              </h1>
              <p className="text-base text-neutral-600">
                Ihre Zahlung war erfolgreich. Ihr PDF wird automatisch
                heruntergeladen.
              </p>
            </div>

            {/* Download Status */}
            {isDownloading && (
              <div className="flex items-center gap-3 text-primary-700">
                <Loader2 className="h-5 w-5 animate-spin" />
                <span className="text-sm font-medium">
                  PDF wird generiert und heruntergeladen...
                </span>
              </div>
            )}

            {hasDownloaded && (
              <div className="bg-secondary-50 border border-secondary-200 rounded-lg p-4 w-full">
                <p className="text-sm text-secondary-900">
                  ✓ Ihr PDF wurde erfolgreich heruntergeladen!
                </p>
              </div>
            )}

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 w-full pt-4">
              {!isDownloading && (
                <Button
                  variant="primary"
                  size="lg"
                  onClick={handleDownloadPDF}
                  className="flex-1 gap-2"
                  disabled={isDownloading}
                >
                  <Download className="h-5 w-5" />
                  {hasDownloaded ? 'Erneut herunterladen' : 'PDF herunterladen'}
                </Button>
              )}

              <Button
                variant="outline"
                size="lg"
                onClick={handleBackToHome}
                className="flex-1 gap-2"
              >
                <Home className="h-5 w-5" />
                Zur Startseite
              </Button>
            </div>

            {/* Next Steps */}
            <div className="w-full pt-6 border-t border-neutral-200">
              <h3 className="font-semibold text-neutral-900 mb-3">
                Nächste Schritte:
              </h3>
              <ol className="text-left text-sm text-neutral-600 space-y-2">
                <li className="flex gap-2">
                  <span className="font-semibold text-primary-600">1.</span>
                  <span>
                    Drucken Sie Ihre Selbstauskunft aus oder senden Sie sie
                    digital
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="font-semibold text-primary-600">2.</span>
                  <span>
                    Fügen Sie empfohlene Anlagen bei (SCHUFA, Gehaltsnachweise)
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="font-semibold text-primary-600">3.</span>
                  <span>
                    Unterschreiben Sie das Dokument vor dem Versand
                  </span>
                </li>
              </ol>
            </div>

            {/* Support */}
            <div className="text-sm text-neutral-500 pt-4">
              <p>
                Bei Fragen oder Problemen kontaktieren Sie uns:{' '}
                <a
                  href="mailto:support@mieter-selbstauskunft.de"
                  className="text-primary-600 hover:underline"
                >
                  support@mieter-selbstauskunft.de
                </a>
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default function ErfolgPage() {
  return (
    <Suspense fallback={
      <div className="container py-16 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary-600" />
      </div>
    }>
      <ErfolgContent />
    </Suspense>
  );
}
