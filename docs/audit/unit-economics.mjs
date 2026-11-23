// Edit these assumptions, then run: node docs/audit/unit-economics.mjs
const price = 9;
const feePercent = 0.015;
const feeFixed = 0.25;
const disputeFee = 20;
const ai = 0;
const scenarios = [
  { name: 'Vorsichtig', tax: 0.19, cpc: 0.80, conversion: 0.01, refunds: 0.08, variable: 0.45, disputes: 0.003 },
  { name: 'Mittel', tax: 0.19, cpc: 0.45, conversion: 0.03, refunds: 0.04, variable: 0.25, disputes: 0.001 },
  { name: 'Optimistisch', tax: 0, cpc: 0.30, conversion: 0.065, refunds: 0.02, variable: 0.15, disputes: 0.0005 },
];

console.table(scenarios.map(({ name, tax, cpc, conversion, refunds, variable, disputes }) => {
  const kept = 1 - refunds - disputes;
  const margin = price * kept / (1 + tax) - price * feePercent - feeFixed - variable - ai - disputes * disputeFee;
  const cac = cpc / conversion;
  return {
    Szenario: name,
    'DB vor Ads (€ je Zahlung)': margin.toFixed(2),
    'CAC (€ je Zahlung)': cac.toFixed(2),
    'DB nach Ads (€ je Zahlung)': (margin - cac).toFixed(2),
    'ROAS (behaltener Bruttoumsatz)': (price * kept / cac).toFixed(2),
    'Ads-ROI (%)': (100 * (margin - cac) / cac).toFixed(1),
    'Break-even-CPC (€)': (margin * conversion).toFixed(3),
    'Break-even-CVR (%)': margin > 0 ? (100 * cpc / margin).toFixed(2) : 'nicht erreichbar',
  };
}));
