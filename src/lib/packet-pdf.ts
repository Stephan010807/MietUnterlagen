import { createPdf, writeApplication } from './application-pdf';
import type { Application } from './application';

export async function packetPdf(application: Application, letter: string) {
  const pdf = await createPdf('Bewerbungsmappe');
  pdf.heading('Bewerbungsmappe', 25);
  pdf.text([application.name, application.coApplicant].filter(Boolean).join(' und '), 15);
  if (application.property) pdf.text(application.property);
  pdf.space(30);
  pdf.heading('Anschreiben', 18);
  pdf.space(8);
  pdf.text(letter);
  pdf.nextPage();
  writeApplication(pdf, application);
  return pdf.save();
}
