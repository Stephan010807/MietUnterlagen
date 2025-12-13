'use client';

import React, { useState, useEffect } from 'react';
import { PDFViewer } from '@react-pdf/renderer';
import { SelbstauskunftPDF } from './SelbstauskunftPDF';
import type { SelbstauskunftData } from '@/types/form';
import { Loader2 } from 'lucide-react';

interface PDFPreviewProps {
  data: Partial<SelbstauskunftData>;
}

export function PDFPreview({ data }: PDFPreviewProps) {
  const [isClient, setIsClient] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsClient(true);
    // Simulate loading time for better UX
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (!isClient) {
    return (
      <div className="flex items-center justify-center h-[600px] bg-neutral-100 rounded-lg">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="h-8 w-8 animate-spin text-primary-600" />
          <p className="text-sm text-neutral-600">PDF wird vorbereitet...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-[600px] md:h-[800px] rounded-lg overflow-hidden border border-neutral-300">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white z-10">
          <div className="flex flex-col items-center gap-3">
            <Loader2 className="h-8 w-8 animate-spin text-primary-600" />
            <p className="text-sm text-neutral-600">PDF wird generiert...</p>
          </div>
        </div>
      )}
      <PDFViewer
        width="100%"
        height="100%"
        showToolbar={false}
        className="border-0"
      >
        <SelbstauskunftPDF data={data} />
      </PDFViewer>
    </div>
  );
}
