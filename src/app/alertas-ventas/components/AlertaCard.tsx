'"'"'use client'"'"'

import { useState, useTransition } from 'react'
import { AlertaVenta, EstadoAlerta, updateEstadoAlerta } from '@/lib/api-client'

interface Props { alerta: AlertaVenta; onActualizado: () => void }

const ESTADOS_SIGUIENTES: Record<EstadoAlerta, EstadoAlerta[]> = {
  Pendiente: ['En_Contacto', 'Cerrado_Ganado', 'Cerrado_Perdido'],
  En_Contacto: ['Cerrado_Ganado', 'Cerrado_Perdido'],
  Cerrado_Ganado: [],
  Cerrado_Perdido: [],
}
const ESTADO_LABELS: Record<EstadoAlerta, string> = {
  Pendiente: 'Pendiente', En_Contacto: 'En contacto', Cerrado_Ganado: 'Ganado', Cerrado_Perdido: 'Perdido',
}
const ESTADO_COLOR: Record<EstadoAlerta, string> = {
  Pendiente: 'bg-amber-950 text-amber-400', En_Contacto: 'bg-blue-950 text-blue-400',
  Cerrado_Ganado: 'bg-green-950 text-green-400', Cerrado_Perdido: 'bg-red-950 text-red-400',
}

export default function AlertaCard({ alerta, onActualizado }: Props) {
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)

  function handleEstado(nuevoEstado: EstadoAlerta) {
    setError(null)
    startTransition(async () => {
      try { await updateEstadoAlerta(alerta.id, nuevoEstado); onActualizado() }
      catch { setError('No se pudo actualizar el estado') }
    })
  }

  const siguientes = ESTADOS_SIGUIENTES[alerta.estado] ?? []
  const terminado = alerta.estado === 'Cerrado_Ganado' || alerta.estado === 'Cerrado_Perdido'

  return (
    <div className={`border border-stone-800 rounded p-4 space-y-3 ${terminado ? 'opacity-60' : ''}`}>
      <div className="flex items-start justify-between">
        <div>
          <div className="text-sm text-stone-100 font-medium">{alerta.prospecto?.nombre}</div>
          <div className="text-xs text-stone-500">{alerta.prospecto?.email}</div>
        </div>
        <span className={`text-xs px-2 py-0.5 rounded ${ESTADO_COLOR[alerta.estado]}`}>{ESTADO_LABELS[alerta.estado]}</span>
      </div>
      <div className="grid grid-cols-2 gap-2 text-xs">
        <div><div className="text-stone-600">Score</div><div className="text-amber-300 font-medium">{alerta.scoreMomento}</div></div>
        <div><div className="text-stone-600">Vendedor</div><div className="text-stone-300">{alerta.vendedor?.nombre ?? '—'}</div></div>
      </div>
      <div className="text-xs text-stone-600">Motivo: <span className="text-stone-400">{alerta.motivo}</span></div>
      {!terminado && siguientes.length > 0 && (
        <div className="flex flex-wrap gap-2 pt-1">
          {siguientes.map((estado) => (
            <button key={estado} onClick={() => handleEstado(estado)} disabled={isPending}
              className="px-3 py-1.5 text-xs rounded border border-stone-700 text-stone-300 hover:border-amber-600 hover:text-amber-400 disabled:opacity-30 transition-colors">
              {isPending ? '...' : `Marcar ${ESTADO_LABELS[estado]}`}
            </button>
          ))}
        </div>
      )}
      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  )
}