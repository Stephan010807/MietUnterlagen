'use client';

import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { step2Schema, type Step2Data } from '@/lib/validators/form-schema';
import { FormField } from '../FormField';
import { Input } from '@/components/ui/input';
import { RadioGroup, type RadioOption } from '@/components/ui/radio-group';

interface Step2Props {
  defaultValues?: Partial<Step2Data>;
  onSubmit: (data: Step2Data) => void;
}

const employmentOptions: RadioOption[] = [
  {
    value: 'employed',
    label: 'Angestellt',
    description: 'Festanstellung oder befristetes Arbeitsverhältnis',
  },
  {
    value: 'self-employed',
    label: 'Selbstständig / Freiberufler',
    description: 'Eigenes Unternehmen oder freiberufliche Tätigkeit',
  },
  {
    value: 'student',
    label: 'Student/in',
    description: 'Studium an einer Universität oder Hochschule',
  },
  {
    value: 'unemployed',
    label: 'Arbeitssuchend',
    description: 'Derzeit auf Jobsuche',
  },
  {
    value: 'retired',
    label: 'Rentner/in',
    description: 'Im Ruhestand',
  },
];

export function Step2Employment({ defaultValues, onSubmit }: Step2Props) {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<Step2Data>({
    resolver: zodResolver(step2Schema),
    defaultValues,
  });

  const employmentStatus = useWatch({
    control,
    name: 'employmentStatus',
  });

  const showEmployerFields =
    employmentStatus === 'employed' || employmentStatus === 'self-employed';
  const showStudentFields = employmentStatus === 'student';

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <FormField
        label="Beschäftigungsstatus"
        required
        error={errors.employmentStatus?.message}
      >
        <RadioGroup
          name="employmentStatus"
          options={employmentOptions}
          value={employmentStatus}
          onChange={(value) => setValue('employmentStatus', value as any)}
          error={!!errors.employmentStatus}
        />
      </FormField>

      {showEmployerFields && (
        <>
          <FormField
            label={
              employmentStatus === 'self-employed'
                ? 'Unternehmen / Tätigkeit'
                : 'Arbeitgeber'
            }
            required
            error={errors.employer?.message}
          >
            <Input
              {...register('employer')}
              placeholder={
                employmentStatus === 'self-employed'
                  ? 'z.B. Mustermann GmbH'
                  : 'z.B. ABC Firma GmbH'
              }
              error={!!errors.employer}
            />
          </FormField>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              label="Position / Berufsbezeichnung"
              error={errors.position?.message}
            >
              <Input
                {...register('position')}
                placeholder="z.B. Software-Entwickler"
                error={!!errors.position}
              />
            </FormField>

            <FormField
              label={
                employmentStatus === 'self-employed'
                  ? 'Selbstständig seit'
                  : 'Beschäftigt seit'
              }
              error={errors.employedSince?.message}
              helpText="Optional, aber hilfreich für Vermieter"
            >
              <Input
                {...register('employedSince')}
                type="month"
                error={!!errors.employedSince}
              />
            </FormField>
          </div>
        </>
      )}

      {showStudentFields && (
        <FormField
          label="Universität / Hochschule"
          required
          error={errors.university?.message}
        >
          <Input
            {...register('university')}
            placeholder="z.B. Technische Universität Berlin"
            error={!!errors.university}
          />
        </FormField>
      )}

      <FormField
        label={
          employmentStatus === 'student'
            ? 'Monatliches Einkommen (netto)'
            : employmentStatus === 'unemployed'
            ? 'Monatliche Bezüge (netto)'
            : 'Monatliches Nettoeinkommen'
        }
        required
        error={errors.monthlyNetIncome?.message}
        helpText={
          employmentStatus === 'student'
            ? 'Inkl. BAföG, Nebenjob, Unterhalt etc.'
            : employmentStatus === 'unemployed'
            ? 'z.B. Arbeitslosengeld, Ersparnisse'
            : 'Nach Abzug von Steuern und Sozialabgaben'
        }
      >
        <Input
          {...register('monthlyNetIncome')}
          type="number"
          placeholder="z.B. 3000"
          error={!!errors.monthlyNetIncome}
        />
      </FormField>

      <FormField
        label="Zusätzliche Einkommen (optional)"
        error={errors.additionalIncome?.message}
        helpText="z.B. Mieteinnahmen, Kapitalerträge"
      >
        <Input
          {...register('additionalIncome')}
          type="number"
          placeholder="z.B. 500"
          error={!!errors.additionalIncome}
        />
      </FormField>

      <button type="submit" className="hidden" />
    </form>
  );
}
