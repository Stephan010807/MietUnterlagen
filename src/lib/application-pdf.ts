import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import { applicationRows, type Application } from './application';

export async function createPdf(title: string) {
  const pdf = await PDFDocument.create();
  pdf.setTitle(title);
  const normal = await pdf.embedFont(StandardFonts.Helvetica);
  const bold = await pdf.embedFont(StandardFonts.HelveticaBold);
  let page = pdf.addPage([595, 842]);
  let y = 780;
  function text(value: string, size = 12, font = normal) {
    const paragraphs = value.replace(/\r\n?/g, '\n').replace(/\t/g, ' ').split('\n');
    for (const paragraph of paragraphs) {
      let row = '';
      for (const word of paragraph.split(/( +)/)) {
        if (row && font.widthOfTextAtSize(row + word, size) > 490) {
          draw(row);
          row = '';
        }
        if (!row && !word.trim()) continue;
        for (const character of word) {
          if (font.widthOfTextAtSize(row + character, size) > 490) {
            draw(row);
            row = '';
          }
          row += character;
        }
      }
      draw(row);
    }
    function draw(row: string) {
      if (y < 58) {
        page = pdf.addPage([595, 842]);
        y = 780;
      }
      page.drawText(row.trimEnd(), { x: 52, y, font, size, color: rgb(0.09, 0.16, 0.21) });
      y -= size * 1.5;
    }
  }
  return {
    text,
    heading: (value: string, size: number) => text(value, size, bold),
    space: (points: number) => { y -= points; },
    nextPage: () => { page = pdf.addPage([595, 842]); y = 780; },
    save: () => pdf.save(),
  };
}

export function writeApplication(pdf: Awaited<ReturnType<typeof createPdf>>, data: Application) {
  pdf.heading('Mieterselbstauskunft', 24);
  pdf.space(24);
  for (const [label, value] of applicationRows(data)) {
    pdf.heading(label, 11);
    pdf.text(value);
    pdf.space(12);
  }
}

export async function applicationPdf(data: Application) {
  const pdf = await createPdf('Mieterselbstauskunft');
  writeApplication(pdf, data);
  return pdf.save();
}

export async function checkPdfText(data: Application, letter: string) {
  const pdf = await PDFDocument.create();
  const normal = await pdf.embedFont(StandardFonts.Helvetica);
  try {
    normal.encodeText([...applicationRows(data).map(([, value]) => value), letter].join(' ').replace(/[\r\n\t]/g, ' '));
    return true;
  } catch {
    return false;
  }
}
