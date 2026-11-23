'use client';

import { useEffect, useRef, useState, type FormEvent } from 'react';
import { applicationRows, applicationSchema, emptyApplication, letterTemplate, packetSchema, profiles, type Application } from '@/lib/application';
import { clearBrowserData, CHECKOUT_KEY, DRAFT_KEY, LEGACY_KEY, PURCHASE_KEY } from '@/lib/browser-data';
import { PRICE_LABEL, OFFER } from '@/lib/constants';

const input = 'w-full rounded-lg border border-slate-500 bg-white px-3 py-2';
const primary = 'inline-block rounded-lg bg-slate-900 px-4 py-2 font-medium text-white hover:bg-slate-700 disabled:opacity-60';
const secondary = 'inline-block rounded-lg border border-slate-500 px-4 py-2 font-medium hover:bg-slate-50 disabled:opacity-60';

function download(bytes: ArrayBuffer, name: string) {
  const url = URL.createObjectURL(new Blob([bytes], { type: 'application/pdf' }));
  const link = document.createElement('a');
  link.href = url;
  link.download = name;
  link.click();
  window.setTimeout(() => URL.revokeObjectURL(url), 30_000);
}

function merge(base: ArrayBuffer, files: File[]): Promise<ArrayBuffer> {
  if (!files.length) return Promise.resolve(base);
  return new Promise((resolve, reject) => {
    const worker = new Worker(new URL('../../../lib/attachments.worker.ts', import.meta.url));
    const finish = () => { window.clearTimeout(timer); worker.terminate(); };
    const timer = window.setTimeout(() => { finish(); reject(new Error('Die PDF-Verarbeitung dauerte zu lange. Verwenden Sie kleinere Anlagen.')); }, 25_000);
    worker.onerror = () => { finish(); reject(new Error('Die Anlagen konnten nicht verarbeitet werden.')); };
    worker.onmessage = ({ data }) => {
      finish();
      if (data.error) reject(new Error(data.error));
      else resolve(Uint8Array.from(data.bytes).buffer);
    };
    worker.postMessage({ base, files }, [base]);
  });
}

function parseCode(code: string) {
  const [id, secret, extra] = code.trim().split('.');
  if (extra !== undefined || !/^cs_(test|live)_[a-zA-Z0-9]{16,160}$/.test(id) || !/^[a-f0-9]{64}$/.test(secret ?? '')) {
    throw new Error('Bitte geben Sie den vollständigen Kaufcode ein.');
  }
  return { id, secret };
}

async function send(path: string, data: unknown, method = 'POST') {
  const response = await fetch(path, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data), signal: AbortSignal.timeout(30_000) });
  if (!response.ok) {
    const error = await response.json().catch(() => null);
    throw new Error(error?.error || 'Die Anfrage konnte nicht abgeschlossen werden.');
  }
  return response;
}

