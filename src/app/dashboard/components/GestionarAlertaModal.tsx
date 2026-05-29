'use client';

import { Alerta } from '@/app/schemas/alerta.schema';
import { useEffect, useState } from 'react';

interface Props {
  alerta: Alerta | null;
  onClose: () => void;
  onGuardar: (id: string, data: { estado: string; notas?: string }) => Promise<void>;
}

const ESTADOS = [
  { value: 'Pendiente', label: 'Pendiente' },
  { value: 'En_Contacto', label: 'En contacto' },
  { value: 'Cerrado_Ganado', label: 'Cerrado ganado' },
  { value: 'Cerrado_Perdido', label: 'Cerrado perdido' },
];

export default function GestionarAlertaModal({ alerta, onClose, onGuardar }: Props) {
  const [estado, setEstado] = useState('Pendiente');
  const [notas, setNotas] = useState('');
  const [guardando, setGuardando] = useState(false);

  useEffect(() => {
    if (alerta) {
      setEstado(alerta.estado);
      setNotas(alerta.notas ?? '');
    }
  }, [alerta]);

  if (!alerta) return null;

  const esCaliente = alerta.tipo === 'Score_Caliente';
  const inicial = (alerta.prospectoNombre ?? '?').charAt(0).toUpperCase();

  const handleGuardar = async () => {
    setGuardando(true);
    try {
      await onGuardar(alerta.id, { estado, notas });
    } finally {
      setGuardando(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-zinc-950/40 backdrop-blur-sm"
        onClick={guardando ? undefined : onClose}
      />

      {/* Card */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 sm:p-7">

        {/* Header */}
        <div className="flex items-center gap-3 pb-5 border-b border-zinc-200/70">
          <div className="h-11 w-11 rounded-xl bg-zinc-950 text-white font-bold text-lg flex items-center justify-center shrink-0 select-none">
            {inicial}
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-bold text-zinc-950 truncate">{alerta.prospectoNombre ?? 'Prospecto'}</p>
            <p className="text-xs text-zinc-500 font-medium">Asignado a {alerta.vendedorNombre ?? '—'}</p>
          </div>
          <button
            onClick={onClose}
            disabled={guardando}
            className="text-zinc-400 hover:text-zinc-700 transition-colors disabled:opacity-40"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Tipo de alerta */}
        <div className="mt-5">
          {esCaliente ? (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-red-50 text-red-700 border border-red-200">
              <span className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse" />
              Score {alerta.scoreDisparador} pts
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200">
              ⏰ Trial · {alerta.diasRestantes} días restantes
            </span>
          )}
        </div>

        {/* Estado */}
        <div className="mt-5 space-y-1.5">
          <label className="block text-sm font-semibold text-zinc-700">Estado de la gestión</label>
          <select
            value={estado}
            onChange={(e) => setEstado(e.target.value)}
            disabled={guardando}
            className="w-full bg-white border border-zinc-200 rounded-lg px-3.5 py-2.5 text-sm text-zinc-900 shadow-sm outline-none transition-all focus:border-zinc-950 focus:ring-4 focus:ring-zinc-950/5 cursor-pointer disabled:bg-zinc-50"
          >
            {ESTADOS.map((e) => (
              <option key={e.value} value={e.value}>{e.label}</option>
            ))}
          </select>
        </div>

        {/* Notas */}
        <div className="mt-4 space-y-1.5">
          <label className="block text-sm font-semibold text-zinc-700">Notas del contacto</label>
          <textarea
            value={notas}
            onChange={(e) => setNotas(e.target.value)}
            disabled={guardando}
            rows={4}
            placeholder="Ej: Cliente interesado en plan Enterprise, agendar demo esta semana..."
            className="w-full bg-white border border-zinc-200 rounded-lg px-3.5 py-2.5 text-sm text-zinc-900 placeholder:text-zinc-400 shadow-sm outline-none transition-all focus:border-zinc-950 focus:ring-4 focus:ring-zinc-950/5 resize-none disabled:bg-zinc-50"
          />
        </div>

        {/* Botones */}
        <div className="mt-6 flex gap-3">
          <button
            onClick={onClose}
            disabled={guardando}
            className="flex-1 bg-white border border-zinc-200 text-zinc-700 py-2.5 rounded-lg text-sm font-semibold hover:bg-zinc-50 transition-all disabled:opacity-50"
          >
            Cancelar
          </button>
          <button
            onClick={handleGuardar}
            disabled={guardando}
            className="flex-1 inline-flex items-center justify-center gap-2 bg-zinc-950 hover:bg-zinc-800 text-white py-2.5 rounded-lg text-sm font-semibold shadow-sm transition-all active:scale-[0.99] disabled:bg-zinc-100 disabled:text-zinc-400"
          >
            {guardando ? (
              <>
                <svg className="animate-spin h-4 w-4 text-zinc-400" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Guardando...
              </>
            ) : (
              'Guardar cambios'
            )}
          </button>
        </div>

      </div>
    </div>
  );
}