import { PDFDocument, PDFName } from 'pdf-lib';

export const MAX_FILES = 8;
export const MAX_BYTES = 12 * 1024 * 1024;
export const MAX_PAGES = 40;

export async function mergeAttachments(base: ArrayBuffer, files: File[]) {
  if (files.length > MAX_FILES || files.reduce((total, f) => total + f.size, 0) > MAX_BYTES) {
    throw new Error('Maximal 8 Anlagen mit insgesamt 12 MB.');
  }
  const result = await PDFDocument.load(base);
  let count = 0;
  for (const file of files) {
    try {
      if (!file.size || !/\.pdf$/i.test(file.name) ||
          !(await file.slice(0, 5).text()).startsWith('%PDF-')) throw new Error();
      const document = await PDFDocument.load(await file.arrayBuffer(), {
        throwOnInvalidObject: true,
        updateMetadata: false,
      });
      const indices = document.getPageIndices();
      if (!indices.length) throw new Error();
      count += indices.length;
      if (count > MAX_PAGES) return Promise.reject(new Error('Die Anlagen dürfen zusammen maximal 40 Seiten haben.'));
      // Keep page content, drop page-level links, actions and form widgets.
      for (const page of document.getPages()) {
        page.node.delete(PDFName.of('Annots'));
        page.node.delete(PDFName.of('AA'));
        page.node.delete(PDFName.of('Metadata'));
      }
      for (const page of await result.copyPages(document, indices)) result.addPage(page);
    } catch {
      throw new Error(`„${file.name}“ konnte nicht gelesen werden. Verwenden Sie ein intaktes PDF ohne Passwort.`);
    }
  }
  return result.save();
}
