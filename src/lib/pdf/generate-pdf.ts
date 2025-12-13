import { pdf } from '@react-pdf/renderer';
import type { SelbstauskunftData } from '@/types/form';
import { SelbstauskunftPDF } from '@/components/pdf/SelbstauskunftPDF';

export async function generateSelbstauskunftPDF(
  data: Partial<SelbstauskunftData>
): Promise<Blob> {
  const doc = SelbstauskunftPDF({ data });
  const blob = await pdf(doc).toBlob();
  return blob;
}

export function downloadPDF(blob: Blob, filename: string = 'Mieter-Selbstauskunft.pdf') {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export async function generateAndDownloadPDF(data: Partial<SelbstauskunftData>) {
  const blob = await generateSelbstauskunftPDF(data);
  downloadPDF(blob);
  return blob;
}
