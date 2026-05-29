'use client';

import { crearEvento } from '@/app/actions/eventos.actions';
import { obtenerScorePorProspecto } from '@/app/actions/prospectos.actions';
import { useProspectoStore } from '@/app/lib/prospecto.store';
import { CreateEventoSchema, CreateEventoType } from '@/app/schemas/evento.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import Swal from 'sweetalert2';

const PUNTOS_POR_EVENTO: Record<string, number> = {
  Login: 5,
  Ver_Precios: 20,
  Configurar_VoIP: 25,
  Invitar_Colega: 30,
  Usar_Calendario: 15,
  Descargar_Trial: 10,
};

const NIVEL_COLORS: Record<string, string> = {
  Frio: 'bg-blue-50 text-blue-700 border-blue-200',
  Tibio: 'bg-amber-50 text-amber-700 border-amber-200',
  Caliente: 'bg-red-50 text-red-700 border-red-200',
};

interface Prospecto {
  id: string;
  nombre: string;
  email: string;
}

interface Score {
  scoreTotal: number;
  nivel: string;
  logins7d: number;
  featuresUsadas: number;
}

interface Props {
  prospectos: Prospecto[];
}

export default function EventoForm({ prospectos }: Props) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [puntosPreview, setPuntosPreview] = useState<number>(5);
  const [score, setScore] = useState<Score | null>(null);
  const [loadingScore, setLoadingScore] = useState(false);

  const { setProspectoSeleccionado, limpiarProspecto } = useProspectoStore();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<CreateEventoType>({
    resolver: zodResolver(CreateEventoSchema),
    defaultValues: {
      prospectoId: '',
      tipoEvento: 'Login',
    },
  });

  const tipoSeleccionado = watch('tipoEvento');
  const prospectoIdSeleccionado = watch('prospectoId');
  const puntosActuales = PUNTOS_POR_EVENTO[tipoSeleccionado] ?? puntosPreview;

  useEffect(() => {
    if (!prospectoIdSeleccionado) {
      setScore(null);
      limpiarProspecto();
      return;
    }

    const prospecto = prospectos.find((p) => p.id === prospectoIdSeleccionado);
    if (prospecto) {
      setProspectoSeleccionado(prospecto);
    }

    const fetchScore = async () => {
      setLoadingScore(true);
      try {
        const res = await obtenerScorePorProspecto(prospectoIdSeleccionado) as { data: Score };
        setScore(res.data);
      } catch {
        setScore(null);
      } finally {
        setLoadingScore(false);
      }
    };

    fetchScore();
  }, [prospectoIdSeleccionado]);

  const onSubmit: SubmitHandler<CreateEventoType> = async (data) => {
    try {
      setError(null);
      await crearEvento(data);

      const res = await obtenerScorePorProspecto(data.prospectoId) as { data: Score };
      setScore(res.data);

      await Swal.fire({
        title: '¡Evento registrado!',
        html: `<p>Se sumaron <b>+${PUNTOS_POR_EVENTO[data.tipoEvento] ?? 0} pts</b>. Score actual: <b>${res.data.scoreTotal} pts</b> — <b>${res.data.nivel}</b>.</p>`,
        icon: 'success',
        confirmButtonText: 'Continuar',
        confirmButtonColor: '#18181b',
        background: '#ffffff',
        customClass: {
          popup: 'rounded-xl',
          title: 'text-zinc-950 font-bold',
        },
      });

      router.refresh();
    } catch (err) {
      const mensaje = err instanceof Error ? err.message : 'Error al registrar el evento de interacción';
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
          Prospecto
        </label>
        <select
          {...register('prospectoId')}
          disabled={isSubmitting}
          className={`w-full bg-white text-zinc-900 px-3.5 py-2.5 rounded-lg text-sm shadow-sm transition-all border outline-none focus:ring-4 disabled:bg-zinc-50 disabled:text-zinc-400 disabled:cursor-not-allowed ${
            errors.prospectoId
              ? 'border-red-300 focus:border-red-500 focus:ring-red-500/10'
              : 'border-zinc-200 focus:border-zinc-950 focus:ring-zinc-950/5'
          }`}
        >
          <option value="">Selecciona un prospecto...</option>
          {prospectos.map((p) => (
            <option key={p.id} value={p.id}>
              {p.nombre} — {p.email}
            </option>
          ))}
        </select>
        {errors.prospectoId && (
          <p className="text-red-600 text-xs font-medium mt-1 flex items-center gap-1">
            <span>•</span> {errors.prospectoId.message}
          </p>
        )}
      </div>

      {prospectoIdSeleccionado && (
        <div className="bg-zinc-50 border border-zinc-200 rounded-xl p-4 space-y-3">
          <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Score actual</p>
          {loadingScore ? (
            <p className="text-sm text-zinc-400">Cargando score...</p>
          ) : score ? (
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-2xl font-bold text-zinc-950">{score.scoreTotal} pts</p>
                <p className="text-xs text-zinc-500">{score.logins7d} logins · {score.featuresUsadas} features usadas</p>
              </div>
              <span className={`text-xs font-semibold px-3 py-1.5 rounded-full border ${NIVEL_COLORS[score.nivel] ?? 'bg-zinc-50 text-zinc-700 border-zinc-200'}`}>
                {score.nivel}
              </span>
            </div>
          ) : (
            <p className="text-sm text-zinc-400">Sin score registrado aún.</p>
          )}
        </div>
      )}

      <div className="space-y-1.5">
        <label className="block text-sm font-semibold text-zinc-700">
          Tipo de evento / Actividad
        </label>
        <select
          {...register('tipoEvento', {
            onChange: (e) => setPuntosPreview(PUNTOS_POR_EVENTO[e.target.value] ?? 0),
          })}
          disabled={isSubmitting}
          className={`w-full bg-white text-zinc-900 px-3.5 py-2.5 rounded-lg text-sm shadow-sm transition-all border outline-none focus:ring-4 disabled:bg-zinc-50 disabled:text-zinc-400 disabled:cursor-not-allowed ${
            errors.tipoEvento
              ? 'border-red-300 focus:border-red-500 focus:ring-red-500/10'
              : 'border-zinc-200 focus:border-zinc-950 focus:ring-zinc-950/5'
          }`}
        >
          <option value="Login">Login (5 pts)</option>
          <option value="Ver_Precios">Ver Precios (20 pts)</option>
          <option value="Configurar_VoIP">Configurar VoIP (25 pts)</option>
          <option value="Invitar_Colega">Invitar Colega (30 pts)</option>
          <option value="Usar_Calendario">Usar Calendario (15 pts)</option>
          <option value="Descargar_Trial">Descargar Trial (10 pts)</option>
        </select>
        {errors.tipoEvento && (
          <p className="text-red-600 text-xs font-medium mt-1 flex items-center gap-1">
            <span>•</span> {errors.tipoEvento.message}
          </p>
        )}
      </div>

      <div className="bg-zinc-50/50 border border-zinc-200/80 rounded-xl p-4 flex items-center justify-between transition-all shadow-sm">
        <div className="flex items-center gap-2.5">
          <div className="h-2 w-2 rounded-full bg-zinc-400 animate-pulse" />
          <span className="text-sm font-medium text-zinc-600">Impacto en el Lead Scoring</span>
        </div>
        <span className="inline-flex items-center text-sm font-bold text-zinc-950 bg-white border border-zinc-200 px-3 py-1 rounded-md shadow-xs tracking-tight">
          +{puntosActuales} pts
        </span>
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
            <span>Registrando interacción...</span>
          </>
        ) : (
          'Registrar evento'
        )}
      </button>

    </form>
  );
}