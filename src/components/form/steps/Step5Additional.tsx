'use client';

import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { step5Schema, type Step5Data } from '@/lib/validators/form-schema';
import { FormField } from '../FormField';
import { Input } from '@/components/ui/input';
import { RadioGroup, type RadioOption } from '@/components/ui/radio-group';

interface Step5Props {
  defaultValues?: Partial<Step5Data>;
  onSubmit: (data: Step5Data) => void;
}

const smokerOptions: RadioOption[] = [
  {
    value: 'no',
    label: 'Nichtraucher',
    description: 'Ich rauche nicht',
  },
  {
    value: 'yes',
    label: 'Raucher',
    description: 'Ich rauche',
  },
];

export function Step5Additional({ defaultValues, onSubmit }: Step5Props) {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<Step5Data>({
    resolver: zodResolver(step5Schema),
    defaultValues: {
      ...defaultValues,
      isSmoker: defaultValues?.isSmoker ?? false,
    },
  });

  const isSmoker = useWatch({
    control,
    name: 'isSmoker',
  });

  const messageLength = useWatch({
    control,
    name: 'messageToLandlord',
  })?.length || 0;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <FormField label="Raucher" required>
        <RadioGroup
          name="isSmoker"
          options={smokerOptions}
          value={isSmoker ? 'yes' : 'no'}
          onChange={(value) => setValue('isSmoker', value === 'yes')}
        />
      </FormField>

      <FormField
        label="Nachricht an den Vermieter (optional)"
        error={errors.messageToLandlord?.message}
        helpText="Eine persönliche Nachricht kann Ihre Bewerbung positiv hervorheben"
      >
        <div className="space-y-2">
          <textarea
            {...register('messageToLandlord')}
            rows={5}
            maxLength={500}
            placeholder="z.B. Sehr geehrte Damen und Herren,&#10;&#10;ich bin auf der Suche nach einer ruhigen Wohnung in guter Lage. Als zuverlässiger Mieter lege ich Wert auf einen respektvollen Umgang und pünktliche Mietzahlung..."
            className="flex w-full rounded-lg border border-neutral-300 bg-white px-4 py-3 text-base transition-base placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent hover:border-neutral-400 resize-none"
          />
          <div className="flex justify-between text-sm text-neutral-500">
            <span>Optional, aber empfohlen</span>
            <span>
              {messageLength}/500 Zeichen
            </span>
          </div>
        </div>
      </FormField>

      <div className="space-y-4">
        <h4 className="font-medium text-neutral-900">
          Vorvermieter (optional)
        </h4>
        <p className="text-sm text-neutral-600">
          Eine Referenz des Vorvermieters kann Ihre Bewerbung stärken
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            label="Name des Vorvermieters"
            error={errors.previousLandlord?.name?.message}
          >
            <Input
              {...register('previousLandlord.name')}
              placeholder="z.B. Max Müller"
              error={!!errors.previousLandlord?.name}
            />
          </FormField>

          <FormField
            label="Telefonnummer"
            error={errors.previousLandlord?.phone?.message}
          >
            <Input
              {...register('previousLandlord.phone')}
              type="tel"
              placeholder="z.B. +49 30 12345678"
              error={!!errors.previousLandlord?.phone}
            />
          </FormField>
        </div>
      </div>

      <button type="submit" className="hidden" />
    </form>
  );
}