export default function ApplicationEditor({ checkoutEnabled, acceptingOrders }: { checkoutEnabled: boolean; acceptingOrders: boolean }) {
  const [application, setApplication] = useState<Application>({ ...emptyApplication });
  const [letter, setLetter] = useState('');
  const [files, setFiles] = useState<File[]>([]);
  const [remember, setRemember] = useState(false);
  const [oldDraft, setOldDraft] = useState(false);
  const [code, setCode] = useState('');
  const [checkoutUrl, setCheckoutUrl] = useState('');
  const [verified, setVerified] = useState(false);
  const [allowExport, setAllowExport] = useState(false);
  const [ready, setReady] = useState(false);
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const checkoutSecret = useRef('');
  const errorFocus = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      try {
        const saved = JSON.parse(localStorage.getItem(DRAFT_KEY) ?? 'null');
        if (saved && typeof saved.letter === 'string' && saved.letter.length <= 2400 && saved.application) {
          const draft = Object.fromEntries(Object.entries(emptyApplication).map(([key, value]) => {
            const found = saved.application[key];
            return [key, typeof found === typeof value ? found : value];
          })) as Application;
          setApplication(draft);
          setLetter(saved.letter);
          setRemember(true);
        }
        setOldDraft(Boolean(localStorage.getItem(LEGACY_KEY)));
        setCode(localStorage.getItem(PURCHASE_KEY) ?? '');
        const savedUrl = localStorage.getItem(CHECKOUT_KEY);
        if (savedUrl?.startsWith('https://checkout.stripe.com/')) setCheckoutUrl(savedUrl);
      } catch {
        setStatus('Lokale Daten konnten nicht gelesen werden.');
      }
      if (new URLSearchParams(window.location.search).has('zahlung')) {
        setStatus('Sie sind von Stripe zurück. Prüfen Sie Ihren Kaufcode, um den Export freizuschalten.');
      }
      setReady(true);
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!ready || !remember) return;
    try {
      localStorage.setItem(DRAFT_KEY, JSON.stringify({ application, letter }));
    } catch {
      const timer = window.setTimeout(() => setStatus('Der Browser konnte den Entwurf nicht speichern.'), 0);
      return () => window.clearTimeout(timer);
    }
  }, [ready, remember, application, letter]);

  useEffect(() => { if (error) errorFocus.current?.focus(); }, [error]);

  function update<K extends keyof Application>(field: K, value: Application[K]) {
    setApplication((previous) => ({ ...previous, [field]: value }));
    setErrors((previous) => ({ ...previous, [field]: '' }));
  }

  function validate() {
    const parsed = applicationSchema.safeParse(application);
    if (parsed.success) return parsed.data;
    setErrors(Object.fromEntries(parsed.error.issues.map((issue) => [String(issue.path[0]), issue.message])));
    throw new Error('Bitte prüfen Sie die markierten Felder.');
  }

  async function run(action: () => Promise<void>) {
    setBusy(true);
    setError('');
    setStatus('');
    try {
      await action();
    } catch (failure) {
      setError(failure instanceof Error ? failure.message : 'Die Aktion ist fehlgeschlagen.');
    } finally {
      setBusy(false);
    }
  }

  async function free(event: FormEvent) {
    event.preventDefault();
    await run(async () => {
      const data = validate();
      const { applicationPdf } = await import('@/lib/application-pdf');
      try {
        download(Uint8Array.from(await applicationPdf(data)).buffer, 'mieterselbstauskunft.pdf');
      } catch {
        throw new Error('Das PDF konnte nicht erstellt werden. Bitte prüfen Sie die verwendeten Sonderzeichen.');
      }
      setStatus('Ihre Selbstauskunft wurde erstellt.');
    });
  }

  function checkout() {
    void run(async () => {
      const packet = packetSchema.safeParse({ application: validate(), letter });
      if (!packet.success) throw new Error('Bitte schreiben Sie vor dem Kauf ein Anschreiben mit höchstens 2400 Zeichen.');
      const { checkPdfText } = await import('@/lib/application-pdf');
      if (!await checkPdfText(packet.data.application, packet.data.letter)) {
        throw new Error('Das PDF unterstützt einige Zeichen in Ihren Angaben oder im Anschreiben nicht. Bitte passen Sie die Eingaben vor dem Kauf an.');
      }
      if (!checkoutSecret.current) {
        checkoutSecret.current = Array.from(crypto.getRandomValues(new Uint8Array(32)), (byte) => byte.toString(16).padStart(2, '0')).join('');
      }
      const response = await send('/api/checkout', { secret: checkoutSecret.current });
      const { id, url } = await response.json();
      const nextCode = `${id}.${checkoutSecret.current}`;
      setCode(nextCode);
      setCheckoutUrl(url);
      try {
        localStorage.setItem(PURCHASE_KEY, nextCode);
        localStorage.setItem(CHECKOUT_KEY, url);
      } catch {
        setStatus('Der Kaufcode kann hier nicht gespeichert werden. Kopieren Sie ihn vor der Zahlung.');
      }
    });
  }

  function restartCheckout() {
    if (!window.confirm('Nur fortfahren, wenn keine Zahlung erfolgt ist. Kopieren Sie den bisherigen Kaufcode, falls Sie ihn noch benötigen.')) return;
    checkoutSecret.current = '';
    setCheckoutUrl('');
    try { localStorage.removeItem(CHECKOUT_KEY); } catch { /* The in-memory link is already cleared. */ }
  }

  function paid() {
    void run(async () => {
      const result = packetSchema.safeParse({ application: validate(), letter });
      if (!result.success) throw new Error('Bitte schreiben Sie ein Anschreiben mit höchstens 2400 Zeichen und ohne Steuerzeichen.');
      if (!allowExport) throw new Error('Bitte bestätigen Sie die einmalige Übermittlung der Mappe für den Export.');
      const response = await send('/api/mappe', { recovery: parseCode(code), packet: result.data });
      download(await merge(await response.arrayBuffer(), files), 'bewerbungsmappe.pdf');
      setStatus('Ihre Bewerbungsmappe wurde erstellt.');
    });
  }

  function clear() {
    if (!window.confirm('Formular, Anschreiben, Anlagen und den lokal gespeicherten Kaufcode entfernen? Bewahren Sie Ihren Kaufcode bei Bedarf separat auf.')) return;
    try {
      clearBrowserData(localStorage);
      setOldDraft(false);
      setStatus('Die Daten dieser Website wurden aus dem lokalen Speicher entfernt.');
    } catch {
      setStatus('Der lokale Speicher ist nicht zugänglich. Prüfen Sie die Website-Daten im Browser.');
    }
    setRemember(false);
    setApplication({ ...emptyApplication });
    setLetter('');
    setFiles([]);
    setCode('');
    setVerified(false);
    setCheckoutUrl('');
    setAllowExport(false);
    setErrors({});
    setError('');
    checkoutSecret.current = '';
  }

  function addFiles(selection: FileList | null) {
    if (!selection) return;
    const next = [...files, ...Array.from(selection)];
    setError('');
    if (next.length > 8 || next.reduce((total, file) => total + file.size, 0) > 12 * 1024 * 1024) {
      return setError('Maximal 8 Anlagen mit insgesamt 12 MB.');
    }
    if (next.some((file) => !file.size || !/\.pdf$/i.test(file.name))) return setError('Bitte wählen Sie nicht leere PDF-Dateien.');
    setFiles(next);
  }

  function moveFile(index: number, offset: number) {
    const next = [...files];
    [next[index], next[index + offset]] = [next[index + offset], next[index]];
    setFiles(next);
  }

  const fields = [
    ['name', 'Ihr Name', 100], ['email', 'Kontakt-E-Mail (optional)', 254],
    ['coApplicant', 'Name einer mitbewerbenden Person (optional)', 100],
    ['property', 'Wohnung oder Inserat (optional)', 160], ['moveIn', 'Gewünschter Einzug (optional)', 60],
  ] as const;

  return (
    <div className="mx-auto max-w-3xl space-y-8 px-4 py-10">
      <h1 className="text-3xl font-bold sm:text-4xl">Ihre Wohnungsbewerbung</h1>
      <p>Erstellen Sie eine kostenlose Selbstauskunft. Geben Sie nur an, was Sie für diese Bewerbung weitergeben möchten.</p>
      {error && <p role="alert" tabIndex={-1} ref={errorFocus} className="rounded bg-red-50 p-3 text-red-900">{error}</p>}
      <p role="status" className="text-sm text-slate-700">{status}</p>
      <fieldset disabled={busy || !ready} className="min-w-0 space-y-8">
        <legend className="sr-only">Bewerbung bearbeiten</legend>
        <form onSubmit={free} noValidate className="space-y-4 rounded-xl border p-4 sm:p-6">
          <h2 className="text-xl font-semibold">Selbstauskunft · kostenlos</h2>
          {fields.map(([key, title, limit]) => (
            <label key={key} className="block">
              <span className="mb-1 block font-medium">{title}</span>
              <input className={input} type={key === 'email' ? 'email' : 'text'} required={key === 'name'}
                maxLength={limit} value={application[key]} aria-invalid={Boolean(errors[key])}
                aria-describedby={errors[key] ? `error-${key}` : undefined}
                onChange={(event) => update(key, event.target.value)} />
              {errors[key] && <span id={`error-${key}`} className="text-red-800">{errors[key]}</span>}
            </label>
          ))}
          <label className="block">Personen im Haushalt
            <input className={input} type="number" min={1} max={20} value={Number.isNaN(application.householdSize) ? '' : application.householdSize}
              aria-invalid={Boolean(errors.householdSize)} aria-describedby={errors.householdSize ? 'error-household' : undefined}
              onChange={(event) => update('householdSize', event.target.valueAsNumber)} />
            {errors.householdSize && <span id="error-household" className="text-red-800">{errors.householdSize}</span>}
          </label>
          <label className="block">Aktuelle Tätigkeit (optional)
            <select className={input} value={application.profile} onChange={(event) => update('profile', event.target.value as Application['profile'])}>
              <option value="">Keine Angabe</option>
              {profiles.map((profile) => <option key={profile}>{profile}</option>)}
            </select>
          </label>
          <details className="rounded-lg bg-slate-50 p-3">
            <summary className="cursor-pointer font-medium">Angaben vor dem Export prüfen</summary>
            <dl className="space-y-2 py-2 break-words">{applicationRows(application).map(([label, value]) => (
              <div key={label}><dt className="font-medium">{label}</dt><dd>{value}</dd></div>
            ))}</dl>
          </details>
          <button className={primary}>Kostenlose Selbstauskunft herunterladen</button>
        </form>

        <section id="mappe" className="space-y-4 rounded-xl border p-4 sm:p-6" aria-labelledby="mappe-heading">
          <h2 id="mappe-heading" className="text-xl font-semibold">Bewerbungsmappe · {PRICE_LABEL} einmalig</h2>
          <p>Ein PDF mit Anschreiben, Selbstauskunft und Ihren eigenen Anlagen. Mit dem Kaufcode können Sie die Mappe für {OFFER.days} Tage ab Zahlung erneut erstellen und korrigieren.</p>
          <button type="button" className={secondary} onClick={() => {
            if (!letter || window.confirm('Das aktuelle Anschreiben durch die Vorlage ersetzen?')) setLetter(letterTemplate(application));
          }}>Anschreiben aus Vorlage erstellen</button>
          <label className="block">Anschreiben
            <textarea className={input} rows={8} maxLength={2400} value={letter} onChange={(event) => setLetter(event.target.value)} />
          </label>
          <label className="block">Eigene PDF-Anlagen (optional)
            <input className={input} type="file" accept=".pdf,application/pdf" multiple aria-describedby="attachment-help"
              onChange={(event) => { addFiles(event.target.files); event.target.value = ''; }} />
          </label>
          <p id="attachment-help" className="text-sm text-slate-700">Bis zu 8 PDFs, zusammen 12 MB und 40 Seiten. Verwenden Sie eigene, vertrauenswürdige PDFs ohne Passwort. Formularfelder und Links aus Anlagen werden beim Zusammenfügen entfernt. Anlagen bleiben im Browser und müssen nach einem Seitenwechsel erneut gewählt werden.</p>
          <ol className="space-y-2">
            {files.map((file, index) => <li key={`${index}-${file.name}`} className="flex flex-wrap items-center gap-2 break-all">
              <span>{file.name}</span>
              <button className={secondary} aria-label={`${file.name} nach oben verschieben`} disabled={index === 0} onClick={() => moveFile(index, -1)}>↑</button>
              <button className={secondary} aria-label={`${file.name} nach unten verschieben`} disabled={index === files.length - 1} onClick={() => moveFile(index, 1)}>↓</button>
              <button className={secondary} aria-label={`${file.name} entfernen`} onClick={() => setFiles(files.filter((_, position) => position !== index))}>Entfernen</button>
            </li>)}
          </ol>
          {!checkoutEnabled && <p role="status">Der Kauf ist derzeit nicht verfügbar. Die kostenlose Selbstauskunft und der Anschreiben-Editor sind verfügbar.</p>}
          {checkoutEnabled && !acceptingOrders && <p>Neue Käufe sind pausiert. Vorhandene Kaufcodes können Sie weiterhin prüfen.</p>}
          {checkoutEnabled && <div className="space-y-3 border-t pt-4">
            <label className="block">Kaufcode
              <input className={input} value={code} onChange={(event) => { setCode(event.target.value); setVerified(false); }} autoComplete="off" spellCheck={false} maxLength={240} />
            </label>
            <p className="text-sm">Wenn Sie Ihre Eingaben nach der Zahlung wiedersehen möchten, aktivieren Sie unten vorab die lokale Speicherung. Speichern Sie den Kaufcode vor dem Bezahlen privat. Er stellt den Exportzugriff wieder her. Für die Mappe brauchen Sie Ihre Angaben und Anlagen erneut.</p>
            <div className="flex flex-wrap gap-3">
              <button className={secondary} onClick={() => void run(async () => {
                setVerified(false);
                await send('/api/mappe', parseCode(code), 'PUT');
                setVerified(true);
                setCheckoutUrl('');
                try {
                  localStorage.setItem(PURCHASE_KEY, code.trim());
                  localStorage.removeItem(CHECKOUT_KEY);
                } catch { /* Manual code still works. */ }
                setStatus('Kauf bestätigt. Sie können die Mappe exportieren.');
              })}>Kauf prüfen</button>
              {acceptingOrders && !verified && !checkoutUrl && <button className={primary} onClick={checkout}>Kauf vorbereiten</button>}
              {acceptingOrders && !verified && checkoutUrl && <>
                <a className={primary} href={checkoutUrl}>Weiter zur Zahlung bei Stripe</a>
                <button className={secondary} onClick={restartCheckout}>Abgelaufenen Checkout ersetzen</button>
              </>}
            </div>
            {verified && <>
              <label className="flex items-start gap-2"><input type="checkbox" className="mt-1" checked={allowExport} onChange={(event) => setAllowExport(event.target.checked)} />
                <span>Beim Export dürfen meine Selbstauskunft und das Anschreiben zur PDF-Erstellung an MietUnterlagen übertragen werden. Die Anlagen bleiben auf diesem Gerät.</span>
              </label>
              <button className={primary} onClick={paid}>Bewerbungsmappe herunterladen</button>
            </>}
          </div>}
        </section>

        <section className="space-y-3" aria-labelledby="data-heading">
          <h2 id="data-heading" className="text-xl font-semibold">Daten auf diesem Gerät</h2>
          <label className="flex items-start gap-2"><input type="checkbox" className="mt-1" checked={remember} onChange={(event) => {
            setRemember(event.target.checked);
            if (!event.target.checked) {
              try { localStorage.removeItem(DRAFT_KEY); } catch { setStatus('Der lokale Speicher ist nicht zugänglich.'); }
            }
          }} /> <span>Formular und Anschreiben lokal speichern, damit ich später fortfahren kann.</span></label>
          <p className="text-sm text-slate-700">Ohne diese Option gehen Eingaben beim Verlassen der Seite verloren. Der vorbereitete Kaufcode und optional gespeicherte Entwürfe bleiben bis zur Löschung im Browser. Andere Personen mit Zugriff auf dieses Browserprofil können sie sehen.</p>
          {oldDraft && <p>Dieser Browser enthält einen Entwurf aus der vorherigen Version. Nutzen Sie die Löschfunktion, um auch diesen Entwurf zu entfernen.</p>}
          <button className={secondary} onClick={clear}>Lokale Daten löschen</button>
        </section>
      </fieldset>
    </div>
  );
}
