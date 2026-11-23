'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { step6Schema, type Step6Data } from '@/lib/validators/form-schema';
import { FormField } from '../FormField';
import { Checkbox } from '@/components/ui/checkbox';
import type { SelbstauskunftData } from '@/types/form';
import { formatDate } from '@/lib/utils';

interface Step6Props {
  defaultValues?: Partial<Step6Data>;
  formData: Partial<SelbstauskunftData>;
  onSubmit: (data: Step6Data) => void;
}

export function Step6Review({ defaultValues, formData, onSubmit }: Step6Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Step6Data>({
    resolver: zodResolver(step6Schema),
    defaultValues,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="bg-neutral-50 border border-neutral-200 rounded-lg p-6 space-y-4">
        <h4 className="font-semibold text-neutral-900">
          Zusammenfassung Ihrer Angaben
        </h4>

        <div className="space-y-3 text-sm">
          {formData.firstName && formData.lastName && (
            <div className="flex justify-between">
              <span className="text-neutral-600">Name:</span>
              <span className="font-medium text-neutral-900">
                {formData.firstName} {formData.lastName}
              </span>
            </div>
          )}

          {formData.birthDate && (
            <div className="flex justify-between">
              <span className="text-neutral-600">Geburtsdatum:</span>
              <span className="font-medium text-neutral-900">
                {formatDate(formData.birthDate)}
              </span>
            </div>
          )}

          {formData.email && (
            <div className="flex justify-between">
              <span className="text-neutral-600">E-Mail:</span>
              <span className="font-medium text-neutral-900">
                {formData.email}
              </span>
            </div>
          )}

          {formData.employmentStatus && (
            <div className="flex justify-between">
              <span className="text-neutral-600">Beschäftigung:</span>
              <span className="font-medium text-neutral-900">
                {formData.employmentStatus === 'employed' && 'Angestellt'}
                {formData.employmentStatus === 'self-employed' &&
                  'Selbstständig'}
                {formData.employmentStatus === 'student' && 'Student/in'}
                {formData.employmentStatus === 'unemployed' && 'Arbeitssuchend'}
                {formData.employmentStatus === 'retired' && 'Rentner/in'}
              </span>
            </div>
          )}

          {formData.monthlyNetIncome && (
            <div className="flex justify-between">
              <span className="text-neutral-600">Monatl. Einkommen:</span>
              <span className="font-medium text-neutral-900">
                {formData.monthlyNetIncome} €
              </span>
            </div>
          )}

          {formData.householdSize && (
            <div className="flex justify-between">
              <span className="text-neutral-600">Haushaltsgröße:</span>
              <span className="font-medium text-neutral-900">
                {formData.householdSize}{' '}
                {formData.householdSize === 1 ? 'Person' : 'Personen'}
              </span>
            </div>
          )}

          <div className="flex justify-between">
            <span className="text-neutral-600">Haustiere:</span>
            <span className="font-medium text-neutral-900">
              {formData.hasPets ? 'Ja' : 'Nein'}
              {formData.hasPets && formData.petDetails && (
                <span className="text-neutral-600 ml-1">
                  ({formData.petDetails})
                </span>
              )}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-neutral-600">SCHUFA:</span>
            <span className="font-medium text-neutral-900">
              {formData.hasSchufa ? 'Vorhanden' : 'Nicht verfügbar'}
            </span>
          </div>
        </div>
      </div>

      <div className="space-y-4 pt-4">
        <FormField error={errors.confirmedAccuracy?.message}>
          <Checkbox
            {...register('confirmedAccuracy')}
            label="Ich bestätige, dass alle Angaben wahrheitsgemäß und vollständig sind"
            description="Falsche Angaben können zur Ablehnung oder späteren Kündigung führen"
            error={!!errors.confirmedAccuracy}
          />
        </FormField>

        <FormField error={errors.consentToDataProcessing?.message}>
          <Checkbox
            {...register('consentToDataProcessing')}
            label="Ich stimme der Verarbeitung meiner Daten zum Zwecke der Wohnungsbewerbung zu"
            description="Ihre Angaben werden in diesem Browser gespeichert. Für die Zahlung wird Ihre E-Mail-Adresse übermittelt."
            error={!!errors.consentToDataProcessing}
          />
        </FormField>
      </div>

      <div className="bg-secondary-50 border border-secondary-200 rounded-lg p-4">
        <p className="text-sm text-secondary-900">
          <strong>Was passiert als Nächstes?</strong>
          <br />
          Nach dem Klick auf &quot;Weiter zur Vorschau&quot; können Sie Ihre
          Selbstauskunft als PDF ansehen und herunterladen (9,00 €).
        </p>
      </div>

      <button type="submit" className="hidden" />
    </form>
  );
}
