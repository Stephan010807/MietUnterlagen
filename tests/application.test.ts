import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import { PDFDocument, PDFName } from 'pdf-lib';
import { applicationSchema, emptyApplication, letterTemplate, packetSchema } from '../src/lib/application';
import { applicationPdf, checkPdfText } from '../src/lib/application-pdf';
import { mergeAttachments } from '../src/lib/attachments';
import { CHECKOUT_KEY, clearBrowserData, DRAFT_KEY, LEGACY_KEY, PURCHASE_KEY } from '../src/lib/browser-data';
import { packetPdf } from '../src/lib/packet-pdf';
import { limitedJson } from '../src/lib/request-body';

const data = { ...emptyApplication, name: 'Jana Müller', coApplicant: 'Robin Groß', householdSize: 2, profile: 'Studium' as const, property: 'Wohnung im Testweg 4' };

test('validates minimal profiles, optional contact, couples and input limits', () => {
  assert.equal(applicationSchema.safeParse(emptyApplication).success, false);
  assert.equal(applicationSchema.safeParse(data).success, true);
  for (const changes of [{ householdSize: 1 }, { householdSize: 2.5 }, { email: 'ungültig' }, { name: 'a'.repeat(101) }, { name: 'a\nb' }]) {
    assert.equal(applicationSchema.safeParse({ ...data, ...changes }).success, false);
  }
  assert.match(letterTemplate(data), /wir interessieren uns/);
  assert.match(letterTemplate({ ...data, coApplicant: '' }), /ich interessiere mich/);
  assert.equal(packetSchema.safeParse({ application: data, letter: ' '.repeat(10) }).success, false);
});


async function pdfFile(name: string, widths: number[]) {
  const doc = await PDFDocument.create();
  for (const width of widths) {
    const page = doc.addPage([width, 500]);
    page.node.set(PDFName.of('AA'), doc.context.obj({}));
  }
  return new File([Uint8Array.from(await doc.save()).buffer], name, { type: 'application/pdf' });
}

test('free PDF, paid pages, Unicode error and attachment order', async () => {
  const free = await applicationPdf(data);
  assert.equal((await PDFDocument.load(free)).getPageCount(), 1);
  const letter = letterTemplate(data);
  assert.equal(await checkPdfText(data, letter), true);
  assert.equal(await checkPdfText({ ...data, name: '山田' }, letter), false);
  const base = Uint8Array.from(await packetPdf(data, letter)).buffer;
  const merged = await mergeAttachments(base, [await pdfFile('zuerst.pdf', [401]), await pdfFile('danach.pdf', [402, 403])]);
  const doc = await PDFDocument.load(merged);
  assert.deepEqual(doc.getPages().map((page) => page.getWidth()), [595, 595, 401, 402, 403]);
  assert.equal(doc.getPage(2).node.has(PDFName.of('AA')), false);
});

test('rejects invalid attachments and enforces file, size and page limits', async () => {
  const base = Uint8Array.from(await packetPdf(data, letterTemplate(data))).buffer;
  await assert.rejects(mergeAttachments(base, [new File(['%PDF-x'], 'defekt.pdf')]), /defekt.pdf/);
  const encrypted = Buffer.from(await readFile('tests/fixtures/password-protected.pdf.b64', 'utf8'), 'base64');
  await assert.rejects(mergeAttachments(base, [new File([Uint8Array.from(encrypted).buffer], 'passwort.pdf')]), /ohne Passwort/);
  const attachment = await pdfFile('anlage.pdf', Array(41).fill(401));
  await assert.rejects(mergeAttachments(base, [attachment]), /40 Seiten/);
  await assert.rejects(mergeAttachments(base, Array(9).fill(attachment)), /8 Anlagen/);
  await assert.rejects(mergeAttachments(base, [new File([new Uint8Array(13 * 1024 * 1024)], 'gross.pdf')]), /12 MB/);
});

test('deletes current and legacy site data and preserves unrelated keys', () => {
  const storage = new Map([DRAFT_KEY, PURCHASE_KEY, LEGACY_KEY, CHECKOUT_KEY, 'other'].map((key) => [key, 'value']));
  clearBrowserData({ removeItem: (key) => { storage.delete(key); } });
  assert.deepEqual([...storage.keys()], ['other']);
});

test('bounds chunked and invalid JSON input', async () => {
  const headers = { 'Content-Type': 'application/json' };
  const request = (body: string) => new Request('http://localhost', { method: 'POST', headers, body });
  assert.deepEqual(await limitedJson(request('{}'), 2), {});
  await assert.rejects(limitedJson(request('{"large":true}'), 8));
  await assert.rejects(limitedJson(request('{'), 8));
});
