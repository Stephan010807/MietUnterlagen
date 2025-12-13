import type { SelbstauskunftData } from './form';

export interface PDFDocumentProps {
  data: Partial<SelbstauskunftData>;
}

export interface PDFSectionProps {
  title: string;
  children: React.ReactNode;
}
