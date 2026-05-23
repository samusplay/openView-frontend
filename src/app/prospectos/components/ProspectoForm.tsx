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
    <div className="w-full max-w-xl bg-white rounded-xl border border-zinc-200 shadow-sm p-6 sm:p-8 text-zinc-900 antialiased">
      <div className="mb-6">
        <h2 className="text-lg font-bold text-zinc-950 tracking-tight">Crear Nuevo Prospecto</h2>
        <p className="text-sm text-zinc-500 mt-1">Ingresa los datos del contacto y vincula su organización.</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        
        {/* Email */}
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-zinc-700 block">Email Corporativo</label>
          <input
            {...register('email')}
            type="email"
            className={`w-full bg-white border rounded-lg px-3.5 py-2 text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-4 transition-all shadow-sm ${
              errors.email 
                ? 'border-rose-300 focus:border-rose-500 focus:ring-rose-500/10' 
                : 'border-zinc-200 focus:border-zinc-900 focus:ring-zinc-950/5'
            }`}
            placeholder="ejemplo@empresa.com"
          />
          {errors.email && (
            <p className="text-rose-600 text-xs font-medium mt-1 flex items-center gap-1">
              <span className="h-1 w-1 rounded-full bg-rose-500" />
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Nombre completo */}
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-zinc-700 block">Nombre completo</label>
          <input
            {...register('nombre')}
            className={`w-full bg-white border rounded-lg px-3.5 py-2 text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-4 transition-all shadow-sm ${
              errors.nombre 
                ? 'border-rose-300 focus:border-rose-500 focus:ring-rose-500/10' 
                : 'border-zinc-200 focus:border-zinc-900 focus:ring-zinc-950/5'
            }`}
            placeholder="Juan Pérez"
          />
          {errors.nombre && (
            <p className="text-rose-600 text-xs font-medium mt-1 flex items-center gap-1">
              <span className="h-1 w-1 rounded-full bg-rose-500" />
              {errors.nombre.message}
            </p>
          )}
        </div>

        {/* Grid de Cargo y Fuente de Origen */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Cargo */}
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-zinc-700 block">Cargo / Rol</label>
            <input
              {...register('cargo')}
              className={`w-full bg-white border rounded-lg px-3.5 py-2 text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-4 transition-all shadow-sm ${
                errors.cargo 
                  ? 'border-rose-300 focus:border-rose-500 focus:ring-rose-500/10' 
                  : 'border-zinc-200 focus:border-zinc-900 focus:ring-zinc-950/5'
              }`}
              placeholder="e.g. CTO, Product Manager"
            />
            {errors.cargo && (
              <p className="text-rose-600 text-xs font-medium mt-1 flex items-center gap-1">
                <span className="h-1 w-1 rounded-full bg-rose-500" />
                {errors.cargo.message}
              </p>
            )}
          </div>

          {/* Fuente de origen */}
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-zinc-700 block">Origen de captación</label>
            <select
              {...register('fuenteOrigen')}
              className="w-full bg-white border border-zinc-200 rounded-lg px-3 py-2 text-sm text-zinc-900 focus:outline-none focus:ring-4 focus:border-zinc-900 focus:ring-zinc-950/5 transition-all shadow-sm cursor-pointer appearance-none bg-[url('data:image/svg+xml;bs64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHZpZXdCb3g9IjAgMCAyNCAyNCIgc3Ryb2tlPSIjNzE3MTdhIiBzdHJva2Utd2lkdGg9IjIiPjxwYXRoIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgZD0iTTE5LjUgOC4yNWwtNy41IDcuNS03LjUtNy41Ii8+PC9zdmc+')] bg-[length:1.25rem] bg-[right_0.75rem_center] bg-no-repeat pr-10"
            >
              <option value="Google_Ads">Google Ads</option>
              <option value="Email">Email Marketing</option>
              <option value="Referido">Referido</option>
              <option value="Organico">Orgánico</option>
            </select>
            {errors.fuenteOrigen && (
              <p className="text-rose-600 text-xs font-medium mt-1 flex items-center gap-1">
                <span className="h-1 w-1 rounded-full bg-rose-500" />
                {errors.fuenteOrigen.message}
              </p>
            )}
          </div>
        </div>

        {/* Empresa */}
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-zinc-700 block">Empresa vinculada</label>
          <select
            {...register('empresaId')}
            className={`w-full bg-white border rounded-lg px-3 py-2 text-sm text-zinc-900 focus:outline-none focus:ring-4 transition-all shadow-sm cursor-pointer appearance-none bg-[url('data:image/svg+xml;bs64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHZpZXdCb3g9IjAgMCAyNCAyNCIgc3Ryb2tlPSIjNzE3MTdhIiBzdHJva2Utd2lkdGg9IjIiPjxwYXRoIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgZD0iTTE5LjUgOC4yNWwtNy41IDcuNS03LjUtNy41Ii8+PC9zdmc+')] bg-[length:1.25rem] bg-[right_0.75rem_center] bg-no-repeat pr-10 ${
              errors.empresaId 
                ? 'border-rose-300 focus:border-rose-500 focus:ring-rose-500/10' 
                : 'border-zinc-200 focus:border-zinc-900 focus:ring-zinc-950/5'
            }`}
          >
            <option value="" className="text-zinc-400">Selecciona una empresa...</option>
            {empresas.map((e) => (
              <option key={e.id} value={e.id} className="text-zinc-900">
                {e.nombre} ({e.industria})
              </option>
            ))}
          </select>
          {errors.empresaId && (
            <p className="text-rose-600 text-xs font-medium mt-1 flex items-center gap-1">
              <span className="h-1 w-1 rounded-full bg-rose-500" />
              {errors.empresaId.message}
            </p>
          )}
        </div>

        {/* Error Global de la Acción */}
        {error && (
          <div className="flex items-start gap-2.5 bg-rose-50/60 border border-rose-100 rounded-lg p-3 text-sm text-rose-800 animate-fade-in">
            <svg className="w-4 h-4 text-rose-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
            </svg>
            <span className="font-medium">{error}</span>
          </div>
        )}

        {/* Botón de Envío */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-zinc-950 text-white py-2.5 rounded-lg text-sm font-semibold shadow-sm hover:bg-zinc-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-950 active:scale-[0.99] disabled:opacity-50 disabled:pointer-events-none transition-all mt-2 flex items-center justify-center gap-2"
        >
          {isSubmitting ? (
            <>
              <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Guardando cambios...
            </>
          ) : (
            'Registrar prospecto'
          )}
        </button>

      </form>
    </div>
  );
}