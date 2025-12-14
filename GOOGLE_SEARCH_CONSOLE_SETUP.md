# Google Search Console Setup Guide

## 📋 Schritt-für-Schritt Anleitung

### 1. Google Search Console einrichten

1. **Gehe zu:** https://search.google.com/search-console/
2. **Klicke auf:** "Property hinzufügen"
3. **Wähle:** "URL-Präfix" (nicht Domain)
4. **Gib ein:** `https://mietunterlagen.de`

### 2. Website verifizieren

**Option A: HTML-Tag (Empfohlen)**
1. Kopiere den Verification-Code von Google
2. Füge ihn in `src/app/layout.tsx` ein:
   ```typescript
   verification: {
     google: 'dein-verification-code-hier',
   },
   ```
3. Deploye auf Vercel
4. Klicke in Search Console auf "Bestätigen"

**Option B: HTML-Datei**
1. Lade die Verification-Datei herunter
2. Lege sie in `/public/` Ordner
3. Deploye auf Vercel
4. Klicke auf "Bestätigen"

### 3. Sitemap einreichen

1. Nach erfolgreicher Verifizierung
2. Gehe zu "Sitemaps" im linken Menü
3. Gib ein: `sitemap.xml`
4. Klicke auf "Senden"

### 4. Wichtige Einstellungen

**URL-Inspektion:**
- Teste deine Hauptseiten:
  - `https://mietunterlagen.de/`
  - `https://mietunterlagen.de/formular`
- Klicke auf "Indexierung beantragen"

**Leistung überwachen:**
- Nach 2-3 Tagen siehst du erste Daten
- Überwache: Klicks, Impressionen, CTR, Position
- Wichtigste Keywords: "Mieter Selbstauskunft", "Selbstauskunft Wohnung"

### 5. Bing Webmaster Tools (Optional)

1. **Gehe zu:** https://www.bing.com/webmasters
2. Importiere Daten von Google Search Console
3. Oder verifiziere manuell wie oben

## 🎯 Nach 1-2 Wochen

### Überprüfe:
- [ ] Sind alle Seiten indexiert?
- [ ] Gibt es Crawling-Fehler?
- [ ] Wie ist die Performance?
- [ ] Welche Keywords ranken?

### Optimiere:
- Title-Tags anpassen basierend auf Performance
- Meta-Beschreibungen optimieren
- Interne Verlinkung verbessern
- Content basierend auf Suchanfragen erweitern

## 📊 Wichtige Metriken

**Ziel-Keywords (Top 10 in 3 Monaten):**
- Mieter Selbstauskunft PDF
- Selbstauskunft Wohnung Vorlage
- Mieterselbstauskunft erstellen

**KPIs:**
- CTR > 3% (Search Console)
- Durchschnittliche Position < 20
- Indexierte Seiten: Alle wichtigen Pages

## 🚀 Nächste Schritte für SEO

1. **Content-Marketing:**
   - Blog mit Ratgeber-Artikeln
   - "Was ist eine Selbstauskunft?"
   - "Rechte und Pflichten bei Wohnungsbewerbung"

2. **Lokales SEO:**
   - Stadt-spezifische Landing Pages
   - "Mieter-Selbstauskunft Berlin"
   - Google My Business (optional)

3. **Backlinks:**
   - Immobilien-Blogs kontaktieren
   - Gastbeiträge schreiben
   - Verzeichnisse eintragen

4. **Technical SEO:**
   - Core Web Vitals optimieren (bereits gut mit Vercel)
   - Mobile-Friendly (bereits responsive)
   - HTTPS (bereits aktiv)

## 📝 Notes

- Erste Indexierung kann 1-7 Tage dauern
- Erste Rankings nach 2-4 Wochen
- Volle SEO-Wirkung nach 3-6 Monaten
- Geduld ist wichtig!
