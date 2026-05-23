'use client';

import { SubmitHandler, useForm } from 'react-hook-form';

import { crearProspecto } from '@/app/actions/prospectos.actions';
import { CreateProspectoSchema, CreateProspectoType } from '@/app/schemas/prospecto.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface Empresa {
  id: string;
  nombre: string;
  industria: string;
}

interface Props {
  empresas: Empresa[];
}

export default function ProspectoForm({ empresas }: Props) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CreateProspectoType>({
    resolver: zodResolver(CreateProspectoSchema),
    defaultValues: {
      email: '',
      nombre: '',
      cargo: '',
      fuenteOrigen: 'Google_Ads',
      empresaId: '',
    },
  });

  const onSubmit: SubmitHandler<CreateProspectoType> = async (data) => {
    try {
      setError(null);
      await crearProspecto(data);
      router.push('/prospectos');
      router.refresh();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Error al registrar prospecto',
      );
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-lg">

      <div>
        <label className="block text-sm font-medium mb-1">Email</label>
        <input
          {...register('email')}
          type="email"
          className="w-full border rounded px-3 py-2 text-sm"
          placeholder="samuel@techglobal.com"
        />
        {errors.email && (
          <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Nombre</label>
        <input
          {...register('nombre')}
          className="w-full border rounded px-3 py-2 text-sm"
          placeholder="Samuel Rodriguez"
        />
        {errors.nombre && (
          <p className="text-red-500 text-xs mt-1">{errors.nombre.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Cargo</label>
        <input
          {...register('cargo')}
          className="w-full border rounded px-3 py-2 text-sm"
          placeholder="CTO"
        />
        {errors.cargo && (
          <p className="text-red-500 text-xs mt-1">{errors.cargo.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Fuente de origen</label>
        <select
          {...register('fuenteOrigen')}
          className="w-full border rounded px-3 py-2 text-sm"
        >
          <option value="Google_Ads">Google Ads</option>
          <option value="Email">Email</option>
          <option value="Referido">Referido</option>
          <option value="Organico">Orgánico</option>
        </select>
        {errors.fuenteOrigen && (
          <p className="text-red-500 text-xs mt-1">{errors.fuenteOrigen.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Empresa</label>
        <select
          {...register('empresaId')}
          className="w-full border rounded px-3 py-2 text-sm"
        >
          <option value="">Selecciona una empresa</option>
          {empresas.map((e) => (
            <option key={e.id} value={e.id}>
              {e.nombre} — {e.industria}
            </option>
          ))}
        </select>
        {errors.empresaId && (
          <p className="text-red-500 text-xs mt-1">{errors.empresaId.message}</p>
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
        {isSubmitting ? 'Registrando...' : 'Registrar prospecto'}
      </button>

    </form>
  );
}