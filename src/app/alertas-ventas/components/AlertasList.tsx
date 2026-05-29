'"'"'use client'"'"'

import { AlertaVenta } from '@/lib/api-client'
import AlertaCard from './AlertaCard'

interface Props { alertas: AlertaVenta[]; onActualizado: () => void }

export default function AlertasList({ alertas, onActualizado }: Props) {
  if (alertas.length === 0) {
    return <p className="text-xs text-stone-600 border border-stone-800 rounded p-4 text-center">No hay alertas de vencimiento por el momento.</p>
  }
  return (
    <div className="space-y-3">
      {alertas.map((alerta) => (<AlertaCard key={alerta.id} alerta={alerta} onActualizado={onActualizado} />))}
    </div>
  )
}