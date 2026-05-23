'use client';

import { crearEmpresa } from '@/app/actions/empresas.actions';
import { CreateEmpresaSchema, CreateEmpresaType } from '@/app/schemas/empresa.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

export default function EmpresaForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CreateEmpresaType>({
    resolver: zodResolver(CreateEmpresaSchema),
    defaultValues: {
      nombre: '',
      industria: '',
      pais: '',
      numeroEmpleados: 0,
      tier: 'SMB',
    },
  });

  const onSubmit: SubmitHandler<CreateEmpresaType> = async (data) => {
    try {
      setError(null);
      await crearEmpresa(data);
      router.push('/empresas');
      router.refresh();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Error al registrar empresa'
      );
    }
  };

  // Clases reutilizables para mantener el código limpio
  const labelBase = "block text-sm font-semibold text-gray-700 mb-1.5";
  const inputBase = "w-full border rounded-lg px-4 py-2.5 text-sm text-gray-900 bg-gray-50 outline-none transition-all duration-200 focus:bg-white focus:ring-2 focus:border-transparent placeholder-gray-400";
  const inputNormal = "border-gray-200 focus:ring-blue-500/20 focus:border-blue-500";
  const inputError = "border-red-300 focus:ring-red-500/20 focus:border-red-500";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      
      {/* Grid para agrupar inputs en pantallas grandes */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label className={labelBase}>Nombre de la empresa</label>
          <input
            {...register('nombre')}
            className={`${inputBase} ${errors.nombre ? inputError : inputNormal}`}
            placeholder="Ej: Tech Global Solutions"
          />
          {errors.nombre && (
            <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.nombre.message}</p>
          )}
        </div>

        <div>
          <label className={labelBase}>Industria</label>
          <input
            {...register('industria')}
            className={`${inputBase} ${errors.industria ? inputError : inputNormal}`}
            placeholder="Ej: Desarrollo de Software"
          />
          {errors.industria && (
            <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.industria.message}</p>
          )}
        </div>

        <div>
          <label className={labelBase}>País</label>
          <input
            {...register('pais')}
            className={`${inputBase} ${errors.pais ? inputError : inputNormal}`}
            placeholder="Ej: Colombia"
          />
          {errors.pais && (
            <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.pais.message}</p>
          )}
        </div>

        <div>
          <label className={labelBase}>Número de empleados</label>
          <input
            {...register('numeroEmpleados', { valueAsNumber: true })}
            type="number"
            min={1}
            className={`${inputBase} ${errors.numeroEmpleados ? inputError : inputNormal}`}
            placeholder="150"
          />
          {errors.numeroEmpleados && (
            <p className="text-red-500 text-xs mt-1.5 font-medium">
              {errors.numeroEmpleados.message}
            </p>
          )}
        </div>

        <div>
          <label className={labelBase}>Tier comercial</label>
          <select
            {...register('tier')}
            className={`${inputBase} ${errors.tier ? inputError : inputNormal} cursor-pointer`}
          >
            <option value="SMB">SMB (Small/Medium Business)</option>
            <option value="Mid-Market">Mid-Market</option>
            <option value="Enterprise">Enterprise</option>
          </select>
          {errors.tier && (
            <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.tier.message}</p>
          )}
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-md">
          <p className="text-red-700 text-sm font-medium">{error}</p>
        </div>
      )}

      <div className="pt-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full flex justify-center items-center bg-blue-600 text-white py-2.5 px-4 rounded-lg text-sm font-semibold shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Registrando...
            </>
          ) : (
            'Registrar empresa'
          )}
        </button>
      </div>
    </form>
  );
}