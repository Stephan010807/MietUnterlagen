import { z } from 'zod';

export const profiles = ['Angestellt', 'Selbstständig', 'Studium', 'Andere Situation'] as const;
const line = (max: number) => z.string().trim().max(max, `Maximal ${max} Zeichen.`)
  .regex(/^[^\p{Cc}\p{Cf}]*$/u, 'Bitte entfernen Sie Steuerzeichen.');

export const applicationSchema = z.object({
  name: line(100).pipe(z.string().min(1, 'Bitte geben Sie Ihren Namen ein.')),
  email: line(254).pipe(z.union([z.literal(''), z.string().email('Bitte prüfen Sie die E-Mail-Adresse.')])),
  coApplicant: line(100),
  householdSize: z.number().int().min(1, 'Mindestens eine Person.').max(20, 'Maximal 20 Personen.'),
  profile: z.union([z.literal(''), z.enum(profiles)]),
  property: line(160),
  moveIn: line(60),
}).strict().refine((data) => !data.coApplicant || data.householdSize >= 2, {
  path: ['householdSize'], message: 'Bei zwei Bewerbenden umfasst der Haushalt mindestens zwei Personen.',
});

export const packetSchema = z.object({
  application: applicationSchema,
  letter: z.string().trim().min(1, 'Bitte schreiben Sie ein Anschreiben.').max(2400, 'Maximal 2400 Zeichen.')
    .regex(/^(?:[^\p{Cc}\p{Cf}]|[\r\n\t])*$/u, 'Bitte entfernen Sie Steuerzeichen.'),
}).strict();

export type Application = z.infer<typeof applicationSchema>;
export const emptyApplication: Application = {
  name: '', email: '', coApplicant: '', householdSize: 1, profile: '', property: '', moveIn: '',
};

export function letterTemplate({ name, coApplicant, property, moveIn }: Application) {
  const plural = Boolean(coApplicant);
  return [
    'Guten Tag,',
    `\n${plural ? 'wir interessieren uns' : 'ich interessiere mich'} für ${property || 'die angebotene Wohnung'}.`,
    ...(moveIn ? [`Als Einzugstermin ${plural ? 'stellen wir uns' : 'stelle ich mir'} ${moveIn} vor.`] : []),
    `\nÜber einen Besichtigungstermin ${plural ? 'würden wir uns' : 'würde ich mich'} freuen.`,
    '\nMit freundlichen Grüßen', [name, coApplicant].filter(Boolean).join(' und '),
  ].join('\n');
}

export function applicationRows(data: Application) {
  return [
    ['Name', data.name], ['E-Mail', data.email], ['Mitbewerbende Person', data.coApplicant],
    ['Personen im Haushalt', String(data.householdSize)], ['Aktuelle Tätigkeit', data.profile],
    ['Wohnung', data.property], ['Gewünschter Einzug', data.moveIn],
  ].filter(([, value]) => value);
}
