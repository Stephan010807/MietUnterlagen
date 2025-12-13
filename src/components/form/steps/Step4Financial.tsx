'use client';

import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { step4Schema, type Step4Data } from '@/lib/validators/form-schema';
import { FormField } from '../FormField';
import { Input } from '@/components/ui/input';
import { RadioGroup, type RadioOption } from '@/components/ui/radio-group';
import { Badge } from '@/components/ui/badge';

interface Step4Props {
  defaultValues?: Partial<Step4Data>;
  onSubmit: (data: Step4Data) => void;
}

const schufaOptions: RadioOption[] = [
  {
    value: 'yes',
    label: 'Ja, ich kann eine SCHUFA-Auskunft vorlegen',
    description: 'Wird von den meisten Vermietern erwartet',
  },
  {
    value: 'no',
    label: 'Nein, aktuell nicht verfügbar',
    description: 'Kann bei Bedarf noch eingeholt werden',
  },
];

const arrearsOptions: RadioOption[] = [
  {
    value: 'no',
    label: 'Nein, keine Mietrückstände',
    description: 'Miete wurde immer pünktlich gezahlt',
  },
  {
    value: 'yes',
    label: 'Ja, es gab/gibt Mietrückstände',
    description: 'Transparenz ist wichtig',
  },
];

export function Step4Financial({ defaultValues, onSubmit }: Step4Props) {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<Step4Data>({
    resolver: zodResolver(step4Schema),
    defaultValues: {
      ...defaultValues,
      hasSchufa: defaultValues?.hasSchufa ?? true,
      hasRentalArrears: defaultValues?.hasRentalArrears ?? false,
    },
  });

  const hasSchufa = useWatch({
    control,
    name: 'hasSchufa',
  });

  const hasRentalArrears = useWatch({
    control,
    name: 'hasRentalArrears',
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="bg-primary-50 border border-primary-200 rounded-lg p-4">
        <p className="text-sm text-primary-900">
          <strong>Hinweis:</strong> Diese Informationen helfen Vermietern, Ihre
          finanzielle Zuverlässigkeit einzuschätzen. Ehrliche Angaben sind wichtig.
        </p>
      </div>

      <FormField label="SCHUFA-Auskunft" required>
        <RadioGroup
          name="hasSchufa"
          options={schufaOptions}
          value={hasSchufa ? 'yes' : 'no'}
          onChange={(value) => setValue('hasSchufa', value === 'yes')}
        />
      </FormField>

      {hasSchufa && (
        <FormField
          label="SCHUFA-Score (optional)"
          error={errors.schufaScore?.message}
          helpText="Falls bekannt, z.B. aus der Selbstauskunft"
        >
          <div className="flex items-center gap-3">
            <Input
              {...register('schufaScore')}
              type="number"
              min="0"
              max="100"
              placeholder="z.B. 97.5"
              error={!!errors.schufaScore}
              className="max-w-xs"
            />
            <Badge variant="info">Optional</Badge>
          </div>
        </FormField>
      )}

      {!hasSchufa && (
        <div className="bg-accent-50 border border-accent-200 rounded-lg p-4">
          <p className="text-sm text-accent-900">
            Sie können eine kostenlose SCHUFA-Auskunft unter{' '}
            <a
              href="https://www.meineschufa.de"
              target="_blank"
              rel="noopener noreferrer"
              className="underline font-medium"
            >
              meineschufa.de
            </a>{' '}
            anfordern. Die Bearbeitung dauert ca. 1-2 Wochen.
          </p>
        </div>
      )}

      <FormField label="Mietrückstände" required>
        <RadioGroup
          name="hasRentalArrears"
          options={arrearsOptions}
          value={hasRentalArrears ? 'yes' : 'no'}
          onChange={(value) => setValue('hasRentalArrears', value === 'yes')}
        />
      </FormField>

      {hasRentalArrears && (
        <FormField
          label="Erläuterung zu Mietrückständen"
          required
          error={errors.rentalArrearsDetails?.message}
          helpText="Bitte erklären Sie die Umstände kurz und ehrlich"
        >
          <Input
            {...register('rentalArrearsDetails')}
            placeholder="z.B. Einmalige Verzögerung aufgrund von..."
            error={!!errors.rentalArrearsDetails}
          />
        </FormField>
      )}

      <button type="submit" className="hidden" />
    </form>
  );
}
