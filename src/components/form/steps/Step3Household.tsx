'use client';

import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { step3Schema, type Step3Data } from '@/lib/validators/form-schema';
import { FormField } from '../FormField';
import { Input } from '@/components/ui/input';
import { RadioGroup, type RadioOption } from '@/components/ui/radio-group';

interface Step3Props {
  defaultValues?: Partial<Step3Data>;
  onSubmit: (data: Step3Data) => void;
}

const petsOptions: RadioOption[] = [
  {
    value: 'no',
    label: 'Nein, ich habe keine Haustiere',
    description: 'Keine Haustiere im Haushalt',
  },
  {
    value: 'yes',
    label: 'Ja, ich habe Haustiere',
    description: 'Haustiere sind Teil meines Haushalts',
  },
];

export function Step3Household({ defaultValues, onSubmit }: Step3Props) {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<Step3Data>({
    resolver: zodResolver(step3Schema),
    defaultValues: {
      ...defaultValues,
      hasPets: defaultValues?.hasPets ?? false,
    },
  });

  const hasPets = useWatch({
    control,
    name: 'hasPets',
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <FormField
        label="Haushaltsgröße"
        required
        error={errors.householdSize?.message}
        helpText="Anzahl der Personen, die einziehen werden"
      >
        <Input
          {...register('householdSize', { valueAsNumber: true })}
          type="number"
          min="1"
          max="20"
          placeholder="z.B. 2"
          error={!!errors.householdSize}
          autoFocus
        />
      </FormField>

      <FormField
        label="Gewünschter Einzugstermin (optional)"
        error={errors.moveInDate?.message}
        helpText="Falls Sie bereits einen Wunschtermin haben"
      >
        <Input {...register('moveInDate')} type="date" error={!!errors.moveInDate} />
      </FormField>

      <FormField label="Haustiere" required helpText="Ehrliche Angaben erhöhen Ihre Chancen">
        <RadioGroup
          name="hasPets"
          options={petsOptions}
          value={hasPets ? 'yes' : 'no'}
          onChange={(value) => setValue('hasPets', value === 'yes')}
        />
      </FormField>

      {hasPets && (
        <FormField
          label="Welche Haustiere?"
          error={errors.petDetails?.message}
          helpText="z.B. Art, Rasse, Größe, Alter"
        >
          <Input
            {...register('petDetails')}
            placeholder="z.B. Katze, 3 Jahre alt, Hauskatze"
            error={!!errors.petDetails}
          />
        </FormField>
      )}

      <button type="submit" className="hidden" />
    </form>
  );
}
