'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { step1Schema, type Step1Data } from '@/lib/validators/form-schema';
import { FormField } from '../FormField';
import { Input } from '@/components/ui/input';

interface Step1Props {
  defaultValues?: Partial<Step1Data>;
  onSubmit: (data: Step1Data) => void;
}

export function Step1PersonalInfo({ defaultValues, onSubmit }: Step1Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Step1Data>({
    resolver: zodResolver(step1Schema),
    defaultValues,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          label="Vorname"
          required
          error={errors.firstName?.message}
        >
          <Input
            {...register('firstName')}
            placeholder="z.B. Max"
            error={!!errors.firstName}
            autoFocus
          />
        </FormField>

        <FormField
          label="Nachname"
          required
          error={errors.lastName?.message}
        >
          <Input
            {...register('lastName')}
            placeholder="z.B. Mustermann"
            error={!!errors.lastName}
          />
        </FormField>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          label="Geburtsdatum"
          required
          error={errors.birthDate?.message}
        >
          <Input
            {...register('birthDate')}
            type="date"
            error={!!errors.birthDate}
          />
        </FormField>

        <FormField
          label="Geburtsort"
          required
          error={errors.birthPlace?.message}
        >
          <Input
            {...register('birthPlace')}
            placeholder="z.B. Berlin"
            error={!!errors.birthPlace}
          />
        </FormField>
      </div>

      <div className="space-y-4">
        <h4 className="font-medium text-neutral-900">Aktuelle Adresse</h4>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <FormField
              label="Straße"
              required
              error={errors.currentAddress?.street?.message}
            >
              <Input
                {...register('currentAddress.street')}
                placeholder="z.B. Musterstraße"
                error={!!errors.currentAddress?.street}
              />
            </FormField>
          </div>

          <FormField
            label="Hausnummer"
            required
            error={errors.currentAddress?.houseNumber?.message}
          >
            <Input
              {...register('currentAddress.houseNumber')}
              placeholder="z.B. 12a"
              error={!!errors.currentAddress?.houseNumber}
            />
          </FormField>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <FormField
            label="PLZ"
            required
            error={errors.currentAddress?.zipCode?.message}
          >
            <Input
              {...register('currentAddress.zipCode')}
              placeholder="z.B. 10115"
              maxLength={5}
              error={!!errors.currentAddress?.zipCode}
            />
          </FormField>

          <div className="md:col-span-2">
            <FormField
              label="Stadt"
              required
              error={errors.currentAddress?.city?.message}
            >
              <Input
                {...register('currentAddress.city')}
                placeholder="z.B. Berlin"
                error={!!errors.currentAddress?.city}
              />
            </FormField>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          label="Telefonnummer"
          required
          error={errors.phone?.message}
          helpText="Für eventuelle Rückfragen"
        >
          <Input
            {...register('phone')}
            type="tel"
            placeholder="z.B. +49 30 12345678"
            error={!!errors.phone}
          />
        </FormField>

        <FormField
          label="E-Mail-Adresse"
          required
          error={errors.email?.message}
        >
          <Input
            {...register('email')}
            type="email"
            placeholder="z.B. max.mustermann@email.de"
            error={!!errors.email}
          />
        </FormField>
      </div>

      <button type="submit" className="hidden" />
    </form>
  );
}
