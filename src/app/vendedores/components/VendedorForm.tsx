'use client';

import { crearVendedor } from '@/app/actions/vendedores.actions';
import { CreateVendedorSchema, CreateVendedorType } from '@/app/schemas/vendedor.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import Swal from 'sweetalert2';

const REGIONES = [
  'Colombia',
  'México',
  'Argentina',
  'Chile',
  'Perú',
  'España',
  'Estados Unidos',
  'Brasil',
];

export default function VendedorForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CreateVendedorType>({
    resolver: zodResolver(CreateVendedorSchema),
    defaultValues: {
      nombre: '',
      email: '',
      region: 'Colombia',
    },
  });

  const onSubmit: SubmitHandler<CreateVendedorType> = async (data) => {
    try {
      setError(null);
      await crearVendedor(data);

      await Swal.fire({
        title: '¡Vendedor registrado!',
        text: `${data.nombre} fue agregado al equipo de ventas de ${data.region}.`,
        icon: 'success',
        confirmButtonText: 'Ver equipo',
        confirmButtonColor: '#18181b',
        background: '#ffffff',
        customClass: {
          popup: 'rounded-xl',
          title: 'text-zinc-950 font-bold',
        },
      });

      router.push('/vendedores');
      router.refresh();
    } catch (err) {
      const mensaje = err instanceof Error ? err.message : 'Error al registrar vendedor';
      setError(mensaje);

      await Swal.fire({
        title: 'No se pudo registrar',
        text: mensaje,
        icon: 'error',
        confirmButtonText: 'Entendido',
        confirmButtonColor: '#18181b',
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 w-full">

      <div className="space-y-1.5">
        <label className="block text-sm font-semibold text-zinc-700">
          Nombre completo
        </label>
        <input
          {...register('nombre')}
          disabled={isSubmitting}
          placeholder="Carlos Rodríguez"
          className={`w-full bg-white text-zinc-900 px-3.5 py-2.5 rounded-lg text-sm shadow-sm transition-all border outline-none focus:ring-4 disabled:bg-zinc-50 disabled:text-zinc-400 disabled:cursor-not-allowed ${
            errors.nombre
              ? 'border-red-300 focus:border-red-500 focus:ring-red-500/10'
              : 'border-zinc-200 focus:border-zinc-950 focus:ring-zinc-950/5'
          }`}
        />
        {errors.nombre && (
          <p className="text-red-600 text-xs font-medium mt-1 flex items-center gap-1">
            <span>•</span> {errors.nombre.message}
          </p>
        )}
      </div>

      <div className="space-y-1.5">
        <label className="block text-sm font-semibold text-zinc-700">
          Email corporativo
        </label>
        <input
          {...register('email')}
          type="email"
          disabled={isSubmitting}
          placeholder="carlos@zimbra.com"
          className={`w-full bg-white text-zinc-900 px-3.5 py-2.5 rounded-lg text-sm shadow-sm transition-all border outline-none focus:ring-4 disabled:bg-zinc-50 disabled:text-zinc-400 disabled:cursor-not-allowed ${
            errors.email
              ? 'border-red-300 focus:border-red-500 focus:ring-red-500/10'
              : 'border-zinc-200 focus:border-zinc-950 focus:ring-zinc-950/5'
          }`}
        />
        {errors.email && (
          <p className="text-red-600 text-xs font-medium mt-1 flex items-center gap-1">
            <span>•</span> {errors.email.message}
          </p>
        )}
      </div>

      <div className="space-y-1.5">
        <label className="block text-sm font-semibold text-zinc-700">
          Región asignada
        </label>
        <select
          {...register('region')}
          disabled={isSubmitting}
          className={`w-full bg-white text-zinc-900 px-3.5 py-2.5 rounded-lg text-sm shadow-sm transition-all border outline-none focus:ring-4 disabled:bg-zinc-50 disabled:text-zinc-400 disabled:cursor-not-allowed cursor-pointer ${
            errors.region
              ? 'border-red-300 focus:border-red-500 focus:ring-red-500/10'
              : 'border-zinc-200 focus:border-zinc-950 focus:ring-zinc-950/5'
          }`}
        >
          {REGIONES.map((r) => (
            <option key={r} value={r}>{r}</option>
          ))}
        </select>
        {errors.region && (
          <p className="text-red-600 text-xs font-medium mt-1 flex items-center gap-1">
            <span>•</span> {errors.region.message}
          </p>
        )}
        <p className="text-xs text-zinc-500 mt-2">
          Las alertas de leads calientes se asignarán a este vendedor cuando coincida el país de la empresa del prospecto.
        </p>
      </div>

      {error && (
        <div className="flex items-start gap-2.5 bg-red-50 border border-red-200 rounded-lg p-3.5 text-sm text-red-700 mt-2">
          <svg className="w-4 h-4 mt-0.5 shrink-0 text-red-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <p className="font-medium leading-tight">{error}</p>
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex w-full items-center justify-center gap-2 bg-zinc-950 hover:bg-zinc-800 text-white px-4 py-2.5 rounded-lg text-sm font-semibold shadow-sm transition-all active:scale-[0.99] disabled:bg-zinc-100 disabled:text-zinc-400 disabled:scale-100 disabled:cursor-not-allowed mt-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-950"
      >
        {isSubmitting ? (
          <>
            <svg className="animate-spin h-4 w-4 text-zinc-400" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            <span>Registrando vendedor...</span>
          </>
        ) : (
          'Registrar vendedor'
        )}
      </button>

    </form>
  );
}