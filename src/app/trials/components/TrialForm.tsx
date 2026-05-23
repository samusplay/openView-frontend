'use client';

import { SubmitHandler, useForm } from 'react-hook-form';

import { crearTrial } from '@/app/actions/trials.actions';
import { CreateTrialSchema, CreateTrialType } from '@/app/schemas/trial.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface Prospecto {
  id: string;
  nombre: string;
  email: string;
}

interface Props {
  prospectos: Prospecto[];
}

export default function TrialForm({ prospectos }: Props) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CreateTrialType>({
    resolver: zodResolver(CreateTrialSchema),
    defaultValues: {
      prospectoId: '',
      versionPlan: 'Basic',
    },
  });

  const onSubmit: SubmitHandler<CreateTrialType> = async (data) => {
    try {
      setError(null);
      await crearTrial(data);
      router.push('/prospectos');
      router.refresh();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Error al iniciar trial',
      );
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-lg">

      <div>
        <label className="block text-sm font-medium mb-1">Prospecto</label>
        <select
          {...register('prospectoId')}
          className="w-full border rounded px-3 py-2 text-sm"
        >
          <option value="">Selecciona un prospecto</option>
          {prospectos.map((p) => (
            <option key={p.id} value={p.id}>
              {p.nombre} — {p.email}
            </option>
          ))}
        </select>
        {errors.prospectoId && (
          <p className="text-red-500 text-xs mt-1">{errors.prospectoId.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Plan</label>
        <select
          {...register('versionPlan')}
          className="w-full border rounded px-3 py-2 text-sm"
        >
          <option value="Basic">Basic</option>
          <option value="Professional">Professional</option>
          <option value="Enterprise">Enterprise</option>
        </select>
        {errors.versionPlan && (
          <p className="text-red-500 text-xs mt-1">{errors.versionPlan.message}</p>
        )}
      </div>

      {error && (
        <p className="text-red-600 text-sm bg-red-50 px-3 py-2 rounded">{error}</p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-blue-600 text-white py-2 rounded text-sm font-medium hover:bg-blue-700 disabled:opacity-50"
      >
        {isSubmitting ? 'Iniciando...' : 'Iniciar trial'}
      </button>

    </form>
  );
}